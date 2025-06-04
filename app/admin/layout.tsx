import type React from "react"
import AdminLayout from "@/components/admin/admin-layout"

export const metadata = {
  title: "Admin",
} 
export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>
}
