import { Calendar, Clock, MapPin } from "lucide-react";
import { formatEventDate } from "../data/events";

// One event. With a poster: the poster is shown whole (tap it to open it full size).
// Without a poster: a green date card is shown instead.
export default function EventCard({ event }) {
  const { when } = event;
  return (
    <article className="event">
      {event.poster ? (
        <a className="event-poster" href={event.poster} target="_blank" rel="noreferrer" aria-label={`Open the poster for ${event.title}`}>
          <img src={event.poster} alt={`Poster for ${event.title}`} loading="lazy" />
        </a>
      ) : (
        <div className="event-date-block" aria-hidden="true">
          {when ? (
            <>
              <span className="d">{when.toLocaleDateString("en-GB", { day: "numeric" })}</span>
              <span className="m">{when.toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span>
            </>
          ) : (
            <span className="m">{event.date}</span>
          )}
        </div>
      )}
      <div>
        <h3>{event.title}</h3>
        {event.description && <p>{event.description}</p>}
        <p className="meta">
          {when && <span><Calendar size={15} aria-hidden="true" /> {formatEventDate(when)}</span>}
          {event.time && <span><Clock size={15} aria-hidden="true" /> {event.time}</span>}
          {event.location && <span><MapPin size={15} aria-hidden="true" /> {event.location}</span>}
        </p>
      </div>
    </article>
  );
}
