import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Trophy,
  Code,
  Target,
  Flame,
  TrendingUp,
  Calendar,
  BarChart3,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SolvedProblem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  solvedAt: string;
  attempts: number;
  runtime: string;
  language: string;
  status: "accepted" | "wrong";
}

interface ContestParticipation {
  id: string;
  title: string;
  rank: number;
  totalParticipants: number;
  score: number;
  totalScore: number;
  date: string;
}

export interface StudentDetail {
  id: number;
  name: string;
  email: string;
  avatar: string;
  rank: number;
  problemsSolved: number;
  totalSubmissions: number;
  lastActive: string;
  status: "online" | "offline" | "solving";
  currentProblem?: string;
  joinedAt: string;
  streak: number;
  maxStreak: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  acceptanceRate: number;
  solvedProblems: SolvedProblem[];
  contestHistory: ContestParticipation[];
  categoryBreakdown: { category: string; count: number }[];
  recentActivity: { date: string; count: number }[];
}

// Generate mock detailed data for a student
export function generateStudentDetail(student: {
  id: number;
  name: string;
  email: string;
  avatar: string;
  problemsSolved: number;
  totalSubmissions: number;
  rank: number;
  lastActive: string;
  status: "online" | "offline" | "solving";
  currentProblem?: string;
}): StudentDetail {
  const easyCount = Math.floor(student.problemsSolved * 0.5);
  const mediumCount = Math.floor(student.problemsSolved * 0.35);
  const hardCount = student.problemsSolved - easyCount - mediumCount;

  const solvedProblems: SolvedProblem[] = [
    { id: 1, title: "Two Sum", difficulty: "Easy", category: "Arrays", solvedAt: "2 hours ago", attempts: 1, runtime: "52ms", language: "Python", status: "accepted" },
    { id: 2, title: "Add Two Numbers", difficulty: "Medium", category: "Linked List", solvedAt: "5 hours ago", attempts: 2, runtime: "68ms", language: "Python", status: "accepted" },
    { id: 3, title: "Longest Substring", difficulty: "Medium", category: "Strings", solvedAt: "1 day ago", attempts: 3, runtime: "89ms", language: "Java", status: "accepted" },
    { id: 4, title: "Median of Arrays", difficulty: "Hard", category: "Binary Search", solvedAt: "2 days ago", attempts: 5, runtime: "120ms", language: "C++", status: "accepted" },
    { id: 5, title: "Valid Parentheses", difficulty: "Easy", category: "Strings", solvedAt: "3 days ago", attempts: 1, runtime: "28ms", language: "Python", status: "accepted" },
    { id: 6, title: "Merge Sort", difficulty: "Medium", category: "Sorting", solvedAt: "4 days ago", attempts: 2, runtime: "45ms", language: "Python", status: "accepted" },
    { id: 7, title: "Binary Search", difficulty: "Easy", category: "Searching", solvedAt: "5 days ago", attempts: 1, runtime: "32ms", language: "JavaScript", status: "accepted" },
    { id: 8, title: "LRU Cache", difficulty: "Hard", category: "Design", solvedAt: "1 week ago", attempts: 4, runtime: "156ms", language: "Python", status: "accepted" },
  ];

  const contestHistory: ContestParticipation[] = [
    { id: "1", title: "Weekly Sprint #24", rank: 5, totalParticipants: 156, score: 350, totalScore: 500, date: "Feb 1, 2026" },
    { id: "2", title: "Data Structures Marathon", rank: 12, totalParticipants: 89, score: 280, totalScore: 400, date: "Jan 25, 2026" },
    { id: "3", title: "Algorithm Challenge #10", rank: 3, totalParticipants: 120, score: 450, totalScore: 500, date: "Jan 18, 2026" },
  ];

  const categoryBreakdown = [
    { category: "Arrays", count: Math.ceil(student.problemsSolved * 0.25) },
    { category: "Strings", count: Math.ceil(student.problemsSolved * 0.2) },
    { category: "Linked List", count: Math.ceil(student.problemsSolved * 0.12) },
    { category: "Trees", count: Math.ceil(student.problemsSolved * 0.1) },
    { category: "Dynamic Programming", count: Math.ceil(student.problemsSolved * 0.1) },
    { category: "Graphs", count: Math.ceil(student.problemsSolved * 0.08) },
    { category: "Binary Search", count: Math.ceil(student.problemsSolved * 0.08) },
    { category: "Sorting", count: Math.ceil(student.problemsSolved * 0.07) },
  ];

  return {
    ...student,
    joinedAt: "Sep 15, 2025",
    streak: 7,
    maxStreak: 14,
    easyCount,
    mediumCount,
    hardCount,
    acceptanceRate: Math.round((student.problemsSolved / student.totalSubmissions) * 100),
    solvedProblems,
    contestHistory,
    categoryBreakdown,
    recentActivity: [],
  };
}

interface StudentDetailModalProps {
  student: StudentDetail | null;
  open: boolean;
  onClose: () => void;
}

