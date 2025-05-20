"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gauge, Calendar, MapPin, BarChart2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useComparison } from "@/lib/comparison-context"
import { useToast } from "@/hooks/use-toast"

const cars = [
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
    fuel: "Gasoline",
    transmission: "Automatic",
    color: "White",
    seats: 5,
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
    fuel: "Gasoline",
    transmission: "Automatic",
    color: "Black",
    seats: 5,
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
    fuel: "Gasoline",
    transmission: "CVT",
    color: "Silver",
    seats: 5,
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
    fuel: "Gasoline",
    transmission: "Manual",
    color: "Red",
    seats: 4,
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
    condition: "Used",
    featured: false,
    make: "tesla",
    model: "model3",
    doors: "4",
    body: "sedan",
    fuel: "Electric",
    transmission: "Automatic",
    color: "Blue",
    seats: 5,
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
    fuel: "Gasoline",
    transmission: "Automatic",
    color: "Gray",
    seats: 5,
  },
]

export function CarListing() {
  const { addToComparison, isInComparison, removeFromComparison } = useComparison()
  const { toast } = useToast()

  const handleCompareToggle = (car: any) => {
    if (isInComparison(car.id)) {
      removeFromComparison(car.id)
      toast({
        title: "Removed from comparison",
        description: `${car.title} has been removed from your comparison list.`,
      })
    } else {
      addToComparison(car)
      toast({
        title: "Added to comparison",
        description: `${car.title} has been added to your comparison list.`,
      })
    }
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Listings</h2>
          <Link href="/compare" className="text-orange-500 font-medium hover:underline flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Compare Cars
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
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
              <CardFooter className="pt-0 flex flex-col gap-2">
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{car.location}</span>
                  </div>
                  <Link href={`/car/${car.id}`} className="text-orange-500 text-sm font-medium hover:underline">
                    View Details
                  </Link>
                </div>
                <Button
                  variant={isInComparison(car.id) ? "default" : "outline"}
                  className={`w-full ${isInComparison(car.id) ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                  onClick={() => handleCompareToggle(car)}
                >
                  <BarChart2 className="mr-2 h-4 w-4" />
                  {isInComparison(car.id) ? "Remove from Compare" : "Add to Compare"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
