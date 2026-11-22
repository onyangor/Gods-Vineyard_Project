// EDIT THIS FILE FIRST. Anything in [SQUARE BRACKETS] is a placeholder to replace.
export const site = {
  name: "God's Vineyard Sanctuary",
  tagline: "A family of faith in the heart of Kisumu",
  address: "Near Kenton Tower, Kisumu, Kenya",
  phone: "[CHURCH PHONE NUMBER]",
  email: "[CHURCH EMAIL ADDRESS]",
  // Digits only, country code first, no + or spaces (0797 674 032 becomes 254797674032).
  whatsapp: "254719303463",
  serviceTimes: [
    { name: "Sunday Service", time: "8 – 1", note: "See the full Sunday program on the Events page" },
    { name: "Midweek Service", time: "[DAY AND TIME]", note: "[Add details]" },
    { name: "Prayer Meeting", time: "[DAY AND TIME]", note: "[Add details]" },
  ],
  // Google Maps embed. Works without an API key; replace with the exact church pin when you have it.
  mapEmbed: "https://www.google.com/maps?q=Kenton+Tower+Kisumu+Kenya&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Kenton+Tower+Kisumu+Kenya",
  postalAddress: "956, Kisumu, Kenya, 40100",
};

// Social pages (shown in the footer, Contact and Sermons pages).
export const social = {
  facebook: "https://www.facebook.com/p/Gods-Vineyard-Sanctuary-61588865027526/",
  youtube: "https://www.youtube.com/@GodsVineyardSanctuary",
  instagram: "https://www.instagram.com/godsvineyardsanctuary/",
  tiktok: "https://www.tiktok.com/@gods.vineyardsanc",
};

// CONTACT FORM EMAIL: leave empty for now. When you are ready, create a free form at formspree.io
// (it asks for the email address that should receive messages), then paste its link here, e.g.
// "https://formspree.io/f/abcdwxyz". Messages will then arrive in that inbox. See README.
export const contactFormUrl = "";

// OPTIONAL, NO API KEY NEEDED: your YouTube channel ID (starts with UC, 24 characters).
// Find it in YouTube Studio > Settings > Channel > Advanced settings. When set, the Sermons page shows
// one player that plays ALL your uploads, newest first, and updates itself. See README.
export const youtubeChannelId = "UC_ZAtxa1A-me-vvY-kSLwrg";

export const isPlaceholder = (v) => typeof v === "string" && v.trim().startsWith("[");

// Single photos used on the Home, About and Giving pages. To change one, replace the file in /public/images
// (keep the same file name). Photos are shown whole, never cropped. A missing file shows a green panel.
export const images = {
  welcome: "/images/welcome.jpg",
  about: "/images/about.jpg",
  giving: "/images/giving.jpg",
};

// HOME PAGE COVER PHOTOS: put pictures in src/assets/hero (see the README.txt there). No code to edit.
export const slideSeconds = 6; // time each picture stays on screen

// SUNDAY PROGRAM (shown on the Events page), copied from your service program poster.
// Times are written exactly as on the poster. Edit, add or remove lines freely.
export const sundaySchedule = [
  { time: "8 – 9", title: "Intercessory", note: "" },
  { time: "9 – 10", title: "Discipleship classes", note: "" },
  { time: "10 – 11", title: "Praise and worship", note: "" },
  { time: "11 – 1", title: "Word ministration and Children ministry", note: "" },
];

// ===== VIDEO SETTINGS =====
// How many of the latest YouTube videos to show on the website. All the others are one tap away on YouTube.
export const videoSettings = {
  homeCount: 3,               // latest videos on the home page
  sermonsPageCount: 6,        // latest videos on the Sermons page
  showAllVideosPlayer: false, // true = also show one player that plays every upload (needs youtubeChannelId)
};
