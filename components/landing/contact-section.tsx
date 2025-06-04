import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MessageSquare } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-league-spartan text-white">Contact Us</h2>
          <p className="text-lg text-gray-300">
            Have questions or ready to start your investment journey? Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <Input id="name" placeholder="Your name" className="bg-zinc-900 border-zinc-800 text-white" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  rows={5}
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Send Message
              </Button>
            </form>
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-emerald-900 p-3 rounded-lg mr-4">
                  <Mail className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                  <p className="text-gray-300">info@sharevest.io</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-emerald-900 p-3 rounded-lg mr-4">
                  <Phone className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Phone</h3>
                  <p className="text-gray-300">Tunisian: +216 28 863 137</p>
                  <p className="text-gray-300">Italian: +39 06 5869 8857</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-emerald-900 p-3 rounded-lg mr-4">
                  <MessageSquare className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">WhatsApp</h3>
                  <a href="https://bit.ly/dm-sharevest" className="text-emerald-400 hover:text-emerald-300">
                    Direct message us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
