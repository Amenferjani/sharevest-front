"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    ArrowLeft,
    Calendar,
    MapPin,
    Building2,
    Users,
    ExternalLink,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Video,
    TrendingUp
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import RSVPButton from "@/components/ui/rsvp-button"
import { cancelRsvp, getEventDetails, rsvpToEvent } from "@/services/rel-vest/service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { formatDate } from "@/lib/utils"
import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation"


interface EventDetailsPageProps {
    eventId: string
}

export default function EventDetailsPage({ eventId }: EventDetailsPageProps) {
    const { user } = useAuth();
    const router = useRouter();
    const [processingId, setProcessingId] = useState(false)
    const [isRSVPed, setIsRSVPed] = useState(false)

    const {
        data: event,
        refetch: eventRefetch,
        isLoading,
        error,
        isRefetching,
    } = useQuery({
        queryKey: ["eventById", eventId],
        queryFn: () => getEventDetails(eventId),
        enabled: !!eventId,
        staleTime: 24 * 60 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const rsvpToEventMutation = useMutation({
        mutationFn: rsvpToEvent,
        onSuccess: () => {
            setProcessingId(false)
            eventRefetch()
        },
    })

    const cancelRsvpMutation = useMutation({
        mutationFn: cancelRsvp,
        onSuccess: () => {
            setProcessingId(false)
            eventRefetch()
        },
    })

    useEffect(() => {
        if (event?.investors, user?.id) {
            setIsRSVPed(event?.investors?.some((inv) => inv.userId === user?.id)!);
        }
    }, [event?.investors, user?.id])

    const handleRSVP = () => {
        if (!event) return
        setProcessingId(true)
        rsvpToEventMutation.mutate(event.id!)
    }

    const handleCancelRSVP = () => {
        if (!event) return
        setProcessingId(true)
        cancelRsvpMutation.mutate(event.id!)
    }

    const attendees = event?.investors || [];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'upcoming':
                return <Clock className="h-4 w-4" />
            case 'completed':
                return <CheckCircle className="h-4 w-4" />
            case 'cancelled':
                return <XCircle className="h-4 w-4" />
            default:
                return <AlertCircle className="h-4 w-4" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming':
                return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800'
            case 'completed':
                return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800'
            case 'cancelled':
                return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800'
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800'
        }
    }

    const getEventTypeIcon = (eventType: string) => {
        switch (eventType) {
            case 'Webinar':
                return <Video className="h-4 w-4" />
            case 'Annual Meeting':
                return <Building2 className="h-4 w-4" />
            case 'Q&A Session':
                return <Users className="h-4 w-4" />
            default:
                return <Calendar className="h-4 w-4" />
        }
    }

    const getEventTypeColor = (eventType: string) => {
        switch (eventType) {
            case 'Webinar':
                return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800'
            case 'Annual Meeting':
                return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
            case 'Q&A Session':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800'
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen ">
                <div className="container mx-auto px-4 py-8 space-y-8">
                    {/* Header Skeleton */}
                    <div className="flex items-center gap-6">
                        <div className="h-10 w-32 bg-muted animate-pulse rounded-lg" />
                        <div className="space-y-3">
                            <div className="h-8 w-64 bg-muted animate-pulse rounded" />
                            <div className="h-4 w-40 bg-muted animate-pulse rounded" />
                        </div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-6">
                            {[...Array(2)].map((_, i) => (
                                <Card key={i} className="border-0 shadow-lg">
                                    <CardHeader className="pb-4">
                                        <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="h-4 w-full bg-muted animate-pulse rounded" />
                                            <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                                            <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="space-y-6">
                            {[...Array(3)].map((_, i) => (
                                <Card key={i} className="border-0 shadow-lg">
                                    <CardHeader>
                                        <div className="h-5 w-2/3 bg-muted animate-pulse rounded" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="h-4 w-full bg-muted animate-pulse rounded" />
                                            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen">
                <div className="container mx-auto px-4 py-8 space-y-8">
                    <div className="flex items-center gap-6">
                        <Button onClick={() => router.back()} variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                    </div>

                    <Card className="border-0 shadow-xl">
                        <CardContent className="flex items-center justify-center py-16">
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                                    <AlertCircle className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold">Event not found</h3>
                                <p className="text-muted-foreground max-w-md">
                                    The event you're looking for doesn't exist or may have been removed.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Enhanced Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <Button onClick={() => router.back()} variant="outline" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                                    {event.title}
                                </h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Hosted by</span>
                                    <Link
                                        href={`/dashboard/relvest/companies/${event.companyId}`}
                                        className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                    >
                                        {event.company?.name}
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge className={`${getEventTypeColor(event.eventType)} border font-medium px-3 py-1`}>
                                    {getEventTypeIcon(event.eventType)}
                                    <span className="ml-2">{event.eventType}</span>
                                </Badge>
                                <Badge className={`${getStatusColor(event.status)} border font-medium px-3 py-1`}>
                                    {getStatusIcon(event.status)}
                                    <span className="ml-2 capitalize">{event.status}</span>
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    {/* First Row - Event Overview Card (Full Width) */}
                    <Card className="">
                        <CardHeader className="pb-6">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <CardTitle className="text-2xl flex items-center gap-3">
                                        {getEventTypeIcon(event.eventType)}
                                        {event.title}
                                    </CardTitle>
                                    <CardDescription className="text-base">
                                        {event.description || "No description available for this event."}
                                    </CardDescription>
                                </div>
                                <RSVPButton
                                    isRSVPed={isRSVPed!}
                                    loading={processingId}
                                    onClick={() => isRSVPed ? handleCancelRSVP() : handleRSVP()}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Event Details Grid */}
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="flex-1 bg-transparent">
                                        <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">Date & Time</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            {formatDate(event.date)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                                        <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div className="flex-1 bg-transparent">
                                        <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">Location</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            {event.location || "Location TBD"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                    <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50">
                                        <Building2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <div className="flex-1 bg-transparent">
                                        <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">Host Company</p>
                                        <Link
                                            href={`/dashboard/relvest/companies/${event.companyId}`}
                                            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 mt-1 transition-colors"
                                        >
                                            {event.company?.name}
                                            <ExternalLink className="h-3 w-3" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                                        <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div className="flex-1 bg-transparent">
                                        <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">Attendance</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            {attendees.length} investors registered
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Second Row - Timeline and Statistics Side by Side */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Event Timeline Card */}
                        <Card className="">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    Event Timeline
                                </CardTitle>
                                <CardDescription>
                                    Important dates and milestones for this event
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">Event Created</p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDate(event.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">Event Date</p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDate(event.date)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">Last Updated</p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDate(event.updatedAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Event Statistics */}
                        <Card className="">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Event Statistics
                                </CardTitle>
                                <CardDescription>
                                    Registration and attendance metrics
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Registered</span>
                                    <span className="font-bold text-lg text-slate-900 dark:text-slate-100">{attendees.length}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Event Type</span>
                                    <Badge variant="outline" className="font-medium">
                                        {event.eventType}
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Status</span>
                                    <Badge className={getStatusColor(event.status)}>
                                        {event.status}
                                    </Badge>
                                </div>

                                {attendees.length > 0 && (
                                    <div className="pt-4">
                                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                                                style={{ width: `${Math.min((attendees.length / 100) * 100, 100)}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2 text-center">
                                            Registration Progress
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}