import type React from "react"
import ProtectedRoute from "@/components/security/ProtectedRoute"
import { AuthProvider } from "@/context/authContext"
import HedgeManagerLayout from "@/components/hedge-manager/layout"


export const metadata = {
    title: "Hedge Manager Dashboard | HedgeVest",
}
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ProtectedRoute>
                <HedgeManagerLayout>
                    <div className="min-h-screen bg-background">
                        <div className="container mx-auto px-4 py-6">{children}</div>
                    </div>
                </HedgeManagerLayout>
            </ProtectedRoute>
        </AuthProvider>
    )
}
