import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const partnerships = [
  {
    name: "Global Tech Alliance",
    partner: "TechGlobal Inc.",
    type: "Strategic",
    invested: "$15,000.00",
    returns: "+22.5%",
    duration: "3 years",
    status: "Active",
  },
  {
    name: "Healthcare Innovation Network",
    partner: "MedTech Solutions",
    type: "Research",
    invested: "$12,500.00",
    returns: "+18.7%",
    duration: "2 years",
    status: "Active",
  },
  {
    name: "Sustainable Energy Consortium",
    partner: "GreenPower Co.",
    type: "Joint Venture",
    invested: "$20,000.00",
    returns: "+15.3%",
    duration: "5 years",
    status: "Active",
  },
  {
    name: "Financial Services Alliance",
    partner: "FinServe Group",
    type: "Strategic",
    invested: "$10,000.00",
    returns: "+19.8%",
    duration: "2 years",
    status: "Active",
  },
  {
    name: "Retail Distribution Network",
    partner: "Global Retail Partners",
    type: "Distribution",
    invested: "$8,500.00",
    returns: "+14.2%",
    duration: "3 years",
    status: "Active",
  },
  {
    name: "Manufacturing Excellence Program",
    partner: "Industrial Solutions Ltd.",
    type: "Operational",
    invested: "$11,500.00",
    returns: "+16.9%",
    duration: "4 years",
    status: "Active",
  },
  {
    name: "Digital Transformation Initiative",
    partner: "DigiTech Innovators",
    type: "Technology",
    invested: "$10,000.00",
    returns: "+25.4%",
    duration: "2 years",
    status: "Active",
  },
  {
    name: "Market Expansion Collaboration",
    partner: "Global Markets Inc.",
    type: "Market Access",
    invested: "$7,500.00",
    returns: "+21.2%",
    duration: "3 years",
    status: "Active",
  },
]

export default function StrategicPartnershipsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Partnership Name</TableHead>
            <TableHead>Partner</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Invested</TableHead>
            <TableHead>Returns</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partnerships.map((partnership) => (
            <TableRow key={partnership.name}>
              <TableCell className="font-medium">{partnership.name}</TableCell>
              <TableCell>{partnership.partner}</TableCell>
              <TableCell>{partnership.type}</TableCell>
              <TableCell>{partnership.invested}</TableCell>
              <TableCell className="text-emerald-600 dark:text-emerald-400">{partnership.returns}</TableCell>
              <TableCell>{partnership.duration}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="border-emerald-200 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                >
                  {partnership.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
