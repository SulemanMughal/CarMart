import { Zap } from "lucide-react"
import Link from "next/link"

export function Trending() {
  return (
    <section className="py-4 bg-white">
      <div className="container">
        <div className="flex items-center gap-3">
          <Zap className="h-5 w-5 text-orange-500" />
          <span className="font-medium">Trending:</span>
          <div className="flex flex-wrap gap-2">
            <Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
              Volkswagen Scirocco,
            </Link>
            <Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
              Honda Civic,
            </Link>
            <Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
              Audi A3,
            </Link>
            <Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
              Toyota Vios,
            </Link>
            <Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
              Nissan GTR,
            </Link>
            <Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
              Subaru Impreza
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
