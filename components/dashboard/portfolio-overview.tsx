import { Progress } from "@/components/ui/progress"
import { Asset } from "@/types/types";

const displayBackup: Asset[] = [
  {
    id: "1",
    ticker: "AAPL",
    name: "Apple Inc.",
    type: "stock",
    currentPrice: 10000,
    riskFactor: 1,
    quantity: 15,
  },
  {
    id: "2",
    ticker: "BND",
    name: "Vanguard Total Bond Market ETF",
    type: "bond",
    currentPrice: 100,
    riskFactor: 0.2,
    quantity: 2000,
  },
  {
    id: "3",
    ticker: "VNQ",
    name: "Vanguard Real Estate ETF",
    type: "real_estate",
    currentPrice: 50,
    riskFactor: 2,
    quantity: 5000,    // $250,000 total
  },
  {
    id: "4",
    ticker: "BTC",
    name: "Bitcoin",
    type: "crypto",
    currentPrice: 30000,
    riskFactor: 5,
    quantity: 5,       // $150,000 total
  },
  {
    id: "5",
    ticker: "USD",
    name: "US Dollar Cash",
    type: "cash",
    currentPrice: 1,
    riskFactor: 0,
    quantity: 100000,
  },
];


export default function PortfolioOverview({ assets }: { assets: Asset[] |null}) {
  // Fallback to backup data if assets is null or empty
  const finalAssets = assets && assets?.length > 0 ? assets : displayBackup;

  // Calculate the total portfolio value
  const totalValue = finalAssets.reduce(
    (sum, asset) => sum + asset.currentPrice * asset.quantity,
    0
  );

  // 3) Aggregate by asset.type
  type TypeSummary = { name: string; value: number };
  const byType = finalAssets.reduce<Record<string, TypeSummary>>((acc, asset) => {
    const { type, currentPrice, quantity } = asset;
    const value = currentPrice * quantity;

    if (!acc[type]) {
      // Humanize the type for display: e.g. 'real_estate' → 'Real Estate'
      const displayName = type
        .split('_')
        .map(w => w[0].toUpperCase() + w.slice(1))
        .join(' ');

      acc[type] = { name: displayName, value: 0 };
    }

    acc[type].value += value;
    return acc;
  }, {});

  const sortedAssets = Object
    .values(byType)
    .map(({ name, value }) => ({
      name,
      value,
      allocation: totalValue > 0 ? (value / totalValue) * 100 : 0,
    }))
    .sort((a, b) => b.value - a.value);
  return (
    <div className="space-y-4">
      {sortedAssets.map(({ name, value, allocation }) => (
        <div key={name} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{name}</span>
            <span className="text-sm font-medium">
              {allocation.toFixed(2)}%
            </span>
          </div>
          <Progress value={allocation} className="h-2" />
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">${value.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
