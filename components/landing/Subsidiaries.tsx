'use client'

import Link from 'next/link'
import {
    BarChart2,
    Shield,
    Binary,
    TrendingUp,
    Users,
    Building,
    HeartHandshake,
    Database
} from 'lucide-react'

const subsidiaries = [
    {
        icon: BarChart2,
        name: 'AssetVest',
        description: 'Asset Management Solutions',
        link: '/dashboard/assetvest'
    },
    {
        icon: Shield,
        name: 'RiskVest',
        description: 'Risk Assessment & Management',
        link: '/dashboard/riskvest'
    },
    {
        icon: Binary,
        name: 'QuantumVest',
        description: 'Quantitative Investment Strategies',
        link: '/dashboard/quantumvest'
    },
    {
        icon: TrendingUp,
        name: 'HedgeVest',
        description: 'Hedge Fund Solutions',
        link: '/dashboard/hedgevest'
    },
    {
        icon: Users,
        name: 'PartVest',
        description: 'Partnership Opportunities',
        link: '/dashboard/partvest'
    },
    {
        icon: Building,
        name: 'PrivateVest',
        description: 'Private Equity Solutions',
        link: '/dashboard/privatevest'
    },
    {
        icon: HeartHandshake,
        name: 'RelVest',
        description: 'Relationship Management',
        link: '/dashboard/relvest'
    },
    {
        icon: Database,
        name: 'DataVest',
        description: 'Data-Driven Insights',
        link: '/dashboard/datavest'
    }
]

export default function Subsidiaries() {
    return (
        <div className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Our Subsidiaries</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover our diverse portfolio of specialized financial institutions, each dedicated to excellence in their respective domains.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {subsidiaries.map((subsidiary) => (
                <Link
                key={subsidiary.name}
                href={subsidiary.link}
                className="group bg-white bg-opacity-5 p-6 rounded-lg hover:bg-opacity-10 transition-all duration-300"
                >
                <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-white rounded-full mb-6">
                    <subsidiary.icon className="h-8 w-8 text-black" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{subsidiary.name}</h3>
                    <p className="text-gray-400">{subsidiary.description}</p>
                    <span className="mt-4 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More →
                    </span>
                </div>
                </Link>
            ))}
            </div>

            <div className="text-center mt-12">
                <Link href="/dashboard" className="px-8 py-5 bg-white text-black rounded-md hover:bg-gray-200 transition-colors text-lg font-semibold">
                    Explore Our Subsidiaries
                </Link>
            </div>
        </div>
        </div>
    )
}
