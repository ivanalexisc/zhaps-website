"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Trophy, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export function LoginFormClient() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data?.message || "Error en autenticación")
        setLoading(false)
        return
      }

      login(data.token, data.user)
      setLoading(false)
      router.push("/")
    } catch (err: any) {
      setError(err?.message || "Error en la petición")
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md bg-gray-900/90 border-gray-800 backdrop-blur-sm">
      <div className="p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-600 to-orange-600 flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input id="email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-600" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-yellow-600" required />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-700 bg-gray-800" />
              Remember me
            </label>
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-black font-bold py-6 text-lg disabled:opacity-60">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-800">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-300 transition-colors flex items-center justify-center gap-2">← Back to Home</Link>
        </div>
      </div>
    </Card>
  )
}
