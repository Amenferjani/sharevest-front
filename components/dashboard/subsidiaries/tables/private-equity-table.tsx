import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const investments = [
  {
    name: "TechFuture Growth Fund",
    sector: "Technology",
    invested: "$50,000.00",
    stage: "Growth",
    vintage: "2025",
    performance: "+28.5%",
    status: "Active",
  },
  {
    name: "Healthcare Innovations",
    sector: "Healthcare",
    invested: "$35,000.00",
    stage: "Early Growth",
    vintage: "2025",
    performance: "+15.2%",
    status: "Active",
  },
  {
    name: "Sustainable Energy Partners",
    sector: "Clean Energy",
    invested: "$45,000.00",
    stage: "Expansion",
    vintage: "2026",
    performance: "+32.7%",
    status: "Active",
  },
  {
    name: "Consumer Brands Portfolio",
    sector: "Consumer Goods",
    invested: "$30,000.00",
    stage: "Mature",
    vintage: "2029",
    performance: "+22.3%",
    status: "Active",
  },
  {
    name: "Fintech Disruptors Fund",
    sector: "Financial Technology",
    invested: "$40,000.00",
    stage: "Growth",
    vintage: "2028",
    performance: "+19.8%",
    status: "Active",
  },
  {
    name: "Industrial Automation",
    sector: "Industrial",
    invested: "$25,000.00",
    stage: "Late Stage",
    vintage: "2027",
    performance: "+24.5%",
    status: "Active",
  },
  {
    name: "Real Estate Opportunities",
    sector: "Real Estate",
    invested: "$20,000.00",
    stage: "Value-Add",
    vintage: "2025",
    performance: "+14.8%",
    status: "Active",
  },
]

export default function PrivateEquityTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Investment Name</TableHead>
            <TableHead>Sector</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Vintage</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.map((investment) => (
            <TableRow key={investment.name}>
              <TableCell className="font-medium">{investment.name}</TableCell>
              <TableCell>{investment.sector}</TableCell>
              <TableCell>{investment.stage}</TableCell>
              <TableCell>{investment.vintage}</TableCell>
              <TableCell className="text-emerald-600 dark:text-emerald-400">{investment.performance}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="border-emerald-200 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                >
                  {investment.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
