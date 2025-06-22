'use client'

import { useState } from 'react'
import { Mail, Phone, MessageSquare } from 'lucide-react'
import { Input } from '../ui/input'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log('Form submitted:', formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        })
    }

    return (
        <div className="bg-white text-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Contact Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get in touch with our team to discuss your investment needs and opportunities.
            </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-black text-white p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6" />
                    <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:info@sharevest.io" className="text-gray-300 hover:text-white">
                        info@sharevest.io
                    </a>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6" />
                    <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-300">Tunisia: +216 28 863 137</p>
                    <p className="text-gray-300">Italy: +39 06 5869 8857</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <MessageSquare className="h-6 w-6" />
                    <div>
                    <p className="font-semibold">WhatsApp</p>
                    <a 
                        href="https://bit.ly/dm-sharevest" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white"
                    >
                        Direct Message
                    </a>
                    </div>
                </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                <Input
                    type="text"
                    required
                    placeholder="Enter your name"
                />
                </div>
                <div>
                <Input
                    type="email"
                    required
                    placeholder="Enter your email"
                />
                </div>
                <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="bg-white p-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    required
                />
                </div>
                <button
                type="submit"
                className="w-full px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-lg font-semibold"
                >
                Send Message
                </button>
            </form>
            </div>
        </div>
        </div>
    )
}
