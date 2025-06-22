"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar, Users, Plus, TrendingUp, Eye, Edit } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getCompanies } from "@/services/rel-vest/service"
import { useAuth } from "@/context/authContext"
import Error from "@/components/ui/error"
import { Company } from "@/types/types"
import { CompanyList } from "./lists/companies-list"

// Mock API functions for Company Representative

export default function RepresentativeDashboard() {
    const { user } = useAuth()

    const {
        data: companiesData,
        isLoading: companiesLoading,
        refetch: companiesRefetch,
        isFetched: companiesFetched,
        error: companiesError,
    } = useQuery({
        queryKey: ["companies"],
        queryFn: getCompanies,
        enabled: !!user,
        staleTime: 24 * 60 * 60 * 1000,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })

    if (companiesError) return <Error/>
    if (companiesLoading || !companiesFetched ) {
        return (
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Company Dashboard</h1>
                        <p className="text-muted-foreground">Manage your companies, events, and investor relationships</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                                <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                            </CardHeader>
                            <CardContent>
                                <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
                                <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Company Dashboard</h1>
                    <p className="text-muted-foreground">Manage your companies, events, and investor relationships</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/company-rep/companies">
                        <Button>
                            <Building2 className="h-4 w-4 mr-2" />
                            Manage Companies
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">My Companies</CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{companiesData?.length}</div>
                        <p className="text-xs text-muted-foreground">Companies you manage</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{9}</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-emerald-500">{6}</span> upcoming
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Investors</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{2}</div>
                        <p className="text-xs text-muted-foreground">Following your companies</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Growth</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12%</div>
                        <p className="text-xs text-muted-foreground">Investor growth this month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>My Companies</CardTitle>
                            <Link href="/company-rep/companies">
                                <Button size="sm">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Company
                                </Button>
                            </Link>
                        </div>
                        <CardDescription>Companies you manage</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CompanyList
                            companies={companiesData}
                            isLoading={companiesLoading || !companiesFetched}
                            isError={!!companiesError}
                            refetch={companiesRefetch}
                        />
                        {/* <div className="space-y-4 overflow-auto h-72">
                            {companiesData?.map((company) => (
                                <div
                                    key={company.id}
                                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                                >
                                    <div className="space-y-1">
                                        <h4 className="font-medium">{company.name}</h4>
                                        <p className="text-sm text-muted-foreground">{company.industry}</p>
                                        <Badge variant={company.status === "active" ? "default" : "destructive"}>{company.status}</Badge>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={`/company-rep/companies/${company.id}`}>
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Link href={`/company-rep/investors?companyId=${company.id}`}>
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div> */}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
