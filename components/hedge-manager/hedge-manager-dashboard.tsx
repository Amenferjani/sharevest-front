"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";

import { toast } from "sonner";
import { HedgeFund, PerformanceMetric, PerformanceTrend, DashboardOverview, HedgeFundManagerData } from "@/types/types";
import { DashboardOverviewCards } from "./bs/dashboard-overview";
import { EmptyFundsList } from "./bs/empty-list";
import { FundFormModal } from "./bs/fund-form";
import { TopPerformers } from "./bs/top";
import { FundCard } from "./bs/fund-card";

// Static hedge funds data
export const hedgeFunds: HedgeFund[] = [
    {
        id: "hf-001",
        name: "Alpha Growth Partners",
        manager: "Sarah Chen",
        description:
            "Long-short equity strategy focusing on technology and healthcare sectors with systematic risk management.",
        strategy: "long-short-equity",
        totalAssets: 250000000, // $250M
        investedAmount: 225000000, // $225M
        inceptionDate: "2020-03-15T00:00:00.000Z",
        managementFees: 2.0, // 2%
        performanceFees: 20.0, // 20%
        status: "active",
        createdAt: "2020-03-15T10:30:00.000Z",
        updatedAt: "2024-12-01T15:45:00.000Z",
        // Calculated metrics
        currentReturn: 18.5,
        totalReturn: 67.3,
        sharpeRatio: 1.85,
        volatility: 12.4,
        maxDrawdown: -8.2,
        riskLevel: "medium",
        investorCount: 45,
        minimumInvestment: 1000000,
        lastUpdated: "2024-12-01T15:45:00.000Z",
        performanceGrade: "A+",
        latestReturn: 2.3,
    },
    {
        id: "hf-002",
        name: "Quantum Macro Fund",
        manager: "Michael Rodriguez",
        description:
            "Global macro strategy utilizing quantitative models and fundamental analysis across currencies, commodities, and fixed income.",
        strategy: "global-macro",
        totalAssets: 180000000, // $180M
        investedAmount: 165000000, // $165M
        inceptionDate: "2019-08-20T00:00:00.000Z",
        managementFees: 1.5, // 1.5%
        performanceFees: 15.0, // 15%
        status: "active",
        createdAt: "2019-08-20T09:15:00.000Z",
        updatedAt: "2024-11-28T11:20:00.000Z",
        // Calculated metrics
        currentReturn: 12.8,
        totalReturn: 45.2,
        sharpeRatio: 1.42,
        volatility: 15.7,
        maxDrawdown: -12.5,
        riskLevel: "medium",
        investorCount: 32,
        minimumInvestment: 500000,
        lastUpdated: "2024-11-28T11:20:00.000Z",
        performanceGrade: "A",
        latestReturn: 1.5,
    },
    {
        id: "hf-003",
        name: "Event Driven Opportunities",
        manager: "David Kim",
        description:
            "Specializes in merger arbitrage, distressed securities, and special situations with focus on risk-adjusted returns.",
        strategy: "event-driven",
        totalAssets: 95000000, // $95M
        investedAmount: 88000000, // $88M
        inceptionDate: "2021-01-10T00:00:00.000Z",
        managementFees: 2.5, // 2.5%
        performanceFees: 25.0, // 25%
        status: "active",
        createdAt: "2021-01-10T14:00:00.000Z",
        updatedAt: "2024-11-30T16:30:00.000Z",
        // Calculated metrics
        currentReturn: 22.1,
        totalReturn: 38.7,
        sharpeRatio: 2.15,
        volatility: 9.8,
        maxDrawdown: -5.4,
        riskLevel: "low",
        investorCount: 28,
        minimumInvestment: 2000000,
        lastUpdated: "2024-11-30T16:30:00.000Z",
        performanceGrade: "A+",
        latestReturn: 3.1,
    },
    {
        id: "hf-004",
        name: "Fixed Income Alpha",
        manager: "Jennifer Walsh",
        description:
            "Conservative fixed income strategy focusing on credit opportunities and yield enhancement with capital preservation.",
        strategy: "fixed-income",
        totalAssets: 320000000, // $320M
        investedAmount: 305000000, // $305M
        inceptionDate: "2018-06-01T00:00:00.000Z",
        managementFees: 1.0, // 1%
        performanceFees: 10.0, // 10%
        status: "active",
        createdAt: "2018-06-01T08:45:00.000Z",
        updatedAt: "2024-12-02T09:15:00.000Z",
        // Calculated metrics
        currentReturn: 8.3,
        totalReturn: 28.9,
        sharpeRatio: 1.65,
        volatility: 4.2,
        maxDrawdown: -2.1,
        riskLevel: "low",
        investorCount: 67,
        minimumInvestment: 250000,
        lastUpdated: "2024-12-02T09:15:00.000Z",
        performanceGrade: "B+",
        latestReturn: 0.8,
    },
    {
        id: "hf-005",
        name: "Multi-Strategy Dynamics",
        manager: "Robert Thompson",
        description:
            "Diversified multi-strategy approach combining equity long-short, fixed income relative value, and quantitative strategies.",
        strategy: "multi-strategy",
        totalAssets: 450000000, // $450M
        investedAmount: 425000000, // $425M
        inceptionDate: "2017-11-15T00:00:00.000Z",
        managementFees: 2.0, // 2%
        performanceFees: 20.0, // 20%
        status: "active",
        createdAt: "2017-11-15T13:20:00.000Z",
        updatedAt: "2024-11-29T14:10:00.000Z",
        // Calculated metrics
        currentReturn: 15.7,
        totalReturn: 52.8,
        sharpeRatio: 1.73,
        volatility: 11.2,
        maxDrawdown: -9.8,
        riskLevel: "medium",
        investorCount: 89,
        minimumInvestment: 1000000,
        lastUpdated: "2024-11-29T14:10:00.000Z",
        performanceGrade: "A",
        latestReturn: 2.1,
    },
    {
        id: "hf-006",
        name: "Quant Edge Systems",
        manager: "Dr. Lisa Zhang",
        description:
            "Systematic quantitative strategy using machine learning and statistical arbitrage across global equity markets.",
        strategy: "quantitative",
        totalAssets: 75000000, // $75M
        investedAmount: 72000000, // $72M
        inceptionDate: "2022-04-01T00:00:00.000Z",
        managementFees: 1.5, // 1.5%
        performanceFees: 30.0, // 30%
        status: "active",
        createdAt: "2022-04-01T10:00:00.000Z",
        updatedAt: "2024-12-01T12:45:00.000Z",
        // Calculated metrics
        currentReturn: 28.4,
        totalReturn: 41.2,
        sharpeRatio: 2.45,
        volatility: 16.8,
        maxDrawdown: -11.3,
        riskLevel: "high",
        investorCount: 18,
        minimumInvestment: 5000000,
        lastUpdated: "2024-12-01T12:45:00.000Z",
        performanceGrade: "A+",
        latestReturn: 4.2,
    },
];

