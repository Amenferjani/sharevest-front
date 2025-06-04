"use client"

import { XCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function Error({ message = "Something went wrong" }: { message?: string }) {
    const [isVisible, setIsVisible] = useState(false)

    // Simple entrance animation
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div
            className={cn(
            "bg-black backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-red-500/20",
            "flex flex-col items-center gap-6 max-w-sm w-full mx-4 transition-all duration-300",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
            )}
        >
            {/* Icon with pulsing glow effect */}
            <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-red-500/20 blur-md animate-pulse" />
            <XCircle className="h-16 w-16 text-red-500 relative" strokeWidth={1.5} />
            </div>

            <div className="space-y-3 text-center w-full">
            <h3 className="text-xl font-medium text-white"> {message}</h3>
            <p className="text-gray-300">Something wen't wrong Try again later</p>

            <button
                onClick={() => window.location.reload()}
                className="mt-4 w-full py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                        text-white rounded-lg transition-all duration-200 font-medium shadow-lg shadow-red-500/20
                        flex items-center justify-center"
            >
                Try Again
            </button>
            </div>
        </div>
        </div>
    )
}
