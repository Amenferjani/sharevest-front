"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  TrendingUp,
  DollarSign,
  PieChart,
  Heart,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Target,
} from "lucide-react"
import type { InvestorTrackingWithDeal, DealWithMetrics } from "@/types/types"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import PrivateEquityTable from "./tables/private-equity-table"

// Static data for demonstration
const mockInvestorDashboard = {
  investorId: "inv-001",
  investorName: "Michael Chen",
  portfolio: {
    totalInvested: 850000,
    currentValue: 1125000,
    totalROI: 32.35,
    totalProfitLoss: 275000,
    activeInvestments: 6,
    exitedInvestments: 2,
    averageHoldingPeriod: 18,
  },
  investments: [
    {
      id: "track-001",
      dealId: "deal-001",
      investorId: "inv-001",
      investmentAmount: 150000,
      investmentDate: "2024-01-15T10:00:00Z",
      roi: 45.2,
      irr: 38.5,
      valuationChange: 67800,
      profitLoss: 67800,
      exitCompleted: false,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-12-01T14:30:00Z",
      deal: {
        id: "deal-001",
        name: "GreenTech Solar Solutions",
        description: "Revolutionary solar panel technology with 40% higher efficiency",
        industry: "renewable-energy",
        requiredInvestment: 2000000,
        currentInvestment: 1200000,
        status: "active",
        lifecycleStage: "series-a",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-12-01T14:30:00Z",
        fundingProgress: 60,
        remainingAmount: 800000,
        investorCount: 12,
        averageInvestment: 100000,
        daysActive: 45,
      },
      performanceGrade: "A",
      riskLevel: "medium",
    },
    {
      id: "track-002",
      dealId: "deal-002",
      investorId: "inv-001",
      investmentAmount: 200000,
      investmentDate: "2024-02-01T09:00:00Z",
      roi: 28.7,
      irr: 25.3,
      valuationChange: 57400,
      profitLoss: 57400,
      exitCompleted: false,
      createdAt: "2024-02-01T09:00:00Z",
      updatedAt: "2024-12-02T16:45:00Z",
      deal: {
        id: "deal-002",
        name: "HealthAI Diagnostics",
        description: "AI-powered medical diagnostic platform for early disease detection",
        industry: "healthcare",
        requiredInvestment: 5000000,
        currentInvestment: 3750000,
        status: "active",
        lifecycleStage: "series-b",
        createdAt: "2024-02-01T09:00:00Z",
        updatedAt: "2024-12-02T16:45:00Z",
        fundingProgress: 75,
        remainingAmount: 1250000,
        investorCount: 18,
        averageInvestment: 208333,
        daysActive: 32,
      },
      performanceGrade: "B",
      riskLevel: "low",
    },
  ],
  topPerformers: [],
  recentActivity: [],
  availableDeals: [
    {
      id: "deal-004",
      name: "AgriTech Vertical Farms",
      description: "Sustainable vertical farming solutions for urban environments",
      industry: "agriculture",
      requiredInvestment: 3000000,
      currentInvestment: 900000,
      status: "active",
      lifecycleStage: "seed",
      createdAt: "2024-11-01T10:00:00Z",
      updatedAt: "2024-12-01T14:30:00Z",
      fundingProgress: 30,
      remainingAmount: 2100000,
      investorCount: 5,
      averageInvestment: 180000,
      daysActive: 30,
    },
  ],
  recommendedDeals: [],
  dealFilters: {
    industry: ["technology", "healthcare", "fintech"],
    lifecycleStage: ["seed", "series-a"],
    minInvestment: 50000,
    maxInvestment: 500000,
    riskTolerance: "medium",
  },
  performance: {
    monthlyReturns: [
      { month: "Oct 2024", roi: 28.5, profitLoss: 242500, portfolioValue: 1092500 },
      { month: "Nov 2024", roi: 31.2, profitLoss: 265200, portfolioValue: 1115200 },
      { month: "Dec 2024", roi: 32.35, profitLoss: 275000, portfolioValue: 1125000 },
    ],
    industryPerformance: [
      { industry: "renewable-energy", roi: 45.2, investmentCount: 1, totalInvested: 150000 },
      { industry: "healthcare", roi: 28.7, investmentCount: 1, totalInvested: 200000 },
    ],
    riskMetrics: {
      portfolioVolatility: 15.2,
      sharpeRatio: 1.8,
      maxDrawdown: -8.5,
    },
  },
  watchlist: {
    deals: [],
    priceAlerts: [],
  },
  interests: [],
}

