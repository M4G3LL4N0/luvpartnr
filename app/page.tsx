import Link from "next/link";
import { ProductHonestyNote } from "@/components/ProductHonestyNote";

const features = [
  {
    title: "Private case files",
    text: "Organize relationship history, conversations, promises, concerns, and observations in one structured place.",
  },
  {
    title: "Pattern tracking",
    text: "Separate isolated moments from repeated behavior so you can make clearer decisions.",
  },
  {
    title: "Risk and compatibility",
    text: "Review trust, consistency, communication quality, emotional maturity, and long-term fit.",
  },
];

const timelineItems = [
  "Timeline evidence",
  "Communication patterns",
  "Compatibility signals",
  "Risk and repair markers",
];

const signals = ["Facts first", "Private memory", "Decision support", "Communication clarity"];

export default function HomePage() {
  return (
    <div>
      <section className="hero" data-reveal>
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">Relationship Intelligence System</div>

            <h1>Understand people before you commit.</h1>

            <p>
              LUVPARTNR turns relationship notes, messages, events, and uncertainty into private case files,
              structured reports, risk signals, and clearer next steps.
            </p>

            <div className="actions">
              <Link href="/signup" className="btn btn-primary" aria-label="Primary action">
                Start private analysis
              </Link>
              <Link href="/sample-report" className="btn btn-secondary">
                View sample report
              </Link>
            </div>
          </div>

          <div className="preview-card">
            <div className="preview-inner">
              <div className="preview-top">
                <div>
                  <div className="preview-label">Case file</div>
                  <div className="preview-title">Commitment decision</div>
                </div>
                <span className="status-pill">Private</span>
              </div>

              <div className="signal-list">
                {timelineItems.map((item) => (
                  <div className="signal-item" key={item}>
                    {item}
                  </div>
                ))}
              </div>

              <div className="report-box">
                <div className="preview-label">Sample report summary</div>
                <p>
                  Illustrated case file: warmth signals can sit next to consistency and conflict-repair notes so you
                  review evidence before escalating commitment. This is a product preview, not a scored customer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="container">
          <div className="feature-grid">
            {features.map((feature) => (
              <div className="card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>

          <div className="wide-card">
            <div className="wide-grid">
              <div>
                <div className="eyebrow">How it works</div>
                <h2>Turn confusion into a structured file.</h2>
              </div>

              <div className="signal-grid">
                {signals.map((signal) => (
                  <div className="mini-card" key={signal}>
                    <strong>{signal}</strong>
                    <span>
                      Designed to help you slow down, organize evidence, and make better relationship decisions.
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ethics">
            <h2>Decision support, not surveillance.</h2>
            <p>
              LUVPARTNR is built for private reflection and structured thinking. It is not therapy, legal advice, or a
              dating app. It is not for stalking, harassment, secret surveillance, public exposure, or claiming
              certainty from limited evidence.
            </p>
          </div>
        </div>
      </section>

      <ProductHonestyNote status="early-mvp" />
    </div>
  );
}
