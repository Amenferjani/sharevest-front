import { HedgeFund } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    formatCurrency,
    formatPercentage,
    formatDate,
    getPerformanceColor,
    getRiskColor,
} from '@/lib/utils';
import {
    ArrowLeft,
    Calendar,
    User,
    DollarSign,
    TrendingUp,
    Shield,
    Target,
    BarChart3,
} from 'lucide-react';
import { PerformanceChart } from '../charts/hedge-performance-chart';
import { LatestMetrics } from './latest-metrics';
import { staticHedgeFunds } from '@/types/staticdata';

interface FundDetailsProps {
    fund: HedgeFund;
    onBack: () => void;
}

export function FundDetails({ fund, onBack }: FundDetailsProps) {
    const currentYear = new Date().getFullYear();

    const latestMetrics =
        fund.performanceMetrics?.length! > 0
            ? fund.performanceMetrics![fund.performanceMetrics?.length! - 1]
            : {
                returnPercentage: 0,
                sharpeRatio: 0,
                volatility: 0,
                drawdown: 0,
                riskScore: 5,
                benchmarkPerformance: 0,
            };

    const ytdReturn = fund.performanceMetrics
        ?.filter((m) => new Date(m.date!).getFullYear() === currentYear)
        .reduce((sum, m) => sum + m.returnPercentage, 0) ?? 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={onBack}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to List
                </Button>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900">{fund.name}</h1>
                    <p className="text-gray-600">Detailed fund information and performance metrics</p>
                </div>
                <Badge variant={fund.status === 'Active' ? 'default' : 'secondary'} className="text-sm">
                    {fund.status}
                </Badge>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(fund.totalAssets)}</div>
                        <p className="text-xs text-muted-foreground">
                            {formatCurrency(fund.investedAmount)} invested
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">YTD Return</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${getPerformanceColor(ytdReturn)}`}>
                            {formatPercentage(ytdReturn)}
                        </div>
                        <p className="text-xs text-muted-foreground">Year to date</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${getRiskColor(latestMetrics.riskScore)}`}>
                            {latestMetrics.riskScore}/10
                        </div>
                        <p className="text-xs text-muted-foreground">Current risk level</p>
                    </CardContent>
                </Card>
            </div>

            {/* Info + Metrics + Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* LEFT COLUMN */}
                <div className="space-y-6 lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Fund Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Manager</label>
                                <p className="text-lg font-semibold">{fund.manager}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Strategy</label>
                                <Badge variant="outline" className="mt-1">
                                    {fund.strategy}
                                </Badge>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Inception Date</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span>{formatDate(fund.inceptionDate)}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Management Fee</label>
                                    <p className="text-lg font-semibold">{fund.managementFees}%</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Performance Fee</label>
                                    <p className="text-lg font-semibold">{fund.performanceFees}%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5" />
                                Strategy Description
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 leading-relaxed">{fund.description}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Key Metrics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Sharpe Ratio</span>
                                <span className="font-semibold">{latestMetrics.sharpeRatio}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Volatility</span>
                                <span className="font-semibold">{latestMetrics.volatility}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Max Drawdown</span>
                                <span
                                    className={`font-semibold ${getPerformanceColor(latestMetrics.drawdown)}`}
                                >
                                    {formatPercentage(latestMetrics.drawdown)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Benchmark Performance</span>
                                <span
                                    className={`font-semibold ${getPerformanceColor(
                                        latestMetrics.benchmarkPerformance
                                    )}`}
                                >
                                    {formatPercentage(latestMetrics.benchmarkPerformance)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT SECTION */}
                <div className="space-y-6 lg:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Over Time</CardTitle>
                            <p className="text-sm text-gray-600">Monthly returns for the past 12 months</p>
                        </CardHeader>
                        <CardContent>
                            <PerformanceChart data={fund.performanceMetrics!} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Latest Metrics Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LatestMetrics fund={fund} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
