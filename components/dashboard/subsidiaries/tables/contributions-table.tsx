'use client'

import { format } from 'date-fns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign } from "lucide-react"
import { Contribution } from '@/types/types'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

type Props = {
    contributions: Contribution[]
}

export default function ContributionsTable({ contributions }: { contributions: Contribution[] | undefined }) {
    const router = useRouter();
    
    if (!contributions || contributions.length === 0) {
        return (
        <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto mb-4 text-white/40" />
            <p className="text-white/60 mb-6">No contributions to display.</p>
        </div>
        )
    }

    const handleDetailsClick = (id: string) => {
        router.push(`/dashboard/partvest/campaigns/${id}`)
    }
    
    return (
        <div className="space-y-6">
        <div className="max-h-[400px] overflow-y-auto">
            <Table>
            <TableHeader>
                <TableRow className="bg-muted/50 dark:border-zinc-800">
                <TableHead>Date</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right w-[100px]">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {contributions.map((contribution) => (
                <TableRow key={contribution._id} className="dark:border-zinc-800">
                    <TableCell>{format(new Date(contribution.date), "MMM d, yyyy h:mm a")}</TableCell>
                    <TableCell>{contribution.frequency === 1 ? "One-time" : `${contribution.frequency}x`}</TableCell>
                    <TableCell className="font-semibold text-emerald-400">${contribution.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                        <Button
                        size="sm"
                        variant="link"
                        onClick={() => handleDetailsClick(contribution.campaignId)}
                        >
                        Details
                        </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>

        {/* Summary section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 bg-transparent">
                <Users className="h-5 w-5 text-blue-400" />
                <div className='bg-transparent'>
                <p className="text-sm text-white/60">Total Contributions</p>
                <p className="text-xl font-semibold">{contributions.length}</p>
                </div>
            </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 bg-transparent">
                <DollarSign className="h-5 w-5 text-emerald-400" />
                <div className="bg-transparent">
                <p className="text-sm text-white/60">Total Amount</p>
                <p className="text-xl font-semibold">
                    ${contributions.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}
                </p>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}
