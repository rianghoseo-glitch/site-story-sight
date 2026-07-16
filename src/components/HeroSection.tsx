import { motion } from "framer-motion";
import { Play } from "lucide-react";
import heroBg from "@/assets/portfolio-wedding-1.jpg";

const HeroSection = () => {
  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-charcoal/70" />
      <div className="absolute inset-0 cinematic-overlay" />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, hsl(28 30% 4% / 0.7) 100%)",
        }}
      />

      {/* Letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-charcoal" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-charcoal" />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="label-tag mb-8"
        >
          Click Vision — Premium Video Production
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-foreground leading-none mb-6 tracking-tight"
        >
          We tell stories
          <br />
          <span className="text-gradient-gold italic font-script text-7xl md:text-8xl lg:text-9xl">
            that matter.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-foreground/70 text-base md:text-lg max-w-2xl mx-auto mb-12 font-body leading-relaxed"
        >
          Premium video production for weddings, brands, and private events.
          <br className="hidden md:block" />
          Based in India, obsessed with excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => handleScroll("#portfolio")}
            className="btn-gold rounded-none inline-flex items-center gap-3"
          >
            <Play size={14} fill="currentColor" />
            View Our Work
          </button>
          <button
            onClick={() => handleScroll("#contact")}
            className="btn-outline-gold rounded-none"
          >
            Book a Consultation
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex items-center justify-center gap-12 mt-20"
        >
          {[
            { num: "150+", label: "Weddings Shot" },
            { num: "8+", label: "Years of Craft" },
            { num: "50+", label: "Brand Clients" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl md:text-4xl text-gradient-gold font-light">
                {stat.num}
              </p>
              <p className="label-tag mt-1 text-foreground/40">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold/50 to-gold/10" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