// Static performance metrics data
export const performanceMetrics: PerformanceMetric[] = [
    // Alpha Growth Partners metrics
    {
        id: "pm-001",
        date: "2024-11-30T00:00:00.000Z",
        returnPercentage: 2.3,
        sharpeRatio: 1.85,
        volatility: 12.4,
        drawdown: -1.2,
        benchmarkPerformance: 1.8,
        riskScore: 6,
        comments: "Strong performance driven by tech sector allocation",
        hedgeFundId: "hf-001",
        createdAt: "2024-12-01T15:45:00.000Z",
        updatedAt: "2024-12-01T15:45:00.000Z",
        // Extended fields
        outperformance: 0.5,
        riskAdjustedReturn: 1.86,
        periodLabel: "November 2024",
        trend: "up",
    },
    {
        id: "pm-002",
        date: "2024-10-31T00:00:00.000Z",
        returnPercentage: 1.8,
        sharpeRatio: 1.82,
        volatility: 11.9,
        drawdown: -2.1,
        benchmarkPerformance: 1.2,
        riskScore: 5,
        comments: "Consistent performance with reduced volatility",
        hedgeFundId: "hf-001",
        createdAt: "2024-11-01T10:30:00.000Z",
        updatedAt: "2024-11-01T10:30:00.000Z",
        // Extended fields
        outperformance: 0.6,
        riskAdjustedReturn: 1.51,
        periodLabel: "October 2024",
        trend: "stable",
    },
    // Quantum Macro Fund metrics
    {
        id: "pm-003",
        date: "2024-11-30T00:00:00.000Z",
        returnPercentage: 1.5,
        sharpeRatio: 1.42,
        volatility: 15.7,
        drawdown: -3.2,
        benchmarkPerformance: 1.8,
        riskScore: 7,
        comments: "Currency positions impacted by Fed policy uncertainty",
        hedgeFundId: "hf-002",
        createdAt: "2024-12-01T11:20:00.000Z",
        updatedAt: "2024-12-01T11:20:00.000Z",
        // Extended fields
        outperformance: -0.3,
        riskAdjustedReturn: 0.96,
        periodLabel: "November 2024",
        trend: "down",
    },
    // Event Driven Opportunities metrics
    {
        id: "pm-004",
        date: "2024-11-30T00:00:00.000Z",
        returnPercentage: 3.1,
        sharpeRatio: 2.15,
        volatility: 9.8,
        drawdown: -0.8,
        benchmarkPerformance: 1.8,
        riskScore: 4,
        comments: "Excellent month with successful merger arbitrage positions",
        hedgeFundId: "hf-003",
        createdAt: "2024-12-01T16:30:00.000Z",
        updatedAt: "2024-12-01T16:30:00.000Z",
        // Extended fields
        outperformance: 1.3,
        riskAdjustedReturn: 3.16,
        periodLabel: "November 2024",
        trend: "up",
    },
];

