"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type BonusStatus = "Pending" | "Opened" | "Completed"

interface AddBonusModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (bonus: {
    slotName: string
    bet: number
    multiplier: number
    win: number
    status: BonusStatus
  }) => void
}

export function AddBonusModal({ isOpen, onClose, onAdd }: AddBonusModalProps) {
  const [slotName, setSlotName] = useState("")
  const [bet, setBet] = useState("")
  const [multiplier, setMultiplier] = useState("")
  const [win, setWin] = useState("")
  const [status, setStatus] = useState<BonusStatus>("Pending")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onAdd({
      slotName,
      bet: Number.parseFloat(bet) || 0,
      multiplier: Number.parseFloat(multiplier) || 0,
      win: Number.parseFloat(win) || 0,
      status,
    })

    // Reset form
    setSlotName("")
    setBet("")
    setMultiplier("")
    setWin("")
    setStatus("Pending")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="bg-gray-900 border-gray-800 w-full max-w-md">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Add New Bonus
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Slot Name</label>
              <input
                type="text"
                value={slotName}
                onChange={(e) => setSlotName(e.target.value)}
                className="w-full bg-black/60 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="e.g., Gates of Olympus"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Bet Amount ($)</label>
              <input
                type="number"
                step="0.01"
                value={bet}
                onChange={(e) => setBet(e.target.value)}
                className="w-full bg-black/60 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="50.00"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Multiplier (x)</label>
              <input
                type="number"
                step="0.01"
                value={multiplier}
                onChange={(e) => setMultiplier(e.target.value)}
                className="w-full bg-black/60 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="0 (if not opened yet)"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Win Amount ($)</label>
              <input
                type="number"
                step="0.01"
                value={win}
                onChange={(e) => setWin(e.target.value)}
                className="w-full bg-black/60 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="0 (if not opened yet)"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as BonusStatus)}
                className="w-full bg-black/60 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors"
              >
                <option value="Pending">Pending</option>
                <option value="Opened">Opened</option>
                <option value="Completed">Completed</option>
              </select>
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
                Add Bonus
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
