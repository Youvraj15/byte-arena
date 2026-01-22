import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  Users, 
  Trophy, 
  ArrowRight, 
  Timer,
  CheckCircle2,
  Circle,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PublicLayout } from "@/components/layout/PublicLayout";

interface Contest {
  id: string;
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  duration: string;
  participants: number;
  problems: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Mixed";
  status: "upcoming" | "live" | "past";
  prize?: string;
  host: string;
  rating?: string;
}

const contests: Contest[] = [
  {
    id: "weekly-sprint-24",
    title: "Weekly Algorithm Sprint #24",
    description: "Test your algorithmic skills with 5 challenging problems covering arrays, strings, and dynamic programming.",
    startDate: "Jan 27, 2026",
    startTime: "10:00 AM",
    duration: "2 hours",
    participants: 156,
    problems: 5,
    difficulty: "Medium",
    status: "upcoming",
    prize: "Top 3 get certificates",
    host: "Byte Arena",
    rating: "1200-1800"
  },
  {
    id: "data-structures-marathon",
    title: "Data Structures Marathon",
    description: "Deep dive into trees, graphs, and advanced data structures. Perfect for intermediate programmers.",
    startDate: "Jan 25, 2026",
    startTime: "2:00 PM",
    duration: "3 hours",
    participants: 89,
    problems: 6,
    difficulty: "Hard",
    status: "live",
    prize: "Winner gets internship referral",
    host: "CS Department",
    rating: "1600+"
  },
  {
    id: "beginner-friendly-10",
    title: "Beginner Friendly Contest #10",
    description: "Perfect for students just starting their competitive programming journey. Basic algorithms and logic.",
    startDate: "Jan 30, 2026",
    startTime: "6:00 PM",
    duration: "1.5 hours",
    participants: 234,
    problems: 4,
    difficulty: "Easy",
    status: "upcoming",
    prize: "Participation certificates",
    host: "Byte Arena",
    rating: "0-1200"
  },
  {
    id: "inter-college-championship",
    title: "Inter-College Championship 2026",
    description: "Compete against the best programmers from different colleges. Prestigious annual event.",
    startDate: "Feb 15, 2026",
    startTime: "9:00 AM",
    duration: "4 hours",
    participants: 512,
    problems: 8,
    difficulty: "Hard",
    status: "upcoming",
    prize: "₹50,000 Cash Prize",
    host: "Tech Council",
    rating: "All Levels"
  },
  {
    id: "weekly-sprint-23",
    title: "Weekly Algorithm Sprint #23",
    description: "Past contest - Arrays, sorting, and searching algorithms.",
    startDate: "Jan 20, 2026",
    startTime: "10:00 AM",
    duration: "2 hours",
    participants: 178,
    problems: 5,
    difficulty: "Medium",
    status: "past",
    host: "Byte Arena",
    rating: "1200-1800"
  },
  {
    id: "dp-special",
    title: "Dynamic Programming Special",
    description: "Past contest focused entirely on DP problems from basic to advanced.",
    startDate: "Jan 15, 2026",
    startTime: "3:00 PM",
    duration: "2.5 hours",
    participants: 145,
    problems: 5,
    difficulty: "Hard",
    status: "past",
    host: "Algorithm Club",
    rating: "1400+"
  },
  {
    id: "string-algorithms",
    title: "String Algorithms Challenge",
    description: "Past contest - Master string manipulation, pattern matching, and text processing.",
    startDate: "Jan 10, 2026",
    startTime: "4:00 PM",
    duration: "2 hours",
    participants: 112,
    problems: 4,
    difficulty: "Medium",
    status: "past",
    host: "Byte Arena",
    rating: "1200-1600"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function Contests() {
  const [activeTab, setActiveTab] = useState("all");

  const getDifficultyColor = (difficulty: string) => {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-xs text-red-500 font-semibold">LIVE NOW</span>
          </div>
        );
      case "upcoming":
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full">
            <Timer className="h-3 w-3 text-primary" />
            <span className="text-xs text-primary font-medium">Upcoming</span>
          </div>
        );
      case "past":
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-muted border border-border rounded-full">
            <CheckCircle2 className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">Ended</span>
          </div>
        );
      default:
        return null;
    }
  };

  const filterContests = (tab: string) => {
    if (tab === "all") return contests;
    return contests.filter((c) => c.status === tab);
  };

  const liveContests = contests.filter((c) => c.status === "live");
  const upcomingContests = contests.filter((c) => c.status === "upcoming");
  const pastContests = contests.filter((c) => c.status === "past");

  return (
    <PublicLayout>
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
                <Trophy className="w-4 h-4" />
                <span className="text-sm font-medium">Competitive Programming</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Coding <span className="text-gradient">Contests</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Compete in weekly contests, challenge yourself, and climb the leaderboard
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center gap-8 mt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{liveContests.length}</div>
                <div className="text-sm text-muted-foreground">Live Now</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{upcomingContests.length}</div>
                <div className="text-sm text-muted-foreground">Upcoming</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">{pastContests.length}</div>
                <div className="text-sm text-muted-foreground">Past</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contests List */}
        <section className="py-8 pb-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-8">
                <TabsList className="bg-card border border-border">
                  <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    All Contests
                  </TabsTrigger>
                  <TabsTrigger value="live" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                    Live ({liveContests.length})
                  </TabsTrigger>
                  <TabsTrigger value="upcoming" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Upcoming ({upcomingContests.length})
                  </TabsTrigger>
                  <TabsTrigger value="past" className="data-[state=active]:bg-muted-foreground data-[state=active]:text-white">
                    Past ({pastContests.length})
                  </TabsTrigger>
                </TabsList>

                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>

              {["all", "live", "upcoming", "past"].map((tab) => (
                <TabsContent key={tab} value={tab}>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {filterContests(tab).map((contest) => (
                      <motion.div
                        key={contest.id}
                        variants={cardVariants}
                        className="group"
                      >
                        <Link to={`/contests/${contest.id}`}>
                          <div className="relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                            {/* Status indicator line */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
                              contest.status === "live" ? "bg-red-500" :
                              contest.status === "upcoming" ? "bg-primary" : "bg-muted-foreground/30"
                            }`} />

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              {/* Left - Contest Info */}
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  {getStatusBadge(contest.status)}
                                  <Badge variant="outline" className={getDifficultyColor(contest.difficulty)}>
                                    {contest.difficulty}
                                  </Badge>
                                  {contest.rating && (
                                    <span className="text-xs text-muted-foreground">
                                      Rating: {contest.rating}
                                    </span>
                                  )}
                                </div>

                                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                  {contest.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-3 line-clamp-1">
                                  {contest.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span>{contest.startDate}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4 text-primary" />
                                    <span>{contest.startTime}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Timer className="w-4 h-4 text-primary" />
                                    <span>{contest.duration}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Users className="w-4 h-4 text-primary" />
                                    <span>{contest.participants} registered</span>
                                  </div>
                                </div>
                              </div>

                              {/* Right - Actions */}
                              <div className="flex flex-col items-end gap-3">
                                <div className="text-right">
                                  <div className="text-sm text-muted-foreground">Hosted by</div>
                                  <div className="font-medium text-foreground">{contest.host}</div>
                                </div>

                                {contest.prize && (
                                  <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-lg">
                                    <Trophy className="w-4 h-4 text-primary" />
                                    <span className="text-sm text-foreground">{contest.prize}</span>
                                  </div>
                                )}

                                <Button 
                                  variant={contest.status === "live" ? "default" : "outline"}
                                  className="gap-2"
                                >
                                  {contest.status === "live" ? "Enter Contest" : 
                                   contest.status === "upcoming" ? "Register" : "View Results"}
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Problems count */}
                            <div className="mt-4 pt-4 border-t border-border flex items-center gap-6">
                              <div className="flex items-center gap-2">
                                <Circle className="w-3 h-3 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  {contest.problems} Problems
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}

                    {filterContests(tab).length === 0 && (
                      <div className="text-center py-16">
                        <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No contests found in this category</p>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
