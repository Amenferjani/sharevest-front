"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Handshake, Calendar, Building2, Users, UserPlus, Bell, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import RelInvestorWizard from "./sub-pages/rel-investor-wizard"
import { Investor } from "@/types/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useAuth } from "@/context/authContext"
import { createInvestor, getInvestorById } from "@/services/rel-vest/service"
import Loading from "@/components/ui/loading"
import Error from "@/components/ui/error"
import { formatDate } from "@/lib/utils"

// Static data based on the entities
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

const events = [
  {
    id: "e1",
    title: "Annual Investor Meeting",
    description: "Annual meeting to discuss company performance and future plans",
    eventType: "Annual Meeting",
    date: new Date("2023-11-15T14:00:00"),
    location: "San Francisco Convention Center",
    status: "upcoming",
    companyId: "c1",
    createdAt: new Date("2023-08-01"),
    updatedAt: new Date("2023-08-01"),
  },
  {
    id: "e2",
    title: "Q3 Earnings Webinar",
    description: "Webinar to discuss Q3 financial results",
    eventType: "Webinar",
    date: new Date("2023-10-25T10:00:00"),
    location: "Virtual",
    status: "upcoming",
    companyId: "c2",
    createdAt: new Date("2023-09-10"),
    updatedAt: new Date("2023-09-10"),
  },
  {
    id: "e3",
    title: "Product Launch Q&A",
    description: "Q&A session for the upcoming product launch",
    eventType: "Q&A Session",
    date: new Date("2023-11-05T15:30:00"),
    location: "Virtual",
    status: "upcoming",
    companyId: "c3",
    createdAt: new Date("2023-09-20"),
    updatedAt: new Date("2023-09-20"),
  },
  {
    id: "e4",
    title: "Strategic Partnership Discussion",
    description: "Discussion about potential strategic partnerships",
    eventType: "Webinar",
    date: new Date("2023-10-18T11:00:00"),
    location: "Virtual",
    status: "upcoming",
    companyId: "c4",
    createdAt: new Date("2023-09-15"),
    updatedAt: new Date("2023-09-15"),
  },
]

const investors = [
  {
    id: "i1",
    userId: "u1",
    name: "John Smith",
    email: "john.smith@investor.com",
    phoneNumber: "415-555-9876",
    investmentInterest: "Technology, Renewable Energy",
    status: "active",
    companyId: "c1",
    createdAt: new Date("2023-05-10"),
    updatedAt: new Date("2023-08-15"),
  },
  {
    id: "i2",
    userId: "u2",
    name: "Sarah Johnson",
    email: "sarah.johnson@investor.com",
    phoneNumber: "512-555-3456",
    investmentInterest: "Healthcare, Financial Technology",
    status: "active",
    companyId: "c2",
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2023-09-01"),
  },
  {
    id: "i3",
    userId: "u3",
    name: "Michael Chen",
    email: "michael.chen@investor.com",
    phoneNumber: "617-555-7890",
    investmentInterest: "Technology, Healthcare",
    status: "active",
    companyId: "c3",
    createdAt: new Date("2023-07-20"),
    updatedAt: new Date("2023-09-10"),
  },
  {
    id: "i4",
    userId: "u4",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@investor.com",
    phoneNumber: "212-555-2345",
    investmentInterest: "Financial Technology, Renewable Energy",
    status: "active",
    companyId: "c4",
    createdAt: new Date("2023-08-05"),
    updatedAt: new Date("2023-09-20"),
  },
]

