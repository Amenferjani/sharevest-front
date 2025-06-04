"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Search, Filter, ArrowUpRight, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getCompanies } from "@/services/rel-vest/service"
import { useAuth } from "@/context/authContext"

// const mockApi = {
//     getCompanies: async (params?: { search?: string; industry?: string }) => {
//         await new Promise((resolve) => setTimeout(resolve, 300))

//         const allCompanies = [
//             {
//                 id: "c1",
//                 name: "TechInnovate Inc.",
//                 industry: "Technology",
//                 description: "Leading technology innovation company specializing in AI and machine learning solutions",
//                 headquarters: "San Francisco, CA",
//                 contactEmail: "contact@techinnovate.com",
//                 phoneNumber: "415-555-1234",
//                 website: "https://techinnovate.com",
//                 status: "active",
//                 createdAt: new Date("2023-01-15"),
//                 updatedAt: new Date("2023-05-20"),
//             },
//             {
//                 id: "c2",
//                 name: "GreenEnergy Solutions",
//                 industry: "Renewable Energy",
//                 description: "Sustainable energy solutions provider focused on solar and wind power",
//                 headquarters: "Austin, TX",
//                 contactEmail: "info@greenenergy.com",
//                 phoneNumber: "512-555-6789",
//                 website: "https://greenenergy.com",
//                 status: "active",
//                 createdAt: new Date("2023-02-10"),
//                 updatedAt: new Date("2023-06-15"),
//             },
//             {
//                 id: "c3",
//                 name: "HealthPlus Medical",
//                 industry: "Healthcare",
//                 description: "Innovative healthcare solutions and medical device manufacturing",
//                 headquarters: "Boston, MA",
//                 contactEmail: "contact@healthplus.com",
//                 phoneNumber: "617-555-4321",
//                 website: "https://healthplus.com",
//                 status: "active",
//                 createdAt: new Date("2023-03-05"),
//                 updatedAt: new Date("2023-07-10"),
//             },
//             {
//                 id: "c4",
//                 name: "FinTech Innovations",
//                 industry: "Financial Technology",
//                 description: "Next-generation financial technology solutions for digital banking",
//                 headquarters: "New York, NY",
//                 contactEmail: "info@fintechinnovations.com",
//                 phoneNumber: "212-555-8765",
//                 website: "https://fintechinnovations.com",
//                 status: "active",
//                 createdAt: new Date("2023-04-20"),
//                 updatedAt: new Date("2023-08-05"),
//             },
//             {
//                 id: "c5",
//                 name: "AgriTech Solutions",
//                 industry: "Agriculture",
//                 description: "Smart farming solutions using IoT and precision agriculture",
//                 headquarters: "Denver, CO",
//                 contactEmail: "hello@agritech.com",
//                 phoneNumber: "303-555-2468",
//                 website: "https://agritech.com",
//                 status: "active",
//                 createdAt: new Date("2023-05-12"),
//                 updatedAt: new Date("2023-08-20"),
//             },
//             {
//                 id: "c6",
//                 name: "EduLearn Platform",
//                 industry: "Education Technology",
//                 description: "Online learning platform for professional development",
//                 headquarters: "Seattle, WA",
//                 contactEmail: "support@edulearn.com",
//                 phoneNumber: "206-555-1357",
//                 website: "https://edulearn.com",
//                 status: "active",
//                 createdAt: new Date("2023-06-08"),
//                 updatedAt: new Date("2023-09-01"),
//             },
//         ]

//         let filtered = allCompanies

//         if (params?.search) {
//             filtered = filtered.filter(
//                 (company) =>
//                     company.name.toLowerCase().includes(params.search!.toLowerCase()) ||
//                     company.description.toLowerCase().includes(params.search!.toLowerCase()),
//             )
//         }

//         if (params?.industry && params.industry !== "all") {
//             filtered = filtered.filter((company) => company.industry === params.industry)
//         }

//         return filtered
//     },
// }

export default function CompaniesSearchPage() {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedIndustry, setSelectedIndustry] = useState("all")
    const router = useRouter()

    const industries = [
        "Technology",
        "Renewable Energy",
        "Healthcare",
        "Financial Technology",
        "Agriculture",
        "Education Technology",
    ]

    const [filters, setFilters] = useState({
        search: "",
        industry: "all",
        status: "all",
    })
    const [triggeredFilters, setTriggeredFilters] = useState(filters)

    const {
        data: companiesData,
        isLoading: companiesLoading,
        refetch: companiesRefetch,
        isFetched: companiesFetched,
        error: companiesError,
    } = useQuery({
        queryKey: ["companies", , triggeredFilters],
        queryFn: () => getCompanies(filters),
        enabled: !!user,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10,
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button onClick={() => router.back()} variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Companies</h1>
                    <p className="text-muted-foreground">Explore companies in the RelVest network</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search companies..."
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        className="pl-10"
                    />
                </div>

                <Select
                    value={filters.industry}
                    onValueChange={(value) => setFilters({ ...filters, industry: value })}
                >
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Industries</SelectItem>
                        {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                                {industry}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={filters.status}
                    onValueChange={(value) => setFilters({ ...filters, status: value })}
                >
                    <SelectTrigger className="w-full sm:w-[160px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>

                <Button onClick={() => setTriggeredFilters(filters)}>Search</Button>
            </div>

            {companiesLoading || !companiesFetched ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <div className="space-y-2">
                                    <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                                    <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-muted animate-pulse rounded" />
                                    <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                        {companiesData?.map((company) => (
                            <Card key={company?.id} className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="text-lg">{company?.name}</CardTitle>
                                            <Badge variant="outline">{company?.industry}</Badge>
                                        </div>
                                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{company?.description}</p>
                                    <div className="space-y-2 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-3 w-3" />
                                            {company?.headquarters}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Badge variant={company?.status === "active" ? "default" : "destructive"}>
                                                {company?.status}
                                            </Badge>
                                            <span>{company?.contactEmail}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Link href={`/dashboard/relvest/companies/${company?.id}`}>
                                            <Button className="w-full" size="sm">
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {companiesData?.length === 0 && (
                        <Card>
                            <CardContent className="flex items-center justify-center py-12">
                                <div className="text-center">
                                    <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-medium mb-2">No companies found</h3>
                                    <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </>
            )}
        </div>
    )
}
