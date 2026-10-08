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
      <header className="landing-header">
        <div className="header-title">TALARI'S HALF SAREE</div>
      </header>
      {/* Main hero content */}
      <main className="landing-content">
        {/* Decorative element */}
        <div className="landing-ornament">
          <span className="ornament-line" />
          <Sparkles size={15} strokeWidth={1.2} />
          <span className="ornament-line" />
        </div>

        {/* Date */}
        <p className="landing-date">26 OCTOBER 2026</p>

        {/* Main title */}
        <h1 className="landing-title">
          HALF SAREE
          <span>CEREMONY</span>
        </h1>

        {/* Name */}
        <p className="landing-name">LASYA</p>

        {/* Subtitle */}
        <p className="landing-subtitle">
          WE INVITE YOU TO CELEBRATE
          <br />
          THIS SPECIAL DAY WITH US
        </p>

        {/* Guest card */}
        <div className="guest-card">
          <p className="guest-label">Dear Sir / Madam</p>

          <p className="guest-name">Guests Name</p>

          <div className="guest-divider" />

          <button className="open-invitation" onClick={onOpenInvitation}>
            <span>Open Invitation</span>
            <ArrowDown size={15} strokeWidth={1.5} />
          </button>
        </div>
      </main>
      {/* Bottom scroll hint */}
      <div className="scroll-hint">
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown size={14} strokeWidth={1.2} />
      </div>
    </section>
  );
}
