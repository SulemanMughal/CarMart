import Link from "next/link"
import { MessageSquare, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function FavoritesPage() {
  // Mock data for favorites
  const favorites = [
    {
      id: "1",
      title: "BMW 3 Series 2020",
      price: "$32,500",
      location: "New York, NY",
      seller: "Premium Motors",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "Mercedes-Benz C-Class 2019",
      price: "$29,900",
      location: "Los Angeles, CA",
      seller: "Luxury Auto",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      title: "Audi A4 2020",
      price: "$31,200",
      location: "Chicago, IL",
      seller: "Elite Cars",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "4",
      title: "Toyota Camry 2018",
      price: "$18,500",
      location: "Miami, FL",
      seller: "City Motors",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((car) => (
            <Card key={car.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img src={car.image || "/placeholder.svg"} alt={car.title} className="h-full w-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{car.title}</CardTitle>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-lg">{car.price}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">{car.location}</p>
                <p className="text-sm">Seller: {car.seller}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/car/${car.id}`}>View Details</Link>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <MessageSquare className="h-4 w-4" />
                    <span className="sr-only">Contact Seller</span>
                  </Button>
                  <Button variant="outline" size="icon" className="text-destructive">
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Remove from Favorites</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">You haven't added any cars to your favorites yet.</p>
          <Button asChild>
            <Link href="/search">Browse Cars</Link>
          </Button>
        </Card>
      )}
    </div>
  )
}
