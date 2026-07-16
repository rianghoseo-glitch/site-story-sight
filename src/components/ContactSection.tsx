import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  projectType: z.enum(["wedding", "corporate", "commercial", "other"], {
    errorMap: () => ({ message: "Please select a project type" }),
  }),
  budget: z.enum(["50k-1l", "1l-3l", "3l-plus", "custom"], {
    errorMap: () => ({ message: "Please select a budget range" }),
  }),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

type ContactForm = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof ContactForm, string>>;

const WEBHOOK_URL = "https://your-webhook-url.com/contact"; // Replace with actual webhook

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState<Partial<ContactForm>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactForm;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      setStatus("success");
      setForm({});
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field: keyof ContactForm) =>
    `w-full bg-transparent border-b ${
      errors[field] ? "border-red-500" : "border-border focus:border-gold"
    } text-foreground text-sm font-body py-3 px-0 outline-none transition-colors placeholder:text-foreground/25`;

  const selectClass = (field: keyof ContactForm) =>
    `w-full bg-transparent border-b ${
      errors[field] ? "border-red-500" : "border-border focus:border-gold"
    } text-foreground text-sm font-body py-3 px-0 outline-none transition-colors appearance-none cursor-pointer`;

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="label-tag mb-6">Ready to Begin</p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-tight mb-8">
              Ready to tell
              <br />
              <span className="italic text-gradient-gold">your story?</span>
            </h2>
            <div className="gold-line mb-8" />
            <p className="text-foreground/60 text-base font-body leading-relaxed mb-8">
              Book a discovery call to discuss your goals and see if we're the right fit. No pressure. No pitch decks. Just a conversation about your vision.
            </p>

            <ul className="space-y-4 mb-12">
              {[
                "30-minute strategy call",
                "We'll review your vision together",
                "You'll get 3–5 actionable insights",
                "Clear next steps, whatever you decide",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span className="text-foreground/60 text-sm font-body">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-8 border-t border-border space-y-4">
              <div>
                <p className="text-foreground/40 text-xs font-body mb-1">Prefer email?</p>
                <a
                  href="mailto:business.clickvision@gmail.com"
                  className="text-gold text-sm font-body hover:text-gold-light transition-colors"
                >
                  business.clickvision@gmail.com
                </a>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <div>
                  <p className="text-foreground/40 text-xs font-body mb-1">Call</p>
                  <a
                    href="tel:+917551068723"
                    className="text-gold text-sm font-body hover:text-gold-light transition-colors"
                  >
                    +91 75510 68723
                  </a>
                </div>
                <div>
                  <p className="text-foreground/40 text-xs font-body mb-1">WhatsApp</p>
                  <a
                    href="https://wa.me/917551068723"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold text-sm font-body hover:text-gold-light transition-colors"
                  >
                    +91 75510 68723
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <CheckCircle size={48} className="text-gold mb-6" />
                <h3 className="font-display text-3xl font-light text-foreground mb-4">
                  Message received.
                </h3>
                <p className="text-foreground/60 font-body text-sm leading-relaxed max-w-sm">
                  Thank you! We'll review your inquiry and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                {/* Full Name */}
                <div>
                  <label className="label-tag text-foreground/40 block mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={form.fullName || ""}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    placeholder="Your full name"
                    className={inputClass("fullName")}
                    maxLength={100}
                  />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1.5">{errors.fullName}</p>}
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="label-tag text-foreground/40 block mb-2">Email *</label>
                    <input
                      type="email"
                      value={form.email || ""}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="hello@example.com"
                      className={inputClass("email")}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="label-tag text-foreground/40 block mb-2">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      value={form.phone || ""}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                      className={inputClass("phone")}
                      maxLength={20}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>}
                  </div>
                </div>

                {/* Project Type + Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="label-tag text-foreground/40 block mb-2">Project Type *</label>
                    <select
                      value={form.projectType || ""}
                      onChange={(e) => handleChange("projectType", e.target.value)}
                      className={selectClass("projectType")}
                    >
                      <option value="" disabled className="bg-background">Select type</option>
                      <option value="wedding" className="bg-background">Wedding</option>
                      <option value="corporate" className="bg-background">Corporate Event</option>
                      <option value="commercial" className="bg-background">Commercial / Ad</option>
                      <option value="other" className="bg-background">Other</option>
                    </select>
                    {errors.projectType && <p className="text-red-400 text-xs mt-1.5">{errors.projectType}</p>}
                  </div>
                  <div>
                    <label className="label-tag text-foreground/40 block mb-2">Budget Range *</label>
                    <select
                      value={form.budget || ""}
                      onChange={(e) => handleChange("budget", e.target.value)}
                      className={selectClass("budget")}
                    >
                      <option value="" disabled className="bg-background">Select budget</option>
                      <option value="50k-1l" className="bg-background">₹50K – ₹1L</option>
                      <option value="1l-3l" className="bg-background">₹1L – ₹3L</option>
                      <option value="3l-plus" className="bg-background">₹3L+</option>
                      <option value="custom" className="bg-background">Custom / Discuss</option>
                    </select>
                    {errors.budget && <p className="text-red-400 text-xs mt-1.5">{errors.budget}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="label-tag text-foreground/40 block mb-2">Tell Us About Your Project *</label>
                  <textarea
                    rows={4}
                    value={form.message || ""}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Describe your vision, date, location, and any specific requirements..."
                    className={`${inputClass("message")} resize-none`}
                    maxLength={2000}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-gold rounded-none w-full inline-flex items-center justify-center gap-3 disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Send Inquiry
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <div className="flex items-center gap-2 mt-4 text-red-400 text-xs">
                      <AlertCircle size={14} />
                      <span>
                        Something went wrong. Email us directly at{" "}
                        <a href="mailto:business.clickvision@gmail.com" className="underline">
                          business.clickvision@gmail.com
                        </a>
                      </span>
                    </div>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
