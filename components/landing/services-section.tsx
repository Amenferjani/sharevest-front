import { Button } from "@/components/ui/button"
import { TrendingUp, ShieldCheck, Users } from "lucide-react"

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-league-spartan text-white">How We Serve You</h2>
          <p className="text-lg text-gray-300">
            ShareVest offers a comprehensive range of financial services designed to help you achieve your investment
            goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-zinc-900 p-8 rounded-xl shadow-sm text-center">
            <div className="bg-emerald-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Wealth Growth</h3>
            <p className="text-gray-300">
              Personalized financial growth strategies tailored to your unique goals and risk tolerance.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-xl shadow-sm text-center">
            <div className="bg-emerald-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Risk Management</h3>
            <p className="text-gray-300">
              Advanced models and strategies to safeguard your investments against market volatility.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-xl shadow-sm text-center">
            <div className="bg-emerald-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Personalized Guidance</h3>
            <p className="text-gray-300">
              One-on-one investor guidance from experienced financial advisors dedicated to your success.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Get Personalized Advice
          </Button>
        </div>
      </div>
    </section>
  )
}
