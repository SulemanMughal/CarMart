"use client"

import { useComparison } from "@/lib/comparison-context"
import { Button } from "@/components/ui/button"
import { X, BarChart2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function ComparisonBar() {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison()
  const pathname = usePathname()

  // Don't show on compare page
  if (pathname === "/compare" || comparisonList.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 py-3">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-orange-500" />
            <span className="font-medium">Compare Cars ({comparisonList.length}/3)</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {comparisonList.map((car) => (
                <div key={car.id} className="relative">
                  <div className="h-12 w-20 relative rounded overflow-hidden">
                    <Image src={car.image || "/placeholder.svg"} alt={car.title} fill className="object-cover" />
                  </div>
                  <button
                    className="absolute -top-1 -right-1 bg-gray-800 rounded-full p-0.5"
                    onClick={() => removeFromComparison(car.id)}
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={clearComparison}>
                Clear All
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600" size="sm" asChild>
                <Link href="/compare">Compare Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
