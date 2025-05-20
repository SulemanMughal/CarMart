"use client"

import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  onChange?: (rating: number) => void
}

export function StarRating({ rating, maxRating = 5, size = "md", onChange }: StarRatingProps) {
  const isInteractive = !!onChange

  const handleClick = (selectedRating: number) => {
    if (isInteractive) {
      onChange(selectedRating)
    }
  }

  const starSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const containerSizes = {
    sm: "gap-0.5",
    md: "gap-1",
    lg: "gap-1.5",
  }

  return (
    <div className={`flex items-center ${containerSizes[size]}`}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= rating

        return (
          <Star
            key={index}
            className={`${starSizes[size]} ${
              isFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            } ${isInteractive ? "cursor-pointer" : ""}`}
            onClick={isInteractive ? () => handleClick(starValue) : undefined}
          />
        )
      })}
    </div>
  )
}
