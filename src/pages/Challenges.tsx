import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { 
  Search, 
  Clock, 
  Users, 
  ChevronDown,
  CheckCircle2,
  Circle,
  Minus
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const difficulties = ["All", "Easy", "Medium", "Hard"];
const categories = ["All", "Arrays", "Strings", "Dynamic Programming", "Graphs", "Trees", "Math", "Two Pointers", "Binary Search"];

const challenges = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    acceptance: 49.2,
    status: "solved",
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    acceptance: 40.1,
    status: "attempted",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Strings",
    acceptance: 33.8,
    status: "none",
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Binary Search",
    acceptance: 36.2,
    status: "none",
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptance: 32.4,
    status: "solved",
  },
  {
    id: 6,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Strings",
    acceptance: 40.7,
    status: "solved",
  },
  {
    id: 7,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    acceptance: 62.5,
    status: "none",
  },
  {
    id: 8,
    title: "Generate Parentheses",
    difficulty: "Medium",
    category: "Backtracking",
    acceptance: 72.6,
    status: "attempted",
  },
  {
    id: 9,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    category: "Linked List",
    acceptance: 50.3,
    status: "none",
  },
  {
    id: 10,
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    acceptance: 39.0,
    status: "none",
  },
  {
    id: 11,
    title: "Combination Sum",
    difficulty: "Medium",
    category: "Backtracking",
    acceptance: 69.2,
    status: "solved",
  },
  {
    id: 12,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Two Pointers",
    acceptance: 59.5,
    status: "none",
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "text-success";
    case "Medium": return "text-warning";
    case "Hard": return "text-destructive";
    default: return "text-muted-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "solved": return <CheckCircle2 className="h-4 w-4 text-success" />;
    case "attempted": return <Minus className="h-4 w-4 text-warning" />;
    default: return <Circle className="h-4 w-4 text-muted-foreground/30" />;
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

  const stats = {
    total: challenges.length,
    solved: challenges.filter(c => c.status === "solved").length,
    easy: challenges.filter(c => c.difficulty === "Easy").length,
    medium: challenges.filter(c => c.difficulty === "Medium").length,
    hard: challenges.filter(c => c.difficulty === "Hard").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Problems
          </h1>
          <p className="text-muted-foreground">
            Practice coding problems to improve your skills
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-2xl font-bold text-foreground">{stats.solved}/{stats.total}</p>
            <p className="text-sm text-muted-foreground">Solved</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-2xl font-bold text-success">{challenges.filter(c => c.difficulty === "Easy" && c.status === "solved").length}/{stats.easy}</p>
            <p className="text-sm text-muted-foreground">Easy</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-2xl font-bold text-warning">{challenges.filter(c => c.difficulty === "Medium" && c.status === "solved").length}/{stats.medium}</p>
            <p className="text-sm text-muted-foreground">Medium</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-2xl font-bold text-destructive">{challenges.filter(c => c.difficulty === "Hard" && c.status === "solved").length}/{stats.hard}</p>
            <p className="text-sm text-muted-foreground">Hard</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 col-span-2 md:col-span-1">
            <p className="text-2xl font-bold text-primary">{Math.round((stats.solved / stats.total) * 100)}%</p>
            <p className="text-sm text-muted-foreground">Progress</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search problems..."
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
                  <option key={diff} value={diff}>{diff === "All" ? "Difficulty" : diff}</option>
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
                  <option key={cat} value={cat}>{cat === "All" ? "Category" : cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Problems Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4 w-12">Status</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Title</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Category</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {filteredChallenges.map((challenge, index) => (
                  <motion.tr
                    key={challenge.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      {getStatusIcon(challenge.status)}
                    </td>
                    <td className="px-6 py-4">
                      <Link 
                        to={`/challenges/${challenge.id}`}
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {challenge.id}. {challenge.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className="text-xs">
                        {challenge.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("font-medium text-sm", getDifficultyColor(challenge.difficulty))}>
                        {challenge.difficulty}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <div className="text-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No problems found
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
