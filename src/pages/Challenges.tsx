import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Star,
  ChevronDown,
  Zap,
  Trophy,
  Code
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const difficulties = ["All", "Easy", "Medium", "Hard"];
const categories = ["All", "Arrays", "Strings", "Dynamic Programming", "Graphs", "Trees", "Math"];

const challenges = [
  {
    id: 1,
    title: "Two Sum",
    description: "Given an array of integers, return indices of the two numbers that add up to a specific target.",
    difficulty: "Easy",
    category: "Arrays",
    participants: 15420,
    rating: 4.8,
    timeLimit: "30 min",
    points: 100,
    isLive: true,
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    category: "Strings",
    participants: 12350,
    rating: 4.6,
    timeLimit: "45 min",
    points: 200,
    isLive: false,
  },
  {
    id: 3,
    title: "Binary Tree Maximum Path Sum",
    description: "Find the maximum path sum in a binary tree where path can start and end at any node.",
    difficulty: "Hard",
    category: "Trees",
    participants: 8920,
    rating: 4.9,
    timeLimit: "60 min",
    points: 350,
    isLive: true,
  },
  {
    id: 4,
    title: "Valid Parentheses",
    description: "Determine if the input string has valid bracket matching.",
    difficulty: "Easy",
    category: "Strings",
    participants: 18750,
    rating: 4.7,
    timeLimit: "20 min",
    points: 80,
    isLive: false,
  },
  {
    id: 5,
    title: "Coin Change",
    description: "Find the minimum number of coins needed to make up a given amount.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    participants: 9840,
    rating: 4.5,
    timeLimit: "45 min",
    points: 250,
    isLive: false,
  },
  {
    id: 6,
    title: "Word Ladder II",
    description: "Find all shortest transformation sequences from beginWord to endWord.",
    difficulty: "Hard",
    category: "Graphs",
    participants: 5620,
    rating: 4.4,
    timeLimit: "90 min",
    points: 400,
    isLive: true,
  },
];

const getDifficultyStyles = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "bg-success/10 text-success border-success/20";
    case "Medium": return "bg-warning/10 text-warning border-warning/20";
    case "Hard": return "bg-destructive/10 text-destructive border-destructive/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

export default function Challenges() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "All" || challenge.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === "All" || challenge.category === selectedCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Challenges
          </h1>
          <p className="text-muted-foreground">
            Test your skills with over 500 coding challenges
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="h-10 pl-4 pr-10 rounded-lg border border-input bg-background text-sm appearance-none cursor-pointer"
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>{diff} Difficulty</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-10 pl-4 pr-10 rounded-lg border border-input bg-background text-sm appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group p-6 bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getDifficultyStyles(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                  {challenge.isLive && (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 animate-pulse-soft">
                      <Zap className="h-3 w-3 mr-1" />
                      Live
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  {challenge.rating}
                </div>
              </div>

              {/* Content */}
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {challenge.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {challenge.description}
              </p>

              {/* Category */}
              <div className="mb-4">
                <Badge variant="secondary" className="text-xs">
                  <Code className="h-3 w-3 mr-1" />
                  {challenge.category}
                </Badge>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {challenge.timeLimit}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {challenge.participants.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-primary" />
                  {challenge.points} pts
                </div>
              </div>

              {/* CTA */}
              <Button className="w-full" variant={challenge.isLive ? "default" : "outline"}>
                {challenge.isLive ? "Join Battle" : "Start Challenge"}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <div className="text-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No challenges found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
