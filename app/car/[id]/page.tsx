import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Car,
  Gauge,
  Calendar,
  Fuel,
  Settings,
  Users,
  Palette,
  MapPin,
  DollarSign,
  Heart,
  Share2,
  MessageSquare,
  Phone,
  Mail,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ReviewList } from "@/components/reviews/review-list"

export default function CarDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch car data based on the ID
  const car = {
    id: params.id,
    title: "2012 Nissan Leaf SV",
    price: 15999,
    monthly: 151,
    image: "/placeholder.svg?height=600&width=1200",
    images: [
      "/placeholder.svg?height=120&width=200",
      "/placeholder.svg?height=120&width=200",
      "/placeholder.svg?height=120&width=200",
      "/placeholder.svg?height=120&width=200",
    ],
    mileage: 66332,
    year: 2012,
    location: "New York, NY",
    condition: "Used",
    featured: true,
    fuel: "Electric",
    transmission: "Automatic",
    color: "White",
    seats: 5,
    description:
      "The Nissan Leaf SV is a fully electric vehicle that offers excellent efficiency and a comfortable ride. This 2012 model is in great condition with regular maintenance and comes with a range of features including navigation, heated seats, and Bluetooth connectivity.",
    features: [
      "Navigation System",
      "Heated Seats",
      "Bluetooth",
      "Backup Camera",
      "Keyless Entry",
      "Climate Control",
      "Cruise Control",
      "Power Windows",
      "Power Locks",
      "Alloy Wheels",
    ],
    seller: {
      name: "Kathryn Murphy",
      image: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 123-4567",
      email: "kathryn@example.com",
      active: "3 hours ago",
    },
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="relative h-[500px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${car.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.7)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

        <div className="container relative z-10">
          <h1 className="text-5xl font-bold text-white mb-6">{car.title}</h1>
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-white">
              <Car className="h-5 w-5 text-orange-500" />
              <span>{car.condition} car</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Gauge className="h-5 w-5 text-orange-500" />
              <span>{car.mileage.toLocaleString()} mi</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <DollarSign className="h-5 w-5 text-orange-500" />
              <span>Est. ${car.monthly}/mo</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button className="bg-white text-gray-900 hover:bg-gray-100">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </Button>
            <div className="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-md">
              <Avatar className="h-10 w-10">
                <AvatarImage src={car.seller.image || "/placeholder.svg"} alt={car.seller.name} />
                <AvatarFallback>KM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-medium">{car.seller.name}</p>
                <p className="text-gray-300 text-sm">{car.seller.active}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {car.images.map((image, index) => (
                    <div
                      key={index}
                      className="cursor-pointer border-2 border-transparent hover:border-orange-500 rounded-md overflow-hidden"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${car.title} - Image ${index + 1}`}
                        width={200}
                        height={120}
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src={car.image || "/placeholder.svg"}
                    alt={car.title}
                    width={1200}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="p-4 border rounded-b-md">
                  <h3 className="text-xl font-bold mb-4">Car Overview</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-500">Year</p>
                        <p className="font-medium">{car.year}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-500">Mileage</p>
                        <p className="font-medium">{car.mileage.toLocaleString()} mi</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-500">Fuel</p>
                        <p className="font-medium">{car.fuel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-500">Transmission</p>
                        <p className="font-medium">{car.transmission}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-500">Color</p>
                        <p className="font-medium">{car.color}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-500">Seats</p>
                        <p className="font-medium">{car.seats}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{car.description}</p>
                </TabsContent>
                <TabsContent value="features" className="p-4 border rounded-b-md">
                  <h3 className="text-xl font-bold mb-4">Car Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="location" className="p-4 border rounded-b-md">
                  <h3 className="text-xl font-bold mb-4">Car Location</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-orange-500" />
                    <span>{car.location}</span>
                  </div>
                  <div className="bg-gray-200 h-[300px] rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Map would be displayed here</p>
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="p-4 border rounded-b-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Customer Reviews</h3>
                    <Button asChild>
                      <Link href={`/car/${car.id}/reviews`}>See All Reviews</Link>
                    </Button>
                  </div>
                  <ReviewList listingId={car.id} />
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">${car.price.toLocaleString()}</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-500 mb-6">Est. ${car.monthly}/mo</p>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 mb-3">Contact Seller</Button>
                <Button variant="outline" className="w-full">
                  Make an Offer
                </Button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Seller Information</h3>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={car.seller.image || "/placeholder.svg"} alt={car.seller.name} />
                    <AvatarFallback>KM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{car.seller.name}</p>
                    <p className="text-sm text-gray-500">{car.seller.active}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full flex justify-start">
                    <Phone className="mr-2 h-4 w-4" />
                    {car.seller.phone}
                  </Button>
                  <Button variant="outline" className="w-full flex justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    {car.seller.email}
                  </Button>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat with Seller
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
