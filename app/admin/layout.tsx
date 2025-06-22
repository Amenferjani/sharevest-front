import type React from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { AuthProvider } from "@/context/authContext"
import ProtectedRoute from "@/components/security/ProtectedRoute"

export const metadata = {
  title: "Admin",
} 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AdminLayout>{children}</AdminLayout>
      </ProtectedRoute>
    </AuthProvider>
  )
}
