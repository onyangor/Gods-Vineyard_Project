// A section title with an optional "see all" link on the right.
import { Link } from "react-router-dom";

export default function SectionHeading({ title, text, linkTo, linkText }) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {linkTo && <Link to={linkTo} className="text-link">{linkText}</Link>}
    </div>
  );
}
