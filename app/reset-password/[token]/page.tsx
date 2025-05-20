"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Eye, EyeOff, Loader2, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const { token } = params
  const router = useRouter()
  const { toast } = useToast()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState(true) // Assume token is valid initially

  // In a real app, you would validate the token on component mount
  // For this demo, we'll simulate token validation
  useState(() => {
    // Simulate token validation
    if (token === "invalid") {
      setIsTokenValid(false)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords
    if (!password) {
      toast({
        title: "Password required",
        description: "Please enter a new password.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // In a real app, you would send a request to your API to reset the password
      console.log(`Password reset for token: ${token}`)

      // Redirect to login after a delay
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    }, 1500)
  }

  if (!isTokenValid) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <section className="py-12 flex-grow bg-gray-50">
          <div className="container max-w-md">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Invalid or Expired Link</CardTitle>
                <CardDescription>The password reset link you clicked is invalid or has expired.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500 mb-4">Please request a new password reset link.</p>
                  <div className="flex flex-col gap-2">
                    <Button asChild>
                      <Link href="/forgot-password">Request New Link</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/login">Return to Login</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
        <div className="container max-w-md">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </Button>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Reset Password</CardTitle>
              <CardDescription>Create a new password for your account.</CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="text-center py-4">
                  <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4 flex items-center gap-2 justify-center">
                    <Check className="h-5 w-5" />
                    <h3 className="font-medium">Password reset successful!</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Your password has been reset successfully. You will be redirected to the login page shortly.
                  </p>
                  <Button asChild>
                    <Link href="/login">Go to Login</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">Password must be at least 8 characters long.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </main>
  )
}
