"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePayment } from "@/lib/payment-context"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AddPaymentMethodPage() {
  const { addPaymentMethod } = usePayment()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    isDefault: true,
  })

  const [paypalData, setPaypalData] = useState({
    email: "",
    isDefault: false,
  })

  const updateCardData = (field: string, value: string | boolean) => {
    setCardData((prev) => ({ ...prev, [field]: value }))
  }

  const updatePaypalData = (field: string, value: string | boolean) => {
    setPaypalData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (
      !cardData.cardNumber ||
      !cardData.cardholderName ||
      !cardData.expiryMonth ||
      !cardData.expiryYear ||
      !cardData.cvv
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Simulate card processing
    setIsLoading(true)
    setTimeout(() => {
      // In a real app, you would validate the card with a payment processor
      const last4 = cardData.cardNumber.slice(-4)
      let brand = "Unknown"

      // Simple brand detection based on first digit
      const firstDigit = cardData.cardNumber.charAt(0)
      if (firstDigit === "4") brand = "Visa"
      else if (firstDigit === "5") brand = "Mastercard"
      else if (firstDigit === "3") brand = "American Express"
      else if (firstDigit === "6") brand = "Discover"

      addPaymentMethod({
        type: "card",
        details: {
          last4,
          brand,
          expiryMonth: cardData.expiryMonth,
          expiryYear: cardData.expiryYear,
        },
        isDefault: cardData.isDefault,
      })

      setIsLoading(false)
      toast({
        title: "Card added successfully",
        description: "Your card has been added to your payment methods.",
      })
      router.push("/payments")
    }, 1500)
  }

  const handleAddPaypal = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!paypalData.email) {
      toast({
        title: "Missing information",
        description: "Please enter your PayPal email address.",
        variant: "destructive",
      })
      return
    }

    // Simulate PayPal processing
    setIsLoading(true)
    setTimeout(() => {
      addPaymentMethod({
        type: "paypal",
        details: {
          email: paypalData.email,
        },
        isDefault: paypalData.isDefault,
      })

      setIsLoading(false)
      toast({
        title: "PayPal account added successfully",
        description: "Your PayPal account has been added to your payment methods.",
      })
      router.push("/payments")
    }, 1500)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="py-12 flex-grow bg-gray-50">
        <div className="container max-w-2xl">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Payments
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>Add Payment Method</CardTitle>
              <CardDescription>Add a new payment method to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="card">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="card">Credit Card</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                </TabsList>

                <TabsContent value="card">
                  <form onSubmit={handleAddCard}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardData.cardNumber}
                            onChange={(e) => updateCardData("cardNumber", e.target.value)}
                            maxLength={16}
                          />
                          <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardholderName">Cardholder Name</Label>
                        <Input
                          id="cardholderName"
                          placeholder="John Doe"
                          value={cardData.cardholderName}
                          onChange={(e) => updateCardData("cardholderName", e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryMonth">Expiry Month</Label>
                          <Input
                            id="expiryMonth"
                            placeholder="MM"
                            value={cardData.expiryMonth}
                            onChange={(e) => updateCardData("expiryMonth", e.target.value)}
                            maxLength={2}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expiryYear">Expiry Year</Label>
                          <Input
                            id="expiryYear"
                            placeholder="YY"
                            value={cardData.expiryYear}
                            onChange={(e) => updateCardData("expiryYear", e.target.value)}
                            maxLength={2}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cardData.cvv}
                            onChange={(e) => updateCardData("cvv", e.target.value)}
                            maxLength={4}
                            type="password"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-4">
                        <Checkbox
                          id="isDefaultCard"
                          checked={cardData.isDefault}
                          onCheckedChange={(checked) => updateCardData("isDefault", !!checked)}
                        />
                        <Label htmlFor="isDefaultCard">Set as default payment method</Label>
                      </div>

                      <div className="mt-6">
                        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
                          {isLoading ? "Processing..." : "Add Card"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="paypal">
                  <form onSubmit={handleAddPaypal}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="paypalEmail">PayPal Email</Label>
                        <Input
                          id="paypalEmail"
                          type="email"
                          placeholder="your@email.com"
                          value={paypalData.email}
                          onChange={(e) => updatePaypalData("email", e.target.value)}
                        />
                      </div>

                      <div className="flex items-center space-x-2 mt-4">
                        <Checkbox
                          id="isDefaultPaypal"
                          checked={paypalData.isDefault}
                          onCheckedChange={(checked) => updatePaypalData("isDefault", !!checked)}
                        />
                        <Label htmlFor="isDefaultPaypal">Set as default payment method</Label>
                      </div>

                      <div className="mt-6">
                        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
                          {isLoading ? "Processing..." : "Add PayPal Account"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </main>
  )
}
