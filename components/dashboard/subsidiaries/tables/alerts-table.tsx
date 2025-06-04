"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    Search,
    Trash2,
    ChevronDown,
    ChevronRight,
    Bell,
    MoreVertical,
    MessageSquare,
    Settings,
    Calendar,
    Shield,
    TrendingDown,
    TrendingUp,
    Zap,
    Activity,
    Loader2,
} from "lucide-react";
import { AlertType, ConditionType, MarketAlert } from "@/types/types";
import { deleteRiskAlert, updateRiskAlert } from "@/services/risk-vest/service";

interface AlertsTableProps {
    data: MarketAlert[];
    onRefetch: () => void;
}

export default function AlertsTable({
    data,
    onRefetch,
}: AlertsTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    // Mutation for toggling isActive
    const updateAlertMutation = useMutation({
        mutationFn:updateRiskAlert,
        onSuccess: () => {
            onRefetch();
        },
    });

    // Mutation for deleting
    const deleteAlertMutation = useMutation({
        mutationFn:  deleteRiskAlert,
        onSuccess: () => {
            onRefetch();
        },
    });

    const handleAlertUpdate = (alertId : string , isActive : boolean) => {
        updateAlertMutation.mutate({alertId , isActive})
    }

    const handleAlertDelete = (alertId : string ) => {
        deleteAlertMutation.mutate(alertId)
    }

    // Icon & color maps
    const alertIcons: Record<AlertType, any> = {
        [AlertType.RiskThreshold]: Shield,
        [AlertType.MarketDrop]: TrendingDown,
        [AlertType.PriceIncrease]: TrendingUp,
        [AlertType.PriceDecrease]: TrendingDown,
        [AlertType.VolatilitySpike]: Zap,
        [AlertType.FundingProgress]: Activity,
    };
    const alertColors: Record<AlertType, string> = {
        [AlertType.RiskThreshold]: "text-orange-600 bg-orange-50",
        [AlertType.MarketDrop]: "text-red-600 bg-red-50",
        [AlertType.PriceIncrease]: "text-green-600 bg-green-50",
        [AlertType.PriceDecrease]: "text-red-600 bg-red-50",
        [AlertType.VolatilitySpike]: "text-yellow-600 bg-yellow-50",
        [AlertType.FundingProgress]: "text-blue-600 bg-blue-50",
    };

    // Helpers
    function formatAlertType(t: AlertType) {
        const map: Record<AlertType, string> = {
            [AlertType.RiskThreshold]: "Risk Threshold",
            [AlertType.MarketDrop]: "Market Drop",
            [AlertType.PriceIncrease]: "Price Increase",
            [AlertType.PriceDecrease]: "Price Decrease",
            [AlertType.VolatilitySpike]: "Volatility Spike",
            [AlertType.FundingProgress]: "Funding Progress",
        };
        return map[t];
    }
    function formatConditionType(c?: ConditionType) {
        if (!c) return "";
        const map: Record<ConditionType, string> = {
            [ConditionType.GreaterThan]: "Greater Than",
            [ConditionType.LessThan]: "Less Than",
            [ConditionType.EqualTo]: "Equal To",
            [ConditionType.InRange]: "In Range",
            [ConditionType.OutOfRange]: "Out of Range",
        };
        return map[c];
    }
    function formatThreshold(th: number | [number, number]) {
        return Array.isArray(th) ? `${th[0]} - ${th[1]}` : String(th);
    }
    function getTarget(a: MarketAlert) {
        return a.assetSymbol || a.sector || a.market || "Portfolio";
    }

    const filtered = data.filter((a) =>
        [formatAlertType(a.alertType), a.message, a.assetSymbol, a.sector]
            .filter(Boolean)
            .some((str) => str!.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Search */}
            <Card>
                <CardContent className="p-3 sm:p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search alerts…"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Mobile */}
            <div className="block sm:hidden space-y-3">
                {filtered.map((alert) => {
                    const Icon = alertIcons[alert.alertType];
                    const color = alertColors[alert.alertType];
                    const isExpanded = expandedRows.has(alert._id!);
                    const isUpdating =
                        isLoading &&
                        updateAlertMutation.variables?.alertId === alert._id;
                    // const isDeleting =
                    //     deleteMutation.isLoading && deleteMutation.variables === alert._id;

                    return (
                        <Card key={alert._id} className="overflow-hidden">
                            <CardContent className="p-0">
                                <div
                                    className="p-4 cursor-pointer"
                                    onClick={() => {
                                        const next = new Set(expandedRows);
                                        next.has(alert._id!)
                                            ? next.delete(alert._id!)
                                            : next.add(alert._id!);
                                        setExpandedRows(next);
                                    }}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 flex items-start gap-3 min-w-0">
                                            <div
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-medium text-sm truncate">
                                                        {formatAlertType(alert.alertType)}
                                                    </h3>
                                                    <Badge
                                                        variant={alert.isActive ? "default" : "secondary"}
                                                        className="text-xs"
                                                    >
                                                        {alert.isActive ? "Active" : "Inactive"}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground mb-2">
                                                    Target: {getTarget(alert)} • Threshold:{" "}
                                                    {formatThreshold(alert.threshold)}
                                                </p>
                                                {alert.message && (
                                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                                        {alert.message.length > 80
                                                            ? `${alert.message.slice(0, 80)}…`
                                                            : alert.message}
                                                    </p>
                                                )}
                                                {alert.lastTriggeredAt && (
                                                    <p className="text-xs text-muted-foreground mt-2">
                                                        Last:{" "}
                                                        {new Date(alert.lastTriggeredAt).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="relative inline-flex">
                                                <Switch
                                                    checked={alert.isActive}
                                                    disabled={isUpdating}
                                                    onCheckedChange={() =>handleAlertUpdate(alert._id!, !alert.isActive)}
                                                />
                                                {isUpdating && (
                                                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    </span>
                                                )}
                                            </div>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger
                                                    asChild
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        className="text-red-600"
                                                        onClick={() => deleteAlertMutation.mutate(alert._id!)}
                                                    >
                                                        {isLoading &&
                                                            deleteAlertMutation.variables === alert._id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                        ) : (
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                        )}
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                            >
                                                {isExpanded ? (
                                                    <ChevronDown className="h-4 w-4" />
                                                ) : (
                                                    <ChevronRight className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="border-t bg-muted/20 p-4 space-y-4">
                                            {/* … mobile expanded details … */}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Desktop */}
            <Card className="hidden sm:block">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b">
                                    <TableHead className="w-12"></TableHead>
                                    <TableHead>Alert</TableHead>
                                    <TableHead>Target</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="hidden lg:table-cell">
                                        Last Triggered
                                    </TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filtered.map((alert) => {
                                    const Icon = alertIcons[alert.alertType];
                                    const color = alertColors[alert.alertType];
                                    const isExpanded = expandedRows.has(alert._id!);
                                    const isUpdating =
                                        isLoading &&
                                        updateAlertMutation.variables?.alertId === alert._id;
                                    const isDeleting =
                                        isLoading &&
                                        deleteAlertMutation.variables === alert._id;

                                    return (
                                        <React.Fragment key={alert._id}>
                                            <TableRow
                                                className="hover:bg-muted/50 cursor-pointer border-b"
                                                onClick={() => {
                                                    const next = new Set(expandedRows);
                                                    next.has(alert._id!)
                                                        ? next.delete(alert._id!)
                                                        : next.add(alert._id!);
                                                    setExpandedRows(next);
                                                }}
                                            >
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-6 w-6 p-0"
                                                    >
                                                        {isExpanded ? (
                                                            <ChevronDown className="h-4 w-4" />
                                                        ) : (
                                                            <ChevronRight className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}
                                                        >
                                                            <Icon className="h-5 w-5" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="font-medium">
                                                                {formatAlertType(alert.alertType)}
                                                            </div>
                                                            <div className="text-sm text-muted-foreground truncate">
                                                                {alert.message && alert.message.length > 50
                                                                    ? `${alert.message.slice(0, 50)}…`
                                                                    : alert.message || "No message"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="font-medium">
                                                        {getTarget(alert)}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Threshold: {formatThreshold(alert.threshold)}
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <Badge
                                                        variant={alert.isActive ? "default" : "secondary"}
                                                    >
                                                        {alert.isActive ? "Active" : "Inactive"}
                                                    </Badge>
                                                </TableCell>

                                                <TableCell className="hidden lg:table-cell">
                                                    {alert.lastTriggeredAt
                                                        ? new Date(alert.lastTriggeredAt).toLocaleDateString()
                                                        : "Never"}
                                                </TableCell>

                                                <TableCell
                                                    className="text-right"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <div className="inline-flex items-center gap-2">
                                                        <div className="relative inline-flex">
                                                            <Switch
                                                                checked={alert.isActive}
                                                                disabled={isUpdating}
                                                                onCheckedChange={() => handleAlertUpdate(alert._id!, !alert.isActive)}
                                                            />
                                                            {isUpdating && (
                                                                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                                </span>
                                                            )}
                                                        </div>

                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                            disabled={isDeleting}
                                                            onClick={() => handleAlertDelete(alert._id!)}
                                                        >
                                                            {isDeleting ? (
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                            ) : (
                                                                <Trash2 className="h-3 w-3 text-red-600" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>

                                            {isExpanded && (
                                                <TableRow className="bg-muted/20">
                                                    <TableCell colSpan={6} className="p-0">
                                                        <div className="p-6 space-y-4">
                                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center gap-2 text-sm font-medium">
                                                                        <MessageSquare className="h-4 w-4" />
                                                                        Alert Details
                                                                    </div>
                                                                    <div className="text-sm space-y-1">
                                                                        {alert.message && <p className="text-muted-foreground mb-2">{alert.message}</p>}
                                                                        {alert.condition && (
                                                                            <div>
                                                                                Condition:{" "}
                                                                                <span className="font-medium">{formatConditionType(alert.condition)}</span>
                                                                            </div>
                                                                        )}
                                                                        {alert.assetSymbol && (
                                                                            <div>
                                                                                Asset: <span className="font-medium">{alert.assetSymbol}</span>
                                                                            </div>
                                                                        )}
                                                                        {alert.sector && (
                                                                            <div>
                                                                                Sector: <span className="font-medium">{alert.sector}</span>
                                                                            </div>
                                                                        )}
                                                                        {alert.market && (
                                                                            <div>
                                                                                Market: <span className="font-medium">{alert.market}</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center gap-2 text-sm font-medium">
                                                                        <Settings className="h-4 w-4" />
                                                                        Configuration
                                                                    </div>
                                                                    <div className="text-sm space-y-1">
                                                                        <div>
                                                                            Channel: <span className="font-medium">{alert.notificationChannel}</span>
                                                                        </div>
                                                                        <div>
                                                                            Frequency:{" "}
                                                                            <span className="font-medium">{alert.alertFrequency || "immediate"}</span>
                                                                        </div>
                                                                        <div>
                                                                            Threshold: <span className="font-medium">{formatThreshold(alert.threshold)}</span>
                                                                        </div>
                                                                        <div>
                                                                            Created:{" "}
                                                                            <span className="font-medium">{new Date(alert.createdAt).toLocaleDateString()}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center gap-2 text-sm font-medium">
                                                                        <Calendar className="h-4 w-4" />
                                                                        Activity
                                                                    </div>
                                                                    <div className="text-sm space-y-1">
                                                                        <div>
                                                                            Status:{" "}
                                                                            <Badge variant={alert.isActive ? "default" : "secondary"} className="text-xs">
                                                                                {alert.isActive ? "Active" : "Inactive"}
                                                                            </Badge>
                                                                        </div>
                                                                        <div>
                                                                            Last Triggered:{" "}
                                                                            <span className="font-medium">
                                                                                {alert.lastTriggeredAt?.toLocaleDateString() || "Never"}
                                                                            </span>
                                                                        </div>
                                                                        {alert.triggeredBy && (
                                                                            <div>
                                                                                Triggered By: <span className="font-medium">{alert.triggeredBy}</span>
                                                                            </div>
                                                                        )}
                                                                        {alert.isManual && (
                                                                            <div>
                                                                                <Badge variant="outline" className="text-xs">
                                                                                    Manual Alert
                                                                                </Badge>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {filtered.length === 0 && (
                <Card>
                    <CardContent className="p-8 sm:p-12 text-center">
                        <Bell className="h-8 w-8 sm:h-12 sm:w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-base sm:text-lg font-medium mb-2">
                            No alerts found
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            Try adjusting your search terms or create a new alert.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
