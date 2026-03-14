import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const bstCode = [
  { text: '#include', cls: 'text-primary' },
  { text: ' <bits/stdc++.h>', cls: 'text-muted-foreground' },
  { break: true },
  { text: 'using namespace', cls: 'text-primary' },
  { text: ' std', cls: 'text-accent-foreground' },
  { text: ';', cls: 'text-muted-foreground' },
  { break: true },
  { empty: true },
  { text: 'struct', cls: 'text-primary' },
  { text: ' Node {', cls: 'text-foreground' },
  { break: true },
  { text: '    int', cls: 'text-primary', indent: true },
  { text: ' data;', cls: 'text-foreground' },
  { break: true },
  { text: '    Node', cls: 'text-accent-foreground', indent: true },
  { text: ' *left, *right;', cls: 'text-foreground' },
  { break: true },
  { text: '    Node', cls: 'text-accent-foreground', indent: true },
  { text: '(', cls: 'text-muted-foreground' },
  { text: 'int', cls: 'text-primary' },
  { text: ' val) : data(val), left(', cls: 'text-foreground' },
  { text: 'nullptr', cls: 'text-primary' },
  { text: '), right(', cls: 'text-foreground' },
  { text: 'nullptr', cls: 'text-primary' },
  { text: ') {}', cls: 'text-foreground' },
  { break: true },
  { text: '};', cls: 'text-foreground' },
  { break: true },
  { empty: true },
  { text: 'Node*', cls: 'text-accent-foreground' },
  { text: ' insert', cls: 'text-foreground' },
  { text: '(Node* root, ', cls: 'text-muted-foreground' },
  { text: 'int', cls: 'text-primary' },
  { text: ' val) {', cls: 'text-muted-foreground' },
  { break: true },
  { text: '    if', cls: 'text-primary', indent: true },
  { text: ' (!root) ', cls: 'text-foreground' },
  { text: 'return new', cls: 'text-primary' },
  { text: ' Node(val);', cls: 'text-foreground' },
  { break: true },
  { text: '    if', cls: 'text-primary', indent: true },
  { text: ' (val < root->data)', cls: 'text-foreground' },
  { break: true },
  { text: '        root->left = insert(root->left, val);', cls: 'text-foreground', indent: true },
  { break: true },
  { text: '    else', cls: 'text-primary', indent: true },
  { break: true },
  { text: '        root->right = insert(root->right, val);', cls: 'text-foreground', indent: true },
  { break: true },
  { text: '    return', cls: 'text-primary', indent: true },
  { text: ' root;', cls: 'text-foreground' },
  { break: true },
  { text: '}', cls: 'text-muted-foreground' },
  { break: true },
  { empty: true },
  { text: 'void', cls: 'text-primary' },
  { text: ' inorder', cls: 'text-foreground' },
  { text: '(Node* root) {', cls: 'text-muted-foreground' },
  { break: true },
  { text: '    if', cls: 'text-primary', indent: true },
  { text: ' (!root) ', cls: 'text-foreground' },
  { text: 'return', cls: 'text-primary' },
  { text: ';', cls: 'text-muted-foreground' },
  { break: true },
  { text: '    inorder(root->left);', cls: 'text-foreground', indent: true },
  { break: true },
  { text: '    cout', cls: 'text-accent-foreground', indent: true },
  { text: ' << root->data << ', cls: 'text-foreground' },
  { text: '" "', cls: 'text-success' },
  { text: ';', cls: 'text-muted-foreground' },
  { break: true },
  { text: '    inorder(root->right);', cls: 'text-foreground', indent: true },
  { break: true },
  { text: '}', cls: 'text-muted-foreground' },
  { break: true },
  { empty: true },
  { text: 'int', cls: 'text-primary' },
  { text: ' main', cls: 'text-foreground' },
  { text: '() {', cls: 'text-muted-foreground' },
  { break: true },
  { text: '    Node* root = ', cls: 'text-foreground', indent: true },
  { text: 'nullptr', cls: 'text-primary' },
  { text: ';', cls: 'text-muted-foreground' },
  { break: true },
  { text: '    int', cls: 'text-primary', indent: true },
  { text: ' keys[] = {', cls: 'text-foreground' },
  { text: '50, 30, 70, 20, 40, 60, 80', cls: 'text-accent-foreground' },
  { text: '};', cls: 'text-foreground' },
  { break: true },
  { text: '    for', cls: 'text-primary', indent: true },
  { text: ' (', cls: 'text-muted-foreground' },
  { text: 'int', cls: 'text-primary' },
  { text: ' key : keys)', cls: 'text-foreground' },
  { break: true },
  { text: '        root = insert(root, key);', cls: 'text-foreground', indent: true },
  { break: true },
  { text: '    inorder(root);', cls: 'text-foreground', indent: true },
  { break: true },
  { text: '    return', cls: 'text-primary', indent: true },
  { text: ' 0;', cls: 'text-foreground' },
  { break: true },
  { text: '}', cls: 'text-muted-foreground' },
];

