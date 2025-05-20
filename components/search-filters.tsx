"use client"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function SearchFilters() {
  const router = useRouter()
  const [filters, setFilters] = useState({
    carType: "all",
    make: "",
    model: "",
    doors: "",
    body: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleCarTypeChange = (type: string) => {
    setFilters((prev) => ({ ...prev, carType: type }))
  }

  const handleSearch = () => {
    // Create query string from filters
    const queryParams = new URLSearchParams()

    if (filters.carType !== "all") {
      queryParams.append("type", filters.carType)
    }

    if (filters.make) {
      queryParams.append("make", filters.make)
    }

    if (filters.model) {
      queryParams.append("model", filters.model)
    }

    if (filters.doors) {
      queryParams.append("doors", filters.doors)
    }

    if (filters.body) {
      queryParams.append("body", filters.body)
    }

    // Navigate to search results page with filters
    router.push(`/search?${queryParams.toString()}`)
  }

  return (
    <section className="py-6 bg-white">
      <div className="container">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium ${filters.carType === "all" ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"} transition-colors`}
              onClick={() => handleCarTypeChange("all")}
            >
              All Car
            </button>
            <button
              className={`px-6 py-3 font-medium ${filters.carType === "new" ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"} transition-colors`}
              onClick={() => handleCarTypeChange("new")}
            >
              New Car
            </button>
            <button
              className={`px-6 py-3 font-medium ${filters.carType === "used" ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"} transition-colors`}
              onClick={() => handleCarTypeChange("used")}
            >
              Used Car
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
            <div>
              <p className="text-sm font-medium mb-1">Make</p>
              <Select onValueChange={(value) => handleFilterChange("make", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="nissan">Nissan</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                  <SelectItem value="bmw">BMW</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Model</p>
              <Select onValueChange={(value) => handleFilterChange("model", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Models" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="camry">Camry</SelectItem>
                  <SelectItem value="corolla">Corolla</SelectItem>
                  <SelectItem value="civic">Civic</SelectItem>
                  <SelectItem value="accord">Accord</SelectItem>
                  <SelectItem value="mustang">Mustang</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Door</p>
              <Select onValueChange={(value) => handleFilterChange("doors", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Door" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Doors</SelectItem>
                  <SelectItem value="4">4 Doors</SelectItem>
                  <SelectItem value="5">5 Doors</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Body</p>
              <Select onValueChange={(value) => handleFilterChange("body", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Body" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="coupe">Coupe</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Find cars
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
