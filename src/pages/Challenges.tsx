import { useState } from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { motion } from "framer-motion";
import { 
  Search, 
  ChevronDown,
  CheckCircle2,
  Circle,
  Minus,
  X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProblemStats } from "@/components/challenges/ProblemStats";
import { DifficultyBadge } from "@/components/challenges/DifficultyBadge";

const difficulties = ["All", "Easy", "Medium", "Hard"];
const categories = ["All", "Arrays", "Strings", "Dynamic Programming", "Graphs", "Trees", "Math", "Two Pointers", "Binary Search", "Hash Table", "Linked List", "Backtracking"];
const statuses = ["All", "Todo", "Solved", "Attempted"];

const challenges = [
  { id: 1, title: "Two Sum", difficulty: "Easy" as const, category: "Arrays", status: "solved", tags: ["Hash Table"] },
  { id: 2, title: "Add Two Numbers", difficulty: "Medium" as const, category: "Linked List", status: "attempted", tags: ["Math", "Linked List"] },
  { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium" as const, category: "Strings", status: "none", tags: ["Hash Table", "Sliding Window"] },
  { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard" as const, category: "Binary Search", status: "none", tags: ["Array", "Divide and Conquer"] },
  { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium" as const, category: "Dynamic Programming", status: "solved", tags: ["String", "DP"] },
  { id: 6, title: "Valid Parentheses", difficulty: "Easy" as const, category: "Strings", status: "solved", tags: ["Stack"] },
  { id: 7, title: "Merge Two Sorted Lists", difficulty: "Easy" as const, category: "Linked List", status: "none", tags: ["Linked List", "Recursion"] },
  { id: 8, title: "Generate Parentheses", difficulty: "Medium" as const, category: "Backtracking", status: "attempted", tags: ["String", "Backtracking"] },
  { id: 9, title: "Merge k Sorted Lists", difficulty: "Hard" as const, category: "Linked List", status: "none", tags: ["Heap", "Divide and Conquer"] },
  { id: 10, title: "Search in Rotated Sorted Array", difficulty: "Medium" as const, category: "Binary Search", status: "none", tags: ["Array", "Binary Search"] },
  { id: 11, title: "Combination Sum", difficulty: "Medium" as const, category: "Backtracking", status: "solved", tags: ["Array", "Backtracking"] },
  { id: 12, title: "Trapping Rain Water", difficulty: "Hard" as const, category: "Two Pointers", status: "none", tags: ["Array", "Two Pointers", "Stack"] },
  { id: 13, title: "Container With Most Water", difficulty: "Medium" as const, category: "Two Pointers", status: "none", tags: ["Array", "Two Pointers"] },
  { id: 14, title: "3Sum", difficulty: "Medium" as const, category: "Two Pointers", status: "solved", tags: ["Array", "Sorting"] },
  { id: 15, title: "Remove Nth Node From End of List", difficulty: "Medium" as const, category: "Linked List", status: "none", tags: ["Linked List", "Two Pointers"] },
];

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
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const isAuthenticated = localStorage.getItem("userAuth") === "true";

  // For non-authenticated users, don't show solved status
  const displayChallenges = challenges.map(c => ({
    ...c,
    status: isAuthenticated ? c.status : "none"
  }));

  const filteredChallenges = displayChallenges.filter((challenge) => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "All" || challenge.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === "All" || challenge.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || 
      (selectedStatus === "Solved" && challenge.status === "solved") ||
      (selectedStatus === "Attempted" && challenge.status === "attempted") ||
      (selectedStatus === "Todo" && challenge.status === "none");
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => challenge.tags.includes(tag));
    return matchesSearch && matchesDifficulty && matchesCategory && matchesStatus && matchesTags;
  });

  const stats = {
    total: challenges.length,
    solved: isAuthenticated ? challenges.filter(c => c.status === "solved").length : 0,
    easy: { 
      total: challenges.filter(c => c.difficulty === "Easy").length, 
      solved: isAuthenticated ? challenges.filter(c => c.difficulty === "Easy" && c.status === "solved").length : 0 
    },
    medium: { 
      total: challenges.filter(c => c.difficulty === "Medium").length, 
      solved: isAuthenticated ? challenges.filter(c => c.difficulty === "Medium" && c.status === "solved").length : 0 
    },
    hard: { 
      total: challenges.filter(c => c.difficulty === "Hard").length, 
      solved: isAuthenticated ? challenges.filter(c => c.difficulty === "Hard" && c.status === "solved").length : 0 
    },
  };

  const clearFilters = () => {
    setSelectedDifficulty("All");
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSelectedTags([]);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedDifficulty !== "All" || selectedCategory !== "All" || selectedStatus !== "All" || selectedTags.length > 0 || searchQuery !== "";

  return (
    <PublicLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-1">
              Problems
            </h1>
            <p className="text-muted-foreground">
              Practice coding problems to sharpen your skills
            </p>
          </div>
        </div>

        {/* Problem Stats - Only show progress if authenticated */}
        {isAuthenticated ? (
          <ProblemStats
            total={stats.total}
            solved={stats.solved}
            easy={stats.easy}
            medium={stats.medium}
            hard={stats.hard}
          />
        ) : (
          <div className="p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-foreground">{stats.total} Problems Available</p>
                <p className="text-sm text-muted-foreground">
                  {stats.easy.total} Easy • {stats.medium.total} Medium • {stats.hard.total} Hard
                </p>
              </div>
              <Link to="/login" className="text-primary hover:underline text-sm font-medium">
                Sign in to track progress →
              </Link>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-11 bg-card border-border"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex gap-2 flex-wrap">
              {/* Difficulty */}
              <div className="relative">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="h-11 pl-4 pr-10 rounded-lg border border-border bg-card text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {difficulties.map((diff) => (
                    <option key={diff} value={diff}>{diff === "All" ? "Difficulty" : diff}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Status */}
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="h-11 pl-4 pr-10 rounded-lg border border-border bg-card text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status === "All" ? "Status" : status}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Category */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-11 pl-4 pr-10 rounded-lg border border-border bg-card text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat === "All" ? "Category" : cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Clear filters */}
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-11">
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Problems Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-border bg-card overflow-hidden"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4 w-12">Status</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Title</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Tags</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Difficulty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredChallenges.map((challenge, index) => (
                  <motion.tr
                    key={challenge.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    className="group hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {getStatusIcon(challenge.status)}
                    </td>
                    <td className="px-6 py-4">
                      <Link 
                        to={`/challenges/${challenge.id}`}
                        className="font-medium text-foreground hover:text-primary transition-colors group-hover:underline"
                      >
                        {challenge.id}. {challenge.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {challenge.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs font-normal">
                            {tag}
                          </Badge>
                        ))}
                        {challenge.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs font-normal">
                            +{challenge.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <DifficultyBadge difficulty={challenge.difficulty} />
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
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