export default function RelVestDashboard() {
  const { user } = useAuth();
  // Calculate metrics
  const activeCompanies = companies.filter((company) => company.status === "active").length
  const upcomingEvents = events.filter((event) => event.status === "upcoming").length
  const activeInvestors = investors.filter((investor) => investor.status === "active").length


  const {
    data: investorData,
    isLoading: investorLoading,
    isFetched: investorFetched,
    refetch: investorRefetch,
    error: investorError,
  } = useQuery({
    queryKey: ["investor"],
    queryFn: getInvestorById,
    enabled: !!user,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const createRiskProfileMutation = useMutation({
    mutationFn: createInvestor,
    onSuccess: () => {
      investorRefetch()
    },
  })

  const handleCancel = () => {
    console.log("cancel")
  }

  const handleComplete = (dto: Investor) => {
    createRiskProfileMutation.mutate(dto);
  }

  if (investorLoading) return <Loading />
  if (investorError) return <Error />
  if (!investorFetched || !investorData) {
    return <RelInvestorWizard onCancel={handleCancel} onComplete={handleComplete} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">RelVest</h1>
          <p className="text-muted-foreground">Relationship-based investing for strategic partnerships.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCompanies}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+2</span> from last quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Scheduled in the next 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investment Interest</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Key industry sectors</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events scheduled in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge
                        variant={
                          event.eventType === "Webinar"
                            ? "outline"
                            : event.eventType === "Annual Meeting"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {event.eventType}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(event.date)} • {event.location}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Company: {companies.find((c) => c.id === event.companyId)?.name}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    RSVP
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your RelVest activities</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href={`/dashboard/relvest/companies`}>
              <Button className="w-full flex items-center justify-start gap-2 bg-pink-600 hover:bg-pink-700">
                <Building2 className="h-4 w-4" />
                Explore Companies
              </Button>
            </Link>
            <Button className="w-full flex items-center justify-start gap-2 bg-blue-600 hover:bg-blue-700">
              <Calendar className="h-4 w-4" />
              View My RSVP
            </Button>
            <Button className="w-full flex items-center justify-start gap-2 bg-purple-600 hover:bg-purple-700">
              <UserPlus className="h-4 w-4" />
              Update My Investor Profile
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Tabs defaultValue="companies" className="w-full">
          {/* <TabsList className="grid grid-cols-1 mb-4"> */}
          {/* <TabsTrigger value="companies">Companies</TabsTrigger> */}
          {/* <TabsTrigger value="events">Events</TabsTrigger> */}
          {/* </TabsList> */}

          {/* <TabsContent value="companies">
                    <Card>
                      <CardHeader>
                        <CardTitle>Companies</CardTitle>
                        <CardDescription>List of companies in the RelVest network</CardDescription>
                      </CardHeader>
                      <CardContent>
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
                      </CardContent>
                    </Card>
                  </TabsContent> */}
          {/* <TabsContent value="events">
                    <Card>
                      <CardHeader>
                        <CardTitle>Events</CardTitle>
                        <CardDescription>Upcoming and past events</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-3 px-4 font-medium">Title</th>
                                <th className="text-left py-3 px-4 font-medium">Type</th>
                                <th className="text-left py-3 px-4 font-medium">Date</th>
                                <th className="text-left py-3 px-4 font-medium">Company</th>
                                <th className="text-left py-3 px-4 font-medium">Status</th>
                                <th className="text-left py-3 px-4 font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {events.map((event) => (
                                <tr key={event.id} className="border-b last:border-0">
                                  <td className="py-3 px-4">
                                    <div className="font-medium">{event.title}</div>
                                    <div className="text-sm text-muted-foreground">{event.location}</div>
                                  </td>
                                  <td className="py-3 px-4">{event.eventType}</td>
                                  <td className="py-3 px-4">{formatDate(event.date)}</td>
                                  <td className="py-3 px-4">{companies.find((c) => c.id === event.companyId)?.name}</td>
                                  <td className="py-3 px-4">
                                    <Badge
                                      variant={
                                        event.status === "upcoming"
                                          ? "outline"
                                          : event.status === "completed"
                                            ? "secondary"
                                            : "destructive"
                                      }
                                    >
                                      {event.status}
                                    </Badge>
                                  </td>
                                  <td className="py-3 px-4">
                                    <Button variant="outline" size="sm">
                                      RSVP
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent> */}
        </Tabs>
      </div>
    </div>
  )
}
