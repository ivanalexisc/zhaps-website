"use client"

import { useState } from "react"
import { Trophy, Plus, ArrowLeft, DollarSign, Target, Package, TrendingUp, Lock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AddBonusModal } from "@/components/add-bonus-modal"
import { CreateHuntModal } from "@/components/create-hunt-modal"
import { EditBonusModal } from "@/components/edit-bonus-modal"

type BonusStatus = "Pending" | "Opened" | "Completed"

interface Bonus {
  id: number
  slotName: string
  bet: number
  multiplier: number
  win: number
  status: BonusStatus
}

interface BonusHunt {
  id: string
  date: string
  startBalance: number
  bonuses: Bonus[]
  isFinished?: boolean
}

const initialHunts: BonusHunt[] = [
  {
    id: "hunt-1",
    date: "10/27/2025",
    startBalance: 1000000,
    isFinished: false,
    bonuses: [
      { id: 1, slotName: "Gates of Olympus", bet: 50, multiplier: 65, win: 3250, status: "Completed" },
      { id: 2, slotName: "Sweet Bonanza", bet: 40, multiplier: 45, win: 1800, status: "Completed" },
      { id: 3, slotName: "Sugar Rush", bet: 60, multiplier: 32, win: 1920, status: "Completed" },
    ],
  },
  {
    id: "hunt-2",
    date: "10/25/2025",
    startBalance: 1100000,
    isFinished: false,
    bonuses: [
      { id: 1, slotName: "Starlight Princess", bet: 45, multiplier: 150, win: 6750, status: "Completed" },
      { id: 2, slotName: "Dog House", bet: 35, multiplier: 89, win: 3115, status: "Completed" },
      { id: 3, slotName: "Fruit Party", bet: 50, multiplier: 120, win: 6000, status: "Completed" },
    ],
  },
]

