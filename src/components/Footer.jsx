// Footer shown on every page: logo, quick links, contact details and social icons.
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { site } from "../data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo footer />
          <p>{site.tagline}.</p>
          <SocialLinks />
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            {[["/about", "About us"], ["/ministries", "Ministries"], ["/sermons", "Sermons"], ["/events", "Events"], ["/gallery", "Gallery"], ["/giving", "Giving"], ["/contact", "Contact"]].map(([to, t]) => (
              <li key={to}><Link to={to}>{t}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Visit us</h4>
          <ul className="footer-contact">
            <li><MapPin size={16} aria-hidden="true" /> {site.address}</li>
            <li><Phone size={16} aria-hidden="true" /> {site.phone}</li>
            <li><Mail size={16} aria-hidden="true" /> {site.email}</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
    </footer>
  );
}
