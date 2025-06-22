"use client"

import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Building2, Plus, Edit, Trash2, Users, Calendar } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { addCompany, deleteCompany, getCompanies } from "@/services/rel-vest/service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useAuth } from "@/context/authContext"
import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { formatDate } from "@/lib/utils"

export default function CompanyManagementPage() {
    const { user } = useAuth()
    const [isOpen, setIsOpen] = React.useState(false)
    const [pendingId, setPendingId] = React.useState<string | null>(null)
    const [showCreateDialog, setShowCreateDialog] = useState(false)
    const [creating, setCreating] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        industry: "",
        description: "",
        headquarters: "",
        contactEmail: "",
        phoneNumber: "",
        website: "",
    })

    const industries = [
        "Technology",
        "Renewable Energy",
        "Healthcare",
        "Financial Technology",
        "Agriculture",
        "Education Technology",
        "Manufacturing",
        "Retail",
    ]

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
    const CompanyCreationMutation = useMutation({
        mutationFn: addCompany,
        onSuccess: (data) => {
            setShowCreateDialog(false);
            companiesRefetch();
        },
    });

    const deleteMutation = useMutation({
        mutationFn:deleteCompany ,
        onSuccess: () => {
            companiesRefetch()
        },
        onError: () => {
            companiesRefetch()
        }
    })

    const handleCreateCompany = (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);

        CompanyCreationMutation.mutate(formData, {
            onSettled: () => {
                setCreating(false);
            },
        });
    };

    const handleDeleteCompany = (id: string) => {
        setPendingId(id)  // stash which company was clicked
        setIsOpen(true)   // open the Radix AlertDialog
    }

    const confirmDelete = async () => {
        if (!pendingId) return
        deleteMutation.mutate(pendingId)
        console.log("deleting",pendingId)
        setIsOpen(false)
        setPendingId(null)
    }

    const pendingCompany = companiesData?.find((c) => c.id === pendingId)

    // const formatDate = (date: Date) => {
    //     return new Intl.DateTimeFormat("en-US", {
    //         month: "short",
    //         day: "numeric",
    //         year: "numeric",
    //     }).format(date)
    // }

    if (companiesLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/company-rep">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <div className="space-y-2">
                        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(2)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <div className="space-y-2">
                                    <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                                    <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-muted animate-pulse rounded" />
                                    <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/company-rep">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Company Management</h1>
                        <p className="text-muted-foreground">Manage your companies and their information</p>
                    </div>
                </div>

                <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Company
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Add New Company</DialogTitle>
                            <DialogDescription>Create a new company profile to manage events and investors</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateCompany} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Company Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                        placeholder="Enter company name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="industry">Industry *</Label>
                                    <Select
                                        value={formData.industry}
                                        onValueChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select industry" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {industries.map((industry) => (
                                                <SelectItem key={industry} value={industry}>
                                                    {industry}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                                    placeholder="Describe your company"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="headquarters">Headquarters</Label>
                                    <Input
                                        id="headquarters"
                                        value={formData.headquarters}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, headquarters: e.target.value }))}
                                        placeholder="City, State"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website">Website</Label>
                                    <Input
                                        id="website"
                                        value={formData.website}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                                        placeholder="https://company.com"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="contactEmail">Contact Email *</Label>
                                    <Input
                                        id="contactEmail"
                                        type="email"
                                        value={formData.contactEmail}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                                        placeholder="contact@company.com"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input
                                        id="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                                        placeholder="(555) 123-4567"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={creating} className="flex-1">
                                    {creating ? "Creating..." : "Create Company"}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                {companiesData?.map((company) => (
                    <Card key={company.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-lg">{company.name}</CardTitle>
                                    <Badge variant="outline">{company.industry}</Badge>
                                </div>
                                <Badge variant={company.status === "active" ? "default" : "destructive"}>{company.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground line-clamp-2">{company.description}</p>

                            <div className="space-y-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-3 w-3" />
                                    {company.headquarters}
                                </div>
                                <div>{company.contactEmail}</div>
                                <div>Created: {(`${formatDate(company?.createdAt!) }`)}</div>
                            </div>

                            <div className="flex gap-2">
                                <Link href={`/company-rep/companies/${company.id}`} className="flex-1">
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                </Link>
                                <Link href={`/company-rep/investors?companyId=${company.id}`}>
                                    <Button variant="outline" size="sm">
                                        <Users className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href={`/company-rep/events?companyId=${company.id}`}>
                                    <Button variant="outline" size="sm">
                                        <Calendar className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDeleteCompany(company.id!)}
                                    className="text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogPortal>
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Delete “{pendingCompany?.name || "this company"}”?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action <strong>cannot</strong> be undone. All data for{" "}
                                {pendingCompany?.name || "the company"} will be permanently removed.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmDelete}>
                                Yes, delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogPortal>
            </AlertDialog>

            {(!companiesLoading && companiesData?.length === 0) && (
                <Card>
                    <CardContent className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">No companies yet</h3>
                            <p className="text-muted-foreground mb-4">
                                Create your first company to start managing events and investors.
                            </p>
                            <Button onClick={() => setShowCreateDialog(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Company
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
