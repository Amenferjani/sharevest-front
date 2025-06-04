"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, TrendingDown, DollarSign, BarChart3, Download, Eye, Heart } from "lucide-react"
import type {
  HedgeFundWithMetrics,
  PerformanceMetricWithComparison,
  HedgeManagerDashboard,
  InvestorDashboardData,
  RiskLevel,
} from "@/types/types"
import FilterPanel from "./filters/filter-panel"
import PerformanceChart from "./charts/hedge-performance-chart"


// =============================================================================
// MOCK HEDGE FUNDS DATA
// =============================================================================

export const mockHedgeFunds: HedgeFundWithMetrics[] = [
  {
    id: "hf-001",
    name: "Alpha Growth Partners",
    manager: "Sarah Chen",
    description:
      "Long-short equity strategy focusing on technology and healthcare sectors with systematic risk management.",
    strategy: "long-short-equity",
    totalAssets: 250000000, // $250M
    investedAmount: 225000000, // $225M
    inceptionDate: "2020-03-15T00:00:00.000Z",
    managementFees: 2.0, // 2%
    performanceFees: 20.0, // 20%
    status: "active",
    createdAt: "2020-03-15T10:30:00.000Z",
    updatedAt: "2024-12-01T15:45:00.000Z",
    // Calculated metrics
    currentReturn: 18.5,
    totalReturn: 67.3,
    sharpeRatio: 1.85,
    volatility: 12.4,
    maxDrawdown: -8.2,
    riskLevel: "medium",
    investorCount: 45,
    minimumInvestment: 1000000,
    lastUpdated: "2024-12-01T15:45:00.000Z",
    performanceGrade: "A+",
  },
  {
    id: "hf-002",
    name: "Quantum Macro Fund",
    manager: "Michael Rodriguez",
    description:
      "Global macro strategy utilizing quantitative models and fundamental analysis across currencies, commodities, and fixed income.",
    strategy: "global-macro",
    totalAssets: 180000000, // $180M
    investedAmount: 165000000, // $165M
    inceptionDate: "2019-08-20T00:00:00.000Z",
    managementFees: 1.5, // 1.5%
    performanceFees: 15.0, // 15%
    status: "active",
    createdAt: "2019-08-20T09:15:00.000Z",
    updatedAt: "2024-11-28T11:20:00.000Z",
    // Calculated metrics
    currentReturn: 12.8,
    totalReturn: 45.2,
    sharpeRatio: 1.42,
    volatility: 15.7,
    maxDrawdown: -12.5,
    riskLevel: "medium",
    investorCount: 32,
    minimumInvestment: 500000,
    lastUpdated: "2024-11-28T11:20:00.000Z",
    performanceGrade: "A",
  },
  {
    id: "hf-003",
    name: "Event Driven Opportunities",
    manager: "David Kim",
    description:
      "Specializes in merger arbitrage, distressed securities, and special situations with focus on risk-adjusted returns.",
    strategy: "event-driven",
    totalAssets: 95000000, // $95M
    investedAmount: 88000000, // $88M
    inceptionDate: "2021-01-10T00:00:00.000Z",
    managementFees: 2.5, // 2.5%
    performanceFees: 25.0, // 25%
    status: "active",
    createdAt: "2021-01-10T14:00:00.000Z",
    updatedAt: "2024-11-30T16:30:00.000Z",
    // Calculated metrics
    currentReturn: 22.1,
    totalReturn: 38.7,
    sharpeRatio: 2.15,
    volatility: 9.8,
    maxDrawdown: -5.4,
    riskLevel: "low",
    investorCount: 28,
    minimumInvestment: 2000000,
    lastUpdated: "2024-11-30T16:30:00.000Z",
    performanceGrade: "A+",
  },
  {
    id: "hf-004",
    name: "Fixed Income Alpha",
    manager: "Jennifer Walsh",
    description:
      "Conservative fixed income strategy focusing on credit opportunities and yield enhancement with capital preservation.",
    strategy: "fixed-income",
    totalAssets: 320000000, // $320M
    investedAmount: 305000000, // $305M
    inceptionDate: "2018-06-01T00:00:00.000Z",
    managementFees: 1.0, // 1%
    performanceFees: 10.0, // 10%
    status: "active",
    createdAt: "2018-06-01T08:45:00.000Z",
    updatedAt: "2024-12-02T09:15:00.000Z",
    // Calculated metrics
    currentReturn: 8.3,
    totalReturn: 28.9,
    sharpeRatio: 1.65,
    volatility: 4.2,
    maxDrawdown: -2.1,
    riskLevel: "low",
    investorCount: 67,
    minimumInvestment: 250000,
    lastUpdated: "2024-12-02T09:15:00.000Z",
    performanceGrade: "B+",
  },
  {
    id: "hf-005",
    name: "Multi-Strategy Dynamics",
    manager: "Robert Thompson",
    description:
      "Diversified multi-strategy approach combining equity long-short, fixed income relative value, and quantitative strategies.",
    strategy: "multi-strategy",
    totalAssets: 450000000, // $450M
    investedAmount: 425000000, // $425M
    inceptionDate: "2017-11-15T00:00:00.000Z",
    managementFees: 2.0, // 2%
    performanceFees: 20.0, // 20%
    status: "active",
    createdAt: "2017-11-15T13:20:00.000Z",
    updatedAt: "2024-11-29T14:10:00.000Z",
    // Calculated metrics
    currentReturn: 15.7,
    totalReturn: 52.8,
    sharpeRatio: 1.73,
    volatility: 11.2,
    maxDrawdown: -9.8,
    riskLevel: "medium",
    investorCount: 89,
    minimumInvestment: 1000000,
    lastUpdated: "2024-11-29T14:10:00.000Z",
    performanceGrade: "A",
  },
  {
    id: "hf-006",
    name: "Quant Edge Systems",
    manager: "Dr. Lisa Zhang",
    description:
      "Systematic quantitative strategy using machine learning and statistical arbitrage across global equity markets.",
    strategy: "quantitative",
    totalAssets: 75000000, // $75M
    investedAmount: 72000000, // $72M
    inceptionDate: "2022-04-01T00:00:00.000Z",
    managementFees: 1.5, // 1.5%
    performanceFees: 30.0, // 30%
    status: "active",
    createdAt: "2022-04-01T10:00:00.000Z",
    updatedAt: "2024-12-01T12:45:00.000Z",
    // Calculated metrics
    currentReturn: 28.4,
    totalReturn: 41.2,
    sharpeRatio: 2.45,
    volatility: 16.8,
    maxDrawdown: -11.3,
    riskLevel: "high",
    investorCount: 18,
    minimumInvestment: 5000000,
    lastUpdated: "2024-12-01T12:45:00.000Z",
    performanceGrade: "A+",
  },
]

