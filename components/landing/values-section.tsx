import { Button } from "@/components/ui/button"
import { Shield, Lightbulb, Users, Database, Globe, Leaf } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "Ethical practices and transparency in all our operations.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Continuously evolving with the market to deliver cutting-edge solutions.",
  },
  {
    icon: Users,
    title: "Client-First Approach",
    description: "Your success is our success - we prioritize your financial goals.",
  },
  {
    icon: Database,
    title: "Data-Driven",
    description: "Making smart, informed investment decisions backed by robust analysis.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Creating local investments with global reach and significance.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Focusing on long-term value creation and sustainable growth.",
  },
]

export default function ValuesSection() {
  return (
    <section id="values" className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-league-spartan text-white">Our Core Values</h2>
          <p className="text-lg text-gray-300">
            At ShareVest, our values guide everything we do, from investment decisions to client relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {values.map((value) => (
            <div key={value.title} className="bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-800">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-900 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                  <value.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white">{value.title}</h3>
              </div>
              <p className="text-gray-300">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Join Us in Shaping a Better Future
          </Button>
        </div>
      </div>
    </section>
  )
}
