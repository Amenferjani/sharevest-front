import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// This is a placeholder component that would be used in the main dashboard
export default function EventsTable() {
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

    const companies = {
        c1: "TechInnovate Inc.",
        c2: "GreenEnergy Solutions",
        c3: "HealthPlus Medical",
        c4: "FinTech Innovations",
    }

    // Format date for display
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    return (
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
                            <td className="py-3 px-4">{companies[event.companyId as keyof typeof companies]}</td>
                            <td className="py-3 px-4">
                                <Badge
                                    variant={
                                        event.status === "upcoming" ? "outline" : event.status === "completed" ? "secondary" : "destructive"
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
    )
}
