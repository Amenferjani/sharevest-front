import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Company } from "@/types/types";
import { AlertTriangle, RefreshCw, Building2, Plus, Edit, Eye, Calendar } from "lucide-react"
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";


export const CompanyList =({
    companies,
    isLoading,
    isError,
    refetch,
}: {
    companies: Company[] | undefined;
    isLoading: boolean;
    isError: boolean | null;
    refetch: () => void;
}) => {
    if (isError) {
        return (
            <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex-shrink-0">
                        <AlertTriangle className="h-8 w-8 text-destructive" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-destructive mb-1">Failed to load companies</h3>
                        <p className="text-sm text-muted-foreground">
                            There was an error loading your companies. Please try again.
                        </p>
                    </div>
                    <Button onClick={refetch} variant="outline" className="flex-shrink-0">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Retry
                    </Button>
                </CardContent>
            </Card>
        )
    }

    if (isLoading) {
        return (
            <div className="space-y-3 overflow-auto h-72 pr-2">
                {[...Array(3)].map((_, idx) => (
                    <Card key={idx} className="transition-all duration-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-3 flex-1">
                                    <div className="space-y-2">
                                        <div className="h-5 w-40 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
                                        <div className="h-4 w-24 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
                                    </div>
                                    <div className="h-6 w-16 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-full animate-pulse" />
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <div className="h-8 w-8 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
                                    <div className="h-8 w-8 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    // If we have data but it's an empty array
    if (companies && companies.length === 0) {
        return (
            <Card className="border-dashed border-2 border-muted-foreground/25">
                <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
                    <div className="rounded-full bg-muted/50 p-4 mb-4">
                        <Building2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No companies yet</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm">
                        Get started by adding your first company to manage events and track investors.
                    </p>
                    <Link href="/company-rep/companies">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Your First Company
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-3 overflow-auto h-72 pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            {companies?.map((company, index) => (
                <Card
                    key={company.id}
                    className="group w-[98%] mx-auto hover:shadow-md transition-all duration-200 hover:scale-[1.02] border-l-4 border-l-primary/20 hover:border-l-primary/60"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2 flex-1 min-w-0">
                                <div className="space-y-1">
                                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                                        {company.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground font-medium">{company.industry}</p>
                                </div>
                                <Badge
                                    variant={company.status === "active" ? "default" : "destructive"}
                                    className={`text-xs font-medium ${company.status === "active"
                                            ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                                            : "bg-gradient-to-r from-red-500 to-rose-500"
                                        } transition-all duration-200`}
                                >
                                    <div
                                        className={`w-2 h-2 rounded-full mr-1 ${company.status === "active" ? "bg-white/80" : "bg-white/80"
                                            }`}
                                    />
                                    {company.status}
                                </Badge>
                            </div>
                            <div className="flex gap-2 ml-4 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                                <Link href={`/company-rep/companies/${company.id}`}>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href={`/company-rep/events?companyId=${company.id}`}>
                                    <Button variant="outline" size="sm">
                                        <Calendar className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href={`/company-rep/investors?companyId=${company.id}`}>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 hover:scale-105"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}