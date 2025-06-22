import { HedgeFund } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatPercentage, formatDate, getPerformanceColor, getRiskColor } from '@/lib/utils'
import { TrendingUp, TrendingDown, Calendar, User, BarChart3, Eye } from 'lucide-react';

interface FundListProps {
    funds: HedgeFund[] | undefined;
    onSelectFund: (fund: HedgeFund) => void;
}

export function FundList({ funds, onSelectFund }: FundListProps) {
    const getLatestReturn = (fund: HedgeFund): number => {
        if (fund.performanceMetrics?.length === 0) return 0;
        const latest = fund.performanceMetrics![fund.performanceMetrics?.length! - 1];
        return latest.returnPercentage;
    };

    const getLatestRiskScore = (fund: HedgeFund): number => {
        if (fund.performanceMetrics?.length === 0) return 5;
        const latest = fund.performanceMetrics![fund.performanceMetrics?.length! - 1];
        return latest.riskScore;
    };

    const getPerformanceIcon = (returnValue: number) => {
        if (returnValue > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
        if (returnValue < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
        return null;
    };

    if (funds?.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <BarChart3 className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No funds found</h3>
                    <p className="text-gray-600 text-center">
                        Try adjusting your search criteria or filters to find hedge funds.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {funds?.map((fund) => {
                const latestReturn = getLatestReturn(fund);
                const riskScore = getLatestRiskScore(fund);

                return (
                    <Card key={fund.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <CardTitle className="text-lg font-bold text-gray-900 mb-1">
                                        {fund.name}
                                    </CardTitle>
                                    <Badge variant="outline" className="text-xs">
                                        {fund.strategy}
                                    </Badge>
                                </div>
                                <Badge variant={fund.status === 'Active' ? 'default' : 'secondary'}>
                                    {fund.status}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {/* Key Metrics */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">AUM</p>
                                    <p className="text-lg font-bold text-gray-900">{formatCurrency(fund.totalAssets)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Latest Return</p>
                                    <div className="flex items-center gap-1">
                                        {getPerformanceIcon(latestReturn)}
                                        <span className={`text-lg font-bold ${getPerformanceColor(latestReturn)}`}>
                                            {formatPercentage(Number(latestReturn))}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Fees */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Management Fee</p>
                                    <p className="font-semibold">{fund.managementFees}%</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Performance Fee</p>
                                    <p className="font-semibold">{fund.performanceFees}%</p>
                                </div>
                            </div>

                            {/* Risk Score */}
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">Risk Score</span>
                                <span className={`font-bold ${getRiskColor(riskScore)}`}>
                                    {riskScore}/10
                                </span>
                            </div>

                            {/* Inception Date */}
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>Inception: {formatDate(fund.inceptionDate)}</span>
                            </div>

                            {/* Description Preview */}
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {fund.description}
                            </p>

                            {/* Action Button */}
                            <Button
                                onClick={() => onSelectFund(fund)}
                                className="w-full mt-4"
                                variant="outline"
                            >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}