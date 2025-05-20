"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useNotifications, type NotificationType } from "@/components/notifications/notification-provider"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { Trash2 } from "lucide-react"

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications } = useNotifications()
  const [activeTab, setActiveTab] = useState<"all" | NotificationType>("all")

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    return notification.type === activeTab
  })

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "message":
        return "💬"
      case "listing":
        return "🚗"
      case "offer":
        return "💰"
      case "system":
        return "🔔"
      case "payment":
        return "💳"
      default:
        return "📣"
    }
  }

  const handleNotificationClick = (id: string) => {
    markAsRead(id)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="py-12 flex-grow bg-gray-50">
        <div className="container max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Notifications</h1>
            <Button variant="outline" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>All Notifications</CardTitle>
                  <CardDescription>
                    You have {notifications.filter((n) => !n.read).length} unread notifications
                  </CardDescription>
                </div>
                <Button variant="ghost" className="text-red-500" onClick={clearAllNotifications}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="message">Messages</TabsTrigger>
                  <TabsTrigger value="offer">Offers</TabsTrigger>
                  <TabsTrigger value="listing">Listings</TabsTrigger>
                  <TabsTrigger value="payment">Payments</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab}>
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-5xl mb-4">📭</div>
                      <h3 className="text-lg font-medium mb-2">No notifications</h3>
                      <p className="text-gray-500">You don't have any notifications in this category</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
                            !notification.read ? "bg-orange-50 border-orange-200" : ""
                          }`}
                        >
                          <Link
                            href={notification.actionUrl || "#"}
                            className="block"
                            onClick={() => handleNotificationClick(notification.id)}
                          >
                            <div className="flex gap-4">
                              {notification.sender ? (
                                <Avatar className="h-12 w-12">
                                  <AvatarImage
                                    src={notification.sender.avatar || "/placeholder.svg"}
                                    alt={notification.sender.name}
                                  />
                                  <AvatarFallback>
                                    {notification.sender.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              ) : (
                                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-xl">
                                  {getNotificationIcon(notification.type)}
                                </div>
                              )}
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{notification.title}</p>
                                    <p className="text-gray-600">{notification.message}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      className={
                                        notification.type === "message"
                                          ? "bg-blue-500"
                                          : notification.type === "offer"
                                            ? "bg-green-500"
                                            : notification.type === "listing"
                                              ? "bg-purple-500"
                                              : notification.type === "payment"
                                                ? "bg-yellow-500"
                                                : "bg-gray-500"
                                      }
                                    >
                                      {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                                    </Badge>
                                    {!notification.read && <div className="h-3 w-3 rounded-full bg-orange-500"></div>}
                                  </div>
                                </div>
                                <p className="text-gray-400 text-sm mt-1">
                                  {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                                </p>
                              </div>
                            </div>
                          </Link>
                          <div className="flex justify-end mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </main>
  )
}
