"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useNotifications } from "@/components/notifications/notification-provider"

export type Message = {
  id: string
  conversationId: string
  senderId: number
  receiverId: number
  content: string
  timestamp: number
  read: boolean
  attachments?: {
    type: "image" | "document"
    url: string
    name: string
  }[]
}

export type Conversation = {
  id: string
  participants: {
    id: number
    name: string
    avatar?: string
    isOnline?: boolean
    lastSeen?: number
  }[]
  lastMessage?: {
    content: string
    timestamp: number
    senderId: number
  }
  unreadCount: number
  listingId?: number
  listingTitle?: string
}

type MessagingContextType = {
  conversations: Conversation[]
  messages: Record<string, Message[]>
  currentConversation: string | null
  setCurrentConversation: (id: string | null) => void
  sendMessage: (conversationId: string, content: string, attachments?: any[]) => void
  markConversationAsRead: (conversationId: string) => void
  startNewConversation: (
    participants: { id: number; name: string; avatar?: string }[],
    listingId?: number,
    listingTitle?: string,
  ) => string
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined)

// Mock current user
const currentUser = {
  id: 1,
  name: "Current User",
  avatar: "/placeholder.svg?height=40&width=40",
}

export function MessagingProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Record<string, Message[]>>({})
  const [currentConversation, setCurrentConversation] = useState<string | null>(null)
  const { addNotification } = useNotifications()

  // Load conversations and messages from localStorage on mount
  useEffect(() => {
    const storedConversations = localStorage.getItem("autodecar_conversations")
    const storedMessages = localStorage.getItem("autodecar_messages")

    if (storedConversations) {
      setConversations(JSON.parse(storedConversations))
    } else {
      // Add sample conversations for demo
      const sampleConversations: Conversation[] = [
        {
          id: "1",
          participants: [
            {
              id: 1,
              name: "Current User",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            {
              id: 2,
              name: "John Smith",
              avatar: "/placeholder.svg?height=40&width=40",
              isOnline: true,
            },
          ],
          lastMessage: {
            content: "Hello, I'm interested in your BMW X5. Is it still available?",
            timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
            senderId: 2,
          },
          unreadCount: 1,
          listingId: 1,
          listingTitle: "2023 BMW X5",
        },
        {
          id: "2",
          participants: [
            {
              id: 1,
              name: "Current User",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            {
              id: 3,
              name: "Sarah Johnson",
              avatar: "/placeholder.svg?height=40&width=40",
              isOnline: false,
              lastSeen: Date.now() - 1000 * 60 * 15, // 15 minutes ago
            },
          ],
          lastMessage: {
            content: "I'd like to schedule a test drive for tomorrow. Is that possible?",
            timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
            senderId: 1,
          },
          unreadCount: 0,
          listingId: 2,
          listingTitle: "2022 Tesla Model 3",
        },
        {
          id: "3",
          participants: [
            {
              id: 1,
              name: "Current User",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            {
              id: 4,
              name: "Michael Brown",
              avatar: "/placeholder.svg?height=40&width=40",
              isOnline: false,
              lastSeen: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago
            },
          ],
          lastMessage: {
            content: "Thanks for the information. I'll get back to you soon.",
            timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
            senderId: 4,
          },
          unreadCount: 0,
          listingId: 3,
          listingTitle: "2021 Mercedes-Benz GLE",
        },
      ]
      setConversations(sampleConversations)
    }

    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    } else {
      // Add sample messages for demo
      const sampleMessages: Record<string, Message[]> = {
        "1": [
          {
            id: "1-1",
            conversationId: "1",
            senderId: 2,
            receiverId: 1,
            content: "Hello, I'm interested in your BMW X5. Is it still available?",
            timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
            read: false,
          },
        ],
        "2": [
          {
            id: "2-1",
            conversationId: "2",
            senderId: 3,
            receiverId: 1,
            content: "Hi, I saw your Tesla Model 3 listing and I'm very interested.",
            timestamp: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
            read: true,
          },
          {
            id: "2-2",
            conversationId: "2",
            senderId: 1,
            receiverId: 3,
            content: "Hello Sarah! Yes, the Tesla is still available. Would you like to see it in person?",
            timestamp: Date.now() - 1000 * 60 * 60 * 2.5, // 2.5 hours ago
            read: true,
          },
          {
            id: "2-3",
            conversationId: "2",
            senderId: 3,
            receiverId: 1,
            content: "That would be great! When would be a good time?",
            timestamp: Date.now() - 1000 * 60 * 60 * 2.2, // 2.2 hours ago
            read: true,
          },
          {
            id: "2-4",
            conversationId: "2",
            senderId: 1,
            receiverId: 3,
            content: "I'd like to schedule a test drive for tomorrow. Is that possible?",
            timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
            read: true,
          },
        ],
        "3": [
          {
            id: "3-1",
            conversationId: "3",
            senderId: 1,
            receiverId: 4,
            content: "Hi Michael, I'm interested in your Mercedes-Benz GLE. Can you tell me more about its condition?",
            timestamp: Date.now() - 1000 * 60 * 60 * 25, // 25 hours ago
            read: true,
          },
          {
            id: "3-2",
            conversationId: "3",
            senderId: 4,
            receiverId: 1,
            content:
              "Hello! The car is in excellent condition. It has only 15,000 miles and has been regularly serviced at the dealership. No accidents or major repairs.",
            timestamp: Date.now() - 1000 * 60 * 60 * 24.5, // 24.5 hours ago
            read: true,
          },
          {
            id: "3-3",
            conversationId: "3",
            senderId: 1,
            receiverId: 4,
            content: "That sounds great. What about the interior? Any wear and tear?",
            timestamp: Date.now() - 1000 * 60 * 60 * 24.2, // 24.2 hours ago
            read: true,
          },
          {
            id: "3-4",
            conversationId: "3",
            senderId: 4,
            receiverId: 1,
            content:
              "The interior is like new. No stains or tears on the leather seats. All electronics work perfectly.",
            timestamp: Date.now() - 1000 * 60 * 60 * 24.1, // 24.1 hours ago
            read: true,
          },
          {
            id: "3-5",
            conversationId: "3",
            senderId: 4,
            receiverId: 1,
            content: "Thanks for the information. I'll get back to you soon.",
            timestamp: Date.now() - 1000 * 60 * 60 * 24, // 24 hours ago
            read: true,
          },
        ],
      }
      setMessages(sampleMessages)
    }
  }, [])

  // Save conversations and messages to localStorage when updated
  useEffect(() => {
    localStorage.setItem("autodecar_conversations", JSON.stringify(conversations))
  }, [conversations])

  useEffect(() => {
    localStorage.setItem("autodecar_messages", JSON.stringify(messages))
  }, [messages])

  // Send a new message
  const sendMessage = (conversationId: string, content: string, attachments?: any[]) => {
    const conversation = conversations.find((c) => c.id === conversationId)
    if (!conversation) return

    const receiver = conversation.participants.find((p) => p.id !== currentUser.id)
    if (!receiver) return

    const newMessage: Message = {
      id: `${conversationId}-${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      receiverId: receiver.id,
      content,
      timestamp: Date.now(),
      read: false,
      attachments: attachments?.map((attachment) => ({
        type: attachment.type,
        url: attachment.url,
        name: attachment.name,
      })),
    }

    // Update messages
    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage],
    }))

    // Update conversation with last message
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              lastMessage: {
                content,
                timestamp: Date.now(),
                senderId: currentUser.id,
              },
              unreadCount: 0, // Reset unread count for current user's messages
            }
          : c,
      ),
    )

    // Simulate receiving a reply after a delay (for demo purposes)
    setTimeout(
      () => {
        const replyContent = getRandomReply()
        const replyMessage: Message = {
          id: `${conversationId}-${Date.now()}`,
          conversationId,
          senderId: receiver.id,
          receiverId: currentUser.id,
          content: replyContent,
          timestamp: Date.now(),
          read: false,
        }

        // Update messages
        setMessages((prev) => ({
          ...prev,
          [conversationId]: [...(prev[conversationId] || []), replyMessage],
        }))

        // Update conversation with last message and increment unread count
        setConversations((prev) =>
          prev.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  lastMessage: {
                    content: replyContent,
                    timestamp: Date.now(),
                    senderId: receiver.id,
                  },
                  unreadCount: currentConversation === conversationId ? 0 : c.unreadCount + 1,
                }
              : c,
          ),
        )

        // Add notification if not in the current conversation
        if (currentConversation !== conversationId) {
          addNotification({
            type: "message",
            title: `New message from ${receiver.name}`,
            message: replyContent,
            actionUrl: `/messages/${conversationId}`,
            sender: {
              id: receiver.id,
              name: receiver.name,
              avatar: receiver.avatar,
            },
          })
        }
      },
      2000 + Math.random() * 3000,
    ) // Random delay between 2-5 seconds
  }

  // Mark a conversation as read
  const markConversationAsRead = (conversationId: string) => {
    // Update conversation unread count
    setConversations((prev) => prev.map((c) => (c.id === conversationId ? { ...c, unreadCount: 0 } : c)))

    // Mark all messages in the conversation as read
    setMessages((prev) => {
      if (!prev[conversationId]) return prev

      return {
        ...prev,
        [conversationId]: prev[conversationId].map((message) => ({
          ...message,
          read: true,
        })),
      }
    })
  }

  // Start a new conversation
  const startNewConversation = (
    participants: { id: number; name: string; avatar?: string }[],
    listingId?: number,
    listingTitle?: string,
  ) => {
    // Make sure current user is included in participants
    const allParticipants = [...participants.filter((p) => p.id !== currentUser.id), currentUser]

    const newConversationId = `new-${Date.now()}`
    const newConversation: Conversation = {
      id: newConversationId,
      participants: allParticipants,
      unreadCount: 0,
      listingId,
      listingTitle,
    }

    setConversations((prev) => [newConversation, ...prev])
    return newConversationId
  }

  // Helper function to generate random replies (for demo purposes)
  const getRandomReply = () => {
    const replies = [
      "Yes, it's still available!",
      "When would you like to see it?",
      "I can offer a small discount if you're interested.",
      "Do you have any specific questions about the car?",
      "I've had it for 2 years and it's been very reliable.",
      "The car is in excellent condition.",
      "Would you like to schedule a test drive?",
      "I have all the service records available.",
      "Are you looking to finance or pay cash?",
      "I'm flexible on the price, make me an offer!",
    ]
    return replies[Math.floor(Math.random() * replies.length)]
  }

  return (
    <MessagingContext.Provider
      value={{
        conversations,
        messages,
        currentConversation,
        setCurrentConversation,
        sendMessage,
        markConversationAsRead,
        startNewConversation,
      }}
    >
      {children}
    </MessagingContext.Provider>
  )
}

export function useMessaging() {
  const context = useContext(MessagingContext)
  if (context === undefined) {
    throw new Error("useMessaging must be used within a MessagingProvider")
  }
  return context
}
