'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Filter, Megaphone, Target } from "lucide-react"
import { Campaign } from "@/types/types"

type Props = {
  campaigns: (Campaign & { userContribution?: number })[]
  mode: "contributor" | "owner"
  onCreateCampaign: () => void
}

export default function CrowdfundingProjectsTable({
  campaigns,
  mode,
  onCreateCampaign, 
}: Props) {
  const router = useRouter();


  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")


  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(campaigns?.map(c => c.category)))
    return ["all", ...uniqueCategories]
  }, [campaigns])

  const filteredCampaigns = useMemo(() => {
    return campaigns?.filter(campaign => {
      const matchesCategory = categoryFilter === "all" || campaign.category === categoryFilter
      const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
      return matchesCategory && matchesStatus
    })
  }, [campaigns, categoryFilter, statusFilter])

    if (!campaigns || campaigns?.length === 0) {
    const isOwner = mode === "owner";

    return (
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-sm w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="relative mb-6 flex items-center justify-center">
              <div className="absolute">
                <Megaphone
                  size={48}
                  className="text-zinc-200 animate-pulse"
                  strokeWidth={1.5}
                />
              </div>
              <div className="absolute -right-4 -bottom-4">
                <Target
                  size={28}
                  className="text-zinc-300"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {isOwner ? (
                <>
                  <h3 className="text-xl font-medium text-zinc-800 mb-2 text-center">
                    No campaigns yet
                  </h3>
                  <p className="text-zinc-500 mb-6 text-center text-sm leading-relaxed">
                    Start your first campaign to reach potential investors and grow your business network.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-medium text-zinc-800 mb-2 text-center">
                    No campaigns available
                  </h3>
                  <p className="text-zinc-500 mb-6 text-center text-sm leading-relaxed">
                    There are currently no campaigns you can contribute to. Check back later or contact your campaign manager for updates.
                  </p>
                </>
              )}
            {isOwner ? (
              <button
                className="group w-full px-4 py-3 rounded-lg bg-green-700 text-white hover:bg-green-800 
                  transition-all duration-300 flex items-center justify-center space-x-2"
                onClick={onCreateCampaign}
              >
                <span>Create Campaign</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            ) : (
              <button
                className="group w-full px-4 py-3 rounded-lg  bg-green-700 text-white hover:bg-green-800
                  transition-all duration-300 flex items-center justify-center space-x-2"
                onClick={() => router.push('/dashboard/partvest/campaigns')}
              >
                <span>View Campaigns</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  const handleDetailsClick = (id: string) => {
    router.push(`/dashboard/partvest/campaigns/${id}`)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return "border-blue-200 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case 'completed':
        return "border-emerald-200 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
      case 'cancelled':
        return "border-zinc-200 bg-zinc-100 text-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-400"
      default:
        return ""
    }
  }

  if (!campaigns?.length) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        {mode === "owner"
          ? "You haven't created any campaigns yet."
          : "You haven't invested in any campaigns yet."}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between p-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Filter size={16} className="mr-2" />
          <span>Filters</span>
        </div>
        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3">
          <select 
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.filter(c => c !== "all").map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden space-y-3">
        {filteredCampaigns?.map((campaign) => (
          <div
            key={campaign._id}
            className="p-4 rounded-lg border dark:border-zinc-800 transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium dark:text-white line-clamp-1">{campaign.title}</h3>
              <Badge variant="outline" className={getStatusBadgeClass(campaign.status)}>
                {campaign.status}
              </Badge>
            </div>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>{campaign?.category}</span>
                <span>${campaign?.currentAmount}</span>
              </div>
              
              {mode === "contributor" && (
                <div className="text-muted-foreground">
                  Your contribution: ${(campaign.userContribution ?? 0).toLocaleString()}
                </div>
              )}
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{format(new Date(campaign.endDate), 'MMM d, yyyy')}</span>
                <span>{campaign.fundingProgress}% funded</span>
              </div>
            </div>

            <div className="mt-3 text-right">
              <Button
                size="sm"
                variant="link"
                onClick={() => handleDetailsClick(campaign._id)}
              >
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop/Table View */}
      <div className="hidden sm:block rounded-md border dark:border-zinc-800">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-zinc-800 bg-muted/50">
              <TableHead className="w-[35%]">Project</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Progress</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredCampaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No campaigns match the selected filters
                </TableCell>
              </TableRow>
            ) : (
              filteredCampaigns.map((campaign) => (
                <TableRow
                  key={campaign._id}
                  className="dark:border-zinc-800 transition-all"
                >
                  <TableCell>
                    <div className="font-medium dark:text-white line-clamp-1">{campaign.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(campaign.endDate), 'MMM d, yyyy')}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {campaign.category}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="font-medium">{campaign.fundingProgress}%</div>
                    <div className="text-sm text-muted-foreground">
                      ${campaign.currentAmount}
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <Badge variant="outline" className={getStatusBadgeClass(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="link"
                      onClick={() => handleDetailsClick(campaign._id)}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
