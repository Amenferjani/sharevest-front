"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, UserPlus, Lock, Calendar, UserMinus, ExternalLink, Globe, Info, Mail, MapPin, Phone, Briefcase, Building2, ListChecks } from "lucide-react"
import { useState, useEffect } from "react"
import RSVPButton from "@/components/ui/rsvp-button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getCompanyDetails, linkInvestorToCompany, unlinkInvestorFromCompany } from "@/services/rel-vest/service"
import { formatDate } from "@/lib/utils"
import { useAuth } from "@/context/authContext"

// Mock API functions
const mockApi = {
    getCompany: async (id: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500))

        const companies = {
            c1: {
                id: "c1",
                name: "TechInnovate Inc.",
                industry: "Technology",
                description:
                    "Leading technology innovation company specializing in AI and machine learning solutions. We develop cutting-edge software that helps businesses automate their processes and make data-driven decisions.",
                headquarters: "San Francisco, CA",
                contactEmail: "contact@techinnovate.com",
                phoneNumber: "415-555-1234",
                website: "https://techinnovate.com",
                status: "active",
                createdAt: new Date("2023-01-15"),
                updatedAt: new Date("2023-05-20"),
            },
            c2: {
                id: "c2",
                name: "GreenEnergy Solutions",
                industry: "Renewable Energy",
                description:
                    "Sustainable energy solutions provider focused on solar and wind power. We help businesses and communities transition to clean energy with innovative technology and financing solutions.",
                headquarters: "Austin, TX",
                contactEmail: "info@greenenergy.com",
                phoneNumber: "512-555-6789",
                website: "https://greenenergy.com",
                status: "active",
                createdAt: new Date("2023-02-10"),
                updatedAt: new Date("2023-06-15"),
            },
        }

        return companies[id as keyof typeof companies] || null
    },

    getCompanyEvents: async (companyId: string) => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        const allEvents = [
            {
                id: "e1",
                title: "Annual Investor Meeting",
                description: "Annual meeting to discuss company performance and future plans",
                eventType: "Annual Meeting",
                date: new Date("2023-11-15T14:00:00"),
                location: "San Francisco Convention Center",
                status: "upcoming",
                companyId: "c1",
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
            },
            {
                id: "e5",
                title: "Tech Innovation Showcase",
                description: "Showcase of our latest AI and ML innovations",
                eventType: "Webinar",
                date: new Date("2023-12-01T16:00:00"),
                location: "Virtual",
                status: "upcoming",
                companyId: "c1",
            },
        ]

        return allEvents.filter((event) => event.companyId === companyId)
    },

    subscribeToCompany: async (investorId: string, companyId: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        return { success: true }
    },

    unsubscribeFromCompany: async (investorId: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        return { success: true }
    },
}

interface CompanyDetailsPageProps {
    companyId: string
}

