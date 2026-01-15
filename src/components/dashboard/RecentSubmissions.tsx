import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { DifficultyBadge } from "@/components/challenges/DifficultyBadge";

interface Submission {
  id: number;
  problem: string;
  problemId: number;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "accepted" | "wrong" | "pending";
  runtime: string;
  memory: string;
  time: string;
  language: string;
}

interface RecentSubmissionsProps {
  submissions: Submission[];
  className?: string;
}

const mockSubmissions: Submission[] = [
  { id: 1, problem: "Two Sum", problemId: 1, difficulty: "Easy", status: "accepted", runtime: "52ms", memory: "42.1 MB", time: "2 hours ago", language: "Python" },
  { id: 2, problem: "Add Two Numbers", problemId: 2, difficulty: "Medium", status: "accepted", runtime: "68ms", memory: "44.2 MB", time: "5 hours ago", language: "Python" },
  { id: 3, problem: "Median of Two Sorted Arrays", problemId: 4, difficulty: "Hard", status: "wrong", runtime: "-", memory: "-", time: "1 day ago", language: "C++" },
  { id: 4, problem: "Longest Palindromic Substring", problemId: 5, difficulty: "Medium", status: "accepted", runtime: "89ms", memory: "45.8 MB", time: "2 days ago", language: "Java" },
  { id: 5, problem: "Valid Parentheses", problemId: 6, difficulty: "Easy", status: "accepted", runtime: "28ms", memory: "41.2 MB", time: "3 days ago", language: "Python" },
];

export function RecentSubmissions({ submissions = mockSubmissions, className }: RecentSubmissionsProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "wrong":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-warning" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "accepted":
        return "Accepted";
      case "wrong":
        return "Wrong Answer";
      default:
        return "Pending";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className={cn("rounded-2xl border border-border bg-card overflow-hidden", className)}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="p-6 border-b border-border">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Recent Submissions
        </h3>
      </div>

      <div className="divide-y divide-border">
        {submissions.map((submission, index) => (
          <motion.div
            key={submission.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="px-6 py-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getStatusIcon(submission.status)}
                <div>
                  <Link
                    to={`/challenges/${submission.problemId}`}
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {submission.problem}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <DifficultyBadge difficulty={submission.difficulty} />
                    <span className="text-xs text-muted-foreground">{submission.language}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={cn(
                  "text-sm font-medium",
                  submission.status === "accepted" ? "text-success" : "text-destructive"
                )}>
                  {getStatusText(submission.status)}
                </p>
                {submission.status === "accepted" && (
                  <p className="text-xs text-muted-foreground">
                    {submission.runtime} • {submission.memory}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">{submission.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
