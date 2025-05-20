import { SelectItem } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { Select } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchFilters } from "@/components/search-filters"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gauge, Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Sample car data
const allCars = [
  {
    id: 1,
    title: "2021 Toyota Camry SE",
    price: 25999,
    monthly: 399,
    image: "/placeholder.svg?height=200&width=300",
    mileage: 15420,
    year: 2021,
    location: "New York, NY",
    condition: "Used",
    featured: true,
    make: "toyota",
    model: "camry",
    doors: "4",
    body: "sedan",
  },
  {
    id: 2,
    title: "2022 Honda Accord Sport",
    price: 28500,
    monthly: 435,
    image: "/placeholder.svg?height=200&width=300",
    mileage: 8750,
    year: 2022,
    location: "Los Angeles, CA",
    condition: "Used",
    featured: false,
    make: "honda",
    model: "accord",
    doors: "4",
    body: "sedan",
  },
  {
    id: 3,
    title: "2023 Nissan Altima SV",
    price: 26750,
    monthly: 410,
    image: "/placeholder.svg?height=200&width=300",
    mileage: 5230,
    year: 2023,
    location: "Chicago, IL",
    condition: "Used",
    featured: false,
    make: "nissan",
    model: "altima",
    doors: "4",
    body: "sedan",
  },
  {
    id: 4,
    title: "2022 Ford Mustang GT",
    price: 42999,
    monthly: 650,
    image: "/placeholder.svg?height=200&width=300",
    mileage: 12500,
    year: 2022,
    location: "Miami, FL",
    condition: "Used",
    featured: true,
    make: "ford",
    model: "mustang",
    doors: "2",
    body: "coupe",
  },
  {
    id: 5,
    title: "2023 Tesla Model 3",
    price: 48990,
    monthly: 750,
    image: "/placeholder.svg?height=200&width=300",
    mileage: 2100,
    year: 2023,
    location: "Austin, TX",
    condition: "New",
    featured: false,
    make: "tesla",
    model: "model3",
    doors: "4",
    body: "sedan",
  },
  {
    id: 6,
    title: "2021 BMW 3 Series",
    price: 39500,
    monthly: 605,
    image: "/placeholder.svg?height=200&width=300",
    mileage: 18750,
    year: 2021,
    location: "Seattle, WA",
    condition: "Used",
    featured: false,
    make: "bmw",
    model: "3series",
    doors: "4",
    body: "sedan",
  },
  {
    id: 7,
    title: "2023 Toyota RAV4",
    price: 32999,
    monthly: 505,
    image: "/placeholder.svg?height=200&width=300",
    mileage: 5600,
    year: 2023,
    location: "Denver, CO",
    condition: "New",
    featured: true,
    make: "toyota",
    model: "rav4",
    doors: "5",
    body: "suv",
  },
  {
    id: 8,
    title: "2022 Honda CR-V",
    price: 31500,
    monthly: 480,
    image: "/placeholder.svg?height=200&width=300",
    mileage: 12300,
    year: 2022,
    location: "Portland, OR",
    condition: "Used",
    featured: false,
    make: "honda",
    model: "crv",
    doors: "5",
    body: "suv",
  },
]

export default function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Filter cars based on search parameters
  const filteredCars = allCars.filter((car) => {
    // Check car type (new/used/all)
    if (searchParams.type && searchParams.type !== "all") {
      if (car.condition.toLowerCase() !== searchParams.type) {
        return false
      }
    }

    // Check make
    if (searchParams.make && car.make !== searchParams.make) {
      return false
    }

    // Check model
    if (searchParams.model && car.model !== searchParams.model) {
      return false
    }

    // Check doors
    if (searchParams.doors && car.doors !== searchParams.doors) {
      return false
    }

    // Check body
    if (searchParams.body && car.body !== searchParams.body) {
      return false
    }

    return true
  })

  // Build filter description
  const buildFilterDescription = () => {
    const filters = []

    if (searchParams.type && searchParams.type !== "all") {
      filters.push(searchParams.type === "new" ? "New" : "Used")
    }

    if (searchParams.make) {
      filters.push(
        typeof searchParams.make === "string"
          ? searchParams.make.charAt(0).toUpperCase() + searchParams.make.slice(1)
          : "",
      )
    }

    if (searchParams.model) {
      filters.push(
        typeof searchParams.model === "string"
          ? searchParams.model.charAt(0).toUpperCase() + searchParams.model.slice(1)
          : "",
      )
    }

    if (searchParams.body) {
      filters.push(
        typeof searchParams.body === "string"
          ? searchParams.body.charAt(0).toUpperCase() + searchParams.body.slice(1)
          : "",
      )
    }

    if (filters.length === 0) {
      return "All Cars"
    }

    return filters.join(" ")
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <SearchFilters />

      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">{buildFilterDescription()}</h2>
              <p className="text-gray-500">
                {filteredCars.length} {filteredCars.length === 1 ? "result" : "results"} found
              </p>
            </div>
            <div className="flex gap-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by: Featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredCars.length === 0 ? (
            <div className="bg-white p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">No cars found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search filters to find what you're looking for.</p>
              <Link href="/" className="text-orange-500 font-medium hover:underline">
                View all cars
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={car.image || "/placeholder.svg"}
                      alt={car.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    {car.featured && <Badge className="absolute top-2 left-2 bg-orange-500">Featured</Badge>}
                    <Badge className="absolute top-2 right-2 bg-blue-500">{car.condition}</Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg">{car.title}</h3>
                      <div className="text-right">
                        <p className="text-xl font-bold text-orange-500">${car.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">${car.monthly}/mo</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{car.mileage.toLocaleString()} mi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{car.year}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{car.location}</span>
                    </div>
                    <Link href={`/car/${car.id}`} className="text-orange-500 text-sm font-medium hover:underline">
                      View Details
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
