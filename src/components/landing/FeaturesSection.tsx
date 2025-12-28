import { motion } from "framer-motion";
import { Zap, Shield, Trophy, BarChart3, Users, Clock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-Time Battles",
    description: "Compete head-to-head with developers in real-time coding battles. Race against the clock and your opponents.",
  },
  {
    icon: Shield,
    title: "Secure Authentication",
    description: "Enterprise-grade security with JWT-based authentication. Your code and data are always protected.",
  },
  {
    icon: Trophy,
    title: "Rankings & Rewards",
    description: "Climb the global leaderboard, earn badges, and unlock exclusive rewards as you progress.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track your progress with detailed analytics. Identify strengths and areas for improvement.",
  },
  {
    icon: Users,
    title: "Global Community",
    description: "Join a thriving community of 50,000+ developers. Share solutions and learn from the best.",
  },
  {
    icon: Clock,
    title: "Async Challenges",
    description: "Can't compete live? Take on challenges at your own pace with our async competition mode.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Everything you need to{" "}
            <span className="text-gradient">level up</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Byte Arena provides all the tools and features you need to become a better developer through competitive coding.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-6 bg-background rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
