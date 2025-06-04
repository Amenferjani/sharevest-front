import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-40 lg:pb-36">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 z-10"></div>

      {/* Background image - using a more visible image with higher contrast */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          opacity: "0.7", // Increased opacity for better visibility
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl mx-auto text-center text-white">
          {" "}
          {/* Added mx-auto and text-center */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-league-spartan">
            Scaling Wealth, Securing Futures
          </h1>
          <h2 className="text-xl md:text-2xl mb-8 text-gray-200">
            Empowering your investment journey with tailored financial services and next-gen asset management.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {" "}
            {/* Added justify-center */}
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Start Your Investment Journey
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Explore Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
