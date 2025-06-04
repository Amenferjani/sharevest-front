"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Users, LayoutDashboard, Settings, HelpCircle, FileText, BarChart2, MessageSquare, Shield } from "lucide-react"

interface AdminSidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "User Management",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Content Management",
    href: "/admin/content",
    icon: FileText,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart2,
  },
  {
    name: "Support Tickets",
    href: "/admin/support",
    icon: MessageSquare,
  },
  {
    name: "Security",
    href: "/admin/security",
    icon: Shield,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-black transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">SV</span>
            </div>
            <span className="text-xl font-bold text-white">Admin Panel</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                  item.href === "/admin" ? "text-white bg-zinc-900" : "text-white hover:bg-zinc-900",
                )}
              >
                <item.icon className="mr-3 h-5 w-5 text-white" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-zinc-800">
          <Link
            href="/admin/help"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-white hover:bg-zinc-900"
          >
            <HelpCircle className="mr-3 h-5 w-5 text-white" />
            Help & Documentation
          </Link>
        </div>
      </div>
    </div>
  )
}
