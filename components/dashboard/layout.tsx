"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Sidebar from "./sidebar"
import TopNav from "./top-nav"
import { useRouter } from "next/navigation"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  // Set initial sidebar state based on screen size and track if we're on mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      if (mobile) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    // Set initial state based on screen size
    handleResize()

    // Add event listener for window resize
    window.addEventListener("resize", handleResize)

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/")
  }

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content area that shifts when sidebar is open */}
      <div
        className={cn(
          "flex-1 flex flex-col bg-black transition-all duration-300 ease-in-out",
          // On mobile: overlay sidebar
          isMobile
            ? ""
            : // On desktop: shift content when sidebar is open
              isSidebarOpen
              ? "ml-64"
              : "ml-0",
        )}
      >
        <TopNav isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onLogout={handleLogout} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-black text-white">{children}</main>
      </div>
    </div>
  )
}
