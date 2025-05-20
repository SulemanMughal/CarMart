import Link from "next/link"
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold text-white">AutoDecar</span>
            </div>
            <p className="mb-4">
              Find your perfect car with AutoDecar, the premier car dealer and rental listing platform.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-500" />
                <span>123 Car Street, Auto City, AC 12345</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-orange-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-orange-500" />
                <span>info@autodecar.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/listing" className="hover:text-orange-500 transition-colors">
                  Car Listings
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Car Types</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/cars/sedan" className="hover:text-orange-500 transition-colors">
                  Sedan
                </Link>
              </li>
              <li>
                <Link href="/cars/suv" className="hover:text-orange-500 transition-colors">
                  SUV
                </Link>
              </li>
              <li>
                <Link href="/cars/coupe" className="hover:text-orange-500 transition-colors">
                  Coupe
                </Link>
              </li>
              <li>
                <Link href="/cars/truck" className="hover:text-orange-500 transition-colors">
                  Truck
                </Link>
              </li>
              <li>
                <Link href="/cars/electric" className="hover:text-orange-500 transition-colors">
                  Electric
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter to receive updates and special offers.</p>
            <div className="flex gap-2 mb-4">
              <Input type="email" placeholder="Your email" className="bg-gray-800 border-gray-700 text-white" />
              <Button className="bg-orange-500 hover:bg-orange-600">Subscribe</Button>
            </div>
            <div className="flex gap-4 mt-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <p>© 2024 AutoDecar. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/terms" className="text-sm hover:text-orange-500 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm hover:text-orange-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/sitemap" className="text-sm hover:text-orange-500 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
