import type React from "react"
import ProtectedRoute from "@/components/security/ProtectedRoute"
import { AuthProvider } from "@/context/authContext"
import CompanyRepLayout from "@/components/company-rep/layout"


export const metadata = {
    title: "Company Representative Dashboard | RelVest",
}
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ProtectedRoute>
                <CompanyRepLayout>
                <div className="min-h-screen bg-background">
                    <div className="container mx-auto px-4 py-6">{children}</div>
                </div>
                </CompanyRepLayout>
            </ProtectedRoute>
        </AuthProvider>
    )
}
