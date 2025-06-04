"use client"

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts"

const data = [
  { subject: "Market Risk", A: 80, B: 65, fullMark: 100 },
  { subject: "Credit Risk", A: 45, B: 40, fullMark: 100 },
  { subject: "Liquidity Risk", A: 60, B: 70, fullMark: 100 },
  { subject: "Operational Risk", A: 30, B: 35, fullMark: 100 },
  { subject: "Regulatory Risk", A: 50, B: 55, fullMark: 100 },
  { subject: "Concentration Risk", A: 65, B: 75, fullMark: 100 },
]

export default function RiskAssessmentChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Current Portfolio" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
          <Radar name="Industry Average" dataKey="B" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
