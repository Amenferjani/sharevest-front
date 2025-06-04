"use client"

import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NotificationsDropdown } from "@/components/dashboard/notifications-dropdown"
import { UserDropdown } from "@/components/dashboard/user-dropdown"
import { useAuth } from "@/context/authContext"

interface TopNavProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
  onLogout: () => void
}

export default function TopNav({ isSidebarOpen, toggleSidebar, onLogout }: TopNavProps) {
  const { user } = useAuth();
  return (
    <header className="bg-black border-b border-zinc-800 h-16">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden mr-2">
            <Menu className="h-5 w-5" />
          </Button>

          {/* <div className="hidden md:flex items-center ml-4 relative">
            <Search className="h-4 w-4 absolute left-3 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 w-64 h-9 bg-zinc-900 border-zinc-800 focus:bg-zinc-900" />
          </div> */}
        </div>

        <div className="flex items-center space-x-3">
          <NotificationsDropdown />
          <UserDropdown userName={user?.username} userEmail={user?.email} userAvatar="/profile.jpg" />
        </div>
      </div>
    </header>
  )
}
