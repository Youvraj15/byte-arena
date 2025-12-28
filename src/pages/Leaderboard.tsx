import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Medal,
  Crown,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  Star,
  Flame
} from "lucide-react";
import { cn } from "@/lib/utils";

const timeFilters = ["All Time", "This Month", "This Week", "Today"];

const leaderboardData = [
  { rank: 1, name: "Alex Chen", username: "alexc", avatar: "AC", score: 52480, wins: 342, streak: 28, change: "up" },
  { rank: 2, name: "Sarah Kim", username: "sarahk", avatar: "SK", score: 48920, wins: 318, streak: 21, change: "up" },
  { rank: 3, name: "Marcus Johnson", username: "marcusj", avatar: "MJ", score: 47350, wins: 305, streak: 15, change: "down" },
  { rank: 4, name: "Elena Rodriguez", username: "elenar", avatar: "ER", score: 45200, wins: 289, streak: 12, change: "same" },
  { rank: 5, name: "David Park", username: "davidp", avatar: "DP", score: 43890, wins: 275, streak: 8, change: "up" },
  { rank: 6, name: "Emma Wilson", username: "emmaw", avatar: "EW", score: 42100, wins: 268, streak: 6, change: "down" },
  { rank: 7, name: "James Lee", username: "jamesl", avatar: "JL", score: 40750, wins: 255, streak: 14, change: "up" },
  { rank: 8, name: "Olivia Brown", username: "oliviab", avatar: "OB", score: 39200, wins: 242, streak: 3, change: "same" },
  { rank: 9, name: "Ryan Martinez", username: "ryanm", avatar: "RM", score: 38450, wins: 231, streak: 9, change: "up" },
  { rank: 10, name: "Sophie Taylor", username: "sophiet", avatar: "ST", score: 37100, wins: 220, streak: 5, change: "down" },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
    case 2: return <Medal className="h-6 w-6 text-gray-400" />;
    case 3: return <Medal className="h-6 w-6 text-amber-600" />;
    default: return null;
  }
};

const getChangeIcon = (change: string) => {
  switch (change) {
    case "up": return <TrendingUp className="h-4 w-4 text-success" />;
    case "down": return <TrendingDown className="h-4 w-4 text-destructive" />;
    default: return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
};

const getRankStyles = (rank: number) => {
  switch (rank) {
    case 1: return "bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border-yellow-500/30";
    case 2: return "bg-gradient-to-r from-gray-400/20 to-gray-400/5 border-gray-400/30";
    case 3: return "bg-gradient-to-r from-amber-600/20 to-amber-600/5 border-amber-600/30";
    default: return "bg-card border-border hover:border-primary/30";
  }
};

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState("All Time");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Leaderboard
            </h1>
            <p className="text-muted-foreground">
              See how you stack up against the best developers
            </p>
          </div>
          <div className="relative">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="h-10 pl-4 pr-10 rounded-lg border border-input bg-background text-sm appearance-none cursor-pointer"
            >
              {timeFilters.map((filter) => (
                <option key={filter} value={filter}>{filter}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-4">
          {leaderboardData.slice(0, 3).map((user, index) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative p-6 rounded-xl border shadow-card overflow-hidden",
                getRankStyles(user.rank),
                user.rank === 1 && "md:order-2 md:-mt-4",
                user.rank === 2 && "md:order-1",
                user.rank === 3 && "md:order-3"
              )}
            >
              {/* Rank Badge */}
              <div className="absolute top-4 right-4">
                {getRankIcon(user.rank)}
              </div>

              {/* Avatar */}
              <div className={cn(
                "flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold mb-4 mx-auto",
                user.rank === 1 && "bg-yellow-500 text-yellow-950",
                user.rank === 2 && "bg-gray-400 text-gray-950",
                user.rank === 3 && "bg-amber-600 text-amber-950"
              )}>
                {user.avatar}
              </div>

              <div className="text-center">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {user.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">@{user.username}</p>
                
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div>
                    <p className="font-bold text-foreground">{user.score.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Points</p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div>
                    <p className="font-bold text-foreground">{user.wins}</p>
                    <p className="text-xs text-muted-foreground">Wins</p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-primary" />
                    <p className="font-bold text-foreground">{user.streak}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Rank</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Developer</th>
                  <th className="text-right text-sm font-medium text-muted-foreground px-6 py-4">Score</th>
                  <th className="text-right text-sm font-medium text-muted-foreground px-6 py-4">Wins</th>
                  <th className="text-right text-sm font-medium text-muted-foreground px-6 py-4">Streak</th>
                  <th className="text-center text-sm font-medium text-muted-foreground px-6 py-4">Trend</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user, index) => (
                  <motion.tr
                    key={user.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(user.rank) || (
                          <span className="font-bold text-foreground">{user.rank}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-foreground">
                        {user.score.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-foreground">{user.wins}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Flame className="h-4 w-4 text-primary" />
                        <span className="text-foreground">{user.streak}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {getChangeIcon(user.change)}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Your Rank */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-6 bg-primary/5 rounded-xl border border-primary/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                JD
              </div>
              <div>
                <p className="font-semibold text-foreground">Your Ranking</p>
                <p className="text-sm text-muted-foreground">Keep pushing to climb higher!</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">#1,247</p>
                <p className="text-xs text-muted-foreground">Global Rank</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">15,420</p>
                <p className="text-xs text-muted-foreground">Points</p>
              </div>
              <div className="text-center flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-success" />
                <div>
                  <p className="text-lg font-bold text-success">+52</p>
                  <p className="text-xs text-muted-foreground">This week</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
