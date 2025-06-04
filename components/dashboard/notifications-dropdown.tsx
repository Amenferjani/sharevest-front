"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "info" | "success" | "warning" | "error"
}

const initialNotifications: Notification[] = [
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
]

export function NotificationsDropdown() {
  const [notifications, setNotifications] = React.useState<Notification[]>(initialNotifications)
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const router = useRouter()

  const unreadCount = notifications.filter((notification) => !notification.read).length

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const viewAllNotifications = () => {
    router.push("/dashboard/notifications")
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="ghost" size="icon" className="relative" onClick={toggleDropdown}>
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white border-0">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-black border border-zinc-800 z-50">
          <div className="p-2 flex items-center justify-between border-b border-zinc-800">
            <span className="font-semibold text-white">Notifications</span>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs text-white hover:bg-zinc-800"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>

          <div className="max-h-[300px] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 cursor-pointer hover:bg-zinc-900 ${!notification.read ? "bg-zinc-900" : ""}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-2">
                  <div
                    className={`h-2 w-2 mt-1.5 rounded-full ${
                      notification.type === "success"
                        ? "bg-emerald-500"
                        : notification.type === "warning"
                          ? "bg-amber-500"
                          : notification.type === "error"
                            ? "bg-red-500"
                            : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-white">{notification.title}</p>
                    <p className="text-xs text-zinc-400">{notification.description}</p>
                    <p className="text-xs text-zinc-500">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-zinc-800">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-white hover:bg-zinc-800"
              onClick={viewAllNotifications}
            >
              View all notifications
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
