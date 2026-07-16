import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const packages = [
  {
    tier: "Essential",
    tag: "Weddings & Events",
    price: "₹80K",
    suffix: "onwards",
    description: "Perfect for intimate ceremonies and smaller corporate events.",
    features: [
      "Up to 8 hours of coverage",
      "2-person crew",
      "3–5 minute highlight film",
      "Full ceremony edit",
      "Digital delivery",
      "1 round of revisions",
    ],
    cta: "Request Quote",
    featured: false,
  },
  {
    tier: "Premium",
    tag: "Most Popular",
    price: "₹1.5L",
    suffix: "onwards",
    description: "Comprehensive coverage with cinematic storytelling and aerial footage.",
    features: [
      "Up to 12 hours of coverage",
      "4-person crew + drone",
      "8–12 minute cinematic film",
      "Same-day highlight reel",
      "Pre-wedding shoot included",
      "3 rounds of revisions",
    ],
    cta: "Request Quote",
    featured: true,
  },
  {
    tier: "Elite",
    tag: "Corporate & Commercial",
    price: "Custom",
    suffix: "quote",
    description: "Full-scale production for brands, commercials, and premium experiences.",
    features: [
      "Multi-day production",
      "Full production crew",
      "Scripting & storyboarding",
      "Professional color grade",
      "Licensed music composition",
      "Unlimited revisions",
    ],
    cta: "Let's Talk",
    featured: false,
  },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding" style={{ backgroundColor: "#050505" }}>
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label-tag mb-5"
          >
            Investment
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-light text-foreground mb-4"
          >
            Transparent pricing.
            <br />
            <span className="italic text-gradient-gold">Exceptional value.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-foreground/50 text-sm font-body max-w-md mx-auto"
          >
            Every project is unique. These are starting points — we'll tailor a package to your specific needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.tier}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
              className={`relative p-10 flex flex-col ${
                pkg.featured
                  ? "bg-surface border border-gold/30"
                  : "bg-background border border-border"
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              )}

              <p className="label-tag text-foreground/40 mb-3">{pkg.tag}</p>
              <h3 className={`font-display text-3xl font-light mb-2 ${pkg.featured ? "text-gradient-gold" : "text-foreground"}`}>
                {pkg.tier}
              </h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display text-5xl font-light text-foreground">{pkg.price}</span>
                <span className="text-foreground/40 text-sm font-body">{pkg.suffix}</span>
              </div>
              <div className="gold-line mb-6" />
              <p className="text-foreground/50 text-sm font-body mb-8 leading-relaxed flex-shrink-0">
                {pkg.description}
              </p>

              <ul className="space-y-3 mb-10 flex-1">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={14} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/60 text-sm font-body">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleContact}
                className={pkg.featured ? "btn-gold rounded-none" : "btn-outline-gold rounded-none"}
              >
                {pkg.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
