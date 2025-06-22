import { HedgeFund } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPercentage, getPerformanceColor, getRiskColor } from '@/lib/utils';
import { TrendingUp, TrendingDown, Activity, Shield, Target } from 'lucide-react';

interface LatestMetricsProps {
    fund: HedgeFund;
}

export function LatestMetrics({ fund }: LatestMetricsProps) {
    const metricsList = fund.performanceMetrics || [];

    const getPerformanceIcon = (value: number) => {
        if (value > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
        if (value < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
        return <Activity className="h-4 w-4 text-gray-600" />;
    };

    const parsedMetrics = metricsList
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Latest Performance Metrics
                </CardTitle>
                <p className="text-sm text-gray-600">Recent performance history</p>
            </CardHeader>
            <CardContent>
                {parsedMetrics.length > 0 ? (
                    <div className="space-y-4">
                        {parsedMetrics.map((metric) => (
                            <div
                                key={metric.id}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900">{formatPercentage(metric.returnPercentage)}</h4>
                                    <p className="text-sm text-gray-600">{new Date(metric.date!).toLocaleDateString()}</p>
                                </div>

                                <div className="grid grid-cols-4 gap-6 text-center">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase mb-1">Return</p>
                                        <div className="flex items-center justify-center gap-1">
                                            {getPerformanceIcon(metric.returnPercentage)}
                                            <span className={`font-bold ${getPerformanceColor(metric.returnPercentage)}`}>
                                                {formatPercentage(metric.returnPercentage)}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 uppercase mb-1">Volatility</p>
                                        <span className="font-semibold text-gray-900">{metric.volatility}%</span>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 uppercase mb-1">Sharpe</p>
                                        <span className="font-semibold text-gray-900">{metric.sharpeRatio}</span>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 uppercase mb-1">Risk</p>
                                        <div className="flex items-center justify-center gap-1">
                                            <Shield className="h-3 w-3 text-gray-400" />
                                            <span className={`font-bold ${getRiskColor(metric.riskScore)}`}>
                                                {metric.riskScore}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No performance metrics available</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
