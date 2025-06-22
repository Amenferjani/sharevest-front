'use client'

import Link from "next/link"

export default function Hero() {
    return (
        <div
        className="relative min-h-screen flex items-center justify-center"
        style={{
            backgroundImage:
            'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
        >
        <div className="text-center text-white px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Scaling Wealth, Securing Futures
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl mb-8 max-w-3xl mx-auto text-gray-200">
            Empowering your investment journey with tailored financial services and next-gen asset management.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/dashboard" className="px-8 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors text-lg font-semibold">
                    Start Your Investment Journey
                </Link>
            
                <Link href="#subsidiaries" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-md hover:bg-white hover:text-black transition-colors text-lg font-semibold">
                    Explore Our Subsidiaries
                </Link>
            </div>
        </div>
        </div>
    )
}
