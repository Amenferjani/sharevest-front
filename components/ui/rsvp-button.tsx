"use client"

import { Button } from "@/components/ui/button"

interface RSVPButtonProps {
    isRSVPed: boolean
    loading: boolean
    onClick: () => void
}

export default function RSVPButton({
    isRSVPed,
    loading,
    onClick,
}: RSVPButtonProps) {
    return (
        <Button
            variant={isRSVPed ? "destructive" : "default"}
            size="sm"
            disabled={loading}
            onClick={onClick}
        >
            {loading
                ? "Processing..."
                : isRSVPed
                    ? "Cancel RSVP"
                    : "RSVP"}
        </Button>
    )
}
