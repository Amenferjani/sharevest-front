import React from 'react';
import {
    Building2,
    DollarSign,
    TrendingUp,
    Users,
    Calendar,
    Edit3,
    Trash2,
    Target
} from 'lucide-react';
import { Deal, InvestorTracking } from '@/types/types';
import { formatCurrency, formatDate, getProgressPercentage, getStatusColor, getLifecycleStageColor } from '@/types/mock-data';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DealCardProps {
    deal: Deal;
    userInvestment?: InvestorTracking | null;
    onAddInvestment: () => void;
    onEditInvestment: () => void;
    onRemoveInvestment: () => void;
    className?: string;
}

export const DealCard: React.FC<DealCardProps> = ({
    deal,
    userInvestment,
    onAddInvestment,
    onEditInvestment,
    onRemoveInvestment,
    className = ''
}) => {
    const progressPercentage = getProgressPercentage(deal.currentInvestment, deal.requiredInvestment);
    const hasInvestment = !!userInvestment;

    return (
        <Card className={className}>
            <CardHeader>
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {deal.name}
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(deal.status)}`}>
                                {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLifecycleStageColor(deal.lifecycleStage)}`}>
                                {deal.lifecycleStage}
                            </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <Building2 className="h-4 w-4 mr-1" />
                            {deal.industry}
                        </div>
                    </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                    {deal.description}
                </p>
            </CardHeader>

            <CardContent>
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-gray-400" />
                        <div>
                            <div className="text-xs text-gray-500">Required</div>
                            <div className="text-sm font-medium text-gray-900">
                                {formatCurrency(deal.requiredInvestment)}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                        <div>
                            <div className="text-xs text-gray-500">Current</div>
                            <div className="text-sm font-medium text-gray-900">
                                {formatCurrency(deal.currentInvestment)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Funding Progress */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500">Funding Progress</span>
                        <span className="text-xs font-medium text-gray-900">
                            {Math.round(progressPercentage)}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>

                <div className="flex items-center text-xs text-gray-600 mb-4">
                    <Calendar className="h-3 w-3 mr-1" />
                    Created {formatDate(deal?.createdAt!)}
                </div>

                {/* User Investment Status */}
                {hasInvestment && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <DollarSign className="h-4 w-4 text-blue-600" />
                                <div>
                                    <div className="text-sm font-medium text-blue-900">
                                        Your Investment
                                    </div>
                                    <div className="text-lg font-bold text-blue-900">
                                        {formatCurrency(userInvestment.investmentAmount)}
                                    </div>
                                    <div className="text-xs text-blue-600">
                                        Invested {formatDate(userInvestment.investmentDate)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={onEditInvestment}
                                    className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                                    title="Edit Investment"
                                >
                                    <Edit3 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={onRemoveInvestment}
                                    className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors"
                                    title="Remove Investment"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {userInvestment.roi !== undefined && userInvestment.roi > 0 && (
                            <div className="mt-2 pt-2 border-t border-blue-200">
                                <div className="flex justify-between text-xs">
                                    <span className="text-blue-600">ROI: {userInvestment.roi.toFixed(1)}%</span>
                                    {userInvestment.profitLoss && (
                                        <span className={`font-medium ${userInvestment.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {userInvestment.profitLoss >= 0 ? '+' : ''}{formatCurrency(userInvestment.profitLoss)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>

            <CardFooter>
                <div className="flex space-x-2 w-full">
                    {deal.status === 'open' && !hasInvestment && (
                        <Button
                            onClick={onAddInvestment}
                            className="flex-1"
                        >
                            Invest Now
                        </Button>
                    )}

                    <Button
                        variant="outline"
                        className={hasInvestment ? "flex-1" : "flex-1"}
                    >
                        View Details
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};