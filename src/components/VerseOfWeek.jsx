import { getVerseOfTheWeek } from "../data/verses";

// A centred Bible verse. Edit the list in src/data/verses.js.
export default function VerseOfWeek() {
  const verse = getVerseOfTheWeek();
  return (
    <section className="section section-ivory verse">
      <div className="container">
        <p className="label">Verse of the week</p>
        <blockquote>
          “{verse.text}”
          <cite>{verse.ref} (KJV)</cite>
        </blockquote>
      </div>
    </section>
  );
}
