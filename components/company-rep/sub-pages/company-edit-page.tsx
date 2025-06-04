"use client"

import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteCompany, getCompanyDetails, updateCompany } from "@/services/rel-vest/service"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Company } from "@/types/types"
import isEqual from "lodash.isequal";
import { formatDate } from "@/lib/utils"

interface CompanyEditPageProps {
    companyId: string
}

export default function CompanyEditPage({ companyId }: CompanyEditPageProps) {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = React.useState(false)
    const [saving, setSaving] = useState(false)
    const [isChanged, setIsChanged] = useState(false);
    const [formData, setFormData] = useState<Company>()
    const router = useRouter()

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
        data: companyData,
        isLoading: companyLoading,
        refetch: companyRefetch,
        isFetched: companyFetched,
        error: companyError,
    } = useQuery({
        queryKey: ["company", companyId],
        queryFn: () => getCompanyDetails(companyId),
        enabled: typeof window !== "undefined" && !!companyId,
        staleTime: 24 * 60 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["companies"] });
            router.push("/company-rep/companies");
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateCompany,
        onSuccess: () => {
            companyRefetch();
        },
    });

    const handleFieldChange = <K extends keyof Company>(field: K, value: Company[K]) => {
        if (!formData || !companyData) return

        const updated = { ...formData, [field]: value }
        setFormData(updated)

        // compare updated to original
        const dirty = !isEqual(updated, companyData)
        setIsChanged(dirty)
    }

    useEffect(() => {
        if (companyFetched && companyData) {
            setFormData(companyData);
            setIsChanged(false);
        }
    }, [companyFetched, companyData]);

    const handleDelete = () => {
        setIsOpen(true)   // open the Radix AlertDialog
    }
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData || !companyData) return
        setSaving(true)
        updateMutation.mutateAsync({id : formData.id!, companyDto : formData}, {
            onSettled: () => {
                setSaving(false);
            },
        } );
        setIsChanged(false)
        setSaving(false)
    }
    const confirmDelete = async () => {
        // if (!pendingId) return
        if (!companyFetched) return
        deleteMutation.mutate(companyData?.id!)
        setIsOpen(false)
    }


    if (companyLoading) {
        return (
            <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link href="/company-rep/company">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Company
                        </Button>
                    </Link>
                    <div className="space-y-2">
                        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {[...Array(2)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[...Array(4)].map((_, j) => (
                                        <div key={j} className="space-y-2">
                                            <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
                                            <div className="h-10 w-full bg-muted animate-pulse rounded" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if (!companyData) {
        return (
            <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link href="/company-rep/company">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Company
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardContent className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <h3 className="text-lg font-medium mb-2">Company not found</h3>
                            <p className="text-muted-foreground">The company you're looking for doesn't exist.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/company-rep/companies">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Company
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Edit Company</h1>
                        <p className="text-muted-foreground">Update company information and settings</p>
                    </div>
                </div>
                <Button variant="destructive"
                    onClick={handleDelete}
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Company
                </Button>
            </div>

            <form
                onSubmit={handleSave}
                className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>Company details and contact information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Company Name *</Label>
                                <Input
                                    id="name"
                                    value={formData?.name ?? ""}
                                    onChange={(e) => handleFieldChange("name", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="industry">Industry *</Label>
                                <Select
                                    value={formData?.industry ?? ""}
                                    onValueChange={(value) => handleFieldChange("industry", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={`Select industry`} />
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

                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={formData?.description ?? ""}
                                    onChange={(e) => handleFieldChange("description", e.target.value)}
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="headquarters">Headquarters</Label>
                                <Input
                                    id="headquarters"
                                    value={formData?.headquarters ?? ""}
                                    onChange={(e) => handleFieldChange("headquarters", e.target.value)}
                                    placeholder="City, State"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact & Settings</CardTitle>
                            <CardDescription>Contact information and company status</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="contactEmail">Contact Email *</Label>
                                <Input
                                    id="contactEmail"
                                    type="email"
                                    value={formData?.contactEmail ?? ""}
                                    onChange={(e) => handleFieldChange("contactEmail", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input
                                    id="phoneNumber"
                                    value={formData?.phoneNumber ?? ""}
                                    onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    value={formData?.website ?? ""}
                                    onChange={(e) => handleFieldChange("website", e.target.value)}
                                    placeholder="https://company.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData?.status ?? ""}
                                    onValueChange={(value) => handleFieldChange("status", value as "active" | "inactive")}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={`Select status`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Created:</span>
                                    <span>{(`${formatDate(companyData?.createdAt!)}`)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Last Updated:</span>
                                    <span>{(`${formatDate(companyData?.updatedAt!)}`)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Current Status:</span>
                                    <Badge variant={companyData?.status === "active" ? "default" : "destructive"}>{companyData?.status}</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={!isChanged || saving} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        {saving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Link href="/company-rep/companies">
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </Link>
                </div>
            </form>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogPortal>
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Delete “{companyData?.name || "this company"}”?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action <strong>cannot</strong> be undone. All data for{" "}
                                {companyData?.name || "the company"} will be permanently removed.
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
        </div>
    )
}
