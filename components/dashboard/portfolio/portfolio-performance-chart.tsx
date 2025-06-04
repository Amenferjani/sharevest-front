"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { month: "Jan", portfolio: 1000, benchmark: 1000 },
  { month: "Feb", portfolio: 1050, benchmark: 1020 },
  { month: "Mar", portfolio: 1100, benchmark: 1030 },
  { month: "Apr", portfolio: 1080, benchmark: 1040 },
  { month: "May", portfolio: 1150, benchmark: 1060 },
  { month: "Jun", portfolio: 1200, benchmark: 1080 },
  { month: "Jul", portfolio: 1250, benchmark: 1100 },
  { month: "Aug", portfolio: 1300, benchmark: 1120 },
  { month: "Sep", portfolio: 1350, benchmark: 1140 },
  { month: "Oct", portfolio: 1400, benchmark: 1160 },
  { month: "Nov", portfolio: 1450, benchmark: 1180 },
  { month: "Dec", portfolio: 1500, benchmark: 1200 },
]

export default function PortfolioPerformanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="portfolio" stroke="#10b981" activeDot={{ r: 8 }} name="Your Portfolio" />
          <Line type="monotone" dataKey="benchmark" stroke="#6b7280" name="Market Benchmark" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
