import { Inter, League_Spartan } from "next/font/google"
import "./globals.css"
import { Providers } from './providers'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
})
export const metadata = {
  title: "Landing",
} 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${leagueSpartan.variable} font-sans`}>
        <Providers>{children}<Toaster /> </Providers>
      </body>
    </html>
  )
}
