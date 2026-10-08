import React, { useEffect, useMemo, useRef, useState } from "react";

import { createRoot } from "react-dom/client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Heart,
  MapPin,
  Menu,
  Music2,
  Pause,
  Play,
  Share2,
  Sparkles,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";

import "./index.css";
import LandingPage from "./components/Landingpage";

import rose from "./assets/rose-botanical.png";

import lavender from "./assets/lavender-botanical.png";

import sage from "./assets/sage-botanical.png";

import peach from "./assets/peach-botanical.png";

import gold from "./assets/gold-botanical.png";

import blue from "./assets/blue-botanical.png";

const event = {
  name: "Talari Lasya",

  date: "2026-10-26",

  time: "09:30",

  lunch: "12:00",

  venue: "Sitarama Function Hall",

  address: "Station Road, Near Taluka Office, Kaikaluru, Eluru District",
};

const photos = [
  [
    "/photos/photo-01.jpg",

    "A little moment worth remembering",

    "The first frame of a day made for memories.",
  ],

  [
    "/photos/photo-02.jpg",

    "A celebration in bloom",

    "Soft light, bright smiles and a beautiful beginning.",
  ],

  [
    "/photos/photo-03.jpg",

    "Lasya",

    "A name that carries the heart of the celebration.",
  ],

  [
    "/photos/photo-04.jpg",

    "Family, faith & joy",

    "The people who make every milestone meaningful.",
  ],

  [
    "/photos/photo-05.jpg",

    "See you there",

    "One more frame before the celebration begins.",
  ],
];

function useCountdown() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);

    return () => clearInterval(i);
  }, []);

  const target = new Date("2026-10-26T09:30:00+05:30").getTime();

  let d = Math.max(0, target - now);

  return {
    days: Math.floor(d / 86400000),

    hours: Math.floor((d % 86400000) / 3600000),

    minutes: Math.floor((d % 3600000) / 60000),

    seconds: Math.floor((d % 60000) / 1000),
  };
}

