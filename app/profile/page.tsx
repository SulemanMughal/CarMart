"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Heart, Settings, User, LogOut, Upload, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Car enthusiast and collector. Looking for my next dream car.",
  })

  const updateProfileData = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = () => {
    setIsLoading(true)

    // Simulate saving profile
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    }, 1500)
  }

  // Mock data for user's listings and favorites
  const userListings = [
    {
      id: 1,
      title: "2019 BMW X5",
      price: 45999,
      image: "/placeholder.svg?height=100&width=150",
      status: "active",
    },
    {
      id: 2,
      title: "2020 Audi Q7",
      price: 52500,
      image: "/placeholder.svg?height=100&width=150",
      status: "pending",
    },
  ]

  const userFavorites = [
    {
      id: 3,
      title: "2021 Mercedes-Benz GLE",
      price: 61999,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 4,
      title: "2022 Tesla Model Y",
      price: 58990,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 5,
      title: "2020 Porsche Cayenne",
      price: 72500,
      image: "/placeholder.svg?height=100&width=150",
    },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="py-12 flex-grow bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">{profileData.name}</h2>
                    <p className="text-gray-500">{profileData.email}</p>
                    <div className="mt-2">
                      <Badge className="bg-orange-500">Premium Member</Badge>
                    </div>
                  </div>

                  <nav className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/profile/listings">
                        <Car className="mr-2 h-4 w-4" />
                        My Listings
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/profile/favorites">
                        <Heart className="mr-2 h-4 w-4" />
                        Favorites
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/profile/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="listings">My Listings</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your personal information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex flex-col items-center justify-center">
                            <Avatar className="h-24 w-24 mb-4">
                              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="John Doe" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" size="sm">
                              <Upload className="mr-2 h-4 w-4" />
                              Change Photo
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                value={profileData.name}
                                onChange={(e) => updateProfileData("name", e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                value={profileData.email}
                                onChange={(e) => updateProfileData("email", e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input
                                id="phone"
                                value={profileData.phone}
                                onChange={(e) => updateProfileData("phone", e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="location">Location</Label>
                              <Input
                                id="location"
                                value={profileData.location}
                                onChange={(e) => updateProfileData("location", e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <textarea
                              id="bio"
                              className="w-full min-h-[100px] p-2 border rounded-md"
                              value={profileData.bio}
                              onChange={(e) => updateProfileData("bio", e.target.value)}
                            />
                          </div>
                        </div>

                        <Button
                          type="button"
                          className="bg-orange-500 hover:bg-orange-600"
                          onClick={handleSaveProfile}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="listings">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>My Listings</CardTitle>
                          <CardDescription>Manage your car listings</CardDescription>
                        </div>
                        <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                          <Link href="/add-listing">
                            <Car className="mr-2 h-4 w-4" />
                            Add New Listing
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {userListings.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500 mb-4">You don't have any listings yet.</p>
                          <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                            <Link href="/add-listing">Add Your First Listing</Link>
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {userListings.map((listing) => (
                            <div key={listing.id} className="flex items-center justify-between border rounded-md p-4">
                              <div className="flex items-center gap-4">
                                <div className="h-16 w-24 relative rounded overflow-hidden">
                                  <img
                                    src={listing.image || "/placeholder.svg"}
                                    alt={listing.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-medium">{listing.title}</h3>
                                  <p className="text-orange-500 font-bold">${listing.price.toLocaleString()}</p>
                                  <Badge
                                    className={
                                      listing.status === "active"
                                        ? "bg-green-500"
                                        : listing.status === "pending"
                                          ? "bg-yellow-500"
                                          : "bg-red-500"
                                    }
                                  >
                                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/car/${listing.id}`}>View</Link>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/edit-listing/${listing.id}`}>Edit</Link>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="favorites">
                  <Card>
                    <CardHeader>
                      <CardTitle>Favorites</CardTitle>
                      <CardDescription>Cars you've saved as favorites</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {userFavorites.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500 mb-4">You don't have any favorite cars yet.</p>
                          <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                            <Link href="/">Browse Cars</Link>
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {userFavorites.map((car) => (
                            <div key={car.id} className="flex items-center justify-between border rounded-md p-4">
                              <div className="flex items-center gap-4">
                                <div className="h-16 w-24 relative rounded overflow-hidden">
                                  <img
                                    src={car.image || "/placeholder.svg"}
                                    alt={car.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-medium">{car.title}</h3>
                                  <p className="text-orange-500 font-bold">${car.price.toLocaleString()}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/car/${car.id}`}>View</Link>
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Heart className="h-4 w-4 fill-current" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
