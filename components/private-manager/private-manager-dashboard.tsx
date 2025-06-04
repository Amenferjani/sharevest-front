"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, TrendingUp, DollarSign, Users, Target, Edit, Trash2, Eye } from "lucide-react"
import type { DealCardProps } from "@/types/types"

// Static data for demonstration
const mockManagerDashboard = {
    managerId: "mgr-001",
    managerName: "Sarah Johnson",
    overview: {
        totalDeals: 24,
        activeDeals: 8,
        totalFundsRaised: 12500000,
        averageDealSize: 520833,
        successRate: 75,
        pendingApprovals: 3,
    },
    deals: [
        {
            id: "deal-001",
            name: "GreenTech Solar Solutions",
            description: "Revolutionary solar panel technology with 40% higher efficiency",
            industry: "renewable-energy",
            requiredInvestment: 2000000,
            currentInvestment: 1200000,
            status: "active",
            lifecycleStage: "series-a",
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-12-01T14:30:00Z",
            fundingProgress: 60,
            remainingAmount: 800000,
            investorCount: 12,
            averageInvestment: 100000,
            daysActive: 45,
            estimatedCompletion: "2025-02-15",
        },
        {
            id: "deal-002",
            name: "HealthAI Diagnostics",
            description: "AI-powered medical diagnostic platform for early disease detection",
            industry: "healthcare",
            requiredInvestment: 5000000,
            currentInvestment: 3750000,
            status: "active",
            lifecycleStage: "series-b",
            createdAt: "2024-02-01T09:00:00Z",
            updatedAt: "2024-12-02T16:45:00Z",
            fundingProgress: 75,
            remainingAmount: 1250000,
            investorCount: 18,
            averageInvestment: 208333,
            daysActive: 32,
            estimatedCompletion: "2025-01-30",
        },
        {
            id: "deal-003",
            name: "FinTech Payment Gateway",
            description: "Next-generation payment processing for emerging markets",
            industry: "fintech",
            requiredInvestment: 1500000,
            currentInvestment: 1500000,
            status: "funded",
            lifecycleStage: "seed",
            createdAt: "2024-03-10T11:30:00Z",
            updatedAt: "2024-11-20T13:15:00Z",
            fundingProgress: 100,
            remainingAmount: 0,
            investorCount: 8,
            averageInvestment: 187500,
            daysActive: 0,
        },
    ],
    recentDeals: [],
    filters: {
        status: ["draft", "active", "funded", "closed", "cancelled"],
        industry: ["technology", "healthcare", "fintech", "renewable-energy"],
        lifecycleStage: ["pre-seed", "seed", "series-a", "series-b", "series-c"],
        dateRange: {},
    },
    activeFilters: {
        sortBy: "createdAt",
        sortOrder: "desc",
    },
    dealForm: {
        isEditing: false,
        validationErrors: {},
        isSubmitting: false,
    },
    analytics: {
        fundingTrends: [
            { month: "Oct 2024", amount: 2500000, dealCount: 3 },
            { month: "Nov 2024", amount: 4200000, dealCount: 5 },
            { month: "Dec 2024", amount: 3800000, dealCount: 4 },
        ],
        industryBreakdown: [
            { industry: "technology", count: 8, totalFunding: 4500000 },
            { industry: "healthcare", count: 6, totalFunding: 3200000 },
            { industry: "fintech", count: 4, totalFunding: 2100000 },
        ],
        stageDistribution: [
            { stage: "seed", count: 10 },
            { stage: "series-a", count: 8 },
            { stage: "series-b", count: 4 },
        ],
    },
}

