"use client"

import type React from "react"

import { useState } from "react"
import AdminSidebar from "./admin-sidebar"
import AdminTopNav from "./admin-top-nav"
import { useRouter } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const router = useRouter()

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/")
  }

  return (
    <div className="flex h-screen bg-black">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden bg-black">
        <AdminTopNav
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-black text-white">{children}</main>
      </div>
    </div>
  )
}
