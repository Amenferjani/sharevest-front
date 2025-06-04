"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, Building2, Users, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import RSVPButton from "@/components/ui/rsvp-button"

// Mock API functions
const mockApi = {
    getEvent: async (id: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500))

        const events = {
            e1: {
                id: "e1",
                title: "Annual Investor Meeting",
                description:
                    "Join us for our annual investor meeting where we'll discuss company performance, future plans, and answer your questions. This is a great opportunity to connect with other investors and learn about our strategic direction for the coming year.",
                eventType: "Annual Meeting",
                date: new Date("2023-11-15T14:00:00"),
                location: "San Francisco Convention Center",
                status: "upcoming",
                companyId: "c1",
                companyName: "TechInnovate Inc.",
                maxAttendees: 200,
                currentAttendees: 45,
                agenda: [
                    "Welcome and Opening Remarks",
                    "Company Performance Review",
                    "Future Strategy Presentation",
                    "Q&A Session",
                    "Networking Reception",
                ],
            },
            e2: {
                id: "e2",
                title: "Q3 Earnings Webinar",
                description:
                    "Webinar to discuss Q3 financial results and market outlook. We'll cover revenue growth, key metrics, and strategic initiatives.",
                eventType: "Webinar",
                date: new Date("2023-10-25T10:00:00"),
                location: "Virtual",
                status: "upcoming",
                companyId: "c2",
                companyName: "GreenEnergy Solutions",
                maxAttendees: 500,
                currentAttendees: 123,
                agenda: ["Q3 Financial Overview", "Market Analysis", "Strategic Updates", "Q&A Session"],
            },
        }

        return events[id as keyof typeof events] || null
    },

    getEventAttendees: async (eventId: string) => {
        await new Promise((resolve) => setTimeout(resolve, 300))

        return [
            {
                id: "i1",
                name: "John Smith",
                email: "john.smith@investor.com",
                investmentInterest: "Technology, Renewable Energy",
            },
            {
                id: "i2",
                name: "Sarah Johnson",
                email: "sarah.johnson@investor.com",
                investmentInterest: "Healthcare, Financial Technology",
            },
            {
                id: "i3",
                name: "Michael Chen",
                email: "michael.chen@investor.com",
                investmentInterest: "Technology, Healthcare",
            },
        ]
    },
}

interface EventDetailsPageProps {
    eventId: string
}

export default function EventDetailsPage({ eventId }: EventDetailsPageProps) {
    const [event, setEvent] = useState<any>(null)
    const [attendees, setAttendees] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                const [eventData, attendeesData] = await Promise.all([
                    mockApi.getEvent(eventId),
                    mockApi.getEventAttendees(eventId),
                ])
                setEvent(eventData)
                setAttendees(attendeesData)
            } catch (error) {
                console.error("Error loading event data:", error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [eventId])

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/events">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Events
                        </Button>
                    </Link>
                    <div className="space-y-2">
                        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
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
            </div>
        )
    }

    if (!event) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/events">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Events
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardContent className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <h3 className="text-lg font-medium mb-2">Event not found</h3>
                            <p className="text-muted-foreground">The event you're looking for doesn't exist.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/events">
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Events
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{event.title}</h1>
                    <p className="text-muted-foreground">Hosted by {event.companyName}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-xl">{event.title}</CardTitle>
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
                                <Badge variant={event.status === "upcoming" ? "outline" : "secondary"}>{event.status}</Badge>
                            </div>
                            <RSVPButton eventId={event.id} />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-medium mb-2">Description</h4>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium text-sm">Date & Time</p>
                                    <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium text-sm">Location</p>
                                    <p className="text-sm text-muted-foreground">{event.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Building2 className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium text-sm">Host Company</p>
                                    <Link
                                        href={`/companies/${event.companyId}`}
                                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                        {event.companyName}
                                        <ExternalLink className="h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium text-sm">Attendance</p>
                                    <p className="text-sm text-muted-foreground">
                                        {event.currentAttendees} / {event.maxAttendees} registered
                                    </p>
                                </div>
                            </div>
                        </div>

                        {event.agenda && (
                            <div>
                                <h4 className="font-medium mb-3">Agenda</h4>
                                <ul className="space-y-2">
                                    {event.agenda.map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-2 text-sm">
                                            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                                                {index + 1}
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Event Statistics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Registered</span>
                                <span className="font-medium">{event.currentAttendees}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Capacity</span>
                                <span className="font-medium">{event.maxAttendees}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Available</span>
                                <span className="font-medium">{event.maxAttendees - event.currentAttendees}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full"
                                    style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Attendees</CardTitle>
                            <CardDescription>Other investors attending this event</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {attendees.slice(0, 5).map((attendee) => (
                                    <div key={attendee.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-sm">{attendee.name}</p>
                                            <p className="text-xs text-muted-foreground">{attendee.investmentInterest}</p>
                                        </div>
                                    </div>
                                ))}
                                {attendees.length > 5 && (
                                    <p className="text-xs text-muted-foreground">+{attendees.length - 5} more attendees</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
