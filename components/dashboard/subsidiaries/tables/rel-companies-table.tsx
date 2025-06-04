import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"

// This is a placeholder component that would be used in the main dashboard
export default function CompaniesTable() {
    const companies = [
        {
            id: "c1",
            name: "TechInnovate Inc.",
            industry: "Technology",
            description: "Leading technology innovation company",
            headquarters: "San Francisco, CA",
            contactEmail: "contact@techinnovate.com",
            phoneNumber: "415-555-1234",
            website: "https://techinnovate.com",
            status: "active",
            createdAt: new Date("2023-01-15"),
            updatedAt: new Date("2023-05-20"),
        },
        {
            id: "c2",
            name: "GreenEnergy Solutions",
            industry: "Renewable Energy",
            description: "Sustainable energy solutions provider",
            headquarters: "Austin, TX",
            contactEmail: "info@greenenergy.com",
            phoneNumber: "512-555-6789",
            website: "https://greenenergy.com",
            status: "active",
            createdAt: new Date("2023-02-10"),
            updatedAt: new Date("2023-06-15"),
        },
        {
            id: "c3",
            name: "HealthPlus Medical",
            industry: "Healthcare",
            description: "Innovative healthcare solutions",
            headquarters: "Boston, MA",
            contactEmail: "contact@healthplus.com",
            phoneNumber: "617-555-4321",
            website: "https://healthplus.com",
            status: "active",
            createdAt: new Date("2023-03-05"),
            updatedAt: new Date("2023-07-10"),
        },
        {
            id: "c4",
            name: "FinTech Innovations",
            industry: "Financial Technology",
            description: "Next-generation financial technology solutions",
            headquarters: "New York, NY",
            contactEmail: "info@fintechinnovations.com",
            phoneNumber: "212-555-8765",
            website: "https://fintechinnovations.com",
            status: "active",
            createdAt: new Date("2023-04-20"),
            updatedAt: new Date("2023-08-05"),
        },
    ]

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Name</th>
                        <th className="text-left py-3 px-4 font-medium">Industry</th>
                        <th className="text-left py-3 px-4 font-medium">Headquarters</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => (
                        <tr key={company.id} className="border-b last:border-0">
                            <td className="py-3 px-4">
                                <div className="font-medium">{company.name}</div>
                                <div className="text-sm text-muted-foreground">{company.contactEmail}</div>
                            </td>
                            <td className="py-3 px-4">{company.industry}</td>
                            <td className="py-3 px-4">{company.headquarters}</td>
                            <td className="py-3 px-4">
                                <Badge variant={company.status === "active" ? "default" : "destructive"}>
                                    {company.status}
                                </Badge>
                            </td>
                            <td className="py-3 px-4">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <ArrowUpRight className="h-4 w-4" />
                                    <span className="sr-only">View details</span>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
