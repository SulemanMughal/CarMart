"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function AdminUsersPage() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for users
  const allUsers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Dealer",
      status: "active",
      date: "2023-05-18",
      avatar: "/placeholder.svg?height=40&width=40",
      listings: 12,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "Private Seller",
      status: "active",
      date: "2023-05-17",
      avatar: "/placeholder.svg?height=40&width=40",
      listings: 3,
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "Buyer",
      status: "active",
      date: "2023-05-16",
      avatar: "/placeholder.svg?height=40&width=40",
      listings: 0,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Dealer",
      status: "suspended",
      date: "2023-05-15",
      avatar: "/placeholder.svg?height=40&width=40",
      listings: 8,
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      role: "Private Seller",
      status: "active",
      date: "2023-05-14",
      avatar: "/placeholder.svg?height=40&width=40",
      listings: 2,
    },
    {
      id: 6,
      name: "Jessica Miller",
      email: "jessica.miller@example.com",
      role: "Buyer",
      status: "inactive",
      date: "2023-05-13",
      avatar: "/placeholder.svg?height=40&width=40",
      listings: 0,
    },
    {
      id: 7,
      name: "Robert Taylor",
      email: "robert.taylor@example.com",
      role: "Dealer",
      status: "active",
      date: "2023-05-12",
      avatar: "/placeholder.svg?height=40&width=40",
      listings: 15,
    },
    {
      id: 8,
      name: "Amanda White",
      email: "amanda.white@example.com",
      role: "Private Seller",
      status: "active",
      date: "2023-05-11",
      avatar: "/placeholder.svg?height=40&width=40",
      listings: 1,
    },
    {
      id: 9,
      name: "Christopher Lee",
      email: "christopher.lee@example.com",
      role: "Dealer",
      status: "active",
      date: "2023-05-10",
      avatar: "/placeholder.svg?height=40&width=40",
      listings: 7,
    },
    {
      id: 10,
      name: "Jennifer Clark",
      email: "jennifer.clark@example.com",
      role: "Buyer",
      status: "inactive",
      date: "2023-05-09",
      avatar: "/placeholder.svg?height=40&width=40",
      listings: 0,
    },
  ]

  // Filter users based on selected filter and search query
  const filteredUsers = allUsers.filter((user) => {
    // Filter by role
    if (filter !== "all" && user.role.toLowerCase() !== filter) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Users</h1>
          <Button className="bg-orange-500 hover:bg-orange-600" asChild>
            <Link href="/admin/users/new">Add New User</Link>
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search users..."
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
                      <SelectValue placeholder="Filter by role" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="dealer">Dealers</SelectItem>
                    <SelectItem value="private seller">Private Sellers</SelectItem>
                    <SelectItem value="buyer">Buyers</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Export</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              Showing {filteredUsers.length} of {allUsers.length} users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Listings</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Joined</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            user.role === "Dealer"
                              ? "bg-purple-500"
                              : user.role === "Private Seller"
                                ? "bg-blue-500"
                                : "bg-green-500"
                          }
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            user.status === "active"
                              ? "bg-green-500"
                              : user.status === "suspended"
                                ? "bg-red-500"
                                : "bg-gray-500"
                          }
                        >
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{user.listings}</td>
                      <td className="py-3 px-4">{user.date}</td>
                      <td className="py-3 px-4">
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
                              <Link href={`/admin/users/${user.id}`}>View Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/users/${user.id}/edit`}>Edit</Link>
                            </DropdownMenuItem>
                            {user.status === "active" ? (
                              <DropdownMenuItem className="text-yellow-500">Suspend</DropdownMenuItem>
                            ) : user.status === "suspended" ? (
                              <DropdownMenuItem className="text-green-500">Reactivate</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-500">Activate</DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No users found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredUsers.length}</span> of{" "}
                <span className="font-medium">{allUsers.length}</span> users
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