function Reveal({ children, className = "", delay = 0, y = 45 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Floral({ src, side = "right", className = "" }) {
  return (
    <motion.img
      src={src}
      aria-hidden="true"
      className={`pointer-events-none absolute w-[min(48vw,560px)] opacity-55 mix-blend-multiply ${side === "left" ? "left-[-10%] scale-x-[-1]" : "right-[-10%]"} ${className}`}
      initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
      whileInView={{ opacity: 0.55, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.3, ease: "easeOut" }}
    />
  );
}

function App() {
  const [open, setOpen] = useState(false),
    [menu, setMenu] = useState(false),
    [music, setMusic] = useState(false),
    [rsvp, setRsvp] = useState(false),
    [shareMsg, setShareMsg] = useState(""),
    [copied, setCopied] = useState(false);

  const audio = useRef(null);

  const countdown = useCountdown();

  const { scrollYProgress } = useScroll();

  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const move = (e) => {
      const d = document.querySelector(".cursor-dot");

      if (d) {
        d.style.left = e.clientX + "px";

        d.style.top = e.clientY + "px";
      }
    };

    window.addEventListener("pointermove", move);

    return () => window.removeEventListener("pointermove", move);
  }, []);

  const addCalendar = () => {
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Talari Lasya//Half Saree Ceremony//EN\nBEGIN:VEVENT\nDTSTART:20261026T040000Z\nDTEND:20261026T073000Z\nSUMMARY:Talari Lasya — Half Saree Ceremony\nLOCATION:Sitarama Function Hall, Station Road, Near Taluka Office, Kaikaluru, Eluru District\nDESCRIPTION:Half Saree Ceremony of Talari Lasya. Lunch from 12:00 noon onwards.\nEND:VEVENT\nEND:VCALENDAR`;

    const a = document.createElement("a");

    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));

    a.download = "Talari-Lasya-Half-Saree-Ceremony.ics";

    a.click();

    URL.revokeObjectURL(a.href);
  };

  const copyDetails = async () => {
    await navigator.clipboard?.writeText(
      `Talari Lasya — Half Saree Ceremony\n26 October 2026 · 9:30 AM\n${event.venue}\n${event.address}`,
    );

    setCopied(true);

    setTimeout(() => setCopied(false), 1800);
  };

  const share = async () => {
    const data = {
      title: "Talari Lasya — Half Saree Ceremony",

      text: "Join us for Talari Lasya’s Half Saree Ceremony on 26 October 2026 at 9:30 AM.",
    };

    if (navigator.share) await navigator.share(data);
    else {
      await navigator.clipboard?.writeText(location.href);

      setShareMsg("Invitation link copied");

      setTimeout(() => setShareMsg(""), 1800);
    }
  };

  const toggleMusic = async () => {
    if (!audio.current) return;

    if (music) {
      audio.current.pause();

      setMusic(false);
    } else {
      try {
        await audio.current.play();

        setMusic(true);
      } catch {
        setShareMsg("Add public/music/instrumental.mp3 to enable music");

        setTimeout(() => setShareMsg(""), 2400);
      }
    }
  };

  return (
    <div className="paper min-h-screen">
      <div className="cursor-dot hidden md:block" />

      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-[#b08d57] z-[90]"
        style={{ scaleX: scrollYProgress }}
      />

      <audio ref={audio} src="/music/instrumental.mp3" loop preload="none" />

      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-[80] w-[min(92vw,1120px)] rounded-full border border-white/50 bg-[#f7f0e8]/75 backdrop-blur-xl shadow-lux px-4 py-3 flex items-center justify-between">
        <a href="#home" className="display text-xl tracking-wide">
          TL
        </a>

        <div className="hidden md:flex items-center gap-6 text-[10px] caps text-[#665653]">
          <a href="#blessing">Blessing</a>

          <a href="#invitation">Invitation</a>

          <a href="#details">Details</a>

          <a href="#venue">Venue</a>

          <a href="#gallery">Gallery</a>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={share}
            className="p-2 rounded-full hover:bg-white/60"
            aria-label="Share"
          >
            <Share2 size={15} />
          </button>

          <button
            onClick={toggleMusic}
            className="p-2 rounded-full hover:bg-white/60"
            aria-label="Music"
          >
            {music ? <Volume2 size={15} /> : <Music2 size={15} />}
          </button>

          <button
            className="md:hidden p-2 rounded-full hover:bg-white/60"
            onClick={() => setMenu((v) => !v)}
            aria-label="Menu"
          >
            {menu ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute top-14 right-0 w-48 rounded-2xl bg-[#fbf6f0]/95 border border-white shadow-lux p-4 flex flex-col gap-4 text-xs"
            >
              <a onClick={() => setMenu(false)} href="#blessing">
                Blessing
              </a>

              <a onClick={() => setMenu(false)} href="#invitation">
                Invitation
              </a>

              <a onClick={() => setMenu(false)} href="#details">
                Details
              </a>

              <a onClick={() => setMenu(false)} href="#venue">
                Venue
              </a>

              <a onClick={() => setMenu(false)} href="#gallery">
                Gallery
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* =====================================================
          LANDING PAGE
          ===================================================== */}

      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            className="fixed inset-0 z-[100]"
          >
            <LandingPage onOpenInvitation={() => setOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <main className={open ? "" : "h-screen overflow-hidden"}>
        <section
          id="home"
          className="relative min-h-screen snap-panel overflow-hidden flex items-center justify-center pt-24 bg-[#e9d6ce]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,250,244,.8),rgba(225,201,195,.35)_55%,rgba(77,58,54,.08))]" />

          <Floral src={rose} side="left" className="top-0" />

          <Floral src={peach} side="right" className="bottom-[-6%]" />

          <motion.div
            className="relative z-10 text-center px-6"
            initial={{ opacity: 0, y: 60 }}
            animate={open ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="caps text-[10px] text-[#775f58] mb-5">
              A day of faith · family · celebration
            </div>

            <div className="text-2xl md:text-4xl display">Talari's</div>

            <h1 className="display text-[clamp(4rem,13vw,10rem)] leading-[.72] tracking-[-.05em] text-[#3f3230] mt-3">
              Half Saree
            </h1>

            <div className="script text-[clamp(4rem,10vw,8rem)] text-[#a06470] -mt-1">
              Ceremony
            </div>

            <div className="mt-8 flex justify-center items-center gap-4 text-[#715a56]">
              <span className="h-px w-12 bg-[#b08d57]" />

              <span className="caps text-[10px]">Talari Lasya</span>

              <span className="h-px w-12 bg-[#b08d57]" />
            </div>

            <div className="mt-7 flex justify-center items-end gap-3">
              <span className="display text-5xl md:text-7xl">26</span>

              <span className="caps text-xs leading-5 text-left">
                October
                <br />
                2026
              </span>
            </div>

            <div className="mt-3 caps text-[11px]">Monday · 9:30 AM</div>

            <a
              href="#blessing"
              className="mt-12 inline-flex items-center gap-2 text-[10px] caps border-b border-[#725d57]/40 pb-2"
            >
              Scroll into the story <ArrowDown size={13} />
            </a>
          </motion.div>
        </section>

        <section
          id="blessing"
          className="relative min-h-[92vh] snap-panel overflow-hidden flex items-center justify-center bg-[#e7e0ec]"
        >
          <Floral src={lavender} side="right" className="top-[-4%]" />

          <Floral src={blue} side="left" className="bottom-[-10%]" />

          <div className="relative z-10 w-[min(90vw,900px)] text-center">
            <Reveal>
              <div className="text-[#9c7b9b] text-2xl">✦</div>

              <div className="caps text-[9px] mt-5 text-[#665867]">
                A blessing for her journey
              </div>

              <blockquote className="display text-[clamp(2.5rem,6vw,5.8rem)] leading-[.95] mt-7 text-[#433b45]">
                “For I Know the plans
                <br className="hidden md:block" /> I have for you,”
              </blockquote>

              <div className="serif italic text-xl md:text-2xl mt-7 text-[#6b606a]">
                declares the Lord
              </div>

              <div className="hairline w-24 mx-auto mt-8" />

              <div className="caps text-[10px] mt-6 tracking-[.34em]">
                Jeremiah 29:11
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="invitation"
          className="relative min-h-screen snap-panel overflow-hidden bg-[#f5e3df] flex items-center py-28"
        >
          <Floral src={peach} side="left" className="top-[-5%] opacity-30" />

          <Floral
            src={rose}
            side="right"
            className="bottom-[-10%] opacity-25"
          />

          <div className="relative z-10 w-[min(92vw,1100px)] mx-auto grid md:grid-cols-[.7fr_1.3fr] gap-12 items-center">
            <Reveal>
              <div className="caps text-[10px] text-[#8f626b]">
                The invitation
              </div>

              <div className="display text-6xl md:text-8xl mt-4 leading-[.85]">
                A day
                <br />
                for her.
              </div>

              <div className="script text-6xl text-[#a06470] mt-3">Lasya</div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="rounded-[3rem] bg-[#fbf5ef] shadow-lux border border-white p-9 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-52 h-52 rounded-full bg-[#e6d1d9]/55 blur-2xl" />

                <div className="caps text-[9px] text-[#80696a]">
                  With the blessings of
                </div>

                <p className="display text-2xl md:text-3xl mt-5">
                  Mr. Talari Pethururu & Mrs. Victoriaamma
                </p>

                <p className="serif text-xl md:text-2xl leading-relaxed mt-8">
                  We cordially invite you to grace the occasion and shower your
                  blessings on our daughter.
                </p>

                <div className="hairline my-9" />

                <div className="script text-6xl md:text-7xl text-[#9b6470]">
                  Talari Lasya's
                </div>

                <div className="display caps text-xl md:text-2xl mt-2 tracking-[.22em]">
                  Half Saree Ceremony
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  <button
                    onClick={() => setRsvp(true)}
                    className="rounded-full bg-[#493936] text-white px-6 py-3 text-[10px] caps"
                  >
                    RSVP
                  </button>

                  <button
                    onClick={addCalendar}
                    className="rounded-full border border-[#9e7e79]/35 px-6 py-3 text-[10px] caps"
                  >
                    Add to Calendar
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="details"
          className="relative min-h-screen snap-panel overflow-hidden bg-[#dfe9e6] flex items-center py-28"
        >
          <Floral src={sage} side="right" className="top-[-6%]" />

          <Floral src={gold} side="left" className="bottom-[-15%]" />

          <div className="relative z-10 w-[min(90vw,1100px)] mx-auto">
            <Reveal>
              <div className="text-center">
                <div className="caps text-[9px] text-[#68766f]">
                  Mark the date
                </div>

                <div className="display text-[clamp(5rem,15vw,11rem)] leading-[.75] mt-8 text-[#3e4c48]">
                  26
                </div>

                <div className="caps text-sm mt-5 tracking-[.5em]">
                  October · 2026
                </div>

                <div className="hairline w-32 mx-auto my-8" />

                <div className="display text-3xl">9:30 AM</div>

                <div className="serif italic text-xl mt-2">
                  Lunch · 12:00 noon onwards
                </div>

                <p className="serif text-2xl md:text-3xl mt-10 text-[#53635e]">
                  Join us to celebrate love, laughter & blessings.
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid grid-cols-4 gap-2 md:gap-4 max-w-2xl mx-auto">
              {Object.entries(countdown).map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-2xl bg-white/55 border border-white/70 p-3 md:p-5 text-center"
                >
                  <div className="display text-2xl md:text-4xl">
                    {String(v).padStart(2, "0")}
                  </div>

                  <div className="caps text-[7px] mt-2 text-[#68766f]">{k}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={copyDetails}
                className="inline-flex items-center gap-2 text-[9px] caps rounded-full border border-[#64766f]/30 px-5 py-3"
              >
                {copied ? <Sparkles size={13} /> : <Copy size={13} />}{" "}
                {copied ? "Details copied" : "Copy event details"}
              </button>
            </div>
          </div>
        </section>

        <section
          id="venue"
          className="relative min-h-[85vh] snap-panel overflow-hidden bg-[#f0e0cc] flex items-center py-28"
        >
          <Floral src={gold} side="right" className="top-[-12%]" />

          <div className="relative z-10 w-[min(90vw,1000px)] mx-auto text-center">
            <Reveal>
              <div className="inline-flex p-4 rounded-full bg-white/55 border border-white">
                <MapPin size={20} />
              </div>

              <div className="caps text-[9px] text-[#836d58] mt-7">
                The place
              </div>

              <h2 className="display text-[clamp(3.5rem,8vw,7rem)] leading-[.9] mt-4">
                Sitarama
                <br />
                <span className="script text-[#a47756]">Function Hall</span>
              </h2>

              <p className="serif text-xl md:text-2xl mt-8 leading-relaxed">
                Station Road,
                <br />
                Near Taluka Office,
                <br />
                Kaikaluru, Eluru District
              </p>

              <div className="mt-9 flex justify-center gap-3 flex-wrap">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https\://www.google.com/maps/search/?api=1&query=Sitarama+Function+Hall+Kaikaluru"
                  className="rounded-full bg-[#4a3d36] text-white px-7 py-3 text-[10px] caps inline-flex items-center gap-2"
                >
                  View Location <ExternalLink size={13} />
                </a>

                <button
                  onClick={share}
                  className="rounded-full border border-[#8e765e]/35 px-7 py-3 text-[10px] caps inline-flex items-center gap-2"
                >
                  Share <Share2 size={13} />
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative min-h-[78vh] snap-panel overflow-hidden bg-[#e6d8d0] flex items-center">
          <Floral src={rose} side="left" className="top-[-8%]" />

          <div className="relative z-10 w-[min(90vw,1050px)] mx-auto text-center">
            <Reveal>
              <div className="caps text-[9px] text-[#8a6862]">
                With love & blessings
              </div>

              <div className="display text-[clamp(3.5rem,8vw,7rem)] mt-5 leading-[.9]">
                Family
                <br />
                <span className="script text-[#9c6470]">& loved ones</span>
              </div>

              <div className="hairline w-28 mx-auto my-10" />

              <div className="grid md:grid-cols-2 gap-10 text-center">
                <div>
                  <p className="caps text-[8px] text-[#8b716d]">Invited by</p>

                  <p className="display text-2xl mt-4">
                    Mr. Talari Samuel Kanth & Mrs. Vimala
                  </p>

                  <p className="display text-2xl mt-2">
                    Mr. Talari John Wilson & Mrs. Mani
                  </p>
                </div>

                <div>
                  <p className="caps text-[8px] text-[#8b716d]">
                    With best compliments from
                  </p>

                  <p className="display text-2xl mt-4">
                    Brother: Johanan Finnu
                  </p>

                  <p className="display text-2xl mt-2">Sister: Hasini</p>

                  <p className="serif italic text-lg mt-2">
                    and Near & Dear...
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="gallery"
          className="relative bg-[#2f2929] text-[#f8efe7] snap-panel"
        >
          <div className="sticky top-0 h-screen overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(178,137,126,.25),transparent_45%)]" />

            <div className="absolute top-8 left-6 md:left-12 caps text-[9px] text-white/55 z-20">
              The gallery · one frame at a time
            </div>

            <div className="absolute top-8 right-6 md:right-12 text-[9px] caps text-white/55 z-20">
              Scroll ↓
            </div>

            <div className="h-full overflow-y-auto snap-y no-scrollbar">
              {photos.map(([src, title, desc], i) => (
                <div
                  key={src}
                  className="snap-panel h-screen relative grid place-items-center px-5"
                >
                  <motion.img
                    src={src}
                    className="absolute inset-0 w-full h-full object-cover opacity-65"
                    initial={{ scale: 1.12 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ amount: 0.65 }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

                  <motion.div
                    className="relative z-10 w-[min(88vw,850px)]"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.5 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="caps text-[9px] text-white/65">
                      0{i + 1} / 05
                    </div>

                    <h3 className="display text-[clamp(3rem,8vw,7rem)] leading-[.85] mt-4">
                      {title}
                    </h3>

                    <p className="serif text-xl md:text-2xl max-w-lg mt-6 text-white/75">
                      {desc}
                    </p>
                  </motion.div>

                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {photos.map((_, j) => (
                      <span
                        key={j}
                        className={`w-1.5 h-1.5 rounded-full ${j === i ? "bg-white" : "bg-white/35"}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative min-h-[95vh] snap-panel overflow-hidden bg-[#d8d1e2] flex items-center justify-center">
          <Floral src={blue} side="left" className="top-[-10%]" />

          <Floral src={lavender} side="right" className="bottom-[-15%]" />

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute block w-2 h-4 rounded-full bg-[#b89aa8]/55"
                style={{
                  left: `${(i * 29) % 100}%`,

                  top: `${(i * 17) % 100}%`,

                  rotate: i * 23,
                }}
                animate={{
                  y: [0, -45, 10],

                  x: [0, i % 2 ? 22 : -22, 0],

                  rotate: [i * 23, i * 23 + 120, i * 23 + 240],

                  opacity: [0, 0.75, 0],
                }}
                transition={{
                  duration: 4.5 + (i % 4) * 0.8,

                  delay: i * 0.18,

                  repeat: Infinity,

                  ease: "easeInOut",
                }}
              />
            ))}

            <motion.div
              className="absolute left-1/2 top-1/2 w-[min(80vw,700px)] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30"
              animate={{ scale: [0.85, 1.08, 0.85], rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="absolute left-1/2 top-1/2 w-[min(60vw,520px)] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a9869d]/20"
              animate={{ scale: [1.05, 0.86, 1.05], rotate: -360 }}
              transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="relative z-10 text-center">
            <Reveal>
              <div className="caps text-[9px] text-[#655d70]">
                One last page
              </div>

              <div className="script text-[clamp(6rem,16vw,12rem)] text-[#7f6b8e] leading-[.75] mt-8">
                Thank you
              </div>

              <div className="display text-4xl md:text-6xl mt-7">
                for being part of our celebration.
              </div>

              <div className="hairline w-28 mx-auto my-9" />

              <div className="caps text-[10px] tracking-[.35em]">
                With Love · Talari Family
              </div>

              <div className="script text-6xl text-[#7f6b8e] mt-4">Lasya</div>

              <div className="mt-8 flex justify-center gap-3 flex-wrap">
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="rounded-full bg-[#403846] text-white px-7 py-3 text-[10px] caps inline-flex items-center gap-2"
                >
                  Back to the beginning <ArrowUpRight size={13} />
                </button>

                <button
                  onClick={share}
                  className="rounded-full border border-[#665d70]/30 px-7 py-3 text-[10px] caps"
                >
                  Share the invitation
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="bg-[#342d2d] text-[#e9ded5] py-10 text-center">
          <div className="script text-4xl">Talari Lasya</div>

          <div className="caps text-[8px] mt-3 opacity-60">
            26 October 2026 · 9:30 AM · Kaikaluru
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {rsvp && (
          <motion.div
            className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm grid place-items-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="w-[min(92vw,520px)] rounded-[2rem] bg-[#fbf5ef] shadow-lux p-8 md:p-10 relative"
            >
              <button
                onClick={() => setRsvp(false)}
                className="absolute top-5 right-5 p-2"
              >
                <X size={18} />
              </button>

              <div className="caps text-[9px] text-[#80696a]">
                A little note
              </div>

              <h3 className="display text-5xl mt-3">Will you join us?</h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  setRsvp(false);

                  setShareMsg(
                    "Thank you — your RSVP was noted on this device.",
                  );
                }}
                className="mt-7 space-y-4"
              >
                <input
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-[#cbb9ad] bg-white/70 p-4 outline-none"
                />

                <select className="w-full rounded-xl border border-[#cbb9ad] bg-white/70 p-4">
                  <option>Joyfully attending</option>

                  <option>Unable to attend</option>
                </select>

                <textarea
                  placeholder="A short blessing (optional)"
                  className="w-full rounded-xl border border-[#cbb9ad] bg-white/70 p-4 min-h-28 outline-none"
                />

                <button className="w-full rounded-full bg-[#493936] text-white py-4 caps text-[10px]">
                  Send RSVP
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shareMsg && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[130] rounded-full bg-[#3c3230] text-white px-5 py-3 text-xs shadow-xl"
          >
            {shareMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
