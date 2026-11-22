import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { formatDate } from "../data/sermons";

// Click the thumbnail to load the YouTube player (keeps the page fast).
export default function SermonCard({ sermon }) {
  const [playing, setPlaying] = useState(false);
  const [title, setTitle] = useState(sermon.title || "");
  const isPlaceholder = sermon.videoId.startsWith("REPLACE");

  // No title in the data? Ask YouTube for it.
  useEffect(() => {
    if (sermon.title || isPlaceholder) return undefined;
    let cancelled = false;
    fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${sermon.videoId}&format=json`)
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setTitle(d.title); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [sermon.videoId, sermon.title, isPlaceholder]);

  const label = title || "Sermon video";
  const details = [sermon.speaker, formatDate(sermon.date), sermon.service].filter(Boolean).join(", ");

  return (
    <article className="sermon">
      <div className="sermon-media">
        {playing && !isPlaceholder ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${sermon.videoId}?autoplay=1&rel=0`}
            title={label}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button onClick={() => setPlaying(true)} disabled={isPlaceholder} aria-label={`Play sermon: ${label}`}>
            {!isPlaceholder && <img src={`https://img.youtube.com/vi/${sermon.videoId}/hqdefault.jpg`} alt="" loading="lazy" />}
            <span className="play"><Play size={22} fill="currentColor" aria-hidden="true" /></span>
            {isPlaceholder && <span className="sermon-note">Add a YouTube link or ID</span>}
          </button>
        )}
      </div>
      <h3>{label}</h3>
      {details && <p className="meta">{details}</p>}
    </article>
  );
}
