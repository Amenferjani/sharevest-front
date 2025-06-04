import type React from "react"
import DashboardLayout from "@/components/dashboard/layout"
import ProtectedRoute from "@/components/security/ProtectedRoute"
import { AuthProvider } from "@/context/authContext"


export const metadata = {
  title: "Dashboard",
} 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
    <ProtectedRoute>
      <DashboardLayout>
        {children}
      </DashboardLayout>
      </ProtectedRoute>
      </AuthProvider>
  )
}
