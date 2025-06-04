"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { month: "Jan", newUsers: 120, activeUsers: 1000 },
  { month: "Feb", newUsers: 145, activeUsers: 1100 },
  { month: "Mar", newUsers: 160, activeUsers: 1200 },
  { month: "Apr", newUsers: 190, activeUsers: 1350 },
  { month: "May", newUsers: 210, activeUsers: 1500 },
  { month: "Jun", newUsers: 250, activeUsers: 1700 },
  { month: "Jul", newUsers: 280, activeUsers: 1900 },
  { month: "Aug", newUsers: 320, activeUsers: 2100 },
  { month: "Sep", newUsers: 350, activeUsers: 2300 },
  { month: "Oct", newUsers: 370, activeUsers: 2400 },
  { month: "Nov", newUsers: 390, activeUsers: 2450 },
  { month: "Dec", newUsers: 400, activeUsers: 2543 },
]

export default function UserStats() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="newUsers" stroke="#10b981" activeDot={{ r: 8 }} name="New Users" />
          <Line type="monotone" dataKey="activeUsers" stroke="#6366f1" name="Active Users" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
