// A person on the About page (founder, leader...). With a photo: shown whole, never cropped.
// Without a photo: a round green placeholder. The data lives in src/data/about.js.
export default function PersonCard({ person }) {
  return (
    <div className="person">
      {person.photo ? (
        <img className="person-photo" src={person.photo} alt={`${person.name}, ${person.role}`} loading="lazy" />
      ) : (
        <div className="avatar" aria-hidden="true" />
      )}
      <h3>{person.name}</h3>
      <p className="meta">{person.role}</p>
      {person.bio && <p>{person.bio}</p>}
    </div>
  );
}
