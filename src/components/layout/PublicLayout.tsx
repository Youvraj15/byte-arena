import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
  Swords, 
  Trophy, 
  LayoutDashboard,
  Menu,
  X,
  Code2,
  User,
  LogOut,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const publicNavLinks = [
  { name: "Problems", href: "/challenges", icon: Swords },
  { name: "Contests", href: "/contests", icon: Calendar },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
];

const authNavLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Problems", href: "/challenges", icon: Swords },
  { name: "Contests", href: "/contests", icon: Calendar },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Profile", href: "/profile", icon: User },
];

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("userAuth") === "true";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
              <Code2 className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              Byte Arena
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {(isAuthenticated ? authNavLinks : publicNavLinks).map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  localStorage.removeItem("userAuth");
                  localStorage.removeItem("userEmail");
                  localStorage.removeItem("userName");
                  window.location.href = "/";
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {(isAuthenticated ? authNavLinks : publicNavLinks).map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-border space-y-2">
                {isAuthenticated ? (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      localStorage.removeItem("userAuth");
                      localStorage.removeItem("userEmail");
                      localStorage.removeItem("userName");
                      window.location.href = "/";
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link to="/register">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content with padding for fixed header */}
      <main className="flex-1 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4 py-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
