"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Bonus } from "@/types"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EditBonusModalProps {
  isOpen: boolean
  onClose: () => void
  onEdit: (bonus: Bonus) => Promise<void>
  bonus: Bonus
}

export function EditBonusModal({ isOpen, onClose, onEdit, bonus }: EditBonusModalProps) {
  const [slotName, setSlotName] = useState(bonus.slotName)
  const [bet, setBet] = useState(String(bonus.bet ?? ''))
  const [multiplier, setMultiplier] = useState(String(bonus.multiplier ?? ''))
  const [win, setWin] = useState(String(bonus.win ?? ''))
  const [status, setStatus] = useState<Bonus["status"]>(bonus.status)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setSlotName(bonus.slotName)
    setBet(String(bonus.bet ?? ''))
    setMultiplier(String(bonus.multiplier ?? ''))
    setWin(String(bonus.win ?? ''))
    setStatus(bonus.status)
  }, [bonus])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const updatedBonus: Bonus = {
      id: bonus.id,
      slotName,
      bet: Number.parseFloat(bet) || 0,
      multiplier: Number.parseFloat(multiplier) || 0,
      win: Number.parseFloat(win) || 0,
      status,
      bonusHuntId: bonus.bonusHuntId,
    }

    try {
      await onEdit(updatedBonus)
      onClose()
    } catch (err) {
      console.error('Failed to update bonus', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="bg-gray-900 border-gray-800 w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Edit Bonus #{bonus.id}
            </h2>
            <Button onClick={onClose} variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="slotName" className="text-gray-300">
                Slot Name
              </Label>
              <Input
                id="slotName"
                value={slotName}
                onChange={(e) => setSlotName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white mt-1"
                placeholder="e.g., Gates of Olympus"
                required
              />
            </div>

            <div>
              <Label htmlFor="bet" className="text-gray-300">
                Bet Amount ($)
              </Label>
              <Input
                id="bet"
                type="number"
                step="0.01"
                value={bet}
                onChange={(e) => setBet(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white mt-1"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <Label htmlFor="multiplier" className="text-gray-300">
                Multiplier (x)
              </Label>
              <Input
                id="multiplier"
                type="number"
                step="0.01"
                value={multiplier}
                onChange={(e) => setMultiplier(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white mt-1"
                placeholder="0"
              />
            </div>

            <div>
              <Label htmlFor="win" className="text-gray-300">
                Win Amount ($)
              </Label>
              <Input
                id="win"
                type="number"
                step="0.01"
                value={win}
                onChange={(e) => setWin(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white mt-1"
                placeholder="0.00"
              />
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Status</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => setStatus("Pending")}
                  className={`flex-1 ${
                    status === "Pending"
                      ? "bg-yellow-500 text-black hover:bg-yellow-600"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                  disabled={isLoading}
                >
                  Pending
                </Button>
                
                <Button
                  type="button"
                  onClick={() => setStatus("Completed")}
                  className={`flex-1 ${
                    status === "Completed"
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                  disabled={isLoading}
                >
                  Completed
                </Button>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-black font-bold"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
