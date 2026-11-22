// Home page cover: pictures fade one after another, with the welcome text underneath.
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { slideSeconds } from "../data/site";

// Every picture in src/assets/hero becomes a slide automatically (see the README.txt in that folder).
const files = import.meta.glob("../assets/hero/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", { eager: true, query: "?url", import: "default" });
const heroSlides = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b)) // file-name order
  .map(([path, image]) => {
    const name = path.split("/").pop().replace(/\.[^.]+$/, "").replace(/^\d+[-_ ]*/, "").replace(/[-_]+/g, " ").trim();
    return { image, alt: name.charAt(0).toUpperCase() + name.slice(1) }; // description for screen readers
  });

// One picture. It is shown whole (never cropped) over a soft blurred copy of itself that fills the sides.
function Slide({ slide, active }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null; // missing file: just show the green background
  return (
    <div className={`hero-slide ${active ? "is-active" : ""}`}>
      <img className="hero-bg" src={slide.image} alt="" aria-hidden="true" onError={() => setFailed(true)} />
      <img className="hero-fg" src={slide.image} alt={active ? slide.alt : ""} onError={() => setFailed(true)} />
    </div>
  );
}

// Cover pictures that fade automatically, with your welcome text underneath.
export default function HeroCarousel({ children }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (paused || reduceMotion || count < 2) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), slideSeconds * 1000);
    return () => clearInterval(timer); // restarts whenever you click a control
  }, [paused, reduceMotion, count, index]);

  const go = (n) => setIndex((n + count) % count);

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Church photos">
      <div className="hero-stage">
        {heroSlides.map((s, i) => <Slide key={s.image} slide={s} active={i === index} />)}
        {count > 1 && (
          <div className="hero-controls">
            <button onClick={() => go(index - 1)} aria-label="Previous picture"><ChevronLeft size={20} /></button>
            <div className="dots">
              {heroSlides.map((s, i) => (
                <button key={s.image} className={i === index ? "on" : ""} onClick={() => go(i)} aria-label={`Show picture ${i + 1}`} aria-current={i === index} />
              ))}
            </div>
            <button onClick={() => go(index + 1)} aria-label="Next picture"><ChevronRight size={20} /></button>
            <button onClick={() => setPaused(!paused)} aria-label={paused ? "Play slideshow" : "Pause slideshow"}>
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
          </div>
        )}
      </div>
      <div className="hero-caption">
        <div className="container">{children}</div>
      </div>
    </section>
  );
}
