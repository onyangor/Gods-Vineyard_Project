// Vercel serverless route: https://your-site/api/sermons
// The Sermons and Home pages call this to get the latest videos from your YouTube channel.
//  - No setup: returns the 15 newest videos (needs only youtubeChannelId in src/data/site.js).
//  - With YOUTUBE_API_KEY set in Vercel: returns EVERY video on the channel.
// New uploads appear by themselves; nothing to edit.
import { getChannelVideos } from "../lib/youtube.js";
import { youtubeChannelId } from "../src/data/site.js";

export default async function handler(req, res) {
  try {
    const videos = await getChannelVideos({ key: process.env.YOUTUBE_API_KEY, channelId: youtubeChannelId });
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=86400"); // check YouTube at most every 30 minutes
    return res.status(200).json(videos);
  } catch (error) {
    res.setHeader("Cache-Control", "no-store"); // don't remember failures
    return res.status(200).json([]); // the site then shows its saved list instead
  }
}
