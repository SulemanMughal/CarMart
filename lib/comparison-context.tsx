"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Car = {
  id: number
  title: string
  price: number
  monthly: number
  image: string
  mileage: number
  year: number
  location: string
  condition: string
  featured: boolean
  make?: string
  model?: string
  doors?: string
  body?: string
  fuel?: string
  transmission?: string
  color?: string
  seats?: number
}

type ComparisonContextType = {
  comparisonList: Car[]
  addToComparison: (car: Car) => void
  removeFromComparison: (carId: number) => void
  isInComparison: (carId: number) => boolean
  clearComparison: () => void
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonList, setComparisonList] = useState<Car[]>([])

  const addToComparison = (car: Car) => {
    if (comparisonList.length < 3 && !comparisonList.some((item) => item.id === car.id)) {
      setComparisonList([...comparisonList, car])
    }
  }

  const removeFromComparison = (carId: number) => {
    setComparisonList(comparisonList.filter((car) => car.id !== carId))
  }

  const isInComparison = (carId: number) => {
    return comparisonList.some((car) => car.id === carId)
  }

  const clearComparison = () => {
    setComparisonList([])
  }

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        addToComparison,
        removeFromComparison,
        isInComparison,
        clearComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider")
  }
  return context
}
