import { useState, useEffect } from "react";
import { Link, useLocation } from "@/lib/rr-shim";
import { Menu, X } from "lucide-react";
import logo from "@/assets/clickvision-logo.png";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-charcoal/40 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Click Vision"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-xs font-sans-alt font-medium tracking-widest uppercase text-foreground/70 hover:text-gold transition-colors"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="text-xs font-sans-alt font-medium tracking-widest uppercase text-foreground/70 hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          <button
            onClick={() => handleNavClick("#contact")}
            className="btn-gold rounded-none"
          >
            Book Now
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground/80 hover:text-gold transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <nav className="flex flex-col p-6 gap-5">
              {navLinks.map((link) =>
                link.href.startsWith("#") ? (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-xs font-sans-alt font-medium tracking-widest uppercase text-foreground/70 hover:text-gold transition-colors text-left"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-xs font-sans-alt font-medium tracking-widest uppercase text-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <button
                onClick={() => handleNavClick("#contact")}
                className="btn-gold rounded-none mt-2 text-center"
              >
                Book a Consultation
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
