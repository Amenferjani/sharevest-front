import { HedgeFund } from "@/types/types";
import { formatCurrency, formatPercentage } from "./formatters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Edit, TrendingDown, TrendingUp } from "lucide-react";

interface FundCardProps {
    fund: HedgeFund;
    onEdit: (fund: HedgeFund) => void;
    onViewMetrics: (fund: HedgeFund) => void;
}

export function FundCard({ fund, onEdit, onViewMetrics }: FundCardProps) {
    const getPerformanceColor = (value: number) => {
        if (value > 0) return "text-green-600";
        if (value < 0) return "text-red-600";
        return "text-gray-600";
    };

    const getPerformanceIcon = (value: number) => {
        if (value > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
        if (value < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
        return null;
    };

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg">{fund.name}</CardTitle>
                        <CardDescription className="capitalize">
                            {fund.strategy.replace(/-/g, " ")}
                        </CardDescription>
                    </div>
                    <Badge variant={fund.status === "active" ? "default" : "secondary"}>
                        {fund.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-muted-foreground">Total Assets</p>
                        <p className="font-semibold">{formatCurrency(fund.totalAssets)}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Invested</p>
                        <p className="font-semibold">{formatCurrency(fund.investedAmount)}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Mgmt Fee</p>
                        <p className="font-semibold">{fund.managementFees}%</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Perf Fee</p>
                        <p className="font-semibold">{fund.performanceFees}%</p>
                    </div>
                </div>

                {fund.latestReturn !== undefined && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-muted-foreground">Latest Return</span>
                        <div className="flex items-center gap-1">
                            {getPerformanceIcon(fund.latestReturn)}
                            <span className={`font-semibold ${getPerformanceColor(fund.latestReturn)}`}>
                                {formatPercentage(fund.latestReturn)}
                            </span>
                        </div>
                    </div>
                )}

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(fund)}
                        className="flex-1"
                    >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => onViewMetrics(fund)}
                    >
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Metrics
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}