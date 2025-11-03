"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trophy, LogIn, LogOut } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { useAuth } from "@/contexts/auth-context"

export function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()

  function handleLogout() {
    logout()
    router.push('/')
  }

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

          {user ? (
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-yellow-500 hover:border-yellow-600/50 transition-all bg-transparent flex items-center gap-2">
                  <span className="font-medium">{user.username || user.email}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-44">
                <div className="flex flex-col">
                  <button onClick={handleLogout} className="text-left px-2 py-2 hover:bg-gray-800 rounded flex items-center gap-2"> <LogOut className="w-4 h-4"/> Logout</button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href="/login">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-yellow-500 hover:border-yellow-600/50 transition-all bg-transparent flex items-center"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Log In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
