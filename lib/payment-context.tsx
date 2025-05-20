"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useNotifications } from "@/components/notifications/notification-provider"

export type PlanType = "basic" | "premium" | "featured"

export type Plan = {
  id: PlanType
  name: string
  price: number
  duration: number // in days
  features: string[]
  popular?: boolean
}

export type PaymentMethod = {
  id: string
  type: "card" | "paypal"
  details: {
    last4?: string
    brand?: string
    expiryMonth?: string
    expiryYear?: string
    email?: string
  }
  isDefault: boolean
}

export type Transaction = {
  id: string
  date: number
  amount: number
  description: string
  status: "completed" | "pending" | "failed"
  paymentMethod: {
    type: "card" | "paypal"
    details: {
      last4?: string
      brand?: string
      email?: string
    }
  }
  planId?: PlanType
  listingId?: number
}

export type Subscription = {
  id: string
  planId: PlanType
  startDate: number
  endDate: number
  autoRenew: boolean
  status: "active" | "canceled" | "expired"
  paymentMethod: {
    type: "card" | "paypal"
    details: {
      last4?: string
      brand?: string
      email?: string
    }
  }
}

type PaymentContextType = {
  plans: Plan[]
  paymentMethods: PaymentMethod[]
  transactions: Transaction[]
  subscriptions: Subscription[]
  addPaymentMethod: (method: Omit<PaymentMethod, "id">) => void
  removePaymentMethod: (id: string) => void
  setDefaultPaymentMethod: (id: string) => void
  purchasePlan: (planId: PlanType, paymentMethodId: string) => Promise<boolean>
  cancelSubscription: (subscriptionId: string) => void
  promoteListing: (listingId: number, planId: PlanType, paymentMethodId: string) => Promise<boolean>
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<Plan[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const { addNotification } = useNotifications()

  // Load data from localStorage on mount
  useEffect(() => {
    const storedPaymentMethods = localStorage.getItem("autodecar_paymentMethods")
    const storedTransactions = localStorage.getItem("autodecar_transactions")
    const storedSubscriptions = localStorage.getItem("autodecar_subscriptions")

    if (storedPaymentMethods) {
      setPaymentMethods(JSON.parse(storedPaymentMethods))
    } else {
      // Add sample payment methods for demo
      setPaymentMethods([
        {
          id: "pm_1",
          type: "card",
          details: {
            last4: "4242",
            brand: "Visa",
            expiryMonth: "12",
            expiryYear: "2025",
          },
          isDefault: true,
        },
        {
          id: "pm_2",
          type: "paypal",
          details: {
            email: "user@example.com",
          },
          isDefault: false,
        },
      ])
    }

    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions))
    } else {
      // Add sample transactions for demo
      setTransactions([
        {
          id: "txn_1",
          date: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
          amount: 29.99,
          description: "Premium Plan Subscription",
          status: "completed",
          paymentMethod: {
            type: "card",
            details: {
              last4: "4242",
              brand: "Visa",
            },
          },
          planId: "premium",
        },
        {
          id: "txn_2",
          date: Date.now() - 1000 * 60 * 60 * 24 * 7, // 7 days ago
          amount: 9.99,
          description: "Featured Listing - 2021 Toyota Camry",
          status: "completed",
          paymentMethod: {
            type: "paypal",
            details: {
              email: "user@example.com",
            },
          },
          listingId: 1,
          planId: "featured",
        },
      ])
    }

    if (storedSubscriptions) {
      setSubscriptions(JSON.parse(storedSubscriptions))
    } else {
      // Add sample subscriptions for demo
      setSubscriptions([
        {
          id: "sub_1",
          planId: "premium",
          startDate: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
          endDate: Date.now() + 1000 * 60 * 60 * 24 * 28, // 28 days from now
          autoRenew: true,
          status: "active",
          paymentMethod: {
            type: "card",
            details: {
              last4: "4242",
              brand: "Visa",
            },
          },
        },
      ])
    }

    // Set up plans
    setPlans([
      {
        id: "basic",
        name: "Basic",
        price: 0,
        duration: 30,
        features: ["List up to 3 cars", "Basic listing visibility", "Email support", "30 days listing duration"],
      },
      {
        id: "premium",
        name: "Premium",
        price: 29.99,
        duration: 30,
        features: [
          "List up to 10 cars",
          "Enhanced listing visibility",
          "Featured in search results",
          "Priority email support",
          "30 days listing duration",
        ],
        popular: true,
      },
      {
        id: "featured",
        name: "Featured",
        price: 9.99,
        duration: 7,
        features: [
          "Promote a single listing",
          "Top placement in search results",
          "Highlighted listing card",
          "7 days featured duration",
        ],
      },
    ])
  }, [])

  // Save data to localStorage when updated
  useEffect(() => {
    localStorage.setItem("autodecar_paymentMethods", JSON.stringify(paymentMethods))
  }, [paymentMethods])

  useEffect(() => {
    localStorage.setItem("autodecar_transactions", JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem("autodecar_subscriptions", JSON.stringify(subscriptions))
  }, [subscriptions])

  // Add a new payment method
  const addPaymentMethod = (method: Omit<PaymentMethod, "id">) => {
    const newMethod: PaymentMethod = {
      ...method,
      id: `pm_${Date.now()}`,
    }

    // If this is the first payment method or isDefault is true, make it the default
    if (paymentMethods.length === 0 || method.isDefault) {
      setPaymentMethods((prev) =>
        prev.map((m) => ({ ...m, isDefault: false })).concat({ ...newMethod, isDefault: true }),
      )
    } else {
      setPaymentMethods((prev) => [...prev, newMethod])
    }

    addNotification({
      type: "system",
      title: "Payment method added",
      message: `Your ${method.type === "card" ? "card" : "PayPal account"} has been added successfully.`,
    })
  }

  // Remove a payment method
  const removePaymentMethod = (id: string) => {
    const methodToRemove = paymentMethods.find((m) => m.id === id)
    if (!methodToRemove) return

    // Check if this is the default method
    if (methodToRemove.isDefault && paymentMethods.length > 1) {
      // Find another method to make default
      const newDefault = paymentMethods.find((m) => m.id !== id)
      if (newDefault) {
        setPaymentMethods((prev) =>
          prev.filter((m) => m.id !== id).map((m) => (m.id === newDefault.id ? { ...m, isDefault: true } : m)),
        )
      }
    } else {
      setPaymentMethods((prev) => prev.filter((m) => m.id !== id))
    }

    addNotification({
      type: "system",
      title: "Payment method removed",
      message: `Your ${methodToRemove.type === "card" ? "card" : "PayPal account"} has been removed.`,
    })
  }

  // Set a payment method as default
  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

  // Purchase a plan
  const purchasePlan = async (planId: PlanType, paymentMethodId: string): Promise<boolean> => {
    const plan = plans.find((p) => p.id === planId)
    const paymentMethod = paymentMethods.find((m) => m.id === paymentMethodId)

    if (!plan || !paymentMethod) return false

    // Simulate payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create a new transaction
        const newTransaction: Transaction = {
          id: `txn_${Date.now()}`,
          date: Date.now(),
          amount: plan.price,
          description: `${plan.name} Plan Subscription`,
          status: "completed",
          paymentMethod: {
            type: paymentMethod.type,
            details: {
              last4: paymentMethod.details.last4,
              brand: paymentMethod.details.brand,
              email: paymentMethod.details.email,
            },
          },
          planId: plan.id,
        }

        setTransactions((prev) => [newTransaction, ...prev])

        // Create or update subscription
        const existingSubscription = subscriptions.find((s) => s.planId === plan.id && s.status === "active")

        if (existingSubscription) {
          // Update existing subscription
          setSubscriptions((prev) =>
            prev.map((s) =>
              s.id === existingSubscription.id
                ? {
                    ...s,
                    endDate: s.endDate + 1000 * 60 * 60 * 24 * plan.duration, // Add plan duration in days
                  }
                : s,
            ),
          )
        } else {
          // Create new subscription
          const newSubscription: Subscription = {
            id: `sub_${Date.now()}`,
            planId: plan.id,
            startDate: Date.now(),
            endDate: Date.now() + 1000 * 60 * 60 * 24 * plan.duration, // Plan duration in days
            autoRenew: true,
            status: "active",
            paymentMethod: {
              type: paymentMethod.type,
              details: {
                last4: paymentMethod.details.last4,
                brand: paymentMethod.details.brand,
                email: paymentMethod.details.email,
              },
            },
          }

          setSubscriptions((prev) => [...prev, newSubscription])
        }

        addNotification({
          type: "payment",
          title: "Payment successful",
          message: `Your payment for the ${plan.name} plan was successful.`,
          actionUrl: "/payments",
        })

        resolve(true)
      }, 1500) // Simulate network delay
    })
  }

  // Cancel a subscription
  const cancelSubscription = (subscriptionId: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscriptionId
          ? {
              ...sub,
              status: "canceled",
              autoRenew: false,
            }
          : sub,
      ),
    )

    addNotification({
      type: "system",
      title: "Subscription canceled",
      message: "Your subscription has been canceled. You can still use it until the end date.",
      actionUrl: "/payments",
    })
  }

  // Promote a listing with a plan
  const promoteListing = async (listingId: number, planId: PlanType, paymentMethodId: string): Promise<boolean> => {
    const plan = plans.find((p) => p.id === planId)
    const paymentMethod = paymentMethods.find((m) => m.id === paymentMethodId)

    if (!plan || !paymentMethod) return false

    // Simulate payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create a new transaction
        const newTransaction: Transaction = {
          id: `txn_${Date.now()}`,
          date: Date.now(),
          amount: plan.price,
          description: `${plan.name} Listing - ID: ${listingId}`,
          status: "completed",
          paymentMethod: {
            type: paymentMethod.type,
            details: {
              last4: paymentMethod.details.last4,
              brand: paymentMethod.details.brand,
              email: paymentMethod.details.email,
            },
          },
          planId: plan.id,
          listingId,
        }

        setTransactions((prev) => [newTransaction, ...prev])

        addNotification({
          type: "payment",
          title: "Listing promoted",
          message: `Your listing has been promoted with the ${plan.name} plan.`,
          actionUrl: `/car/${listingId}`,
        })

        resolve(true)
      }, 1500) // Simulate network delay
    })
  }

  return (
    <PaymentContext.Provider
      value={{
        plans,
        paymentMethods,
        transactions,
        subscriptions,
        addPaymentMethod,
        removePaymentMethod,
        setDefaultPaymentMethod,
        purchasePlan,
        cancelSubscription,
        promoteListing,
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}

export function usePayment() {
  const context = useContext(PaymentContext)
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider")
  }
  return context
}
