'use client'

import Link from 'next/link'
import { Search, LineChart, PieChart, Activity, Target } from 'lucide-react'

const steps = [
    {
        icon: Search,
        title: 'Research & Market Insights',
        description: 'Comprehensive market analysis and deep research into investment opportunities.'
    },
    {
        icon: LineChart,
        title: 'Quantitative Analysis',
        description: 'Data-driven evaluation of potential investments using advanced analytics.'
    },
    {
        icon: PieChart,
        title: 'Portfolio Diversification',
        description: 'Strategic asset allocation across multiple sectors and investment types.'
    },
    {
        icon: Activity,
        title: 'Continuous Monitoring',
        description: 'Real-time tracking and adjustment of investment performance.'
    },
    {
        icon: Target,
        title: 'Profitable Exits',
        description: 'Timing-optimized exit strategies to maximize returns.'
    }
]

export default function Methodology() {
    return (
        <div className="bg-white text-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Our Investment Methodology</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A systematic approach to maximizing returns while minimizing risk through data-driven decision making.
            </p>
            </div>

            <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {steps.map((step, index) => (
                <div key={index} className="relative">
                    <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-black rounded-full mb-6 relative z-10">
                        <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    </div>
                </div>
                ))}
            </div>
            </div>

            <div className="text-center mt-16">
            <Link href="/methodology">
                <span className="px-8 py-3 inline-block bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-lg font-semibold">
                Learn More About Our Process
                </span>
            </Link>
            </div>
        </div>
        </div>
    )
}
