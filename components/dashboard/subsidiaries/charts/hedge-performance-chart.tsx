"use client"

interface PerformanceDataPoint {
    date: string
    portfolioValue: number
    monthlyReturn: number
    benchmark: number
}

interface PerformanceChartProps {
    data: PerformanceDataPoint[]
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
    const maxReturn = Math.max(...data.map((d) => Math.max(d.monthlyReturn, d.benchmark)))
    const minReturn = Math.min(...data.map((d) => Math.min(d.monthlyReturn, d.benchmark)))
    const range = maxReturn - minReturn
    const padding = range * 0.1

    const getYPosition = (value: number) => {
        return ((maxReturn + padding - value) / (range + 2 * padding)) * 200
    }

    const formatPercentage = (value: number) => `${value > 0 ? "+" : ""}${value.toFixed(1)}%`

    const formatMonth = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) // e.g. "Jan '24"
    }

    return (
        <div className="w-full">
            <div className="mb-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span>Fund Performance</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span>Benchmark</span>
                </div>
            </div>

            <div className="relative">
                <svg width="100%" height="240" className="overflow-visible">
                    {/* Grid lines */}
                    {[-10, -5, 0, 5, 10, 15, 20].map((value) => (
                        <g key={value}>
                            <line
                                x1="40"
                                y1={getYPosition(value) + 20}
                                x2="100%"
                                y2={getYPosition(value) + 20}
                                stroke="#f1f5f9"
                                strokeWidth="1"
                            />
                            <text x="35" y={getYPosition(value) + 25} textAnchor="end" className="text-xs fill-gray-500">
                                {formatPercentage(value)}
                            </text>
                        </g>
                    ))}

                    {/* Fund performance line */}
                    <polyline
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2"
                        points={data
                            .map((d, i) => `${50 + i * (100 / (data.length - 1)) * 8},${getYPosition(d.monthlyReturn) + 20}`)
                            .join(" ")}
                    />

                    {/* Benchmark line */}
                    <polyline
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        points={data
                            .map((d, i) => `${50 + i * (100 / (data.length - 1)) * 8},${getYPosition(d.benchmark) + 20}`)
                            .join(" ")}
                    />

                    {/* Data points */}
                    {data.map((d, i) => (
                        <g key={i}>
                            <circle
                                cx={50 + i * (100 / (data.length - 1)) * 8}
                                cy={getYPosition(d.monthlyReturn) + 20}
                                r="3"
                                fill="#2563eb"
                                className="hover:r-4 transition-all cursor-pointer"
                            />
                            <circle
                                cx={50 + i * (100 / (data.length - 1)) * 8}
                                cy={getYPosition(d.benchmark) + 20}
                                r="3"
                                fill="#9ca3af"
                                className="hover:r-4 transition-all cursor-pointer"
                            />
                        </g>
                    ))}

                    {/* X-axis labels */}
                    {data.map((d, i) => (
                        <text
                            key={i}
                            x={50 + i * (100 / (data.length - 1)) * 8}
                            y="235"
                            textAnchor="middle"
                            className="text-xs fill-gray-500"
                        >
                            {formatMonth(d.date)}
                        </text>
                    ))}
                </svg>
            </div>
        </div>
    )
}
