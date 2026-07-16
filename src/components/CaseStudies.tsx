import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const caseStudies = [
  {
    client: "Luxury Villa Portfolio",
    result: "40% increase in qualified inquiries",
    metric: "12 premium leads/month average",
  },
  {
    client: "Downtown Dubai Developer",
    result: "120 leads in first 30 days",
    metric: "AED 8.2M in attributed sales",
  },
  {
    client: "NRI-Focused Brokerage",
    result: "15 closed deals in 60 days",
    metric: "All buyers from India/UK",
  },
];

const CaseStudies = () => {
  return (
    <section id="case-studies" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real Results for Real Partners
          </h2>
          <p className="text-muted-foreground text-lg font-body">
            Data that speaks for itself
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.client}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="border border-border rounded-xl p-8 hover:border-accent transition-colors group"
            >
              <p className="text-sm text-muted-foreground font-body uppercase tracking-wider mb-3">
                {cs.client}
              </p>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {cs.result}
              </h3>
              <p className="text-accent font-semibold font-body mb-6">
                {cs.metric}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-electric group-hover:gap-2 transition-all font-body cursor-pointer">
                View Case Study <ArrowRight size={14} />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
