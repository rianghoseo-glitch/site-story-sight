import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  Trash2,
  Sparkles,
  Download,
  MessageCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EventFunction = {
  id: string;
  event: string;
  date: string;
  time: string;
  location: string;
  duration: string;
};

type FormState = {
  eventTypes: string[];
  days: string;
  clientName: string;
  phone: string;
  email: string;
  whatsapp: string;
  brideName: string;
  groomName: string;
  culture: string;
  culturalNote: string;
  functions: EventFunction[];
  photographers: string;
  photoStyles: string[];
  cinematographers: string;
  videoStyles: string[];
  drone: string;
  addons: string[];
  album: string;
  digital: string[];
  films: string[];
  city: string;
  state: string;
  venue: string;
  coverageType: string;
  travel: string;
  accommodation: string;
  priorities: string[];
  budget: string;
};

const EVENT_TYPES = [
  "Wedding",
  "Pre-Wedding Shoot",
  "Post-Wedding Shoot",
  "Engagement",
  "Reception",
  "Haldi",
  "Mehendi",
  "Sangeet",
  "Birthday",
  "Anniversary",
  "Baby Shower",
  "Corporate Event",
  "Other",
];

const CULTURES = [
  "Bengali",
  "Bihari",
  "Marwari",
  "Punjabi",
  "Rajasthani",
  "South Indian",
  "Muslim Wedding",
  "Christian Wedding",
  "Hindu Wedding",
  "Other",
];

const PHOTO_STYLES = [
  "Candid Photography",
  "Traditional Photography",
  "Couple Portraits",
  "Family Photography",
  "Guest Photography",
  "Detail Photography",
  "Documentary / Storytelling",
];

const VIDEO_STYLES = [
  "Cinematic Wedding Film",
  "Traditional Full Event Video",
  "Highlight Film",
  "Social Media Reels",
  "Documentary Style",
  "Short Teaser",
];

const ADDONS = [
  { label: "Drone Coverage", cost: 15000 },
  { label: "Same-Day Edit", cost: 20000 },
  { label: "Live Streaming", cost: 18000 },
  { label: "LED Screen / Live Projection", cost: 25000 },
  { label: "Extra Reels", cost: 8000 },
  { label: "Social Media Reels", cost: 10000 },
  { label: "Wedding Teaser", cost: 7000 },
  { label: "Save the Date Video", cost: 9000 },
  { label: "Couple Interview", cost: 6000 },
  { label: "Guest Interviews", cost: 5000 },
  { label: "Behind-the-Scenes Content", cost: 5000 },
  { label: "360° Video Booth", cost: 22000 },
];

const ALBUM_OPTIONS = [
  { label: "No Album", cost: 0 },
  { label: "Standard Album", cost: 12000 },
  { label: "Premium Album", cost: 22000 },
  { label: "Luxury Album", cost: 40000 },
];

const DIGITAL_DELIVERABLES = [
  "Online Gallery",
  "Premium Pen Drive",
  "Cloud Delivery",
  "AI Face Search Gallery",
];

const FILM_OPTIONS = [
  "3–5 Minute Highlight Film",
  "8–15 Minute Cinematic Film",
  "Full Wedding Film",
  "Full Ceremony Video",
];

const PRIORITIES = [
  "Maximum Candid Photos",
  "Cinematic Video",
  "Fast Delivery",
  "More Reels",
  "Drone Coverage",
  "Premium Album",
  "Complete Event Coverage",
  "Budget-Friendly Package",
];

const BUDGETS = [
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,00,000",
  "₹2,00,000 – ₹3,00,000",
  "₹3,00,000 – ₹5,00,000",
  "₹5,00,000+",
  "Prefer not to say",
];

const initialState: FormState = {
  eventTypes: [],
  days: "1 Day",
  clientName: "",
  phone: "",
  email: "",
  whatsapp: "",
  brideName: "",
  groomName: "",
  culture: "",
  culturalNote: "",
  functions: [
    { id: crypto.randomUUID(), event: "", date: "", time: "", location: "", duration: "" },
  ],
  photographers: "1 Photographer",
  photoStyles: [],
  cinematographers: "1 Cinematographer",
  videoStyles: [],
  drone: "No Drone",
  addons: [],
  album: "No Album",
  digital: [],
  films: [],
  city: "",
  state: "",
  venue: "",
  coverageType: "Single Venue",
  travel: "No",
  accommodation: "No",
  priorities: [],
  budget: "",
};

const STEP_TITLES = [
  "Event Details",
  "Your Celebration",
  "Events & Functions",
  "Photography Team",
  "Videography Team",
  "Add-On Services",
  "Albums & Deliverables",
  "Location Details",
  "Priorities & Budget",
  "Your Estimate",
];

