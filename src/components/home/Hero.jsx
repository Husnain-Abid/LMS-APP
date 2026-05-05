import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-4 py-24 text-center">

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Learn New Skills Anytime, Anywhere
        </h1>

        <p className="mt-4 text-purple-100 text-lg">
          Upgrade your knowledge with expert-led courses
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex items-center justify-center">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <Input
              placeholder="Search courses..."
              className="pl-10 py-6 rounded-full text-black bg-white/90 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Explore Button */}
        <div className="mt-6">
          <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-5 rounded-full">
            Explore Courses
          </Button>
        </div>

      </div>
    </section>
  )
}