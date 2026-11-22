# How to update the website (no coding needed)

The website lives on GitHub (your files) and Vercel (the live site). Whenever you save a change on GitHub,
Vercel republishes the live site by itself in about a minute.

## The basic move: edit a file
1. Go to your repository on github.com.
2. Open the file (the paths are in the list below).
3. Click the **pencil icon** (Edit this file).
4. Change ONLY the words between the quote marks. Do not delete commas, quotes or brackets.
5. Click **Commit changes** (green button), then **Commit changes** again.
6. Wait a minute and refresh your live website.
Made a mistake? Open the file, click **History**, and go back to the earlier version. Or in Vercel open **Deployments** and promote an earlier one.

## The basic move: add a photo
1. On GitHub open the folder (the path is in the list below).
2. Click **Add file > Upload files**, drag the photo in, click **Commit changes**.
Photos are shown whole (never cropped). Tip: reduce big photos to about 1600 px wide first at squoosh.app.

## What to change, and where
| I want to change | File or folder |
|---|---|
| Phone number, WhatsApp, service times, Sunday program, social links | `src/data/site.js` |
| Home page cover photos (add/remove) | folder `src/assets/hero` |
| Gallery photos (add/remove; sub-folders become filter buttons) | folder `src/assets/gallery` |
| Photos of founder, co-founder, keynote speaker, leaders | upload to folder `public/people`, then add `photo: "/people/name.jpg"` to that person in `src/data/about.js` |
| About page words (history, founders, vision, beliefs) | `src/data/about.js` |
| Ministries | `src/data/ministries.js` |
| Events (with or without a poster) | `src/data/events.js`; posters go in folder `public/events` |
| Bible verses (one shows each week) | `src/data/verses.js` |
| M-Pesa giving details | `src/pages/Giving.jsx` (top of the file) |
| Welcome, About and Giving photos | replace the file in `public/images` (same file name) |
| How many videos show | `videoSettings` in `src/data/site.js` |
| Turn on contact-form email | `contactFormUrl` in `src/data/site.js` |

## Sermons and videos: nothing to do
New YouTube uploads appear on the website automatically. To check it is working, open
`https://YOUR-SITE.vercel.app/api/sermons`. You should see a list of your videos as text.
If it shows `[]`, the feed could not be read: ask for help and send a screenshot.

## Events
Copy an event block in `src/data/events.js`, write the date like `2026-12-25`, and (optional) add `poster: "/events/name.jpg"`.
Past events hide by themselves.

## Share your website
Send people your Vercel link (or your own domain). After deploying, open `index.html`, put your real address in the
`og:image` line and remove the two comment marks, so WhatsApp and Facebook show a nice picture when the link is shared.
To let helpers edit: GitHub repository > Settings > Collaborators.
