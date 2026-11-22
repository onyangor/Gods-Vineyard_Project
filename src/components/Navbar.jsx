// Top menu with a mobile menu button. To add or rename menu items, edit the "links" list below.
import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/ministries", label: "Ministries" },
  { to: "/sermons", label: "Sermons" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false); // close menu after navigating
  }, [pathname]);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Logo />
        <nav id="main-nav" className={`nav-links ${open ? "open" : ""}`} aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"}>{l.label}</NavLink>
          ))}
          <Link to="/giving" className="btn btn-gold nav-give">Give</Link>
        </nav>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
