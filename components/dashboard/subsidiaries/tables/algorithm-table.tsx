import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const algorithms = [
  {
    name: "Quantum Momentum",
    type: "Momentum",
    status: "Active",
    performance: "+22.5%",
    risk: "Medium",
  },
  {
    name: "Neural Alpha",
    type: "Machine Learning",
    status: "Active",
    performance: "+18.7%",
    risk: "Medium-High",
  },
  {
    name: "Quantum Arbitrage",
    type: "Arbitrage",
    status: "Active",
    performance: "+12.3%",
    risk: "Low",
  },
  {
    name: "Deep Sentiment",
    type: "Sentiment Analysis",
    status: "Paused",
    performance: "+8.9%",
    risk: "High",
  },
  {
    name: "Quantum Volatility",
    type: "Volatility",
    status: "Active",
    performance: "+15.2%",
    risk: "Medium",
  },
  {
    name: "Adaptive Trend",
    type: "Trend Following",
    status: "Active",
    performance: "+19.8%",
    risk: "Medium-High",
  },
  {
    name: "Quantum Mean Reversion",
    type: "Mean Reversion",
    status: "Paused",
    performance: "+10.5%",
    risk: "Medium",
  },
]

export default function AlgorithmTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Algorithm Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead>Risk Level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {algorithms.map((algorithm) => (
            <TableRow key={algorithm.name}>
              <TableCell className="font-medium">{algorithm.name}</TableCell>
              <TableCell>{algorithm.type}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    algorithm.status === "Active"
                      ? "border-emerald-200 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "border-amber-200 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                  }
                >
                  {algorithm.status}
                </Badge>
              </TableCell>
              <TableCell className="text-emerald-600 dark:text-emerald-400">{algorithm.performance}</TableCell>
              <TableCell>{algorithm.risk}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
