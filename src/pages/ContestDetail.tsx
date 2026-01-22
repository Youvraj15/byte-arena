import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Trophy,
  Timer,
  CheckCircle2,
  Circle,
  Crown,
  Medal,
  TrendingUp,
  Code,
  Play,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Progress } from "@/components/ui/progress";

interface Problem {
  id: string;
  code: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  solved: number;
  status?: "solved" | "attempted" | "locked";
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  score: number;
  problems: number;
  totalProblems: number;
  time: string;
  penalty: number;
}

const contestData = {
  id: "weekly-sprint-24",
  title: "Weekly Algorithm Sprint #24",
  description: "Test your algorithmic skills with 5 challenging problems covering arrays, strings, and dynamic programming. This contest is designed to help you practice common interview patterns and improve your problem-solving speed.",
  startDate: "Jan 27, 2026",
  startTime: "10:00 AM",
  endTime: "12:00 PM",
  duration: "2 hours",
  participants: 156,
  difficulty: "Medium",
  status: "live",
  prize: "Top 3 get certificates",
  host: "Byte Arena",
  rating: "1200-1800",
  rules: [
    "You can submit multiple times, only the best submission counts",
    "Partial scoring is enabled for some problems",
    "No plagiarism - violations result in disqualification",
    "Discussion of problems during contest is prohibited",
    "Time penalty of 10 minutes for each wrong submission"
  ]
};

const problems: Problem[] = [
  {
    id: "two-sum-variants",
    code: "A",
    title: "Two Sum Variants",
    difficulty: "Easy",
    points: 100,
    solved: 89,
    status: "solved"
  },
  {
    id: "longest-substring",
    code: "B",
    title: "Longest Valid Substring",
    difficulty: "Medium",
    points: 200,
    solved: 56,
    status: "attempted"
  },
  {
    id: "matrix-traversal",
    code: "C",
    title: "Matrix Spiral Traversal",
    difficulty: "Medium",
    points: 250,
    solved: 34,
    status: undefined
  },
  {
    id: "dp-optimization",
    code: "D",
    title: "DP State Optimization",
    difficulty: "Hard",
    points: 400,
    solved: 12,
    status: undefined
  },
  {
    id: "graph-coloring",
    code: "E",
    title: "Graph Coloring Problem",
    difficulty: "Hard",
    points: 500,
    solved: 5,
    status: "locked"
  },
];

const leaderboard: LeaderboardEntry[] = [
  { rank: 1, username: "algorithm_master", avatar: "AM", score: 1450, problems: 5, totalProblems: 5, time: "1h 23m", penalty: 20 },
  { rank: 2, username: "code_ninja", avatar: "CN", score: 1350, problems: 5, totalProblems: 5, time: "1h 45m", penalty: 40 },
  { rank: 3, username: "dev_warrior", avatar: "DW", score: 1200, problems: 4, totalProblems: 5, time: "1h 52m", penalty: 30 },
  { rank: 4, username: "byte_crusher", avatar: "BC", score: 1050, problems: 4, totalProblems: 5, time: "1h 58m", penalty: 50 },
  { rank: 5, username: "logic_lover", avatar: "LL", score: 950, problems: 4, totalProblems: 5, time: "1h 59m", penalty: 60 },
  { rank: 6, username: "syntax_sage", avatar: "SS", score: 850, problems: 3, totalProblems: 5, time: "1h 30m", penalty: 20 },
  { rank: 7, username: "binary_boss", avatar: "BB", score: 750, problems: 3, totalProblems: 5, time: "1h 42m", penalty: 30 },
  { rank: 8, username: "recursion_king", avatar: "RK", score: 650, problems: 3, totalProblems: 5, time: "1h 55m", penalty: 40 },
  { rank: 9, username: "stack_master", avatar: "SM", score: 550, problems: 2, totalProblems: 5, time: "1h 20m", penalty: 10 },
  { rank: 10, username: "heap_hero", avatar: "HH", score: 450, problems: 2, totalProblems: 5, time: "1h 35m", penalty: 20 },
];

