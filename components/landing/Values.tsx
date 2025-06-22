'use client'

import Link from 'next/link'
import { Shield, Lightbulb, Users, BarChart2, Globe, Leaf } from 'lucide-react'

const values = [
    {
        icon: Shield,
        title: 'Integrity',
        description: 'Ethical practices and unwavering transparency in all our operations.'
    },
    {
        icon: Lightbulb,
        title: 'Innovation',
        description: 'Continuously evolving with market dynamics and technological advancements.'
    },
    {
        icon: Users,
        title: 'Client-First Approach',
        description: 'Your success is our primary measure of achievement.'
    },
    {
        icon: BarChart2,
        title: 'Data-Driven',
        description: 'Leveraging analytics for informed investment decisions.'
    },
    {
        icon: Globe,
        title: 'Global Impact',
        description: 'Creating value through local investments with global reach.'
    },
    {
        icon: Leaf,
        title: 'Sustainability',
        description: 'Committed to long-term value creation and responsible investing.'
    }
]

export default function Values() {
    return (
        <div className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Our Core Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The principles that guide our decisions and shape our commitment to excellence.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
                <div 
                key={index}
                className="bg-white bg-opacity-5 p-8 rounded-lg hover:bg-opacity-10 transition-all duration-300"
                >
                <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-white rounded-full mb-6">
                    <value.icon className="h-8 w-8 text-black" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                </div>
                </div>
            ))}
            </div>

            <div className="text-center mt-12">
            <Link href="/values">
                <span className="px-8 py-3 inline-block bg-white text-black rounded-md hover:bg-gray-200 transition-colors text-lg font-semibold">
                Join Us in Shaping a Better Future
                </span>
            </Link>
            </div>
        </div>
        </div>
    )
}
