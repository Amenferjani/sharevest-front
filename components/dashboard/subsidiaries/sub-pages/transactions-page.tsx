"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowUpRight, ArrowDownRight, ChevronDown, ChevronUp, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent } from "@/components/ui/tabs"

// Enum to match the entity
enum TransactionType {
    BUY = "buy",
    SELL = "sell",
}

// Sample transaction data


export default function TransactionsTabContent( {portfolioId , portfolioTransactions} : {portfolioId : string , portfolioTransactions:any[]}) {
    const [sortField, setSortField] = useState<string>("transactionDate")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
    const [filterType, setFilterType] = useState<string>("all")
    console.log(portfolioTransactions);
    const filteredTransactions = portfolioTransactions
        .filter((tx) => {
        const matchesType = filterType === "all" || tx.type.toLowerCase() === filterType.toLowerCase()

        return matchesType
        })
        .sort((a, b) => {
        if (sortField === "transactionDate") {
            return sortDirection === "asc"
            ? a.transactionDate.getTime() - b.transactionDate.getTime()
            : b.transactionDate.getTime() - a.transactionDate.getTime()
        }

        if (sortField === "asset") {
            return sortDirection === "asc"
            ? a.asset.name.localeCompare(b.asset.name)
            : b.asset.name.localeCompare(a.asset.name)
        }

        if (sortField === "portfolio") {
            return sortDirection === "asc"
            ? a.portfolio.name.localeCompare(b.portfolio.name)
            : b.portfolio.name.localeCompare(a.portfolio.name)
        }

        // For numeric fields
        const aValue = a[sortField as keyof typeof a] as number
        const bValue = b[sortField as keyof typeof b] as number

        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
        })

    // Toggle sort direction or change sort field
    const handleSort = (field: string) => {
        if (sortField === field) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
        setSortField(field)
        setSortDirection("desc") // Default to descending for new field
        }
    }

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        }).format(amount)
    }

    // Calculate total value
    const calculateTotal = (quantity: number, price: number) => {
        return formatCurrency(quantity * price)
    }

    return (
        <Tabs defaultValue="Transactions">
        <TabsContent value="Transactions" className="space-y-6 mt-0">
            <div className="flex flex-col space-y-4">
            {/* Search and filter controls */}
            <div className="flex  flex-col sm:flex-row gap-4 justify-between">
                

                <div className="flex gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-[130px] justify-between">
                        {filterType === "all" ? "All Types" : filterType === "buy" ? "Buy Only" : "Sell Only"}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setFilterType("all")}>All Types</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("buy")}>Buy Only</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("sell")}>Sell Only</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </div>

            {/* Transactions table */}
            <div className="rounded-md border">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[180px] cursor-pointer" onClick={() => handleSort("asset")}>
                        <div className="flex items-center">
                        Asset
                        {sortField === "asset" &&
                            (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("portfolio")}>
                        <div className="flex items-center">
                        Portfolio
                        {sortField === "portfolio" &&
                            (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>
                        <div className="flex items-center">
                        Type
                        {sortField === "type" &&
                            (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                    </TableHead>
                    <TableHead className="text-right cursor-pointer" onClick={() => handleSort("quantity")}>
                        <div className="flex items-center justify-end">
                        Quantity
                        {sortField === "quantity" &&
                            (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                    </TableHead>
                    <TableHead className="text-right cursor-pointer" onClick={() => handleSort("price")}>
                        <div className="flex items-center justify-end">
                        Price
                        {sortField === "price" &&
                            (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                    </TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right cursor-pointer" onClick={() => handleSort("transactionDate")}>
                        <div className="flex items-center justify-end">
                        Date
                        {sortField === "transactionDate" &&
                            (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                    </TableHead>
                    <TableHead className="text-right cursor-pointer" onClick={() => handleSort("transactionRiskImpact")}>
                        <div className="flex items-center justify-end">
                        Risk Impact
                        {sortField === "transactionRiskImpact" &&
                            (sortDirection === "asc" ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                            <div className="flex flex-col">
                            <span>{transaction.asset.name}</span>
                            <span className="text-xs text-muted-foreground">{transaction.asset.symbol}</span>
                            </div>
                        </TableCell>
                        <TableCell>{transaction.portfolio.name}</TableCell>
                        <TableCell>
                            <Badge
                            variant="outline"
                            className={
                                transaction.type === TransactionType.BUY
                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                : "bg-red-500/10 text-red-500 border-red-500/20"
                            }
                            >
                            <div className="flex items-center gap-1">
                                {transaction.type === TransactionType.BUY ? (
                                <ArrowUpRight className="h-3.5 w-3.5" />
                                ) : (
                                <ArrowDownRight className="h-3.5 w-3.5" />
                                )}
                                {transaction.type.toUpperCase()}
                            </div>
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            {transaction.quantity}
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(transaction.price)}</TableCell>
                        <TableCell className="text-right font-medium">
                            {calculateTotal(transaction.quantity, transaction.price)}
                        </TableCell>
                        <TableCell className="text-right">
                            {format(transaction.transactionDate, "MMM d, yyyy HH:mm")}
                        </TableCell>
                        <TableCell className="text-right">
                            <Badge variant={transaction.transactionRiskImpact > 1 ? "destructive" : "secondary"}>
                            {Number(transaction.transactionRiskImpact.toFixed(2)) * 100} %
                            </Badge>
                        </TableCell>
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                        No transactions found.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </div>

            {/* Summary */}
            <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div>
                Showing {filteredTransactions.length} of {portfolioTransactions.length} transactions
                </div>
                <div>Last updated: {format(new Date(), "MMM d, yyyy HH:mm")}</div>
            </div>
            </div>
        </TabsContent>
    </Tabs>
    )
}
