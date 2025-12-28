import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    content: "Byte Arena completely transformed how I approach coding challenges. The real-time battles are addictive, and I've improved more in 3 months than I did in a year of solo practice.",
    author: "Sarah Chen",
    role: "Senior Developer at Google",
    avatar: "SC",
    rating: 5,
  },
  {
    content: "The analytics dashboard is incredibly detailed. I can see exactly where I need to improve, and the community is super supportive. Best investment in my coding career.",
    author: "Marcus Johnson",
    role: "Full Stack Engineer",
    avatar: "MJ",
    rating: 5,
  },
  {
    content: "Finally, a platform that makes competitive coding fun and accessible. The async challenges are perfect for my busy schedule, and the leaderboard keeps me motivated.",
    author: "Elena Rodriguez",
    role: "Tech Lead at Stripe",
    avatar: "ER",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
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
            Loved by{" "}
            <span className="text-gradient">developers</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our community has to say about their Byte Arena experience.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
