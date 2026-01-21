import { motion } from "framer-motion";
import { Calendar, Clock, Users, Trophy, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const contests = [
  {
    id: 1,
    title: "Weekly Algorithm Sprint",
    description: "Test your algorithmic skills with 5 challenging problems in 2 hours.",
    date: "Every Saturday",
    time: "10:00 AM",
    participants: 120,
    difficulty: "Medium",
    status: "upcoming",
    prize: "Top 3 get certificates",
  },
  {
    id: 2,
    title: "Data Structures Marathon",
    description: "Deep dive into trees, graphs, and advanced data structures.",
    date: "Feb 15, 2024",
    time: "2:00 PM",
    participants: 85,
    difficulty: "Hard",
    status: "live",
    prize: "Winner gets internship referral",
  },
  {
    id: 3,
    title: "Beginner Friendly Contest",
    description: "Perfect for students just starting their competitive programming journey.",
    date: "Feb 20, 2024",
    time: "6:00 PM",
    participants: 200,
    difficulty: "Easy",
    status: "upcoming",
    prize: "Participation certificates for all",
  },
  {
    id: 4,
    title: "Inter-College Championship",
    description: "Compete against the best programmers from different colleges.",
    date: "March 1, 2024",
    time: "9:00 AM",
    participants: 500,
    difficulty: "Hard",
    status: "upcoming",
    prize: "Cash prizes & trophies",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ContestsSection() {
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

  return (
    <section id="contests" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-medium">Upcoming Contests</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Compete & Win{" "}
            <span className="text-gradient">Exciting Prizes</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join weekly contests, challenge yourself, and earn recognition among your peers.
          </p>
        </motion.div>

        {/* Contest Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {contests.map((contest) => (
            <motion.div
              key={contest.id}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative"
            >
              {/* Card glow on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-cyan-500/50 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
              
              <div className="relative bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Status badge */}
                <div className="flex items-center justify-between mb-4">
                  <Badge
                    variant="outline"
                    className={getDifficultyColor(contest.difficulty)}
                  >
                    {contest.difficulty}
                  </Badge>
                  {contest.status === "live" && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                      </span>
                      <span className="text-xs text-red-500 font-medium">LIVE</span>
                    </div>
                  )}
                </div>

                {/* Contest info */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {contest.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {contest.description}
                </p>

                {/* Meta info */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{contest.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{contest.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{contest.participants} registered</span>
                  </div>
                </div>

                {/* Prize */}
                <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-lg mb-4">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{contest.prize}</span>
                </div>

                {/* Action button */}
                <Button className="w-full group/btn" variant={contest.status === "live" ? "default" : "outline"}>
                  {contest.status === "live" ? "Join Now" : "Register"}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button variant="ghost" className="group text-muted-foreground hover:text-primary">
            View all contests
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
