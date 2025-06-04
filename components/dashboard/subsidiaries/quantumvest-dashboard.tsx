"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Bell, Info, ArrowUp, ArrowDown, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { getBenchmarksMonthlyLastYear, getEconomicEvents, getSectorsPerformance, getSpyIntradayChart, getTopMovers } from "@/services/portfolio/service"
import Loading from "@/components/ui/loading"
import Error from "@/components/ui/error"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarketChart from "./charts/market-chart"
import TopMoversTable from "./tables/top-movers-table"
import EnhancedEconomicCalendar from "./lists/economic-calendar"
import SectorPerformance from "./lists/sector-performance"


const staticBenchmarkData: {
  symbol: string
  history: { date: string; close: number }[]
}[] = [
  {
    symbol: "SPY",
    history: [
      { date: "2024-05-31", close: 426.12 },
      { date: "2024-06-30", close: 430.55 },
      { date: "2024-07-31", close: 438.76 },
      { date: "2024-08-31", close: 442.10 },
      { date: "2024-09-30", close: 445.35 },
      { date: "2024-10-31", close: 449.21 },
      { date: "2024-11-30", close: 452.14 },
      { date: "2024-12-31", close: 455.67 },
      { date: "2025-01-31", close: 458.90 },
      { date: "2025-02-28", close: 462.34 },
      { date: "2025-03-31", close: 468.05 },
      { date: "2025-04-30", close: 435.20 },
    ],
  },
  {
    symbol: "QQQ",
    history: [
      { date: "2024-05-31", close: 330.20 },
      { date: "2024-06-30", close: 335.45 },
      { date: "2024-07-31", close: 340.67 },
      { date: "2024-08-31", close: 345.12 },
      { date: "2024-09-30", close: 348.56 },
      { date: "2024-10-31", close: 352.01 },
      { date: "2024-11-30", close: 355.45 },
      { date: "2024-12-31", close: 360.12 },
      { date: "2025-01-31", close: 365.90 },
      { date: "2025-02-28", close: 370.34 },
      { date: "2025-03-31", close: 375.05 },
      { date: "2025-04-30", close: 389.45 },
    ],
  },
  {
    symbol: "DIA",
    history: [
      { date: "2024-05-31", close: 320.12 },
      { date: "2024-06-30", close: 325.56 },
      { date: "2024-07-31", close: 330.78 },
      { date: "2024-08-31", close: 335.01 },
      { date: "2024-09-30", close: 340.24 },
      { date: "2024-10-31", close: 345.47 },
      { date: "2024-11-30", close: 350.67 },
      { date: "2024-12-31", close: 355.89 },
      { date: "2025-01-31", close: 360.12 },
      { date: "2025-02-28", close: 365.34 },
      { date: "2025-03-31", close: 370.56 },
      { date: "2025-04-30", close: 349.90 },
    ],
  },
];
export default function QuantumVestDashboard() {
  const [watchlist, setWatchlist] = useState([
    { symbol: "AAPL", price: 174.5, change: +1.2, alert: false },
    { symbol: "GOOGL", price: 128.9, change: -0.5, alert: false },
    { symbol: "MSFT", price: 312.8, change: +0.9, alert: false },
  ])
  const [newSymbol, setNewSymbol] = useState("");

  const { data: benchmarkData, isLoading: benchmarkLoading, error: benchmarkError } = useQuery({
    queryKey: ["benchmark-performance"],
    queryFn: getBenchmarksMonthlyLastYear,
    enabled: typeof window !== 'undefined',
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: spyData, isLoading: spyLoading, error: spyError } = useQuery({
    queryKey: ["spy-intraday-data"],
    queryFn: getSpyIntradayChart,
    enabled: typeof window !== 'undefined',
    staleTime: 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: topMoversData, isLoading: topMoversLoading, error: topMoversError } = useQuery({
    queryKey: ["top-movers"],
    queryFn: getTopMovers,
    enabled: typeof window !== 'undefined',
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: economicEventsData, isLoading: economicEventsLoading, error: economicEventsError } = useQuery({
    queryKey: ["economic-events"],
    queryFn: getEconomicEvents,
    enabled: typeof window !== 'undefined',
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: sectorPerformanceData, isLoading: sectorPerformanceLoading, error: sectorPerformanceError } = useQuery({
    queryKey: ["sector-performance"],
    queryFn: getSectorsPerformance,
    enabled: typeof window !== 'undefined',
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (benchmarkLoading || spyLoading || topMoversLoading || economicEventsLoading || sectorPerformanceLoading) return <Loading />;
  if (benchmarkError || spyError || topMoversError || economicEventsError || sectorPerformanceError) return <Error />;

  const benchmarkToUse =
    Array.isArray(benchmarkData) && benchmarkData.length > 0
      ? benchmarkData
      : staticBenchmarkData;

  const handleAddSymbol = () => {
    if (!newSymbol.trim()) return
    const randomPrice = (Math.random() * 300 + 50).toFixed(2)
    const randomChange = (Math.random() * 4 - 2).toFixed(1)
    setWatchlist([
      ...watchlist,
      {
        symbol: newSymbol.toUpperCase(),
        price: Number.parseFloat(randomPrice),
        change: Number.parseFloat(randomChange),
        alert: false,
      },
    ])
    setNewSymbol("")
  }

  const toggleAlert = (symbol : string) => {
    setWatchlist(watchlist.map((item) => (item.symbol === symbol ? { ...item, alert: !item.alert } : item)))
    }
  return (
    <div className="space-y-6 bg-black/50 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">QuantumVest</h1>
          <p className="text-zinc-400">Your personal smart investment dashboard.</p>
        </div>
      </div>

      {/* Market Cards */}
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
      {benchmarkToUse?.map(({ symbol, history }) => {
        const first = history[0].close;
        const last = history.at(-1)!.close;
        const returnPct = ((last / first - 1) * 100).toFixed(1);
        
        return (
          <Card key={symbol} className="border-zinc-800 bg-zinc-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {(() => {
                  switch (symbol) {
                    case "SPY": return "S&P 500";
                    case "QQQ": return "NASDAQ 100";
                    case "DIA": return "Dow Jones";
                    default:   return symbol;
                  }
                })()}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${last.toLocaleString()}</div>
              <p className={`text-xs ${parseFloat(returnPct) >= 0 ? "text-green-500" : "text-red-500"}`}>
                {parseFloat(returnPct) >= 0 ? "+" : ""}
                {returnPct}%
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
      {/* Market Chart & Top Movers */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4 border-zinc-800 bg-zinc-900">
          <CardHeader>
            <CardTitle>Market Overview</CardTitle>
            <CardDescription className="text-zinc-400">Live market trends and sentiment</CardDescription>
          </CardHeader>
          <CardContent>
            <MarketChart spyData={spyData} />
          </CardContent>
        </Card>
        <Card className="md:col-span-3 border-zinc-800 bg-black/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Movers</CardTitle>
              <CardDescription className="text-zinc-400">Today's most active stocks</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <TopMoversTable topMovers={topMoversData} />
          </CardContent>
        </Card>
      </div>

      {/* Economic Calendar - Full Width Row */}
      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle>Economic Calendar</CardTitle>
          <CardDescription className="text-zinc-400">Upcoming market events and earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <EnhancedEconomicCalendar economicEvents={economicEventsData} />
        </CardContent>
      </Card>

      {/* Watchlist,  Sector Performance */}
      <div className="grid  md:grid-cols-1 lg:grid-cols-1">
        {/* Redesigned Sector Performance */}
        <Card className="border-zinc-800 bg-black/50">
          <CardHeader>
            <CardTitle>Sector Performance</CardTitle>
            <CardDescription className="text-zinc-400">Daily market sector changes</CardDescription>
          </CardHeader>
          <CardContent>
            <SectorPerformance sectorPerformanceData={sectorPerformanceData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
