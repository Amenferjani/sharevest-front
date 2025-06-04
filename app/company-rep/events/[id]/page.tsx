import EventEditPage from "@/components/company-rep/sub-pages/event-edit-page";

export default function EventEdit({ params }: { params: { id: string } }) {
    return <EventEditPage eventId={params.id} />
}
