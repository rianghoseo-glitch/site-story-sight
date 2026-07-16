import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import founderImg from "@/assets/founder-placeholder.jpg";

const FounderSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="relative aspect-[3/4] lg:aspect-auto overflow-hidden"
          >
            <img
              src={founderImg}
              alt="Sunny Basak — Founder of Click Vision"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 hidden lg:block" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="flex flex-col justify-center p-10 lg:p-16 bg-surface"
          >
            <p className="label-tag mb-6">A note from the founder</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-6">
              Hi, I'm
              <br />
              <span className="italic text-gradient-gold font-script">Sunny Basak.</span>
            </h2>
            <div className="gold-line mb-8" />
            <p className="text-foreground/60 text-base leading-relaxed font-body mb-6">
              I started Click Vision with one belief:{" "}
              <span className="text-foreground/90 italic">
                great stories come from great partnerships.
              </span>
            </p>
            <p className="text-foreground/60 text-base leading-relaxed font-body mb-6">
              I personally oversee every project to ensure a stress-free experience for our couples and clients. Whether it's a once-in-a-lifetime wedding or a mission-critical brand shoot, our team is here to handle the details so you can focus on the moment.
            </p>
            <p className="text-foreground/60 text-base leading-relaxed font-body mb-10">
              With cinema-grade equipment, a handpicked crew, and a relentless eye for detail — let's create something iconic together.
            </p>

            {/* Credentials */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border">
              {[
                { num: "150+", label: "Weddings Shot" },
                { num: "8+", label: "Years of Craft" },
                { num: "50+", label: "Brand Clients" },
                { num: "4K", label: "Cinema Cameras" },
              ].map((c) => (
                <div key={c.label}>
                  <p className="font-display text-3xl font-light text-gradient-gold">{c.num}</p>
                  <p className="label-tag text-foreground/40 mt-1">{c.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
