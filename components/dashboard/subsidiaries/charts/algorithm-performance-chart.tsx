"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { day: "Mon", quantum: 1200, market: 1000 },
  { day: "Tue", quantum: 1300, market: 1050 },
  { day: "Wed", quantum: 1400, market: 1100 },
  { day: "Thu", quantum: 1350, market: 1080 },
  { day: "Fri", quantum: 1500, market: 1120 },
  { day: "Sat", quantum: 1550, market: 1150 },
  { day: "Sun", quantum: 1600, market: 1180 },
]

export default function AlgorithmPerformanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="quantum" stroke="#8b5cf6" activeDot={{ r: 8 }} name="Quantum Algorithms" />
          <Line type="monotone" dataKey="market" stroke="#6b7280" name="Market Average" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