// =============================================================================
// MOCK PERFORMANCE METRICS DATA
// =============================================================================

export const mockPerformanceMetrics: PerformanceMetricWithComparison[] = [
  // Alpha Growth Partners metrics
  {
    id: "pm-001",
    date: "2024-11-30T00:00:00.000Z",
    returnPercentage: 2.3,
    sharpeRatio: 1.85,
    volatility: 12.4,
    drawdown: -1.2,
    benchmarkPerformance: 1.8,
    riskScore: 6,
    comments: "Strong performance driven by tech sector allocation",
    hedgeFundId: "hf-001",
    createdAt: "2024-12-01T15:45:00.000Z",
    updatedAt: "2024-12-01T15:45:00.000Z",
    // Extended fields
    outperformance: 0.5,
    riskAdjustedReturn: 1.86,
    periodLabel: "November 2024",
    trend: "up",
  },
  {
    id: "pm-002",
    date: "2024-10-31T00:00:00.000Z",
    returnPercentage: 1.8,
    sharpeRatio: 1.82,
    volatility: 11.9,
    drawdown: -2.1,
    benchmarkPerformance: 1.2,
    riskScore: 5,
    comments: "Consistent performance with reduced volatility",
    hedgeFundId: "hf-001",
    createdAt: "2024-11-01T10:30:00.000Z",
    updatedAt: "2024-11-01T10:30:00.000Z",
    // Extended fields
    outperformance: 0.6,
    riskAdjustedReturn: 1.51,
    periodLabel: "October 2024",
    trend: "stable",
  },
  // Quantum Macro Fund metrics
  {
    id: "pm-003",
    date: "2024-11-30T00:00:00.000Z",
    returnPercentage: 1.5,
    sharpeRatio: 1.42,
    volatility: 15.7,
    drawdown: -3.2,
    benchmarkPerformance: 1.8,
    riskScore: 7,
    comments: "Currency positions impacted by Fed policy uncertainty",
    hedgeFundId: "hf-002",
    createdAt: "2024-12-01T11:20:00.000Z",
    updatedAt: "2024-12-01T11:20:00.000Z",
    // Extended fields
    outperformance: -0.3,
    riskAdjustedReturn: 0.96,
    periodLabel: "November 2024",
    trend: "down",
  },
  // Event Driven Opportunities metrics
  {
    id: "pm-004",
    date: "2024-11-30T00:00:00.000Z",
    returnPercentage: 3.1,
    sharpeRatio: 2.15,
    volatility: 9.8,
    drawdown: -0.8,
    benchmarkPerformance: 1.8,
    riskScore: 4,
    comments: "Excellent month with successful merger arbitrage positions",
    hedgeFundId: "hf-003",
    createdAt: "2024-12-01T16:30:00.000Z",
    updatedAt: "2024-12-01T16:30:00.000Z",
    // Extended fields
    outperformance: 1.3,
    riskAdjustedReturn: 3.16,
    periodLabel: "November 2024",
    trend: "up",
  },
]

