// Ministries page. Edit the list in src/data/ministries.js (add a photo to any ministry with an image line).
import PageHeader from "../components/PageHeader";
import Photo from "../components/Photo";
import { ministries } from "../data/ministries";

export default function Ministries() {
  return (
    <>
      <PageHeader title="Ministries" intro="Ways to worship, grow, belong and serve." />
      <section className="section container">
        {ministries.map((m) => (
          <article key={m.id} id={m.id} className={`ministry ${m.image ? "has-photo" : ""}`}>
            <div className="ministry-icon"><m.icon size={40} aria-hidden="true" /></div>
            <div>
              <h2>{m.title}</h2>
              <p>{m.description}</p>
              <p className="meta">Meets: {m.meets}</p>
            </div>
            {m.image && <Photo src={m.image} alt={m.title} className="ministry-photo" />}
          </article>
        ))}
      </section>
    </>
  );
}
