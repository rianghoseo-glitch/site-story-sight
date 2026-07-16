import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Camera, Scissors, Download } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Discovery",
    description:
      "We consult to understand your vision, story, and goals. No templates — every project begins with listening.",
  },
  {
    number: "02",
    icon: Camera,
    title: "Production",
    description:
      "Our expert crews capture moments with cinema-grade equipment. Every shot is composed with intent and artistry.",
  },
  {
    number: "03",
    icon: Scissors,
    title: "Post-Production",
    description:
      "Master editors craft raw footage into a narrative masterpiece. Color grading, sound design, and music scoring included.",
  },
  {
    number: "04",
    icon: Download,
    title: "Delivery",
    description:
      "You receive a polished, finished product delivered digitally. Multiple formats, unlimited revisions within scope.",
  },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" className="section-padding bg-background">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label-tag mb-5"
          >
            How We Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-foreground"
          >
            Agency-level precision.
            <br />
            <span className="italic text-gradient-gold">Personal attention.</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-border" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 32 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
                  className="relative"
                >
                  {/* Number + icon */}
                  <div className="relative flex flex-col items-start mb-8">
                    <div className="w-24 h-24 rounded-full border border-border flex items-center justify-center mb-5 relative z-10 bg-background">
                      <Icon size={28} className="text-gold/60" />
                    </div>
                    <span
                      className="font-display text-7xl font-light leading-none absolute -top-4 -left-2 select-none pointer-events-none"
                      style={{ color: "hsl(0 0% 8%)" }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-4">
                    {step.title}
                  </h3>
                  <div className="gold-line mb-5" />
                  <p className="text-foreground/50 text-sm leading-relaxed font-body">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
