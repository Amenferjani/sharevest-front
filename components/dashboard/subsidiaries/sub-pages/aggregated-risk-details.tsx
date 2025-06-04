"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Shield, Activity, Target, BarChart3 } from "lucide-react"
import { InvestmentStrategyRiskModifiers, RiskToleranceLevelModifier } from "@/lib/utils"

// types.ts

// 1. Portfolio‐level risks
export interface PortfolioRisk {
  investmentStrategy: number
  assetsRisk: number
  transactionsRisk: number
  overallRisk: number
}

// 2. User‐reported risk
export interface UserRisk {
  riskTolerance: number
  overallRiskScore: string
  experienceLevel: string
  investmentHorizon: string
}

// 3. Deep dive into the user's profile
export interface FinancialSituation {
  income: number
  netWorth: number
  investmentExperience: string
}

export interface Preferences {
  assetClasses: string[]
  ethicalInvesting: boolean
}

export interface RiskProfile {
  _id: string
  userId: string
  riskType: "low" | "medium" | "high" | "Moderate"
  score: number
  investmentGoals: string[]
  timeHorizon: "short-term" | "medium-term" | "long-term"
  financialSituation: FinancialSituation
  preferences: Preferences
  liquidityNeeds: number
  debtLevel: number
  taxStatus: string
  description: string
  createdAt: string
  updatedAt: string
  __v: number
  adjustedWillingness: number
}

// 4. Visualization helpers
export interface VisualizationData {
  portfolioChart: number[] // [assetsRisk, transactionsRisk]
  userRiskGauge: number
  willingnessGauge: number
  aggregatedRiskGauge: number
}

// 5. The full data payload
export interface RiskData {
  portfolioRisk: PortfolioRisk
  userRisk: UserRisk
  riskProfile: RiskProfile
  aggregatedRiskScore: number
  visualizationData: VisualizationData
}

// 6. React component props
export interface RiskWidgetProps {
  data: RiskData
}

// Sample data for testing
const sampleData: RiskData = {
  portfolioRisk: {
    investmentStrategy: 35,
    assetsRisk: 42,
    transactionsRisk: 28,
    overallRisk: 35,
  },
  userRisk: {
    riskTolerance: 65,
    overallRiskScore: "Moderate",
    experienceLevel: "Intermediate",
    investmentHorizon: "Long-term",
  },
  riskProfile: {} as RiskProfile, // Not used
  aggregatedRiskScore: 45,
  visualizationData: {
    portfolioChart: [42, 28],
    userRiskGauge: 65,
    willingnessGauge: 55,
    aggregatedRiskGauge: 45,
  },
}

// Custom tooltip for charts (dark theme optimized)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">
          Value: <span className="font-semibold text-foreground">{payload[0].value}%</span>
        </p>
      </div>
    )
  }
  return null
}

// Risk level indicator (dark theme optimized)
const RiskLevelBadge = ({ value }: { value: number }) => {
  const getRiskLevel = (val: number) => {
    if (val <= 30)
      return { level: "Low", variant: "default" as const, className: "bg-green-900/20 text-green-400 border-green-800" }
    if (val <= 60)
      return {
        level: "Medium",
        variant: "secondary" as const,
        className: "bg-yellow-900/20 text-yellow-400 border-yellow-800",
      }
    return { level: "High", variant: "destructive" as const, className: "bg-red-900/20 text-red-400 border-red-800" }
  }

  const risk = getRiskLevel(value)
  return <Badge className={risk.className}>{risk.level}</Badge>
}

// Circular progress gauge (dark theme optimized)
const CircularGauge = ({ value, label, color }: { value: number; label: string; color: string }) => {
  const data = [
    { name: label, value, fill: color },
    { name: "remaining", value: 100 - value, fill: "#374151" }, // Dark gray for dark theme
  ]

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={35} outerRadius={50} startAngle={90} endAngle={450}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-lg font-bold text-foreground">{value}%</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      </div>
    </div>
  )
}