export default function ContestDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("problems");
  const [isRegistered, setIsRegistered] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-500";
      case "Medium":
        return "text-yellow-500";
      case "Hard":
        return "text-red-500";
      default:
        return "text-primary";
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      case "Hard":
        return "bg-red-500/10 text-red-500 border-red-500/30";
      default:
        return "bg-primary/10 text-primary border-primary/30";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-muted-foreground font-medium">{rank}</span>;
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "solved":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "attempted":
        return <Circle className="h-5 w-5 text-yellow-500 fill-yellow-500/20" />;
      case "locked":
        return <Lock className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="relative py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <Link
              to="/contests"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Contests
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              {/* Left - Contest Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                    <span className="text-xs text-red-500 font-semibold">LIVE</span>
                  </div>
                  <Badge variant="outline" className={getDifficultyBadge(contestData.difficulty)}>
                    {contestData.difficulty}
                  </Badge>
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {contestData.title}
                </h1>

                <p className="text-muted-foreground mb-4 max-w-2xl">
                  {contestData.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{contestData.startDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{contestData.startTime} - {contestData.endTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Timer className="w-4 h-4 text-primary" />
                    <span>{contestData.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{contestData.participants} participants</span>
                  </div>
                </div>
              </div>

              {/* Right - Actions & Timer */}
              <div className="lg:text-right space-y-4">
                <div className="inline-flex flex-col items-end gap-2 p-4 bg-card border border-border rounded-xl">
                  <div className="text-sm text-muted-foreground">Time Remaining</div>
                  <div className="font-mono text-3xl font-bold text-primary">01:23:45</div>
                  <Progress value={60} className="w-48 h-2" />
                </div>

                {contestData.prize && (
                  <div className="flex items-center justify-end gap-2 px-4 py-2 bg-primary/5 rounded-lg">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">{contestData.prize}</span>
                  </div>
                )}

                <div className="flex gap-3 justify-end">
                  {!isRegistered ? (
                    <Button onClick={() => setIsRegistered(true)} className="gap-2">
                      <Play className="h-4 w-4" />
                      Start Contest
                    </Button>
                  ) : (
                    <Button variant="outline" className="gap-2">
                      <Code className="h-4 w-4" />
                      Continue Coding
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="problems" onValueChange={setActiveTab}>
              <TabsList className="bg-card border border-border mb-8">
                <TabsTrigger value="problems" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Problems
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Leaderboard
                </TabsTrigger>
                <TabsTrigger value="rules" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Rules
                </TabsTrigger>
              </TabsList>

              {/* Problems Tab */}
              <TabsContent value="problems">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-xl overflow-hidden"
                >
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-16">Status</TableHead>
                        <TableHead className="w-16">#</TableHead>
                        <TableHead>Problem</TableHead>
                        <TableHead className="w-24">Difficulty</TableHead>
                        <TableHead className="w-24 text-center">Points</TableHead>
                        <TableHead className="w-24 text-center">Solved</TableHead>
                        <TableHead className="w-32 text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {problems.map((problem, index) => (
                        <TableRow
                          key={problem.id}
                          className={`hover:bg-accent/50 transition-colors ${
                            problem.status === "locked" ? "opacity-60" : ""
                          }`}
                        >
                          <TableCell>{getStatusIcon(problem.status)}</TableCell>
                          <TableCell className="font-mono font-bold text-primary">
                            {problem.code}
                          </TableCell>
                          <TableCell>
                            <Link
                              to={problem.status !== "locked" ? `/challenges/${problem.id}` : "#"}
                              className={`font-medium ${
                                problem.status !== "locked"
                                  ? "hover:text-primary transition-colors"
                                  : "cursor-not-allowed"
                              }`}
                            >
                              {problem.title}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <span className={getDifficultyColor(problem.difficulty)}>
                              {problem.difficulty}
                            </span>
                          </TableCell>
                          <TableCell className="text-center font-semibold">
                            {problem.points}
                          </TableCell>
                          <TableCell className="text-center text-muted-foreground">
                            {problem.solved}
                          </TableCell>
                          <TableCell className="text-right">
                            {problem.status !== "locked" ? (
                              <Link to={`/challenges/${problem.id}`}>
                                <Button size="sm" variant="outline" className="gap-1">
                                  <Code className="h-3 w-3" />
                                  Solve
                                </Button>
                              </Link>
                            ) : (
                              <Button size="sm" variant="ghost" disabled className="gap-1">
                                <Lock className="h-3 w-3" />
                                Locked
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </motion.div>
              </TabsContent>

              {/* Leaderboard Tab */}
              <TabsContent value="leaderboard">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Top 3 Podium */}
                  <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                    {/* 2nd Place */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex flex-col items-center mt-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-bold text-xl mb-2">
                        {leaderboard[1].avatar}
                      </div>
                      <Medal className="h-6 w-6 text-gray-400 mb-1" />
                      <div className="font-semibold text-foreground text-sm">{leaderboard[1].username}</div>
                      <div className="text-primary font-bold">{leaderboard[1].score}</div>
                    </motion.div>

                    {/* 1st Place */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-2xl mb-2 ring-4 ring-yellow-500/30">
                        {leaderboard[0].avatar}
                      </div>
                      <Crown className="h-8 w-8 text-yellow-500 mb-1" />
                      <div className="font-semibold text-foreground">{leaderboard[0].username}</div>
                      <div className="text-primary font-bold text-xl">{leaderboard[0].score}</div>
                    </motion.div>

                    {/* 3rd Place */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-col items-center mt-12"
                    >
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold text-lg mb-2">
                        {leaderboard[2].avatar}
                      </div>
                      <Medal className="h-5 w-5 text-amber-600 mb-1" />
                      <div className="font-semibold text-foreground text-sm">{leaderboard[2].username}</div>
                      <div className="text-primary font-bold">{leaderboard[2].score}</div>
                    </motion.div>
                  </div>

                  {/* Full Leaderboard Table */}
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-16 text-center">Rank</TableHead>
                          <TableHead>Participant</TableHead>
                          <TableHead className="text-center">Score</TableHead>
                          <TableHead className="text-center">Problems</TableHead>
                          <TableHead className="text-center">Time</TableHead>
                          <TableHead className="text-center">Penalty</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leaderboard.map((entry, index) => (
                          <TableRow
                            key={entry.rank}
                            className={`hover:bg-accent/50 transition-colors ${
                              entry.rank <= 3 ? "bg-primary/5" : ""
                            }`}
                          >
                            <TableCell className="text-center">
                              <div className="flex justify-center">
                                {getRankIcon(entry.rank)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                                  {entry.avatar}
                                </div>
                                <span className="font-medium">{entry.username}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center font-bold text-primary">
                              {entry.score}
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="text-green-500 font-medium">{entry.problems}</span>
                              <span className="text-muted-foreground">/{entry.totalProblems}</span>
                            </TableCell>
                            <TableCell className="text-center font-mono text-muted-foreground">
                              {entry.time}
                            </TableCell>
                            <TableCell className="text-center text-red-400">
                              +{entry.penalty}m
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination hint */}
                  <div className="text-center mt-6">
                    <Button variant="ghost" className="text-muted-foreground">
                      Showing top 10 • View all {contestData.participants} participants
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Rules Tab */}
              <TabsContent value="rules">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                    Contest Rules
                  </h3>
                  <ul className="space-y-3">
                    {contestData.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary text-sm font-medium">{index + 1}</span>
                        </div>
                        <span className="text-muted-foreground">{rule}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-foreground mb-2">Scoring System</h4>
                    <p className="text-muted-foreground text-sm">
                      Each problem has a maximum point value. Partial scoring may be available for some problems.
                      Your final score is calculated as the sum of points earned from all problems minus any time penalties.
                    </p>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
