"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Menu, X } from "lucide-react"
import { NotificationsDropdown } from "@/components/dashboard/notifications-dropdown"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-league-spartan ${
        isScrolled ? "bg-black shadow-md py-2" : "bg-black bg-opacity-50 py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          ShareVest
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <button onClick={() => scrollToSection("home")} className="text-gray-300 hover:text-white">
            Home
          </button>
          <button onClick={() => scrollToSection("services")} className="text-gray-300 hover:text-white">
            Services
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-gray-300 hover:text-white">
              Subsidiaries <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black border-zinc-800">
              <DropdownMenuItem className="text-white hover:bg-zinc-900">AssetVest</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-zinc-900">RiskVest</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-zinc-900">QuantumVest</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-zinc-900">HedgeVest</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-zinc-900">PartVest</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-zinc-900">PrivateVest</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-zinc-900">RelVest</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button onClick={() => scrollToSection("methodology")} className="text-gray-300 hover:text-white">
            Methodology
          </button>
          <button onClick={() => scrollToSection("values")} className="text-gray-300 hover:text-white">
            Values
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-gray-300 hover:text-white">
              Our Ventures <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black border-zinc-800">
              <DropdownMenuItem className="text-white hover:bg-zinc-900">ShareVest Realty</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-zinc-900">ShareVest Terra</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button onClick={() => scrollToSection("growthfunds")} className="text-gray-300 hover:text-white">
            GrowthFunds
          </button>
          <button onClick={() => scrollToSection("contact")} className="text-gray-300 hover:text-white">
            Contact Us
          </button>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <NotificationsDropdown />
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Invest Now</Button>
          <Link href="/login" className="text-gray-300 hover:text-white font-medium">
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-2">
          <NotificationsDropdown />
          <button className="text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black shadow-lg absolute top-full left-0 right-0 p-4">
          <div className="flex flex-col space-y-3">
            <button onClick={() => scrollToSection("home")} className="text-gray-300 hover:text-white py-2">
              Home
            </button>
            <button onClick={() => scrollToSection("services")} className="text-gray-300 hover:text-white py-2">
              Services
            </button>
            <button onClick={() => scrollToSection("subsidiaries")} className="text-gray-300 hover:text-white py-2">
              Subsidiaries
            </button>
            <button onClick={() => scrollToSection("methodology")} className="text-gray-300 hover:text-white py-2">
              Methodology
            </button>
            <button onClick={() => scrollToSection("values")} className="text-gray-300 hover:text-white py-2">
              Values
            </button>
            <button onClick={() => scrollToSection("ventures")} className="text-gray-300 hover:text-white py-2">
              Our Ventures
            </button>
            <button onClick={() => scrollToSection("growthfunds")} className="text-gray-300 hover:text-white py-2">
              GrowthFunds
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-gray-300 hover:text-white py-2">
              Contact Us
            </button>
            <div className="pt-2 flex flex-col space-y-3">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">Invest Now</Button>
              <Link href="/login" className="text-center text-gray-300 hover:text-white font-medium py-2">
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
