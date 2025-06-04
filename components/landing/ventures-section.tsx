import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export default function VenturesSection() {
  return (
    <section id="ventures" className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-league-spartan text-white">Our Ventures</h2>
          <p className="text-lg text-gray-300">
            Explore ShareVest's innovative ventures that are expanding our impact across different sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <div className="bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-800 opacity-70">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">ShareVest Realty</h3>
              <span className="px-3 py-1 bg-zinc-800 text-gray-300 rounded-full text-xs font-medium">Coming Soon</span>
            </div>
            <p className="text-gray-300 mb-4">
              Our real estate investment platform that will provide access to premium properties with fractional
              ownership.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" disabled className="text-gray-400 border-zinc-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Website
              </Button>
            </div>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-800">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">ShareVest Terra</h3>
              <span className="px-3 py-1 bg-emerald-900 text-emerald-400 rounded-full text-xs font-medium">Active</span>
            </div>
            <p className="text-gray-300 mb-4">
              Sustainable land and agriculture investments focused on environmental impact and long-term returns.
            </p>
            <div className="flex justify-end">
              <Link href="https://terra.sharevest.io" target="_blank" passHref>
                <Button variant="outline" className="text-emerald-400 border-emerald-900 hover:bg-emerald-900">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Learn More About Our Ventures
          </Button>
        </div>
      </div>
    </section>
  )
}
