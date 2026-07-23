import { useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Clock, Sparkles } from "lucide-react";
import PackageBuilder from "./PackageBuilder";

const CustomPackageSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section id="custom-package" className="py-20 md:py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto text-center border border-gold/20 bg-surface/40 p-10 md:p-16 overflow-hidden"
        >
          <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, hsl(43 74% 49% / 0.12), transparent 60%)",
            }}
          />

          <p className="label-tag mb-4 relative">Build Your Own</p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-foreground mb-4 relative">
            Not sure which package fits?
            <br />
            <span className="italic text-gradient-gold">Build your own.</span>
          </h2>
          <p className="text-foreground/60 text-sm md:text-base font-body max-w-xl mx-auto mb-8 relative">
            Tell us about your celebration in a few quick steps. We'll craft a package tailored to
            your events, team, and vision — with an instant price estimate.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs font-body text-foreground/50 mb-10 relative">
            <span className="inline-flex items-center gap-2"><Clock size={14} className="text-gold/70" /> Takes 2 minutes</span>
            <span className="inline-flex items-center gap-2"><Sparkles size={14} className="text-gold/70" /> Instant estimate</span>
            <span className="inline-flex items-center gap-2"><Wand2 size={14} className="text-gold/70" /> Fully customizable</span>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="btn-gold rounded-none inline-flex items-center gap-3 relative"
          >
            <Wand2 size={14} /> Create Your Custom Package
          </button>
        </motion.div>
      </div>

      <PackageBuilder open={open} onOpenChange={setOpen} />
    </section>
  );
};

export default CustomPackageSection;