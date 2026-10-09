import { ArrowDown, Sparkles } from "lucide-react";
import "./Landingpage.css";

export default function LandingPage({ onOpenInvitation }) {
  return (
    <section className="landing-page">
      {/* Background image */}
      <div
        className="landing-image"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}photos/landingimg.jpg')`,
        }}
      />

      {/* Dark cinematic overlay */}
      <div className="landing-overlay" />
      {/* Top header */}
      {/* Top scrolling Bible verse header */}
      <header className="landing-header" aria-label="Bible verse">
        <div className="landing-header-marquee">
          <div className="landing-header-track">
            {/* First copy */}
            <span>
              “For I know the plans I have for you,”
              <em> declares the Lord </em>— Jeremiah 29:11
            </span>
            <span className="verse-separator" aria-hidden="true">
              ✦
            </span>

            {/* Second copy — identical for seamless scrolling */}
            <span aria-hidden="true">
              “For I know the plans I have for you,”
              <em> declares the Lord </em>— Jeremiah 29:11
            </span>
            <span className="verse-separator" aria-hidden="true">
              ✦
            </span>
          </div>
        </div>
      </header>

      {/* Main hero content */}
      <main className="landing-content landing-hero-card">
        {/* Date with horizontal lines */}
        <div className="hero-date-row">
          <span />
          <p className="landing-date">26 OCTOBER 2026</p>
          <span />
        </div>

        {/* Ceremony label */}
        <p className="hero-eyebrow">A SPECIAL CELEBRATION</p>

        {/* Main title */}
        <h1 className="landing-title">
          Half Saree
          <span>Ceremony</span>
        </h1>

        {/* Name */}
        <p className="landing-name">Lasya</p>

        {/* Subtitle */}
        <p className="landing-subtitle">
          WE INVITE YOU TO CELEBRATE
          <br />
          THIS SPECIAL DAY WITH US
        </p>

        {/* Invitation panel */}
        <div className="guest-card">
          <p className="guest-label">Together with our families</p>
          <p className="guest-name">You're Invited</p>

          <button className="open-invitation" onClick={onOpenInvitation}>
            <span>Open Invitation</span>
            <ArrowDown size={15} strokeWidth={1.5} />
          </button>
        </div>
      </main>
    </section>
  );
}
