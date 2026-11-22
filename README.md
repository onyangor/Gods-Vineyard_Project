See HOW-TO-UPDATE.md for a plain-language guide to changing text, photos, events and more.
# God's Vineyard Church Website

React + Vite. Pages: Home, About, Ministries, Sermons, Events, Giving, Contact.

## Run it
1. Install Node.js 18+ from nodejs.org
2. In this folder run:
   ```
   npm install
   npm run dev
   ```
3. Open the address shown (usually http://localhost:5173)

## Customise (no coding needed beyond editing text)
| What | File |
|---|---|
| Phone, email, WhatsApp, service times, map | `src/data/site.js` |
| Sermons (add YouTube video IDs) | `src/data/sermons.js` |
| Events | `src/data/events.js` |
| Ministries | `src/data/ministries.js` |
| History, founders, leaders, beliefs, vision | `src/data/about.js` |
| M-Pesa details | `src/pages/Giving.jsx` (top of file) |
| Colours and fonts | top of `src/index.css` |

Everything in `[SQUARE BRACKETS]` is a placeholder. Search the project for `[` to find them.

**Photos:** add `hero.jpg`, `welcome.jpg`, `about.jpg`, `giving.jpg` to `public/images/` (use your own church photos, ideally under 400 KB each). Until then a green panel shows.

**Add a sermon:** copy a block in `src/data/sermons.js`, set `videoId` to the part after `v=` in the YouTube link.

**Contact form:** it does not send email yet. Connect Formspree, EmailJS or Web3Forms in `src/pages/Contact.jsx`.

**Online payments later:** replace the "Card and online giving" section in `src/pages/Giving.jsx` with your gateway's button or checkout.


## Home page cover pictures
Put 4 (or more) wide photos in `public/images/` named `hero-1.jpg` to `hero-4.jpg`. They fade automatically every 6 seconds. Edit the list and timing at the bottom of `src/data/site.js`.

## Important: preview shows the OLD site until you rebuild
`npm run preview` serves the last build. After any change run `npm run build` again, then refresh.

## Bringing in ALL your YouTube videos (old and new)
1. Get a free API key: go to console.cloud.google.com, create a project, open **APIs & Services > Library**, enable **YouTube Data API v3**, then **Credentials > Create credentials > API key**.
2. In the project folder run (Windows PowerShell shown; on Mac/Linux use `YOUTUBE_API_KEY=your_key npm run sync-sermons`):
   ```
   $env:YOUTUBE_API_KEY="your_key"; npm run sync-sermons
   ```
3. It saves every video from the channel into `src/data/sermons.synced.json`. Then run `npm run build` and redeploy.
4. Repeat after each new upload. Titles, dates and a guessed service come from YouTube. Edit the service guesses at the top of `scripts/sync-sermons.mjs`.
5. To add a speaker or fix a service name for one video, add a line for it in `src/data/sermons.js`. Your line wins over the synced one.
Never put the API key inside the website code.

## Run it on your computer (easiest way)
```
npm install
npm run site
```
`npm run site` builds the real website and opens it at the address shown (http://localhost:4173). If `npm run dev` ever shows a blank page, use `npm run site` instead. Re-run it after every change.

## Gallery
Drop photos into `src/assets/gallery/` (sub-folders become filter buttons), then run `npm run site` again. See the README.txt in that folder.

## Latest YouTube videos appear by themselves (on Vercel)
1. Get a free YouTube API key (Google Cloud Console, enable YouTube Data API v3, create an API key).
2. In Vercel open your project, then **Settings > Environment Variables**, add `YOUTUBE_API_KEY` with your key, and redeploy.
3. The site now asks YouTube for your latest videos (refreshed about hourly). Nothing to edit when you upload a new video.
Without the key, or when running on your own computer, the site shows the saved list in `sermons.synced.json` and any lines you added in `sermons.js`.

## Turn on contact-form email later (about 2 minutes)
The form is already built. It only needs a destination:
1. Sign up free at formspree.io, click **New Form**, and enter the church email that should receive messages. Confirm the verification email they send.
2. Copy the form link (looks like `https://formspree.io/f/abcdwxyz`).
3. Open `src/data/site.js` and paste it between the quotes in `contactFormUrl = ""`.
4. Run `npm run site` (or redeploy) and send yourself a test message. Check the spam folder too.
Until then, the form politely tells visitors it is not switched on and points them to WhatsApp, so nobody thinks a message was sent when it was not.


## Deploy to the internet (Vercel, free)
Before you go live, search the project for `[` and replace placeholders you want visitors to see (phone, email, M-Pesa details on the Giving page, times, names). Anything left in brackets will show on the live site.

1. Create a free account at github.com and click **New repository** (name it `gods-vineyard`, Private is fine).
2. On the new repository page click **uploading an existing file**. Drag in everything INSIDE the project folder (not the folder itself, and not `node_modules` or `dist`), then click **Commit changes**.
3. Go to vercel.com, **Sign up with GitHub**, click **Add New > Project**, and import the repository.
4. Vercel detects Vite automatically (Build `npm run build`, Output `dist`). Click **Deploy**. In about a minute you get a link like `gods-vineyard.vercel.app`.
5. Open the link, click every page, refresh on a page such as `/about`, and check it on your phone.
6. Optional: add `YOUTUBE_API_KEY` under **Settings > Environment Variables** and redeploy so new videos appear automatically.
7. Optional: **Settings > Domains** to connect your own domain name.

Updating later: change a file on GitHub (or upload a new version) and click Commit. Vercel redeploys by itself within a minute.

Command-line alternative: `npm i -g vercel`, then run `vercel` in the project folder and `vercel --prod` to publish.

## YouTube: two ways to show ALL your videos (old and new)
**Easiest, no key:** put your channel ID (YouTube Studio > Settings > Channel > Advanced settings) into `youtubeChannelId` in `src/data/site.js`. The Sermons page then shows one player that plays every upload, newest first, and updates itself.
**Full grid with titles, dates and filters:** use the API key steps above (`npm run sync-sermons` locally, or `YOUTUBE_API_KEY` on Vercel). You can use both together.

## Quick guide: how to update things
| I want to... | Do this |
|---|---|
| Change home cover photos | Add or delete pictures in `src/assets/hero/` |
| Add gallery photos | Drop them in `src/assets/gallery/` (sub-folders become filters) |
| Add an event (with or without a poster) | Copy a block in `src/data/events.js`; poster images go in `public/events/` |
| Change the Bible verse list | Edit `src/data/verses.js` (it changes weekly by itself) |
| Latest sermons | Automatic from YouTube once live (no editing). See below |
| Phone, WhatsApp, times, Sunday program, social links | `src/data/site.js` |
After any change on your computer run `npm run site`; on Vercel just commit the change.

## How the YouTube videos load by themselves
The Home and Sermons pages ask `/api/sermons` for your latest videos each time. It reads your channel's public feed (the 15 newest videos), so new uploads appear with nothing to edit and no key. Adding a `YOUTUBE_API_KEY` makes it list EVERY video on the channel. The "Every message in one player" box at the bottom of the Sermons page also plays all uploads, old and new. Events cannot be pulled from Facebook automatically (Facebook does not allow it), so events are added in `src/data/events.js`, but past events hide themselves.
