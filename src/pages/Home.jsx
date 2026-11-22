import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import Photo from "../components/Photo";
import HeroCarousel from "../components/HeroCarousel";
import MapEmbed from "../components/MapEmbed";
import SectionHeading from "../components/SectionHeading";
import SermonCard from "../components/SermonCard";
import EventCard from "../components/EventCard";
import VerseOfWeek from "../components/VerseOfWeek";
import { site, images, social, videoSettings } from "../data/site";
import { useSermons } from "../data/sermons";
import { getUpcomingEvents } from "../data/events";
import { ministries } from "../data/ministries";
import { vision, mission } from "../data/about";

// The home page. Each block below is one section; delete or reorder blocks freely.
export default function Home() {
  const sermons = useSermons();                      // latest videos, loaded from YouTube automatically
  const events = getUpcomingEvents().slice(0, 3);    // next three upcoming events

  return (
    <>
      {/* Cover photos (add or remove pictures in src/assets/hero) with the welcome text underneath */}
      <HeroCarousel>
        <h1>Come as you are. Grow where God has planted you.</h1>
        <p>God's Vineyard Sanctuary is a welcoming church family near Kenton Tower in Kisumu. There is a seat for you this Sunday.</p>
        <div className="btn-row">
          <Link to="/contact" className="btn btn-gold">Plan your visit</Link>
          <Link to="/sermons" className="btn btn-outline">Watch a sermon</Link>
        </div>
      </HeroCarousel>

      {/* Service times strip (edit in src/data/site.js) */}
      <div className="container">
        <div className="service-strip">
          {site.serviceTimes.map((s) => (
            <div key={s.name}>
              <Clock size={18} aria-hidden="true" />
              <div><strong>{s.name}</strong><span>{s.time}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* Welcome message (replace images/welcome.jpg to change the photo) */}
      <section className="section container split">
        <Photo src={images.welcome} alt="Welcome at God's Vineyard" className="split-photo" />
        <div>
          <h2>A warm welcome to God's Vineyard</h2>
          <p>[Write a short welcome message from the pastor or church leadership here. Share who you are, what a first visit feels like, and how people can connect.]</p>
          <p>Whether you are new to Kisumu, searching for a church home, or exploring faith for the first time, we are glad you are here.</p>
          <p className="links"><Link to="/about" className="text-link">Read our story</Link> <Link to="/events" className="text-link">See the Sunday schedule</Link></p>
        </div>
      </section>

      {/* Bible verse that changes weekly (edit src/data/verses.js) */}
      <VerseOfWeek />

      {/* Vision and mission (edit src/data/about.js) */}
      <section className="section section-green">
        <div className="container vm">
          <div><h2>Our vision</h2><p>{vision}</p></div>
          <div><h2>Our mission</h2><p>{mission}</p></div>
        </div>
      </section>

      {/* First three ministries (edit src/data/ministries.js) */}
      <section className="section container">
        <SectionHeading title="Find your place" text="Every season of life has a home here." linkTo="/ministries" linkText="All ministries" />
        <div className="list-grid">
          {ministries.slice(0, 3).map((m) => (
            <Link to="/ministries" key={m.id} className="ministry-link">
              <m.icon size={28} aria-hidden="true" />
              <h3>{m.title}</h3>
              <p>{m.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest sermons, fetched from YouTube automatically (how many: videoSettings in src/data/site.js) */}
      <section className="section section-ivory">
        <div className="container">
          <SectionHeading title="Latest sermons" linkTo="/sermons" linkText="All sermons" />
          {sermons.length > 0 ? (
            <div className="sermon-grid">{sermons.slice(0, videoSettings.homeCount).map((s) => <SermonCard key={s.videoId} sermon={s} />)}</div>
          ) : (
            <p>New messages will appear here soon. <a className="text-link" href={social.youtube} target="_blank" rel="noreferrer">Watch on YouTube</a></p>
          )}
        </div>
      </section>

      {/* Next three upcoming events (edit src/data/events.js) */}
      <section className="section container">
        <SectionHeading title="Upcoming events" linkTo="/events" linkText="All events" />
        {events.length > 0 ? (
          <div className="event-list">{events.map((e) => <EventCard key={e.title + e.date} event={e} />)}</div>
        ) : (
          <p>No events are listed right now. Please check back soon, or follow us on our social pages.</p>
        )}
      </section>

      {/* Map and address */}
      <section className="section section-ivory">
        <div className="container split find-us">
          <div>
            <h2>Find us</h2>
            <p>{site.address}</p>
            <p className="meta">Postal address: {site.postalAddress}</p>
            <Link to="/contact" className="text-link">Contact us</Link>
          </div>
          <MapEmbed />
        </div>
      </section>

      {/* Giving call to action */}
      <section className="cta">
        <div className="container">
          <h2>Partner with what God is doing in Kisumu</h2>
          <p>Your giving supports worship, outreach and the care of families in our community.</p>
          <Link to="/giving" className="btn btn-gold">Give to God's Vineyard</Link>
        </div>
      </section>
    </>
  );
}
