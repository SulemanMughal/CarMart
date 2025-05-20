"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type PageView = {
  page: string
  timestamp: number
}

type ListingView = {
  listingId: number
  title: string
  timestamp: number
}

type SearchQuery = {
  query: string
  filters: Record<string, string>
  timestamp: number
}

type UserInteraction = {
  type: "favorite" | "compare" | "contact" | "share"
  itemId: number
  timestamp: number
}

type AnalyticsContextType = {
  trackPageView: (page: string) => void
  trackListingView: (listingId: number, title: string) => void
  trackSearch: (query: string, filters: Record<string, string>) => void
  trackInteraction: (type: "favorite" | "compare" | "contact" | "share", itemId: number) => void
  pageViews: PageView[]
  listingViews: ListingView[]
  searchQueries: SearchQuery[]
  userInteractions: UserInteraction[]
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [pageViews, setPageViews] = useState<PageView[]>([])
  const [listingViews, setListingViews] = useState<ListingView[]>([])
  const [searchQueries, setSearchQueries] = useState<SearchQuery[]>([])
  const [userInteractions, setUserInteractions] = useState<UserInteraction[]>([])

  // Load analytics data from localStorage on mount
  useEffect(() => {
    const storedPageViews = localStorage.getItem("autodecar_pageViews")
    const storedListingViews = localStorage.getItem("autodecar_listingViews")
    const storedSearchQueries = localStorage.getItem("autodecar_searchQueries")
    const storedUserInteractions = localStorage.getItem("autodecar_userInteractions")

    if (storedPageViews) setPageViews(JSON.parse(storedPageViews))
    if (storedListingViews) setListingViews(JSON.parse(storedListingViews))
    if (storedSearchQueries) setSearchQueries(JSON.parse(storedSearchQueries))
    if (storedUserInteractions) setUserInteractions(JSON.parse(storedUserInteractions))
  }, [])

  // Save analytics data to localStorage when updated
  useEffect(() => {
    localStorage.setItem("autodecar_pageViews", JSON.stringify(pageViews))
  }, [pageViews])

  useEffect(() => {
    localStorage.setItem("autodecar_listingViews", JSON.stringify(listingViews))
  }, [listingViews])

  useEffect(() => {
    localStorage.setItem("autodecar_searchQueries", JSON.stringify(searchQueries))
  }, [searchQueries])

  useEffect(() => {
    localStorage.setItem("autodecar_userInteractions", JSON.stringify(userInteractions))
  }, [userInteractions])

  // Track page view
  const trackPageView = (page: string) => {
    setPageViews((prev) => [...prev, { page, timestamp: Date.now() }])

    // In a real app, you would send this to your analytics service
    console.log(`Page viewed: ${page}`)
  }

  // Track listing view
  const trackListingView = (listingId: number, title: string) => {
    setListingViews((prev) => [...prev, { listingId, title, timestamp: Date.now() }])

    // In a real app, you would send this to your analytics service
    console.log(`Listing viewed: ${title} (ID: ${listingId})`)
  }

  // Track search query
  const trackSearch = (query: string, filters: Record<string, string>) => {
    setSearchQueries((prev) => [...prev, { query, filters, timestamp: Date.now() }])

    // In a real app, you would send this to your analytics service
    console.log(`Search performed: ${query}`, filters)
  }

  // Track user interaction
  const trackInteraction = (type: "favorite" | "compare" | "contact" | "share", itemId: number) => {
    setUserInteractions((prev) => [...prev, { type, itemId, timestamp: Date.now() }])

    // In a real app, you would send this to your analytics service
    console.log(`User interaction: ${type} on item ${itemId}`)
  }

  return (
    <AnalyticsContext.Provider
      value={{
        trackPageView,
        trackListingView,
        trackSearch,
        trackInteraction,
        pageViews,
        listingViews,
        searchQueries,
        userInteractions,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider")
  }
  return context
}