export function StudentDetailModal({ student, open, onClose }: StudentDetailModalProps) {
  if (!student) return null;

  const maxCategory = Math.max(...student.categoryBreakdown.map(c => c.count));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="sr-only">Student Details</DialogTitle>
        </DialogHeader>

        {/* Header */}
        <div className="px-6 pb-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                {student.avatar}
              </div>
              <div className={cn(
                "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-card",
                student.status === "online" && "bg-success",
                student.status === "solving" && "bg-primary animate-pulse",
                student.status === "offline" && "bg-muted-foreground"
              )} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-display font-bold text-foreground">{student.name}</h2>
                <Badge variant="outline">#{student.rank}</Badge>
                <Badge variant="secondary" className={cn(
                  "text-xs",
                  student.status === "online" && "bg-success/10 text-success",
                  student.status === "solving" && "bg-primary/10 text-primary",
                  student.status === "offline" && "bg-muted text-muted-foreground"
                )}>
                  {student.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{student.email}</p>
              <p className="text-xs text-muted-foreground mt-1">Joined {student.joinedAt} • Last active {student.lastActive}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatBox icon={CheckCircle2} label="Problems Solved" value={student.problemsSolved} color="text-success" />
          <StatBox icon={Target} label="Acceptance Rate" value={`${student.acceptanceRate}%`} color="text-primary" />
          <StatBox icon={Flame} label="Current Streak" value={`${student.streak} days`} color="text-warning" />
          <StatBox icon={TrendingUp} label="Total Submissions" value={student.totalSubmissions} color="text-muted-foreground" />
        </div>

        {/* Difficulty Breakdown */}
        <div className="px-6 mt-4">
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            Difficulty Breakdown
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-success/5 border border-success/20 rounded-lg text-center">
              <p className="text-2xl font-bold text-success">{student.easyCount}</p>
              <p className="text-xs text-muted-foreground">Easy</p>
            </div>
            <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg text-center">
              <p className="text-2xl font-bold text-warning">{student.mediumCount}</p>
              <p className="text-xs text-muted-foreground">Medium</p>
            </div>
            <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg text-center">
              <p className="text-2xl font-bold text-destructive">{student.hardCount}</p>
              <p className="text-xs text-muted-foreground">Hard</p>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="px-6 mt-4">
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Code className="h-4 w-4 text-primary" />
            Category Breakdown
          </h3>
          <div className="space-y-2">
            {student.categoryBreakdown.map((cat) => (
              <div key={cat.category} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-32 truncate">{cat.category}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(cat.count / maxCategory) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-foreground w-6 text-right">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contest History */}
        <div className="px-6 mt-4">
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            Contest History
          </h3>
          <div className="space-y-2">
            {student.contestHistory.map((contest) => (
              <div key={contest.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">{contest.title}</p>
                  <p className="text-xs text-muted-foreground">{contest.date}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={cn(
                      contest.rank <= 3 ? "bg-primary/10 text-primary border-primary/30" : ""
                    )}>
                      #{contest.rank} / {contest.totalParticipants}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{contest.score}/{contest.totalScore} pts</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Solved Problems */}
        <div className="px-6 mt-4 pb-6">
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Recently Solved Problems
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-medium text-muted-foreground px-3 py-2">Problem</th>
                  <th className="text-left font-medium text-muted-foreground px-3 py-2">Category</th>
                  <th className="text-center font-medium text-muted-foreground px-3 py-2">Difficulty</th>
                  <th className="text-center font-medium text-muted-foreground px-3 py-2">Attempts</th>
                  <th className="text-center font-medium text-muted-foreground px-3 py-2">Runtime</th>
                  <th className="text-center font-medium text-muted-foreground px-3 py-2">Language</th>
                  <th className="text-right font-medium text-muted-foreground px-3 py-2">Solved</th>
                </tr>
              </thead>
              <tbody>
                {student.solvedProblems.map((problem) => (
                  <tr key={problem.id} className="border-b border-border last:border-0">
                    <td className="px-3 py-2 font-medium text-foreground">{problem.title}</td>
                    <td className="px-3 py-2 text-muted-foreground">{problem.category}</td>
                    <td className="px-3 py-2">
                      <div className="flex justify-center">
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-xs",
                            problem.difficulty === "Easy" && "bg-success/10 text-success",
                            problem.difficulty === "Medium" && "bg-warning/10 text-warning",
                            problem.difficulty === "Hard" && "bg-destructive/10 text-destructive"
                          )}
                        >
                          {problem.difficulty}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-center text-muted-foreground">{problem.attempts}</td>
                    <td className="px-3 py-2 text-center text-muted-foreground">{problem.runtime}</td>
                    <td className="px-3 py-2 text-center">
                      <Badge variant="outline" className="text-xs">{problem.language}</Badge>
                    </td>
                    <td className="px-3 py-2 text-right text-muted-foreground text-xs">{problem.solvedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StatBox({ icon: Icon, label, value, color }: { icon: any; label: string; value: string | number; color: string }) {
  return (
    <div className="p-3 bg-muted/30 rounded-lg border border-border">
      <div className={cn("flex items-center gap-1.5 mb-1", color)}>
        <Icon className="h-4 w-4" />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-lg font-bold text-foreground">{value}</p>
    </div>
  );
}
