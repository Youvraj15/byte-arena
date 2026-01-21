import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    content: "Byte Arena helped me crack my placement interviews! The practice problems were exactly what I needed to build confidence in DSA.",
    author: "Arjun Sharma",
    role: "CSE Student, IIT Delhi",
    avatar: "AS",
    rating: 5,
  },
  {
    content: "I love the weekly contests! They push me to think faster and write cleaner code. My problem-solving skills have improved dramatically.",
    author: "Priya Patel",
    role: "IT Student, NIT Trichy",
    avatar: "PP",
    rating: 5,
  },
  {
    content: "The real-time battles with classmates make coding so much more fun. It's like gaming but you're actually learning valuable skills!",
    author: "Rahul Verma",
    role: "ECE Student, BITS Pilani",
    avatar: "RV",
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
