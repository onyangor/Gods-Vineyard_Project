// ADD A SERMON: copy one line, paste it anywhere in the list, change the details.
//   video   (required) the YouTube link OR just the ID. Both work:
//           "https://www.youtube.com/watch?v=dQw4w9WgXcQ"  or  "dQw4w9WgXcQ"
//   service (recommended) groups sermons into filter buttons, e.g. "Sunday Service", "Midweek Service"
//   date    (recommended) written like 2026-11-16 (year-month-day). Newest is shown first automatically.
//   title   (optional) leave it out and the title is fetched from YouTube.
//   speaker (optional)
// Any number of sermons works. The Sermons page shows 9 at a time with a "Show more" button.
// New videos on your YouTube channel appear by themselves once the website is on Vercel with a YouTube key (see README).
// Lines you write here win over synced ones, so use them to add a speaker or fix a service name.
// Lines whose video starts with REPLACE are placeholders. Delete them when you add real ones.
const rawSermons = [
  { video: "REPLACE_1", service: "Sunday Service", date: "", title: "[Sermon title]", speaker: "[Speaker name]" },
  { video: "REPLACE_2", service: "Sunday Service", date: "", title: "[Sermon title]", speaker: "[Speaker name]" },
  { video: "REPLACE_3", service: "Midweek Service", date: "", title: "[Sermon title]", speaker: "[Speaker name]" },
  { video: "REPLACE_4", service: "Midweek Service", date: "", title: "[Sermon title]", speaker: "[Speaker name]" },
  { video: "REPLACE_5", service: "Prayer Meeting", date: "", title: "[Sermon title]", speaker: "[Speaker name]" },
  { video: "REPLACE_6", service: "Sunday Service", date: "", title: "[Sermon title]", speaker: "[Speaker name]" },
];

// ---- You do not need to edit below this line ----
import { useEffect, useMemo, useState } from "react";
import synced from "./sermons.synced.json";

export function getVideoId(input = "") {
  const text = input.trim();
  const match = text.match(/(?:v=|youtu\.be\/|embed\/|live\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : text;
}

const time = (d) => (Date.parse(d) ? Date.parse(d) : 0);
const filled = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v)); // ignore empty fields

// Saved list < live channel list < your own lines above (later ones win), one entry per video.
function build(live = []) {
  const byId = new Map();
  [synced, live, rawSermons].flat().forEach((s) => {
    const id = getVideoId(s.video);
    byId.set(id, { ...byId.get(id), ...filled(s), videoId: id });
  });
  const all = [...byId.values()];
  const real = all.filter((s) => !s.videoId.startsWith("REPLACE")); // hide placeholders once real videos exist
  const shown = real.length ? real : import.meta.env.DEV ? all : []; // placeholders only show while you are editing
  return shown.sort((a, b) => time(b.date) - time(a.date)); // newest first
}

// Use this in pages: it shows the saved list at once, then adds the latest from YouTube.
export function useSermons() {
  const [live, setLive] = useState([]);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/sermons")
      .then((r) => r.json())
      .then((data) => { if (!cancelled && Array.isArray(data)) setLive(data); })
      .catch(() => {}); // no live feed (for example when running locally): keep the saved list
    return () => { cancelled = true; };
  }, []);
  return useMemo(() => build(live), [live]);
}

export function formatDate(d) {
  const t = Date.parse(d);
  return t ? new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : d;
}
