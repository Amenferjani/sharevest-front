'use client'

import Link from 'next/link'
import { Globe, Instagram, Facebook, Linkedin } from 'lucide-react'

export default function GrowthFunds() {
    return (
        <div className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">GrowthFunds</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Creating tailored investment strategies for local economies, fostering sustainable growth and development.
            </p>
            </div>

            <div className="bg-white bg-opacity-5 rounded-lg p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                <div className="p-6 bg-white rounded-full inline-block">
                    <Globe className="h-12 w-12 text-black" />
                </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4">TGF Tunisia</h3>
                <p className="text-gray-300 mb-6">
                    Our flagship GrowthFund initiative, focusing on empowering Tunisian businesses and entrepreneurs through strategic investments and partnerships.
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                    <a
                    href="https://instagram.com/tgf.tunisia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                    >
                    <Instagram className="h-6 w-6" />
                    </a>
                    <a
                    href="https://facebook.com/tgf.tunisia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                    >
                    <Facebook className="h-6 w-6" />
                    </a>
                    <a
                    href="https://linkedin.com/company/TGFTunisia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                    >
                    <Linkedin className="h-6 w-6" />
                    </a>
                </div>
                </div>
            </div>
            </div>

            <div className="text-center mt-12">
            <Link href="/growthfunds">
                <span className="px-8 py-3 inline-block bg-white text-black rounded-md hover:bg-gray-200 transition-colors text-lg font-semibold">
                Discover GrowthFunds
                </span>
            </Link>
            </div>
        </div>
        </div>
    )
}
