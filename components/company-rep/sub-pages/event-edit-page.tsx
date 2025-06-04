"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Trash2, Users } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { formatDate, formatDateForInput } from "@/lib/utils"
import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteEvent, getEventDetails, updateEvent } from "@/services/rel-vest/service"
import { Event } from "@/types/types";
import isEqual from "lodash.isequal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle } from "@/components/ui/alert-dialog"


// Mock API functions
// const mockEventApi = {
//     getEvent: async (eventId: string) => {
//         await new Promise((resolve) => setTimeout(resolve, 500))

//         const events = {
//             e1: {
//                 id: "e1",
//                 title: "Annual Investor Meeting",
//                 description: "Annual meeting to discuss company performance and future plans",
//                 eventType: "Annual Meeting",
//                 date: new Date("2023-11-15T14:00:00"),
//                 location: "San Francisco Convention Center",
//                 status: "upcoming",
//                 companyId: "c1",
//                 companyName: "TechInnovate Inc.",
//                 attendeeCount: 45,
//                 maxAttendees: 200,
//                 createdAt: new Date("2023-08-01"),
//                 updatedAt: new Date("2023-08-01"),
//             },
//             e2: {
//                 id: "e2",
//                 title: "Q3 Earnings Webinar",
//                 description: "Webinar to discuss Q3 financial results",
//                 eventType: "Webinar",
//                 date: new Date("2023-10-25T10:00:00"),
//                 location: "Virtual",
//                 status: "upcoming",
//                 companyId: "c2",
//                 companyName: "GreenEnergy Solutions",
//                 attendeeCount: 123,
//                 maxAttendees: 500,
//                 createdAt: new Date("2023-09-10"),
//                 updatedAt: new Date("2023-09-10"),
//             },
//         }

//         return events[eventId as keyof typeof events] || null
//     },

//     updateEvent: async (eventId: string, data: any) => {
//         await new Promise((resolve) => setTimeout(resolve, 1000))
//         return { success: true }
//     },

//     deleteEvent: async (eventId: string) => {
//         await new Promise((resolve) => setTimeout(resolve, 500))
//         return { success: true }
//     },

//     getEventInvestors: async (eventId: string) => {
//         await new Promise((resolve) => setTimeout(resolve, 300))
//         return [
//             {
//                 id: "i1",
//                 name: "John Smith",
//                 email: "john.smith@investor.com",
//                 investmentInterest: "Technology, Renewable Energy",
//                 rsvpDate: new Date("2023-09-15"),
//             },
//             {
//                 id: "i2",
//                 name: "Sarah Johnson",
//                 email: "sarah.johnson@investor.com",
//                 investmentInterest: "Healthcare, Financial Technology",
//                 rsvpDate: new Date("2023-09-18"),
//             },
//         ]
//     },
// }

interface EventEditPageProps {
    eventId: string
}

