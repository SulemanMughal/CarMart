import Link from "next/link"
import { Car, Heart, MessageSquare, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">My Listings</CardTitle>
            <CardDescription>Manage your car listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Car className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">3</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/listings">View Listings</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Favorites</CardTitle>
            <CardDescription>Cars you've saved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">7</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/favorites">View Favorites</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Messages</CardTitle>
            <CardDescription>Your conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <MessageSquare className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">12</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/messages">View Messages</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Profile</CardTitle>
            <CardDescription>Manage your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <User className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">1</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/profile">Edit Profile</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">New message from John Doe</p>
                  <p className="text-sm text-muted-foreground">About your BMW 3 Series listing</p>
                </div>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Your listing was approved</p>
                  <p className="text-sm text-muted-foreground">Mercedes-Benz C-Class 2019</p>
                </div>
                <p className="text-sm text-muted-foreground">Yesterday</p>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Someone favorited your listing</p>
                  <p className="text-sm text-muted-foreground">Audi A4 2020</p>
                </div>
                <p className="text-sm text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t">
            <Button asChild variant="ghost" className="w-full">
              <Link href="/notifications">View All Activity</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
