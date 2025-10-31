"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trophy, LogIn } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-gray-800/50 bg-gray-950/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
            <Trophy className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
            Zhapssss
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/bonus-hunt">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-yellow-500 hover:border-yellow-600/50 transition-all bg-transparent"
            >
              Bonus Hunts
            </Button>
          </Link>

          <Link href="/login">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-yellow-500 hover:border-yellow-600/50 transition-all bg-transparent"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
