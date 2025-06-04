import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus, Settings, FileText, AlertTriangle, CheckCircle, User } from "lucide-react"

interface Activity {
  id: string
  user: {
    name: string
    email: string
    avatar?: string
  }
  action: string
  target: string
  timestamp: string
  type: "user" | "system" | "content" | "security" | "support"
}

const activities: Activity[] = [
  {
    id: "1",
    user: {
      name: "Admin User",
      email: "admin@sharevest.io",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "created",
    target: "new user account",
    timestamp: "10 minutes ago",
    type: "user",
  },
  {
    id: "2",
    user: {
      name: "System",
      email: "system@sharevest.io",
    },
    action: "detected",
    target: "unusual login attempt",
    timestamp: "1 hour ago",
    type: "security",
  },
  {
    id: "3",
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "updated",
    target: "landing page content",
    timestamp: "3 hours ago",
    type: "content",
  },
  {
    id: "4",
    user: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "submitted",
    target: "support ticket #1234",
    timestamp: "5 hours ago",
    type: "support",
  },
  {
    id: "5",
    user: {
      name: "Admin User",
      email: "admin@sharevest.io",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "modified",
    target: "system settings",
    timestamp: "1 day ago",
    type: "system",
  },
]

export default function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4 py-3 border-b border-gray-100 last:border-0">
          <div
            className={`p-2 rounded-full ${
              activity.type === "user"
                ? "bg-blue-100 text-blue-600"
                : activity.type === "system"
                  ? "bg-purple-100 text-purple-600"
                  : activity.type === "content"
                    ? "bg-green-100 text-green-600"
                    : activity.type === "security"
                      ? "bg-red-100 text-red-600"
                      : "bg-orange-100 text-orange-600"
            }`}
          >
            {activity.type === "user" && <UserPlus className="h-4 w-4" />}
            {activity.type === "system" && <Settings className="h-4 w-4" />}
            {activity.type === "content" && <FileText className="h-4 w-4" />}
            {activity.type === "security" && <AlertTriangle className="h-4 w-4" />}
            {activity.type === "support" && <CheckCircle className="h-4 w-4" />}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{activity.user.name}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.timestamp}</span>
            </div>
            <p className="text-sm text-gray-700">
              {activity.action} {activity.target}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
