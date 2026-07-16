import { Link } from "@/lib/rr-shim";
import { Instagram, Youtube, Linkedin } from "lucide-react";
import logo from "@/assets/clickvision-logo.png";

const SOCIALS = {
  instagram: "https://www.instagram.com/clickvision.in/",
  youtube: "https://www.youtube.com/@clickvision.in",
  linkedin: "#", // TODO: user will provide
};

const Footer = () => {
  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src={logo}
              alt="Click Vision"
              className="h-14 w-auto object-contain mb-6"
            />
            <p className="text-foreground/50 text-sm font-body leading-relaxed max-w-xs mb-8">
              We click your vision. Premium photography &amp; cinematography for weddings, events, and brand stories across India.
            </p>
            <div className="flex gap-4">
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border flex items-center justify-center text-foreground/50 hover:text-gold hover:border-gold/40 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href={SOCIALS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border flex items-center justify-center text-foreground/50 hover:text-gold hover:border-gold/40 transition-all"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border flex items-center justify-center text-foreground/50 hover:text-gold hover:border-gold/40 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="label-tag text-foreground/60 mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Work", id: "#portfolio" },
                { label: "Services", id: "#services" },
                { label: "Team", id: "#team" },
                { label: "FAQ", id: "#faq" },
                { label: "Contact", id: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <Link
                      to={link.href}
                      className="text-sm text-foreground/50 hover:text-gold transition-colors font-body"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleScroll(link.id!)}
                      className="text-sm text-foreground/50 hover:text-gold transition-colors font-body"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="label-tag text-foreground/60 mb-6">Get in Touch</h4>
            <a
              href="mailto:business.clickvision@gmail.com"
              className="text-sm text-foreground/50 hover:text-gold transition-colors font-body block mb-2"
            >
              business.clickvision@gmail.com
            </a>
            <a
              href="tel:+917551068723"
              className="text-sm text-foreground/50 hover:text-gold transition-colors font-body block mb-2"
            >
              Call: +91 75510 68723
            </a>
            <a
              href="https://wa.me/917551068723"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground/50 hover:text-gold transition-colors font-body block mb-3"
            >
              WhatsApp: +91 75510 68723
            </a>
            <p className="text-sm text-foreground/40 font-body mb-8">
              Based in India
              <br />
              Available Worldwide
            </p>
            <button
              onClick={() => handleScroll("#contact")}
              className="btn-gold rounded-none text-xs"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-foreground/40 font-body">
            © 2026 Click Vision. All rights reserved.
          </p>
          <p className="text-xs text-foreground/40 font-body italic font-display">
            We click your vision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
