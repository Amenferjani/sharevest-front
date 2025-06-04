"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import CrowdfundingRiskCard, { CampaignData } from "../sub-pages/crowdfunding-risk-adjustment"

// static mock array
const mockCampaigns: CampaignData[] = [
  {
    campaignId: "campaign_123",
    baseRisk: 18,
    adjustedRisk: 22,
    userFactors: {
      riskTolerance: "Moderate",
      overallRiskScore: 65,
      timeHorizon: "5–10 Years",
      investmentGoals: ["Growth", "Income"],
      financialSituation: { income: "$120k", netWorth: "$500k" },
      preferences: { assetClasses: ["equities", "bonds"], ethicalInvesting: true },
    },
  },
  {
    campaignId: "campaign_456",
    baseRisk: 30,
    adjustedRisk: 35,
    userFactors: {
      riskTolerance: "High",
      overallRiskScore: 80,
      timeHorizon: "3–5 Years",
      investmentGoals: ["Speculation"],
      financialSituation: { income: "$95k", netWorth: "$300k" },
      preferences: { assetClasses: ["crypto"], ethicalInvesting: false },
    },
  },
  // …more campaigns
]

export default function CrowdfundingRiskAdjustmentList({
  campaigns = mockCampaigns,
  loading = false,
}: {
  campaigns?: CampaignData[]
  loading?: boolean
}) {
  const [selected, setSelected] = useState(campaigns[0]?.campaignId || "")

  return (
    <Tabs value={selected} onValueChange={setSelected} className="space-y-4">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {campaigns.map((c) => (
          <TabsTrigger key={c.campaignId} value={c.campaignId}>
            {c.campaignId}
          </TabsTrigger>
        ))}
      </TabsList>

      {campaigns.map((c) => (
        <TabsContent key={c.campaignId} value={c.campaignId}>
          <CrowdfundingRiskCard data={c} loading={loading} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
