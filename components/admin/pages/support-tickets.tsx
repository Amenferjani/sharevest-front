"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  MoreHorizontal,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  HelpCircle,
} from "lucide-react"

const tickets = [
  {
    id: "TCKT-1234",
    subject: "Cannot access my portfolio",
    status: "Open",
    priority: "High",
    category: "Account",
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg",
    },
    created: "2 hours ago",
    lastUpdate: "30 minutes ago",
    responses: 2,
  },
  {
    id: "TCKT-1235",
    subject: "Error when trying to invest",
    status: "In Progress",
    priority: "Medium",
    category: "Investment",
    user: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "/placeholder.svg",
    },
    created: "5 hours ago",
    lastUpdate: "1 hour ago",
    responses: 3,
  },
  {
    id: "TCKT-1236",
    subject: "Need help understanding reports",
    status: "Open",
    priority: "Low",
    category: "Report",
    user: {
      name: "Michael Brown",
      email: "michael@example.com",
      avatar: "/placeholder.svg",
    },
    created: "1 day ago",
    lastUpdate: "6 hours ago",
    responses: 1,
  },
  {
    id: "TCKT-1237",
    subject: "Payment not processing",
    status: "Open",
    priority: "High",
    category: "Payment",
    user: {
      name: "Emily Wilson",
      email: "emily@example.com",
      avatar: "/placeholder.svg",
    },
    created: "1 day ago",
    lastUpdate: "8 hours ago",
    responses: 0,
  },
  {
    id: "TCKT-1238",
    subject: "How to transfer funds between accounts",
    status: "In Progress",
    priority: "Medium",
    category: "Transfer",
    user: {
      name: "David Martinez",
      email: "david@example.com",
      avatar: "/placeholder.svg",
    },
    created: "2 days ago",
    lastUpdate: "1 day ago",
    responses: 4,
  },
  {
    id: "TCKT-1239",
    subject: "Request for account statement",
    status: "Resolved",
    priority: "Low",
    category: "Document",
    user: {
      name: "Jessica Lee",
      email: "jessica@example.com",
      avatar: "/placeholder.svg",
    },
    created: "3 days ago",
    lastUpdate: "2 days ago",
    responses: 2,
  },
]

export default function SupportTickets() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground">Manage and respond to customer support requests</p>
        </div>
        <Tabs defaultValue="all" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Tickets</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+5</span> from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">50%</span> of total tickets
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-500">33%</span> of total tickets
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">17%</span> of total tickets
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
          <CardDescription>View and manage customer support tickets</CardDescription>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tickets..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Button className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700">
              <MessageSquare className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead className="w-[300px]">Subject</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead>Responses</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
                    <TableCell className="font-medium">{ticket.subject}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={ticket.user.avatar || "/placeholder.svg"} alt={ticket.user.name} />
                          <AvatarFallback>
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="whitespace-nowrap">{ticket.user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          ticket.status === "Open"
                            ? "border-red-200 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : ticket.status === "In Progress"
                              ? "border-amber-200 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                              : "border-emerald-200 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                        }
                      >
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          ticket.priority === "High"
                            ? "border-red-200 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : ticket.priority === "Medium"
                              ? "border-amber-200 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                              : "border-blue-200 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        }
                      >
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{ticket.lastUpdate}</TableCell>
                    <TableCell>{ticket.responses}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Assign Ticket</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Reply</DropdownMenuItem>
                          <DropdownMenuItem>
                            {ticket.status === "Open"
                              ? "Mark In Progress"
                              : ticket.status === "In Progress"
                                ? "Resolve Ticket"
                                : "Reopen Ticket"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
