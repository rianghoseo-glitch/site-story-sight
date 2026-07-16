import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Sparkles, Flower2, Gift, CalendarHeart, ArrowUpRight } from "lucide-react";

const addOns = [
  {
    icon: Sparkles,
    title: "Makeup Artists",
    blurb: "Bridal & editorial glam by trusted pros.",
    slug: "makeup-artists",
  },
  {
    icon: Flower2,
    title: "Mehendi",
    blurb: "Traditional & contemporary henna artistry.",
    slug: "mehendi",
  },
  {
    icon: Gift,
    title: "Custom Wedding Merchandise",
    blurb: "Bespoke keepsakes for pre-wedding & wedding.",
    slug: "custom-merchandise",
  },
  {
    icon: CalendarHeart,
    title: "Event Planning",
    blurb: "End-to-end planning & on-day coordination.",
    slug: "event-planning",
  },
];

const AddOnServices = () => {
  return (
    <section id="add-ons" className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="label-tag mb-3">Also Available</p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-foreground">
            Add-on <span className="italic text-gradient-gold">Services</span>
          </h2>
          <p className="text-foreground/50 text-sm mt-3 max-w-lg mx-auto font-body">
            Complementary services to complete your celebration.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border max-w-5xl mx-auto">
          {addOns.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to="/add-ons/$slug"
                  params={{ slug: item.slug }}
                  className="group block bg-surface p-6 md:p-8 h-full hover:bg-surface-raised transition-colors duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold/60 transition-colors">
                      <Icon size={16} className="text-gold/70 group-hover:text-gold transition-colors" />
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-foreground/30 group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                  <h3 className="font-display text-lg md:text-xl text-foreground mb-2 group-hover:text-gradient-gold transition-all">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-foreground/50 font-body leading-relaxed">
                    {item.blurb}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AddOnServices;
