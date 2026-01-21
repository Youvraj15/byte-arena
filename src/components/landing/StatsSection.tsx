import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Active Students", duration: 2 },
  { value: 5000, suffix: "+", label: "Submissions", duration: 2.5 },
  { value: 150, suffix: "+", label: "Problems", duration: 1.5 },
  { value: 10, suffix: "+", label: "Colleges", duration: 2 },
];

function AnimatedNumber({ value, suffix, duration }: { value: number; suffix: string; duration: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const startTime = Date.now();
      const endTime = startTime + duration * 1000;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(value * easeOut));

        if (now < endTime) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(num >= 1000000 ? 0 : 1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
    }
    return num.toString();
  };

  return (
    <span ref={ref}>
      {formatNumber(displayValue)}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-24 bg-secondary text-secondary-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Trusted by developers{" "}
            <span className="text-primary">worldwide</span>
          </h2>
          <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
            Join a growing community of passionate developers who are sharpening their skills every day.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} duration={stat.duration} />
              </div>
              <div className="text-secondary-foreground/70 text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
