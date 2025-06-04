"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Global Macro", returns: 18.5, benchmark: 12.3 },
  { name: "Long/Short", returns: 15.2, benchmark: 10.8 },
  { name: "Event Driven", returns: 21.7, benchmark: 14.5 },
  { name: "Relative Value", returns: 12.8, benchmark: 9.6 },
  { name: "Multi-Strategy", returns: 16.9, benchmark: 11.2 },
]

export default function HedgeFundPerformanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="returns" name="Fund Returns %" fill="#10b981" />
          <Bar dataKey="benchmark" name="Benchmark %" fill="#6b7280" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
