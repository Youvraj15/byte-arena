import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  Play, 
  Send, 
  Clock, 
  CheckCircle2, 
  XCircle,
  ChevronDown,
  Lightbulb,
  Trophy,
  FileText,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  LogIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const languages = [
  { id: "c", name: "C", template: '#include <stdio.h>\n\nint main() {\n    // Your code here\n    return 0;\n}' },
  { id: "cpp", name: "C++", template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}' },
  { id: "java", name: "Java", template: 'public class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}' },
  { id: "python", name: "Python", template: '# Your code here\ndef solution():\n    pass\n\nif __name__ == "__main__":\n    solution()' },
];

const challengeData = {
  id: 1,
  title: "Two Sum",
  difficulty: "Easy",
  description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]",
      explanation: ""
    }
  ],
  constraints: [
    "2 ≤ nums.length ≤ 10⁴",
    "-10⁹ ≤ nums[i] ≤ 10⁹",
    "-10⁹ ≤ target ≤ 10⁹",
    "Only one valid answer exists."
  ],
  hints: [
    "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
    "Try using a hash map to find the complement of each number."
  ],
  acceptanceRate: 49.2,
  submissions: 15420000,
};

const testCases = [
  { id: 1, input: "[2,7,11,15], 9", expected: "[0,1]", status: "pending" },
  { id: 2, input: "[3,2,4], 6", expected: "[1,2]", status: "pending" },
  { id: 3, input: "[3,3], 6", expected: "[0,1]", status: "pending" },
];

const getDifficultyStyles = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "bg-success/10 text-success border-success/20";
    case "Medium": return "bg-warning/10 text-warning border-warning/20";
    case "Hard": return "bg-destructive/10 text-destructive border-destructive/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

