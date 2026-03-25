export const dashboardMockData = {
  // 1. 资产规模
  assetScale: {
    totalArea: 200, // 方量（面积）百万平方米 / 万㎡
    count: 50, // 资产总数
    selfOwned: {
      count: 50,
      area: 200,
      totalValue: 2.3, // 万兀 -> 亿元
      certificated: 10,
      uncertificated: 10,
      usageRight: 10,
    },
    entrusted: {
      count: 50,
      area: 200,
      totalValue: 2.3,
      certificated: 10,
      uncertificated: 10,
      usageRight: 10,
    }
  },
  
  // 2. 租赁指标完成率
  rentalMetrics: {
    yearlyTargetCompleted: 1.38, // 亿元
    yearlyTarget: 2.8,
    completionRate: 90, // %
    currentRentedRate: 90, // %
    totalCollectionRate: 90, // %
    rentedArea: 2.5, // 万㎡
    toBeRentedArea: 3.5,
    unrentableArea: 3.5,
    rentTotalExpected: 2.44, // 亿元
    rentTotalCollected: 1.38,
    overdueUncollected: 0.18,
  },

  // 3. 各业态出租率及收缴率
  businessFormats: [
    { name: '住宅及公寓类', rentRate: 70, collectionRate: 70, rented: 2.5, toBeRented: 3.5, unrentable: 3.5, expected: 1.2, collected: 1.2 },
    { name: '办公及园区类', rentRate: 70, collectionRate: 70, rented: 2.5, toBeRented: 3.5, unrentable: 3.5, expected: 1.2, collected: 1.2 },
    { name: '工业及市政类', rentRate: 70, collectionRate: 70, rented: 2.5, toBeRented: 3.5, unrentable: 3.5, expected: 1.2, collected: 1.2 },
    { name: '商业及其他类', rentRate: 70, collectionRate: 70, rented: 2.5, toBeRented: 3.5, unrentable: 3.5, expected: 1.2, collected: 1.2 },
  ],

  // 4. 业态分类展示 (环形图左侧)
  formatCategories: [
    { name: '住宅及公寓类', value: 0.84, percentage: 10 },
    { name: '办公及园区类', value: 9.41, percentage: 30 },
    { name: '工业及市政类', value: 0, percentage: 0 },
    { name: '商业及其他类', value: 10.99, percentage: 20 },
  ],

  // 5. 资产状态分布 (环形图)
  assetStatus: [
    { name: '可租', value: 15 },
    { name: '自用', value: 10 },
    { name: '其他', value: 20 },
  ],

  // 6. 本年度及后续收缴趋势图 (折线图)
  collectionTrend: {
    metrics: {
      expectedThisYear: 90, // %
      collectedThisYear: 1.2, // 亿元
      newSignThisYear: 1.0, 
      historySign: 0.2,
    },
    xAxis: ['2024年', '2025年', '2026年', '2027年', '2028年', '2029年'],
    series: [20, 25, 50, 45, 30, 100], // 亿元
  },

  // 7. 在建资产 & 项目规模
  buildingAsset: {
    totalArea: 42, // 万㎡
    development: { projectCount: 3, area: 21, investment: 0.1 },
    update: { projectCount: 3, area: 21, investment: 0.1 },
  },

  // 8. 物业服务类
  propertyService: {
    totalArea: 10, // 万㎡
    projects: 50,
    newContracts: 50, // 万元
    collectedThisYear: 50, // 万元
    
    expectedThisYear: { total: 71, history: 51, newSign: 20 },
    expectedFuture: { total: 66, history: 26, newSign: 40 },
  },

  // 9. 业务分类 双轴图
  businessCategoryChart: {
    xAxis: ['公建配套', '商业办公', '人居类'],
    collected: [20, 15, 15],  // 今年实收 (万元)
    expected: [30, 22, 22],   // 今年应收 (万元)
    lineData: [40, 25, 20],   // 某种比率折线 (右侧轴)
  }
};
