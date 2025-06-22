"use client"

import {
    Card, CardHeader, CardContent, CardTitle,
} from "@/components/ui/card"
import { Users, Building2, Calendar, Mail, Phone, TrendingUp, ArrowLeft, Search, Filter } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getInvestorsByCompany } from "@/services/rel-vest/service"
import { useAuth } from "@/context/authContext"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// Enhanced skeleton loader
function InvestorCardSkeleton() {
    return (
        <Card className="animate-pulse">
            <CardContent className="py-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="space-y-1">
                            <div className="h-3 w-16 bg-muted rounded"></div>
                            <div className="h-4 w-24 bg-muted rounded"></div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

// Enhanced status badge with better styling
function StatusBadge({ status }: { status: string }) {
    const base = "text-xs font-semibold px-2.5 py-1 rounded-full capitalize border"
    const map: Record<string, string> = {
        active: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
        inactive: "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800",
        pending: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800",
        interested: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
    }
    return (
        <span className={`${base} ${map[status.toLowerCase()] || "bg-muted text-muted-foreground border-border"}`}>
            {status}
        </span>
    )
}

export default function InvestorManagementPage() {
    const { user } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const companyId = searchParams.get("companyId")

    const { data: investorsData, isLoading } = useQuery({
        queryKey: ["investors", companyId],
        queryFn: () => getInvestorsByCompany(companyId!),
        enabled: !!user && !!companyId,
        staleTime: 24 * 60 * 60 * 1000,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })

    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("")

    const filteredInvestors = investorsData?.filter(inv => {
        const matchesName = inv.name.toLowerCase().includes(search.toLowerCase())
        const matchesEmail = inv.email.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = statusFilter ? inv.status === statusFilter : true
        return (matchesName || matchesEmail) && matchesStatus
    })

    const totalInvestors = investorsData?.length || 0
    const activeInvestors = investorsData?.filter(inv => inv.status?.toLowerCase() === 'active').length || 0
    const filteredCount = filteredInvestors?.length || 0

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto p-6 space-y-8">
                {/* Header with stats */}
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <Button onClick={() => router.back()} variant="outline" size="sm" className="shrink-0">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">Investor Management</h1>
                                <p className="text-muted-foreground">
                                    {isLoading ? "Loading..." : `${filteredCount} of ${totalInvestors} investors`}
                                </p>
                            </div>
                        </div>

                        {/* Quick stats */}
                        {!isLoading && investorsData && (
                            <div className="flex gap-6 text-sm">
                                <div className="text-center">
                                    <div className="font-semibold text-lg">{totalInvestors}</div>
                                    <div className="text-muted-foreground">Total</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold text-lg text-green-600">{activeInvestors}</div>
                                    <div className="text-muted-foreground">Active</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Enhanced filters */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="pl-10 pr-8 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent appearance-none cursor-pointer min-w-[140px]"
                            >
                                <option value="">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="pending">Pending</option>
                                <option value="interested">Interested</option>
                            </select>
                        </div>
                        {(search || statusFilter) && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setSearch("")
                                    setStatusFilter("")
                                }}
                                className="shrink-0"
                            >
                                Clear Filters
                            </Button>
                        )}
                    </div>
                </div>

                {/* Enhanced table header */}
                {!isLoading && filteredInvestors && filteredInvestors.length > 0 && (
                    <div className="hidden lg:block">
                        <Card className="bg-muted/50">
                            <CardContent className="py-3">
                                <div className="grid grid-cols-4 gap-x-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    <div>Name & Contact</div>
                                    <div>Status & Interest</div>
                                    <div>Phone</div>
                                    <div>Activity</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Enhanced investor list */}
                {isLoading ? (
                    <div className="space-y-4">
                        {[...Array(6)].map((_, i) => <InvestorCardSkeleton key={i} />)}
                    </div>
                ) : filteredInvestors && filteredInvestors.length > 0 ? (
                    <div className="space-y-3">
                        {filteredInvestors.map(inv => (
                            <Card key={inv.id} className="hover:shadow-md transition-shadow duration-200 border-l-4 border-l-primary/20 hover:border-l-primary/60">
                                <CardContent className="py-4">
                                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-4 gap-x-6">
                                        {/* Name & Contact */}
                                        <div className="space-y-2">
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wide lg:hidden">Name & Contact</p>
                                                <p className="font-semibold text-foreground">{inv.name}</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Mail className="h-3 w-3" />
                                                <span className="truncate">{inv.email}</span>
                                            </div>
                                        </div>

                                        {/* Status & Interest */}
                                        <div className="space-y-2">
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wide lg:hidden">Status & Interest</p>
                                                <StatusBadge status={inv.status} />
                                            </div>
                                            {inv.investmentInterest && (
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <TrendingUp className="h-3 w-3" />
                                                    <span className="truncate">{inv.investmentInterest}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wide lg:hidden">Phone</p>
                                            {inv.phoneNumber ? (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Phone className="h-3 w-3 text-muted-foreground" />
                                                    <span>{inv.phoneNumber}</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-muted-foreground">—</span>
                                            )}
                                        </div>

                                        {/* Activity */}
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wide lg:hidden">Activity</p>
                                            <div className="flex gap-4 text-sm">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3 text-blue-500" />
                                                    <span className="font-medium">{inv.events?.length ?? 0}</span>
                                                    <span className="text-muted-foreground">events</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Building2 className="h-3 w-3 text-green-500" />
                                                    <span className="font-medium">{inv.companies?.length ?? 0}</span>
                                                    <span className="text-muted-foreground">companies</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="border-dashed">
                        <CardContent className="py-16 text-center">
                            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                <Users className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="font-semibold mb-2">No investors found</h3>
                            <p className="text-muted-foreground mb-4">
                                {search || statusFilter
                                    ? "Try adjusting your search or filter criteria."
                                    : "No investors have been added to this company yet."
                                }
                            </p>
                            {(search || statusFilter) && (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearch("")
                                        setStatusFilter("")
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}