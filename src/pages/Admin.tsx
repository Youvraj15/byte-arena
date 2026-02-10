import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, 
  Trash2, 
  Edit, 
  Save,
  X,
  Sparkles,
  Code2,
  ChevronDown,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Users,
  Trophy,
  Clock,
  LogOut,
  Eye,
  Calendar,
  Timer,
  Shield,
  UserPlus,
  Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StudentDetailModal, generateStudentDetail, type StudentDetail } from "@/components/admin/StudentDetailModal";

const difficulties = ["Easy", "Medium", "Hard"];
const categories = ["Arrays", "Strings", "Dynamic Programming", "Graphs", "Trees", "Math", "Two Pointers", "Binary Search", "Linked List", "Backtracking"];

interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
}

interface ChallengeSolver {
  id: number;
  name: string;
  solvedAt: string;
}

interface Challenge {
  id: number;
  title: string;
  difficulty: string;
  category: string;
  description: string;
  testCases: TestCase[];
  solvers: ChallengeSolver[];
  createdBy: string;
}

interface Contest {
  id: string;
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  duration: string;
  participants: number;
  problems: ContestProblem[];
  difficulty: "Easy" | "Medium" | "Hard" | "Mixed";
  status: "upcoming" | "live" | "past";
  prize?: string;
  createdBy: string;
}

interface ContestProblem {
  id: number;
  title: string;
  difficulty: string;
  points: number;
}

interface Student {
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
}

interface Admin {
  id: string;
  name: string;
  email: string;
  role: "admin" | "superadmin";
  createdAt: string;
  problemsCreated: number;
  contestsCreated: number;
}

const initialChallenges: Challenge[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    testCases: [
      { id: 1, input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { id: 2, input: "[3,2,4], 6", expectedOutput: "[1,2]" },
    ],
    solvers: [
      { id: 1, name: "Arjun Sharma", solvedAt: "2 hours ago" },
      { id: 2, name: "Priya Patel", solvedAt: "1 day ago" },
    ],
    createdBy: "admin@bytearena.com",
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Strings",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    testCases: [
      { id: 1, input: "()", expectedOutput: "true" },
      { id: 2, input: "()[]{}", expectedOutput: "true" },
    ],
    solvers: [
      { id: 1, name: "Arjun Sharma", solvedAt: "5 hours ago" },
    ],
    createdBy: "admin@bytearena.com",
  },
  {
    id: 3,
    title: "Merge Sort",
    difficulty: "Medium",
    category: "Sorting",
    description: "Implement the merge sort algorithm to sort an array of integers.",
    testCases: [
      { id: 1, input: "[5,2,8,1,9]", expectedOutput: "[1,2,5,8,9]" },
    ],
    solvers: [],
    createdBy: "teacher@college.edu",
  },
];

const initialContests: Contest[] = [
  {
    id: "weekly-sprint-24",
    title: "Weekly Algorithm Sprint #24",
    description: "Test your algorithmic skills with 5 challenging problems.",
    startDate: "2026-02-01",
    startTime: "10:00",
    endDate: "2026-02-01",
    endTime: "12:00",
    duration: "2 hours",
    participants: 156,
    problems: [
      { id: 1, title: "Two Sum", difficulty: "Easy", points: 100 },
      { id: 2, title: "Valid Parentheses", difficulty: "Easy", points: 100 },
    ],
    difficulty: "Medium",
    status: "upcoming",
    prize: "Top 3 get certificates",
    createdBy: "admin@bytearena.com",
  },
  {
    id: "data-structures-marathon",
    title: "Data Structures Marathon",
    description: "Deep dive into trees, graphs, and advanced data structures.",
    startDate: "2026-01-25",
    startTime: "14:00",
    endDate: "2026-01-25",
    endTime: "17:00",
    duration: "3 hours",
    participants: 89,
    problems: [],
    difficulty: "Hard",
    status: "live",
    prize: "Winner gets internship referral",
    createdBy: "teacher@college.edu",
  },
];

