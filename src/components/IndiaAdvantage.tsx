import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "@/lib/rr-shim";

const bullets = [
  "Cost advantage without quality compromise",
  "Cultural fluency with Indian investors",
  "24/7 productivity with time zone leverage",
];

const IndiaAdvantage = () => {
  return (
    <section id="india-advantage" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Bridge Between Markets
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: Visual grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="rounded-xl gradient-navy aspect-square flex items-center justify-center p-6">
              <p className="text-primary-foreground font-display text-2xl font-bold text-center">
                India → Dubai
              </p>
            </div>
            <div className="rounded-xl bg-accent/10 aspect-square flex items-center justify-center p-6">
              <p className="text-accent font-display text-xl font-bold text-center">
                60%+ Cost Savings
              </p>
            </div>
            <div className="rounded-xl bg-accent/10 aspect-square flex items-center justify-center p-6 col-span-2">
              <p className="text-foreground font-display text-xl font-bold text-center">
                Enterprise Quality • Startup Agility
              </p>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Indian expertise. Dubai focus.{" "}
              <span className="text-gradient-gold">Global results.</span>
            </h3>
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              We combine Indian cost-efficiency with Dubai market expertise. You
              get enterprise-level marketing at a fraction of the cost — plus
              deep understanding of the Indian investor psyche, the largest
              foreign buyer segment in Dubai real estate.
            </p>
            <ul className="space-y-4 mb-8">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 text-foreground font-body"
                >
                  <span className="w-6 h-6 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-gold-foreground" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link
              to="/services"
              className="inline-block border-2 border-accent text-accent px-6 py-3 rounded-md font-semibold text-sm tracking-wide hover:bg-accent hover:text-accent-foreground transition-colors font-body"
            >
              Discover Our Edge
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IndiaAdvantage;
