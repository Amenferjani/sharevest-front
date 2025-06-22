import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Calendar,
    Eye,

} from 'lucide-react';
import { Event } from '@/types/types';
import Link from 'next/link';

interface EventsTableProps {
    events: Event[];
    isLoading?: boolean;
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'upcoming':
            return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
        case 'completed':
            return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
        case 'cancelled':
            return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
        default:
            return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
    }
};

const formatDateShort = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(date));
};

export default function EventsTable({ events, isLoading = false }: EventsTableProps) {
    if (isLoading) {
        return (
            <Card className="border-0 shadow-lg">
                <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold tracking-tight">Events</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center space-x-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                                <div className="h-12 w-12 bg-muted animate-pulse rounded-lg" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                                    <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
                                </div>
                                <div className="h-8 w-20 bg-muted animate-pulse rounded" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!events || events.length === 0) {
        return (
            <Card className="border-0 shadow-lg">
                <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold tracking-tight">Events</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                            <Calendar className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No events found</h3>
                        <p className="text-muted-foreground max-w-md">
                            There are no events to display at the moment.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold tracking-tight">My RSVP's</CardTitle>
                    <Badge variant="outline" className="font-medium">
                        {events.length} {events.length === 1 ? 'Event' : 'Events'}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-200 dark:border-slate-700">
                                <TableHead className="font-semibold text-slate-900 dark:text-slate-100 px-6 py-4">
                                    Name
                                </TableHead>
                                <TableHead className="font-semibold text-slate-900 dark:text-slate-100 px-6 py-4">
                                    Date
                                </TableHead>
                                <TableHead className="font-semibold text-slate-900 dark:text-slate-100 px-6 py-4">
                                    Status
                                </TableHead>
                                <TableHead className="font-semibold text-slate-900 dark:text-slate-100 px-6 py-4">
                                    Location
                                </TableHead>
                                <TableHead className="font-semibold text-slate-900 dark:text-slate-100 px-6 py-4 text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow
                                    key={event.id}
                                    className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                >
                                    <TableCell className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                                        {event.title}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                        {formatDateShort(event.date!)}
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <Badge className={`${getStatusColor(event.status)} border font-medium px-2 py-1`}>
                                            <span className="text-xs capitalize">{event.status}</span>
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                        {event.location}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-right">
                                        <Link href={`relvest/events/${event.id}`}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                                            >
                                                <Eye className="h-4 w-4 mr-2" />
                                                Details
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