const initialAdmins: Admin[] = [
  {
    id: "1",
    name: "Super Admin",
    email: "superadmin@bytearena.com",
    role: "superadmin",
    createdAt: "Jan 1, 2025",
    problemsCreated: 50,
    contestsCreated: 12,
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@bytearena.com",
    role: "admin",
    createdAt: "Jan 15, 2025",
    problemsCreated: 15,
    contestsCreated: 3,
  },
  {
    id: "3",
    name: "Teacher Admin",
    email: "teacher@college.edu",
    role: "admin",
    createdAt: "Feb 1, 2025",
    problemsCreated: 8,
    contestsCreated: 2,
  },
];

const mockStudents: Student[] = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", avatar: "AJ", problemsSolved: 45, totalSubmissions: 120, rank: 1, lastActive: "2 min ago", status: "solving", currentProblem: "Two Sum" },
  { id: 2, name: "Sarah Chen", email: "sarah@example.com", avatar: "SC", problemsSolved: 42, totalSubmissions: 98, rank: 2, lastActive: "5 min ago", status: "online" },
  { id: 3, name: "Mike Brown", email: "mike@example.com", avatar: "MB", problemsSolved: 38, totalSubmissions: 85, rank: 3, lastActive: "1 hour ago", status: "offline" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", avatar: "ED", problemsSolved: 35, totalSubmissions: 72, rank: 4, lastActive: "Just now", status: "solving", currentProblem: "Valid Parentheses" },
  { id: 5, name: "James Wilson", email: "james@example.com", avatar: "JW", problemsSolved: 32, totalSubmissions: 68, rank: 5, lastActive: "15 min ago", status: "online" },
];

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"challenges" | "contests" | "students" | "admins">("challenges");
  const [students] = useState<Student[]>(mockStudents);
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [contests, setContests] = useState<Contest[]>(initialContests);
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins);
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);
  const [editingContest, setEditingContest] = useState<Contest | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingContest, setIsCreatingContest] = useState(false);
  const [aiProvider, setAiProvider] = useState<"chatgpt" | "gemini">("chatgpt");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTestCases, setGeneratedTestCases] = useState<TestCase[]>([]);
  const [showAddProblemDialog, setShowAddProblemDialog] = useState(false);
  const [showAddAdminDialog, setShowAddAdminDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentDetail | null>(null);
  const [currentAdminEmail, setCurrentAdminEmail] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  // New admin form state
  const [newAdminForm, setNewAdminForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Check admin authentication
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    const adminEmail = localStorage.getItem("adminEmail");
    const adminRole = localStorage.getItem("adminRole");
    
    if (!adminAuth) {
      navigate("/admin-login");
    } else {
      setCurrentAdminEmail(adminEmail || "");
      setIsSuperAdmin(adminRole === "superadmin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminRole");
    navigate("/admin-login");
  };

  // Filter data based on admin - super admin sees all, regular admins see only their own
  const filteredChallenges = isSuperAdmin 
    ? challenges 
    : challenges.filter(c => c.createdBy === currentAdminEmail);

  const filteredContests = isSuperAdmin 
    ? contests 
    : contests.filter(c => c.createdBy === currentAdminEmail);

  const [newChallenge, setNewChallenge] = useState<Omit<Challenge, "id">>({
    title: "",
    difficulty: "Easy",
    category: "Arrays",
    description: "",
    testCases: [],
    solvers: [],
    createdBy: "",
  });

  const [newContest, setNewContest] = useState<Omit<Contest, "id">>({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    duration: "",
    participants: 0,
    problems: [],
    difficulty: "Medium",
    status: "upcoming",
    prize: "",
    createdBy: "",
  });

  const handleCreateChallenge = () => {
    const challenge: Challenge = {
      ...newChallenge,
      id: Date.now(),
      createdBy: currentAdminEmail,
    };
    setChallenges([...challenges, challenge]);
    setIsCreating(false);
    setNewChallenge({
      title: "",
      difficulty: "Easy",
      category: "Arrays",
      description: "",
      testCases: [],
      solvers: [],
      createdBy: "",
    });
  };

  const handleCreateContest = () => {
    // Calculate duration from start and end times
    const start = new Date(`${newContest.startDate}T${newContest.startTime}`);
    const end = new Date(`${newContest.endDate}T${newContest.endTime}`);
    const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    
    const contest: Contest = {
      ...newContest,
      id: `contest-${Date.now()}`,
      duration: `${durationHours} hours`,
      createdBy: currentAdminEmail,
    };
    setContests([...contests, contest]);
    setIsCreatingContest(false);
    setNewContest({
      title: "",
      description: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      duration: "",
      participants: 0,
      problems: [],
      difficulty: "Medium",
      status: "upcoming",
      prize: "",
      createdBy: "",
    });
  };

  const handleDeleteChallenge = (id: number) => {
    setChallenges(challenges.filter(c => c.id !== id));
  };

  const handleDeleteContest = (id: string) => {
    setContests(contests.filter(c => c.id !== id));
  };

  const handleAddAdmin = () => {
    const newAdmin: Admin = {
      id: Date.now().toString(),
      name: newAdminForm.name,
      email: newAdminForm.email,
      role: "admin",
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      problemsCreated: 0,
      contestsCreated: 0,
    };
    setAdmins([...admins, newAdmin]);
    setShowAddAdminDialog(false);
    setNewAdminForm({ name: "", email: "", password: "" });
  };

  const handleDeleteAdmin = (id: string) => {
    setAdmins(admins.filter(a => a.id !== id));
  };

  const handleGenerateTestCases = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generated: TestCase[] = [
      { id: Date.now(), input: "[1,2,3,4], 5", expectedOutput: "[0,3]" },
      { id: Date.now() + 1, input: "[5,5], 10", expectedOutput: "[0,1]" },
      { id: Date.now() + 2, input: "[-1,0,1], 0", expectedOutput: "[0,2]" },
    ];
    
    setGeneratedTestCases(generated);
    setIsGenerating(false);
  };

  const addProblemToContest = (problem: Challenge) => {
    const contestProblem: ContestProblem = {
      id: problem.id,
      title: problem.title,
      difficulty: problem.difficulty,
      points: problem.difficulty === "Easy" ? 100 : problem.difficulty === "Medium" ? 200 : 300,
    };
    
    if (isCreatingContest) {
      setNewContest({
        ...newContest,
        problems: [...newContest.problems, contestProblem],
      });
    } else if (editingContest) {
      setEditingContest({
        ...editingContest,
        problems: [...editingContest.problems, contestProblem],
      });
    }
    setShowAddProblemDialog(false);
  };

  const removeProblemFromContest = (problemId: number) => {
    if (isCreatingContest) {
      setNewContest({
        ...newContest,
        problems: newContest.problems.filter(p => p.id !== problemId),
      });
    } else if (editingContest) {
      setEditingContest({
        ...editingContest,
        problems: editingContest.problems.filter(p => p.id !== problemId),
      });
    }
  };

  const addGeneratedTestCase = (testCase: TestCase) => {
    if (isCreating) {
      setNewChallenge({
        ...newChallenge,
        testCases: [...newChallenge.testCases, testCase],
      });
    } else if (editingChallenge) {
      setEditingChallenge({
        ...editingChallenge,
        testCases: [...editingChallenge.testCases, testCase],
      });
    }
    setGeneratedTestCases(generatedTestCases.filter(tc => tc.id !== testCase.id));
  };

  const addAllGeneratedTestCases = () => {
    if (isCreating) {
      setNewChallenge({
        ...newChallenge,
        testCases: [...newChallenge.testCases, ...generatedTestCases],
      });
    } else if (editingChallenge) {
      setEditingChallenge({
        ...editingChallenge,
        testCases: [...editingChallenge.testCases, ...generatedTestCases],
      });
    }
    setGeneratedTestCases([]);
  };

  const removeTestCase = (testCaseId: number) => {
    if (isCreating) {
      setNewChallenge({
        ...newChallenge,
        testCases: newChallenge.testCases.filter(tc => tc.id !== testCaseId),
      });
    } else if (editingChallenge) {
      setEditingChallenge({
        ...editingChallenge,
        testCases: editingChallenge.testCases.filter(tc => tc.id !== testCaseId),
      });
    }
  };

  const handleSaveEdit = () => {
    if (editingChallenge) {
      setChallenges(challenges.map(c => c.id === editingChallenge.id ? editingChallenge : c));
      setEditingChallenge(null);
    }
  };

  const handleSaveContestEdit = () => {
    if (editingContest) {
      const start = new Date(`${editingContest.startDate}T${editingContest.startTime}`);
      const end = new Date(`${editingContest.endDate}T${editingContest.endTime}`);
      const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      
      const updated = {
        ...editingContest,
        duration: `${durationHours} hours`,
      };
      setContests(contests.map(c => c.id === editingContest.id ? updated : c));
      setEditingContest(null);
    }
  };

  const currentTestCases = isCreating ? newChallenge.testCases : editingChallenge?.testCases || [];
  const currentContestProblems = isCreatingContest ? newContest.problems : editingContest?.problems || [];

  // Available problems for contest (excluding already added ones)
  const availableProblems = challenges.filter(
    c => !currentContestProblems.some(p => p.id === c.id)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Code2 className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-semibold text-foreground">
              Byte Arena
            </span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-foreground">Admin Panel</h1>
            {isSuperAdmin && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Crown className="h-3 w-3 mr-1" />
                Super Admin
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{currentAdminEmail}</span>
          <Link to="/challenges">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Challenges
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("challenges")}
              className={cn(
                "px-4 py-3 text-sm font-medium transition-colors relative",
                activeTab === "challenges" 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Problems
              </div>
              {activeTab === "challenges" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("contests")}
              className={cn(
                "px-4 py-3 text-sm font-medium transition-colors relative",
                activeTab === "contests" 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Contests
              </div>
              {activeTab === "contests" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("students")}
              className={cn(
                "px-4 py-3 text-sm font-medium transition-colors relative",
                activeTab === "students" 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Students
              </div>
              {activeTab === "students" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            {isSuperAdmin && (
              <button
                onClick={() => setActiveTab("admins")}
                className={cn(
                  "px-4 py-3 text-sm font-medium transition-colors relative",
                  activeTab === "admins" 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Admins
                </div>
                {activeTab === "admins" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Students Tab */}
        {activeTab === "students" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold text-foreground">Student Monitoring</h2>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-muted-foreground">
                    {students.filter(s => s.status === "online" || s.status === "solving").length} Online
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-muted-foreground">
                    {students.filter(s => s.status === "solving").length} Solving
                  </span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {students.map((student) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedStudent(generateStudentDetail(student))}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                        {student.avatar}
                      </div>
                      <div className={cn(
                        "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card",
                        student.status === "online" && "bg-success",
                        student.status === "solving" && "bg-primary animate-pulse",
                        student.status === "offline" && "bg-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{student.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{student.email}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      #{student.rank}
                    </Badge>
                  </div>

                  {student.status === "solving" && student.currentProblem && (
                    <div className="mt-3 p-2 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-center gap-2 text-xs">
                        <Eye className="h-3 w-3 text-primary" />
                        <span className="text-primary font-medium">Currently solving:</span>
                      </div>
                      <p className="text-sm text-foreground mt-1">{student.currentProblem}</p>
                    </div>
                  )}

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3 w-3 text-success" />
                      <span className="text-muted-foreground">{student.problemsSolved} solved</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Trophy className="h-3 w-3 text-warning" />
                      <span className="text-muted-foreground">{student.totalSubmissions} submissions</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {student.lastActive}
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "text-xs",
                        student.status === "online" && "bg-success/10 text-success",
                        student.status === "solving" && "bg-primary/10 text-primary",
                        student.status === "offline" && "bg-muted text-muted-foreground"
                      )}
                    >
                      {student.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>

            <StudentDetailModal
              student={selectedStudent}
              open={!!selectedStudent}
              onClose={() => setSelectedStudent(null)}
            />
          </motion.div>
        )}

        {/* Admins Tab - Only for Super Admin */}
        {activeTab === "admins" && isSuperAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold text-foreground">Admin Management</h2>
              <Button onClick={() => setShowAddAdminDialog(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Admin
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {admins.map((admin) => (
                <motion.div
                  key={admin.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                        {admin.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{admin.name}</h3>
                        <p className="text-xs text-muted-foreground">{admin.email}</p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        admin.role === "superadmin" 
                          ? "bg-primary/10 text-primary border-primary/30" 
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {admin.role === "superadmin" ? (
                        <>
                          <Crown className="h-3 w-3 mr-1" />
                          Super Admin
                        </>
                      ) : (
                        <>
                          <Shield className="h-3 w-3 mr-1" />
                          Admin
                        </>
                      )}
                    </Badge>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-muted-foreground text-xs">Problems Created</div>
                      <div className="text-lg font-semibold text-foreground">{admin.problemsCreated}</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-muted-foreground text-xs">Contests Created</div>
                      <div className="text-lg font-semibold text-foreground">{admin.contestsCreated}</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Joined {admin.createdAt}</span>
                    {admin.role !== "superadmin" && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteAdmin(admin.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Add Admin Dialog */}
            <Dialog open={showAddAdminDialog} onOpenChange={setShowAddAdminDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Admin</DialogTitle>
                  <DialogDescription>
                    Create a new admin account. They will only be able to see and manage their own problems and contests.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                    <Input
                      value={newAdminForm.name}
                      onChange={(e) => setNewAdminForm({ ...newAdminForm, name: e.target.value })}
                      placeholder="Enter admin name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                    <Input
                      type="email"
                      value={newAdminForm.email}
                      onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
                      placeholder="admin@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
                    <Input
                      type="password"
                      value={newAdminForm.password}
                      onChange={(e) => setNewAdminForm({ ...newAdminForm, password: e.target.value })}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddAdminDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddAdmin} disabled={!newAdminForm.name || !newAdminForm.email || !newAdminForm.password}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Admin
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
        )}

        {/* Contests Tab */}
        {activeTab === "contests" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contest List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {isSuperAdmin ? "All Contests" : "My Contests"}
                </h2>
                <Button onClick={() => setIsCreatingContest(true)} disabled={isCreatingContest || !!editingContest}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Contest
                </Button>
              </div>

              <div className="space-y-4">
                {filteredContests.map((contest) => (
                  <motion.div
                    key={contest.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{contest.title}</h3>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              contest.status === "live" && "bg-red-500/10 text-red-500 border-red-500/30",
                              contest.status === "upcoming" && "bg-primary/10 text-primary border-primary/30",
                              contest.status === "past" && "bg-muted text-muted-foreground"
                            )}
                          >
                            {contest.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{contest.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{contest.startDate}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{contest.startTime}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Timer className="h-4 w-4 text-primary" />
                            <span>{contest.duration}</span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <Badge variant="secondary">{contest.problems.length} problems</Badge>
                          <Badge variant="outline" className={cn(
                            contest.difficulty === "Easy" && "text-success border-success/30",
                            contest.difficulty === "Medium" && "text-warning border-warning/30",
                            contest.difficulty === "Hard" && "text-destructive border-destructive/30"
                          )}>
                            {contest.difficulty}
                          </Badge>
                          {isSuperAdmin && (
                            <span className="text-xs text-muted-foreground">by {contest.createdBy}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setEditingContest(contest);
                            setIsCreatingContest(false);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteContest(contest.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {filteredContests.length === 0 && (
                  <div className="text-center py-12 bg-card border border-border rounded-xl">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No contests yet. Create your first one!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contest Editor */}
            <div className="space-y-6">
              {(isCreatingContest || editingContest) && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-xl p-6 space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-display font-bold text-foreground">
                      {isCreatingContest ? "Create Contest" : "Edit Contest"}
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setIsCreatingContest(false);
                        setEditingContest(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Title</label>
                      <Input
                        value={isCreatingContest ? newContest.title : editingContest?.title || ""}
                        onChange={(e) => {
                          if (isCreatingContest) {
                            setNewContest({ ...newContest, title: e.target.value });
                          } else if (editingContest) {
                            setEditingContest({ ...editingContest, title: e.target.value });
                          }
                        }}
                        placeholder="Enter contest title..."
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                      <Textarea
                        value={isCreatingContest ? newContest.description : editingContest?.description || ""}
                        onChange={(e) => {
                          if (isCreatingContest) {
                            setNewContest({ ...newContest, description: e.target.value });
                          } else if (editingContest) {
                            setEditingContest({ ...editingContest, description: e.target.value });
                          }
                        }}
                        placeholder="Enter contest description..."
                        rows={3}
                      />
                    </div>

                    {/* Timeline Settings */}
                    <div className="border-t border-border pt-4">
                      <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        Timeline
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Start Date</label>
                          <Input
                            type="date"
                            value={isCreatingContest ? newContest.startDate : editingContest?.startDate || ""}
                            onChange={(e) => {
                              if (isCreatingContest) {
                                setNewContest({ ...newContest, startDate: e.target.value });
                              } else if (editingContest) {
                                setEditingContest({ ...editingContest, startDate: e.target.value });
                              }
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Start Time</label>
                          <Input
                            type="time"
                            value={isCreatingContest ? newContest.startTime : editingContest?.startTime || ""}
                            onChange={(e) => {
                              if (isCreatingContest) {
                                setNewContest({ ...newContest, startTime: e.target.value });
                              } else if (editingContest) {
                                setEditingContest({ ...editingContest, startTime: e.target.value });
                              }
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">End Date</label>
                          <Input
                            type="date"
                            value={isCreatingContest ? newContest.endDate : editingContest?.endDate || ""}
                            onChange={(e) => {
                              if (isCreatingContest) {
                                setNewContest({ ...newContest, endDate: e.target.value });
                              } else if (editingContest) {
                                setEditingContest({ ...editingContest, endDate: e.target.value });
                              }
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">End Time</label>
                          <Input
                            type="time"
                            value={isCreatingContest ? newContest.endTime : editingContest?.endTime || ""}
                            onChange={(e) => {
                              if (isCreatingContest) {
                                setNewContest({ ...newContest, endTime: e.target.value });
                              } else if (editingContest) {
                                setEditingContest({ ...editingContest, endTime: e.target.value });
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Difficulty</label>
                        <div className="relative">
                          <select
                            value={isCreatingContest ? newContest.difficulty : editingContest?.difficulty || "Medium"}
                            onChange={(e) => {
                              const value = e.target.value as "Easy" | "Medium" | "Hard" | "Mixed";
                              if (isCreatingContest) {
                                setNewContest({ ...newContest, difficulty: value });
                              } else if (editingContest) {
                                setEditingContest({ ...editingContest, difficulty: value });
                              }
                            }}
                            className="w-full h-10 pl-4 pr-10 rounded-lg border border-input bg-background text-sm appearance-none cursor-pointer"
                          >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                            <option value="Mixed">Mixed</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Prize (Optional)</label>
                        <Input
                          value={isCreatingContest ? newContest.prize : editingContest?.prize || ""}
                          onChange={(e) => {
                            if (isCreatingContest) {
                              setNewContest({ ...newContest, prize: e.target.value });
                            } else if (editingContest) {
                              setEditingContest({ ...editingContest, prize: e.target.value });
                            }
                          }}
                          placeholder="e.g., Certificates, Cash Prize"
                        />
                      </div>
                    </div>

                    {/* Problems Section */}
                    <div className="border-t border-border pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-primary" />
                          Problems ({currentContestProblems.length})
                        </h3>
                        <Button size="sm" variant="outline" onClick={() => setShowAddProblemDialog(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Problem
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {currentContestProblems.map((problem, index) => (
                          <div key={problem.id} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                            <span className="text-sm font-medium text-muted-foreground w-6">{index + 1}.</span>
                            <div className="flex-1">
                              <span className="text-sm text-foreground">{problem.title}</span>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className={cn(
                                  "text-xs",
                                  problem.difficulty === "Easy" && "text-success border-success/30",
                                  problem.difficulty === "Medium" && "text-warning border-warning/30",
                                  problem.difficulty === "Hard" && "text-destructive border-destructive/30"
                                )}>
                                  {problem.difficulty}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{problem.points} pts</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeProblemFromContest(problem.id)}
                            >
                              <Trash2 className="h-3 w-3 text-destructive" />
                            </Button>
                          </div>
                        ))}
                        {currentContestProblems.length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No problems added yet. Add existing problems to this contest.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsCreatingContest(false);
                          setEditingContest(null);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={isCreatingContest ? handleCreateContest : handleSaveContestEdit}>
                        <Save className="h-4 w-4 mr-2" />
                        {isCreatingContest ? "Create Contest" : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {!isCreatingContest && !editingContest && (
                <div className="bg-card border border-border rounded-xl p-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    Create or Edit a Contest
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Click "New Contest" or edit an existing one to get started
                  </p>
                </div>
              )}
            </div>

            {/* Add Problem Dialog */}
            <Dialog open={showAddProblemDialog} onOpenChange={setShowAddProblemDialog}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add Problem to Contest</DialogTitle>
                  <DialogDescription>
                    Select an existing problem to add to this contest
                  </DialogDescription>
                </DialogHeader>
                <div className="max-h-96 overflow-y-auto space-y-2 py-4">
                  {availableProblems.length > 0 ? (
                    availableProblems.map((problem) => (
                      <div 
                        key={problem.id} 
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                        onClick={() => addProblemToContest(problem)}
                      >
                        <div>
                          <h4 className="font-medium text-foreground">{problem.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={cn(
                              "text-xs",
                              problem.difficulty === "Easy" && "text-success border-success/30",
                              problem.difficulty === "Medium" && "text-warning border-warning/30",
                              problem.difficulty === "Hard" && "text-destructive border-destructive/30"
                            )}>
                              {problem.difficulty}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">{problem.category}</Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      All available problems have been added to this contest.
                    </p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Challenges Tab */}
        {activeTab === "challenges" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Challenge List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {isSuperAdmin ? "All Problems" : "My Problems"}
                </h2>
                <Button onClick={() => setIsCreating(true)} disabled={isCreating || !!editingChallenge}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Problem
                </Button>
              </div>

              <div className="space-y-4">
                {filteredChallenges.map((challenge) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className={cn(
                            challenge.difficulty === "Easy" && "text-success border-success/30",
                            challenge.difficulty === "Medium" && "text-warning border-warning/30",
                            challenge.difficulty === "Hard" && "text-destructive border-destructive/30"
                          )}>
                            {challenge.difficulty}
                          </Badge>
                          <Badge variant="secondary">{challenge.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {challenge.testCases.length} test cases
                          </span>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-4 w-4 text-success" />
                            <span className="text-sm font-medium text-foreground">
                              {challenge.solvers.length} student{challenge.solvers.length !== 1 ? 's' : ''} solved
                            </span>
                            {isSuperAdmin && (
                              <span className="text-xs text-muted-foreground ml-auto">
                                by {challenge.createdBy}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setEditingChallenge(challenge);
                            setIsCreating(false);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteChallenge(challenge.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Challenge Editor */}
            <div className="space-y-6">
              {(isCreating || editingChallenge) && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-xl p-6 space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-display font-bold text-foreground">
                      {isCreating ? "Create Problem" : "Edit Problem"}
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setIsCreating(false);
                        setEditingChallenge(null);
                        setGeneratedTestCases([]);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Title</label>
                      <Input
                        value={isCreating ? newChallenge.title : editingChallenge?.title || ""}
                        onChange={(e) => {
                          if (isCreating) {
                            setNewChallenge({ ...newChallenge, title: e.target.value });
                          } else if (editingChallenge) {
                            setEditingChallenge({ ...editingChallenge, title: e.target.value });
                          }
                        }}
                        placeholder="Enter problem title..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Difficulty</label>
                        <div className="relative">
                          <select
                            value={isCreating ? newChallenge.difficulty : editingChallenge?.difficulty || "Easy"}
                            onChange={(e) => {
                              if (isCreating) {
                                setNewChallenge({ ...newChallenge, difficulty: e.target.value });
                              } else if (editingChallenge) {
                                setEditingChallenge({ ...editingChallenge, difficulty: e.target.value });
                              }
                            }}
                            className="w-full h-10 pl-4 pr-10 rounded-lg border border-input bg-background text-sm appearance-none cursor-pointer"
                          >
                            {difficulties.map((diff) => (
                              <option key={diff} value={diff}>{diff}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                        <div className="relative">
                          <select
                            value={isCreating ? newChallenge.category : editingChallenge?.category || "Arrays"}
                            onChange={(e) => {
                              if (isCreating) {
                                setNewChallenge({ ...newChallenge, category: e.target.value });
                              } else if (editingChallenge) {
                                setEditingChallenge({ ...editingChallenge, category: e.target.value });
                              }
                            }}
                            className="w-full h-10 pl-4 pr-10 rounded-lg border border-input bg-background text-sm appearance-none cursor-pointer"
                          >
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                      <Textarea
                        value={isCreating ? newChallenge.description : editingChallenge?.description || ""}
                        onChange={(e) => {
                          if (isCreating) {
                            setNewChallenge({ ...newChallenge, description: e.target.value });
                          } else if (editingChallenge) {
                            setEditingChallenge({ ...editingChallenge, description: e.target.value });
                          }
                        }}
                        placeholder="Enter problem description..."
                        rows={4}
                      />
                    </div>

                    {/* Test Cases Section */}
                    <div className="border-t border-border pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-medium text-foreground">Test Cases</label>
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <select
                              value={aiProvider}
                              onChange={(e) => setAiProvider(e.target.value as "chatgpt" | "gemini")}
                              className="h-8 pl-3 pr-8 rounded-lg border border-input bg-background text-xs appearance-none cursor-pointer"
                            >
                              <option value="chatgpt">ChatGPT</option>
                              <option value="gemini">Gemini</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleGenerateTestCases}
                            disabled={isGenerating}
                          >
                            {isGenerating ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Sparkles className="h-4 w-4 mr-2" />
                            )}
                            Generate with AI
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        {currentTestCases.map((tc) => (
                          <div key={tc.id} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                            <div className="flex-1 grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Input: </span>
                                <code className="text-primary">{tc.input}</code>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Output: </span>
                                <code className="text-success">{tc.expectedOutput}</code>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeTestCase(tc.id)}
                            >
                              <Trash2 className="h-3 w-3 text-destructive" />
                            </Button>
                          </div>
                        ))}
                        {currentTestCases.length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No test cases yet. Generate some with AI!
                          </p>
                        )}
                      </div>

                      {generatedTestCases.length > 0 && (
                        <div className="border border-primary/30 bg-primary/5 rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-primary" />
                              AI Generated Test Cases
                            </h4>
                            <Button size="sm" variant="outline" onClick={addAllGeneratedTestCases}>
                              Add All
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {generatedTestCases.map((tc) => (
                              <div key={tc.id} className="flex items-center gap-2 p-2 bg-background rounded-lg">
                                <div className="flex-1 grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Input: </span>
                                    <code className="text-primary">{tc.input}</code>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Output: </span>
                                    <code className="text-success">{tc.expectedOutput}</code>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => addGeneratedTestCase(tc)}
                                >
                                  <CheckCircle2 className="h-4 w-4 text-success" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsCreating(false);
                          setEditingChallenge(null);
                          setGeneratedTestCases([]);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={isCreating ? handleCreateChallenge : handleSaveEdit}>
                        <Save className="h-4 w-4 mr-2" />
                        {isCreating ? "Create Problem" : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {!isCreating && !editingChallenge && (
                <div className="bg-card border border-border rounded-xl p-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    Create or Edit a Problem
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Click "New Problem" or edit an existing one to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
