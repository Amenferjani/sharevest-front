"use client"

import { Asset } from "@/types/types"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"

// if your incoming `type` is singular ("Stock") but your map is plural,
// you can either adjust this map or pluralize at lookup time:
const defaultColorMap: Record<string, string> = {
  Stocks:     "#3b82f6",
  Bonds:      "#10b981",
  "Real Estate": "#f59e0b",
  Crypto:     "#8b5cf6",
  Cash:       "#6b7280",
}

function getColor(key: string, cache: Map<string,string>) {
  // try exact
  if (defaultColorMap[key]) return defaultColorMap[key]
  // try pluralized
  const plural = key.endsWith("s") ? key : key + "s"
  if (defaultColorMap[plural]) return defaultColorMap[plural]
  // else random fallback
  if (cache.has(key)) return cache.get(key)!
  const rand = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6,"0")
  cache.set(key, rand)
  return rand
}

export default function AssetAllocationChart({ assets }: { assets: Asset[] }) {
  console.log("Asset Allocation assets:", assets)

  const colorCache = new Map<string,string>()

  // group by type → accumulate market value
  const grouped = assets.reduce<
    Record<string, { name: string; value: number; color: string }>
  >((acc, { type, quantity, currentPrice }) => {
    const key = type || "Other"
    const priceNum = currentPrice
    const marketValue = quantity * (isNaN(priceNum) ? 0 : priceNum)

    if (!acc[key]) {
      acc[key] = {
        name: key,
        value: 0,
        color: getColor(key, colorCache),
      }
    }
    acc[key].value += marketValue
    return acc
  }, {})

  // build array for Recharts
  const chartData = Object.values(grouped)

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
  data={chartData}
  cx="50%"
  cy="50%"
  outerRadius={80}
  dataKey="value"
  // 1) kill the white border
  stroke="none"
  // 2) render fully on first paint
  isAnimationActive={false}
  // (optional) explicitly cover the full 360°
  startAngle={0}
  endAngle={360}
  label={({ name, percent }) =>
    `${name} ${(percent! * 100).toFixed(0)}%`
  }
>
  {chartData.map((entry, idx) => (
    <Cell
      key={idx}
      // if you ever want a border, match it to the fill:
      // stroke={entry.color}
      fill={entry.color}
    />
  ))}
</Pie>

          <Tooltip
            formatter={(value: number) =>
              // format as currency, two decimals
              `$${value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
            }
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
