// About page. All text comes from src/data/about.js; the history photo is /public/images/about.jpg.
import PageHeader from "../components/PageHeader";
import PersonCard from "../components/PersonCard";
import Photo from "../components/Photo";
import { images } from "../data/site";
import { history, founders, leaders, vision, mission, beliefs, values } from "../data/about";

export default function About() {
  return (
    <>
      <PageHeader title="About God's Vineyard Sanctuary" intro="Who we are, what we believe and the people who serve you." />

      {/* Church history + photo */}
      <section className="section container split">
        <div>
          <h2>Our history</h2>
          {history.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <Photo src={images.about} alt="God's Vineyard Sanctuary church family" className="split-photo" />
      </section>

      {/* Founders (photos: see src/data/about.js) */}
      <section className="section section-ivory">
        <div className="container">
          <h2>Our founders</h2>
          <div className="list-grid">
            {founders.map((f, i) => <PersonCard key={i} person={f} />)}
          </div>
        </div>
      </section>

      {/* Vision and mission */}
      <section className="section section-green">
        <div className="container vm">
          <div><h2>Vision</h2><p>{vision}</p></div>
          <div><h2>Mission</h2><p>{mission}</p></div>
        </div>
      </section>

      {/* Beliefs and values */}
      <section className="section container">
        <h2>What we believe</h2>
        <dl className="beliefs">
          {beliefs.map((b) => (<div key={b.title}><dt>{b.title}</dt><dd>{b.text}</dd></div>))}
        </dl>
        <h2 className="mt">Our values</h2>
        <ul className="values">{values.map((v, i) => <li key={i}>{v}</li>)}</ul>
      </section>

      {/* Church leadership, including the keynote speaker */}
      <section className="section section-ivory">
        <div className="container">
          <h2>Church leadership</h2>
          <div className="leaders">
            {leaders.map((l, i) => <PersonCard key={i} person={l} />)}
          </div>
        </div>
      </section>
    </>
  );
}
