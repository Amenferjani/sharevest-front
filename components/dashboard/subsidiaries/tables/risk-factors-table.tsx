import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const riskFactors = [
  {
    factor: "Market Volatility",
    impact: "High",
    status: "Monitored",
    mitigation: "Diversification across uncorrelated assets",
  },
  {
    factor: "Interest Rate Risk",
    impact: "Medium",
    status: "Hedged",
    mitigation: "Duration management and interest rate swaps",
  },
  {
    factor: "Credit Risk",
    impact: "Low",
    status: "Controlled",
    mitigation: "High-quality credit selection and limits",
  },
  {
    factor: "Liquidity Risk",
    impact: "Medium",
    status: "Monitored",
    mitigation: "Cash reserves and liquid asset allocation",
  },
  {
    factor: "Currency Risk",
    impact: "Medium",
    status: "Hedged",
    mitigation: "Forward contracts and currency options",
  },
  {
    factor: "Geopolitical Risk",
    impact: "High",
    status: "Monitored",
    mitigation: "Geographic diversification and scenario analysis",
  },
]

export default function RiskFactorsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Risk Factor</TableHead>
            <TableHead>Impact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[300px]">Mitigation Strategy</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {riskFactors.map((risk) => (
            <TableRow key={risk.factor}>
              <TableCell className="font-medium">{risk.factor}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    risk.impact === "High"
                      ? "border-red-200 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      : risk.impact === "Medium"
                        ? "border-amber-200 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                        : "border-green-200 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  }
                >
                  {risk.impact}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    risk.status === "Monitored"
                      ? "border-blue-200 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      : risk.status === "Hedged"
                        ? "border-purple-200 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                        : "border-green-200 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  }
                >
                  {risk.status}
                </Badge>
              </TableCell>
              <TableCell>{risk.mitigation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
