import { Button } from "@/components/ui/button"
import { Search, BarChart2, PieChart, LineChart, TrendingUp } from "lucide-react"

export default function MethodologySection() {
  const steps = [
    {
      icon: Search,
      title: "Research & Market Insights",
      description: "Comprehensive analysis of market trends and opportunities.",
    },
    {
      icon: BarChart2,
      title: "Quantitative Analysis",
      description: "Data-driven evaluation of investment potential and risks.",
    },
    {
      icon: PieChart,
      title: "Portfolio Diversification",
      description: "Strategic allocation across asset classes for optimal balance.",
    },
    {
      icon: LineChart,
      title: "Continuous Monitoring",
      description: "Real-time tracking and adjustments to maximize performance.",
    },
    {
      icon: TrendingUp,
      title: "Profitable Exits",
      description: "Timing-optimized liquidation strategies for maximum returns.",
    },
  ]

  return (
    <section id="methodology" className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-league-spartan text-white">
            Our Investment Methodology
          </h2>
          <p className="text-lg text-gray-300">
            ShareVest employs a data-driven methodology to maximize returns and reduce risk, ensuring your investments
            are always positioned for optimal growth.
          </p>
        </div>

        <div className="relative mb-16">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-emerald-900 -translate-y-1/2 hidden md:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="bg-black z-10 mb-4">
                  <div className="bg-emerald-900 w-16 h-16 rounded-full flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-emerald-400" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-sm text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Learn More About Our Process
          </Button>
        </div>
      </div>
    </section>
  )
}
