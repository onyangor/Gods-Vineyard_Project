// Shared by the website's /api/sermons route and the "npm run sync-sermons" script.
export const CHANNEL_HANDLE = "@GodsVineyardSanctuary";

// Guess the service from the video title. First match wins. Edit to match how you name videos.
export const serviceRules = [
  [/mid-?week|wednesday|thursday/i, "Midweek Service"],
  [/prayer|fasting|vigil|intercess/i, "Prayer Meeting"],
  [/sunday|service|worship/i, "Sunday Service"],
];
export const defaultService = "More messages";

export async function fetchChannelVideos(key, handle = CHANNEL_HANDLE) {
  const api = async (path, params) => {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/${path}?${new URLSearchParams({ ...params, key })}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || res.statusText);
    return data;
  };

  const channel = await api("channels", { part: "contentDetails", forHandle: handle });
  const uploads = channel.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploads) throw new Error(`Channel ${handle} not found.`);

  const videos = [];
  let pageToken;
  do {
    const page = await api("playlistItems", { part: "snippet,contentDetails", maxResults: "50", playlistId: uploads, ...(pageToken && { pageToken }) });
    for (const item of page.items) {
      const title = item.snippet.title;
      if (title === "Private video" || title === "Deleted video") continue;
      const rule = serviceRules.find(([re]) => re.test(title));
      videos.push({
        video: item.contentDetails.videoId,
        title,
        date: (item.contentDetails.videoPublishedAt || item.snippet.publishedAt || "").slice(0, 10),
        service: rule ? rule[1] : defaultService,
      });
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
  return videos;
}

// ---------- Without an API key: YouTube's public feed (the 15 newest videos) ----------
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'");

// Turns the feed's XML into the same simple list the website uses. Each video sits inside an <entry> block.
export function parseFeed(xml) {
  return xml
    .split("<entry>")
    .slice(1)
    .map((block) => {
      const video = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = decode(block.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
      const published = block.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
      const rule = serviceRules.find(([re]) => re.test(title));
      return { video, title, date: published.slice(0, 10), service: rule ? rule[1] : defaultService };
    })
    .filter((v) => v.video);
}

export async function fetchChannelFeed(channelId) {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
  if (!res.ok) throw new Error(`YouTube feed error ${res.status}`);
  return parseFeed(await res.text());
}

// The one function the website calls:
//  - with an API key  -> every video on the channel (old and new)
//  - without a key    -> the 15 newest videos from the public feed
//  - if the key fails -> falls back to the public feed
export async function getChannelVideos({ key, channelId }) {
  if (key) {
    try {
      return await fetchChannelVideos(key);
    } catch (e) {
      /* key problem: use the public feed below */
    }
  }
  return channelId ? fetchChannelFeed(channelId) : [];
}
