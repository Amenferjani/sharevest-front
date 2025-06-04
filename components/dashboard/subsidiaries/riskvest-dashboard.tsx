"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Settings, User, Target, Clock, DollarSign, TrendingUp, Shield, Calendar } from "lucide-react"
import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createRiskProfile, getAdjustedCrowdfundingRisk, getAggregatedRiskDetails, getRiskProfile, getSuggestRiskProfileChange, updateRiskProfile } from "@/services/risk-vest/service"
import { useAuth } from "@/context/authContext"
import RiskWizard from "./sub-pages/risk-wizard"
import Loading from "@/components/ui/loading"
import Error from "@/components/ui/error"
import AggregatedRiskDetails from "./sub-pages/aggregated-risk-details"
import SuggestedProfileChange from "./sub-pages/suggested-profile-change"
import CrowdfundingRiskTable from "./tables/crowdfunding-risk-table"
import { Separator } from "@/components/ui/separator"
import { RiskProfile } from "@/types/types"
import AlertsPage from "./sub-pages/risk-alert"

export interface RiskProfileDto {
  riskTolerance: string
  investmentHorizon: string
}
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
    blue: "border-l-blue-500 bg-blue-50/50",
    green: "border-l-green-500 bg-green-50/50",
    purple: "border-l-purple-500 bg-purple-50/50",
    orange: "border-l-orange-500 bg-orange-50/50",
    red: "border-l-red-500 bg-red-50/50",
    gray: "border-l-gray-500 bg-gray-50/50",
  }

  return (
    <Card className={`border-l-4 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center shadow-sm">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-lg font-bold capitalize">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
const RiskScoreIndicator = ({ score, riskType }: { score: number; riskType: string }) => {
  const getRiskColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "low":
        return { bg: "bg-green-500", text: "text-green-700", bgLight: "bg-green-50" }
      case "medium":
        return { bg: "bg-yellow-500", text: "text-yellow-700", bgLight: "bg-yellow-50" }
      case "high":
        return { bg: "bg-red-500", text: "text-red-700", bgLight: "bg-red-50" }
      default:
        return { bg: "bg-gray-500", text: "text-gray-700", bgLight: "bg-gray-50" }
    }
  }

  const colors = getRiskColor(riskType)

  return (
    <div className="relative">
      <div className="flex items-center justify-center w-24 h-24 rounded-full border-4 border-muted">
        <div className="text-center">
          <div className="text-2xl font-bold">{score}</div>
          <div className="text-xs text-muted-foreground">Score</div>
        </div>
      </div>
      <Badge
        className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${colors.bgLight} ${colors.text} border-0`}
      >
        {riskType}
      </Badge>
    </div>
  )
}
export default function RiskVestDashboard() {
  const { user } = useAuth()
  const [showWizard, setShowWizard] = useState(false);

  const {
    data: userRiskProfileData,
    isLoading: userRiskProfileLoading,
    refetch: userRiskProfileRefetch,
    isFetched: userRiskProfileFetched,
    error: userRiskProfileError,
  } = useQuery({
    queryKey: ["userRiskProfile"],
    queryFn: getRiskProfile,
    enabled: !!user,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const {
    data: adjustedCrowdfundingRisk,
    isLoading: adjustedCrowdfundingRiskLoading,
    error: adjustedCrowdfundingRiskError,
  } = useQuery({
    queryKey: ["getAdjustedCrowdfundingRisk"],
    queryFn: getAdjustedCrowdfundingRisk,
    enabled: !!user,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
  getAggregatedRiskDetails
  console.log("adjustedCrowdfundingRisk : ", adjustedCrowdfundingRisk)
  const {
    data: suggestProfileChange,
    isLoading: suggestProfileChangeLoading,
    error: suggestProfileChangeError,
  } = useQuery({
    queryKey: ["getSuggestRiskProfileChange"],
    queryFn: getSuggestRiskProfileChange,
    enabled: !!user,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
  console.log("suggestProfileChange : ", suggestProfileChange)
  const {
    data: aggregatedRiskDetails,
    isLoading: aggregatedRiskDetailsLoading,
    error: aggregatedRiskDetailsError,
  } = useQuery({
    queryKey: ["getAggregatedRiskDetails"],
    queryFn: getAggregatedRiskDetails,
    enabled: !!user,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
  console.log("aggregatedRiskDetails",aggregatedRiskDetails)
  const createRiskProfileMutation = useMutation({
    mutationFn: createRiskProfile,
    onSuccess: () => {
      userRiskProfileRefetch();
      setShowWizard(false);
    },
  })

  const updateRiskProfileMutation = useMutation({
    mutationFn: updateRiskProfile,
    onSuccess: () => {
      userRiskProfileRefetch()
      setShowWizard(false)
    },
  })

  const onCompleteWizard = (dto: RiskProfile) => {
    createRiskProfileMutation.mutate(dto)
  }
  const handleUpdate = (dto: RiskProfile) => {
    updateRiskProfileMutation.mutate(dto)
  }

  const handleCancel = () =>
    setShowWizard(false)

  if (userRiskProfileData === null) {
    return <RiskWizard onCancel={handleCancel} onComplete={onCompleteWizard} />
  }
  if (userRiskProfileLoading || !userRiskProfileFetched ||adjustedCrowdfundingRiskLoading || suggestProfileChangeLoading ||aggregatedRiskDetailsLoading) return <Loading />
  if (userRiskProfileError || adjustedCrowdfundingRiskError || suggestProfileChangeError ||aggregatedRiskDetailsError) return <Error />

  return (
    <div className="space-y-6">
      {!showWizard &&
        
        (<><Tabs defaultValue="overview" className="w-full">
        {/* header + tab triggers */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">RiskVest</h1>
            <p className="text-muted-foreground">
              Advanced risk assessment and mitigation strategies.
            </p>
          </div>
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessment">Risk Assessment</TabsTrigger>
            <TabsTrigger value="alerts">Risk Alerts</TabsTrigger>
          </TabsList>
        </div>

        {/* Overview tab */}
        <TabsContent value="overview" className="space-y-6 mt-0">
          {/* top‐level cards */}
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
            <Card className="border-zinc-800 bg-zinc-900">
              <CardHeader className="pb-2">
                <CardTitle>Risk Score</CardTitle>
              </CardHeader>
              <CardContent>
                {userRiskProfileLoading ? (
                  <div className="flex items-center justify-center h-12">
                    <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{userRiskProfileData.score}</div>
                    <p className="text-xs text-zinc-400">
                      <span className="text-emerald-500 capitalize">
                        {userRiskProfileData.riskType}
                      </span>{" "}
                      risk type
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900">
              <CardHeader className="pb-2">
                <CardTitle>Time Horizon</CardTitle>
              </CardHeader>
              <CardContent>
                {userRiskProfileLoading ? (
                  <div className="flex items-center justify-center h-12">
                    <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold capitalize">
                      {userRiskProfileData.timeHorizon}
                    </div>
                    <p className="text-xs text-zinc-400">Investment timeline</p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900">
              <CardHeader className="pb-2">
                <CardTitle>Investment Experience</CardTitle>
              </CardHeader>
              <CardContent>
                {userRiskProfileLoading ? (
                  <div className="flex items-center justify-center h-12">
                    <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      {userRiskProfileData.financialSituation.investmentExperience}
                    </div>
                    <p className="text-xs text-zinc-400">Experience level</p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Add suggestion & crowdfunding here */}
          <div className="grid gap-4">
            <SuggestedProfileChange data={suggestProfileChange} />
            <CrowdfundingRiskTable campaigns={adjustedCrowdfundingRisk} />
          </div>
        </TabsContent>
        
        {/* Assessment tab */}
      <TabsContent value="assessment" className="space-y-6 mt-0 relative">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Risk Profile Assessment</h2>
                    <p className="text-muted-foreground">Comprehensive analysis of your investment risk tolerance</p>
                  </div>
                  <RiskScoreIndicator score={userRiskProfileData.score} riskType={userRiskProfileData.riskType} />
                </div>
              </CardContent>
            </Card>

            {/* Core Profile Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Core Profile Metrics
                </CardTitle>
                <CardDescription>Key indicators of your risk tolerance and investment approach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <InfoCard icon={Target} label="Investment Goals" value={userRiskProfileData.investmentGoals.join(", ")} color="blue" />
                  <InfoCard icon={Clock} label="Time Horizon" value={userRiskProfileData.timeHorizon} color="green" />
                  <InfoCard
                    icon={TrendingUp}
                    label="Experience Level"
                    value={userRiskProfileData.financialSituation.investmentExperience}
                    color="purple"
                  />
                  <InfoCard
                    icon={Shield}
                    label="Asset Classes"
                    value={userRiskProfileData.preferences.assetClasses.join(", ")}
                    color="orange"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Financial Situation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Situation
                </CardTitle>
                <CardDescription>Your current financial status and constraints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
                  <InfoCard icon={DollarSign} label="Income Level" value={userRiskProfileData.financialSituation.income} color="green" />
                  <InfoCard icon={TrendingUp} label="Net Worth" value={userRiskProfileData.financialSituation.netWorth} color="blue" />
                  <InfoCard icon={Target} label="Tax Status" value={userRiskProfileData.taxStatus} color="purple" />
                </div>
              </CardContent>
            </Card>

            {/* Risk Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Risk Factors & Preferences
                </CardTitle>
                <CardDescription>Factors that influence your investment risk profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
                  <InfoCard icon={TrendingUp} label="Liquidity Needs" value={`${userRiskProfileData.liquidityNeeds}%`} color="blue" />
                  <InfoCard icon={Shield} label="Debt Level" value={`${userRiskProfileData.debtLevel}%`} color="red" />
                  <InfoCard
                    icon={Target}
                    label="Ethical Investing"
                    value={userRiskProfileData.preferences.ethicalInvesting ? "Yes" : "No"}
                    color="green"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Profile Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-lg">{userRiskProfileData.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Profile Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Profile Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <InfoCard
                    icon={Calendar}
                    label="Profile Created"
                    value={new Date(userRiskProfileData.createdAt).toLocaleDateString()}
                    color="gray"
                  />
                  <InfoCard
                    icon={Calendar}
                    label="Last Updated"
                    value={new Date(userRiskProfileData.updatedAt).toLocaleDateString()}
                    color="gray"
                  />
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Aggregated Risk Details */}
          <AggregatedRiskDetails
            data={aggregatedRiskDetails}
          />

            <Separator />

            {/* Action Button */}
            <div className="fixed bottom-4 right-4">
              {userRiskProfileData && (
              <Button className="bg-emerald-800 hover:bg-emerald-700"
                onClick={() => setShowWizard(true)}>
                    Update Risk Profile
                </Button>
              )}
            </div>
        </TabsContent>
        <TabsContent value="alerts" className="space-y-6 mt-0" >
          <AlertsPage />
        </TabsContent>
        </Tabs>
        </>)}
      {showWizard && (
        <RiskWizard
          initialData={userRiskProfileData}
          onCancel={handleCancel}
          onComplete={handleUpdate}
        />
      )}
    </div>
  )
}
