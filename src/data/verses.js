// ============ BIBLE VERSES ============
// The home page shows one "Verse of the week". It changes by itself every week, going down this list.
// To ADD a verse: copy a line and change the text and reference. Add as many as you like.
// To SHOW ONE VERSE until you change it: set pinnedVerse below to its number (0 is the first verse).
// These verses are from the King James Version (public domain). Check the wording if you replace them
// with another translation, because most modern translations are copyrighted.
export const verses = [
  { text: "I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing.", ref: "John 15:5" },
  { text: "The LORD is my shepherd; I shall not want.", ref: "Psalm 23:1" },
  { text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding.", ref: "Proverbs 3:5" },
  { text: "I can do all things through Christ which strengtheneth me.", ref: "Philippians 4:13" },
  { text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", ref: "Matthew 11:28" },
  { text: "God is our refuge and strength, a very present help in trouble.", ref: "Psalm 46:1" },
  { text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee.", ref: "Isaiah 41:10" },
  { text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.", ref: "John 3:16" },
];

export const pinnedVerse = null; // for example 0 to always show the first verse; null = changes weekly

// ---- You do not need to edit below this line ----
export function getVerseOfTheWeek() {
  const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)); // counts weeks since 1970
  return verses[pinnedVerse ?? weekNumber % verses.length];
}
