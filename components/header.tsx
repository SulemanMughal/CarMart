"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Heart, Car, Menu, X } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { NotificationBell } from "@/components/notifications/notification-bell"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Mock authentication state - in a real app, this would come from an auth context
  const isLoggedIn = pathname.includes("/profile") || pathname.includes("/messages") || pathname.includes("/payments") || pathname.includes("/notifications")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">AutoDecar</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "text-orange-500 font-medium"
                  : "text-gray-600 hover:text-orange-500 transition-colors"
              }
            >
              Home
            </Link>
            <Link
              href="/search"
              className={
                pathname === "/search"
                  ? "text-orange-500 font-medium"
                  : "text-gray-600 hover:text-orange-500 transition-colors"
              }
            >
              Listing Car
            </Link>
            <Link
              href="/compare"
              className={
                pathname === "/compare"
                  ? "text-orange-500 font-medium"
                  : "text-gray-600 hover:text-orange-500 transition-colors"
              }
            >
              Compare
            </Link>
            <Link
              href="/blog"
              className={
                pathname === "/blog"
                  ? "text-orange-500 font-medium"
                  : "text-gray-600 hover:text-orange-500 transition-colors"
              }
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={
                pathname === "/contact"
                  ? "text-orange-500 font-medium"
                  : "text-gray-600 hover:text-orange-500 transition-colors"
              }
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/favorites">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          
          {isLoggedIn && <NotificationBell />}

          {isLoggedIn ? (
            <Button
              className="bg-transparent text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
              asChild
            >
              <Link href="/profile">My Account</Link>
            </Button>
          ) : (
            <Link href="/login" className="text-sm font-medium">
              Login / Register
            </Link>
          )}

          <Button
            className="bg-transparent text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white transition-colors hidden md:flex"
            asChild
          >
            <Link href="/add-listing">
              <Car className="mr-2 h-4 w-4" />
              Add listing
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container py-4 flex flex-col gap-2">
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "text-orange-500 font-medium py-2"
                  : "text-gray-600 hover:text-orange-500 transition-colors py-2"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/search"
              className={
                pathname === "/search"
                  ? "text-orange-500 font-medium py-2"
                  : "text-gray-600 hover:text-orange-500 transition-colors py-2"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Listing Car
            </Link>
            <Link
              href="/compare"
              className={
                pathname === "/compare"
                  ? "text-orange-500 font-medium py-2"
                  : "text-gray-600 hover:text-orange-500 transition-colors py-2"
              }
              onClick={() => setIsMenuOpen(false)}
              >
              Compare
            </Link>
            <Link
              href="/blog"
              className={
                pathname === "/blog"
                  ? "text-orange-500 font-medium py-2"
                  : "text-gray-600 hover:text-orange-500 transition-colors py-2"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link

              href="/contact"
              className={
                pathname === "/contact"
                  ? "text-orange-500 font-medium py-2"
                  : "text-gray-600 hover:text-orange-500 transition-colors py-2"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {isLoggedIn && (
              <Link
                href="/profile"
                className="text-gray-600 hover:text-orange-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                My Account
              </Link>
            )}
            <Link

              href="/add-listing"
              className="text-gray-600 hover:text-orange-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Car className="mr-2 h-4 w-4" />
              Add listing
            </Link>
            <Link

              href="/login"
              className="text-gray-600 hover:text-orange-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Login / Register
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
