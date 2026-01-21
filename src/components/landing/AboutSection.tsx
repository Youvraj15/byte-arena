import { motion } from "framer-motion";
import { Code2, GraduationCap, Target, Rocket } from "lucide-react";

const values = [
  {
    icon: Code2,
    title: "Learn by Doing",
    description: "Hands-on practice with real coding challenges that prepare you for technical interviews and competitions.",
  },
  {
    icon: GraduationCap,
    title: "Academic Excellence",
    description: "Designed specifically for college students to complement their curriculum and build practical skills.",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "Track your progress, set goals, and achieve milestones as you advance through difficulty levels.",
  },
  {
    icon: Rocket,
    title: "Career Ready",
    description: "Build a portfolio of solved problems and compete for internship referrals from top companies.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-secondary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary-foreground mb-6">
              Built for{" "}
              <span className="text-primary">Students</span>,
              <br />
              by Students
            </h2>
            <p className="text-lg text-secondary-foreground/70 mb-8 leading-relaxed">
              Byte Arena was created as a college project with a simple mission: 
              make competitive programming accessible and engaging for every student. 
              We understand the challenges of learning to code because we've been there.
            </p>
            <p className="text-secondary-foreground/70 mb-8 leading-relaxed">
              Our platform combines the thrill of competition with structured learning, 
              helping students develop problem-solving skills that last a lifetime. 
              Whether you're preparing for placements, participating in hackathons, 
              or just love coding challenges, Byte Arena is your arena.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">500+</div>
                <div className="text-sm text-secondary-foreground/60">Students</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">150+</div>
                <div className="text-sm text-secondary-foreground/60">Problems</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">10+</div>
                <div className="text-sm text-secondary-foreground/60">Colleges</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Values grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="p-6 bg-card border border-border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
