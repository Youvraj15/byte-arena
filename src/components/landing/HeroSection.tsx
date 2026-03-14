import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

const bstCode = `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int data;
    Node *left, *right;
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int val) {
    if (!root) return new Node(val);
    if (val < root->data)
        root->left = insert(root->left, val);
    else
        root->right = insert(root->right, val);
    return root;
}

void inorder(Node* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}

int main() {
    Node* root = nullptr;
    int keys[] = {50, 30, 70, 20, 40, 60, 80};
    for (int key : keys)
        root = insert(root, key);
    inorder(root);
    return 0;
}`;

const keywords = ['#include', 'using', 'namespace', 'struct', 'int', 'if', 'else', 'return', 'void', 'for', 'new', 'nullptr'];
const types = ['Node', 'Node*'];

function highlightLine(line: string) {
  const parts: { text: string; cls: string }[] = [];
  const tokens = line.split(/(\b|\s+|[{}();,<>*=])/);
  tokens.forEach((token) => {
    if (keywords.includes(token)) {
      parts.push({ text: token, cls: 'text-primary' });
    } else if (types.includes(token)) {
      parts.push({ text: token, cls: 'text-accent-foreground' });
    } else if (/^".*"$/.test(token)) {
      parts.push({ text: token, cls: 'text-green-400' });
    } else if (/^\d+$/.test(token)) {
      parts.push({ text: token, cls: 'text-accent-foreground' });
    } else {
      parts.push({ text: token, cls: 'text-foreground' });
    }
  });
  return parts;
}

const allLines = bstCode.split('\n');

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const editorY = useTransform(scrollYProgress, [0, 0.5], [0, -160]);
  const editorScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  // Typing effect - starts after initial delay
  useEffect(() => {
    if (visibleLines >= allLines.length) return;
    const delay = visibleLines === 0 ? 800 : 80;
    const timeout = setTimeout(() => {
      setVisibleLines((v) => v + 1);
    }, delay);
    return () => clearTimeout(timeout);
  }, [visibleLines]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[160vh] flex items-start justify-center overflow-hidden bg-background pt-16"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 pt-16 md:pt-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Heading */}
          <motion.div style={{ opacity: textOpacity, y: textY }}>
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

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              The ultimate competitive coding platform for students.
              Sharpen your skills, challenge your peers, and climb the leaderboard.
            </motion.p>

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
                <Button size="lg" variant="outline" className="text-base px-8 py-6 border-border hover:bg-accent group">
                  Explore Problems
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Code editor - compact with typing effect */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ y: editorY, scale: editorScale }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-2xl opacity-50 animate-breathe" />

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

              {/* Code with typing animation */}
              <div className="flex font-mono text-sm text-left max-h-[420px] overflow-hidden">
                {/* Line numbers */}
                <div className="py-4 px-3 bg-muted/30 border-r border-border select-none">
                  {allLines.slice(0, visibleLines).map((_, i) => (
                    <div key={i} className="leading-6 text-muted-foreground/40 text-right text-xs w-6">
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Code lines */}
                <div className="p-4 flex-1 overflow-hidden">
                  {allLines.slice(0, visibleLines).map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15 }}
                      className="leading-6"
                    >
                      {line === '' ? (
                        <span>&nbsp;</span>
                      ) : (
                        highlightLine(line).map((part, j) => (
                          <span key={j} className={part.cls}>{part.text}</span>
                        ))
                      )}
                    </motion.div>
                  ))}
                  {/* Blinking cursor */}
                  <div className="flex items-center leading-6">
                    <motion.span
                      className="w-2 h-5 bg-primary rounded-sm"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-4 py-1.5 bg-secondary/50 border-t border-border text-[10px] text-muted-foreground/60 font-mono">
                <div className="flex items-center gap-3">
                  <span>Ln {visibleLines}, Col 1</span>
                  <span>UTF-8</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    {visibleLines < allLines.length ? 'Typing...' : 'Ready'}
                  </span>
                  <span>Spaces: 4</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
