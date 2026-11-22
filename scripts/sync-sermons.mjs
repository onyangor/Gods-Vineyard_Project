// Saves every video from your YouTube channel into src/data/sermons.synced.json.
// Run:  npm run sync-sermons      (needs a free YouTube API key, see README)
// Only needed if you host somewhere other than Vercel; on Vercel the site updates itself.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { fetchChannelVideos } from "../lib/youtube.js";

const KEY = process.env.YOUTUBE_API_KEY;
const OUT = join(dirname(fileURLToPath(import.meta.url)), "../src/data/sermons.synced.json");

if (!KEY) {
  console.error('Missing key. Run it like this:\n  Mac/Linux:  YOUTUBE_API_KEY=your_key npm run sync-sermons\n  Windows PowerShell:  $env:YOUTUBE_API_KEY="your_key"; npm run sync-sermons');
  process.exit(1);
}

fetchChannelVideos(KEY)
  .then((videos) => {
    writeFileSync(OUT, JSON.stringify(videos, null, 2) + "\n");
    console.log(`Saved ${videos.length} videos. Now run: npm run build`);
  })
  .catch((e) => { console.error("Could not sync:", e.message); process.exit(1); });
