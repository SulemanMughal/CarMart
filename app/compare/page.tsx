"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useComparison } from "@/lib/comparison-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ComparePage() {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison()
  const router = useRouter()

  // Comparison specs to display
  const specs = [
    { name: "Price", key: "price", format: (value: number) => `$${value.toLocaleString()}` },
    { name: "Monthly Payment", key: "monthly", format: (value: number) => `$${value}/mo` },
    { name: "Year", key: "year" },
    { name: "Mileage", key: "mileage", format: (value: number) => `${value.toLocaleString()} mi` },
    { name: "Make", key: "make" },
    { name: "Model", key: "model" },
    { name: "Body Type", key: "body" },
    { name: "Doors", key: "doors" },
    { name: "Fuel Type", key: "fuel" },
    { name: "Transmission", key: "transmission" },
    { name: "Color", key: "color" },
    { name: "Seats", key: "seats" },
    { name: "Condition", key: "condition" },
    { name: "Location", key: "location" },
  ]

  if (comparisonList.length === 0) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <section className="py-12 flex-grow bg-gray-50">
          <div className="container">
            <div className="mb-6">
              <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <h1 className="text-3xl font-bold">Compare Cars</h1>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-bold mb-4">No cars to compare</h2>
              <p className="text-gray-500 mb-6">
                You haven't added any cars to your comparison list yet. Browse our listings and add cars to compare.
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                <Link href="/">Browse Cars</Link>
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="py-12 flex-grow bg-gray-50">
        <div className="container">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <h1 className="text-3xl font-bold">Compare Cars</h1>
            </div>
            <Button variant="outline" onClick={clearComparison}>
              Clear All
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-medium text-gray-500 w-1/4">Specifications</th>
                  {comparisonList.map((car) => (
                    <th key={car.id} className="p-4 text-center relative">
                      <button
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        onClick={() => removeFromComparison(car.id)}
                      >
                        <X className="h-5 w-5" />
                      </button>
                      <div className="h-40 relative mb-4">
                        <Image
                          src={car.image || "/placeholder.svg"}
                          alt={car.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <h3 className="font-bold text-lg">{car.title}</h3>
                      <p className="text-xl font-bold text-orange-500 mt-1">${car.price.toLocaleString()}</p>
                      <div className="mt-2">
                        <Link href={`/car/${car.id}`} className="text-orange-500 text-sm font-medium hover:underline">
                          View Details
                        </Link>
                      </div>
                    </th>
                  ))}
                  {Array.from({ length: 3 - comparisonList.length }).map((_, index) => (
                    <th key={`empty-${index}`} className="p-4 text-center">
                      <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center mb-4">
                        <p className="text-gray-400">Add a car</p>
                      </div>
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/">Add Car</Link>
                      </Button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specs.map((spec) => (
                  <tr key={spec.key} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{spec.name}</td>
                    {comparisonList.map((car) => {
                      const value = car[spec.key as keyof typeof car]
                      return (
                        <td key={`${car.id}-${spec.key}`} className="p-4 text-center">
                          {value ? (
                            <span>{spec.format ? spec.format(value as number) : value}</span>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                      )
                    })}
                    {Array.from({ length: 3 - comparisonList.length }).map((_, index) => (
                      <td key={`empty-${spec.key}-${index}`} className="p-4 text-center">
                        <span className="text-gray-300">-</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
