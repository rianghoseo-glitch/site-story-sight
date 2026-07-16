import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Click Vision captured our wedding with a level of artistry we didn't think was possible. Every frame felt like a painting. We've watched the film over 50 times and cry every single time.",
    name: "Rohan & Priya Mehta",
    type: "Wedding — Mumbai",
    initials: "RP",
  },
  {
    quote:
      "Our anniversary celebration was intimate and personal — and Click Vision honored every moment of it. The private event film felt like a heirloom from day one.",
    name: "Aryan Kapoor",
    type: "Private Event — Delhi",
    initials: "AK",
  },
  {
    quote:
      "From the pre-wedding shoot to the reception film, Click Vision told our story with such elegance. The candid moments they caught are the ones we treasure most.",
    name: "Simran & Harman Dhaliwal",
    type: "Wedding — Chandigarh",
    initials: "SH",
  },
  {
    quote:
      "From our first call to the final delivery, the experience was seamless. Our wedding film moved every single guest to tears at the screening. True masters of their craft.",
    name: "Vikram & Anjali Singh",
    type: "Wedding — Delhi",
    initials: "VA",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="section-padding" style={{ backgroundColor: "#050505" }}>
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label-tag mb-5"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-light text-foreground"
          >
            Trusted by India's finest
          </motion.h2>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-surface border border-border p-12 md:p-16">
            <Quote size={48} className="text-gold/15 absolute top-8 left-8" />

            <div className="text-center">
              <p className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-foreground/90 leading-relaxed italic mb-10">
                "{testimonials[current].quote}"
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <span className="font-sans-alt text-xs font-semibold text-gold">
                    {testimonials[current].initials}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-sans-alt font-semibold text-sm text-foreground">
                    {testimonials[current].name}
                  </p>
                  <p className="label-tag text-foreground/40 mt-0.5">
                    {testimonials[current].type}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 border border-border hover:border-gold/40 flex items-center justify-center text-foreground/40 hover:text-gold transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-px transition-all duration-300 ${
                    i === current ? "w-8 bg-gold" : "w-4 bg-border"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 border border-border hover:border-gold/40 flex items-center justify-center text-foreground/40 hover:text-gold transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
