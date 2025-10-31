import { Trophy, Crown, Medal, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data para el leaderboard
const leaderboardData = [
  { rank: 1, username: "CryptoKing", wagered: 15420, reward: 2500, avatar: "👑" },
  { rank: 2, username: "LuckyPlayer", wagered: 12850, reward: 1500, avatar: "🎯" },
  { rank: 3, username: "HighRoller", wagered: 11200, reward: 1000, avatar: "💎" },
  { rank: 4, username: "BetMaster", wagered: 9800, reward: 750, avatar: "🎲" },
  { rank: 5, username: "SlotQueen", wagered: 8900, reward: 500, avatar: "👸" },
  { rank: 6, username: "PokerPro", wagered: 8200, reward: 400, avatar: "♠️" },
  { rank: 7, username: "RouletteKing", wagered: 7800, reward: 350, avatar: "🎰" },
  { rank: 8, username: "BlackjackAce", wagered: 7200, reward: 300, avatar: "🃏" },
  { rank: 9, username: "DiceRoller", wagered: 6800, reward: 250, avatar: "🎯" },
  { rank: 10, username: "CasinoLegend", wagered: 6200, reward: 200, avatar: "⭐" },
  { rank: 11, username: "SpinMaster", wagered: 5800, reward: 150, avatar: "🎪" },
  { rank: 12, username: "BetWizard", wagered: 5400, reward: 100, avatar: "🧙" },
]

export function CasinoLeaderboard() {
  const topThree = leaderboardData.slice(0, 3)
  const restOfPlayers = leaderboardData.slice(3)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            LEADERBOARD
          </h1>
        </div>
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-black px-6 py-2 rounded-full inline-block font-bold text-lg">
          $5,000 CODE zhapssss LEADERBOARD!
        </div>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
          Every bet on Roobet under Code Zhapssss counts towards your wager. The leaderboard updates every 60 minutes.

Any table game wager abuse that Roobet detects is subject to disqualification.
Dice and Plinko will not count towards the leaderboard.
Your wagers on Roobet will count at the below weights based on the games that you're playing to help prevent leaderboard abuse.
Games with an RTP of 97% or less will contribute 100% of the amount wagered to the leaderboard.
Games with an RTP above 97% will contribute 50% of the amount wagered to the leaderboard.
Games with an RTP of 98% and above will contribute 10% of the amount wagered to the leaderboard.
Only wager from slots and Roobet originals will work.
        </p>
      </div>

      {/* Top 3 Winners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {topThree.map((player, index) => (
          <Card
            key={player.rank}
            className={`
            relative overflow-hidden border-2 p-6 text-center
            ${index === 0 ? "border-yellow-400 bg-gradient-to-br from-yellow-900/20 to-orange-900/20" : ""}
            ${index === 1 ? "border-gray-400 bg-gradient-to-br from-gray-800/20 to-gray-700/20" : ""}
            ${index === 2 ? "border-amber-600 bg-gradient-to-br from-amber-900/20 to-yellow-900/20" : ""}
            bg-black/40 backdrop-blur-sm
          `}
          >
            <div className="absolute top-2 right-2">
              {index === 0 && <Crown className="w-6 h-6 text-yellow-400" />}
              {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
              {index === 2 && <Medal className="w-6 h-6 text-amber-600" />}
            </div>

            <div className="text-6xl mb-4">{player.avatar}</div>

            <div
              className={`
              text-2xl font-bold mb-2
              ${index === 0 ? "text-yellow-400" : ""}
              ${index === 1 ? "text-gray-300" : ""}
              ${index === 2 ? "text-amber-500" : ""}
            `}
            >
              #{player.rank}
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">{player.username}</h3>

            <div className="space-y-2">
              <div className="text-gray-300">
                <span className="text-sm">Wagered:</span>
                <div className="font-bold text-lg">${player.wagered.toLocaleString()}</div>
              </div>

              <Badge
                className={`
                ${index === 0 ? "bg-yellow-500 text-black" : ""}
                ${index === 1 ? "bg-gray-500 text-white" : ""}
                ${index === 2 ? "bg-amber-600 text-white" : ""}
                font-bold
              `}
              >
                ${player.reward} Reward
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Previous Leaderboard Badge */}
      <div className="text-center mb-8">
        <Badge variant="outline" className="border-orange-500 text-orange-400 px-4 py-2">
          PREVIOUS LEADERBOARD
        </Badge>
      </div>

      {/* Leaderboard Table */}
      <Card className="bg-black/60 backdrop-blur-sm border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-4 text-gray-400 font-semibold">Rank</th>
                <th className="text-left p-4 text-gray-400 font-semibold">User</th>
                <th className="text-right p-4 text-gray-400 font-semibold">Wagered</th>
                <th className="text-right p-4 text-gray-400 font-semibold">Reward</th>
              </tr>
            </thead>
            <tbody>
              {restOfPlayers.map((player, index) => (
                <tr key={player.rank} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded text-black font-bold flex items-center justify-center text-sm">
                        #{player.rank}
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-lg">
                        {player.avatar}
                      </div>
                      <span className="text-white font-medium">{player.username}</span>
                    </div>
                  </td>

                  <td className="p-4 text-right">
                    <span className="text-white font-semibold">${player.wagered.toLocaleString()}</span>
                  </td>

                  <td className="p-4 text-right">
                    <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600 text-black font-bold">
                      ${player.reward}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Footer Info */}
      <div className="text-center mt-8 text-gray-400 text-sm">
        <p>Leaderboard updates every 60 minutes • Minimum wager: $10</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>Good luck and gamble responsibly!</span>
          <Star className="w-4 h-4 text-yellow-400" />
        </div>
      </div>
    </div>
  )
}
