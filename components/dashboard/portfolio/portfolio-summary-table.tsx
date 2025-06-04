import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

const portfolioItems = [
  {
    name: "US Large Cap ETF",
    type: "ETF",
    value: "$325,450.00",
    allocation: "26.1%",
    return: "+12.4%",
    trend: "up",
  },
  {
    name: "Global Bond Fund",
    type: "Bond",
    value: "$245,750.00",
    allocation: "19.7%",
    return: "+3.8%",
    trend: "up",
  },
  {
    name: "Tech Growth Fund",
    type: "Mutual Fund",
    value: "$187,500.00",
    allocation: "15.1%",
    return: "+18.7%",
    trend: "up",
  },
  {
    name: "Real Estate Trust",
    type: "REIT",
    value: "$156,250.00",
    allocation: "12.5%",
    return: "+7.2%",
    trend: "up",
  },
  {
    name: "Emerging Markets",
    type: "ETF",
    value: "$125,000.00",
    allocation: "10.0%",
    return: "-2.3%",
    trend: "down",
  },
  {
    name: "Dividend Portfolio",
    type: "Stock",
    value: "$93,750.00",
    allocation: "7.5%",
    return: "+5.6%",
    trend: "up",
  },
  {
    name: "Cryptocurrency Index",
    type: "Alternative",
    value: "$62,500.00",
    allocation: "5.0%",
    return: "-8.4%",
    trend: "down",
  },
  {
    name: "Cash Reserves",
    type: "Cash",
    value: "$49,478.00",
    allocation: "4.0%",
    return: "+0.5%",
    trend: "neutral",
  },
]

export default function PortfolioSummaryTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Investment</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Allocation</TableHead>
            <TableHead>Return (YTD)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {portfolioItems.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    item.type === "ETF"
                      ? "border-blue-200 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      : item.type === "Bond"
                        ? "border-green-200 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : item.type === "Mutual Fund"
                          ? "border-purple-200 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                          : item.type === "REIT"
                            ? "border-amber-200 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                            : item.type === "Stock"
                              ? "border-emerald-200 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : item.type === "Alternative"
                                ? "border-pink-200 bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400"
                                : "border-gray-200 bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                  }
                >
                  {item.type}
                </Badge>
              </TableCell>
              <TableCell>{item.value}</TableCell>
              <TableCell>{item.allocation}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {item.trend === "up" && <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />}
                  {item.trend === "down" && <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />}
                  {item.trend === "neutral" && <Minus className="mr-1 h-4 w-4 text-gray-500" />}
                  <span
                    className={
                      item.trend === "up"
                        ? "text-emerald-500"
                        : item.trend === "down"
                          ? "text-red-500"
                          : "text-gray-500"
                    }
                  >
                    {item.return}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
