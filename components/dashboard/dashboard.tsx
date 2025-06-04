"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PortfolioOverview from "./portfolio-overview"
import PerformanceChart from "./performance-chart"
import SubsidiaryAllocation from "./subsidiary-allocation"
import RecentActivities from "./recent-activities"
import { useAuth } from "@/context/authContext"
import { useQuery } from "@tanstack/react-query"
import { getUserRisk } from "@/services/user/service"
import Loading from "../ui/loading"
import Error from "../ui/error"
import {
  getAllPortfolioAssets, getMyPortfolio,
  getPortfolioMonthlyPerformance,
  getBenchmarksMonthlyLastYear,
} from "@/services/portfolio/service"
import { Asset } from "@/types/types"


const RiskToleranceModifier = {
  1:'Low',
  2:'Medium',
  3:'High',
}

export default  function Dashboard() {
  const { user } = useAuth();

  const { data: userRisk, isLoading: riskLoading, error: riskError } = useQuery(
    {
    queryKey: ["user-risk"],
    queryFn: getUserRisk,
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,

  }
  )

  const { data: myPortfolio, isLoading: portfolioLoading, error: portfolioError } = useQuery({
    queryKey: ["my-portfolio"],
    queryFn: getMyPortfolio,
    enabled: !!user,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,

  });

  const { data: portfolioAssets = [], isLoading: assetsLoading, error: assetsError } = useQuery({
    queryKey: ["portfolio-assets", myPortfolio?.id],
    queryFn: () => getAllPortfolioAssets(myPortfolio?.id),
    enabled: !!myPortfolio,
    staleTime: 15 * 60 * 1000, 
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const totalPortfolioValue = portfolioAssets?.reduce(
    (sum: number, asset: Asset) => sum + Number(asset.currentPrice * asset.quantity),
    0
  ) ?? 0;

  const { data: performanceData, isLoading: performanceLoading, error: performanceError } = useQuery({
    queryKey: ["portfolio-performance", myPortfolio?.id],
    queryFn: () => getPortfolioMonthlyPerformance(myPortfolio!.id),
    enabled: !!myPortfolio,
    staleTime: 60 * 60 * 1000, 
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: benchmarkData={}, isLoading: benchmarkLoading, error: benchmarkError } = useQuery({
    queryKey: ["benchmark-performance"],
    queryFn: getBenchmarksMonthlyLastYear,
    enabled: !!myPortfolio,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const subsidiaryAllocationData = [
    { name: "AssetVest", value: parseFloat(totalPortfolioValue), color: "#3b82f6" },
    // { name: "RiskVest", value: 500, color: "#ef4444" },
    // { name: "QuantumVest", value: 20, color: "#8b5cf6" },
    // { name: "HedgeVest", value: 10, color: "#10b981" },
    // { name: "PartVest", value: 5, color: "#f97316" },
    // { name: "PrivateVest", value: 10, color: "#6366f1" },
    // { name: "RelVest", value: 5, color: "#ec4899" },
  ]
  if (riskLoading || portfolioLoading || performanceLoading || assetsLoading ) return <Loading />;
  if (riskError || portfolioError || performanceError || assetsError ) return <Error/>;

  console.log(userRisk);
  console.log(myPortfolio);

  return (
      <div className="space-y-6">
        
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">ShareVest Dashboard</h1>
              <p className="text-muted-foreground">Welcome back,{user?.username} . Here's an overview of your investments across all subsidiaries.</p>
            </div>
            {/* <Tabs defaultValue="overview" className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
            </Tabs> */}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
            <div className="text-2xl font-bold">${ totalPortfolioValue }</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+2.5%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Risk Score</CardTitle>
              </CardHeader>
              <CardContent>
            <div className="text-2xl font-bold">{ userRisk.overallRiskScore * 100}/100</div>
                <p className="text-xs text-muted-foreground">Moderate user risk </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Tolerance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {RiskToleranceModifier[userRisk.riskTolerance as 1 | 2 | 3]}
                </div>

                {/* <p className="text-xs text-muted-foreground">User Risk Tolerance </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscription Plan</CardTitle>
              </CardHeader>
              <CardContent>
            <div className="text-2xl font-bold">{ user?.subscriptionPlan }</div>
                {/* <p className="text-xs text-muted-foreground">$150/month - Full access</p> */}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>Your investment performance over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
            <PerformanceChart benchmarks={benchmarkData } data={performanceData} />
              </CardContent>
            </Card>
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Subsidiary Allocation</CardTitle>
                <CardDescription>Current distribution across subsidiaries</CardDescription>
              </CardHeader>
              <CardContent>
            <SubsidiaryAllocation data={ subsidiaryAllocationData } />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>AssetVest</CardTitle>
                <CardDescription>Asset Management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Portfolio Value</span>
                    <span className="font-medium">${ totalPortfolioValue }</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Monthly Return</span>
                    <span className="font-medium text-emerald-500">+3.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Assets</span>
                <span className="font-medium">{ portfolioAssets?.length}</span>
              </div>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>QuantumVest</CardTitle>
                <CardDescription>Market Data & Analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Market Insights</span>
                    <span className="font-medium">12 New</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Watchlist Assets</span>
                    <span className="font-medium">28</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Investment Opportunities</span>
                    <span className="font-medium">5 Premium</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>PartVest</CardTitle>
                <CardDescription>Crowdfunding</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active Campaigns</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Contributed</span>
                    <span className="font-medium">$75,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Exclusive Access</span>
                    <span className="font-medium">3 Campaigns</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>RiskVest</CardTitle>
                <CardDescription>Risk Management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Risk Alerts</span>
                    <span className="font-medium">3 Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Hedging Status</span>
                    <span className="font-medium text-amber-500">Moderate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Simulations</span>
                    <span className="font-medium">2 Pending</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>HedgeVest</CardTitle>
                <CardDescription>Hedge Fund Management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Fund Value</span>
                    <span className="font-medium">$215,300</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Performance</span>
                    <span className="font-medium text-emerald-500">+12.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Funds</span>
                    <span className="font-medium">3 Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>PrivateVest</CardTitle>
                <CardDescription>Private Equity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Investments</span>
                    <span className="font-medium">$170,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Deals</span>
                    <span className="font-medium">2 Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Exclusive Offers</span>
                    <span className="font-medium">1 New</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>RelVest</CardTitle>
                <CardDescription>Investor Relations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Companies</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Upcoming Events</span>
                    <span className="font-medium">2 AGMs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Voting Rights</span>
                    <span className="font-medium">3 Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Portfolio Overview</CardTitle>
                <CardDescription>Summary of your investments by type and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <PortfolioOverview assets={portfolioAssets} />
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest transactions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivities />
              </CardContent>
            </Card>
          </div>
      </div>
  )
}