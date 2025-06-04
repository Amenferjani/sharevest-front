import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, Filter } from "lucide-react"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "info" | "success" | "warning" | "error"
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Portfolio Update",
    description: "Your portfolio has increased by 2.5% today.",
    time: "10 minutes ago",
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "New Investment Opportunity",
    description: "Check out the new Green Energy ETF opportunity.",
    time: "1 hour ago",
    read: false,
    type: "info",
  },
  {
    id: "3",
    title: "Market Alert",
    description: "Unusual market volatility detected in your watched sectors.",
    time: "3 hours ago",
    read: false,
    type: "warning",
  },
  {
    id: "4",
    title: "Dividend Payment",
    description: "You received a dividend payment of $250.75.",
    time: "Yesterday",
    read: true,
    type: "success",
  },
  {
    id: "5",
    title: "Account Security",
    description: "Please verify your account settings.",
    time: "2 days ago",
    read: true,
    type: "info",
  },
  {
    id: "6",
    title: "New Feature Available",
    description: "Try our new portfolio analysis tool.",
    time: "3 days ago",
    read: true,
    type: "info",
  },
  {
    id: "7",
    title: "Investment Matured",
    description: "Your bond investment has matured. Principal amount: $10,000.",
    time: "1 week ago",
    read: true,
    type: "success",
  },
  {
    id: "8",
    title: "Risk Assessment Update",
    description: "Your portfolio risk score has been updated to 65/100.",
    time: "1 week ago",
    read: true,
    type: "info",
  },
]

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with important alerts and information</p>
        </div>
        <Tabs defaultValue="all" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="rounded-full px-3 py-1">
            <Bell className="h-3 w-3 mr-1" />
            {notifications.filter((n) => !n.read).length} unread
          </Badge>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Check className="h-4 w-4 mr-2" />
          Mark all as read
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>Your latest updates and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  !notification.read ? "bg-zinc-900 border-zinc-800" : "bg-black border-zinc-800"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`h-2 w-2 mt-2 rounded-full ${
                      notification.type === "success"
                        ? "bg-emerald-500"
                        : notification.type === "warning"
                          ? "bg-amber-500"
                          : notification.type === "error"
                            ? "bg-red-500"
                            : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-white">{notification.title}</h3>
                      <span className="text-xs text-zinc-400">{notification.time}</span>
                    </div>
                    <p className="text-sm text-zinc-400 mt-1">{notification.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  )
}
