import { Button } from "@/components/ui/button"
import { BarChart, Shield, Cpu, TrendingUp, Users, Building, Handshake } from "lucide-react"

const subsidiaries = [
  {
    name: "AssetVest",
    description: "Comprehensive asset management solutions for diverse portfolios.",
    icon: BarChart,
    color: "bg-blue-900 text-blue-400",
  },
  {
    name: "RiskVest",
    description: "Advanced risk assessment and mitigation strategies.",
    icon: Shield,
    color: "bg-red-900 text-red-400",
  },
  {
    name: "QuantumVest",
    description: "Cutting-edge algorithmic trading and quantum computing solutions.",
    icon: Cpu,
    color: "bg-purple-900 text-purple-400",
  },
  {
    name: "HedgeVest",
    description: "Sophisticated hedge fund investments for optimal returns.",
    icon: TrendingUp,
    color: "bg-green-900 text-green-400",
  },
  {
    name: "PartVest",
    description: "Crowdfunding and participatory investment opportunities.",
    icon: Users,
    color: "bg-orange-900 text-orange-400",
  },
  {
    name: "PrivateVest",
    description: "Exclusive private equity investments with high growth potential.",
    icon: Building,
    color: "bg-indigo-900 text-indigo-400",
  },
  {
    name: "RelVest",
    description: "Relationship-based investing for strategic partnerships.",
    icon: Handshake,
    color: "bg-pink-900 text-pink-400",
  },
]

export default function SubsidiariesSection() {
  return (
    <section id="subsidiaries" className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4 lg:px-16 sm:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-league-spartan text-white">Our Subsidiaries</h2>
          <p className="text-lg text-gray-300">
            ShareVest's diversified subsidiaries each specialize in a unique financial sector, providing comprehensive
            solutions for every aspect of your investment journey.
          </p>
        </div>

        {/* Grid Layout with responsive design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Large Screen (lg): 4 cards in first row, 3 cards in second row (middle one double-width) */}
          {/* Medium Screen (md): 2 columns with last card double-width */}
          {/* Small Screen (sm): Single column */}
          {subsidiaries.map((subsidiary, index) => (
            <div
              key={subsidiary.name}
              className={`
                ${index === 5 ? 'md:col-span-1 lg:col-span-2' : 'col-span-1'}
                ${index === 6 ? 'md:col-span-2 lg:col-span-1' : 'col-span-1'}
                ${index >= 4 ? 'lg:col-span-1' : ''}
                bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-800 hover:shadow-md transition-shadow
              `}
            >
              <div className={`w-12 h-12 rounded-lg ${subsidiary.color} flex items-center justify-center mb-4`}>
                <subsidiary.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{subsidiary.name}</h3>
              <p className="text-gray-300">{subsidiary.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Explore Our Subsidiaries
          </Button>
        </div>
      </div>
    </section>
  )
}