function toggleInArray(arr: string[], value: string) {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

function calcEstimate(form: FormState) {
  const daysMap: Record<string, number> = {
    "1 Day": 1,
    "2 Days": 2,
    "3 Days": 3,
    "4 Days": 4,
    "5+ Days": 5,
  };
  const days = daysMap[form.days] ?? 1;
  const photogs = parseInt(form.photographers) || 1;
  const cinemas = parseInt(form.cinematographers) || 1;
  const drone = form.drone === "Yes, Drone Required" ? 1 : 0;

  // Pricing: ₹7,000 per photographer / videographer / drone, per day, × 2.
  const perDay = (photogs + cinemas + drone) * 7000;
  const total = perDay * days * 2;
  return { total };
}

function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

const PackageBuilder = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);

  const estimate = useMemo(() => calcEstimate(form), [form]);

  const phoneValid = /^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").replace(/^91/, ""));
  const emailValid = form.email.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim());

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const addFunction = () =>
    update("functions", [
      ...form.functions,
      { id: crypto.randomUUID(), event: "", date: "", time: "", location: "", duration: "" },
    ]);

  const removeFunction = (id: string) =>
    update("functions", form.functions.filter((f) => f.id !== id));

  const updateFunction = (id: string, patch: Partial<EventFunction>) =>
    update(
      "functions",
      form.functions.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    );

  const togglePriority = (p: string) => {
    const has = form.priorities.includes(p);
    if (has) update("priorities", form.priorities.filter((x) => x !== p));
    else if (form.priorities.length < 3) update("priorities", [...form.priorities, p]);
  };

  const reset = () => {
    setForm(initialState);
    setStep(0);
  };

  const goToContact = () => {
    onOpenChange(false);
    setTimeout(() => {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    }, 250);
  };

  const downloadSummary = () => {
    const lines = [
      "CLICKVISION — CUSTOM PACKAGE ESTIMATE",
      "======================================",
      "",
      `Client: ${form.clientName}`,
      `Phone: ${form.phone}   WhatsApp: ${form.whatsapp}`,
      `Email: ${form.email}`,
      "",
      `Event Type: ${form.eventTypes.join(", ") || "-"}`,
      `Duration: ${form.days}`,
      `Bride / Groom: ${form.brideName || "-"} & ${form.groomName || "-"}`,
      `Culture: ${form.culture || "-"}`,
      form.culturalNote ? `Notes: ${form.culturalNote}` : "",
      "",
      "FUNCTIONS:",
      ...form.functions.map(
        (f, i) =>
          `  ${i + 1}. ${f.event || "-"} | ${f.date || "-"} | ${f.time || "-"} | ${f.location || "-"} | ${f.duration || "-"}`,
      ),
      "",
      `Photographers: ${form.photographers}`,
      `Photo Styles: ${form.photoStyles.join(", ") || "-"}`,
      `Cinematographers: ${form.cinematographers}`,
      `Video Styles: ${form.videoStyles.join(", ") || "-"}`,
      `Drone: ${form.drone}`,
      "",
      `Add-ons: ${form.addons.join(", ") || "-"}`,
      `Album: ${form.album}`,
      `Digital: ${form.digital.join(", ") || "-"}`,
      `Films: ${form.films.join(", ") || "-"}`,
      "",
      `Location: ${form.venue}, ${form.city}, ${form.state}`,
      `Coverage Type: ${form.coverageType}`,
      `Travel: ${form.travel}   Accommodation: ${form.accommodation}`,
      "",
      `Priorities: ${form.priorities.join(", ") || "-"}`,
      `Budget: ${form.budget || "-"}`,
      "",
      `ESTIMATED INVESTMENT: ${formatINR(estimate.total)}`,
      "",
      "* Approximate estimate. Final pricing may vary based on dates, locations,",
      "  travel, accommodation and final requirements.",
    ].filter(Boolean);
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clickvision-package-summary.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const canProceed = () => {
    if (step === 0) return form.eventTypes.length > 0;
    if (step === 1) return !!form.clientName.trim() && phoneValid && emailValid;
    return true;
  };

  const totalSteps = STEP_TITLES.length;

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) reset(); }}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background border-gold/20">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl md:text-3xl font-light text-foreground">
            Build a package that perfectly fits your{" "}
            <span className="italic text-gradient-gold">celebration</span>.
          </DialogTitle>
          <DialogDescription className="font-body text-foreground/60">
            Tell us about your event and we'll create an estimated package for you.
          </DialogDescription>
        </DialogHeader>

        {/* Progress */}
        <div className="flex items-center gap-1 my-4">
          {STEP_TITLES.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 flex-1 transition-colors ${
                i <= step ? "bg-gold" : "bg-border"
              }`}
            />
          ))}
        </div>
        <p className="label-tag text-foreground/40 -mt-2 mb-4">
          Step {step + 1} of {totalSteps} — {STEP_TITLES[step]}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <Label className="label-tag mb-3 block">Event Type (select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {EVENT_TYPES.map((t) => {
                      const active = form.eventTypes.includes(t);
                      return (
                        <button
                          type="button"
                          key={t}
                          onClick={() => update("eventTypes", toggleInArray(form.eventTypes, t))}
                          className={`text-left text-sm font-body px-3 py-2.5 border transition-colors ${
                            active
                              ? "border-gold text-gold bg-gold/5"
                              : "border-border text-foreground/70 hover:border-gold/40"
                          }`}
                        >
                          {active && <Check size={12} className="inline mr-1.5" />}
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <Label className="label-tag mb-3 block">Coverage Duration</Label>
                  <RadioGroup value={form.days} onValueChange={(v) => update("days", v)} className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {["1 Day", "2 Days", "3 Days", "4 Days", "5+ Days"].map((d) => (
                      <label
                        key={d}
                        className={`cursor-pointer text-sm font-body px-3 py-2.5 border text-center transition-colors ${
                          form.days === d ? "border-gold text-gold bg-gold/5" : "border-border text-foreground/70 hover:border-gold/40"
                        }`}
                      >
                        <RadioGroupItem value={d} className="sr-only" />
                        {d}
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Full Name*">
                    <Input value={form.clientName} onChange={(e) => update("clientName", e.target.value)} maxLength={100} />
                  </Field>
                  <Field label="Phone Number*">
                    <Input
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      maxLength={20}
                      inputMode="tel"
                      placeholder="10-digit mobile number"
                    />
                    {form.phone.trim() !== "" && !phoneValid && (
                      <p className="text-xs text-red-400 mt-1 font-body">Enter a valid 10-digit Indian mobile number.</p>
                    )}
                  </Field>
                  <Field label="Email">
                    <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255} placeholder="you@example.com" />
                    {form.email.trim() !== "" && !emailValid && (
                      <p className="text-xs text-red-400 mt-1 font-body">Enter a valid email address.</p>
                    )}
                  </Field>
                  <Field label="WhatsApp Number">
                    <Input value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} maxLength={20} />
                  </Field>
                  <Field label="Bride / Celebrant Name">
                    <Input value={form.brideName} onChange={(e) => update("brideName", e.target.value)} maxLength={100} />
                  </Field>
                  <Field label="Groom / Partner Name">
                    <Input value={form.groomName} onChange={(e) => update("groomName", e.target.value)} maxLength={100} />
                  </Field>
                </div>
                <Field label="Cultural / Traditional Preferences (optional)">
                  <Select value={form.culture} onValueChange={(v) => update("culture", v)}>
                    <SelectTrigger><SelectValue placeholder="Select if applicable" /></SelectTrigger>
                    <SelectContent>
                      {CULTURES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Any specific traditions or rituals you want us to focus on?">
                  <Textarea value={form.culturalNote} onChange={(e) => update("culturalNote", e.target.value)} maxLength={500} rows={3} />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-foreground/60 font-body">
                  Add each function individually — Haldi, Mehendi, Wedding, Reception, etc.
                </p>
                {form.functions.map((fn, i) => (
                  <div key={fn.id} className="border border-border p-4 space-y-3 bg-surface/40">
                    <div className="flex justify-between items-center">
                      <p className="label-tag text-gold/70">Function {i + 1}</p>
                      {form.functions.length > 1 && (
                        <button type="button" onClick={() => removeFunction(fn.id)} className="text-foreground/40 hover:text-red-400 transition">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input placeholder="Event (e.g. Haldi)" value={fn.event} onChange={(e) => updateFunction(fn.id, { event: e.target.value })} maxLength={60} />
                      <Input type="date" value={fn.date} onChange={(e) => updateFunction(fn.id, { date: e.target.value })} />
                      <Select value={fn.time} onValueChange={(v) => updateFunction(fn.id, { time: v })}>
                        <SelectTrigger><SelectValue placeholder="Time of day" /></SelectTrigger>
                        <SelectContent>
                          {["Morning", "Afternoon", "Evening", "Full Day"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Select value={fn.duration} onValueChange={(v) => updateFunction(fn.id, { duration: v })}>
                        <SelectTrigger><SelectValue placeholder="Duration" /></SelectTrigger>
                        <SelectContent>
                          {["2 Hours", "4 Hours", "6 Hours", "Full Day"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Input className="md:col-span-2" placeholder="Location / Venue" value={fn.location} onChange={(e) => updateFunction(fn.id, { location: e.target.value })} maxLength={150} />
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addFunction} className="btn-outline-gold rounded-none w-full inline-flex items-center justify-center gap-2">
                  <Plus size={14} /> Add Function
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="label-tag mb-3 block">How many photographers?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {["1 Photographer", "2 Photographers", "3 Photographers", "4+ Photographers"].map((o) => (
                      <OptionPill key={o} active={form.photographers === o} onClick={() => update("photographers", o)}>{o}</OptionPill>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="label-tag mb-3 block">Photography Styles</Label>
                  <CheckGrid items={PHOTO_STYLES} selected={form.photoStyles} onToggle={(v) => update("photoStyles", toggleInArray(form.photoStyles, v))} />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <Label className="label-tag mb-3 block">How many cinematographers?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {["1 Cinematographer", "2 Cinematographers", "3 Cinematographers", "4+ Cinematographers"].map((o) => (
                      <OptionPill key={o} active={form.cinematographers === o} onClick={() => update("cinematographers", o)}>{o}</OptionPill>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="label-tag mb-3 block">Video Style</Label>
                  <CheckGrid items={VIDEO_STYLES} selected={form.videoStyles} onToggle={(v) => update("videoStyles", toggleInArray(form.videoStyles, v))} />
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <Label className="label-tag mb-3 block">Drone Coverage</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["No Drone", "Yes, Drone Required"].map((o) => (
                      <OptionPill key={o} active={form.drone === o} onClick={() => update("drone", o)}>{o}</OptionPill>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <div>
                  <Label className="label-tag mb-3 block">Wedding Album</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {ALBUM_OPTIONS.map((a) => (
                      <OptionPill key={a.label} active={form.album === a.label} onClick={() => update("album", a.label)}>{a.label}</OptionPill>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="label-tag mb-3 block">Digital Deliverables</Label>
                  <CheckGrid items={DIGITAL_DELIVERABLES} selected={form.digital} onToggle={(v) => update("digital", toggleInArray(form.digital, v))} />
                </div>
                <div>
                  <Label className="label-tag mb-3 block">Cinematic Films</Label>
                  <CheckGrid items={FILM_OPTIONS} selected={form.films} onToggle={(v) => update("films", toggleInArray(form.films, v))} />
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="City"><Input value={form.city} onChange={(e) => update("city", e.target.value)} maxLength={80} /></Field>
                  <Field label="State"><Input value={form.state} onChange={(e) => update("state", e.target.value)} maxLength={80} /></Field>
                  <Field label="Venue Name"><Input value={form.venue} onChange={(e) => update("venue", e.target.value)} maxLength={120} /></Field>
                </div>
                <div>
                  <Label className="label-tag mb-3 block">Coverage Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {["Single Venue", "Multiple Venues", "Multiple Cities"].map((o) => (
                      <OptionPill key={o} active={form.coverageType === o} onClick={() => update("coverageType", o)}>{o}</OptionPill>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="label-tag mb-2 block">Travel Required?</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["No", "Yes"].map((o) => <OptionPill key={o} active={form.travel === o} onClick={() => update("travel", o)}>{o}</OptionPill>)}
                    </div>
                  </div>
                  {form.travel === "Yes" && (
                    <div>
                      <Label className="label-tag mb-2 block">Accommodation Required?</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["No", "Yes"].map((o) => <OptionPill key={o} active={form.accommodation === o} onClick={() => update("accommodation", o)}>{o}</OptionPill>)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-6">
                <div>
                  <Label className="label-tag mb-3 block">What matters most to you? (pick up to 3)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {PRIORITIES.map((p) => {
                      const active = form.priorities.includes(p);
                      const disabled = !active && form.priorities.length >= 3;
                      return (
                        <button
                          type="button"
                          key={p}
                          disabled={disabled}
                          onClick={() => togglePriority(p)}
                          className={`text-left text-sm font-body px-3 py-2.5 border transition-colors ${
                            active
                              ? "border-gold text-gold bg-gold/5"
                              : disabled
                              ? "border-border text-foreground/30 cursor-not-allowed"
                              : "border-border text-foreground/70 hover:border-gold/40"
                          }`}
                        >
                          {active && <Check size={12} className="inline mr-1.5" />}
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <Label className="label-tag mb-3 block">Estimated Budget Range (optional)</Label>
                  <Select value={form.budget} onValueChange={(v) => update("budget", v)}>
                    <SelectTrigger><SelectValue placeholder="Select a range" /></SelectTrigger>
                    <SelectContent>
                      {BUDGETS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 9 && (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <p className="label-tag text-gold mb-2">Your Custom Package Estimate</p>
                  <h3 className="font-display text-4xl md:text-5xl font-light text-gradient-gold mb-2">
                    {formatINR(estimate.total)}
                  </h3>
                  <p className="text-xs text-foreground/40 font-body max-w-md mx-auto">
                    *This is an approximate estimate. Final pricing may vary based on dates, locations, travel, accommodation and final requirements.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-body">
                  <SummaryCard title="Event Summary" rows={[
                    ["Event", form.eventTypes.join(", ") || "-"],
                    ["Duration", form.days],
                    ["Location", [form.venue, form.city, form.state].filter(Boolean).join(", ") || "-"],
                    ["Functions", String(form.functions.filter((f) => f.event).length || form.functions.length)],
                  ]} />
                  <SummaryCard title="Your Team" rows={[
                    ["Photographers", form.photographers],
                    ["Cinematographers", form.cinematographers],
                    ["Drone", form.drone],
                    ["Album", form.album],
                  ]} />
                </div>

                {(form.addons.length > 0 || form.photoStyles.length > 0 || form.videoStyles.length > 0) && (
                  <div className="border border-border p-4 bg-surface/40">
                    <p className="label-tag text-gold/70 mb-2">Selected Services</p>
                    <div className="flex flex-wrap gap-2">
                      {[...form.photoStyles, ...form.videoStyles, ...form.addons, ...form.films].map((s) => (
                        <span key={s} className="text-xs font-body px-2 py-1 border border-gold/30 text-foreground/70">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button onClick={goToContact} className="btn-gold rounded-none inline-flex items-center justify-center gap-2 flex-1">
                    <Sparkles size={14} /> Get Final Quote
                  </button>
                  <button onClick={downloadSummary} className="btn-outline-gold rounded-none inline-flex items-center justify-center gap-2 flex-1">
                    <Download size={14} /> Download Summary
                  </button>
                  <a
                    href="https://wa.me/919999999999?text=Hi%20ClickVision%2C%20I%27d%20like%20to%20discuss%20my%20custom%20package."
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline-gold rounded-none inline-flex items-center justify-center gap-2 flex-1"
                  >
                    <MessageCircle size={14} /> Talk to ClickVision
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div className="flex items-center justify-between pt-6 mt-2 border-t border-border">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="inline-flex items-center gap-2 text-sm font-body text-foreground/60 hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ArrowLeft size={14} /> Back
          </button>
          {step < totalSteps - 1 ? (
            <button
              type="button"
              disabled={!canProceed()}
              onClick={() => setStep((s) => Math.min(totalSteps - 1, s + 1))}
              className="btn-gold rounded-none inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {step === totalSteps - 2 ? "See My Estimate" : "Next"} <ArrowRight size={14} />
            </button>
          ) : (
            <button type="button" onClick={() => { onOpenChange(false); reset(); }} className="btn-outline-gold rounded-none">
              Close
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="label-tag mb-2 block text-foreground/60">{label}</Label>
    {children}
  </div>
);

const OptionPill = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-sm font-body px-3 py-2.5 border text-center transition-colors ${
      active ? "border-gold text-gold bg-gold/5" : "border-border text-foreground/70 hover:border-gold/40"
    }`}
  >
    {children}
  </button>
);

const CheckGrid = ({ items, selected, onToggle }: { items: string[]; selected: string[]; onToggle: (v: string) => void }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
    {items.map((it) => {
      const active = selected.includes(it);
      return (
        <label
          key={it}
          className={`flex items-center gap-2 text-sm font-body px-3 py-2.5 border cursor-pointer transition-colors ${
            active ? "border-gold text-gold bg-gold/5" : "border-border text-foreground/70 hover:border-gold/40"
          }`}
        >
          <Checkbox checked={active} onCheckedChange={() => onToggle(it)} />
          {it}
        </label>
      );
    })}
  </div>
);

const SummaryCard = ({ title, rows }: { title: string; rows: [string, string][] }) => (
  <div className="border border-border p-4 bg-surface/40">
    <p className="label-tag text-gold/70 mb-3">{title}</p>
    <dl className="space-y-1.5">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-3">
          <dt className="text-foreground/50">{k}</dt>
          <dd className="text-foreground/80 text-right">{v}</dd>
        </div>
      ))}
    </dl>
  </div>
);

export default PackageBuilder;