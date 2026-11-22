import { Clock } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EventCard from "../components/EventCard";
import SocialLinks from "../components/SocialLinks";
import { getUpcomingEvents } from "../data/events";
import { site, sundaySchedule } from "../data/site";

// Events page: regular service times, the Sunday program, and upcoming events (from src/data/events.js).
export default function Events() {
  const events = getUpcomingEvents(); // past events are left out automatically

  return (
    <>
      <PageHeader title="Events and services" intro="Join us for worship and community through the week." />

      {/* Regular service times (edit in src/data/site.js) */}
      <section className="section container">
        <h2>Service schedule</h2>
        <div className="schedule">
          {site.serviceTimes.map((s) => (
            <div key={s.name}>
              <Clock size={20} aria-hidden="true" />
              <div><h3>{s.name}</h3><p><strong>{s.time}</strong></p><p className="meta">{s.note}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Sunday order of the day (edit sundaySchedule in src/data/site.js) */}
      <section className="section section-ivory">
        <div className="container sunday">
          <div>
            <h2>Sunday at God's Vineyard</h2>
            <p>The order of our Sunday, so you know what to expect when you join us.</p>
          </div>
          <ol className="timeline">
            {sundaySchedule.map((item, i) => (
              <li key={i}>
                <span className="t">{item.time}</span>
                <div><h3>{item.title}</h3>{item.note && <p>{item.note}</p>}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Upcoming events (edit src/data/events.js) */}
      <section className="section">
        <div className="container">
          <h2>Upcoming events</h2>
          {events.length > 0 ? (
            <div className="event-list">{events.map((e) => <EventCard key={e.title + e.date} event={e} />)}</div>
          ) : (
            <div className="empty">
              <p>There are no upcoming events listed right now. Follow us to hear about the next one.</p>
              <SocialLinks />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