// =============================================================================
// MOCK DASHBOARD DATA
// =============================================================================

export const mockHedgeManagerDashboard: HedgeManagerDashboard = {
  managerId: "mgr-001",
  managerName: "Sarah Chen",
  managerEmail: "sarah.chen@alphagrowth.com",

  overview: {
    totalFunds: 3,
    totalAUM: 525000000, // $525M
    averageReturn: 16.8,
    totalInvestors: 105,
    activeFunds: 3,
    topPerformingFund: "Alpha Growth Partners",
  },

  funds: mockHedgeFunds.slice(0, 3), // First 3 funds belong to Sarah Chen
  recentFunds: mockHedgeFunds.slice(0, 2),

  allMetrics: mockPerformanceMetrics,
  recentMetrics: mockPerformanceMetrics.slice(0, 2),

  fundForm: {
    isEditing: false,
    validationErrors: {},
    isSubmitting: false,
  },

  metricForm: {
    isOpen: false,
    validationErrors: {},
    isSubmitting: false,
  },

  analytics: {
    performanceTrends: [
      { date: "2024-07", totalReturn: 12.5, benchmark: 8.2, aum: 480000000 },
      { date: "2024-08", totalReturn: 14.2, benchmark: 9.1, aum: 495000000 },
      { date: "2024-09", totalReturn: 15.8, benchmark: 10.5, aum: 510000000 },
      { date: "2024-10", totalReturn: 16.1, benchmark: 11.2, aum: 520000000 },
      { date: "2024-11", totalReturn: 16.8, benchmark: 11.8, aum: 525000000 },
    ],
    strategyBreakdown: [
      { strategy: "long-short-equity", count: 1, totalAUM: 250000000, averageReturn: 18.5 },
      { strategy: "global-macro", count: 1, totalAUM: 180000000, averageReturn: 12.8 },
      { strategy: "event-driven", count: 1, totalAUM: 95000000, averageReturn: 22.1 },
    ],
    riskDistribution: [
      { riskLevel: "low", count: 1 },
      { riskLevel: "medium", count: 2 },
      { riskLevel: "high", count: 0 },
      { riskLevel: "very-high", count: 0 },
    ],
  },
}

