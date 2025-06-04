"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Search, ArrowUpDown, ArrowUp, ArrowDown, Filter } from "lucide-react"
import { truncateWords } from "@/lib/utils"

export interface CampaignData {
    title: string
    baseRisk: number
    adjustedRisk: number
    }

    interface CrowdfundingRiskTableProps {
    campaigns?: CampaignData[]
    loading?: boolean
    }

    // example data
    const staticCampaigns: CampaignData[] = [
    { title: "camp_123", baseRisk: 18, adjustedRisk: 22 },
    { title: "camp_456", baseRisk: 30, adjustedRisk: 35 },
    { title: "camp_789", baseRisk: 45, adjustedRisk: 40 },
    { title: "camp_ABC", baseRisk: 55, adjustedRisk: 50 },
    { title: "camp_XYZ", baseRisk: 70, adjustedRisk: 65 },
    ]

    // Risk level component
    const RiskLevel = ({ value, type }: { value: number; type: "base" | "adjusted" }) => {
    const getRiskLevel = (val: number) => {
        if (val <= 30) return { level: "Low", color: "bg-green-500", bgColor: "bg-green-50", textColor: "text-green-700" }
        if (val <= 60)
        return { level: "Medium", color: "bg-yellow-500", bgColor: "bg-yellow-50", textColor: "text-yellow-700" }
        return { level: "High", color: "bg-red-500", bgColor: "bg-red-50", textColor: "text-red-700" }
    }

    const risk = getRiskLevel(value)
    const barColor = type === "base" ? "bg-blue-500" : "bg-purple-500"

    return (
        <div className="flex items-center gap-3">
        <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">{value.toFixed(2)}%</span>
            <Badge variant="outline" className={`${risk.bgColor} ${risk.textColor} border-0 text-xs`}>
                {risk.level}
            </Badge>
            </div>
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <div
                className={`h-2 ${barColor} rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${Math.min(value, 100)}%` }}
            />
            </div>
        </div>
        </div>
    )
    }

    // Sort button component
    const SortButton = ({
    column,
    currentSort,
    currentDir,
    onSort,
    children,
    }: {
    column: keyof CampaignData
    currentSort: keyof CampaignData
    currentDir: "asc" | "desc"
    onSort: (col: keyof CampaignData) => void
    children: React.ReactNode
    }) => {
    const isActive = currentSort === column

    return (
        <Button
        variant="ghost"
        size="sm"
        onClick={() => onSort(column)}
        className="h-auto p-1 font-medium hover:bg-muted/50"
        >
        {children}
        {isActive ? (
            currentDir === "asc" ? (
            <ArrowUp className="ml-1 h-3 w-3" />
            ) : (
            <ArrowDown className="ml-1 h-3 w-3" />
            )
        ) : (
            <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
        )}
        </Button>
    )
    }

    export default function CrowdfundingRiskTable({
    campaigns
    }: CrowdfundingRiskTableProps) {
    const [searchText, setSearchText] = useState("")
    const [baseMin, setBaseMin] = useState<number | "">("")
    const [baseMax, setBaseMax] = useState<number | "">("")
    const [adjMin, setAdjMin] = useState<number | "">("")
    const [adjMax, setAdjMax] = useState<number | "">("")
    const [sortBy, setSortBy] = useState<keyof CampaignData>("title")
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")

    const displayed = useMemo(() => {
    const list = campaigns ?? []  // if campaigns is undefined, use []
    
    return list
        .filter((c) => {
        // guard in case an entry itself is undefined
        if (!c) return false

        if (!c.title.toLowerCase().includes(searchText.toLowerCase())) return false
        if (baseMin !== "" && c.baseRisk < baseMin) return false
        if (baseMax !== "" && c.baseRisk > baseMax) return false
        if (adjMin !== "" && c.adjustedRisk < adjMin) return false
        if (adjMax !== "" && c.adjustedRisk > adjMax) return false
        return true
        })
        .sort((a, b) => {
        let cmp: number
        if (sortBy === "title") {
            cmp = a.title.localeCompare(b.title)
        } else {
            // `as keyof CampaignData` ensures TS knows this key is numeric
            cmp = (a[sortBy] as number) - (b[sortBy] as number)
        }
        return sortDir === "asc" ? cmp : -cmp
        })
    }, [
        campaigns,
        searchText,
        baseMin,
        baseMax,
        adjMin,
        adjMax,
        sortBy,
        sortDir,
    ])

    const toggleSort = (col: keyof CampaignData) => {
        if (sortBy === col) {
        setSortDir(sortDir === "asc" ? "desc" : "asc")
        } else {
        setSortBy(col)
        setSortDir("asc")
        }
    }

    const clearFilters = () => {
        setSearchText("")
        setBaseMin("")
        setBaseMax("")
        setAdjMin("")
        setAdjMax("")
    }

    const hasActiveFilters = searchText || baseMin !== "" || baseMax !== "" || adjMin !== "" || adjMax !== ""

    return (
        <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Crowdfunding Campaigns
            </CardTitle>
            <Badge variant="secondary">
                {displayed.length} of {campaigns?.length}
            </Badge>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            {/* Filters Section */}
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg border">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium flex items-center gap-2">
                <Search className="h-4 w-4" />
                Filters
                </h4>
                {hasActiveFilters && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear All
                </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="space-y-2">
                <label className="text-sm font-medium">Campaign Search</label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search campaigns..."
                    className="pl-10"
                    />
                </div>
                </div>

                {/* Base Risk Range */}
                <div className="space-y-2">
                <label className="text-sm font-medium">Base Risk Range (%)</label>
                <div className="flex gap-2">
                    <Input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="Min"
                    value={baseMin}
                    onChange={(e) => setBaseMin(e.target.value === "" ? "" : +e.target.value)}
                    />
                    <Input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="Max"
                    value={baseMax}
                    onChange={(e) => setBaseMax(e.target.value === "" ? "" : +e.target.value)}
                    />
                </div>
                </div>

                {/* Adjusted Risk Range */}
                <div className="space-y-2">
                <label className="text-sm font-medium">Adjusted Risk Range (%)</label>
                <div className="flex gap-2">
                    <Input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="Min"
                    value={adjMin}
                    onChange={(e) => setAdjMin(e.target.value === "" ? "" : +e.target.value)}
                    />
                    <Input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="Max"
                    value={adjMax}
                    onChange={(e) => setAdjMax(e.target.value === "" ? "" : +e.target.value)}
                    />
                </div>
                </div>
            </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-muted/50">
                    <tr>
                    <th className="px-6 py-4 text-left border-b">
                        <SortButton column="title" currentSort={sortBy} currentDir={sortDir} onSort={toggleSort}>
                        Campaign ID
                        </SortButton>
                    </th>
                    <th className="px-6 py-4 text-left border-b">
                        <SortButton column="baseRisk" currentSort={sortBy} currentDir={sortDir} onSort={toggleSort}>
                        Base Risk
                        </SortButton>
                    </th>
                    <th className="px-6 py-4 text-left border-b">
                        <SortButton column="adjustedRisk" currentSort={sortBy} currentDir={sortDir} onSort={toggleSort}>
                        Adjusted Risk
                        </SortButton>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {displayed.length > 0 ? (
                    displayed.map((campaign, index) => (
                        <tr
                        key={campaign.title}
                        className={`hover:bg-muted/30 transition-colors ${
                            index % 2 === 0 ? "bg-background" : "bg-muted/10"
                        }`}
                        >
                        <td className="px-6 py-4 border-b">
                            <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="font-medium">{truncateWords(campaign.title, 2)}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 border-b">
                            <RiskLevel value={(campaign.baseRisk)} type="base" />
                        </td>
                        <td className="px-6 py-4 border-b">
                            <RiskLevel value={campaign.adjustedRisk} type="adjusted" />
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan={3} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <Search className="h-8 w-8" />
                            <p className="text-lg font-medium">No campaigns found</p>
                            <p className="text-sm">Try adjusting your filters to see more results</p>
                            {hasActiveFilters && (
                            <Button variant="outline" size="sm" onClick={clearFilters} className="mt-2">
                                Clear Filters
                            </Button>
                            )}
                        </div>
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
            </div>
        </CardContent>
        {!campaigns && (
            <CardContent>
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
            </CardContent>
        )}
        </Card>
    )
    }
