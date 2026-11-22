import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageHeader from "../components/PageHeader";

// Every photo in src/assets/gallery (and its sub-folders) shows up here automatically.
const files = import.meta.glob("../assets/gallery/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true, query: "?url", import: "default" });

const tidy = (text) => {
  const t = text.replace(/^\d+[-_ ]*/, "").replace(/[-_]+/g, " ").trim(); // drop "01-" order prefixes
  return t.charAt(0).toUpperCase() + t.slice(1);
};

const photos = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, url]) => {
    const parts = path.split("/assets/gallery/")[1].split("/");
    const file = parts.pop().replace(/\.[^.]+$/, "");
    return { url, category: parts.length ? tidy(parts[0]) : "General", caption: tidy(file) };
  });

const categories = ["All", ...new Set(photos.map((p) => p.category))];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null); // index of the photo shown large, or null
  const list = filter === "All" ? photos : photos.filter((p) => p.category === filter);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const choose = (name) => { setFilter(name); setOpen(null); };
  const current = open !== null ? list[open] : null;

  return (
    <>
      <PageHeader title="Gallery" intro="Moments from life together at God's Vineyard Sanctuary." />
      <section className="section container">
        {photos.length === 0 && <p className="empty">No photos yet. Add pictures to <strong>src/assets/gallery</strong> and rebuild the site.</p>}
        {categories.length > 2 && (
          <div className="filters" role="group" aria-label="Filter photos">
            {categories.map((name) => (
              <button key={name} className="chip" aria-pressed={filter === name} onClick={() => choose(name)}>{name}</button>
            ))}
          </div>
        )}
        <div className="gallery">
          {list.map((p, i) => (
            <button key={p.url} onClick={() => setOpen(i)} aria-label={`Open photo: ${p.caption}`}>
              <img src={p.url} alt={p.caption} loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={close}>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={current.url} alt={current.caption} />
            <figcaption>{current.caption}</figcaption>
          </figure>
          <button className="lb-close" onClick={close} aria-label="Close" autoFocus><X /></button>
          {list.length > 1 && (
            <>
              <button className="lb-prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo"><ChevronLeft /></button>
              <button className="lb-next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo"><ChevronRight /></button>
            </>
          )}
        </div>
      )}
    </>
  );
}