export const mockInvestorDashboard: InvestorDashboardData = {
  investorId: "inv-001",
  investorName: "John Smith",

  availableFunds: mockHedgeFunds,
  featuredFunds: mockHedgeFunds.slice(0, 3),
  watchlist: mockHedgeFunds.slice(2, 4),

  filters: {
    strategy: ["long-short-equity", "global-macro", "event-driven", "fixed-income", "multi-strategy", "quantitative"],
    riskLevel: ["low", "medium", "high", "very-high"],
    minAUM: 0,
    maxAUM: 1000000000,
    minReturn: 0,
    performanceGrade: ["A+", "A", "B+", "B", "C+", "C", "D", "F"],
    status: ["active", "closed", "suspended", "liquidating"],
  },

  activeFilters: {
    sortBy: "totalReturn",
    sortOrder: "desc",
  },

  comparison: {
    selectedFunds: [],
    comparisonData: [],
  },

  reportGeneration: {
    isGenerating: false,
    reportType: "performance",
    dateRange: {
      start: "2024-01-01T00:00:00.000Z",
      end: "2024-12-31T23:59:59.000Z",
    },
  },

  // Portfolio data
  portfolio: {
    totalValue: 2850000,
    totalInvested: 2500000,
    totalReturn: 14.0,
    monthlyReturn: 2.3,
    activeFunds: 3,
  },

  // Current investments
  investments: [
    {
      fundId: "hf-001",
      fundName: "Alpha Growth Partners",
      investedAmount: 1000000,
      currentValue: 1185000,
      investmentDate: "2023-06-15T00:00:00.000Z",
      currentReturn: 18.5,
      profitLoss: 185000,
      performanceGrade: "A+",
    },
    {
      fundId: "hf-003",
      fundName: "Event Driven Opportunities",
      investedAmount: 750000,
      currentValue: 916500,
      investmentDate: "2023-09-01T00:00:00.000Z",
      currentReturn: 22.2,
      profitLoss: 166500,
      performanceGrade: "A+",
    },
    {
      fundId: "hf-004",
      fundName: "Fixed Income Alpha",
      investedAmount: 750000,
      currentValue: 812250,
      investmentDate: "2023-12-01T00:00:00.000Z",
      currentReturn: 8.3,
      profitLoss: 62250,
      performanceGrade: "B+",
    },
  ],

  // Performance history for charts
  performanceHistory: [
    { date: "2024-01", portfolioValue: 2620000, monthlyReturn: 1.8, benchmark: 1.2 },
    { date: "2024-02", portfolioValue: 2680000, monthlyReturn: 2.3, benchmark: 1.5 },
    { date: "2024-03", portfolioValue: 2745000, monthlyReturn: 2.4, benchmark: 1.8 },
    { date: "2024-04", portfolioValue: 2790000, monthlyReturn: 1.6, benchmark: 1.4 },
    { date: "2024-05", portfolioValue: 2835000, monthlyReturn: 1.6, benchmark: 1.1 },
    { date: "2024-06", portfolioValue: 2850000, monthlyReturn: 0.5, benchmark: 0.8 },
  ],
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000000) {
    return `$${(amount / 1000000000).toFixed(1)}B`
  } else if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`
  }
  return `$${amount.toLocaleString()}`
}

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`
}

export const getRiskColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case "low":
      return "text-green-600"
    case "medium":
      return "text-yellow-600"
    case "high":
      return "text-orange-600"
    case "very-high":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

export const getPerformanceColor = (value: number): string => {
  if (value > 15) return "text-green-600"
  if (value > 5) return "text-blue-600"
  if (value > 0) return "text-gray-600"
  return "text-red-600"
}

