"use client"

import { useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Car, Users, MessageSquare, CreditCard, TrendingUp, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useAnalytics } from "@/components/analytics/analytics-provider"

export default function AdminDashboard() {
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    trackPageView("/admin")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Remove trackPageView from dependencies to prevent infinite loop

  // Mock data for dashboard
  const stats = [
    {
      title: "Total Users",
      value: "2,845",
      change: "+12.5%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Active Listings",
      value: "1,234",
      change: "+7.2%",
      trend: "up",
      icon: Car,
    },
    {
      title: "Messages",
      value: "856",
      change: "+18.3%",
      trend: "up",
      icon: MessageSquare,
    },
    {
      title: "Revenue",
      value: "$24,850",
      change: "+5.4%",
      trend: "up",
      icon: CreditCard,
    },
  ]

  const recentListings = [
    {
      id: 1,
      title: "2023 BMW X5",
      price: 65999,
      seller: "John Smith",
      status: "pending",
      date: "2023-05-18",
    },
    {
      id: 2,
      title: "2022 Tesla Model 3",
      price: 48990,
      seller: "Sarah Johnson",
      status: "approved",
      date: "2023-05-17",
    },
    {
      id: 3,
      title: "2021 Mercedes-Benz GLE",
      price: 61999,
      seller: "Michael Brown",
      status: "pending",
      date: "2023-05-16",
    },
    {
      id: 4,
      title: "2022 Audi Q7",
      price: 59500,
      seller: "Emily Davis",
      status: "rejected",
      date: "2023-05-15",
    },
    {
      id: 5,
      title: "2020 Porsche Cayenne",
      price: 72500,
      seller: "David Wilson",
      status: "approved",
      date: "2023-05-14",
    },
  ]

  const recentUsers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Dealer",
      date: "2023-05-18",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "Private Seller",
      date: "2023-05-17",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "Buyer",
      date: "2023-05-16",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Dealer",
      date: "2023-05-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      role: "Private Seller",
      date: "2023-05-14",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const alerts = [
    {
      id: 1,
      title: "New listing reports",
      description: "3 listings have been reported by users",
      severity: "high",
    },
    {
      id: 2,
      title: "Payment processing issue",
      description: "Payment gateway reported connection issues",
      severity: "medium",
    },
    {
      id: 3,
      title: "System update required",
      description: "New security update available for installation",
      severity: "low",
    },
  ]

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline">Export</Button>
            <Button className="bg-orange-500 hover:bg-orange-600">New Report</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div
                    className={`p-2 rounded-full ${
                      stat.trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <TrendingUp className={`h-4 w-4 mr-1 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`} />
                  <span className={`text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {stat.change} from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Listings</CardTitle>
              <CardDescription>Latest car listings added to the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Title</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Seller</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentListings.map((listing) => (
                      <tr key={listing.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{listing.title}</td>
                        <td className="py-3 px-4">${listing.price.toLocaleString()}</td>
                        <td className="py-3 px-4">{listing.seller}</td>
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
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/listings/${listing.id}`}>View</Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link href="/admin/listings">View All Listings</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
              <CardDescription>System alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-md ${
                      alert.severity === "high"
                        ? "bg-red-50 border border-red-200"
                        : alert.severity === "medium"
                          ? "bg-yellow-50 border border-yellow-200"
                          : "bg-blue-50 border border-blue-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-1 rounded-full ${
                          alert.severity === "high"
                            ? "bg-red-100 text-red-600"
                            : alert.severity === "medium"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{alert.title}</h4>
                        <p className="text-sm text-gray-600">{alert.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest users registered on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Joined</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
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
                      <td className="py-3 px-4">{user.date}</td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/users/${user.id}`}>View</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" asChild>
                <Link href="/admin/users">View All Users</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
