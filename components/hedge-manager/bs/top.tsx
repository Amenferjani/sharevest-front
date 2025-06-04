import { HedgeFund } from "@/types/types";
import { formatPercentage } from "./formatters";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface TopPerformersProps {
  funds: HedgeFund[];
}

export function TopPerformers({ funds }: TopPerformersProps) {
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

  // Sort funds by current return
  const sortedFunds = [...funds]
    .filter(fund => fund.latestReturn !== undefined)
    .sort((a, b) => (b.latestReturn || 0) - (a.latestReturn || 0))
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Funds</CardTitle>
        <CardDescription>Best performers this year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedFunds.map((fund, index) => (
            <div key={fund.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-600">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{fund.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {fund.strategy.replace(/-/g, " ")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {getPerformanceIcon(fund.latestReturn || 0)}
                <span className={`font-semibold ${getPerformanceColor(fund.latestReturn || 0)}`}>
                  {formatPercentage(fund.latestReturn || 0)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}