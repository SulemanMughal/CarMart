"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { usePayment } from "@/lib/payment-context"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, CreditCard, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function PlanDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { plans, paymentMethods, purchasePlan } = usePayment()
  const router = useRouter()
  const { toast } = useToast()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Find the plan
  const plan = plans.find((p) => p.id === id)

  // Get default payment method
  const defaultPaymentMethod = paymentMethods.find((m) => m.isDefault)

  // Set default payment method if available
  useState(() => {
    if (defaultPaymentMethod && !selectedPaymentMethod) {
      setSelectedPaymentMethod(defaultPaymentMethod.id)
    }
  })

  const handlePurchase = async () => {
    if (!plan) {
      toast({
        title: "Plan not found",
        description: "The selected plan could not be found.",
        variant: "destructive",
      })
      return
    }

    if (!selectedPaymentMethod) {
      toast({
        title: "Payment method required",
        description: "Please select a payment method.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const success = await purchasePlan(plan.id as any, selectedPaymentMethod)
      if (success) {
        toast({
          title: "Purchase successful",
          description: `You have successfully subscribed to the ${plan.name} plan.`,
        })
        router.push("/payments")
      } else {
        toast({
          title: "Purchase failed",
          description: "There was an error processing your payment. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Purchase failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!plan) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <section className="py-12 flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Plan not found</h1>
            <p className="text-gray-500 mb-6">The plan you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/payments/plans">View Available Plans</Link>
            </Button>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="py-12 flex-grow bg-gray-50">
        <div className="container max-w-3xl">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Subscribe to {plan.name} Plan</CardTitle>
                  <CardDescription>Review your plan details and complete your purchase</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Plan Details</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{plan.name} Plan</span>
                          <span className="font-bold">${plan.price.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Duration: {plan.duration} days</p>
                        <div className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Payment Method</h3>
                      {paymentMethods.length === 0 ? (
                        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                          <p className="text-yellow-700 mb-2">No payment methods available</p>
                          <p className="text-sm text-yellow-600 mb-4">
                            Please add a payment method to continue with your purchase.
                          </p>
                          <Button asChild>
                            <Link href="/payments/add-method">Add Payment Method</Link>
                          </Button>
                        </div>
                      ) : (
                        <RadioGroup value={selectedPaymentMethod || ""} onValueChange={setSelectedPaymentMethod}>
                          {paymentMethods.map((method) => (
                            <div key={method.id} className="flex items-center space-x-2 border p-4 rounded-md mb-2">
                              <RadioGroupItem value={method.id} id={method.id} />
                              <Label htmlFor={method.id} className="flex-1 flex items-center gap-3 cursor-pointer">
                                {method.type === "card" ? (
                                  <>
                                    <CreditCard className="h-5 w-5 text-gray-500" />
                                    <div>
                                      <p>
                                        {method.details.brand} •••• {method.details.last4}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        Expires {method.details.expiryMonth}/{method.details.expiryYear}
                                      </p>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="h-5 w-5 text-blue-500 font-bold">P</div>
                                    <div>
                                      <p>PayPal</p>
                                      <p className="text-sm text-gray-500">{method.details.email}</p>
                                    </div>
                                  </>
                                )}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}
                      <div className="mt-2">
                        <Button variant="outline" asChild size="sm">
                          <Link href="/payments/add-method">Add New Payment Method</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>{plan.name} Plan</span>
                      <span>${plan.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-4">
                      <span>Total</span>
                      <span>${plan.price.toFixed(2)}</span>
                    </div>
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 mt-4"
                      onClick={handlePurchase}
                      disabled={isLoading || paymentMethods.length === 0 || !selectedPaymentMethod}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Complete Purchase"
                      )}
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
