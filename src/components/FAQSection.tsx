import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const faqs = [
  {
    q: "How do I book?",
    a: "Booking is simple — send us a message via the contact form or WhatsApp with your date, venue, and shoot type. We'll share availability and packages within 24 hours, and confirm the booking with a signed agreement plus a small retainer.",
  },
  {
    q: "How much advance?",
    a: "We collect a 30% retainer at the time of booking to reserve your date. The next 40% is due one week before the shoot, and the remaining 30% on delivery of the final edited files.",
  },
  {
    q: "Delivery time?",
    a: "Photos are delivered within 3–4 weeks of the shoot; cinematic wedding films take 6–8 weeks. Highlight reels are ready faster — usually within 10 days. Rush delivery is available on request for an additional fee.",
  },
  {
    q: "Drone available?",
    a: "Yes — DGCA-licensed drone coverage is available as an add-on for outdoor venues and destination weddings. This includes aerial stills and 4K cinematic drone footage seamlessly cut into your film.",
  },
  {
    q: "Travel charges?",
    a: "For shoots within our home city, travel is included. For outstation and destination shoots, we invoice actual travel (flights/trains), accommodation, and local transport at cost — no markups. We plan travel transparently with you before booking.",
  },
  {
    q: "Album included?",
    a: "A premium hardbound photo album is included in our Gold and Elite packages. For Essential packages, albums are available as a paid add-on — we offer multiple sizes, cover materials, and layout options to choose from.",
  },
  {
    q: "Cancellation policy?",
    a: "The 30% retainer is non-refundable as it reserves your date. Cancellations made 30+ days before the shoot receive a full refund of any additional payments made. Cancellations inside 30 days may forfeit the second installment. Rescheduling is free once, subject to our availability.",
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="section-padding bg-surface">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label-tag mb-5"
          >
            Frequently Asked
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-light text-foreground"
          >
            Everything you
            <br />
            <span className="italic text-gradient-gold">need to know.</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-border"
              >
                <AccordionTrigger className="text-left text-foreground font-display text-xl md:text-2xl font-light hover:no-underline hover:text-gold py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/60 font-body leading-relaxed text-base pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