export default function EventEditPage({ eventId }: EventEditPageProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState<Event>()
    const [isChanged, setIsChanged] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    const {
        data: eventData,
        isLoading: eventLoading,
        refetch: eventRefetch,
        isFetched: eventFetched,
        error: eventError,
    } = useQuery({
        queryKey: ["event", eventId],
        queryFn: () => getEventDetails(eventId),
        enabled: typeof window !== "undefined" && !!eventId,
        staleTime: 24 * 60 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const updateMutation = useMutation({
        mutationFn: updateEvent,
        onSuccess: () => {
            eventRefetch();
        },
    });

    const deleteEventMutation = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            router.push("/company-rep")
        },
    })

    const eventTypes = ["Annual Meeting", "Webinar", "Q&A Session", "Product Launch", "Earnings Call", "Conference"]

    useEffect(() => {
        if (eventFetched && eventData) {
            setFormData(eventData);
            setIsChanged(false);
        }
    }, [eventFetched, eventData]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData || !eventData) return
        setSaving(true)
        updateMutation.mutateAsync({ id: formData.id!, eventDto: formData }, {
            onSettled: () => {
                setSaving(false);
            },
        });
        setIsChanged(false)
        setSaving(false)
    }

    const handleFieldChange = <K extends keyof Event>(field: K, value: Event[K]) => {
        if (!formData || !eventData) return

        const updated = { ...formData, [field]: value }
        setFormData(updated)

        // compare updated to original
        const dirty = !isEqual(updated, eventData)
        setIsChanged(dirty)
    }

    const handleDelete = async () => {
        setIsOpen(true);
    }

    const confirmDelete = () => {
        if (!eventData) return
        deleteEventMutation.mutate(eventData?.id!);
        setIsOpen(false);
        setSaving(false);
    }

    if (eventLoading) {
        return (
            <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link href="/company-rep/events">
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

                <div className="grid gap-6 md:grid-cols-2">
                    {[...Array(2)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[...Array(4)].map((_, j) => (
                                        <div key={j} className="space-y-2">
                                            <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
                                            <div className="h-10 w-full bg-muted animate-pulse rounded" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if (!eventData) {
        return (
            <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link href="/company-rep/events">
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
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/company-rep/companies">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Events
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Edit Event</h1>
                        <p className="text-muted-foreground">Update event details and manage attendees</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link href={`/company-rep/investors?eventId=${eventId}`}>
                        <Button variant="outline">
                            <Users className="h-4 w-4 mr-2" />
                            {/* View Attendees ({investors.length}) */}
                        </Button>
                    </Link>
                    <Button variant="destructive" onClick={handleDelete}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Event
                    </Button>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Event Details</CardTitle>
                            <CardDescription>Basic event information and scheduling</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Event Title *</Label>
                                <Input
                                    id="title"
                                    value={formData?.title}
                                    onChange={(e) => handleFieldChange("title", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="eventType">Event Type *</Label>
                                <Select
                                    value={formData?.eventType}
                                    onValueChange={(value) => handleFieldChange("eventType", value as Event['eventType'])}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {eventTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={formData?.description}
                                    onChange={(e) =>handleFieldChange("description",e.target.value) }
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date *</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={formData?.date ? formatDateForInput(formData.date) : ""}
                                        onChange={(e) => handleFieldChange("date",new Date(e.target.value))}
                                        required
                                    />
                                </div>
                                {/* <div className="space-y-2">
                                    <Label htmlFor="time">Time *</Label>
                                    <Input
                                        id="time"
                                        type="time"
                                        value={formData?.time}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                                        required
                                    />
                                </div> */}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Event Settings</CardTitle>
                            <CardDescription>Location, capacity, and status settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="location">Location *</Label>
                                <Input
                                    id="location"
                                    value={formData?.location}
                                    onChange={(e) => handleFieldChange("location",e.target.value)}
                                    placeholder="Virtual or physical address"
                                    required
                                />
                            </div>

                            {/* <div className="space-y-2">
                                <Label htmlFor="maxAttendees">Max Attendees</Label>
                                <Input
                                    id="maxAttendees"
                                    type="number"
                                    value={formData?.maxAttendees}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, maxAttendees: e.target.value }))}
                                />
                            </div> */}

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData?.status}
                                    onValueChange={(value) => handleFieldChange("status",value as Event["status"])}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="upcoming">Upcoming</SelectItem>
                                        <SelectItem value="ongoing">Ongoing</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Created:</span>
                                    <span>{formatDate(eventData?.createdAt)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Last Updated:</span>
                                    <span>{formatDate(eventData?.updatedAt)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Current Status:</span>
                                    <Badge variant={eventData?.status === "upcoming" ? "outline" : "secondary"}>{eventData?.status}</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={!isChanged || saving} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        {saving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Link href="/company-rep/events">
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </Link>
                </div>
            </form>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogPortal>
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Delete “{eventData?.title || "this event"}”?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action <strong>cannot</strong> be undone. All data for{" "}
                                {eventData?.title || "the event"} will be permanently removed.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmDelete}>
                                Yes, delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogPortal>
            </AlertDialog>
        </div>
    )
}
