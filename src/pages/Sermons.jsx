import { useState } from "react";
import { Youtube } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SermonCard from "../components/SermonCard";
import { social, youtubeChannelId, videoSettings } from "../data/site";
import { useSermons } from "../data/sermons";

// A channel's "all uploads" playlist is its channel ID with the first two letters changed from UC to UU.
const playlistId = /^UC[\w-]{22}$/.test(youtubeChannelId) ? `UU${youtubeChannelId.slice(2)}` : null;

// Sermons page: the latest videos as cards (loaded from YouTube automatically). Older ones open on YouTube.
// How many cards show is set by videoSettings.sermonsPageCount in src/data/site.js.
export default function Sermons() {
  const sermons = useSermons();
  const services = ["All", ...new Set(sermons.map((s) => s.service).filter(Boolean))]; // filter buttons
  const [filter, setFilter] = useState("All");

  const list = filter === "All" ? sermons : sermons.filter((s) => s.service === filter);

  return (
    <>
      <PageHeader title="Sermons" intro="Watch and rewatch messages from God's Vineyard." />
      <section className="section container">
        {/* Filter buttons appear only when there is more than one kind of service */}
        {services.length > 2 && (
          <div className="filters" role="group" aria-label="Filter sermons by service">
            {services.map((name) => (
              <button key={name} className="chip" aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>
            ))}
          </div>
        )}

        {sermons.length === 0 && (
          <p className="empty">Our sermons will appear here soon. In the meantime, watch them on <a className="text-link" href={social.youtube} target="_blank" rel="noreferrer">YouTube</a>.</p>
        )}

        <div className="sermon-grid">
          {list.slice(0, videoSettings.sermonsPageCount).map((s) => <SermonCard key={s.videoId} sermon={s} />)}
        </div>
        {/* One player that plays EVERY upload on the channel, old and new */}
        {videoSettings.showAllVideosPlayer && playlistId && (
          <div className="playlist">
            <h2>Every message in one player</h2>
            <div className="sermon-media">
              <iframe src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}`} title="God's Vineyard Sanctuary: all videos" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" />
            </div>
          </div>
        )}

        {/* Everything older than the cards above opens on the YouTube channel */}
        <div className="center">
          <p>Looking for older messages? Every video is on our YouTube channel.</p>
          <a className="btn btn-green" href={`${social.youtube}/videos`} target="_blank" rel="noreferrer"><Youtube size={18} aria-hidden="true" /> Watch all videos on YouTube</a>
        </div>
      </section>
    </>
  );
}
