import Link from "next/link"
import { Linkedin, Twitter, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 font-league-spartan">ShareVest</h2>
            <p className="text-gray-400 max-w-md">
              ShareVest Holdings is a premier financial services company dedicated to empowering investors with
              innovative, data-driven solutions for sustainable wealth creation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#home" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#subsidiaries" className="text-gray-400 hover:text-white transition-colors">
                    Subsidiaries
                  </Link>
                </li>
                <li>
                  <Link href="#methodology" className="text-gray-400 hover:text-white transition-colors">
                    Methodology
                  </Link>
                </li>
                <li>
                  <Link href="#values" className="text-gray-400 hover:text-white transition-colors">
                    Values
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">More</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#ventures" className="text-gray-400 hover:text-white transition-colors">
                    Ventures
                  </Link>
                </li>
                <li>
                  <Link href="#growthfunds" className="text-gray-400 hover:text-white transition-colors">
                    GrowthFunds
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ShareVest Holdings. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
