'use client'

import { LineChart, ShieldCheck, Users } from 'lucide-react'

const services = [
    {
        icon: LineChart,
        title: 'Wealth Growth',
        description: 'Personalized financial growth strategies tailored to your investment goals and risk tolerance.'
    },
    {
        icon: ShieldCheck,
        title: 'Risk Management',
        description: 'Advanced models and continuous monitoring to safeguard your investments and optimize returns.'
    },
    {
        icon: Users,
        title: 'Personalized Guidance',
        description: '1-on-1 investor guidance from experienced financial advisors dedicated to your success.'
    }
]

export default function Services() {
    return (
        <div className="bg-white text-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">How We Serve You</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive range of financial services is designed to help you achieve your investment goals.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map((service, index) => (
                <div 
                key={index}
                className="text-center p-8 rounded-lg hover:shadow-xl transition-shadow"
                >
                <div className="inline-block p-4 bg-black rounded-full mb-6">
                    <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                </div>
            ))}
            </div>

            <div className="text-center mt-12">
            <button className="px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-lg font-semibold">
                Get Personalized Advice
            </button>
            </div>
        </div>
        </div>
    )
}
