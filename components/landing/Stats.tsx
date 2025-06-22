'use client'

import { DollarSign, TrendingUp, Users } from 'lucide-react'

export default function Stats() {
    return (
        <div className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Who We Are</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                ShareVest Holdings is a pioneering investment firm dedicated to creating sustainable wealth through innovative financial solutions and strategic asset management.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
                <div className="inline-block p-4 bg-white rounded-full mb-4">
                <DollarSign className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-2">$2.5B+</h3>
                <p className="text-gray-300">in Assets Managed</p>
            </div>

            <div className="text-center">
                <div className="inline-block p-4 bg-white rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-2">500+</h3>
                <p className="text-gray-300">Successful Investment Projects</p>
            </div>

            <div className="text-center">
                <div className="inline-block p-4 bg-white rounded-full mb-4">
                <Users className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-2">18.5%</h3>
                <p className="text-gray-300">Average ROI for Investors</p>
            </div>
            </div>
        </div>
        </div>
    )
}