// Performance trends for charts
export const performanceTrends: PerformanceTrend[] = [
    { date: "2024-07", totalReturn: 12.5, benchmark: 8.2, aum: 480000000 },
    { date: "2024-08", totalReturn: 14.2, benchmark: 9.1, aum: 495000000 },
    { date: "2024-09", totalReturn: 15.8, benchmark: 10.5, aum: 510000000 },
    { date: "2024-10", totalReturn: 16.1, benchmark: 11.2, aum: 520000000 },
    { date: "2024-11", totalReturn: 16.8, benchmark: 11.8, aum: 525000000 },
];

// Dashboard overview data
export const dashboardOverview: DashboardOverview = {
    totalAUM: 525000000, // $525M
    aumGrowth: 2.4,
    averageReturn: 16.8,
    totalInvestors: 105,
    activeFunds: 6,
    topPerformingFund: "Alpha Growth Partners",
};

// Complete dashboard data
export const hedgeFundManagerData: HedgeFundManagerData = {
    overview: dashboardOverview,
    funds: hedgeFunds,
    performanceTrends: performanceTrends,
};
export function HedgeFundDashboard() {
    const [dashboardData] = useState(hedgeFundManagerData);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFund, setSelectedFund] = useState<HedgeFund | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const filteredFunds = dashboardData.funds.filter(
        (fund) =>
            fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fund.strategy.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateFund = (data: Partial<HedgeFund>) => {
        console.log("Creating fund:", data);
        toast.success("Fund created successfully");
        setIsCreateModalOpen(false);
    };

    const handleUpdateFund = (data: Partial<HedgeFund>) => {
        console.log("Updating fund:", data);
        toast.success("Fund updated successfully");
        setIsEditModalOpen(false);
        setSelectedFund(null);
    };

    const handleEditFund = (fund: HedgeFund) => {
        setSelectedFund(fund);
        setIsEditModalOpen(true);
    };

    const handleViewMetrics = (fund: HedgeFund) => {
        toast.info(`Viewing metrics for ${fund.name}`);
        // In a real app, this would navigate to a metrics page or open a metrics modal
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Hedge Fund Manager</h1>
                        <p className="text-gray-600">Manage your hedge funds and track performance</p>
                    </div>
                    <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Create New Fund
                    </Button>
                </div>

                {/* Overview Cards */}
                <DashboardOverviewCards data={dashboardData.overview} />

                {/* Main Content */}
                <Tabs defaultValue="funds" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="funds">My Funds</TabsTrigger>
                        <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="funds" className="space-y-6">
                        {/* Search */}
                        <div className="flex items-center space-x-2">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search funds..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8"
                                />
                            </div>
                        </div>

                        {/* Funds Grid */}
                        {filteredFunds.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredFunds.map((fund) => (
                                    <FundCard
                                        key={fund.id}
                                        fund={fund}
                                        onEdit={handleEditFund}
                                        onViewMetrics={handleViewMetrics}
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyFundsList
                                searchTerm={searchTerm}
                                onCreateNew={() => setIsCreateModalOpen(true)}
                            />
                        )}
                    </TabsContent>

                    <TabsContent value="performance" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Performance Chart */}
                            

                            {/* Top Performers */}
                            <TopPerformers funds={dashboardData.funds} />

                            {/* Strategy Distribution */}
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold mb-4">Strategy Allocation</h3>
                                <p className="text-muted-foreground">
                                    Strategy distribution visualization would appear here.
                                </p>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Modals */}
                <FundFormModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleCreateFund}
                />

                <FundFormModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedFund(null);
                    }}
                    fund={selectedFund}
                    onSubmit={handleUpdateFund}
                />
            </div>
        </div>
    );
}