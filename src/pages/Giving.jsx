import { useState } from "react";
import { Smartphone, Copy, Check, CreditCard } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Photo from "../components/Photo";
import { images } from "../data/site";

// Fill these in with the church's REAL M-Pesa details. Nothing here is real.
const mpesa = {
  type: "[PAYBILL or TILL NUMBER]",
  number: "[BUSINESS / TILL NUMBER]",
  account: "[ACCOUNT NAME / REFERENCE]",
  accountName: "[REGISTERED NAME SHOWN ON M-PESA]",
};

export default function Giving() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(mpesa.number).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <>
      <PageHeader title="Giving" intro="Thank you for supporting the work of God's Vineyard with a generous heart." />
      <section className="section container split">
        <div>
          <h2>Give with M-Pesa</h2>
          <ol className="steps">
            <li>Open M-Pesa on your phone and choose <strong>Lipa na M-Pesa</strong>.</li>
            <li>Select <strong>{mpesa.type}</strong> and enter the number below.</li>
            <li>Enter the account or reference, then your amount.</li>
            <li>Check that the name shown matches the church, then enter your M-Pesa PIN.</li>
          </ol>
          <div className="give-box">
            <Smartphone aria-hidden="true" />
            <dl>
              <div><dt>Type</dt><dd>{mpesa.type}</dd></div>
              <div><dt>Number</dt><dd>{mpesa.number}</dd></div>
              <div><dt>Account</dt><dd>{mpesa.account}</dd></div>
              <div><dt>Name</dt><dd>{mpesa.accountName}</dd></div>
            </dl>
            <button className="btn btn-outline-dark" onClick={copy}>
              {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />} {copied ? "Copied" : "Copy number"}
            </button>
          </div>
        </div>
        <Photo src={images.giving} alt="God's Vineyard community" className="split-photo" />
      </section>

      {/* PAYMENT GATEWAY PLACEHOLDER:
          Later, replace this block with a Flutterwave, Paystack, Pesapal or Stripe checkout
          button or embed. Keep the same section so the page layout does not change. */}
      <section className="section section-ivory">
        <div className="container gateway">
          <CreditCard size={28} aria-hidden="true" />
          <div>
            <h2>Card and online giving</h2>
            <p>Online card and mobile payments will be available here soon.</p>
          </div>
          <button className="btn btn-outline-dark" disabled>Coming soon</button>
        </div>
      </section>
    </>
  );
}
