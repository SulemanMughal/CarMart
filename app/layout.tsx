import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ComparisonProvider } from "@/lib/comparison-context"
import { AnalyticsProvider } from "@/components/analytics/analytics-provider"
import { NotificationProvider } from "@/components/notifications/notification-provider"
import { MessagingProvider } from "@/lib/messaging-context"
import { PaymentProvider } from "@/lib/payment-context"
import { ReviewProvider } from "@/lib/review-context"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AutoDecar - Car Dealer & Rental Listing",
  description: "Find your perfect car with AutoDecar",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AnalyticsProvider>
            <NotificationProvider>
              <MessagingProvider>
                <PaymentProvider>
                  <ReviewProvider>
                    <ComparisonProvider>
                      <Suspense fallback={"Loading..."}>{children}</Suspense>
                    </ComparisonProvider>
                  </ReviewProvider>
                </PaymentProvider>
              </MessagingProvider>
            </NotificationProvider>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
