import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  return (
    <section id="demo-video" className="py-24 bg-secondary relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary-foreground mb-4">
            See Byte Arena in{" "}
            <span className="text-primary">Action</span>
          </h2>
          <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
            Watch how students compete in real-time coding battles and improve their skills.
          </p>
        </motion.div>

        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Video container with glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-cyan-500/30 to-primary/30 rounded-2xl blur-2xl opacity-50" />
          
          <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
            {/* Video placeholder with animated content */}
            <div className="aspect-video bg-gradient-to-br from-background via-secondary to-background relative">
              {/* Animated code lines in background */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-4 bg-primary/30 rounded my-2 mx-4"
                    style={{ width: `${30 + Math.random() * 50}%` }}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  />
                ))}
              </div>

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative cursor-pointer group"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {/* Pulse ring */}
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                  
                  {/* Play button */}
                  <div className="relative w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow">
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-primary-foreground" />
                    ) : (
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    )}
                  </div>
                </motion.div>
                
                <p className="mt-6 text-muted-foreground text-sm">
                  {isPlaying ? "Playing demo..." : "Click to play demo"}
                </p>
              </div>

              {/* Animated elements */}
              <motion.div
                className="absolute top-8 left-8 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-green-400 text-sm font-mono">✓ All tests passed</span>
              </motion.div>

              <motion.div
                className="absolute top-8 right-8 px-4 py-2 bg-primary/20 border border-primary/30 rounded-lg"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <span className="text-primary text-sm font-mono">Runtime: 0.02s</span>
              </motion.div>

              <motion.div
                className="absolute bottom-8 left-8 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
              >
                <span className="text-cyan-400 text-sm font-mono">Rank: #1 🏆</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
