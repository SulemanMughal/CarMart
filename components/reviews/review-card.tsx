"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, ThumbsDown, Reply, Edit, Trash, Check, X } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useReviews, type Review } from "@/lib/review-context"
import { StarRating } from "@/components/reviews/star-rating"

interface ReviewCardProps {
  review: Review
  isOwner?: boolean
  isSeller?: boolean
}

export function ReviewCard({ review, isOwner = false, isSeller = false }: ReviewCardProps) {
  const { updateReview, deleteReview, addSellerResponse, markHelpful } = useReviews()
  const [isEditing, setIsEditing] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [editedTitle, setEditedTitle] = useState(review.title)
  const [editedComment, setEditedComment] = useState(review.comment)
  const [replyComment, setReplyComment] = useState("")

  const handleSaveEdit = () => {
    updateReview(review.id, {
      title: editedTitle,
      comment: editedComment,
    })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedTitle(review.title)
    setEditedComment(review.comment)
    setIsEditing(false)
  }

  const handleSubmitReply = () => {
    addSellerResponse(review.id, replyComment)
    setIsReplying(false)
    setReplyComment("")
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReview(review.id)
    }
  }

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
            <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <div>
                <h4 className="font-medium">{review.userName}</h4>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
                </p>
              </div>
              <StarRating rating={review.rating} />
            </div>

            {isEditing ? (
              <div className="space-y-2 mt-2">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Review title"
                />
                <Textarea
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                  placeholder="Your review"
                  className="min-h-[100px]"
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                    <X className="mr-1 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSaveEdit}>
                    <Check className="mr-1 h-4 w-4" />
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-medium text-lg">{review.title}</h3>
                <p className="mt-1 text-gray-700">{review.comment}</p>
              </>
            )}

            {review.sellerResponse && !isEditing && (
              <div className="mt-4 bg-gray-50 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">Seller Response</span>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(review.sellerResponse.date), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-gray-700">{review.sellerResponse.comment}</p>
              </div>
            )}

            {isReplying && (
              <div className="mt-4 space-y-2">
                <Textarea
                  value={replyComment}
                  onChange={(e) => setReplyComment(e.target.value)}
                  placeholder="Write your response..."
                  className="min-h-[100px]"
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm" onClick={() => setIsReplying(false)}>
                    <X className="mr-1 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSubmitReply} disabled={!replyComment.trim()}>
                    <Check className="mr-1 h-4 w-4" />
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-green-600"
            onClick={() => markHelpful(review.id, true)}
          >
            <ThumbsUp className="mr-1 h-4 w-4" />
            Helpful ({review.helpful})
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-red-600"
            onClick={() => markHelpful(review.id, false)}
          >
            <ThumbsDown className="mr-1 h-4 w-4" />
            Not Helpful ({review.notHelpful})
          </Button>
        </div>
        <div className="flex gap-2">
          {isOwner && !isEditing && (
            <>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" className="text-red-500" onClick={handleDelete}>
                <Trash className="mr-1 h-4 w-4" />
                Delete
              </Button>
            </>
          )}
          {isSeller && !review.sellerResponse && !isReplying && (
            <Button variant="ghost" size="sm" onClick={() => setIsReplying(true)}>
              <Reply className="mr-1 h-4 w-4" />
              Reply
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
