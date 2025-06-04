import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"


export default function MarketChart({spyData} : {spyData: any}) {
    const [showMA, setShowMA] = useState(false)
    const backUp = [
        { name: "09:00", price: 4320, ma20: 4315 },
        { name: "10:00", price: 4332, ma20: 4320 },
        { name: "11:00", price: 4310, ma20: 4318 },
        { name: "12:00", price: 4345, ma20: 4325 },
        { name: "13:00", price: 4350, ma20: 4330 },
    ]

    const data = spyData.length > 0 ? spyData.map(
        (item: { timestamp: string; close: number; ma20:number }) => ({
        name: item.timestamp,
        price: item.close,
        ma20: item.ma20,
        })
    ) : backUp;

    return (
        <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
            <Button variant="outline" size="sm" className={showMA ? "bg-zinc-800" : ""} onClick={() => setShowMA(!showMA)}>
            MA(20)
            </Button>
            <TooltipProvider>
            <UITooltip>
                <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Info className="h-4 w-4" />
                </Button>
                </TooltipTrigger>
                <TooltipContent>
                <p className="text-xs">20-period Moving Average helps identify trends</p>
                </TooltipContent>
            </UITooltip>
            </TooltipProvider>
        </div>

        <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data}>
            <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Area
                type="monotone"
                dataKey="price"
                stroke="#22c55e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
            />
            {showMA && <Line type="monotone" dataKey="ma20" stroke="#6366f1" strokeWidth={1.5} dot={false} />}
            </AreaChart>
        </ResponsiveContainer>
        </div>
    )
    }