export function BonusHuntManager() {
  const [hunts, setHunts] = useState<BonusHunt[]>(initialHunts)
  const [selectedHunt, setSelectedHunt] = useState<string | null>(null)
  const [isAddBonusModalOpen, setIsAddBonusModalOpen] = useState(false)
  const [isCreateHuntModalOpen, setIsCreateHuntModalOpen] = useState(false)
  const [isEditBonusModalOpen, setIsEditBonusModalOpen] = useState(false)
  const [editingBonus, setEditingBonus] = useState<Bonus | null>(null)
  const [sortColumn, setSortColumn] = useState<keyof Bonus | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const currentHunt = hunts.find((h) => h.id === selectedHunt)

  const getHuntStats = (hunt: BonusHunt) => {
    const totalWagered = hunt.bonuses.reduce((sum, bonus) => sum + bonus.bet, 0)
    const totalWin = hunt.bonuses.reduce((sum, bonus) => sum + bonus.win, 0)
    const biggestWin = hunt.bonuses.length > 0 ? Math.max(...hunt.bonuses.map((b) => b.win)) : 0
    const highestMultiplier = hunt.bonuses.length > 0 ? Math.max(...hunt.bonuses.map((b) => b.multiplier)) : 0
    const payout = hunt.startBalance - totalWagered + totalWin

    return {
      totalWagered,
      totalWin,
      biggestWin,
      highestMultiplier,
      payout,
      bonusCount: hunt.bonuses.length,
    }
  }

  const handleSort = (column: keyof Bonus) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const getSortedBonuses = (bonuses: Bonus[]) => {
    if (!sortColumn) return bonuses

    return [...bonuses].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }

  const handleAddBonus = (newBonus: Omit<Bonus, "id">) => {
    if (!selectedHunt) return

    setHunts((prevHunts) =>
      prevHunts.map((hunt) => {
        if (hunt.id === selectedHunt) {
          const maxId = hunt.bonuses.length > 0 ? Math.max(...hunt.bonuses.map((b) => b.id)) : 0
          return {
            ...hunt,
            bonuses: [...hunt.bonuses, { ...newBonus, id: maxId + 1 }],
          }
        }
        return hunt
      }),
    )
  }

  const handleEditBonus = (updatedBonus: Bonus) => {
    if (!selectedHunt) return

    setHunts((prevHunts) =>
      prevHunts.map((hunt) => {
        if (hunt.id === selectedHunt) {
          return {
            ...hunt,
            bonuses: hunt.bonuses.map((bonus) => (bonus.id === updatedBonus.id ? updatedBonus : bonus)),
          }
        }
        return hunt
      }),
    )
  }

  const handleBonusClick = (bonus: Bonus) => {
    if (currentHunt?.isFinished) return
    setEditingBonus(bonus)
    setIsEditBonusModalOpen(true)
  }

  const handleFinishHunt = () => {
    if (!selectedHunt) return

    setHunts((prevHunts) =>
      prevHunts.map((hunt) => {
        if (hunt.id === selectedHunt) {
          return {
            ...hunt,
            isFinished: true,
          }
        }
        return hunt
      }),
    )
  }

  const handleCreateHunt = (startBalance: number) => {
    const newHunt: BonusHunt = {
      id: `hunt-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US"),
      startBalance,
      bonuses: [],
      isFinished: false,
    }
    setHunts([newHunt, ...hunts])
  }

  const getStatusColor = (status: BonusStatus) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-black"
      case "Opened":
        return "bg-blue-500 text-white"
      case "Completed":
        return "bg-green-500 text-white"
    }
  }

  if (!selectedHunt) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              BONUS HUNT MANAGER
            </h1>
          </div>

          <Button
            onClick={() => setIsCreateHuntModalOpen(true)}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-black font-bold mt-4"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Hunt
          </Button>
        </div>

        {/* Hunts Table */}
        <Card className="bg-black/60 backdrop-blur-sm border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-gray-400 font-semibold">Date</th>
                  <th className="text-right p-4 text-gray-400 font-semibold">Start Balance</th>
                  <th className="text-center p-4 text-gray-400 font-semibold">Bonuses</th>
                  <th className="text-right p-4 text-gray-400 font-semibold">Biggest Win</th>
                  <th className="text-right p-4 text-gray-400 font-semibold">Highest X</th>
                  <th className="text-right p-4 text-gray-400 font-semibold">Payout</th>
                </tr>
              </thead>
              <tbody>
                {hunts.map((hunt) => {
                  const stats = getHuntStats(hunt)
                  const isProfit = stats.payout >= hunt.startBalance

                  return (
                    <tr
                      key={hunt.id}
                      onClick={() => setSelectedHunt(hunt.id)}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors cursor-pointer"
                    >
                      <td className="p-4">
                        <span className="text-white font-medium">{hunt.date}</span>
                      </td>

                      <td className="p-4 text-right">
                        <span className="text-white font-semibold">${hunt.startBalance.toLocaleString()}</span>
                      </td>

                      <td className="p-4 text-center">
                        <span className="text-white font-semibold">{stats.bonusCount}</span>
                      </td>

                      <td className="p-4 text-right">
                        <span className="text-white font-semibold">${stats.biggestWin.toLocaleString()}</span>
                      </td>

                      <td className="p-4 text-right">
                        <span className="text-yellow-400 font-bold">{stats.highestMultiplier}x</span>
                      </td>

                      <td className="p-4 text-right">
                        <span className={`font-bold text-lg ${isProfit ? "text-green-400" : "text-red-400"}`}>
                          ${stats.payout.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <CreateHuntModal
          isOpen={isCreateHuntModalOpen}
          onClose={() => setIsCreateHuntModalOpen(false)}
          onCreate={handleCreateHunt}
        />
      </div>
    )
  }

  const stats = currentHunt ? getHuntStats(currentHunt) : null
  const sortedBonuses = currentHunt ? getSortedBonuses(currentHunt.bonuses) : []

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <Button
          onClick={() => setSelectedHunt(null)}
          variant="outline"
          className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Hunts
        </Button>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Bonus Hunt - {currentHunt?.date}
              </h1>
              <p className="text-gray-400 text-sm mt-1">Start Balance: ${currentHunt?.startBalance.toLocaleString()}</p>
              {currentHunt?.isFinished && (
                <Badge className="bg-red-500 text-white font-bold mt-2">
                  <Lock className="w-3 h-3 mr-1" />
                  Hunt Finished
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {!currentHunt?.isFinished && (
              <>
                <Button
                  onClick={handleFinishHunt}
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Finish Hunt
                </Button>
                <Button
                  onClick={() => setIsAddBonusModalOpen(true)}
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-black font-bold"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Bonus
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/60 backdrop-blur-sm border-gray-800 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Wagered</p>
                <p className="text-2xl font-bold text-white">${stats.totalWagered.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-black/60 backdrop-blur-sm border-gray-800 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Win</p>
                <p className="text-2xl font-bold text-white">${stats.totalWin.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-black/60 backdrop-blur-sm border-gray-800 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">HIGHEST X</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.highestMultiplier}x</p>
              </div>
            </div>
          </Card>

          <Card className="bg-black/60 backdrop-blur-sm border-gray-800 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Bonuses</p>
                <p className="text-2xl font-bold text-white">{stats.bonusCount}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Bonus List Table */}
      <Card className="bg-black/60 backdrop-blur-sm border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th
                  className="text-left p-4 text-gray-400 font-semibold cursor-pointer hover:text-gray-200 transition-colors"
                  onClick={() => handleSort("id")}
                >
                  ID {sortColumn === "id" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="text-left p-4 text-gray-400 font-semibold cursor-pointer hover:text-gray-200 transition-colors"
                  onClick={() => handleSort("slotName")}
                >
                  Slot Name {sortColumn === "slotName" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="text-right p-4 text-gray-400 font-semibold cursor-pointer hover:text-gray-200 transition-colors"
                  onClick={() => handleSort("bet")}
                >
                  Bet ($) {sortColumn === "bet" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="text-right p-4 text-gray-400 font-semibold cursor-pointer hover:text-gray-200 transition-colors"
                  onClick={() => handleSort("multiplier")}
                >
                  Multiplier (x) {sortColumn === "multiplier" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="text-right p-4 text-gray-400 font-semibold cursor-pointer hover:text-gray-200 transition-colors"
                  onClick={() => handleSort("win")}
                >
                  Win ($) {sortColumn === "win" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="text-center p-4 text-gray-400 font-semibold cursor-pointer hover:text-gray-200 transition-colors"
                  onClick={() => handleSort("status")}
                >
                  Status {sortColumn === "status" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedBonuses.map((bonus) => (
                <tr
                  key={bonus.id}
                  onClick={() => handleBonusClick(bonus)}
                  className={`border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors ${
                    !currentHunt?.isFinished ? "cursor-pointer" : "cursor-not-allowed opacity-70"
                  }`}
                >
                  <td className="p-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded text-black font-bold flex items-center justify-center text-sm">
                      #{bonus.id}
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="text-white font-medium">{bonus.slotName}</span>
                  </td>

                  <td className="p-4 text-right">
                    <span className="text-white font-semibold">${bonus.bet}</span>
                  </td>

                  <td className="p-4 text-right">
                    <span className={`font-bold ${bonus.multiplier > 0 ? "text-yellow-400" : "text-gray-500"}`}>
                      {bonus.multiplier > 0 ? `${bonus.multiplier}x` : "-"}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <span className={`font-bold ${bonus.win > 0 ? "text-green-400" : "text-gray-500"}`}>
                      {bonus.win > 0 ? `$${bonus.win.toLocaleString()}` : "-"}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <Badge className={`${getStatusColor(bonus.status)} font-bold`}>{bonus.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <AddBonusModal
        isOpen={isAddBonusModalOpen}
        onClose={() => setIsAddBonusModalOpen(false)}
        onAdd={handleAddBonus}
      />

      {editingBonus && (
        <EditBonusModal
          isOpen={isEditBonusModalOpen}
          onClose={() => {
            setIsEditBonusModalOpen(false)
            setEditingBonus(null)
          }}
          onEdit={handleEditBonus}
          bonus={editingBonus}
        />
      )}
    </div>
  )
}
