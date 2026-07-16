import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    category: "Market Trends",
    title: "Why Indian Investors Are Flocking to Dubai in 2026",
    date: "March 2026",
  },
  {
    category: "Marketing Tech",
    title: "The AI Tools That Cut Our Clients' Ad Spend by 40%",
    date: "February 2026",
  },
  {
    category: "Luxury",
    title: "Luxury Marketing: 3 Trends Dominating 2026",
    date: "January 2026",
  },
];

const InsightsSection = () => {
  return (
    <section id="insights" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest Insights
          </h2>
          <p className="text-muted-foreground text-lg font-body">
            Thought leadership from the INNVISION team
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="h-48 gradient-navy flex items-center justify-center">
                <p className="text-primary-foreground/40 font-display text-lg">
                  {post.category}
                </p>
              </div>
              <div className="p-6">
                <span className="text-xs text-accent font-semibold uppercase tracking-wider font-body">
                  {post.category}
                </span>
                <h3 className="text-lg font-bold text-foreground mt-2 mb-3 leading-snug">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-body">
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-electric group-hover:gap-2 transition-all font-body">
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
