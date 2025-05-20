import { CarListing } from "@/components/car-listing"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { SearchFilters } from "@/components/search-filters"
import { Trending } from "@/components/trending"
import { ComparisonBar } from "@/components/comparison-bar"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <SearchFilters />
      <Trending />
      <CarListing />
      <Footer />
      <ComparisonBar />
    </main>
  )
}
