"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  BarChart2,
  Shield,
  Cpu,
  TrendingUp,
  Users,
  Building,
  Handshake,
  Database,
  Home,
  PieChart,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

interface SubsidiaryItem {
  name: string
  href: string
  icon: React.ElementType
  color: string
}

const subsidiaries: SubsidiaryItem[] = [
  {
    name: "AssetVest",
    href: "/dashboard/assetvest",
    icon: BarChart2,
    color: "text-blue-400",
  },
  {
    name: "RiskVest",
    href: "/dashboard/riskvest",
    icon: Shield,
    color: "text-red-400",
  },
  {
    name: "QuantumVest",
    href: "/dashboard/quantumvest",
    icon: Cpu,
    color: "text-purple-400",
  },
  {
    name: "HedgeVest",
    href: "/dashboard/hedgevest",
    icon: TrendingUp,
    color: "text-green-400",
  },
  {
    name: "PartVest",
    href: "/dashboard/partvest",
    icon: Users,
    color: "text-orange-400",
  },
  {
    name: "PrivateVest",
    href: "/dashboard/privatevest",
    icon: Building,
    color: "text-indigo-400",
  },
  {
    name: "RelVest",
    href: "/dashboard/relvest",
    icon: Handshake,
    color: "text-pink-400",
  },
]

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    subsidiaries: true,
  })
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <>
      {/* Close button - visible when sidebar is open */}
      <button
        onClick={() => setIsOpen(false)}
        className={cn(
          "fixed top-4 z-50 p-1 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          isMobile ? "left-56" : "left-60",
        )}
        aria-label="Close sidebar"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Open button - visible when sidebar is closed */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed top-4 left-4 z-50 p-2 rounded-md bg-zinc-800 text-white hover:bg-zinc-700 transition-opacity duration-300",
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay for mobile - only visible when sidebar is open on mobile */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsOpen(false)} />
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-black border-r border-zinc-800 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-zinc-800">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">SV</span>
              </div>
              <span className="text-xl font-bold text-white">ShareVest</span>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-4 space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-white hover:bg-zinc-900"
              >
                <Home className="mr-3 h-5 w-5 text-white" />
                Dashboard
              </Link>

              <div className="pt-2">
                <button
                  onClick={() => toggleSection("subsidiaries")}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-zinc-900"
                >
                  <div className="flex items-center">
                    <TrendingUp className="mr-3 h-5 w-5 text-white" />
                    Subsidiaries
                  </div>
                  {expandedSections.subsidiaries ? (
                    <ChevronDown className="h-4 w-4 text-white" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-white" />
                  )}
                </button>

                {expandedSections.subsidiaries && (
                  <div className="mt-1 pl-10 space-y-1">
                    {subsidiaries.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-3 py-2 text-sm rounded-md text-white hover:bg-zinc-900"
                      >
                        <item.icon className={cn("mr-3 h-4 w-4", item.color)} />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="p-4 border-t border-zinc-800">
            <nav className="space-y-1">
              <Link
                href="/dashboard/settings"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-white hover:bg-zinc-900"
              >
                <Settings className="mr-3 h-5 w-5 text-white" />
                Settings
              </Link>
              <Link
                href="/dashboard/help"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-white hover:bg-zinc-900"
              >
                <HelpCircle className="mr-3 h-5 w-5 text-white" />
                Help & Support
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
