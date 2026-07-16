import { Phone } from "lucide-react";
import { Link } from "@/lib/rr-shim";

const StickyBookCall = () => {
  return (
    <Link
      to="/contact"
      className="fixed bottom-6 right-6 z-50 gradient-gold text-gold-foreground px-5 py-3 rounded-full shadow-lg hover:opacity-90 transition-opacity flex items-center gap-2 font-semibold text-sm font-body"
    >
      <Phone size={16} />
      Book a Call
    </Link>
  );
};

export default StickyBookCall;
