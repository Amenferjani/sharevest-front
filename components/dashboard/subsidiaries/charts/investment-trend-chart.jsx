"use client"

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts"
import React from "react"
import { LineChart, TrendingDown } from 'lucide-react';

function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
        return (
        <div className="bg-zinc-800 border border-zinc-700 p-2 rounded shadow-lg">
            <p className="text-zinc-200 text-sm font-medium">{label}</p>
            <p className="text-indigo-400 text-sm">
            ${payload[0].value.toLocaleString()}
            </p>
        </div>
        )
    }
    return null
}

/**
 * @param {{ data: Array<{ month: string; amount: number }> }}
 */
export default function InvestmentTrendChart({ data }) {
    if (!data || data.length === 0) {
        return (
        <div className="flex flex-col items-center justify-center h-full min-h-[300px] p-6">
            <div className="relative mb-6 flex items-center justify-center">
            <div className="absolute">
                <LineChart 
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
            No investment data
            </h3>
            
            <p className="text-zinc-500 mb-6 text-center text-sm leading-relaxed max-w-sm">
            Add your investments to see your portfolio's performance trends and analytics.
            </p>
        </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
            <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
            </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis
            dataKey="month"
            tick={{ fill: "#94a3b8" }}
            axisLine={{ stroke: "#333" }}
            tickLine={{ stroke: "#333" }}
            />
            <YAxis
            tick={{ fill: "#94a3b8" }}
            axisLine={{ stroke: "#333" }}
            tickLine={{ stroke: "#333" }}
            tickFormatter={(val) => `$${val / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
            wrapperStyle={{ color: "#94a3b8" }}
            formatter={() => <span style={{ color: "#94a3b8" }}>Total Invested ($)</span>}
            />
            <Area
            type="monotone"
            dataKey="amount"
            name="Total Invested ($)"
            stroke="#6366f1"
            fill="url(#colorAmount)"
            fillOpacity={1}
            strokeWidth={2}
            />
        </AreaChart>
        </ResponsiveContainer>
    )
}