// Deal Card Component
function DealCard({ deal, onEdit, onDelete, showActions = true }: DealCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "default"
            case "funded":
                return "secondary"
            case "closed":
                return "outline"
            case "cancelled":
                return "destructive"
            default:
                return "outline"
        }
    }

    const getStageColor = (stage: string) => {
        switch (stage) {
            case "pre-seed":
                return "bg-blue-100 text-blue-800"
            case "seed":
                return "bg-green-100 text-green-800"
            case "series-a":
                return "bg-purple-100 text-purple-800"
            case "series-b":
                return "bg-orange-100 text-orange-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <CardTitle className="text-lg">{deal.name}</CardTitle>
                        <div className="flex gap-2">
                            <Badge variant={getStatusColor(deal.status)}>{deal.status}</Badge>
                            <Badge className={getStageColor(deal.lifecycleStage)}>{deal.lifecycleStage}</Badge>
                        </div>
                    </div>
                    {showActions && (
                        <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => onEdit?.(deal.id)}>
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => onDelete?.(deal.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{deal.description}</p>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Funding Progress</span>
                        <span className="font-medium">{deal.fundingProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${deal.fundingProgress}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>${(deal.currentInvestment / 1000000).toFixed(1)}M raised</span>
                        <span>${(deal.requiredInvestment / 1000000).toFixed(1)}M target</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-muted-foreground">Industry</span>
                        <p className="font-medium capitalize">{deal.industry.replace("-", " ")}</p>
                    </div>
                    <div>
                        <span className="text-muted-foreground">Investors</span>
                        <p className="font-medium">{deal.investorCount}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function ManagerDashboard() {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [statusFilter, setStatusFilter] = React.useState<string>("all")
    const [showCreateModal, setShowCreateModal] = React.useState(false)

    const [newDeal, setNewDeal] = React.useState({
        name: "",
        description: "",
        industry: "",
        requiredInvestment: "",
        lifecycleStage: "Idea",
    })


    const dashboard = mockManagerDashboard

    const filteredDeals = dashboard.deals.filter((deal) => {
        const matchesSearch =
            deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            deal.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || deal.status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <div className="space-y-6 p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Private Manager Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, Amen ferjani</p>
                </div>
                <Button onClick={() => setShowCreateModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Deal
                </Button>
            </div>

            {/* Overview Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dashboard.overview.totalDeals}</div>
                        <p className="text-xs text-muted-foreground">{dashboard.overview.activeDeals} currently active</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Funds Raised</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${(dashboard.overview.totalFundsRaised / 1000000).toFixed(1)}M</div>
                        <p className="text-xs text-muted-foreground">
                            Avg ${(dashboard.overview.averageDealSize / 1000).toFixed(0)}K per deal
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dashboard.overview.successRate}%</div>
                        <p className="text-xs text-muted-foreground">Deals successfully funded</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dashboard.overview.pendingApprovals}</div>
                        <p className="text-xs text-muted-foreground">Awaiting approval</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <div className="flex gap-4 items-center">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search deals..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="funded">Funded</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                </Button>
            </div>

            {/* Deals Grid */}
            <Tabs defaultValue="grid" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>

                <TabsContent value="grid" className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredDeals.map((deal) => (
                            <DealCard
                                key={deal.id}
                                deal={deal}
                                onEdit={(id) => console.log("Edit deal:", id)}
                                onDelete={(id) => console.log("Delete deal:", id)}
                                showActions={true}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="list" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Deals</CardTitle>
                            <CardDescription>Manage your investment deals</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {filteredDeals.map((deal) => (
                                    <div key={deal.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-medium">{deal.name}</h3>
                                                <Badge variant={getStatusColor(deal.status)}>{deal.status}</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{deal.description}</p>
                                            <div className="flex gap-4 text-xs text-muted-foreground">
                                                <span>
                                                    ${(deal.currentInvestment / 1000000).toFixed(1)}M / $
                                                    {(deal.requiredInvestment / 1000000).toFixed(1)}M
                                                </span>
                                                <span>{deal.investorCount} investors</span>
                                                <span className="capitalize">{deal.industry.replace("-", " ")}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Create New Deal</h2>
                            <Button variant="ghost" onClick={() => setShowCreateModal(false)}>Close</Button>
                        </div>

                        <div className="space-y-4">
                            <Input
                                placeholder="Deal Name"
                                value={newDeal.name}
                                onChange={(e) => setNewDeal({ ...newDeal, name: e.target.value })}
                            />
                            <Input
                                placeholder="Description"
                                value={newDeal.description}
                                onChange={(e) => setNewDeal({ ...newDeal, description: e.target.value })}
                            />
                            <Input
                                placeholder="Industry (e.g., healthcare, fintech)"
                                value={newDeal.industry}
                                onChange={(e) => setNewDeal({ ...newDeal, industry: e.target.value })}
                            />
                            <Input
                                type="number"
                                placeholder="Required Investment"
                                value={newDeal.requiredInvestment}
                                onChange={(e) => setNewDeal({ ...newDeal, requiredInvestment: e.target.value })}
                            />
                            <Select
                                value={newDeal.lifecycleStage}
                                onValueChange={(val) => setNewDeal({ ...newDeal, lifecycleStage: val })}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Lifecycle Stage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Idea">Idea</SelectItem>
                                    <SelectItem value="Funding">Funding</SelectItem>
                                    <SelectItem value="Growth">Growth</SelectItem>
                                    <SelectItem value="Exit">Exit</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button
                                onClick={() => {
                                    console.log("Creating deal:", newDeal)
                                    setShowCreateModal(false)
                                }}
                                className="w-full"
                            >
                                Submit Deal
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

// Helper function for status colors (used in list view)
function getStatusColor(status: string): "default" | "secondary" | "outline" | "destructive" {
    switch (status) {
        case "active":
            return "default"
        case "funded":
            return "secondary"
        case "closed":
            return "outline"
        case "cancelled":
            return "destructive"
        default:
            return "outline"
    }
}
