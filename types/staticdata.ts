import { HedgeFund, PerformanceMetric } from '@/types/types';

export const staticHedgeFunds: HedgeFund[] = [
    {
        id: 'hf-001',
        name: 'Alpha Growth Partners',
        manager: 'Sarah Chen',
        description: 'Long-short equity strategy focusing on technology and healthcare sectors with systematic risk management and quantitative analysis.',
        strategy: 'Long/Short Equity',
        totalAssets: 2500000000,
        investedAmount: 2250000000,
        inceptionDate: '2018-03-15',
        managementFees: 2.0,
        performanceFees: 20.0,
        status: 'Active',
        performanceMetrics: []
    },
    {
        id: 'hf-002',
        name: 'Quantum Macro Fund',
        manager: 'Michael Rodriguez',
        description: 'Global macro strategy utilizing quantitative models and fundamental analysis across currencies, commodities, and fixed income markets.',
        strategy: 'Global Macro',
        totalAssets: 1800000000,
        investedAmount: 1650000000,
        inceptionDate: '2019-08-20',
        managementFees: 1.5,
        performanceFees: 15.0,
        status: 'Active',
        performanceMetrics: []
    },
    {
        id: 'hf-003',
        name: 'Event Driven Opportunities',
        manager: 'David Kim',
        description: 'Specializes in merger arbitrage, distressed securities, and special situations with focus on risk-adjusted returns.',
        strategy: 'Event Driven',
        totalAssets: 950000000,
        investedAmount: 880000000,
        inceptionDate: '2020-01-10',
        managementFees: 2.5,
        performanceFees: 25.0,
        status: 'Active',
        performanceMetrics: []
    },
    {
        id: 'hf-004',
        name: 'Fixed Income Alpha',
        manager: 'Jennifer Walsh',
        description: 'Conservative fixed income strategy focusing on credit opportunities and yield enhancement with capital preservation.',
        strategy: 'Fixed Income Arbitrage',
        totalAssets: 3200000000,
        investedAmount: 3050000000,
        inceptionDate: '2017-06-01',
        managementFees: 1.0,
        performanceFees: 10.0,
        status: 'Active',
        performanceMetrics: []
    },
    {
        id: 'hf-005',
        name: 'Multi-Strategy Dynamics',
        manager: 'Robert Thompson',
        description: 'Diversified multi-strategy approach combining equity long-short, fixed income relative value, and quantitative strategies.',
        strategy: 'Multi-Strategy',
        totalAssets: 4500000000,
        investedAmount: 4250000000,
        inceptionDate: '2016-11-15',
        managementFees: 2.0,
        performanceFees: 20.0,
        status: 'Active',
        performanceMetrics: []
    },
    {
        id: 'hf-006',
        name: 'Quant Edge Systems',
        manager: 'Dr. Lisa Zhang',
        description: 'Systematic quantitative strategy using machine learning and statistical arbitrage across global equity markets.',
        strategy: 'Quantitative',
        totalAssets: 750000000,
        investedAmount: 720000000,
        inceptionDate: '2021-04-01',
        managementFees: 1.5,
        performanceFees: 30.0,
        status: 'Active',
        performanceMetrics: []
    },
    {
        id: 'hf-007',
        name: 'Emerging Markets Focus',
        manager: 'Carlos Mendoza',
        description: 'Dedicated emerging markets equity strategy with deep local research and risk management expertise.',
        strategy: 'Emerging Markets',
        totalAssets: 1200000000,
        investedAmount: 1100000000,
        inceptionDate: '2019-02-28',
        managementFees: 2.5,
        performanceFees: 20.0,
        status: 'Active',
        performanceMetrics: []
    },
    {
        id: 'hf-008',
        name: 'Distressed Value Fund',
        manager: 'Amanda Foster',
        description: 'Focused on distressed debt and special situations with deep value investing principles and restructuring expertise.',
        strategy: 'Distressed Securities',
        totalAssets: 850000000,
        investedAmount: 800000000,
        inceptionDate: '2018-09-12',
        managementFees: 2.0,
        performanceFees: 25.0,
        status: 'Active',
        performanceMetrics: []
    }
];

