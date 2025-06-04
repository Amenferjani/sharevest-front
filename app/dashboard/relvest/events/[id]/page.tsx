import EventDetailsPage from "@/components/dashboard/subsidiaries/sub-pages/event-details-page";

export default function EventDetails({ params }: { params: { id: string } }) {
    return <EventDetailsPage eventId={params.id} />
}
