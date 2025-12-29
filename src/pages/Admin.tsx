import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const difficulties = ["Easy", "Medium", "Hard"];
const categories = ["Arrays", "Strings", "Dynamic Programming", "Graphs", "Trees", "Math", "Two Pointers", "Binary Search", "Linked List", "Backtracking"];

interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
}

interface Challenge {
  id: number;
  title: string;
  difficulty: string;
  category: string;
  description: string;
  testCases: TestCase[];
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
  },
];

export default function Admin() {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [aiProvider, setAiProvider] = useState<"chatgpt" | "gemini">("chatgpt");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTestCases, setGeneratedTestCases] = useState<TestCase[]>([]);

  const [newChallenge, setNewChallenge] = useState<Omit<Challenge, "id">>({
    title: "",
    difficulty: "Easy",
    category: "Arrays",
    description: "",
    testCases: [],
  });

  const handleCreateChallenge = () => {
    const challenge: Challenge = {
      ...newChallenge,
      id: Date.now(),
    };
    setChallenges([...challenges, challenge]);
    setIsCreating(false);
    setNewChallenge({
      title: "",
      difficulty: "Easy",
      category: "Arrays",
      description: "",
      testCases: [],
    });
  };

  const handleDeleteChallenge = (id: number) => {
    setChallenges(challenges.filter(c => c.id !== id));
  };

  const handleGenerateTestCases = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generated: TestCase[] = [
      { id: Date.now(), input: "[1,2,3,4], 5", expectedOutput: "[0,3]" },
      { id: Date.now() + 1, input: "[5,5], 10", expectedOutput: "[0,1]" },
      { id: Date.now() + 2, input: "[-1,0,1], 0", expectedOutput: "[0,2]" },
      { id: Date.now() + 3, input: "[100,200,300], 400", expectedOutput: "[0,2]" },
      { id: Date.now() + 4, input: "[1,1,1,1], 2", expectedOutput: "[0,1]" },
    ];
    
    setGeneratedTestCases(generated);
    setIsGenerating(false);
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

  const currentTestCases = isCreating ? newChallenge.testCases : editingChallenge?.testCases || [];

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
          <h1 className="text-lg font-semibold text-foreground">Admin Panel</h1>
        </div>
        <Link to="/challenges">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Challenges
          </Button>
        </Link>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Challenge List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold text-foreground">Challenges</h2>
              <Button onClick={() => setIsCreating(true)} disabled={isCreating || !!editingChallenge}>
                <Plus className="h-4 w-4 mr-2" />
                New Challenge
              </Button>
            </div>

            <div className="space-y-4">
              {challenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
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
                    </div>
                    <div className="flex items-center gap-2">
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
                    {isCreating ? "Create Challenge" : "Edit Challenge"}
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
                      placeholder="Enter challenge title..."
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
                      placeholder="Enter challenge description..."
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

                    {/* Current Test Cases */}
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

                    {/* Generated Test Cases */}
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
                      {isCreating ? "Create Challenge" : "Save Changes"}
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
                  Create or Edit a Challenge
                </h3>
                <p className="text-muted-foreground text-sm">
                  Click "New Challenge" or edit an existing one to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
