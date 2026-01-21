import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/10 via-cyan-500/10 to-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Animated border */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Gradient border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-cyan-500 to-primary rounded-2xl opacity-20 blur-sm" />
          
          <div className="relative bg-card border border-border rounded-2xl p-12 md:p-16 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Free to get started</span>
            </motion.div>

            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Ready to start your{" "}
              <span className="text-gradient">coding journey</span>?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join 500+ students who are already improving their skills. 
              Start practicing today — it's completely free.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="group text-base px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                  Create Free Account
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/challenges">
                <Button size="lg" variant="outline" className="text-base px-8 py-6">
                  Explore Problems
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10 pt-8 border-t border-border"
            >
              <p className="text-sm text-muted-foreground mb-4">Trusted by students from</p>
              <div className="flex flex-wrap justify-center gap-6 text-muted-foreground/60">
                <span className="font-semibold">IIT Delhi</span>
                <span className="font-semibold">NIT Trichy</span>
                <span className="font-semibold">BITS Pilani</span>
                <span className="font-semibold">VIT Vellore</span>
                <span className="font-semibold">+ 6 more</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
