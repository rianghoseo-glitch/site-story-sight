import { motion } from "framer-motion";
import { Link } from "@/lib/rr-shim";
import { Rocket, Diamond, Building2 } from "lucide-react";

const tiers = [
  {
    icon: Rocket,
    name: "LEAD SCALE",
    target: "For volume agents & off-plan projects",
    features: ["AI ad campaigns", "Geo-targeting", "Weekly content"],
    priceAED: "AED 9,000 – 13,000/month",
    priceUSD: "USD $2,500 – $3,500",
    featured: false,
  },
  {
    icon: Diamond,
    name: "PREMIUM ACCELERATOR",
    target: "For luxury & portfolio agents",
    features: ["Cinematic video", "Influencer campaigns", "AI chatbot"],
    priceAED: "AED 18,000 – 26,000/month",
    priceUSD: "USD $5,000 – $7,000",
    featured: true,
  },
  {
    icon: Building2,
    name: "FULL-STACK PARTNER",
    target: "For developers & major brokerages",
    features: ["Fractional CMO", "CRM integration", "Predictive analytics"],
    priceAED: "AED 37,000 – 55,000/month",
    priceUSD: "USD $10,000 – $15,000",
    featured: false,
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Solutions Built for Results
          </h2>
          <p className="text-muted-foreground text-lg font-body">
            Partnership tiers designed for your growth stage
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`rounded-xl p-8 flex flex-col ${
                tier.featured
                  ? "border-2 border-accent bg-background shadow-xl relative"
                  : "border border-border bg-background shadow-sm"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-gold text-gold-foreground text-xs font-bold tracking-wider">
                  MOST POPULAR
                </div>
              )}
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5">
                <tier.icon size={24} className="text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground tracking-wider mb-2 font-body">
                {tier.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-5 font-body">
                {tier.target}
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-foreground font-body"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mb-6">
                <p className="text-lg font-bold text-foreground font-body">
                  {tier.priceAED}
                </p>
                <p className="text-sm text-muted-foreground font-body">
                  {tier.priceUSD}
                </p>
              </div>
              <Link
                to="/services"
                className={`block text-center py-3 rounded-md font-semibold text-sm tracking-wide transition-all font-body ${
                  tier.featured
                    ? "gradient-gold text-gold-foreground hover:opacity-90"
                    : "border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                Learn More
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
