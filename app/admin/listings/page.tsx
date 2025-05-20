"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Check, X, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function AdminListingsPage() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for listings
  const allListings = [
    {
      id: 1,
      title: "2023 BMW X5",
      price: 65999,
      seller: "John Smith",
      sellerType: "Dealer",
      status: "pending",
      date: "2023-05-18",
      featured: false,
      reported: false,
    },
    {
      id: 2,
      title: "2022 Tesla Model 3",
      price: 48990,
      seller: "Sarah Johnson",
      sellerType: "Private",
      status: "approved",
      date: "2023-05-17",
      featured: true,
      reported: false,
    },
    {
      id: 3,
      title: "2021 Mercedes-Benz GLE",
      price: 61999,
      seller: "Michael Brown",
      sellerType: "Dealer",
      status: "pending",
      date: "2023-05-16",
      featured: false,
      reported: true,
    },
    {
      id: 4,
      title: "2022 Audi Q7",
      price: 59500,
      seller: "Emily Davis",
      sellerType: "Private",
      status: "rejected",
      date: "2023-05-15",
      featured: false,
      reported: false,
    },
    {
      id: 5,
      title: "2020 Porsche Cayenne",
      price: 72500,
      seller: "David Wilson",
      sellerType: "Dealer",
      status: "approved",
      date: "2023-05-14",
      featured: true,
      reported: false,
    },
    {
      id: 6,
      title: "2021 Ford Mustang GT",
      price: 45999,
      seller: "Jessica Miller",
      sellerType: "Private",
      status: "approved",
      date: "2023-05-13",
      featured: false,
      reported: false,
    },
    {
      id: 7,
      title: "2022 Chevrolet Camaro",
      price: 42500,
      seller: "Robert Taylor",
      sellerType: "Dealer",
      status: "pending",
      date: "2023-05-12",
      featured: false,
      reported: true,
    },
    {
      id: 8,
      title: "2023 Honda Civic",
      price: 28990,
      seller: "Amanda White",
      sellerType: "Private",
      status: "approved",
      date: "2023-05-11",
      featured: false,
      reported: false,
    },
    {
      id: 9,
      title: "2022 Toyota RAV4",
      price: 32999,
      seller: "Christopher Lee",
      sellerType: "Dealer",
      status: "approved",
      date: "2023-05-10",
      featured: true,
      reported: false,
    },
    {
      id: 10,
      title: "2021 Nissan Altima",
      price: 26500,
      seller: "Jennifer Clark",
      sellerType: "Private",
      status: "rejected",
      date: "2023-05-09",
      featured: false,
      reported: false,
    },
  ]

  // Filter listings based on selected filter and search query
  const filteredListings = allListings.filter((listing) => {
    // Filter by status
    if (filter !== "all" && listing.status !== filter) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !listing.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !listing.seller.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const approveListing = (id: number) => {
    // In a real app, you would call an API to update the listing status
    console.log(`Approving listing ${id}`)
  }

  const rejectListing = (id: number) => {
    // In a real app, you would call an API to update the listing status
    console.log(`Rejecting listing ${id}`)
  }

  const toggleFeatured = (id: number) => {
    // In a real app, you would call an API to toggle the featured status
    console.log(`Toggling featured status for listing ${id}`)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Car Listings</h1>
          <Button className="bg-orange-500 hover:bg-orange-600" asChild>
            <Link href="/admin/listings/new">Add New Listing</Link>
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search listings..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Listings</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Export</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Listings</CardTitle>
            <CardDescription>
              Showing {filteredListings.length} of {allListings.length} listings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Title</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Seller</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.map((listing) => (
                    <tr key={listing.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {listing.title}
                          {listing.featured && (
                            <Badge className="bg-orange-500" variant="secondary">
                              Featured
                            </Badge>
                          )}
                          {listing.reported && (
                            <Badge className="bg-red-500" variant="secondary">
                              Reported
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">${listing.price.toLocaleString()}</td>
                      <td className="py-3 px-4">{listing.seller}</td>
                      <td className="py-3 px-4">
                        <Badge className={listing.sellerType === "Dealer" ? "bg-purple-500" : "bg-blue-500"}>
                          {listing.sellerType}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            listing.status === "approved"
                              ? "bg-green-500"
                              : listing.status === "pending"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }
                        >
                          {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{listing.date}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {listing.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-500 hover:text-green-600 hover:bg-green-50"
                                onClick={() => approveListing(listing.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => rejectListing(listing.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/listings/${listing.id}`}>View Details</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/listings/${listing.id}/edit`}>Edit</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleFeatured(listing.id)}>
                                {listing.featured ? "Remove Featured" : "Mark as Featured"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredListings.length === 0 && (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No listings found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredListings.length}</span> of{" "}
                <span className="font-medium">{allListings.length}</span> listings
              </div>
              <div className="flex gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