function CodeLine({ tokens, delay }: { tokens: typeof bstCode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className="leading-6"
    >
      {tokens.map((t, i) => (
        <span key={i} className={t.cls}>{t.text}</span>
      ))}
    </motion.div>
  );
}

function renderCodeLines() {
  const lines: { tokens: typeof bstCode }[] = [];
  let currentLine: typeof bstCode = [];

  bstCode.forEach((token) => {
    if ('break' in token) {
      lines.push({ tokens: [...currentLine] });
      currentLine = [];
    } else if ('empty' in token) {
      lines.push({ tokens: [] });
    } else {
      currentLine.push(token);
    }
  });
  if (currentLine.length > 0) {
    lines.push({ tokens: currentLine });
  }

  return lines;
}

const codeLines = renderCodeLines();

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const editorY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const editorScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.02]);
  const bgParallax = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[140vh] flex items-start justify-center overflow-hidden bg-background pt-16"
    >
      {/* Animated gradient background */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y: bgParallax }}>
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      </motion.div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-16 md:pt-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight"
          >
            Code.{" "}
            <span className="relative">
              <span className="text-gradient">Compete.</span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent-foreground rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>{" "}
            <br className="hidden md:block" />
            Conquer.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The ultimate competitive coding platform for students.
            Sharpen your skills, challenge your peers, and climb the leaderboard.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/register">
              <Button size="lg" className="group text-base px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                Start Coding Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/challenges">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 border-border hover:bg-accent group"
              >
                Explore Problems
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          {/* Hero visual - Code editor with scroll parallax */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ y: editorY, scale: editorScale }}
            className="relative max-w-4xl mx-auto"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-2xl opacity-50 animate-breathe" />

            {/* Code editor mockup */}
            <div className="relative bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
              {/* Window controls */}
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <span className="text-xs text-muted-foreground ml-4 font-mono">solution.cpp — Binary Search Tree</span>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground/60 font-mono px-2 py-0.5 bg-muted rounded">C++17</span>
                </div>
              </div>

              {/* Code content with line numbers */}
              <div className="flex font-mono text-sm text-left max-h-[420px] overflow-hidden">
                {/* Line numbers */}
                <div className="py-4 px-3 bg-muted/30 border-r border-border select-none">
                  {codeLines.map((_, i) => (
                    <div key={i} className="leading-6 text-muted-foreground/40 text-right text-xs w-6">
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Code */}
                <div className="p-4 flex-1 overflow-hidden">
                  {codeLines.map((line, i) => (
                    <CodeLine key={i} tokens={line.tokens} delay={0.5 + i * 0.04} />
                  ))}
                  {/* Cursor */}
                  <motion.div className="flex items-center leading-6">
                    <motion.span
                      className="w-2 h-5 bg-primary rounded-sm"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-4 py-1.5 bg-secondary/50 border-t border-border text-[10px] text-muted-foreground/60 font-mono">
                <div className="flex items-center gap-3">
                  <span>Ln {codeLines.length}, Col 1</span>
                  <span>UTF-8</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    Ready
                  </span>
                  <span>Spaces: 4</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
