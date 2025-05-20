import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Car, Gauge, DollarSign } from "lucide-react"

export function Hero() {
  return (
    <section className="relative h-[600px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

      <div className="container relative z-10">
        <h1 className="text-5xl font-bold text-white mb-6">2012 Nissan Leaf SV</h1>
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-white">
            <Car className="h-5 w-5 text-orange-500" />
            <span>Used car</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Gauge className="h-5 w-5 text-orange-500" />
            <span>66,332 mi</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <DollarSign className="h-5 w-5 text-orange-500" />
            <span>Est. $151/mo</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button className="bg-white text-gray-900 hover:bg-gray-100">Chat</Button>
          <div className="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-md">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Kathryn Murphy" />
              <AvatarFallback>KM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-medium">Kathryn Murphy</p>
              <p className="text-gray-300 text-sm">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>

      <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-colors">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-colors">
        <ChevronRight className="h-6 w-6" />
      </button>
    </section>
  )
}
