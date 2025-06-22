import Link from 'next/link'
import { Linkedin, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* ShareVest Section */}
            <div>
                <h3 className="text-2xl font-bold mb-4">ShareVest</h3>
                <p className="text-gray-400 mb-6">
                Pioneering investment solutions for a sustainable future.
                </p>
                <div className="flex space-x-4">
                <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <Linkedin className="h-6 w-6" />
                </a>
                <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <Twitter className="h-6 w-6" />
                </a>
                <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <Facebook className="h-6 w-6" />
                </a>
                </div>
            </div>

            {/* Quick Links Section */}
            <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                <li>
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                    </Link>
                </li>
                <li>
                    <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                    Services
                    </Link>
                </li>
                <li>
                    <Link href="/methodology" className="text-gray-400 hover:text-white transition-colors">
                    Methodology
                    </Link>
                </li>
                <li>
                    <Link href="/values" className="text-gray-400 hover:text-white transition-colors">
                    Values
                    </Link>
                </li>
                </ul>
            </div>

            {/* Our Ventures Section */}
            <div>
                <h4 className="font-semibold mb-4">Our Ventures</h4>
                <ul className="space-y-2">
                <li>
                    <a href="https://realty.sharevest.io" className="text-gray-400 hover:text-white transition-colors">
                    ShareVest Realty
                    </a>
                </li>
                <li>
                    <a href="https://terra.sharevest.io" className="text-gray-400 hover:text-white transition-colors">
                    ShareVest Terra
                    </a>
                </li>
                </ul>
            </div>

            {/* Legal Section */}
            <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                <li>
                    <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                    </Link>
                </li>
                <li>
                    <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                    </Link>
                </li>
                </ul>
            </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ShareVest Holdings. All rights reserved.</p>
            </div>
        </div>
        </footer>
    )
}
