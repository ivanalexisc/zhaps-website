"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CreateHuntModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (startBalance: number) => void
}

export function CreateHuntModal({ isOpen, onClose, onCreate }: CreateHuntModalProps) {
  const [startBalance, setStartBalance] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onCreate(Number.parseFloat(startBalance) || 0)

    setStartBalance("")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="bg-gray-900 border-gray-800 w-full max-w-md">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Create New Hunt
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Start Balance ($)</label>
              <input
                type="number"
                step="0.01"
                value={startBalance}
                onChange={(e) => setStartBalance(e.target.value)}
                className="w-full bg-black/60 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="1000000.00"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-black font-bold"
              >
                Create Hunt
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
