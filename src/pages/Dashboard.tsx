import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Swords, 
  TrendingUp, 
  Clock,
  ArrowRight,
  Star,
  Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const statsCards = [
  { label: "Global Rank", value: "#1,247", icon: Trophy, trend: "+52" },
  { label: "Challenges Won", value: "86", icon: Swords, trend: "+12" },
  { label: "Win Rate", value: "73%", icon: TrendingUp, trend: "+5%" },
  { label: "Total Time", value: "142h", icon: Clock, trend: null },
];

const progressData = [
  { name: "Mon", score: 120 },
  { name: "Tue", score: 150 },
  { name: "Wed", score: 180 },
  { name: "Thu", score: 160 },
  { name: "Fri", score: 220 },
  { name: "Sat", score: 280 },
  { name: "Sun", score: 320 },
];

const activeChallenges = [
  { id: 1, title: "Binary Search Master", difficulty: "Medium", timeLeft: "2h 30m", participants: 156 },
  { id: 2, title: "Dynamic Programming Sprint", difficulty: "Hard", timeLeft: "1d 4h", participants: 89 },
  { id: 3, title: "Array Manipulation", difficulty: "Easy", timeLeft: "45m", participants: 234 },
];

const recentActivity = [
  { action: "Completed", challenge: "Two Sum", result: "1st Place", time: "2 hours ago" },
  { action: "Joined", challenge: "Binary Search Master", result: null, time: "4 hours ago" },
  { action: "Completed", challenge: "Valid Parentheses", result: "3rd Place", time: "1 day ago" },
  { action: "Earned", challenge: "Speed Demon Badge", result: null, time: "2 days ago" },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "text-success bg-success/10";
    case "Medium": return "text-warning bg-warning/10";
    case "Hard": return "text-destructive bg-destructive/10";
    default: return "text-muted-foreground bg-muted";
  }
};

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to conquer some challenges today?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-6 bg-card rounded-xl border border-border shadow-card"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <stat.icon className="h-5 w-5" />
                </div>
                {stat.trend && (
                  <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                    {stat.trend}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="lg:col-span-2 p-6 bg-card rounded-xl border border-border shadow-card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Weekly Progress
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Flame className="h-4 w-4 text-primary" />
                <span>7 day streak</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="p-6 bg-card rounded-xl border border-border shadow-card"
          >
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                    <Star className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.action}</span>{" "}
                      {activity.challenge}
                      {activity.result && (
                        <span className="text-primary font-medium"> — {activity.result}</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Active Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="p-6 bg-card rounded-xl border border-border shadow-card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Active Challenges
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/challenges">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {activeChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {challenge.timeLeft}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{challenge.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {challenge.participants} participants
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
