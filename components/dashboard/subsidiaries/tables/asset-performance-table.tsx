"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownRight, Minus, DollarSign } from "lucide-react"
import type { Asset } from "@/types/types"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { sellAsset } from "@/services/portfolio/service"

function getRiskLabel(risk: number): string {
  if (risk >= 5) return "V-High"
  if (risk === 4) return "High"
  if (risk === 3) return "Medium"
  if (risk === 2) return "Low"
  return "V-Low"
}

export default function AssetPerformanceTable({
  portfolioId,
  assets,
  assetsPrices,
}: {
  portfolioId:string,
  assets: Asset[]
  assetsPrices: number[]
}) {
  const data = assets

  const sellAssetMutation = useMutation({
    mutationFn: sellAsset,
    onError: (error) => {
      console.error("selling asset failed:", error)
    },
  })

  const handleSell = (asset: Asset) => {
  let quantity: number;

  if (asset.quantity === 1) {
    quantity = 1;
  } else {
    const input = window.prompt(
      `How many units of ${asset.ticker} do you want to sell? (Available: ${asset.quantity})`,
      "1"
    );
    quantity = Number(input);

    if (!input || isNaN(quantity) || quantity <= 0 || quantity > asset.quantity) {
      return;
    }
    }
    console.log({
    assetId: asset.id as string,
    portfolioId: portfolioId,
    sellingQuantity: quantity,
  })

  sellAssetMutation.mutate({
    assetId: asset.id as string,
    portfolioId: portfolioId,
    sellingQuantity: quantity,
  },
    {
      onSettled: () => console.log("done selling asset"),
    }
  );
};



  return (
    <div className="rounded-md border">
      <div className="max-h-[400px] overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-white">
          <TableRow>
            <TableHead>Ticker</TableHead>
            <TableHead>Class</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead> 
            <TableHead>Price</TableHead>
            <TableHead>Return</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
          </TableHeader>
          <TableBody>
          {data.map((asset, idx) => {
            const initialPrice = Array.isArray(assetsPrices) && typeof assetsPrices[idx] === "number" ? assetsPrices[idx] : 0;
            const returnAmount = asset.currentPrice - initialPrice;
            const returnPercent = initialPrice
              ? ((returnAmount / initialPrice) * 100).toFixed(2)
              : "0.00";
            const trend = returnAmount > 0 ? "up" : returnAmount < 0 ? "down" : "neutral";

            return (
              <TableRow key={asset.id}>
                <TableCell className="font-medium">{asset.ticker} </TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.type}</TableCell>
                <TableCell>{asset.quantity.toLocaleString()}</TableCell>
                <TableCell>${asset.currentPrice}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {trend === "up" && <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />}
                    {trend === "down" && <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />}
                    {trend === "neutral" && <Minus className="mr-1 h-4 w-4 text-gray-500" />}
                    <span
                      className={
                        trend === "up" ? "text-emerald-500" : trend === "down" ? "text-red-500" : "text-gray-500"
                      }
                    >
                      {returnAmount >= 0 ? `+${returnPercent}%` : `${returnPercent}%`}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${asset?.riskFactor as number >= 5
                        ? "bg-red-100 text-red-800"
                        : asset.riskFactor === 4
                          ? "bg-orange-100 text-orange-800"
                          : asset.riskFactor === 3
                            ? "bg-yellow-100 text-yellow-800"
                            : asset.riskFactor === 2
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                      }`}
                  >
                    {getRiskLabel(asset?.riskFactor as number)}
                  </span>
                </TableCell>

                {/* Actions - Direct delete button */}
                <TableCell className="text-right">
                  <Button variant="destructive" size="sm" onClick={() => handleSell(asset)} className="h-8">
                    <DollarSign className=" h-4 w-4" />
                    <span>Sell Asset</span>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
    </div>
  )
}
