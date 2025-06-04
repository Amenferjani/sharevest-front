"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Calendar, Plus, Edit, Trash2, Users, MapPin, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { createEvent, deleteEvent, getCompanies, getCompanyDetails, getEventsByCompany } from "@/services/rel-vest/service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Event } from "@/types/types"
import { formatDate } from "@/lib/utils"
import { useAuth } from "@/context/authContext"
import { useRouter, useSearchParams } from "next/navigation"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle } from "@/components/ui/alert-dialog"

export default function EventManagementPage() {
    const searchParams = useSearchParams();
    const companyId = searchParams.get("companyId");
    const [pendingId, setPendingId] = useState<string | null>(null)
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter();

    const [showCreateDialog, setShowCreateDialog] = useState(false)
    const [creating, setCreating] = useState(false)
    const [selectedCompanyFilter, setSelectedCompanyFilter] = useState("all")
    const [formData, setFormData] = useState<Event>({
        title: "",
        description: "",
        eventType: "Webinar",
        location: "",
        status: 'upcoming',
        companyId: "",
    })


    const {
        data: companyData,
        isLoading: companyLoading,
        refetch: companyRefetch,
        isFetched: companyFetched,
        error: companyError,
    } = useQuery({
        queryKey: ["company", companyId],
        queryFn: () => getCompanyDetails(companyId!),
        enabled: typeof window !== "undefined" && !!companyId,
        staleTime: 24 * 60 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const {
        data: eventsData,
        isLoading: eventsLoading,
        refetch: eventsRefetch,
        isFetched: eventsFetched,
        error: eventsError,
    } = useQuery({
        queryKey: ["events",companyId],
        queryFn: ()=> getEventsByCompany(companyId!),
        enabled: !!user && !!companyId,
        staleTime: 24 * 60 * 60 * 1000,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })

    const eventTypes = ["Annual Meeting", "Webinar", "Q&A Session", "Product Launch", "Earnings Call", "Conference"]

    const EventCreationMutation = useMutation({
        mutationFn: createEvent,
        onSuccess: () => {
            setShowCreateDialog(false);
            eventsRefetch();
        },
    });

    const deleteEventMutation = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            eventsRefetch();
        },
    })
    // useEffect(() => {
    //     const loadData = async () => {
    //         try {
    //             const [eventsData, companiesData] = await Promise.all([mockEventApi.getEvents(), mockEventApi.getCompanies()])
    //             setEvents(eventsData)
    //             setCompanies(companiesData)
    //         } catch (error) {
    //             console.error("Error loading data:", error)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     loadData()
    // }, [])

    // useEffect(() => {
    //     const loadFilteredEvents = async () => {
    //         try {
    //             const companyId = selectedCompanyFilter === "all" ? undefined : selectedCompanyFilter
    //             const eventsData = await mockEventApi.getEvents(companyId)
    //             setEvents(eventsData)
    //         } catch (error) {
    //             console.error("Error loading filtered events:", error)
    //         }
    //     }

    //     loadFilteredEvents()
    // }, [selectedCompanyFilter])

    const handleCreateEvent = (e: React.FormEvent) => {
        e.preventDefault();
        if (!companyId || !formData) return
        setCreating(true);
        EventCreationMutation.mutate({...formData,companyId:companyId!}, {
            onSettled: () => {
                setCreating(false);
            },
        });
    }

    const handleDeleteEvent = (id: string) => {
        setPendingId(id)  // stash which company was clicked
        setIsOpen(true) 
    }

    const confirmDelete = () => {
        if (!pendingId) return
        deleteEventMutation.mutate(pendingId)
        console.log("deleting", pendingId)
        setIsOpen(false)
        setPendingId(null)
    }
    // const handleDeleteEvent = async (eventId: string) => {
    //     if (confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
    //         try {
    //             await mockEventApi.deleteEvent(eventId)
    //             setEvents((prev) => prev.filter((e) => e.id !== eventId))
    //         } catch (error) {
    //             console.error("Error deleting event:", error)
    //         }
    //     }
    // }
    const pendingEvent = eventsData?.find((c) => c.id === pendingId)
    if (eventsLoading || companyLoading || !companyFetched || !eventsFetched) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                        <Button onClick={()=>router.back()} variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    <div className="space-y-2">
                        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                    </div>
                </div>

                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
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
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button onClick={() => router.back()} variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Event Management</h1>
                        <p className="text-muted-foreground">Create and manage events for your companies</p>
                    </div>
                </div>

                <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Event
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Create New Event</DialogTitle>
                            <DialogDescription>Schedule a new event for one of your companies</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateEvent} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Event Title *</Label>
                                    <Input
                                        id="title"
                                        value={formData?.title}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                                        placeholder="Enter event title"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="eventType">Event Type *</Label>
                                    <Select
                                        value={formData?.eventType}
                                        onValueChange={(value) => setFormData((prev) => ({ ...prev, eventType: value as 'Webinar' | 'Annual Meeting' | 'Q&A Session' }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select event type" />
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
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={formData?.description}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                                    placeholder="Describe the event"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="companyId">Company *</Label>
                                <div className="border px-3 py-2 rounded-md bg-muted text-muted-foreground">
                                    {companyData?.name }
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date *</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        onChange={(e) => setFormData((prev) => ({ ...prev, date: new Date(e.target.value) }))}
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
                                        placeholder="100"
                                    />
                                </div> */}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location *</Label>
                                <Input
                                    id="location"
                                    value={formData?.location}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                                    placeholder="Virtual or physical address"
                                    required
                                />
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={creating} className="flex-1">
                                    {creating ? "Creating..." : "Create Event"}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="space-y-4">
                {eventsData?.map((event) => (
                    <Card key={event.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-lg">{event.title}</CardTitle>
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
                                        <Badge variant={event.status === "upcoming" ? "outline" : "secondary"}>{event.status}</Badge>
                                    </div>
                                    <CardDescription>{event.description}</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/company-rep/events/${event.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/company-rep/investors?eventId=${event.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Users className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDeleteEvent(event.id!)}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{formatDate(event.date)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{event.location}</span>
                                </div>
                                </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {eventsData?.length === 0 && (
                <Card>
                    <CardContent className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">No events found</h3>
                            <p className="text-muted-foreground mb-4">
                                {selectedCompanyFilter === "all"
                                    ? "Create your first event to start engaging with investors."
                                    : "No events found for the selected company."}
                            </p>
                            <Button onClick={() => setShowCreateDialog(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Event
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogPortal>
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Delete “{pendingEvent?.title || "this event"}”?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action <strong>cannot</strong> be undone. All data for{" "}
                                {pendingEvent?.title || "the event"} will be permanently removed.
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
