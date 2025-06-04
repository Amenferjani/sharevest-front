"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart, PieChart } from "lucide-react"
import AssetAllocationChart from "./charts/asset-allocation-chart"
import AssetPerformanceTable from "./tables/asset-performance-table"
import InvestmentOpportunitiesTable from "@/components/dashboard/portfolio/search-asset-table"
import { getAllPortfolioAssets, getAllTransactionsInPortfolio, getMarketData, getMyPortfolio } from "@/services/portfolio/service"
import { useQuery } from "@tanstack/react-query"
import { useRef, useState } from "react";
import { useAuth } from "@/context/authContext"
import Loading from "@/components/ui/loading"
import Error from "@/components/ui/error"
import { Asset } from "@/types/types"
import TransactionsTabContent from "./sub-pages/transactions-page"
import AssetSearchTable from "@/components/dashboard/portfolio/search-asset-table"



export default function AssetVestDashboard() {
  const { user } = useAuth();
  const [tabsValue, setTabsValue] = useState("overview");
  const performanceRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: myPortfolio, isLoading: portfolioLoading, error: portfolioError } = useQuery({
    queryKey: ["my-portfolio"],
    queryFn: getMyPortfolio,
    enabled: !!user,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: portfolioAssets, isLoading: assetsLoading, error: assetsError } = useQuery({
    queryKey: ["portfolio-assets", myPortfolio?.id],
    queryFn: () => getAllPortfolioAssets(myPortfolio?.id),
    enabled: !!myPortfolio,
    staleTime: 15 * 60 * 1000, 
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: assetPrices, isLoading: pricesLoading, error: priceError } = useQuery({
    queryKey: ["asset-prices"],
    queryFn: async () =>{
      return await Promise.all(
        portfolioAssets.map((asset:Asset) =>
          getMarketData(asset.ticker)
        )
      );
    },
    enabled : !!portfolioAssets && portfolioAssets?.length > 0,
    staleTime: 15 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

    const { data: portfolioTransactions, isLoading: transactionsLoading, error: transactionsError } = useQuery({
    queryKey: ["portfolio-transactions", myPortfolio?.id],
    queryFn: () => getAllTransactionsInPortfolio(myPortfolio?.id),
    enabled: !!myPortfolio ,
    staleTime: 15 * 60 * 1000, 
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // console.log(" portfolio transactions",portfolioTransactions)
  const totalPortfolioValue = portfolioAssets?.reduce(
    (sum: number, asset: Asset) => sum + Number(asset.currentPrice * asset.quantity),
    0
  ) ?? 0;

  // console.log("totalPortfolioValue:",totalPortfolioValue)

    if ( portfolioLoading || assetsLoading || pricesLoading || transactionsLoading) return <Loading />;
    if ( portfolioError || assetsError || priceError || transactionsError) return <Error/>;

  return (
    <div className="space-y-6">
      <Tabs value={tabsValue} onValueChange={setTabsValue} className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="pb-3">
          <h1 className="text-2xl font-bold tracking-tight">AssetVest</h1>
          <p className="text-muted-foreground">Comprehensive asset management solutions for diverse portfolios.</p>
        </div>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
      </div>
    <TabsContent value="overview" className="space-y-6 mt-0">
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${ totalPortfolioValue === 0 ?"258,584":totalPortfolioValue.toFixed(2)}</div>
            
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Asset Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assetsLoading || assetsError || portfolioAssets.length === 0
                ? "5"
                : new Set(portfolioAssets.map((a: any) => a.type)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              {assetsLoading || assetsError || portfolioAssets.length === 0
                ? "Stocks, Bonds, ETFs, REITs, Commodities"
                : Array.from(new Set(portfolioAssets.map((a: any) => a.type))).join(", ")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ myPortfolio?.investmentStrategy}</div>
            <p className="text-xs text-muted-foreground">Portfolio investment strategy</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Current distribution across asset classes</CardDescription>
          </CardHeader>
          <CardContent>
            <AssetAllocationChart assets={portfolioAssets} />
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your asset portfolio</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full flex items-center justify-start gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                performanceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <BarChart className="h-4 w-4" />
              View Asset Performance
            </Button>
            <Button
              className="w-full flex items-center justify-start gap-2 bg-emerald-600 hover:bg-emerald-700"
              onClick={() => {
                searchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <LineChart className="h-4 w-4" />
              Search Asset Details
            </Button>
            <Button
              className="w-full flex items-center justify-start gap-2 bg-purple-600 hover:bg-purple-700"
              onClick={() => setTabsValue("Transactions")}
            >
              <PieChart className="h-4 w-4" />
              View Portfolio Transactions
            </Button>
          </CardContent>

        </Card>
      </div>

      <Card ref={performanceRef}>
        <CardHeader>
          <CardTitle>Asset Performance</CardTitle>
          <CardDescription>Performance metrics for your asset classes</CardDescription>
        </CardHeader>
        <CardContent>
          <AssetPerformanceTable portfolioId={myPortfolio.id} assets={portfolioAssets} assetsPrices={assetPrices as number[]} />
        </CardContent>
      </Card>
      <Card ref={searchRef}>
        <CardHeader>
          <CardTitle>Search Assets</CardTitle>
          <CardDescription>Find and explore assets to add to your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <AssetSearchTable portfolioId={myPortfolio?.id} />
        </CardContent>
        </Card>
    </TabsContent>
    
    <TabsContent value="Transactions" className="space-y-6 mt-0">
          <TransactionsTabContent portfolioId={myPortfolio.id} portfolioTransactions={ portfolioTransactions } />
    </TabsContent>
    </Tabs>
    </div>
  )
}
