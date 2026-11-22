import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { site, isPlaceholder } from "../data/site";

// Opens WhatsApp once a real number is set in data/site.js; until then it goes to the Contact page.
export default function WhatsAppButton() {
  if (isPlaceholder(site.whatsapp)) {
    return (
      <Link className="whatsapp" to="/contact" aria-label="Contact us">
        <MessageCircle size={26} aria-hidden="true" />
      </Link>
    );
  }
  return (
    <a className="whatsapp" href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello God's Vineyard, ")}`} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp">
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  );
}