export default function InvestorDashboard() {
  const [dashboardData] = useState<InvestorDashboardData>(mockInvestorDashboard)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStrategy, setSelectedStrategy] = useState<string>("all")
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>("all")

  const filteredFunds = dashboardData.availableFunds.filter((fund) => {
    const matchesSearch =
      fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fund.strategy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStrategy = selectedStrategy === "all" || fund.strategy === selectedStrategy
    const matchesRisk = selectedRiskLevel === "all" || fund.riskLevel === selectedRiskLevel

    return matchesSearch && matchesStrategy && matchesRisk
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`
  }

  const getPerformanceColor = (value: number) => {
    if (value > 0) return "text-green-600"
    if (value < 0) return "text-red-600"
    return "text-gray-600"
  }

  const getPerformanceIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (value < 0) return <TrendingDown className="h-4 w-4 text-red-600" />
    return null
  }

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "Low":
        return "default"
      case "Medium":
        return "secondary"
      case "High":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Investment Dashboard</h1>
            <p className="text-gray-600">Discover and track hedge fund investments</p>
          </div>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Generate Report
          </Button>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(dashboardData.portfolio.totalValue)}</div>
              <p className="text-xs text-muted-foreground">
                {formatPercentage(dashboardData.portfolio.totalReturn)} total return
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(dashboardData.portfolio.totalInvested)}</div>
              <p className="text-xs text-muted-foreground">Across {dashboardData.portfolio.activeFunds} funds</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Return</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPercentage(dashboardData.portfolio.monthlyReturn)}</div>
              <p className="text-xs text-muted-foreground">This month's performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Watchlist</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.watchlist.length}</div>
              <p className="text-xs text-muted-foreground">Funds being tracked</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="discover" className="space-y-6">
          <TabsList>
            <TabsTrigger value="discover">Discover Funds</TabsTrigger>
            <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search hedge funds..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <FilterPanel
                selectedStrategy={selectedStrategy}
                selectedRiskLevel={selectedRiskLevel}
                onStrategyChange={setSelectedStrategy}
                onRiskLevelChange={setSelectedRiskLevel}
              />
            </div>

            {/* Funds Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFunds.map((fund) => (
                <Card key={fund.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{fund.name}</CardTitle>
                        <CardDescription>{fund.strategy}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={getRiskBadgeVariant(fund.riskLevel || "Medium")}>
                          {fund.riskLevel || "Medium"} Risk
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">AUM</p>
                        <p className="font-semibold">{formatCurrency(fund.totalAssets)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Min Investment</p>
                        {/* <p className="font-semibold">{formatCurrency(fund.minInvestment || 100000)}</p> */}
                      </div>
                      <div>
                        <p className="text-muted-foreground">Mgmt Fee</p>
                        <p className="font-semibold">{fund.managementFees}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Performance Grade</p>
                        <p className="font-semibold">{fund.performanceGrade || "B+"}</p>
                      </div>
                    </div>

                    {/* {fund.latestReturn && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-muted-foreground">YTD Return</span>
                        <div className="flex items-center gap-1">
                          {getPerformanceIcon(fund.latestReturn)}
                          <span className={`font-semibold ${getPerformanceColor(fund.latestReturn)}`}>
                            {formatPercentage(fund.latestReturn)}
                          </span>
                        </div>
                      </div>
                    )} */}

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFunds.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No funds found</h3>
                  <p className="text-muted-foreground text-center">Try adjusting your search terms or filters</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {dashboardData.investments.map((investment) => (
                <Card key={investment.fundId}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{investment.fundName}</CardTitle>
                        <CardDescription>
                          Invested on {new Date(investment.investmentDate).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge variant={investment.currentReturn > 0 ? "default" : "destructive"}>
                        {formatPercentage(investment.currentReturn)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Invested Amount</p>
                        <p className="font-semibold">{formatCurrency(investment.investedAmount)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current Value</p>
                        <p className="font-semibold">{formatCurrency(investment.currentValue)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">P&L</p>
                        <p className={`font-semibold ${getPerformanceColor(investment.profitLoss)}`}>
                          {formatCurrency(investment.profitLoss)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Performance Grade</p>
                        <p className="font-semibold">{investment.performanceGrade}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hedge Fund Performance</CardTitle>
                <CardDescription>Monthly returns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart data={dashboardData.performanceHistory} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
