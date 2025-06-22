import { Calendar, User, DollarSign, Target, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HedgeFund } from '@/types/types';
import { formatCurrency, formatDate } from '@/lib/utils';

interface FundDetailProps {
    fund: HedgeFund;
}

export default function FundDetail({ fund }: FundDetailProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Fund Information */}
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

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Total Assets</label>
                            <div className="flex items-center gap-2 mt-1">
                                <DollarSign className="h-4 w-4 text-gray-500" />
                                <span className="text-lg font-semibold">{formatCurrency(fund.totalAssets)}</span>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Invested Amount</label>
                            <div className="flex items-center gap-2 mt-1">
                                <DollarSign className="h-4 w-4 text-gray-500" />
                                <span className="text-lg font-semibold">{formatCurrency(fund.investedAmount)}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Strategy Description */}
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
        </div>
    );
}