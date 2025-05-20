"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type NotificationType = "message" | "listing" | "offer" | "system" | "payment"

export type Notification = {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: number
  read: boolean
  actionUrl?: string
  sender?: {
    id: number
    name: string
    avatar?: string
  }
}

type NotificationContextType = {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Load notifications from localStorage on mount
  useEffect(() => {
    const storedNotifications = localStorage.getItem("autodecar_notifications")
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications))
    } else {
      // Add some sample notifications for demo purposes
      setNotifications([
        {
          id: "1",
          type: "message",
          title: "New message from John Smith",
          message: "Hello, I'm interested in your BMW X5. Is it still available?",
          timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
          read: false,
          actionUrl: "/messages/1",
          sender: {
            id: 1,
            name: "John Smith",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        },
        {
          id: "2",
          type: "offer",
          title: "New offer on your listing",
          message: "Sarah Johnson made an offer of $28,500 for your Honda Accord",
          timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
          read: false,
          actionUrl: "/offers/2",
          sender: {
            id: 2,
            name: "Sarah Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        },
        {
          id: "3",
          type: "listing",
          title: "Listing approved",
          message: "Your listing for 2021 Toyota Camry has been approved",
          timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
          read: true,
          actionUrl: "/car/3",
        },
        {
          id: "4",
          type: "system",
          title: "Welcome to AutoDecar",
          message: "Thank you for joining AutoDecar. Start exploring cars or list your own!",
          timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
          read: true,
        },
        {
          id: "5",
          type: "payment",
          title: "Payment successful",
          message: "Your payment for the premium listing has been processed successfully",
          timestamp: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
          read: true,
          actionUrl: "/payments/5",
        },
      ])
    }
  }, [])

  // Save notifications to localStorage when updated
  useEffect(() => {
    localStorage.setItem("autodecar_notifications", JSON.stringify(notifications))
  }, [notifications])

  // Calculate unread count
  const unreadCount = notifications.filter((notification) => !notification.read).length

  // Add a new notification
  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: Date.now(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  // Delete a notification
  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
