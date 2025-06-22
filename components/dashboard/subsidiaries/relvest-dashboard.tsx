"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Handshake, Calendar, Building2, UserPlus, Eye } from "lucide-react"
import Link from "next/link"
import RelInvestorWizard from "./sub-pages/rel-investor-wizard"
import { Company, Investor } from "@/types/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useAuth } from "@/context/authContext"
import { createInvestor, getInvestorById, getUpcomingEventsForInvestor, updateInvestor } from "@/services/rel-vest/service"
import Loading from "@/components/ui/loading"
import Error from "@/components/ui/error"
import { formatDate } from "@/lib/utils"
import EventsTable from "./tables/events-table"

function countThisQuarterCompanies(companies: Company[]): number {
  const now = new Date()
  const quarter = Math.floor(now.getMonth() / 3)
  const year = now.getFullYear()
  const start = new Date(year, quarter * 3, 1)
  const end = new Date(year, quarter * 3 + 3, 0)
  return companies.filter(c => new Date(c.createdAt!) >= start && new Date(c.createdAt!) <= end).length
}

function UpdateInvestorModal({
  investor,
  onSave,
  isLoading,
}: {
  investor: Investor,
  onSave: (updated: Partial<Investor>) => void,
  isLoading: boolean
}) {
  const [form, setForm] = useState({
    name: investor.name,
    email: investor.email,
    phoneNumber: investor.phoneNumber || '',
    investmentInterest: investor.investmentInterest || '',
  })
  const [open, setOpen] = useState(false)

  const isChanged = (
    form.name !== investor.name ||
    form.email !== investor.email ||
    form.phoneNumber !== (investor.phoneNumber || '') ||
    form.investmentInterest !== (investor.investmentInterest || '')
  )

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value })
  }

  const handleSubmit = () => {
    onSave(form)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full flex items-center justify-start gap-2 bg-purple-600 hover:bg-purple-700">
          <UserPlus className="h-4 w-4" />
          Update My Investor Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Your Investor Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <Label>Name</Label>
            <Input placeholder="Enter your name" value={form.name} onChange={e => handleChange("name", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Email</Label>
            <Input placeholder="Enter your email" value={form.email} onChange={e => handleChange("email", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Phone Number</Label>
            <Input placeholder="Enter phone number" value={form.phoneNumber} onChange={e => handleChange("phoneNumber", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Investment Interest</Label>
            <Input placeholder="e.g., Tech, Energy..." value={form.investmentInterest} onChange={e => handleChange("investmentInterest", e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={!isChanged || isLoading}
          >
            {isLoading && (
              <span className="mr-2 animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            )}
            Save
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


export default function RelVestDashboard() {
  const { user } = useAuth()
  const rsvpSectionRef = useRef<HTMLDivElement>(null)

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

  const {
    data: upcomingEventsData,
    isLoading: upcomingEventsLoading,
    isFetched: upcomingEventsFetched,
    error: upcomingEventsError,
  } = useQuery({
    queryKey: ["upcomingEvents"],
    queryFn: getUpcomingEventsForInvestor,
    enabled: !!user,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const createInvestorProfileMutation = useMutation({
    mutationFn: createInvestor,
    onSuccess: () => investorRefetch(),
  })

  const updateInvestorProfileMutation = useMutation({
    mutationFn: updateInvestor,
    onSuccess: () => investorRefetch(),
  })

  const handleCancel = () => console.log("cancel")

  const handleComplete = (dto: Investor) => createInvestorProfileMutation.mutate(dto)

  if (investorLoading || upcomingEventsLoading) return <Loading />
  if (investorError || upcomingEventsError) return <Error />
  if (!investorFetched || !investorData) return <RelInvestorWizard onCancel={handleCancel} onComplete={handleComplete} />

  const activeCompanies = investorData?.companies?.filter(c => c.status === "active").length

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
              <span className="text-emerald-500">{countThisQuarterCompanies(investorData.companies!)}</span> from last quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEventsData?.length}</div>
            <p className="text-xs text-muted-foreground">Across your companies</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My RSVP</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{investorData.events?.length}</div>
            <p className="text-xs text-muted-foreground">Events Participation</p>
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
            <div className="space-y-4 max-h-[240px] overflow-y-auto pr-2">
              {upcomingEventsData?.map((event) => (
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
                    <p className="text-sm text-muted-foreground">{formatDate(event.date)} • {event.location}</p>
                  </div>
                  <Link href={`relvest/events/${event.id}`}>
                    <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </Link>
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
            <Button
              onClick={() => rsvpSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="w-full flex items-center justify-start gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Calendar className="h-4 w-4" />
              View My RSVP
            </Button>
            <UpdateInvestorModal
              investor={investorData}
              onSave={(updated) => {
                const { companies, events, ...rest } = { ...investorData, ...updated };
                updateInvestorProfileMutation.mutate({
                  investorId: investorData?.id!,
                  dto: rest,
                });
              }}
              isLoading={updateInvestorProfileMutation.isPending}
            />


          </CardContent>
        </Card>
      </div>

      <div ref={rsvpSectionRef} className="grid gap-4 grid-cols-1 scroll-mt-20">
        <Card>
          <CardContent>
            <EventsTable isLoading={investorLoading} events={investorData.events!} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
