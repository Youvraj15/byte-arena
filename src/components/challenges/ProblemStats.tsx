import { motion } from "framer-motion";
import { ProgressRing } from "@/components/ui/progress-ring";

interface ProblemStatsProps {
  total: number;
  solved: number;
  easy: { total: number; solved: number };
  medium: { total: number; solved: number };
  hard: { total: number; solved: number };
}

export function ProblemStats({ total, solved, easy, medium, hard }: ProblemStatsProps) {
  const progress = total > 0 ? Math.round((solved / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 rounded-2xl border border-border bg-card"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center gap-8">
        {/* Progress Ring */}
        <ProgressRing progress={progress} size={140} strokeWidth={10}>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">{solved}</p>
            <p className="text-xs text-muted-foreground">/ {total} solved</p>
          </div>
        </ProgressRing>

        {/* Difficulty Breakdown */}
        <div className="flex-1 space-y-4">
          {/* Easy */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-success">Easy</span>
              <span className="text-sm text-muted-foreground">
                {easy.solved}/{easy.total}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(easy.solved / easy.total) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-full bg-success rounded-full"
              />
            </div>
          </div>

          {/* Medium */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-warning">Medium</span>
              <span className="text-sm text-muted-foreground">
                {medium.solved}/{medium.total}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(medium.solved / medium.total) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-full bg-warning rounded-full"
              />
            </div>
          </div>

          {/* Hard */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-destructive">Hard</span>
              <span className="text-sm text-muted-foreground">
                {hard.solved}/{hard.total}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(hard.solved / hard.total) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-full bg-destructive rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
