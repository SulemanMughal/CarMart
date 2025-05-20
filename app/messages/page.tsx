"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useMessaging } from "@/lib/messaging-context"
import { useRouter } from "next/navigation"
import { useAnalytics } from "@/components/analytics/analytics-provider"

export default function MessagesPage() {
  const { conversations, setCurrentConversation } = useMessaging()
  const router = useRouter()
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    trackPageView("/messages")
  }, [trackPageView])

  useEffect(() => {
    // Redirect to the first conversation if available
    if (conversations.length > 0) {
      router.push(`/messages/${conversations[0].id}`)
    }
  }, [conversations, router])

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="py-12 flex-grow bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Messages</h1>
          <p className="text-gray-500 mb-6">
            {conversations.length > 0 ? "Loading your conversations..." : "You don't have any conversations yet."}
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
