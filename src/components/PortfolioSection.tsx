import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Instagram, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

type Category = "All" | "Weddings" | "Pre-Wedding";

interface Work {
  /** Instagram reel/post ID — the part after /reel/ or /p/ in the URL */
  reelId: string;
  title: string;
  category: Exclude<Category, "All">;
  location: string;
  /**
   * Self-hosted video file that plays inline on the site (no Instagram UI).
   * Drop the .mp4 into `public/reels/` and reference it as `/reels/<file>.mp4`.
   */
  videoSrc?: string;
}

// To swap a video: open the reel on Instagram, copy the ID from the URL
// e.g. https://www.instagram.com/reel/ABC123xyz/  →  reelId: "ABC123xyz"
const works: Work[] = [
  { reelId: "DTuEYQTkRcG", title: "A Timeless Vow", category: "Weddings", location: "Udaipur" },
  { reelId: "Darw1Khs1DC", title: "Sangeet Nights", category: "Weddings", location: "Jaipur" },
  { reelId: "DaFZQ9oMleW", title: "Sacred Rituals", category: "Weddings", location: "Kolkata" },
  { reelId: "DRUT0V-EbuK", title: "Baraat Highlights", category: "Weddings", location: "Delhi" },
  { reelId: "DUCicWokcP5", title: "Golden Hour Story", category: "Pre-Wedding", location: "Goa" },
  { reelId: "DVQUO29ESI2", title: "Coastal Romance", category: "Pre-Wedding", location: "Pondicherry" },
  { reelId: "DT2SI1WEY1a", title: "Desert Dreams", category: "Pre-Wedding", location: "Jaisalmer" },
  { reelId: "DUk7TQrkT7e", title: "City of Lakes", category: "Pre-Wedding", location: "Udaipur" },
];

const categories: Category[] = ["All", "Weddings", "Pre-Wedding"];

const embedUrl = (id: string) => `https://www.instagram.com/reel/${id}/embed`;

/** One tile: plays the self-hosted video inline, or falls back to a cropped IG embed. */
const WorkCard = ({ work }: { work: Work }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const useVideo = Boolean(work.videoSrc) && !failed;

  return (
    <>
      {useVideo ? (
        <video
          ref={videoRef}
          src={work.videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
        />
      ) : (
        <iframe
          src={embedUrl(work.reelId)}
          title={work.title}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          scrolling="no"
          className="absolute left-0 top-0 w-full border-0"
          style={{
            height: "1200px",
            transformOrigin: "top center",
            transform: "scale(1.6) translateY(-58px)",
          }}
        />
      )}

      <a
        href={`https://www.instagram.com/reel/${work.reelId}/`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${work.title} on Instagram`}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-charcoal/70 backdrop-blur-sm border border-gold/30 flex items-center justify-center text-gold-light hover:text-gold hover:border-gold transition-colors"
      >
        <Instagram size={16} />
      </a>
    </>
  );
};

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<Category>("All");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const filtered = active === "All" ? works : works.filter((w) => w.category === active);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  useEffect(() => {
    if (paused) return;
    const el = scrollerRef.current;
    if (!el) return;
    const id = setInterval(() => {
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const card = el.querySelector<HTMLElement>("[data-card]");
        const step = card ? card.offsetWidth + 20 : 320;
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3500);
    return () => clearInterval(id);
  }, [paused, active, filtered.length]);


  return (
    <section id="portfolio" className="section-padding bg-background">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="label-tag mb-4"
            >
              Our Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl font-light text-foreground"
            >
              Straight from
              <br />
              <span className="italic text-gradient-gold">our lens.</span>
            </motion.h2>
          </div>
          <motion.a
            href="https://www.instagram.com/clickvision.in/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="btn-outline-gold rounded-none self-start md:self-auto whitespace-nowrap inline-flex items-center gap-2"
          >
            <Instagram size={14} />
            See all on Instagram
          </motion.a>
        </div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 md:gap-3 mb-10 border-b border-border pb-6"
        >
          {categories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 md:px-5 py-2 text-xs font-sans-alt tracking-[0.15em] uppercase transition-all border ${
                  isActive
                    ? "bg-gold text-gold-foreground border-gold"
                    : "bg-transparent text-foreground/60 border-border hover:border-gold/60 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Single-row auto-sliding carousel */}
        <div
          className="relative -mx-4 lg:-mx-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            ref={scrollerRef}
            layout
            className="px-4 lg:px-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
          >
            <div className="flex gap-4 md:gap-5 pb-2">
              <AnimatePresence mode="popLayout">
                {filtered.map((work, i) => (
                  <motion.div
                    key={work.reelId}
                    data-card
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.5, delay: 0.04 * i }}
                    className="group relative overflow-hidden rounded-2xl bg-charcoal border border-border hover:border-gold/40 transition-colors shrink-0 snap-start w-[75vw] sm:w-[45vw] md:w-[300px] lg:w-[320px] aspect-[9/16] text-left"
                  >
                    {/* Live video, cropped so no Instagram chrome is visible */}
                    <iframe
                      src={embedUrl(work.reelId)}
                      title={work.title}
                      loading="lazy"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      scrolling="no"
                      className="absolute left-0 top-0 w-full border-0 pointer-events-auto"
                      style={{
                        height: "1200px",
                        transformOrigin: "top center",
                        transform: "scale(1.55) translateY(-58px)",
                      }}
                    />

                    {/* Instagram link */}
                    <a
                      href={`https://www.instagram.com/reel/${work.reelId}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${work.title} on Instagram`}
                      className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-charcoal/70 backdrop-blur-sm border border-gold/30 flex items-center justify-center text-gold-light hover:text-gold hover:border-gold transition-colors"
                    >
                      <Instagram size={16} />
                    </a>
                  </motion.div>
                ))}

              </AnimatePresence>
            </div>
          </motion.div>

          {/* Subtle arrows */}
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollByCard(-1)}
            className="hidden md:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-background/40 backdrop-blur-sm border border-border/60 text-foreground/70 hover:text-gold hover:border-gold/50 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollByCard(1)}
            className="hidden md:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-background/40 backdrop-blur-sm border border-border/60 text-foreground/70 hover:text-gold hover:border-gold/50 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>



        {filtered.length === 0 && (
          <p className="text-center text-foreground/50 py-16 font-body">
            More {active.toLowerCase()} work coming soon.
          </p>
        )}

        {/* Instagram CTA footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-14 text-center"
        >
          <a
            href="https://www.instagram.com/clickvision.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold-light hover:text-gold transition-colors font-sans-alt text-sm tracking-[0.15em] uppercase group"
          >
            View the full archive on Instagram
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>

    </section>
  );
};

export default PortfolioSection;
