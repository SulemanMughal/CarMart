"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useReviews } from "@/lib/review-context"
import { StarRating } from "@/components/reviews/star-rating"
import { useToast } from "@/hooks/use-toast"

interface ReviewFormProps {
  listingId: number
  onSuccess?: () => void
}

export function ReviewForm({ listingId, onSuccess }: ReviewFormProps) {
  const { addReview } = useReviews()
  const { toast } = useToast()
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      })
      return
    }

    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a title for your review.",
        variant: "destructive",
      })
      return
    }

    if (!comment.trim()) {
      toast({
        title: "Review required",
        description: "Please write your review before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // In a real app, you would get the user info from auth context
    // For this demo, we'll use mock data
    const mockUser = {
      userId: 1,
      userName: "Current User",
      userAvatar: "/placeholder.svg?height=40&width=40",
    }

    // Add the review
    addReview({
      listingId,
      userId: mockUser.userId,
      userName: mockUser.userName,
      userAvatar: mockUser.userAvatar,
      rating,
      title,
      comment,
    })

    // Reset form
    setRating(0)
    setTitle("")
    setComment("")
    setIsSubmitting(false)

    // Show success message
    toast({
      title: "Review submitted",
      description: "Your review has been submitted successfully.",
    })

    // Call onSuccess callback if provided
    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Your Rating</label>
        <StarRating rating={rating} size="lg" onChange={setRating} />
      </div>

      <div>
        <label htmlFor="review-title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <Input
          id="review-title"
          placeholder="Summarize your experience"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="review-comment" className="block text-sm font-medium mb-1">
          Your Review
        </label>
        <Textarea
          id="review-comment"
          placeholder="Share your experience with this car or seller"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[150px]"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  )
}
