// Contact page: address, social links, map and the message form (email is switched on in src/data/site.js).
import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SocialLinks from "../components/SocialLinks";
import MapEmbed from "../components/MapEmbed";
import { site, contactFormUrl, isPlaceholder } from "../data/site";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | notset
  const whatsappReady = !isPlaceholder(site.whatsapp);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contactFormUrl) { setStatus("notset"); return; } // email not connected yet (see data/site.js)
    setStatus("sending");
    try {
      const res = await fetch(contactFormUrl, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <PageHeader title="Contact us" intro="We would love to hear from you and welcome you in person." />
      <section className="section container contact-grid">
        <div>
          <h2>Visit or get in touch</h2>
          <ul className="contact-list">
            <li><MapPin aria-hidden="true" /> <span>{site.address}</span></li>
            <li><MapPin aria-hidden="true" /> <span>Postal address: {site.postalAddress}</span></li>
            <li><Phone aria-hidden="true" /> <span>{site.phone}</span></li>
            <li><Mail aria-hidden="true" /> <span>{site.email}</span></li>
          </ul>
          <p className="meta">Follow us</p>
          <SocialLinks />
          <MapEmbed />
        </div>

        <form onSubmit={handleSubmit} className="form">
          <h2>Send a message</h2>
          {status === "sent" ? (
            <p className="success" role="status">Thank you. Your message has been sent and we will reply soon.</p>
          ) : (
            <>
              <label>Your name<input name="name" required autoComplete="name" /></label>
              <label>Email address<input name="email" type="email" required autoComplete="email" /></label>
              <label>Phone (optional)<input name="phone" type="tel" autoComplete="tel" /></label>
              <label>Message<textarea name="message" rows="5" required /></label>
              {/* Hidden fields: the first catches spam bots, the second sets the email subject */}
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
              <input type="hidden" name="_subject" value="New message from the God's Vineyard Sanctuary website" />

              {status === "notset" && (
                <p className="success" role="status">
                  Sending by email is not switched on yet, so this message was not sent.
                  {whatsappReady && <> Please <a className="text-link" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">message us on WhatsApp</a> instead.</>}
                </p>
              )}
              {status === "error" && <p role="alert">Something went wrong. Please try again or contact us on WhatsApp.</p>}
              <button className="btn btn-green" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
            </>
          )}
        </form>
      </section>
    </>
  );
}
