import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Briefcase, Film } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Wedding Cinematography",
    subtitle: "Your love story, told beautifully",
    description:
      "Emotional, cinematic storytelling for your special day. Pre-wedding films, ceremony coverage, and highlight reels you'll cherish forever. Every frame is crafted with intention.",
    items: ["Pre-Wedding Films", "Ceremony Coverage", "Reception Highlights", "Drone Aerial Shots"],
  },
  {
    icon: Briefcase,
    title: "Corporate Events",
    subtitle: "Professional. Polished. Powerful.",
    description:
      "Sophisticated coverage for conferences, product launches, annual galas, and brand documentaries. We make your organization look world-class.",
    items: ["Product Launches", "Annual Galas", "Brand Documentaries", "Executive Interviews"],
  },
  {
    icon: Film,
    title: "Private Events",
    subtitle: "Intimate moments, elevated",
    description:
      "Discreet, elegant coverage for birthdays, anniversaries, private soirées, and milestone celebrations. Cinematic memories crafted for the moments that matter most.",
    items: ["Birthdays & Anniversaries", "Private Soirées", "Milestone Celebrations", "Family Portraits"],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label-tag mb-5"
          >
            What We Create
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-tight"
          >
            Three disciplines.
            <br />
            <span className="italic text-gradient-gold">One obsession.</span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                className="group bg-surface p-10 lg:p-12 hover:bg-surface-raised transition-all duration-500 cursor-default"
              >
                <div className="mb-8">
                  <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold/60 group-hover:bg-gold/5 transition-all duration-300 mb-6">
                    <Icon size={20} className="text-gold/70 group-hover:text-gold transition-colors" />
                  </div>
                  <p className="label-tag text-foreground/30 mb-3">{service.subtitle}</p>
                  <h3 className="font-display text-3xl md:text-4xl font-light text-foreground mb-5 group-hover:text-gradient-gold transition-all duration-300">
                    {service.title}
                  </h3>
                  <div className="gold-line mb-6 group-hover:w-16 transition-all duration-500" style={{ width: '48px' }} />
                  <p className="text-foreground/50 text-sm leading-relaxed font-body">
                    {service.description}
                  </p>
                </div>
                <ul className="space-y-2.5">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-xs font-sans-alt text-foreground/40 group-hover:text-foreground/60 transition-colors">
                      <span className="w-4 h-px bg-gold/40 group-hover:bg-gold/70 transition-colors flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
