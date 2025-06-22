import { Eye, Edit, Trash2, Calendar, DollarSign, TrendingUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HedgeFund } from '@/types/types';
import { formatCurrency, formatDate, formatPercentage } from '@/lib/utils';
import Link from 'next/link';

interface FundCardProps {
    fund: HedgeFund;
    onDelete: (fundId: string) => void;
}

export default function FundCard({ fund, onDelete }: FundCardProps) {
    const getLatestReturn = () => {
        if (fund.performanceMetrics?.length === 0) return null;
        return fund.performanceMetrics![fund.performanceMetrics?.length! - 1].returnPercentage;
    };

    const latestReturn = getLatestReturn();

    return (
        <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
            <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-900 mb-1">
                            <Link
                                href={`/hedge-manager/funds/${fund.id}`}
                                className="hover:text-blue-600 transition-colors"
                            >
                                {fund.name}
                            </Link>
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <User className="h-4 w-4" />
                            <span>{fund.manager}</span>
                        </div>
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
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Total AUM</p>
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-gray-400" />
                            <span className="text-lg font-bold text-gray-900">
                                {formatCurrency(fund.totalAssets)}
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Latest Return</p>
                        <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-600" />
                            <span className="text-lg font-bold text-green-600">
                                {latestReturn ? formatPercentage(latestReturn) : 'N/A'}
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

                {/* Inception Date */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Inception: {formatDate(fund.inceptionDate)}</span>
                </div>

                {/* Description Preview */}
                <p className="text-sm text-gray-600 line-clamp-2">
                    {fund.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/hedge-manager/funds/${fund.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(fund.id!)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}