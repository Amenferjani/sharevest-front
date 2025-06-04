"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BenchmarkData, PortfolioDataPoint } from "@/types/types"
import { BarChart3, TrendingDown, ArrowRight } from "lucide-react";

const benchmarkLabels: Record<string, string> = {
  SPY: "S&P 500",
  QQQ: "NASDAQ",
  DIA: "Dow Jones",
}
const symbolOptions = [
  { key: "SPY", label: "S&P 500" },
  { key: "QQQ", label: "NASDAQ" },
  { key: "DIA", label: "Dow Jones" }
]
interface PerformanceChartProps {
  benchmarks: BenchmarkData[];
  data: PortfolioDataPoint[];
}
interface ChartDataPoint {
  month: string;
  portfolio: number;
  benchmark: number;
}


function getPreviousMonth(monthStr: string) {
  const [year, month] = monthStr.split("-").map(Number)
  const d = new Date(year, month - 2, 1)
  return d.toISOString().slice(0, 7)
}

export default function PerformanceChart({ benchmarks, data }: PerformanceChartProps) {
  const [selectedBenchmark, setSelectedBenchmark] = useState("SPY");
  const router = useRouter(); 

  // Map the benchmark history by symbol
  const benchmarkHistoryMap = benchmarks?.length
    ? Object.fromEntries(
        benchmarks.map(b => [
          b.symbol,
          Object.fromEntries(b.history.map(h => [
            h.date.slice(0,7),
            h.close
          ]))
        ])
      )
    : {}

  let chartData: ChartDataPoint[] = [];

  if (data?.length === 1) {
    const only = data[0]
    const bmObj = benchmarkHistoryMap[selectedBenchmark] || {}
    const prevMonth = getPreviousMonth(only.month)
    const prevBenchmark = bmObj?.[prevMonth] ?? 0
    const currBenchmark = bmObj?.[only.month] ?? 0
    chartData = [
      { month: prevMonth, portfolio: 0, benchmark: prevBenchmark },
      { month: only.month, portfolio: only.value, benchmark: currBenchmark }
    ]
  } else if (data?.length > 1) {
    chartData = data.map(item => ({
      month: item.month,
      portfolio: item.value,
      benchmark: benchmarkHistoryMap[selectedBenchmark]?.[item.month] ?? null,
    }))
  }

  const noData = !data || data.length === 0 || chartData.length === 0

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {!noData ?
          <Select value={selectedBenchmark} onValueChange={setSelectedBenchmark}>
          <SelectTrigger className="w-[180px] bg-zinc-900 border-zinc-700 text-white">
            <SelectValue placeholder="Select benchmark" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
            {symbolOptions.map(opt => (
              <SelectItem key={opt.key} value={opt.key}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
          </Select> :
          <></>
        }
      </div>
      <div className="h-[300px] w-full flex items-center justify-center">
        {noData ? (
            <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-sm w-full">
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="relative mb-6 flex items-center justify-center">
                    <div className="absolute">
                      <BarChart3 
                        size={48} 
                        className="text-zinc-200 animate-pulse" 
                        strokeWidth={1.5} 
                      />
                    </div>
                    <div className="absolute -right-4 -bottom-4">
                      <TrendingDown 
                        size={28} 
                        className="text-zinc-300" 
                        strokeWidth={1.5} 
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium text-zinc-800 mb-2 text-center">
                    No performance data yet
                  </h3>
                  
                  <p className="text-zinc-500 mb-6 text-center text-sm leading-relaxed">
                    Add your first investment to 
                    start tracking your portfolio performance.
                  </p>
                  
                  <button
                    className="group w-full px-4 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 
                              transition-all duration-300 flex items-center justify-center space-x-2"
                    onClick={() => router.push('/dashboard/assetvest')}
                  >
                    <span>Add Investments</span>
                    <ArrowRight 
                      size={16} 
                      className="transition-transform duration-300 group-hover:translate-x-1" 
                    />
                  </button>
                </div>
              </div>
            </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#222",
                  borderColor: "#444",
                  color: "#fff",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="portfolio"
                stroke="#10b981"
                activeDot={{ r: 8 }}
                name="Your Portfolio"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#6b7280"
                name={benchmarkLabels[selectedBenchmark]}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
