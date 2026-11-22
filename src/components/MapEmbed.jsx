import { MapPin } from "lucide-react";
import { site } from "../data/site";

// Google map plus a plain link, so people can still get directions if the map is blocked.
export default function MapEmbed() {
  return (
    <div>
      <div className="map">
        <iframe title="Map showing God's Vineyard Sanctuary near Kenton Tower, Kisumu" src={site.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
      <p className="map-link">
        <MapPin size={16} aria-hidden="true" /> {site.address}.{" "}
        <a className="text-link" href={site.mapLink} target="_blank" rel="noreferrer">Open in Google Maps</a>
      </p>
    </div>
  );
}
