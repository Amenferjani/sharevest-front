import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const hedgeFunds = [
  {
    name: "Global Macro Fund",
    strategy: "Global Macro",
    allocation: "$85,750.00",
    returns: "+18.5%",
    risk: "Medium-High",
    status: "Active",
  },
  {
    name: "Long/Short Equity",
    strategy: "Long/Short",
    allocation: "$65,250.00",
    returns: "+15.2%",
    risk: "Medium",
    status: "Active",
  },
  {
    name: "Event Driven Opportunities",
    strategy: "Event Driven",
    allocation: "$78,500.00",
    returns: "+21.7%",
    risk: "High",
    status: "Active",
  },
  {
    name: "Fixed Income Arbitrage",
    strategy: "Relative Value",
    allocation: "$48,750.00",
    returns: "+12.8%",
    risk: "Low",
    status: "Active",
  },
  {
    name: "Multi-Strategy Alpha",
    strategy: "Multi-Strategy",
    allocation: "$47,500.00",
    returns: "+16.9%",
    risk: "Medium",
    status: "Active",
  },
]

export default function HedgeFundTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fund Name</TableHead>
            <TableHead>Strategy</TableHead>
            <TableHead>Allocation</TableHead>
            <TableHead>Returns (YTD)</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hedgeFunds.map((fund) => (
            <TableRow key={fund.name}>
              <TableCell className="font-medium">{fund.name}</TableCell>
              <TableCell>{fund.strategy}</TableCell>
              <TableCell>{fund.allocation}</TableCell>
              <TableCell className="text-emerald-600 dark:text-emerald-400">{fund.returns}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    fund.risk === "High"
                      ? "border-red-200 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      : fund.risk === "Medium-High" || fund.risk === "Medium"
                        ? "border-amber-200 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                        : "border-green-200 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  }
                >
                  {fund.risk}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="border-emerald-200 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                >
                  {fund.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
