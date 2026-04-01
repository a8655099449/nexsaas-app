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
 * 将数据转换为带样式的 Excel 兼容 HTML (Hifi 修复版)
 */
export const exportToWeeklyCsv = (data: DaySummary[]): string => {
  if (data.length === 0) return "";

  // 1. 按周分组 (修复分组偏移问题)
  const weekGroups: Record<string, DaySummary[]> = {};
  data.forEach(d => {
    const date = new Date(d.date + "T00:00:00"); // 加上 T00 防止时区偏移
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date);
    monday.setDate(diff);
    const weekKey = monday.toISOString().split('T')[0];
    
    if (!weekGroups[weekKey]) weekGroups[weekKey] = [];
    weekGroups[weekKey].push(d);
  });

  // 2. 构建样式 (针对 Excel 优化)
  const styles = `
    <style>
      table { border-collapse: collapse; width: 100%; table-layout: fixed; }
      td { 
        border: 1px solid #c0c0c0; 
        padding: 10px; 
        vertical-align: top; 
        mso-number-format:"\\@"; /* 强制文本格式 */
        white-space: normal; 
        word-wrap: break-word;
        font-family: '微软雅黑', sans-serif;
        font-size: 13px;
        line-height: 1.5;
      }
      .header { background: #f2f2f2; font-weight: bold; text-align: center; }
      .proj-title { font-weight: bold; color: #000; }
      .desc-label { font-weight: bold; color: #666; }
      br { mso-data-placement:same-cell; }
    </style>
  `;

  let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      ${styles}
    </head>
    <body xml:lang="zh-CN">
      <table>
        <tr class="header">
          <td width="250">周一</td><td width="250">周二</td><td width="250">周三</td>
          <td width="250">周四</td><td width="250">周五</td><td width="250">周六</td>
          <td width="250">周日</td><td width="250">当周总结</td>
        </tr>
  `;

  // 3. 按周填充数据 (保证一周一行)
  Object.keys(weekGroups).sort().forEach(weekKey => {
    const weekData = weekGroups[weekKey];
    const rowCells = Array(8).fill("<td></td>");
    const weeklySummaryMap: Record<string, number> = {};

    weekData.forEach(day => {
      const d = new Date(day.date + "T00:00:00");
      const dayIndex = (d.getDay() + 6) % 7; 
      
      const dayContent = day.projectGroups.map(pg => {
        // 汇总当周数据
        weeklySummaryMap[pg.projectName] = (weeklySummaryMap[pg.projectName] || 0) + pg.totalHours;

        const title = `<span class="proj-title">${pg.projectName} ${pg.totalHours.toFixed(1)}h</span>`;
        const items = pg.items.map((item, idx) => {
          const desc = item.description ? `<br/><span class="desc-label">处理说明:</span><br/>${item.description.replace(/\n/g, "<br/>")}` : "";
          return `<br/>${idx + 1}.${item.summary}${desc}`;
        }).join('<br/>');

        return `${title}${items}`;
      }).join('<br/><br/>');

      rowCells[dayIndex] = `<td>${dayContent}</td>`;
    });

    // 填充当周总结栏 (第八列)
    const summaryList = Object.entries(weeklySummaryMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, hours]) => `<span class="proj-title">${name}</span>: ${hours.toFixed(1)}h`)
      .join('<br/><br/>');
    
    rowCells[7] = `<td>${summaryList}</td>`;

    html += `<tr>${rowCells.join("")}</tr>`;
  });

  html += `</table></body></html>`;
  return html;
};
