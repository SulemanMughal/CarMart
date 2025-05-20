"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReviewList } from "@/components/reviews/review-list"
import { ReviewForm } from "@/components/reviews/review-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useReviews } from "@/lib/review-context"

export default function CarReviewsPage({ params }: { params: { id: string } }) {
  const { id } = params
  const listingId = Number.parseInt(id)
  const { getReviewsForListing } = useReviews()
  const [showReviewForm, setShowReviewForm] = useState(false)

  const reviews = getReviewsForListing(listingId)
  const hasUserReviewed = reviews.some((review) => review.userId === 1) // In a real app, check against current user ID

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="py-12 flex-grow bg-gray-50">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link href={`/car/${id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Listing
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Reviews & Ratings</h1>
          </div>

          <Tabs defaultValue="reviews">
            <TabsList className="mb-6">
              <TabsTrigger value="reviews">All Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="write-review" disabled={hasUserReviewed || showReviewForm}>
                Write a Review
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Customer Reviews</CardTitle>
                      <CardDescription>See what others are saying about this car</CardDescription>
                    </div>
                    {!hasUserReviewed && !showReviewForm && (
                      <Button onClick={() => setShowReviewForm(true)}>Write a Review</Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {showReviewForm && (
                    <div className="mb-8 border-b pb-8">
                      <h3 className="text-lg font-medium mb-4">Your Review</h3>
                      <ReviewForm listingId={listingId} onSuccess={() => setShowReviewForm(false)} />
                    </div>
                  )}
                  <ReviewList listingId={listingId} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="write-review">
              <Card>
                <CardHeader>
                  <CardTitle>Write a Review</CardTitle>
                  <CardDescription>Share your experience with this car</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReviewForm listingId={listingId} onSuccess={() => setShowReviewForm(false)} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <Footer />
    </main>
  )
}
