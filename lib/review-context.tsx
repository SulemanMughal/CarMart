"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useNotifications } from "@/components/notifications/notification-provider"

export type Review = {
  id: string
  listingId: number
  userId: number
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  date: number
  helpful: number
  notHelpful: number
  userHelpfulVotes: Record<string, boolean>
  sellerResponse?: {
    comment: string
    date: number
  }
}

type ReviewContextType = {
  reviews: Review[]
  addReview: (review: Omit<Review, "id" | "date" | "helpful" | "notHelpful" | "userHelpfulVotes">) => void
  updateReview: (id: string, review: Partial<Review>) => void
  deleteReview: (id: string) => void
  addSellerResponse: (reviewId: string, comment: string) => void
  markHelpful: (reviewId: string, isHelpful: boolean) => void
  getReviewsForListing: (listingId: number) => Review[]
  getUserReviews: (userId: number) => Review[]
  getAverageRatingForListing: (listingId: number) => number
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined)

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const { addNotification } = useNotifications()

  // Load reviews from localStorage on mount
  useEffect(() => {
    const storedReviews = localStorage.getItem("autodecar_reviews")
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews))
    } else {
      // Add sample reviews for demo
      setReviews([
        {
          id: "1",
          listingId: 1,
          userId: 2,
          userName: "John Smith",
          userAvatar: "/placeholder.svg?height=40&width=40",
          rating: 5,
          title: "Excellent car, great condition!",
          comment:
            "I recently purchased this BMW X5 and I'm extremely satisfied. The car was exactly as described, in pristine condition. The seller was very professional and made the transaction smooth.",
          date: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
          helpful: 12,
          notHelpful: 2,
          userHelpfulVotes: {},
          sellerResponse: {
            comment: "Thank you for your kind review! It was a pleasure doing business with you.",
            date: Date.now() - 1000 * 60 * 60 * 24 * 4, // 4 days ago
          },
        },
        {
          id: "2",
          listingId: 1,
          userId: 3,
          userName: "Sarah Johnson",
          userAvatar: "/placeholder.svg?height=40&width=40",
          rating: 4,
          title: "Great car, minor issues",
          comment:
            "The BMW X5 is a fantastic vehicle overall. There were a few minor scratches not mentioned in the listing, but nothing major. The seller was responsive and helpful throughout the process.",
          date: Date.now() - 1000 * 60 * 60 * 24 * 10, // 10 days ago
          helpful: 8,
          notHelpful: 1,
          userHelpfulVotes: {},
        },
        {
          id: "3",
          listingId: 2,
          userId: 4,
          userName: "Michael Brown",
          userAvatar: "/placeholder.svg?height=40&width=40",
          rating: 5,
          title: "Perfect Tesla Model 3!",
          comment:
            "This Tesla Model 3 exceeded my expectations. The car was in immaculate condition, and the seller provided all the necessary documentation. The transaction was smooth and hassle-free.",
          date: Date.now() - 1000 * 60 * 60 * 24 * 7, // 7 days ago
          helpful: 15,
          notHelpful: 0,
          userHelpfulVotes: {},
          sellerResponse: {
            comment: "Thank you for your review! Enjoy your new Tesla!",
            date: Date.now() - 1000 * 60 * 60 * 24 * 6, // 6 days ago
          },
        },
      ])
    }
  }, [])

  // Save reviews to localStorage when updated
  useEffect(() => {
    localStorage.setItem("autodecar_reviews", JSON.stringify(reviews))
  }, [reviews])

  // Add a new review
  const addReview = (review: Omit<Review, "id" | "date" | "helpful" | "notHelpful" | "userHelpfulVotes">) => {
    const newReview: Review = {
      ...review,
      id: `review_${Date.now()}`,
      date: Date.now(),
      helpful: 0,
      notHelpful: 0,
      userHelpfulVotes: {},
    }

    setReviews((prev) => [...prev, newReview])

    // Notify the seller about the new review
    addNotification({
      type: "system",
      title: "New review received",
      message: `${review.userName} left a ${review.rating}-star review on your listing.`,
      actionUrl: `/car/${review.listingId}`,
    })
  }

  // Update an existing review
  const updateReview = (id: string, reviewUpdate: Partial<Review>) => {
    setReviews((prev) => prev.map((review) => (review.id === id ? { ...review, ...reviewUpdate } : review)))
  }

  // Delete a review
  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((review) => review.id !== id))
  }

  // Add a seller response to a review
  const addSellerResponse = (reviewId: string, comment: string) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              sellerResponse: {
                comment,
                date: Date.now(),
              },
            }
          : review,
      ),
    )

    // Find the review to get the user info
    const review = reviews.find((r) => r.id === reviewId)
    if (review) {
      // Notify the reviewer about the seller's response
      addNotification({
        type: "system",
        title: "Seller responded to your review",
        message: `The seller has responded to your review on listing #${review.listingId}.`,
        actionUrl: `/car/${review.listingId}`,
      })
    }
  }

  // Mark a review as helpful or not helpful
  const markHelpful = (reviewId: string, isHelpful: boolean) => {
    setReviews((prev) =>
      prev.map((review) => {
        if (review.id === reviewId) {
          // Check if the user has already voted
          const currentVote = review.userHelpfulVotes["currentUser"] // In a real app, use the actual user ID

          // Update the helpful/not helpful counts
          let helpful = review.helpful
          let notHelpful = review.notHelpful

          // If the user has already voted, remove their previous vote
          if (currentVote !== undefined) {
            if (currentVote) {
              helpful -= 1
            } else {
              notHelpful -= 1
            }
          }

          // Add the new vote
          if (isHelpful) {
            helpful += 1
          } else {
            notHelpful += 1
          }

          // Update the user's vote
          const updatedVotes = {
            ...review.userHelpfulVotes,
            currentUser: isHelpful, // In a real app, use the actual user ID
          }

          return {
            ...review,
            helpful,
            notHelpful,
            userHelpfulVotes: updatedVotes,
          }
        }
        return review
      }),
    )
  }

  // Get all reviews for a specific listing
  const getReviewsForListing = (listingId: number) => {
    return reviews.filter((review) => review.listingId === listingId)
  }

  // Get all reviews by a specific user
  const getUserReviews = (userId: number) => {
    return reviews.filter((review) => review.userId === userId)
  }

  // Calculate the average rating for a listing
  const getAverageRatingForListing = (listingId: number) => {
    const listingReviews = getReviewsForListing(listingId)
    if (listingReviews.length === 0) return 0

    const totalRating = listingReviews.reduce((sum, review) => sum + review.rating, 0)
    return totalRating / listingReviews.length
  }

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        updateReview,
        deleteReview,
        addSellerResponse,
        markHelpful,
        getReviewsForListing,
        getUserReviews,
        getAverageRatingForListing,
      }}
    >
      {children}
    </ReviewContext.Provider>
  )
}

export function useReviews() {
  const context = useContext(ReviewContext)
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewProvider")
  }
  return context
}
