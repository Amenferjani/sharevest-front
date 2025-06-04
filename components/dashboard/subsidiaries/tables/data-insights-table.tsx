import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const insights = [
  {
    title: "Emerging Market Opportunities",
    category: "Market Analysis",
    confidence: "High",
    impact: "Significant",
    timeframe: "3-6 months",
    status: "New",
  },
  {
    title: "Tech Sector Rotation",
    category: "Sector Analysis",
    confidence: "Medium",
    impact: "Moderate",
    timeframe: "1-3 months",
    status: "Verified",
  },
  {
    title: "Interest Rate Impact Forecast",
    category: "Macroeconomic",
    confidence: "High",
    impact: "Significant",
    timeframe: "6-12 months",
    status: "Verified",
  },
  {
    title: "Supply Chain Disruption Alert",
    category: "Risk Analysis",
    confidence: "Medium",
    impact: "High",
    timeframe: "1-3 months",
    status: "New",
  },
  {
    title: "Consumer Spending Trends",
    category: "Consumer Behavior",
    confidence: "High",
    impact: "Moderate",
    timeframe: "3-6 months",
    status: "Verified",
  },
  {
    title: "ESG Investment Opportunities",
    category: "Thematic Analysis",
    confidence: "Medium",
    impact: "Growing",
    timeframe: "6-12 months",
    status: "New",
  },
  {
    title: "Cryptocurrency Market Cycles",
    category: "Alternative Assets",
    confidence: "Medium",
    impact: "Variable",
    timeframe: "1-3 months",
    status: "Monitoring",
  },
  {
    title: "Real Estate Market Correction",
    category: "Sector Analysis",
    confidence: "High",
    impact: "Significant",
    timeframe: "6-12 months",
    status: "Verified",
  },
]

export default function DataInsightsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Insight Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Impact</TableHead>
            <TableHead>Timeframe</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {insights.map((insight) => (
            <TableRow key={insight.title}>
              <TableCell className="font-medium">{insight.title}</TableCell>
              <TableCell>{insight.category}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    insight.confidence === "High"
                      ? "border-emerald-200 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "border-amber-200 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                  }
                >
                  {insight.confidence}
                </Badge>
              </TableCell>
              <TableCell>{insight.impact}</TableCell>
              <TableCell>{insight.timeframe}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    insight.status === "New"
                      ? "border-blue-200 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      : insight.status === "Verified"
                        ? "border-emerald-200 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "border-purple-200 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                  }
                >
                  {insight.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
