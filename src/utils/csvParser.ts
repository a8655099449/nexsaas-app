export interface TimesheetItem {
  key: string;
  summary: string;
  hours: number;
  date: string;
  project: string;
  description: string;
}

export interface ProjectGroup {
  projectName: string;
  totalHours: number;
  items: TimesheetItem[];
}

export interface DaySummary {
  date: string;
  dailyTotal: number;
  projectGroups: ProjectGroup[];
}

const ultimateCsvSplitter = (text: string): string[][] => {
  const result: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let separator = ",";
  const lines = text.split(/[\r\n]/);
  const firstLine = lines[0] || "";
  if (!firstLine.includes(',') && firstLine.includes('\t')) {
    separator = "\t";
  }

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    if (inQuotes) {
      if (char === '"' && nextChar === '"') { field += '"'; i++; }
      else if (char === '"') { inQuotes = false; }
      else { field += char; }
    } else {
      if (char === '"') { inQuotes = true; }
      else if (char === separator) { row.push(field.trim()); field = ""; }
      else if (char === '\n' || char === '\r') {
        if (char === '\r' && nextChar === '\n') { i++; }
        row.push(field.trim());
        if (row.length > 1 || row[0] !== "") { result.push(row); }
        row = []; field = "";
      } else { field += char; }
    }
  }
  if (row.length > 0 || field !== "") {
    row.push(field.trim());
    if (row.length > 1 || row[0] !== "") { result.push(row); }
  }
  return result;
};

export const parseTimesheetCsv = (csvText: string): DaySummary[] => {
  const rows = ultimateCsvSplitter(csvText);
  if (rows.length <= 1) return [];

  const headers = rows[0].map(h => h.toLowerCase());
  const findIdx = (keywords: string[]) => headers.findIndex(h => keywords.some(k => h.includes(k.toLowerCase())));

  const keyIdx = findIdx(["密钥", "key", "id"]);
  const summaryIdx = findIdx(["摘要", "summary", "标题"]);
  const hoursIdx = findIdx(["小时数", "hours", "工时", "time spent"]);
  const dateIdx = findIdx(["日期", "date", "created"]);
  
  // 优化项目名称匹配：优先找全名，避免匹配到项目Key
  let projIdx = findIdx(["项目名称", "project_name", "full project"]);
  if (projIdx === -1) projIdx = findIdx(["project", "项目"]);
  
  const descIdx = findIdx(["处理说明", "description", "评论", "内容", "说明"]);

  const safeIdx = (idx: number, fallback: number) => idx === -1 ? fallback : idx;

  const records: TimesheetItem[] = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 5) continue;

    const hoursStr = (row[safeIdx(hoursIdx, 2)] || "0").replace(/['"]/g, '');
    const hours = parseFloat(hoursStr) || 0;
    const dateFull = row[safeIdx(dateIdx, 3)] || '';
    const dateOnly = dateFull.split(' ')[0] || '';

    if (!dateOnly || isNaN(Date.parse(dateOnly)) && !/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) continue;

    records.push({
      key: row[safeIdx(keyIdx, 0)] || 'N/A',
      summary: row[safeIdx(summaryIdx, 1)] || '',
      hours: hours,
      date: dateOnly,
      project: row[safeIdx(projIdx, 19)] || '其他项目',
      description: row[safeIdx(descIdx, 22)] || ''
    });
  }

  const dateGroups: Record<string, TimesheetItem[]> = {};
  records.forEach(r => {
    if (!dateGroups[r.date]) dateGroups[r.date] = [];
    dateGroups[r.date].push(r);
  });

  return Object.keys(dateGroups).map(date => {
    const dayItems = dateGroups[date];
    const projectMap: Record<string, ProjectGroup> = {};
    let dailyTotal = 0;
    dayItems.forEach(item => {
      if (!projectMap[item.project]) {
        projectMap[item.project] = { projectName: item.project, totalHours: 0, items: [] };
      }
      projectMap[item.project].totalHours += item.hours;
      projectMap[item.project].items.push(item);
      dailyTotal += item.hours;
    });
    return {
      date,
      dailyTotal,
      projectGroups: Object.values(projectMap).sort((a, b) => b.totalHours - a.totalHours)
    };
  }).sort((a, b) => a.date.localeCompare(b.date));
};

/**
 * 将数据转换为符合截图样式的周报矩阵 CSV
 */
export const exportToWeeklyCsv = (data: DaySummary[]): string => {
  if (data.length === 0) return "";

  // 1. 按周分组
  const weekGroups: Record<string, DaySummary[]> = {};
  data.forEach(d => {
    const date = new Date(d.date);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));
    const weekKey = monday.toISOString().split('T')[0];
    
    if (!weekGroups[weekKey]) weekGroups[weekKey] = [];
    weekGroups[weekKey].push(d);
  });

  const header = ["周一", "周二", "周三", "周四", "周五", "周六", "周日", "总结"];
  const csvRows = [header.join(",")];

  // 2. 对每个周导出对应行
  Object.keys(weekGroups).sort().forEach(weekKey => {
    const weekData = weekGroups[weekKey];
    const row = Array(8).fill(""); // 7天 + 1列总结
    const weeklyProjectMap: Record<string, { projectName: string, totalHours: number }> = {};

    weekData.forEach(day => {
      const d = new Date(day.date);
      const dayIndex = (d.getDay() + 6) % 7; // 周一为 0
      
      // 累计全周项目汇总
      day.projectGroups.forEach(pg => {
        if (!weeklyProjectMap[pg.projectName]) {
          weeklyProjectMap[pg.projectName] = { projectName: pg.projectName, totalHours: 0 };
        }
        weeklyProjectMap[pg.projectName].totalHours += pg.totalHours;
      });

      // 格式化单元格内容：项目名 总工时h\n [序号]. 摘要\n 处理说明: 说明内容
      const cellContent = day.projectGroups.map(pg => {
        const title = `${pg.projectName} ${pg.totalHours.toFixed(1)}h`;
        const summaries = pg.items.map((item, idx) => {
          const desc = item.description ? `\n处理说明:\n${item.description}` : "";
          return `${idx + 1}.${item.summary}${desc}`;
        }).join('\n');
        return `${title}\n${summaries}`;
      }).join('\n\n');

      row[dayIndex] = `"${cellContent.replace(/"/g, '""')}"`;
    });

    // 生成总结栏内容 (第 8 列)
    const summaryContent = Object.values(weeklyProjectMap)
      .sort((a, b) => b.totalHours - a.totalHours)
      .map(p => `${p.projectName} ${p.totalHours.toFixed(1)}h`)
      .join('\n');
    
    row[7] = `"${summaryContent.replace(/"/g, '""')}"`;

    csvRows.push(row.join(","));
  });

  return "\ufeff" + csvRows.join("\r\n");
};
