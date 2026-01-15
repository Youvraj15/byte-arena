import { motion } from "framer-motion";
import { Flame, Calendar, Target, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  className?: string;
}

export function StreakCard({
  currentStreak,
  longestStreak,
  totalActiveDays,
  className,
}: StreakCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className={cn(
        "relative p-6 rounded-2xl border border-border bg-card overflow-hidden",
        className
      )}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Current Streak
            </h3>
            <p className="text-sm text-muted-foreground">Keep it going!</p>
          </div>
        </div>

        {/* Main streak display */}
        <div className="text-center mb-6">
          <motion.p
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-6xl font-bold text-foreground"
          >
            {currentStreak}
          </motion.p>
          <p className="text-muted-foreground">days</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            <Target className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">{longestStreak}</p>
              <p className="text-xs text-muted-foreground">Longest streak</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">{totalActiveDays}</p>
              <p className="text-xs text-muted-foreground">Active days</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
