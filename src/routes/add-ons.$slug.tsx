import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Sparkles, Flower2, Gift, CalendarHeart, ArrowLeft, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const details = {
  "makeup-artists": {
    icon: Sparkles,
    title: "Makeup Artists",
    tagline: "Bridal, editorial & occasion glam.",
    description:
      "We collaborate with a curated network of senior makeup artists specialising in bridal, HD, and editorial looks. Whether you want a classic bridal glow, a contemporary matte finish, or a soft natural look for pre-wedding shoots, we match you with the right artist for your skin, style, and setting.",
    highlights: [
      "Bridal & reception looks",
      "Pre-wedding & engagement glam",
      "HD & airbrush finishes",
      "Hairstyling & drapery included on request",
      "Trials available on select packages",
    ],
  },
  mehendi: {
    icon: Flower2,
    title: "Mehendi",
    tagline: "Traditional roots. Contemporary artistry.",
    description:
      "From intricate bridal mehendi to minimal modern designs for guests, our henna partners bring craft and clean lines. Rajasthani, Arabic, Indo-Arabic, and custom motifs — with organic, skin-safe cones.",
    highlights: [
      "Bridal full-hand & feet designs",
      "Family & guest mehendi setups",
      "Organic, chemical-free cones",
      "Custom motifs & couple names",
      "On-location artists across cities",
    ],
  },
  "custom-merchandise": {
    icon: Gift,
    title: "Custom Wedding Merchandise",
    tagline: "Keepsakes that feel personal.",
    description:
      "Bespoke merchandise for pre-wedding and wedding celebrations — hampers, invites, hoodies, robes, welcome kits, and guest favours. Designed to match your event's mood board so every touchpoint feels intentional.",
    highlights: [
      "Custom invites & save-the-dates",
      "Bridesmaid & groomsmen robes / hoodies",
      "Welcome hampers for out-of-town guests",
      "Personalised favours & thank-you gifts",
      "Design, print & delivery handled end-to-end",
    ],
  },
  "event-planning": {
    icon: CalendarHeart,
    title: "Event Planning",
    tagline: "Calm on the day. Detail behind the scenes.",
    description:
      "Full-service planning and on-day coordination for weddings and private events. Venue scouting, vendor management, timelines, and logistics — so you can be present with your people.",
    highlights: [
      "Venue scouting & site visits",
      "Vendor sourcing & negotiation",
      "Production timelines & run-of-show",
      "On-day coordination team",
      "Guest management & travel logistics",
    ],
  },
} as const;

type Slug = keyof typeof details;

export const Route = createFileRoute("/add-ons/$slug")({
  loader: ({ params }) => {
    if (!(params.slug in details)) throw notFound();
    return { slug: params.slug as Slug };
  },
  head: ({ loaderData }: { loaderData?: { slug: Slug } }) => {
    const d = loaderData ? details[loaderData.slug] : null;
    const title = d ? `${d.title} — Click Vision` : "Add-on Service — Click Vision";
    const description = d?.tagline ?? "Add-on services by Click Vision.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: AddOnDetail,
});

function AddOnDetail() {
  const { slug } = Route.useLoaderData() as { slug: Slug };
  const d = details[slug];
  const Icon = d.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <Link
            to="/"
            hash="add-ons"
            className="inline-flex items-center gap-2 text-xs font-sans-alt tracking-widest uppercase text-foreground/50 hover:text-gold transition-colors mb-10"
          >
            <ArrowLeft size={14} /> Back
          </Link>

          <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center mb-8">
            <Icon size={22} className="text-gold" />
          </div>

          <p className="label-tag mb-4">Add-on Service</p>
          <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
            {d.title}
          </h1>
          <p className="text-lg text-foreground/60 font-body italic mb-8">{d.tagline}</p>
          <div className="gold-line mb-8" style={{ width: 48 }} />
          <p className="text-foreground/70 font-body leading-relaxed mb-10">
            {d.description}
          </p>

          <h2 className="font-display text-2xl text-foreground mb-5">What's included</h2>
          <ul className="space-y-3 mb-12">
            {d.highlights.map((h: string) => (
              <li key={h} className="flex items-start gap-3 text-foreground/70 font-body">
                <Check size={16} className="text-gold mt-1 flex-shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-border pt-8">
            <p className="text-sm text-foreground/50 font-body mb-4">
              Interested in bundling this with your shoot?
            </p>
            <Link
              to="/"
              hash="contact"
              className="btn-gold rounded-none inline-block"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
