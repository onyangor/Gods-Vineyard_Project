import { Link } from "react-router-dom";

// Uses your logo files in /public/images (logo-mark.png for the header, logo.png for the footer).
export default function Logo({ footer = false }) {
  if (footer) {
    return (
      <Link to="/" aria-label="God's Vineyard Sanctuary home" className="footer-logo">
        <img src="/images/logo.png" alt="God's Vineyard Sanctuary" />
      </Link>
    );
  }
  return (
    <Link to="/" className="logo" aria-label="God's Vineyard Sanctuary home">
      <img className="logo-img" src="/images/logo-mark.png" alt="" />
      <span className="logo-text">God's Vineyard<small>Sanctuary</small></span>
    </Link>
  );
}
