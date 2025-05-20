"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { usePayment } from "@/lib/payment-context"
import { format } from "date-fns"
import Link from "next/link"
import { CreditCard, Trash2, Plus, Check, AlertTriangle, RefreshCw } from "lucide-react"

export default function PaymentsPage() {
  const {
    plans,
    paymentMethods,
    transactions,
    subscriptions,
    removePaymentMethod,
    setDefaultPaymentMethod,
    cancelSubscription,
  } = usePayment()
  const [activeTab, setActiveTab] = useState("overview")

  // Get active subscription
  const activeSubscription = subscriptions.find((sub) => sub.status === "active")
  const activePlan = activeSubscription ? plans.find((plan) => plan.id === activeSubscription.planId) : null

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="py-12 flex-grow bg-gray-50">
        <div className="container max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Payments & Subscriptions</h1>
            <Button className="bg-orange-500 hover:bg-orange-600" asChild>
              <Link href="/payments/add-method">Add Payment Method</Link>
            </Button>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
              <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
              <TabsTrigger value="transactions">Transaction History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>Your active subscription</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {activeSubscription ? (
                      <div>
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-bold">{activePlan?.name || "Unknown"}</h3>
                          <Badge className="bg-green-500">Active</Badge>
                        </div>
                        <p className="text-gray-500 mt-1">
                          Expires: {format(new Date(activeSubscription.endDate), "MMM d, yyyy")}
                        </p>
                        <div className="mt-4">
                          <Button variant="outline" asChild className="w-full">
                            <Link href="/payments/plans">Manage Plan</Link>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-500 mb-4">You don't have an active subscription.</p>
                        <Button className="w-full bg-orange-500 hover:bg-orange-600" asChild>
                          <Link href="/payments/plans">View Plans</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Your saved payment methods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {paymentMethods.length > 0 ? (
                      <div>
                        <div className="space-y-2 mb-4">
                          {paymentMethods.slice(0, 2).map((method) => (
                            <div key={method.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {method.type === "card" ? (
                                  <CreditCard className="h-5 w-5 text-gray-500" />
                                ) : (
                                  <div className="h-5 w-5 text-blue-500 font-bold">P</div>
                                )}
                                <span>
                                  {method.type === "card"
                                    ? `${method.details.brand} •••• ${method.details.last4}`
                                    : `PayPal (${method.details.email})`}
                                </span>
                              </div>
                              {method.isDefault && (
                                <Badge variant="outline" className="text-green-500 border-green-500">
                                  Default
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                        <Button variant="outline" asChild className="w-full">
                          <Link href="#" onClick={() => setActiveTab("payment-methods")}>
                            Manage Payment Methods
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-500 mb-4">You don't have any payment methods.</p>
                        <Button className="w-full bg-orange-500 hover:bg-orange-600" asChild>
                          <Link href="/payments/add-method">Add Payment Method</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Your payment history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {transactions.length > 0 ? (
                      <div>
                        <div className="space-y-3 mb-4">
                          {transactions.slice(0, 3).map((transaction) => (
                            <div key={transaction.id} className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{transaction.description}</p>
                                <p className="text-sm text-gray-500">
                                  {format(new Date(transaction.date), "MMM d, yyyy")}
                                </p>
                              </div>
                              <p className="font-bold">${transaction.amount.toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                        <Button variant="outline" asChild className="w-full">
                          <Link href="#" onClick={() => setActiveTab("transactions")}>
                            View All Transactions
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-500">You don't have any transactions yet.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Available Plans</CardTitle>
                  <CardDescription>Choose a plan that fits your needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                      <Card key={plan.id} className={plan.popular ? "border-orange-500" : ""}>
                        <CardHeader className="pb-2">
                          {plan.popular && <Badge className="bg-orange-500 mb-2 self-start">Popular</Badge>}
                          <CardTitle>{plan.name}</CardTitle>
                          <div className="flex items-end gap-1">
                            <span className="text-3xl font-bold">
                              ${plan.price === 0 ? "0" : plan.price.toFixed(2)}
                            </span>
                            {plan.price > 0 && <span className="text-gray-500">/ {plan.duration} days</span>}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 mb-6">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button
                            className={plan.popular ? "w-full bg-orange-500 hover:bg-orange-600" : "w-full"}
                            variant={plan.popular ? "default" : "outline"}
                            asChild
                          >
                            <Link href={`/payments/plans/${plan.id}`}>
                              {activeSubscription?.planId === plan.id ? "Current Plan" : "Select Plan"}
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscriptions">
              <Card>
                <CardHeader>
                  <CardTitle>Your Subscriptions</CardTitle>
                  <CardDescription>Manage your subscription plans</CardDescription>
                </CardHeader>
                <CardContent>
                  {subscriptions.length === 0 ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No subscriptions found</h3>
                      <p className="text-gray-500 mb-6">You don't have any active subscriptions.</p>
                      <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                        <Link href="/payments/plans">View Plans</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {subscriptions.map((subscription) => {
                        const plan = plans.find((p) => p.id === subscription.planId)
                        return (
                          <div
                            key={subscription.id}
                            className="border rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-bold">{plan?.name || "Unknown Plan"}</h3>
                                <Badge
                                  className={
                                    subscription.status === "active"
                                      ? "bg-green-500"
                                      : subscription.status === "canceled"
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }
                                >
                                  {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-gray-500 mb-2">
                                ${plan?.price.toFixed(2) || "0.00"} / {plan?.duration || 30} days
                              </p>
                              <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                                <div>
                                  <p>Started on:</p>
                                  <p className="font-medium">
                                    {format(new Date(subscription.startDate), "MMM d, yyyy")}
                                  </p>
                                </div>
                                <div>
                                  <p>Expires on:</p>
                                  <p className="font-medium">{format(new Date(subscription.endDate), "MMM d, yyyy")}</p>
                                </div>
                                <div>
                                  <p>Auto-renew:</p>
                                  <p className="font-medium">{subscription.autoRenew ? "Enabled" : "Disabled"}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              {subscription.status === "active" && (
                                <>
                                  <Button variant="outline" asChild>
                                    <Link href={`/payments/plans/${subscription.planId}`}>
                                      <RefreshCw className="mr-2 h-4 w-4" />
                                      Renew
                                    </Link>
                                  </Button>
                                  {subscription.autoRenew && (
                                    <Button
                                      variant="outline"
                                      className="text-yellow-500 border-yellow-500 hover:bg-yellow-50"
                                      onClick={() => cancelSubscription(subscription.id)}
                                    >
                                      Cancel
                                    </Button>
                                  )}
                                </>
                              )}
                              {subscription.status === "canceled" && (
                                <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                                  <Link href={`/payments/plans/${subscription.planId}`}>Resubscribe</Link>
                                </Button>
                              )}
                              {subscription.status === "expired" && (
                                <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                                  <Link href={`/payments/plans/${subscription.planId}`}>Renew</Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment-methods">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Payment Methods</CardTitle>
                      <CardDescription>Manage your payment methods</CardDescription>
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                      <Link href="/payments/add-method">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Method
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {paymentMethods.length === 0 ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No payment methods found</h3>
                      <p className="text-gray-500 mb-6">Add a payment method to make purchases.</p>
                      <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                        <Link href="/payments/add-method">Add Payment Method</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            {method.type === "card" ? (
                              <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center">
                                <CreditCard className="h-6 w-6 text-gray-500" />
                              </div>
                            ) : (
                              <div className="h-10 w-16 bg-blue-100 rounded flex items-center justify-center">
                                <span className="text-blue-500 font-bold">PayPal</span>
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">
                                  {method.type === "card"
                                    ? `${method.details.brand} •••• ${method.details.last4}`
                                    : `PayPal (${method.details.email})`}
                                </p>
                                {method.isDefault && (
                                  <Badge variant="outline" className="text-green-500 border-green-500">
                                    Default
                                  </Badge>
                                )}
                              </div>
                              {method.type === "card" && (
                                <p className="text-sm text-gray-500">
                                  Expires {method.details.expiryMonth}/{method.details.expiryYear}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {!method.isDefault && (
                              <Button variant="outline" onClick={() => setDefaultPaymentMethod(method.id)}>
                                Set as Default
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => removePaymentMethod(method.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Your payment history</CardDescription>
                </CardHeader>
                <CardContent>
                  {transactions.length === 0 ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No transactions found</h3>
                      <p className="text-gray-500">You haven't made any payments yet.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Description</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Payment Method</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4">{format(new Date(transaction.date), "MMM d, yyyy")}</td>
                              <td className="py-3 px-4">{transaction.description}</td>
                              <td className="py-3 px-4">
                                {transaction.paymentMethod.type === "card"
                                  ? `${transaction.paymentMethod.details.brand} •••• ${transaction.paymentMethod.details.last4}`
                                  : `PayPal (${transaction.paymentMethod.details.email})`}
                              </td>
                              <td className="py-3 px-4 font-medium">${transaction.amount.toFixed(2)}</td>
                              <td className="py-3 px-4">
                                <Badge
                                  className={
                                    transaction.status === "completed"
                                      ? "bg-green-500"
                                      : transaction.status === "pending"
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }
                                >
                                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
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
