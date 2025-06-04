"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { User, ChevronDown, Settings, UserCircle, CreditCard, LogOut, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/authContext" // Importing useAuth for logout context

interface UserDropdownProps {
  userName?: string
  userEmail?: string
  userAvatar?: string
}

export function UserDropdown({
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatar = "/placeholder.svg",
}: UserDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Get the logout function from context
  const { logout } = useAuth()

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

  const handleLogout = () => {
    console.log("logging out")
    logout() // Call the logout function from context
    router.push("/login")
    setIsOpen(false)
  }

  const navigateTo = (path: string) => {
    router.push(path)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="ghost" className="flex items-center space-x-2" onClick={toggleDropdown}>
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarFallback className="rounded-lg">
            {(userName &&
              userName.toUpperCase()
                .split(" ")
                .map((n) => n[0])
                .join("")) || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-medium">{userName}</span>
          <span className="text-xs text-muted-foreground">{userEmail}</span>
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-black border border-zinc-800 z-50">
          <div className="p-2 border-b border-zinc-800">
            <p className="text-sm font-semibold text-white">My Account</p>
          </div>

          <div className="p-1">
            <button
              className="w-full flex items-center px-2 py-1.5 text-sm text-white rounded-sm hover:bg-zinc-900"
              onClick={() => navigateTo("/dashboard/profile")}
            >
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </button>

            <button
              className="w-full flex items-center px-2 py-1.5 text-sm text-white rounded-sm hover:bg-zinc-900"
              onClick={() => navigateTo("/dashboard/settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </button>

            <button
              className="w-full flex items-center px-2 py-1.5 text-sm text-white rounded-sm hover:bg-zinc-900"
              onClick={() => navigateTo("/dashboard/billing")}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </button>
          </div>

          <div className="border-t border-zinc-800 my-1"></div>

          <div className="p-1">
            <button
              className="w-full flex items-center px-2 py-1.5 text-sm text-white rounded-sm hover:bg-zinc-900"
              onClick={() => navigateTo("/dashboard/help")}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </button>
          </div>

          <div className="border-t border-zinc-800 my-1"></div>

          <div className="p-1">
            <button
              className="w-full flex items-center px-2 py-1.5 text-sm text-white rounded-sm hover:bg-zinc-900"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
