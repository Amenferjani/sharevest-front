'use client'

import Link from 'next/link'
import React from 'react'
import { Building2, Trees } from 'lucide-react'

const ventures = [
    {
        icon: Building2,
        name: 'ShareVest Realty',
        status: 'Coming Soon',
        description: 'Revolutionary real estate investment platform.',
        link: 'realty.sharevest.io',
        isActive: false
    },
    {
        icon: Trees,
        name: 'ShareVest Terra',
        status: 'Active',
        description: 'Sustainable land and agriculture investments.',
        link: 'terra.sharevest.io',
        isActive: true
    }
]

export default function Ventures() {
    return (
        <div className="bg-white text-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Our Ventures</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Innovative investment platforms expanding the horizons of wealth creation.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {ventures.map((venture) => (
                <div
                key={venture.name}
                className={`p-8 rounded-lg border-2 ${
                    venture.isActive
                    ? 'border-black hover:bg-black hover:text-white'
                    : 'border-gray-200 opacity-75'
                } transition-all duration-300`}
                >
                <div className="flex flex-col items-center text-center">
                    <div
                    className={`p-4 rounded-full mb-6 ${
                        venture.isActive ? 'bg-black text-white' : 'bg-gray-200'
                    }`}
                    >
                    <venture.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{venture.name}</h3>
                    <span
                    className={`text-sm mb-4 ${
                        venture.isActive ? 'text-green-600' : 'text-gray-500'
                    }`}
                    >
                    {venture.status}
                    </span>
                    <p className="text-gray-600 mb-6">{venture.description}</p>
                    {venture.isActive ? (
                    <a
                        href={`https://${venture.link}`}
                        className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit Platform
                    </a>
                    ) : (
                    <button className="px-6 py-2 bg-gray-200 text-gray-600 rounded-md cursor-not-allowed">
                        Coming Soon
                    </button>
                    )}
                </div>
                </div>
            ))}
            </div>

            <div className="text-center mt-12">
            <Link href="/ventures">
                <span className="px-8 py-3 inline-block bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-lg font-semibold">
                Learn More About Our Ventures
                </span>
            </Link>
            </div>
        </div>
        </div>
    )
}
