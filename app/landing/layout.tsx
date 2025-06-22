import type React from "react"
import "../globals.css"

export const metadata = {
  title: "Landing",
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="landing-layout-container">
      {children}
    </div>
  )
}