// InfoCard component matching the assessment tab style (dark theme optimized)
const InfoCard = ({
  icon: Icon,
  label,
  value,
  color = "blue",
}: {
  icon: any
  label: string
  value: string | number
  color?: string
}) => {
  const colorClasses = {
    blue: "border-l-blue-500 bg-blue-950/20",
    green: "border-l-green-500 bg-green-950/20",
    purple: "border-l-purple-500 bg-purple-950/20",
    orange: "border-l-orange-500 bg-orange-950/20",
    red: "border-l-red-500 bg-red-950/20",
    gray: "border-l-gray-500 bg-gray-950/20",
  }

  return (
    <Card className={`border-l-4 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-background/50 rounded-full flex items-center justify-center shadow-sm border">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-lg font-bold text-foreground">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AggregatedRiskDetails({ data = sampleData }: RiskWidgetProps) {
  const { portfolioRisk, userRisk, aggregatedRiskScore, visualizationData } = data

  // Prepare chart data with dark theme colors
  const portfolioChartData = [
    { name: "Assets Risk", value: portfolioRisk.assetsRisk, fill: "#3B82F6" },
    { name: "Transactions Risk", value: portfolioRisk.transactionsRisk, fill: "#8B5CF6" },
  ]


  return (
    <div className="space-y-6">
      {/* Header matching assessment tab style */}
      <Card className="bg-gradient-to-r from-blue-950/30 to-purple-950/30 border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Aggregated Risk Analysis
              </h3>
              <p className="text-muted-foreground">Comprehensive portfolio and user risk assessment</p>
            </div>
            <Badge variant="outline" className="text-sm bg-background/50">
              Score: {aggregatedRiskScore}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Risk Breakdown Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Portfolio Risk Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
  <ResponsiveContainer width="100%" height={250}>
    <BarChart
      data={portfolioChartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
      <XAxis
        dataKey="name"
        tick={{ fontSize: 12, fill: "#9CA3AF" }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        tick={{ fontSize: 12, fill: "#9CA3AF" }}
        axisLine={false}
        tickLine={false}
        domain={[0, 100]}
      />
      <Tooltip content={<CustomTooltip />} />
      <Bar
        dataKey="value"
        radius={[4, 4, 0, 0]}
        
      >
        {portfolioChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</CardContent>
      </Card>

      {/* Risk Gauges */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: "User Risk", value: visualizationData.userRiskGauge, color: "#10B981" },
              { label: "Willingness", value: visualizationData.willingnessGauge, color: "#F59E0B" },
              { label: "Aggregated", value: visualizationData.aggregatedRiskGauge, color: "#EF4444" },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{label}</span>
                  <span className="text-sm font-semibold">{value}%</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ width: `${value}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Risk Details using InfoCard pattern */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Portfolio Risk Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              icon={Shield}
              label="Investment Strategy"
              value={`${InvestmentStrategyRiskModifiers[portfolioRisk.investmentStrategy]}`}
              color="blue"
            />
            <InfoCard icon={TrendingUp} label="Assets Risk" value={`${(portfolioRisk.assetsRisk).toFixed(2)}%`} color="purple" />
            <InfoCard
              icon={Activity}
              label="Transactions Risk"
              value={`${(portfolioRisk.transactionsRisk).toFixed(2)}%`}
              color="orange"
            />
            <InfoCard
              icon={Target}
              label="Overall Portfolio Risk"
              value={`${(portfolioRisk.overallRisk).toFixed(2)}%`}
              color="green"
            />
          </div>
        </CardContent>
      </Card>

      {/* User Risk Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            User Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm :grid-cols-1 lg:grid-cols-2">
            <InfoCard icon={Target} label="Risk Tolerance" value={`${RiskToleranceLevelModifier[userRisk.riskTolerance]}`} color="blue" />
            <InfoCard icon={Shield} label="Overall Risk Score" value={userRisk.overallRiskScore} color="green" />
          </div>
        </CardContent>
      </Card>

      {/* Final Aggregated Score */}
      <Card className="bg-gradient-to-r from-green-950/30 to-blue-950/30 border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-foreground">Final Aggregated Risk Score</h4>
              <p className="text-3xl font-bold text-primary">{aggregatedRiskScore}%</p>
              <p className="text-sm text-muted-foreground mt-1">
                Combined assessment of portfolio and user risk factors
              </p>
            </div>
            <div className="text-right">
              <RiskLevelBadge value={aggregatedRiskScore} />
              <p className="text-xs text-muted-foreground mt-2">Based on comprehensive analysis</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