export const staticPerformanceMetrics: PerformanceMetric[] = [
    // Alpha Growth Partners - Recent 12 months
    { id: 'pm-001', date: '2024-01-31', returnPercentage: 2.3, sharpeRatio: 1.85, volatility: 12.4, drawdown: -1.2, benchmarkPerformance: 1.8, riskScore: 6.2, comments: 'Strong tech sector performance', updatedAt: '2024-02-01T09:00:00Z', hedgeFundId: 'hf-001' },
    { id: 'pm-002', date: '2024-02-29', returnPercentage: 1.8, sharpeRatio: 1.82, volatility: 11.9, drawdown: -2.1, benchmarkPerformance: 1.2, riskScore: 5.8, comments: 'Consistent performance', updatedAt: '2024-03-01T09:00:00Z', hedgeFundId: 'hf-001' },
    { id: 'pm-003', date: '2024-03-31', returnPercentage: 3.1, sharpeRatio: 1.88, volatility: 13.2, drawdown: -0.8, benchmarkPerformance: 2.1, riskScore: 6.5, comments: 'Excellent quarter end', updatedAt: '2024-04-01T09:00:00Z', hedgeFundId: 'hf-001' },
    { id: 'pm-004', date: '2024-04-30', returnPercentage: 0.9, sharpeRatio: 1.75, volatility: 14.1, drawdown: -3.2, benchmarkPerformance: 0.5, riskScore: 7.1, comments: 'Market volatility impact', updatedAt: '2024-05-01T09:00:00Z', hedgeFundId: 'hf-001' },
    { id: 'pm-005', date: '2024-05-31', returnPercentage: 2.7, sharpeRatio: 1.91, volatility: 12.8, drawdown: -1.5, benchmarkPerformance: 2.2, riskScore: 6.0, comments: 'Recovery momentum', updatedAt: '2024-06-01T09:00:00Z', hedgeFundId: 'hf-001' },
    { id: 'pm-006', date: '2024-06-30', returnPercentage: 1.4, sharpeRatio: 1.83, volatility: 13.5, drawdown: -2.3, benchmarkPerformance: 1.1, riskScore: 6.8, comments: 'Mid-year consolidation', updatedAt: '2024-07-01T09:00:00Z', hedgeFundId: 'hf-001' },
    { id: 'pm-007', date: '2024-07-31', returnPercentage: 3.5, sharpeRatio: 1.95, volatility: 11.7, drawdown: -0.9, benchmarkPerformance: 2.8, riskScore: 5.5, comments: 'Strong summer performance', updatedAt: '2024-08-01T09:00:00Z', hedgeFundId: 'hf-001' },
    { id: 'pm-008', date: '2024-08-31', returnPercentage: 2.1, sharpeRatio: 1.87, volatility: 12.9, drawdown: -1.8, benchmarkPerformance: 1.7, riskScore: 6.3, comments: 'Steady growth', updatedAt: '2024-09-01T09:00:00Z', hedgeFundId: 'hf-001' },
    { id: 'pm-009', date: '2024-09-30', returnPercentage: 1.6, sharpeRatio: 1.79, volatility: 13.8, drawdown: -2.7, benchmarkPerformance: 1.3, riskScore: 7.0, comments: 'Q3 close', updatedAt: '2024-10-01T09:00:00Z', hedgeFundId: 'hf-001' },
    { id: 'pm-010', date: '2024-10-31', returnPercentage: 2.9, sharpeRatio: 1.92, volatility: 12.1, drawdown: -1.1, benchmarkPerformance: 2.4, riskScore: 5.9, comments: 'October rally', updatedAt: '2024-11-01T09:00:00Z', hedgeFundId: 'hf-001' },
    { id: 'pm-011', date: '2024-11-30', returnPercentage: 1.7, sharpeRatio: 1.84, volatility: 13.3, drawdown: -2.0, benchmarkPerformance: 1.4, riskScore: 6.6, comments: 'Year-end positioning', updatedAt: '2024-12-01T09:00:00Z', hedgeFundId: 'hf-001' },
    { id: 'pm-012', date: '2024-12-31', returnPercentage: 2.4, sharpeRatio: 1.89, volatility: 12.6, drawdown: -1.4, benchmarkPerformance: 2.0, riskScore: 6.1, comments: 'Strong year-end finish', updatedAt: '2025-01-01T09:00:00Z', hedgeFundId: 'hf-001' },

    // Quantum Macro Fund - Recent 12 months
    { id: 'pm-013', date: '2024-01-31', returnPercentage: 1.5, sharpeRatio: 1.42, volatility: 15.7, drawdown: -3.2, benchmarkPerformance: 1.8, riskScore: 7.2, comments: 'Currency headwinds', updatedAt: '2024-02-01T09:00:00Z', hedgeFundId: 'hf-002' },
    { id: 'pm-014', date: '2024-02-29', returnPercentage: 2.8, sharpeRatio: 1.58, volatility: 14.9, drawdown: -1.8, benchmarkPerformance: 1.2, riskScore: 6.5, comments: 'Macro positioning pays off', updatedAt: '2024-03-01T09:00:00Z', hedgeFundId: 'hf-002' },
    { id: 'pm-015', date: '2024-03-31', returnPercentage: 0.7, sharpeRatio: 1.35, volatility: 16.2, drawdown: -4.1, benchmarkPerformance: 2.1, riskScore: 8.0, comments: 'Challenging quarter', updatedAt: '2024-04-01T09:00:00Z', hedgeFundId: 'hf-002' },
    { id: 'pm-016', date: '2024-04-30', returnPercentage: 3.2, sharpeRatio: 1.65, volatility: 14.3, drawdown: -2.1, benchmarkPerformance: 0.5, riskScore: 6.8, comments: 'Strong commodity play', updatedAt: '2024-05-01T09:00:00Z', hedgeFundId: 'hf-002' },
    { id: 'pm-017', date: '2024-05-31', returnPercentage: 1.9, sharpeRatio: 1.48, volatility: 15.5, drawdown: -2.9, benchmarkPerformance: 2.2, riskScore: 7.1, comments: 'Mixed signals', updatedAt: '2024-06-01T09:00:00Z', hedgeFundId: 'hf-002' },
    { id: 'pm-018', date: '2024-06-30', returnPercentage: 2.4, sharpeRatio: 1.52, volatility: 15.1, drawdown: -2.5, benchmarkPerformance: 1.1, riskScore: 6.9, comments: 'Mid-year strength', updatedAt: '2024-07-01T09:00:00Z', hedgeFundId: 'hf-002' },
    { id: 'pm-019', date: '2024-07-31', returnPercentage: 1.1, sharpeRatio: 1.39, volatility: 16.0, drawdown: -3.7, benchmarkPerformance: 2.8, riskScore: 7.8, comments: 'Macro uncertainty', updatedAt: '2024-08-01T09:00:00Z', hedgeFundId: 'hf-002' },
    { id: 'pm-020', date: '2024-08-31', returnPercentage: 2.6, sharpeRatio: 1.55, volatility: 14.7, drawdown: -2.2, benchmarkPerformance: 1.7, riskScore: 6.6, comments: 'Policy clarity helps', updatedAt: '2024-09-01T09:00:00Z', hedgeFundId: 'hf-002' },
    { id: 'pm-021', date: '2024-09-30', returnPercentage: 0.9, sharpeRatio: 1.33, volatility: 16.4, drawdown: -4.3, benchmarkPerformance: 1.3, riskScore: 8.2, comments: 'Volatile month', updatedAt: '2024-10-01T09:00:00Z', hedgeFundId: 'hf-002' },
    { id: 'pm-022', date: '2024-10-31', returnPercentage: 2.1, sharpeRatio: 1.47, volatility: 15.3, drawdown: -2.8, benchmarkPerformance: 2.4, riskScore: 7.0, comments: 'Recovery mode', updatedAt: '2024-11-01T09:00:00Z', hedgeFundId: 'hf-002' },
    { id: 'pm-023', date: '2024-11-30', returnPercentage: 1.8, sharpeRatio: 1.44, volatility: 15.6, drawdown: -3.1, benchmarkPerformance: 1.4, riskScore: 7.3, comments: 'Cautious positioning', updatedAt: '2024-12-01T09:00:00Z', hedgeFundId: 'hf-002' },
    { id: 'pm-024', date: '2024-12-31', returnPercentage: 2.3, sharpeRatio: 1.51, volatility: 15.0, drawdown: -2.6, benchmarkPerformance: 2.0, riskScore: 6.8, comments: 'Year-end rally', updatedAt: '2025-01-01T09:00:00Z', hedgeFundId: 'hf-002' },

    // Event Driven Opportunities - Recent 12 months
    { id: 'pm-025', date: '2024-01-31', returnPercentage: 3.1, sharpeRatio: 2.15, volatility: 9.8, drawdown: -0.8, benchmarkPerformance: 1.8, riskScore: 4.2, comments: 'Excellent merger arb', updatedAt: '2024-02-01T09:00:00Z', hedgeFundId: 'hf-003' },
    { id: 'pm-026', date: '2024-02-29', returnPercentage: 2.7, sharpeRatio: 2.08, volatility: 10.2, drawdown: -1.1, benchmarkPerformance: 1.2, riskScore: 4.8, comments: 'Strong deal flow', updatedAt: '2024-03-01T09:00:00Z', hedgeFundId: 'hf-003' },
    { id: 'pm-027', date: '2024-03-31', returnPercentage: 1.9, sharpeRatio: 1.95, volatility: 11.1, drawdown: -1.7, benchmarkPerformance: 2.1, riskScore: 5.5, comments: 'Deal completion delays', updatedAt: '2024-04-01T09:00:00Z', hedgeFundId: 'hf-003' },
    { id: 'pm-028', date: '2024-04-30', returnPercentage: 3.8, sharpeRatio: 2.28, volatility: 9.3, drawdown: -0.5, benchmarkPerformance: 0.5, riskScore: 3.8, comments: 'Outstanding month', updatedAt: '2024-05-01T09:00:00Z', hedgeFundId: 'hf-003' },
    { id: 'pm-029', date: '2024-05-31', returnPercentage: 2.2, sharpeRatio: 2.01, volatility: 10.7, drawdown: -1.4, benchmarkPerformance: 2.2, riskScore: 5.1, comments: 'Steady progress', updatedAt: '2024-06-01T09:00:00Z', hedgeFundId: 'hf-003' },
    { id: 'pm-030', date: '2024-06-30', returnPercentage: 2.9, sharpeRatio: 2.12, volatility: 9.9, drawdown: -0.9, benchmarkPerformance: 1.1, riskScore: 4.5, comments: 'Q2 strength', updatedAt: '2024-07-01T09:00:00Z', hedgeFundId: 'hf-003' },
    { id: 'pm-031', date: '2024-07-31', returnPercentage: 1.6, sharpeRatio: 1.88, volatility: 11.5, drawdown: -2.0, benchmarkPerformance: 2.8, riskScore: 6.0, comments: 'Summer lull', updatedAt: '2024-08-01T09:00:00Z', hedgeFundId: 'hf-003' },
    { id: 'pm-032', date: '2024-08-31', returnPercentage: 3.4, sharpeRatio: 2.21, volatility: 9.6, drawdown: -0.7, benchmarkPerformance: 1.7, riskScore: 4.1, comments: 'Back to form', updatedAt: '2024-09-01T09:00:00Z', hedgeFundId: 'hf-003' },
    { id: 'pm-033', date: '2024-09-30', returnPercentage: 2.5, sharpeRatio: 2.05, volatility: 10.4, drawdown: -1.2, benchmarkPerformance: 1.3, riskScore: 4.9, comments: 'Solid quarter end', updatedAt: '2024-10-01T09:00:00Z', hedgeFundId: 'hf-003' },
    { id: 'pm-034', date: '2024-10-31', returnPercentage: 3.2, sharpeRatio: 2.18, volatility: 9.7, drawdown: -0.8, benchmarkPerformance: 2.4, riskScore: 4.3, comments: 'Deal activity surge', updatedAt: '2024-11-01T09:00:00Z', hedgeFundId: 'hf-003' },
    { id: 'pm-035', date: '2024-11-30', returnPercentage: 2.8, sharpeRatio: 2.09, volatility: 10.1, drawdown: -1.0, benchmarkPerformance: 1.4, riskScore: 4.6, comments: 'Consistent execution', updatedAt: '2024-12-01T09:00:00Z', hedgeFundId: 'hf-003' },
    { id: 'pm-036', date: '2024-12-31', returnPercentage: 3.6, sharpeRatio: 2.25, volatility: 9.4, drawdown: -0.6, benchmarkPerformance: 2.0, riskScore: 4.0, comments: 'Exceptional year-end', updatedAt: '2025-01-01T09:00:00Z', hedgeFundId: 'hf-003' },
];

// Link performance metrics to funds
staticHedgeFunds.forEach(fund => {
    fund.performanceMetrics = staticPerformanceMetrics.filter(metric => metric.hedgeFundId === fund.id);
});