// Investment Card Component
function InvestmentCard({ investment }: { investment: InvestorTrackingWithDeal }) {
  const isPositive = investment.profitLoss >= 0

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg">{investment.deal.name}</CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline" className="capitalize">
                {investment.deal.industry.replace("-", " ")}
              </Badge>
              <Badge
                className={`${investment.performanceGrade === "A"
                    ? "bg-green-100 text-green-800"
                    : investment.performanceGrade === "B"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
              >
                Grade {investment.performanceGrade}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className={`flex items-center gap-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              <span className="font-medium">{investment.roi.toFixed(1)}%</span>
            </div>
            <p className="text-xs text-muted-foreground">ROI</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Invested</span>
            <p className="font-medium">${investment.investmentAmount.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Current Value</span>
            <p className="font-medium">${(investment.investmentAmount + investment.profitLoss).toLocaleString()}</p>
          </div>
          <div>
            <span className="text-muted-foreground">P&L</span>
            <p className={`font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {isPositive ? "+" : ""}${investment.profitLoss.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">IRR</span>
            <p className="font-medium">{investment.irr.toFixed(1)}%</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-muted-foreground">
            Invested {new Date(investment.investmentDate).toLocaleDateString()}
          </span>
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Available Deal Card Component
function AvailableDealCard({ deal }: { deal: DealWithMetrics }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg">{deal.name}</CardTitle>
            <Badge variant="outline" className="capitalize">
              {deal.industry.replace("-", " ")}
            </Badge>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{deal.description}</p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Funding Progress</span>
            <span className="font-medium">{deal.fundingProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${deal.fundingProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>${(deal.currentInvestment / 1000000).toFixed(1)}M raised</span>
            <span>${(deal.requiredInvestment / 1000000).toFixed(1)}M target</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Stage</span>
            <p className="font-medium capitalize">{deal.lifecycleStage.replace("-", " ")}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Min Investment</span>
            <p className="font-medium">${(deal.averageInvestment / 2).toLocaleString()}</p>
          </div>
        </div>

        <Button className="w-full">Express Interest</Button>
      </CardContent>
    </Card>
  )
}

export default function PrivateInvestorDashboard() {
  const [searchQuery, setSearchQuery] = React.useState("")

  const dashboard = mockInvestorDashboard

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investment Portfolio</h1>
          <p className="text-muted-foreground">Welcome back, {dashboard.investorName}</p>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(dashboard.portfolio.currentValue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />+{dashboard.portfolio.totalROI.toFixed(1)}% total return
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(dashboard.portfolio.totalInvested / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">Across {dashboard.portfolio.activeInvestments} active deals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit & Loss</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +${(dashboard.portfolio.totalProfitLoss / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">Unrealized gains</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Holding</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard.portfolio.averageHoldingPeriod}mo</div>
            <p className="text-xs text-muted-foreground">{dashboard.portfolio.exitedInvestments} completed exits</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="portfolio" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
          <TabsTrigger value="discover">Discover Deals</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Active Investments</h2>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search investments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dashboard.investments.map((investment) => (
              <InvestmentCard key={investment.id} investment={investment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discover" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Available Investment Opportunities</h2>
            <Button variant="outline">Filter Deals</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dashboard.availableDeals.map((deal) => (
              <AvailableDealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Portfolio returns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboard.performance.monthlyReturns.map((month, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{month.month}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">{month.roi.toFixed(1)}% ROI</div>
                        <div className="text-xs text-muted-foreground">
                          ${(month.portfolioValue / 1000).toFixed(0)}K value
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Industry Performance</CardTitle>
                <CardDescription>Returns by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboard.performance.industryPerformance.map((industry, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium capitalize">{industry.industry.replace("-", " ")}</span>
                        <span className="text-sm font-medium text-green-600">{industry.roi.toFixed(1)}%</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ${(industry.totalInvested / 1000).toFixed(0)}K invested • {industry.investmentCount} deal
                        {industry.investmentCount !== 1 ? "s" : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Your Private Equity Interests</CardTitle>
          <CardDescription>Current private equity holdings and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <PrivateEquityTable />
        </CardContent>
      </Card>
    </div>
  )
}
