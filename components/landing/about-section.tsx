import { DollarSign, TrendingUp, ShieldCheck } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-league-spartan text-white">Who We Are</h2>
          <p className="text-lg text-gray-300">
            ShareVest Holdings is a premier financial services company dedicated to empowering investors with
            innovative, data-driven solutions. Our mission is to create sustainable wealth through diversified
            investment strategies tailored to each client's unique goals and risk tolerance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 p-8 rounded-xl shadow-sm text-center">
            <div className="bg-emerald-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">$500M+</h3>
            <p className="text-gray-300">in Assets Managed</p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-xl shadow-sm text-center">
            <div className="bg-emerald-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">250+</h3>
            <p className="text-gray-300">Successful Investment Projects</p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-xl shadow-sm text-center">
            <div className="bg-emerald-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">18%</h3>
            <p className="text-gray-300">Average ROI for Investors</p>
          </div>
        </div>
      </div>
    </section>
  )
}
