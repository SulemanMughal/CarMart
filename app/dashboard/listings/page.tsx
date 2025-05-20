import Link from "next/link"
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UserListingsPage() {
  // Mock data for user listings
  const activeListings = [
    {
      id: "1",
      title: "BMW 3 Series 2020",
      price: "$32,500",
      views: 245,
      inquiries: 12,
      status: "active",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "Mercedes-Benz C-Class 2019",
      price: "$29,900",
      views: 187,
      inquiries: 8,
      status: "active",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const pendingListings = [
    {
      id: "3",
      title: "Audi A4 2020",
      price: "$31,200",
      views: 0,
      inquiries: 0,
      status: "pending",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const expiredListings = [
    {
      id: "4",
      title: "Toyota Camry 2018",
      price: "$18,500",
      views: 320,
      inquiries: 15,
      status: "expired",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Listings</h1>
        <Button asChild>
          <Link href="/add-listing">
            <Plus className="mr-2 h-4 w-4" /> Add New Listing
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active ({activeListings.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingListings.length})</TabsTrigger>
          <TabsTrigger value="expired">Expired ({expiredListings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeListings.map((listing) => (
              <Card key={listing.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{listing.title}</CardTitle>
                      <CardDescription>{listing.price}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/edit-listing/${listing.id}`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video mb-4 overflow-hidden rounded-md">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Views</p>
                      <p className="font-medium">{listing.views}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Inquiries</p>
                      <p className="font-medium">{listing.inquiries}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingListings.map((listing) => (
              <Card key={listing.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{listing.title}</CardTitle>
                      <CardDescription>{listing.price}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/edit-listing/${listing.id}`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video mb-4 overflow-hidden rounded-md">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="bg-amber-50 text-amber-800 p-2 rounded text-sm">
                    This listing is pending approval. We'll notify you once it's approved.
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="expired">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expiredListings.map((listing) => (
              <Card key={listing.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{listing.title}</CardTitle>
                      <CardDescription>{listing.price}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Renew Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video mb-4 overflow-hidden rounded-md">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="h-full w-full object-cover opacity-70"
                    />
                  </div>
                  <div className="bg-slate-100 p-2 rounded text-sm">
                    This listing has expired. Renew it to make it visible again.
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
