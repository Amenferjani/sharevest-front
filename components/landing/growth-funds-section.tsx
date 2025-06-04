import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Linkedin } from "lucide-react"

export default function GrowthFundsSection() {
  return (
    <section id="growthfunds" className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-league-spartan text-white">GrowthFunds</h2>
          <p className="text-lg text-gray-300">
            GrowthFunds create tailored investment strategies for local economies, fostering sustainable development and
            generating attractive returns for investors.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-zinc-900 rounded-xl shadow-md overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="TGF Tunisia - Local investment project"
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-emerald-400 font-semibold">Case Study</div>
              <h3 className="mt-1 text-xl font-semibold text-white">TGF Tunisia</h3>
              <p className="mt-2 text-gray-300">
                Our flagship GrowthFund in Tunisia has created over 200 jobs and funded 15 local businesses, delivering
                a 22% return to investors while boosting the regional economy.
              </p>
              <div className="mt-4 flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Discover GrowthFunds
          </Button>
        </div>
      </div>
    </section>
  )
}