export default function ChallengeSolve() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState(languages[3]); // Python default
  const [code, setCode] = useState(selectedLanguage.template);
  const [activeTab, setActiveTab] = useState("description");
  const [testResults, setTestResults] = useState(testCases);
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editorTheme, setEditorTheme] = useState<"vs-dark" | "light">("vs-dark");

  const isAuthenticated = localStorage.getItem("userAuth") === "true";

  const handleLanguageChange = (langId: string) => {
    const lang = languages.find(l => l.id === langId);
    if (lang) {
      setSelectedLanguage(lang);
      setCode(lang.template);
    }
  };

  const checkAuthAndProceed = (action: () => void) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to run or submit your code.",
        variant: "destructive",
      });
      return;
    }
    action();
  };

  const handleRun = () => {
    checkAuthAndProceed(() => {
      setIsRunning(true);
      // Simulate running code
      setTimeout(() => {
        setTestResults(testCases.map((tc, i) => ({
          ...tc,
          status: i === 0 ? "passed" : i === 1 ? "passed" : "failed"
        })));
        setIsRunning(false);
      }, 1500);
    });
  };

  const handleSubmit = () => {
    checkAuthAndProceed(() => {
      setIsRunning(true);
      setTimeout(() => {
        setTestResults(testCases.map(tc => ({ ...tc, status: "passed" })));
        setIsRunning(false);
      }, 2000);
    });
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/challenges" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="font-display font-semibold text-foreground">{challengeData.title}</h1>
          <Badge variant="outline" className={getDifficultyStyles(challengeData.difficulty)}>
            {challengeData.difficulty}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>45:00</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 border-r border-border flex flex-col overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b border-border bg-card h-10 px-2">
              <TabsTrigger value="description" className="text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                <FileText className="h-4 w-4 mr-1" />
                Description
              </TabsTrigger>
              <TabsTrigger value="solutions" className="text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                <Lightbulb className="h-4 w-4 mr-1" />
                Solutions
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                <Trophy className="h-4 w-4 mr-1" />
                Leaderboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="flex-1 overflow-auto p-6 mt-0">
              <div className="prose prose-invert max-w-none">
                {/* Problem Statement */}
                <div className="mb-6">
                  <p className="text-foreground whitespace-pre-wrap">{challengeData.description}</p>
                </div>

                {/* Examples */}
                <div className="space-y-4 mb-6">
                  {challengeData.examples.map((example, i) => (
                    <div key={i} className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm font-medium text-foreground mb-2">Example {i + 1}:</p>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-muted-foreground">Input:</span> <code className="bg-background px-2 py-0.5 rounded text-primary">{example.input}</code></p>
                        <p><span className="text-muted-foreground">Output:</span> <code className="bg-background px-2 py-0.5 rounded text-primary">{example.output}</code></p>
                        {example.explanation && (
                          <p><span className="text-muted-foreground">Explanation:</span> {example.explanation}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-foreground mb-2">Constraints:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {challengeData.constraints.map((c, i) => (
                      <li key={i}><code className="text-primary">{c}</code></li>
                    ))}
                  </ul>
                </div>

                {/* Hints */}
                <div>
                  <button 
                    onClick={() => setShowHints(!showHints)}
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Lightbulb className="h-4 w-4" />
                    {showHints ? "Hide Hints" : "Show Hints"}
                  </button>
                  {showHints && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 space-y-2"
                    >
                      {challengeData.hints.map((hint, i) => (
                        <div key={i} className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm text-foreground">
                          <span className="font-medium text-primary">Hint {i + 1}:</span> {hint}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="solutions" className="flex-1 overflow-auto p-6 mt-0">
              <div className="text-center py-12 text-muted-foreground">
                <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Solutions will be available after you solve this challenge</p>
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="flex-1 overflow-auto p-6 mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Challenge Leaderboard</h3>
                <div className="space-y-2">
                  {[
                    { rank: 1, name: "Alex Chen", time: "12ms", language: "C++", date: "2024-01-15" },
                    { rank: 2, name: "Sarah Miller", time: "15ms", language: "Python", date: "2024-01-14" },
                    { rank: 3, name: "John Doe", time: "18ms", language: "Java", date: "2024-01-13" },
                    { rank: 4, name: "Emily Wang", time: "22ms", language: "C++", date: "2024-01-12" },
                    { rank: 5, name: "Mike Johnson", time: "25ms", language: "Python", date: "2024-01-11" },
                  ].map((entry) => (
                    <div 
                      key={entry.rank} 
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border",
                        entry.rank === 1 && "bg-yellow-500/10 border-yellow-500/30",
                        entry.rank === 2 && "bg-gray-300/10 border-gray-300/30",
                        entry.rank === 3 && "bg-amber-600/10 border-amber-600/30",
                        entry.rank > 3 && "bg-muted/50 border-border"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <span className={cn(
                          "w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm",
                          entry.rank === 1 && "bg-yellow-500 text-yellow-950",
                          entry.rank === 2 && "bg-gray-300 text-gray-800",
                          entry.rank === 3 && "bg-amber-600 text-amber-950",
                          entry.rank > 3 && "bg-muted text-muted-foreground"
                        )}>
                          {entry.rank}
                        </span>
                        <span className="font-medium text-foreground">{entry.name}</span>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <span className="text-success font-mono">{entry.time}</span>
                        <span className="text-muted-foreground">{entry.language}</span>
                        <span className="text-muted-foreground">{entry.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Code Editor */}
        <div className={cn(
          "flex flex-col overflow-hidden transition-all duration-300",
          isFullscreen ? "fixed inset-0 z-50 w-full" : "w-1/2"
        )}>
          {/* Language Selector & Controls */}
          <div className="h-10 border-b border-border bg-card flex items-center justify-between px-4">
            <div className="relative">
              <select
                value={selectedLanguage.id}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="h-8 pl-3 pr-8 rounded border border-input bg-background text-sm appearance-none cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>{lang.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setEditorTheme(editorTheme === "vs-dark" ? "light" : "vs-dark")}
                title={editorTheme === "vs-dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
              >
                {editorTheme === "vs-dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              {/* Fullscreen Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1">
            <Editor
              height="100%"
              language={selectedLanguage.id === "cpp" ? "cpp" : selectedLanguage.id}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme={editorTheme}
              options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 16 },
                lineNumbers: "on",
                roundedSelection: true,
                automaticLayout: true,
                tabSize: 4,
              }}
            />
          </div>

          {/* Test Cases */}
          <div className="h-48 border-t border-border bg-card overflow-auto">
            <div className="p-4">
              <p className="text-sm font-medium text-foreground mb-3">Test Cases</p>
              <div className="space-y-2">
                {testResults.map((tc) => (
                  <div 
                    key={tc.id} 
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border text-sm",
                      tc.status === "passed" && "bg-success/5 border-success/20",
                      tc.status === "failed" && "bg-destructive/5 border-destructive/20",
                      tc.status === "pending" && "bg-muted/50 border-border"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {tc.status === "passed" && <CheckCircle2 className="h-4 w-4 text-success" />}
                      {tc.status === "failed" && <XCircle className="h-4 w-4 text-destructive" />}
                      {tc.status === "pending" && <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />}
                      <span className="text-muted-foreground">Case {tc.id}:</span>
                      <code className="text-foreground">{tc.input}</code>
                    </div>
                    <span className={cn(
                      "text-xs font-medium",
                      tc.status === "passed" && "text-success",
                      tc.status === "failed" && "text-destructive",
                      tc.status === "pending" && "text-muted-foreground"
                    )}>
                      {tc.status === "passed" ? "Passed" : tc.status === "failed" ? "Failed" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="h-14 border-t border-border bg-card flex items-center justify-between px-4">
            <div className="text-sm text-muted-foreground">
              Acceptance: <span className="text-foreground font-medium">{challengeData.acceptanceRate}%</span>
            </div>
            <div className="flex items-center gap-2">
              {!isAuthenticated && (
                <Button variant="ghost" size="sm" asChild className="text-primary">
                  <Link to="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login to Run
                  </Link>
                </Button>
              )}
              <Button variant="outline" onClick={handleRun} disabled={isRunning}>
                <Play className="h-4 w-4 mr-2" />
                Run
              </Button>
              <Button onClick={handleSubmit} disabled={isRunning}>
                <Send className="h-4 w-4 mr-2" />
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
