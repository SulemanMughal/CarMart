"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useMessaging } from "@/lib/messaging-context"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { Car, Send, ImageIcon, Paperclip, Phone, Video } from "lucide-react"
import { useAnalytics } from "@/components/analytics/analytics-provider"

export default function ConversationPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { conversations, messages, currentConversation, setCurrentConversation, sendMessage, markConversationAsRead } =
    useMessaging()
  const [messageText, setMessageText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { trackPageView } = useAnalytics()

  // Find the current conversation
  const conversation = conversations.find((c) => c.id === id)
  const conversationMessages = messages[id] || []

  // Get the other participant (not the current user)
  const otherParticipant = conversation?.participants.find((p) => p.id !== 1) // Assuming current user id is 1

  useEffect(() => {
    // Only track page view once when the component mounts or ID changes
    trackPageView(`/messages/${id}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]) // Only depend on id, not trackPageView

  // Set current conversation when component mounts
  useEffect(() => {
    if (currentConversation !== id) {
      setCurrentConversation(id)
    }

    // Only mark as read if there are unread messages
    const conv = conversations.find((c) => c.id === id)
    if (conv && conv.unreadCount > 0) {
      markConversationAsRead(id)
    }

    // Cleanup when component unmounts
    return () => {
      setCurrentConversation(null)
    }
  }, [id, setCurrentConversation, markConversationAsRead, currentConversation, conversations])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversationMessages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim()) return

    sendMessage(id, messageText)
    setMessageText("")
  }

  if (!conversation || !otherParticipant) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <section className="py-12 flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Conversation not found</h1>
            <p className="text-gray-500 mb-6">This conversation doesn't exist or you don't have access to it.</p>
            <Button asChild>
              <Link href="/messages">Back to Messages</Link>
            </Button>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="py-6 flex-grow bg-gray-50">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Conversations list */}
            <div className="md:col-span-1">
              <Card className="h-full">
                <CardContent className="p-0">
                  <div className="p-4 border-b">
                    <h2 className="font-bold text-lg">Messages</h2>
                  </div>
                  <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
                    {conversations.map((conv) => {
                      const participant = conv.participants.find((p) => p.id !== 1) // Assuming current user id is 1
                      if (!participant) return null

                      return (
                        <Link key={conv.id} href={`/messages/${conv.id}`}>
                          <div
                            className={`p-4 border-b hover:bg-gray-50 transition-colors ${
                              conv.id === id ? "bg-orange-50" : ""
                            }`}
                          >
                            <div className="flex gap-3">
                              <div className="relative">
                                <Avatar>
                                  <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                                  <AvatarFallback>
                                    {participant.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                {participant.isOnline && (
                                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <p className="font-medium truncate">{participant.name}</p>
                                  {conv.lastMessage && (
                                    <p className="text-xs text-gray-500">
                                      {formatDistanceToNow(new Date(conv.lastMessage.timestamp), {
                                        addSuffix: false,
                                      })}
                                    </p>
                                  )}
                                </div>
                                <div className="flex justify-between items-center">
                                  {conv.lastMessage && (
                                    <p className="text-sm text-gray-600 truncate">
                                      {conv.lastMessage.senderId === 1 ? "You: " : ""}
                                      {conv.lastMessage.content}
                                    </p>
                                  )}
                                  {conv.unreadCount > 0 && <Badge className="bg-orange-500">{conv.unreadCount}</Badge>}
                                </div>
                                {conv.listingTitle && (
                                  <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                    <Car className="h-3 w-3" />
                                    <span className="truncate">{conv.listingTitle}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat area */}
            <div className="md:col-span-3">
              <Card className="h-full flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={otherParticipant.avatar || "/placeholder.svg"} alt={otherParticipant.name} />
                        <AvatarFallback>
                          {otherParticipant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {otherParticipant.isOnline && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{otherParticipant.name}</p>
                      <p className="text-xs text-gray-500">
                        {otherParticipant.isOnline
                          ? "Online"
                          : otherParticipant.lastSeen
                            ? `Last seen ${formatDistanceToNow(new Date(otherParticipant.lastSeen), {
                                addSuffix: true,
                              })}`
                            : "Offline"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" title="Call">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Video Call">
                      <Video className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {conversation.listingTitle && (
                  <div className="p-3 bg-gray-50 border-b">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">
                        Conversation about:{" "}
                        <Link
                          href={`/car/${conversation.listingId}`}
                          className="font-medium text-orange-500 hover:underline"
                        >
                          {conversation.listingTitle}
                        </Link>
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-350px)]">
                  {conversationMessages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    <>
                      {/* Date separator */}
                      <div className="flex items-center justify-center">
                        <Separator className="flex-grow" />
                        <span className="mx-2 text-xs text-gray-500">
                          {new Date(conversationMessages[0].timestamp).toLocaleDateString()}
                        </span>
                        <Separator className="flex-grow" />
                      </div>

                      {/* Messages */}
                      {conversationMessages.map((message, index) => {
                        const isCurrentUser = message.senderId === 1 // Assuming current user id is 1
                        const sender = conversation.participants.find((p) => p.id === message.senderId)

                        // Check if we need a date separator
                        const showDateSeparator =
                          index > 0 &&
                          new Date(message.timestamp).toLocaleDateString() !==
                            new Date(conversationMessages[index - 1].timestamp).toLocaleDateString()

                        return (
                          <div key={message.id}>
                            {showDateSeparator && (
                              <div className="flex items-center justify-center my-4">
                                <Separator className="flex-grow" />
                                <span className="mx-2 text-xs text-gray-500">
                                  {new Date(message.timestamp).toLocaleDateString()}
                                </span>
                                <Separator className="flex-grow" />
                              </div>
                            )}

                            <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}>
                              {!isCurrentUser && (
                                <Avatar className="mr-2 mt-1">
                                  <AvatarImage src={sender?.avatar || "/placeholder.svg"} alt={sender?.name} />
                                  <AvatarFallback>
                                    {sender?.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div
                                className={`max-w-[70%] ${
                                  isCurrentUser
                                    ? "bg-orange-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg"
                                    : "bg-gray-100 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg"
                                } p-3 shadow-sm`}
                              >
                                <p>{message.content}</p>
                                <p className={`text-xs mt-1 ${isCurrentUser ? "text-orange-100" : "text-gray-500"}`}>
                                  {new Date(message.timestamp).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                  {isCurrentUser && <span className="ml-1">{message.read ? "✓✓" : "✓"}</span>}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Button type="button" variant="ghost" size="icon" className="text-gray-500" title="Attach image">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="text-gray-500" title="Attach file">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600" disabled={!messageText.trim()}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
