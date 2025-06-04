"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface FilterPanelProps {
    selectedStrategy: string
    selectedRiskLevel: string
    onStrategyChange: (strategy: string) => void
    onRiskLevelChange: (riskLevel: string) => void
}

export default function FilterPanel({
    selectedStrategy,
    selectedRiskLevel,
    onStrategyChange,
    onRiskLevelChange,
}: FilterPanelProps) {
    const strategies = [
        "Long/Short Equity",
        "Market Neutral",
        "Event Driven",
        "Global Macro",
        "Quantitative",
        "Multi-Strategy",
        "Distressed Securities",
        "Merger Arbitrage",
    ]

    const riskLevels = ["Low", "Medium", "High"]

    return (
        <div className="flex gap-4">
            <div className="space-y-2">
                <Label htmlFor="strategy-filter">Strategy</Label>
                <Select value={selectedStrategy} onValueChange={onStrategyChange}>
                    <SelectTrigger id="strategy-filter" className="w-[180px]">
                        <SelectValue placeholder="All Strategies" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Strategies</SelectItem>
                        {strategies.map((strategy) => (
                            <SelectItem key={strategy} value={strategy}>
                                {strategy}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="risk-filter">Risk Level</Label>
                <Select value={selectedRiskLevel} onValueChange={onRiskLevelChange}>
                    <SelectTrigger id="risk-filter" className="w-[140px]">
                        <SelectValue placeholder="All Risk Levels" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Risk Levels</SelectItem>
                        {riskLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                                {level} Risk
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
