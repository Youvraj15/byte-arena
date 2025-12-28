import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Ready to start your{" "}
            <span className="text-gradient">coding journey</span>?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of developers who are already leveling up their skills. 
            Start competing today — it's free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="hero" asChild>
              <Link to="/register">
                Create Free Account
                <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link to="/challenges">Explore Challenges</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
