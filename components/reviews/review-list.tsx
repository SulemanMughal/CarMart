"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useReviews } from "@/lib/review-context"
import { ReviewCard } from "@/components/reviews/review-card"
import { StarRating } from "@/components/reviews/star-rating"

interface ReviewListProps {
  listingId: number
  isSeller?: boolean
}

export function ReviewList({ listingId, isSeller = false }: ReviewListProps) {
  const { getReviewsForListing, getAverageRatingForListing } = useReviews()
  const [sortBy, setSortBy] = useState<string>("newest")
  const [filterRating, setFilterRating] = useState<string>("all")

  const reviews = getReviewsForListing(listingId)
  const averageRating = getAverageRatingForListing(listingId)

  // Filter reviews by rating
  const filteredReviews = reviews.filter((review) => {
    if (filterRating === "all") return true
    return review.rating === Number.parseInt(filterRating)
  })

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.date - a.date
      case "oldest":
        return a.date - b.date
      case "highest":
        return b.rating - a.rating
      case "lowest":
        return a.rating - b.rating
      case "most-helpful":
        return b.helpful - a.helpful
      default:
        return b.date - a.date
    }
  })

  // Calculate rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((review) => review.rating === rating).length
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
    return { rating, count, percentage }
  })

  return (
    <div>
      {reviews.length > 0 ? (
        <>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="md:w-1/3">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold">{averageRating.toFixed(1)}</h3>
                  <div className="flex justify-center my-2">
                    <StarRating rating={Math.round(averageRating)} />
                  </div>
                  <p className="text-sm text-gray-500">{reviews.length} reviews</p>
                </div>

                <div className="space-y-2">
                  {ratingCounts.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center gap-2">
                      <div className="w-12 text-sm">{rating} stars</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <div className="w-8 text-sm text-right">{count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Filter:</span>
                  <Select value={filterRating} onValueChange={setFilterRating}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="All Ratings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Newest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="highest">Highest Rating</SelectItem>
                      <SelectItem value="lowest">Lowest Rating</SelectItem>
                      <SelectItem value="most-helpful">Most Helpful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {sortedReviews.length > 0 ? (
                <div>
                  {sortedReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      isOwner={review.userId === 1} // In a real app, check against current user ID
                      isSeller={isSeller}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No reviews match your filter criteria.</p>
                  <Button variant="link" onClick={() => setFilterRating("all")}>
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">No Reviews Yet</h3>
          <p className="text-gray-500 mb-4">Be the first to review this listing!</p>
        </div>
      )}
    </div>
  )
}
