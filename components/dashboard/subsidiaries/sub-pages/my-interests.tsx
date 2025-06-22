import React from 'react';
import { Calendar, DollarSign, TrendingUp, Building2, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useDeal } from '@/hooks/use-deals';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { InvestorTracking, Deal } from '@/types/types';
import { formatDate } from 'date-fns';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/loading';

interface MyInvestmentsProps {
    investments: InvestorTracking[];
    loading: boolean;
    error: string | null;
    onEditInvestment: (deal: Deal, investment: InvestorTracking) => void;
    onRemoveInvestment: (investment: InvestorTracking) => void;
}

const InvestmentCard: React.FC<{
    investment: InvestorTracking;
    onEdit: (deal: Deal, investment: InvestorTracking) => void;
    onRemove: (investment: InvestorTracking) => void;
}> = ({ investment, onEdit, onRemove }) => {
    const { deal, loading: dealLoading } = useDeal(investment.dealId);

    if (dealLoading || !deal) {
        return (
            <Card className="animate-pulse">
                <CardContent>
                    <div className="space-y-3">
                        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card >
            <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {deal.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <Building2 className="h-4 w-4 mr-1" />
                            {deal.industry} • {deal.lifecycleStage}
                        </div>
                    </div>
                </div>

                {/* Investment Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <div>
                            <div className="text-xs text-gray-500">Investment</div>
                            <div className="text-lg font-bold text-gray-900">
                                {formatCurrency(investment.investmentAmount)}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                            <div className="text-xs text-gray-500">Date</div>
                            <div className="text-sm font-medium text-gray-900">
                                {/* {formatDate(investment.investmentDate)} */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance Metrics */}
                {investment.roi !== undefined && investment.roi > 0 && (
                    <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <div>
                                <div className="text-xs text-gray-500">ROI</div>
                                <div className="text-sm font-bold text-green-600">
                                    {formatPercentage(investment.roi)}
                                </div>
                            </div>
                        </div>

                        {investment.profitLoss !== undefined && (
                            <div className="flex items-center space-x-2">
                                <Target className="h-4 w-4 text-gray-400" />
                                <div>
                                    <div className="text-xs text-gray-500">P&L</div>
                                    <div className={`text-sm font-bold ${investment.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {investment.profitLoss >= 0 ? '+' : ''}{formatCurrency(investment.profitLoss)}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                    <Button
                        onClick={() => onEdit(deal, investment)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                    >
                        Edit Investment
                    </Button>
                    <Button
                        onClick={() => onRemove(investment)}
                        variant="destructive"
                        size="sm"
                        className="flex-1"
                    >
                        Remove
                    </Button>
                    <Button
                        variant="default"
                        size="sm"
                        className="flex-1"
                    >
                        View Deal
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export const MyInvestments: React.FC<MyInvestmentsProps> = ({
    investments,
    loading,
    error,
    onEditInvestment,
    onRemoveInvestment
}) => {
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                    <p className="text-red-600 font-medium">Failed to load your investments</p>
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                </div>
            </div>
        );
    }

    if (investments.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                    <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium mb-2">No investments yet</p>
                    <p className="text-gray-500 text-sm">
                        Start exploring deals and make your first investment to track them here.
                    </p>
                </div>
            </div>
        );
    }

    // Calculate totals
    const totalInvested = investments.reduce((sum, inv) => sum + inv.investmentAmount, 0);
    const totalProfitLoss = investments.reduce((sum, inv) => sum + (inv.profitLoss || 0), 0);
    const averageROI = investments.filter(inv => inv.roi).reduce((sum, inv) => sum + (inv.roi || 0), 0) / investments.filter(inv => inv.roi).length || 0;

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <DollarSign className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Total Invested</div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(totalInvested)}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <TrendingUp className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Total P&L</div>
                                <div className={`text-2xl font-bold ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {totalProfitLoss >= 0 ? '+' : ''}{formatCurrency(totalProfitLoss)}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Target className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Avg ROI</div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {averageROI > 0 ? formatPercentage(averageROI) : 'N/A'}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Investments List */}
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                    You have {investments.length} active investment{investments.length !== 1 ? 's' : ''}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {investments.map(investment => (
                    <InvestmentCard
                        key={investment.id}
                        investment={investment}
                        onEdit={onEditInvestment}
                        onRemove={onRemoveInvestment}
                    />
                ))}
            </div>
        </div>
    );
};