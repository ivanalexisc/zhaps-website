export type BonusStatus = "Pending" | "Opened" | "Completed"

export interface Bonus {
  id: number
  slotName: string
  bet: number
  multiplier: number
  win: number
  status: BonusStatus
  bonusHuntId: string
}

export interface BonusHunt {
  id: string
  date: string
  startBalance: number
  bonuses: Bonus[]
  isFinished: boolean
  userId: number
}