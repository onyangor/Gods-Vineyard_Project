// ============ HOW EVENTS WORK ============
// 1. Add one block per event (copy the example below).
// 2. date MUST be written year-month-day, like "2026-12-24". The site uses it to sort events
//    and to hide an event automatically once its day has passed. You never delete old events in a hurry.
// 3. Poster (optional): save the image in /public/events, then add  poster: "/events/your-file.jpg"
//    The poster is shown whole, never cropped. No poster? A neat green date card is shown instead.
// 4. time, location and description are optional. Leave them out if you do not need them.
// 5. If there are no upcoming events the site shows a friendly message, so nothing looks broken.
//
// Example (remove the // at the start of each line to use it):
// { title: "Christmas Service", date: "2026-12-25", time: "9:00 am", location: "Near Kenton Tower, Kisumu", description: "Join us to celebrate together.", poster: "/events/christmas.jpg" },
export const events = [
  // This sample only shows while you are editing on your computer. It hides itself on the live site.
  { title: "[Event name]", date: "[Date]", time: "[Time]", location: "[Venue]", description: "[Short description of the event.]" },
];

// ---- You do not need to edit below this line ----
const toDate = (d) => {
  const t = Date.parse(`${d}T00:00:00`);
  return Number.isNaN(t) ? null : new Date(t);
};

// Upcoming events only, soonest first.
export function getUpcomingEvents() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const all = events.map((e) => ({ ...e, when: toDate(e.date) }));
  const upcoming = all.filter((e) => e.when && e.when >= today).sort((a, b) => a.when - b.when);
  // While editing locally, show the sample so you can see the layout. On the live site it stays hidden.
  return upcoming.length === 0 && import.meta.env.DEV ? all.filter((e) => !e.when) : upcoming;
}

export const formatEventDate = (when) =>
  when.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