export default function CompanyDetailsPage({ companyId }: CompanyDetailsPageProps) {
    const { user } = useAuth();
    const [investorLinked, setInvestorLinked] = useState(false)
    const [joining, setJoining] = useState(false)
    const [processingId, setProcessingId] = useState<string | null>(null)
    const router = useRouter();

    const {
        data: companyData,
        isLoading: companyLoading,
        refetch: companyRefetch,
        isFetched: companyFetched,
        error: companyError,
    } = useQuery({
        queryKey: ["company", companyId],
        queryFn: () => getCompanyDetails(companyId),
        enabled: typeof window !== "undefined" && !!companyId,
        staleTime: 24 * 60 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const linkInvestorToCompanyMutation = useMutation({
        mutationFn: linkInvestorToCompany,
        onSuccess: async () => {
            await companyRefetch()
            setJoining(false)
        },
    })
    const unlinkInvestorToCompanyMutation = useMutation({
        mutationFn: unlinkInvestorFromCompany,
        onSuccess: async () => {
            await companyRefetch()
            setJoining(false)
        },
    })

    const rsvpToEventMutation = useMutation({
        mutationFn: async (eventId: string) => {
            // 🔁 Replace this with actual API
            await new Promise((res) => setTimeout(res, 500))
            // return { success: true }
        },
        onSuccess: async () => {
            await companyRefetch()
        },
    })

    const cancelRsvpMutation = useMutation({
        mutationFn: async (eventId: string) => {
            // 🔁 Replace this with actual API
            await new Promise((res) => setTimeout(res, 500))
            // return { success: true }
        },
        onSuccess: async () => {
            await companyRefetch()
        },
    })


    useEffect(() => {
        if (companyData?.investors && user?.id) {
            const isLinked = companyData.investors.some(
                (inv) => inv.userId === user.id
            )
            setInvestorLinked(isLinked)
        }
    }, [companyData?.investors, user?.id])

    const handleJoining = async () => {
        setJoining(true)
        linkInvestorToCompanyMutation.mutate(companyId)
    }
    const handleUnjoining = async () => {
        setJoining(true)
        unlinkInvestorToCompanyMutation.mutate(companyId)
    }

    const handleRSVP = (eventId: string) => {
        if(!eventId) return
        setProcessingId(eventId!)
        rsvpToEventMutation.mutate(eventId)
    }
    
    const handleCancelRSVP = (eventId: string) => {
        if(!eventId) return
        setProcessingId(eventId!)
        cancelRsvpMutation.mutate(eventId)
    }

    if (companyLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button onClick={() => router.back()} variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />

                    </Button>
                    <div className="space-y-2">
                        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                    </div>
                </div>

                <div className="grid gap-6">
                    {[...Array(1)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                            </CardHeader>
                            <CardContent>
                                <CardContent>
                                    {[...Array(8)].map((_, j) => (
                                        <div key={j} className="space-y-2 gap-4">
                                            <div className="h-4 w-full bg-muted animate-pulse rounded mb-1" />
                                            <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                                        </div>
                                    ))}
                                </CardContent>

                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if (!companyData || !companyFetched || companyError) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button onClick={() => router.back()} variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />

                    </Button>
                </div>

                <Card>
                    <CardContent className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <h3 className="text-lg font-medium mb-2">Company not found</h3>
                            <p className="text-muted-foreground">The company you're looking for doesn't exist.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button onClick={() => router.back()} variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />

                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{companyData.name}</h1>
                    <p className="text-muted-foreground">{companyData.industry}</p>
                </div>
            </div>
            <div className="w-full">
                <Card className="w-full shadow-lg border-0 bg-white">
                    <CardHeader className="pb-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Building2 className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl font-bold text-gray-900">{companyData.name}</CardTitle>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Briefcase className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm font-medium text-gray-600">{companyData.industry}</span>
                                    </div>
                                </div>
                            </div>
                            <Badge
                                variant={companyData.status === "active" ? "default" : "destructive"}
                                className="text-xs font-semibold px-3 py-1 self-start md:self-auto"
                            >
                                {companyData?.status!.toUpperCase()}
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-10">
                        {/* About */}
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2">About</h4>
                            <p className="text-gray-700 leading-relaxed">{companyData.description}</p>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Column: Contact */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Mail className="text-gray-500 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-gray-900 text-sm">Email</h4>
                                        <a
                                            href={`mailto:${companyData.contactEmail}`}
                                            className="text-blue-600 hover:text-blue-800 text-sm hover:underline transition-colors"
                                        >
                                            {companyData.contactEmail}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-gray-900 text-sm">Phone</h4>
                                        <a
                                            href={`tel:${companyData.phoneNumber}`}
                                            className="text-gray-600 hover:text-gray-800 text-sm hover:underline transition-colors"
                                        >
                                            {companyData.phoneNumber}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Headquarters + Website */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-gray-900 text-sm">Headquarters</h4>
                                        <p className="text-gray-600 text-sm">{companyData.headquarters}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <ExternalLink className="h-5 w-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-gray-900 text-sm">Website</h4>
                                        <a
                                            href={companyData.website}
                                            className="text-blue-600 hover:text-blue-800 text-sm hover:underline flex items-center gap-1 transition-colors"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {companyData.website.replace("https://", "")}
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Timeline + Join Button */}
                        <div className="border-t pt-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-4">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Timeline</h4>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h5 className="font-medium text-gray-900 text-sm">Created</h5>
                                        <p className="text-gray-600 text-sm mt-1">{formatDate(companyData.createdAt)}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h5 className="font-medium text-gray-900 text-sm">Last Updated</h5>
                                        <p className="text-gray-600 text-sm mt-1">{formatDate(companyData.updatedAt)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Join Button */}
                            <div className="md:ml-4">
                                <Button
                                    type="button"
                                    className={`ps-16 pe-16 shadow ${investorLinked ? "bg-red-800 hover:bg-red-700 " : " "
                                        }`}
                                    disabled={joining}
                                    onClick={!investorLinked ? handleJoining : handleUnjoining}
                                >
                                    {joining ? (
                                        <span className="flex items-center gap-2">
                                            <span className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full"></span>
                                            {investorLinked ? "Unjoining..." : "Joining..."}
                                        </span>
                                    ) : investorLinked ? (
                                        <span className="flex items-center gap-2">
                                            <UserMinus className="h-4 w-4" />
                                            Unjoin
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <UserPlus className="h-4 w-4" />
                                            Join
                                        </span>
                                    )}
                                </Button>
                            </div>


                        </div>
                    </CardContent>

                </Card>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-gray-600" />
                        <CardTitle>Upcoming Events</CardTitle>
                    </div>
                    <CardDescription className="flex items-center gap-1 text-muted-foreground">
                        <Info className="h-4 w-4" />
                        Events scheduled by this company
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {!investorLinked ? (
                        <div className="text-center py-6 text-muted-foreground text-sm flex flex-col items-center gap-2">
                            <Lock className="h-6 w-6 text-red-500" />
                            <p>
                                You must <span className="font-medium text-gray-900">join</span> this company to view its events.
                            </p>
                        </div>
                    ) : !companyData?.events || companyData?.events.length === 0 ? (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <ListChecks className="h-4 w-4" />
                            No upcoming events
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {companyData.events.map((event) => {
                                const isRSVPed = event?.investors?.some((inv) => inv.userId === user?.id)
                                return (
                                    <div key={event.id} className="border-b pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-medium">{event.title}</h4>
                                                    <Badge variant="outline">{event.eventType}</Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    <Calendar className="inline h-4 w-4 mr-1 text-gray-500" />
                                                    {formatDate(event.date)} • {event.location}
                                                </p>
                                                <p className="text-sm text-muted-foreground">{event.description}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <RSVPButton
                                                    isRSVPed={isRSVPed!}
                                                    loading={processingId === event.id}
                                                    onClick={() => isRSVPed ? handleCancelRSVP(event.id!) : handleRSVP(event.id!)}
                                                />
                                                <Link href={`/dashboard/relvest/events/${event.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        Details
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>


        </div>
    )
}
