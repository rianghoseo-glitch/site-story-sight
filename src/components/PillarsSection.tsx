import { motion } from "framer-motion";
import { Brain, Video, Globe } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    title: "AI-Powered Lead Gen",
    description:
      "Smart campaigns that predict buyer intent and reduce cost per lead by up to 40%.",
  },
  {
    icon: Video,
    title: "Cinematic Storytelling",
    description:
      "Premium video content that makes properties unforgettable and increases inquiries by 403%.",
  },
  {
    icon: Globe,
    title: "Geo-Targeting Mastery",
    description:
      "Hyper-personalized campaigns for Indian, UK, and GCC investors — the largest buyer segments.",
  },
];

const PillarsSection = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Growth Partner for 2026
          </h2>
          <p className="text-muted-foreground text-lg font-body">
            Three pillars that drive measurable results
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-background rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-lg gradient-gold flex items-center justify-center mx-auto mb-6">
                <pillar.icon size={28} className="text-gold-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
