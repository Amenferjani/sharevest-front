"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, TrendingUp, DollarSign, Clock, Target } from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  YAxis,
} from "recharts"
import { Separator } from "@/components/ui/separator"

export interface CampaignData {
  campaignId: string
  baseRisk: number
  adjustedRisk: number
  userFactors: {
    riskTolerance: string
    overallRiskScore: number
    timeHorizon: string
    investmentGoals: string[]
    financialSituation: { income: string; netWorth: string }
    preferences: { assetClasses: string[]; ethicalInvesting: boolean }
  }
}

interface CrowdfundingRiskCardProps {
  data: CampaignData
  loading?: boolean
}

export default function CrowdfundingRiskCard({
  data,
  loading = false,
}: CrowdfundingRiskCardProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Crowdfunding Risk</CardTitle>
          <CardDescription>Loading…</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  const chartData = [
    { name: "Base Risk", value: data.baseRisk, fill: "#3B82F6" },
    { name: "Adjusted Risk", value: data.adjustedRisk, fill: "#10B981" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          {data.campaignId}
        </CardTitle>
        <CardDescription>Crowdfunding Risk Analysis</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 1) Bar chart */}
        <div style={{ width: "100%", height: 160 }}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 50, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                type="number"
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={80}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip formatter={(val: number) => `${val}%`} />
              <Bar dataKey="value" radius={[4, 4, 4, 4]} barSize={10}>
                {chartData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Separator />

        {/* 2) Four small metric cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-3 border-l-4 border-blue-500">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Risk Tolerance</p>
                <p className="text-lg font-bold">{data.userFactors.riskTolerance}</p>
              </div>
            </div>
          </Card>

          <Card className="p-3 border-l-4 border-green-500">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Overall Risk</p>
                <p className="text-lg font-bold">{data.userFactors.overallRiskScore}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-3 border-l-4 border-purple-500">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Time Horizon</p>
                <p className="text-lg font-bold">{data.userFactors.timeHorizon}</p>
              </div>
            </div>
          </Card>

          <Card className="p-3 border-l-4 border-orange-500">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Net Worth</p>
                <p className="text-lg font-bold">
                  {data.userFactors.financialSituation.netWorth}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Separator />

        {/* 3) Last big card: Investment Profile */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Investment Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Investment Goals</span>
              <span className="text-sm">
                {data.userFactors.investmentGoals.join(", ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Asset Classes</span>
              <span className="text-sm capitalize">
                {data.userFactors.preferences.assetClasses.join(", ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Ethical Investing</span>
              <span className="text-sm">
                {data.userFactors.preferences.ethicalInvesting ? "Yes" : "No"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* 4) Actions */}
        <div className="flex gap-2">
          <Button className="flex-1" variant="outline">
            View Details
          </Button>
          <Button className="flex-1">Adjust Profile</Button>
        </div>
      </CardContent>
    </Card>
  )
}
