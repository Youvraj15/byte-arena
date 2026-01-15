import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Swords, 
  TrendingUp, 
  Clock,
  ArrowRight,
  Flame,
  Target,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { StatCard } from "@/components/ui/stat-card";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { RecentSubmissions } from "@/components/dashboard/RecentSubmissions";
import { ProgressRing } from "@/components/ui/progress-ring";

const statsCards = [
  { label: "Global Rank", value: "#1,247", icon: Trophy, trend: "+52", trendUp: true },
  { label: "Problems Solved", value: "86", icon: Target, trend: "+12", trendUp: true },
  { label: "Acceptance Rate", value: "73%", icon: TrendingUp, trend: "+5%", trendUp: true },
  { label: "Total Time", value: "142h", icon: Clock },
];

const suggestedProblems = [
  { id: 1, title: "Longest Common Subsequence", difficulty: "Medium", category: "Dynamic Programming" },
  { id: 2, title: "Binary Tree Level Order Traversal", difficulty: "Medium", category: "Trees" },
  { id: 3, title: "Course Schedule", difficulty: "Medium", category: "Graphs" },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "text-success";
    case "Medium": return "text-warning";
    case "Hard": return "text-destructive";
    default: return "text-muted-foreground";
  }
};

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-1">
              Welcome back, John! 👋
            </h1>
            <p className="text-muted-foreground">
              Continue your practice and keep the streak going!
            </p>
          </div>
          <Button asChild>
            <Link to="/challenges">
              <BookOpen className="h-4 w-4 mr-2" />
              Browse Problems
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat, index) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              trendUp={stat.trendUp}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Activity Heatmap */}
          <div className="lg:col-span-2">
            <ActivityHeatmap />
          </div>

          {/* Streak Card */}
          <StreakCard
            currentStreak={7}
            longestStreak={28}
            totalActiveDays={156}
          />
        </div>

        {/* Progress and Suggestions Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Skill Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="p-6 rounded-2xl border border-border bg-card"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-6">
              Skill Progress
            </h3>
            <div className="space-y-5">
              {[
                { name: "Arrays", progress: 85, color: "primary" as const },
                { name: "Strings", progress: 72, color: "primary" as const },
                { name: "Dynamic Programming", progress: 45, color: "warning" as const },
                { name: "Trees", progress: 60, color: "primary" as const },
                { name: "Graphs", progress: 35, color: "destructive" as const },
              ].map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className={`h-full rounded-full ${
                        skill.color === "primary" ? "bg-primary" :
                        skill.color === "warning" ? "bg-warning" : "bg-destructive"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Submissions */}
          <div className="lg:col-span-2">
            <RecentSubmissions submissions={[]} />
          </div>
        </div>

        {/* Suggested Problems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="p-6 rounded-2xl border border-border bg-card"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                Suggested for You
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Problems based on your skill level
              </p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/challenges">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {suggestedProblems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              >
                <Link
                  to={`/challenges/${problem.id}`}
                  className="block p-4 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-muted/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{problem.category}</span>
                  </div>
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {problem.title}
                  </h4>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
