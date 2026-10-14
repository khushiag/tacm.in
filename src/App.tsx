import { useEffect, useRef, useState } from "react";
import galleryImages from "./galleryData.json";

const catColor: Record<string, string> = {
  Nebula: "#e07aa5", Galaxy: "#8aa4ff", Moon: "#cfd3da",
  Planet: "#e8a55a", "Star Cluster": "#7fd1c7", "Night Sky": "#6b7fd7",
};

const PAGE = 8; // photos shown per "load more"
const categories = ["All", ...Array.from(new Set(galleryImages.map((g: any) => g.cat)))];

const Icons = {
  instagram: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  ),
  linkedin: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  facebook: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  twitter: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
  mail: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  arrow: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
};

const team = [
  { name: "Khushi Agarwal", role: "President", img: "/images/board pictures/Khushi.jpeg", linkedin: "https://www.linkedin.com/in/khushiagarwl" },
  { name: "Prisha Kumra", role: "Vice President", img: "/images/board pictures/Prisha.jpg", linkedin: "https://www.linkedin.com/in/prisha-kumra-8692b7311/" },
  { name: "Pranav Bijurkar", role: "Treasurer", img: "/images/board pictures/Pranav.png", linkedin: "https://www.linkedin.com/in/pranav-bijurkar-0b2389342/" },
  { name: "Amrutha M", role: "General Secretary", img: "/images/board pictures/Amrutha.jpg", linkedin: "https://www.linkedin.com/in/amrutha-m-1730433a8/" },
  { name: "Sahasra Badam Sai", role: "Head of HR", img: "/images/board pictures/Sahasra.jpg", linkedin: "https://www.linkedin.com/in/sai-sahasra-badam-75042131b/" },

  { name: "Anmol Kesarwani", role: "Technical Head – Applied Projects", img: "/images/board pictures/Anmol.jpg", linkedin: "https://www.linkedin.com/in/anmol-kesarwani/" },
  { name: "Siddharth Sudheer", role: "Technical Head – Research", img: "/images/board pictures/Pari.jpg", linkedin: "https://www.linkedin.com/in/siddharth-sudheer-9b2552322/" },
  { name: "Trishanth Bharath", role: "Astrophotography", img: "/images/board pictures/Trishanth.jpg", linkedin: "https://www.linkedin.com/in/trishanth-bharath-82439b328/" },
  { name: "Brunda S M", role: "SM & Content", img: "/images/board pictures/Brunda.jpg", linkedin: "https://www.linkedin.com/in/brunda-s-m-ab1082381/" },
  { name: "Prisha Kumra", role: "SM & Content", img: "/images/board pictures/Prisha.jpg", linkedin: "https://www.linkedin.com/in/prisha-kumra-8692b7311/" },
  { name: "Krtin Vishnu Vardhan", role: "Graphic Design", img: "/images/board pictures/Krtin.jpeg", linkedin: "https://www.linkedin.com/in/krtinv/" },
  { name: "Devanshi Thakur", role: "Graphic Design", img: "/images/board pictures/Devanshi.jpg", linkedin: "https://www.linkedin.com/in/devanshi-thakur-22jan06/" },
  { name: "Siddharth Sudeep Edakkattu", role: "Podcast Head", img: "/images/board pictures/Batak.jpg", linkedin: "https://www.linkedin.com/in/siddharth-sudeep-a6a794352/" },
];

const eventsData = [
  { k:"01", cursor:"STARGAZING", title: "Star Gazing Nights", desc: "Equipped with telescopes, a will to explore and guided by enthusiasts, participants immerse themselves in galaxies, constellations and planets.", img: "/images/stargazingnight.png", tag: "EVERY FORTNIGHT" },
  { k:"02", cursor:"SEMINAR", title: "Seminar with the Experts", desc: "Renowned astronomers share latest research from black holes to origins of the universe. Interactive Q&A, live demos, papers.", img: "/images/expert-talks.png", tag: "EXPERT TALKS" },
  { k:"03", cursor:"PLANETARIUM", title: "Planetarium Visits", desc: "Immersive dome-shaped theater at Dr. TMA Pai Planetarium. Transport to distant galaxies and cosmic wonders.", img: "/images/planetarium.jpg", tag: "FIELD VISITS" },
];

const faqs = [
  { q: "How do I join the club?", a: "1st years can join during Working Committee (WC) Recruitments, and 2nd years during Managing Committee (MC) Recruitments. Keep an eye on our Instagram for announcements!" },
  { q: "I was a WC member in 1st year. Do I need to fill MC form in 2nd year?", a: "Yes, all previous WCs are required to fill the form to be promoted to MC and continue being a part of the club. Legacy docs will be reviewed." },
  { q: "Can people from Non-MAHE colleges join this club?", a: "Sorry, only MAHE students can apply to MAHE clubs. But our sky-watches and public seminars are open to all. Follow us to attend." },
  { q: "Can non-members tag along for sky watching events?", a: "Absolutely. Sky-watches are organized by members but open to all students, except for some club-exclusive deep-sky sessions." },
];

const socialLinks = [
  { k: "instagram", href: "https://www.instagram.com/astronomy.manipal/", label: "@astronomy.manipal" },
  { k: "linkedin", href: "https://in.linkedin.com/company/the-astronomy-club-manipal", label: "LinkedIn / TACM" },
  { k: "facebook", href: "https://m.facebook.com/theastronomyclubmanipal/", label: "Facebook" },
  { k: "twitter", href: "https://twitter.com/AstronomyMahe", label: "@AstronomyMahe" },
  { k: "mail", href: "mailto:astronomy.club@manipal.edu", label: "astronomy.club@manipal.edu" },
];
const topLinks = [
  { k: "instagram", label: "Instagram", href: "https://www.instagram.com/astronomy.manipal/", hover: "hover:bg-[#E1306C]" },
  { k: "linkedin", label: "LinkedIn", href: "https://in.linkedin.com/company/the-astronomy-club-manipal", hover: "hover:bg-[#0A66C2]" },
  { k: "mail", label: "Mail", href: "mailto:astronomy.club@manipal.edu", hover: "hover:bg-[#e63734]" },
];

/* -------------------- Components -------------------- */

function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const m = useRef({ x: 0, y: 0 });
  const r = useRef({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [txt, setTxt] = useState("");

  useEffect(() => {
    if ("ontouchstart" in window) return;
    const onMove = (e: MouseEvent) => {
      m.current.x = e.clientX;
      m.current.y = e.clientY;
      dot.current && (dot.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`);
    };
    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      setHover(!!el);
      setTxt(el?.dataset.cursor || "");
    };
    let raf: number;
    const loop = () => {
      r.current.x += (m.current.x - r.current.x) * 0.12;
      r.current.y += (m.current.y - r.current.y) * 0.12;
      const t = `translate(${r.current.x}px,${r.current.y}px) translate(-50%,-50%)`;
      ring.current && (ring.current.style.transform = t);
      label.current && (label.current.style.transform = t);
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.body.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <div ref={dot} className="fixed top-0 left-0 w-[5px] h-[5px] bg-white rounded-full pointer-events-none z-[999] mix-blend-difference will-change-transform" />
      <div ref={ring} className={`fixed top-0 left-0 pointer-events-none z-[998] rounded-full border mix-blend-difference will-change-transform transition-[width,height,border,background] duration-300 ${hover ? "w-[88px] h-[88px] border-white bg-white/[0.07] shadow-[0_0_30px_rgba(255,255,255,0.06)]" : "w-[34px] h-[34px] border-white/60"}`} />
      <div
  ref={label}
  className={`fixed top-0 left-0 pointer-events-none z-[998]
    w-[88px] h-[88px]
    flex items-center justify-center
    text-center
    mix-blend-difference
    will-change-transform
    transition-opacity
    ${hover && txt ? "opacity-100" : "opacity-0"}`}
>
  <span
    style={{
      fontSize: `${Math.max(5, 90 / txt.length)}px`,
      lineHeight: 1.05,
      letterSpacing: "0.08em",
      maxWidth: "74px",
      wordBreak: "break-word",
    }}
    className="font-mono uppercase text-white"
  >
    {txt}
  </span>
</div>
</>
  );
}

function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let w = c.width = innerWidth;
    let h = c.height = innerHeight;
    const stars = Array.from({ length: 360 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.2,
      o: Math.random(),
      d: Math.random() * 0.02 + 0.002,
      sp: Math.random() * 0.3 + 0.1,
    }));
    const meteors: any[] = [];
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.o += s.d;
        if (s.o > 1 || s.o < 0.2) s.d *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.o})`;
        ctx.fill();
        s.y -= s.sp * 0.1;
        if (s.y < 0) { s.y = h; s.x = Math.random() * w; }
      }
      if (Math.random() < 0.005) {
        meteors.push({ x: -80, y: Math.random() * h * 0.4, vx: 14 + Math.random() * 10, vy: 3 + Math.random() * 3, life: 1 });
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 0.018;
        if (m.life <= 0) { meteors.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 2.5, m.y - m.vy * 2.5);
        ctx.strokeStyle = `rgba(255,255,255,${m.life * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-0" />;
}

function Magnetic({ children, className = "", ...props }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return <button ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`transition-transform duration-200 ease-out will-change-transform ${className}`} {...props}>{children}</button>;
}

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, set] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 1800);
          set(Math.floor((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toLocaleString()}<span className="mono text-[10px] opacity-50">{suffix}</span></span>;
}

/* -------------------- KEYFRAMES CSS -------------------- */

const keyframes = `
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes float{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-12px) scale(1.02)}}
  @keyframes pulseglow{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:0.8;transform:scale(1.05)}}
  @keyframes breathe{0%,100%{box-shadow:0 0 40px rgba(168,85,247,0.15)}50%{box-shadow:0 0 80px rgba(168,85,247,0.25)}}
`;

/* -------------------- APP -------------------- */

export default function App() {
  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState(PAGE);
  const [lightbox, setLightbox] = useState<number | null>(null); // index into `filtered`
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [scroll, setScroll] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const onScroll = () => setScroll(scrollY / (document.body.scrollHeight - innerHeight));
    addEventListener("scroll", onScroll);
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const filtered = filter === "All" ? galleryImages : galleryImages.filter((g: any) => g.cat === filter);
  const shown = filtered.slice(0, visible);
  const current = lightbox !== null ? (filtered[lightbox] as any) : null;
  const go = (d: number) =>
    setLightbox((i) => (i === null ? i : (i + d + filtered.length) % filtered.length));

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [lightbox, filtered.length]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);
    fd.append("subject", "New message from the TACM website");
    fd.append("from_name", "TACM Website");

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#03050c] text-[#eaeef6] selection:bg-white selection:text-black antialised overflow-clip">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;600;800&family=Geist+Mono:wght@300;400;500&display=swap');*{font-family:"Syne",system-ui}.serif{font-family:"Instrument Serif",serif}.mono{font-family:"Geist Mono",monospace}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#ffffff33;border-radius:3px}html{scroll-behavior:smooth}:root{--gold:#f0b94a}${keyframes}`}</style>

      <CustomCursor />
      <StarField />

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[5%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(120,119,198,0.18),transparent_65%)] blur-[40px]" />
        <div className="absolute top-[30%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12),transparent_65%)] blur-[40px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[70vw] h-[50vh] bg-[radial-gradient(ellipse,rgba(56,189,248,0.10),transparent_60%)] blur-[30px]" />
      </div>

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-[linear-gradient(90deg,rgba(168,85,247,0.6),rgba(56,189,248,0.6),white)] mix-blend-difference" style={{ transform: `scaleX(${scroll})` }} />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-[20px] bg-[#03050c]/70">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 h-[66px] flex items-center justify-between">
          <a href="#" className="flex items-center gap-3.5 group">
            <img
  src="/images/logo.jpeg"
  alt="TACM Logo"
  className="w-8 h-8 rounded-full object-cover"
/>
            <div className="leading-[1.05]">
              <div className="mono text-[15px] tracking-[0.2em] opacity-80 group-hover:opacity-100 transition">THE ASTRONOMY CLUB</div>
              <div className="mono text-[10px] tracking-[0.3em] opacity-40 mt-1.5">MANIPAL - MIT</div>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-9 mono text-[10.5px] tracking-[0.2em]">
            {["#about","#events","#projects","#gallery","#team","#contact"].map((href,i)=>(
              <a key={href} data-cursor="GO" href={href} className="opacity-50 hover:opacity-100 transition relative after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-px after:bg-white after:transition-all hover:after:w-full">{["ABOUT","EVENTS","PROJECTS","GALLERY","TEAM","CONTACT"][i]}</a>
            ))}
          </div>
            <div className="hidden sm:flex items-center gap-2">
              {topLinks.map((s) => (
                <a
                  key={s.k}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  data-cursor={s.label.toUpperCase()}
                  className={`w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] grid place-items-center transition hover:text-white hover:border-transparent ${s.hover}`}
                >
                  {Icons[s.k as keyof typeof Icons]({ className: "w-4 h-4" })}
                </a>
              ))}
            </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 pt-[66px] overflow-hidden">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 py-[10vh] md:py-[14vh] grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
          <div className="relative">
            {/* <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/8 bg-white/[0.03] mono text-[10px] tracking-[0.15em] backdrop-blur" style={{ animation: "breathe 4s ease-in-out infinite" }}>
              <span className="w-[6px] h-[6px] rounded-full bg-emerald-400 animate-pulse" />
              REGISTRATIONS OPEN - WC RECRUITMENTS 2026
              <span className="opacity-40 hidden sm:inline">· STARGAZING EVERY FRIDAY</span>
            </div> */}

            <h1 className="mt-0 text-[14vw] md:text-[10vw] lg:text-[9.2vw] leading-[0.82] tracking-[-0.05em] font-[800]">
              <span className="block opacity-90">THE</span>
              <span className="block serif italic font-[400] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-r from-[#fff] via-[#e0d0ff] to-[#a78bfa]">Astronomy</span>
              <span className="block flex items-start md:items-center gap-3 md:gap-5 flex-wrap">
                CLUB
                <span className="mono text-[12px] md:text-[14px] leading-none tracking-[0.15em] font-normal border border-white/12 rounded-full px-5 py-2.5 bg-white/[0.03] backdrop-blur">MANIPAL</span>
              </span>
            </h1>

            <p className="mt-8 max-w-[54ch] text-[15px] md:text-[17px] leading-[1.75] opacity-60 font-light tracking-[0.01em]">
              Empowering curiosity and fostering a passion for the cosmos, our astronomy club at Manipal strives to create an inclusive space for students to explore the wonders of the universe. Through stargazing events, educational outreach, and collaborative projects, we aim to inspire a deeper appreciation for astronomy and cultivate a community that celebrates the beauty of the night sky. Join us on a journey of discovery as we explore the mysteries of the cosmos together.
            </p>

            <div className="mt-10 flex flex-wrap gap-3.5">
              <a href="#gallery"><Magnetic data-cursor="EXPLORE" className="h-[50px] px-7 rounded-full bg-[var(--gold)] text-black mono text-[11px] tracking-[0.15em] flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">EXPLORE REAL ASTROPHOTOGRAPHS <Icons.arrow className="w-4 h-4" /></Magnetic></a>
              <button data-cursor="LISTEN" onClick={()=>window.open("https://open.spotify.com/show/0Cw5mj6y9oDh4wVzyK7Y68", "_blank")} className="h-[50px] px-7 rounded-full border border-white/12 mono text-[11px] tracking-[0.15em] bg-white/[0.03] backdrop-blur hover:bg-white/[0.08] flex items-center gap-2.5 transition"><span className="w-6 h-6 rounded-full bg-white/20 text-white grid place-items-center text-[11px]">▶</span> LISTEN TO PODCASTS</button>
            </div>


            <div className="mt-20 grid grid-cols-3 gap-0 max-w-[400px] border-t border-white/10 pt-5">
              {[
                { n: 3, s: "K+", l: "STUDENTS REACHED" },
                { n: 30, s: "+", l: "EVENTS HOSTED" },
                { n: 2, s: "", l: "TELESCOPES" },
              ].map((x) => (
                <div key={x.l} className="mono">
                  <div className="text-[28px] font-semibold tracking-tight flex items-baseline gap-0.5"><CountUp to={x.n} suffix="" /><span className="text-[18px] opacity-70">{x.s}</span></div>
                  <div className="text-[9px] tracking-[0.2em] opacity-40 mt-1">{x.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side  refined deep-space visual */}
          <div className="relative lg:h-[78vh] min-h-[460px]">
            <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_70%)] backdrop-blur-[1px] overflow-hidden border border-white/6">
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

              {/* Nebula swirl */}
              <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(ellipse_at_40%_40%,rgba(250,204,21,0.35),transparent_40%),radial-gradient(ellipse_at_60%_60%,rgba(245,158,11,0.25),transparent_40%)] animate-[spin_50s_linear_infinite]" />

              {/* Central cosmos */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative" style={{ animation: "float 8s ease-in-out infinite" }}>
                  {/* Core */}
                  <div className="w-[120px] h-[120px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#fffef0,#fde68a_30%,#ca8a04_70%)] shadow-[0_0_100px_rgba(253,224,71,0.35),0_0_200px_rgba(234,179,8,0.2)] grid place-items-center">
                    <span className="mono text-[8px] tracking-[0.3em] text-white/70">TACM</span>
                  </div>
                  {/* Orbital rings */}
                  {[
                    { inset: -25, border: "dashed", opacity: 0.15, speed: "22s" },
                    { inset: -65, border: "solid", opacity: 0.10, speed: "35s" },
                    { inset: -115, border: "dashed", opacity: 0.07, speed: "50s" },
                    { inset: -175, border: "solid", opacity: 0.05, speed: "70s" },
                  ].map((o, i) => (
                    <div key={i} className="absolute rounded-full border border-white/30 pointer-events-none" style={{ top: o.inset, left: o.inset, right: o.inset, bottom: o.inset, borderStyle: o.border as any, opacity: o.opacity, animation: `spin ${o.speed} linear infinite` }} />
                  ))}
                  {/* Orbiting bodies */}
                  {[
                    { r: 65, speed: 12, label: "🌙", size: 5 },
                    { r: 115, speed: 22, label: "🪐", size: 6 },
                    { r: 175, speed: 36, label: "🌌", size: 5 },
                  ].map((o, i) => (
                    <div key={i} className="absolute left-1/2 top-1/2 w-0 h-0" style={{ animation: `spin ${o.speed}s linear infinite` }}>
                      <div className="absolute" style={{ transform: `translate(${o.r}px,0)` }}>
                        <div className="w-0 h-0 relative">
                          <div className="text-[14px]" style={{ transform: "translate(-50%,-50%)" }}>{o.label}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Constellation lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 500 500">
                <line x1="80" y1="120" x2="150" y2="60" stroke="white" strokeWidth="0.5" />
                <line x1="150" y1="60" x2="200" y2="110" stroke="white" strokeWidth="0.5" />
                <line x1="200" y1="110" x2="160" y2="180" stroke="white" strokeWidth="0.5" />
                <line x1="160" y1="180" x2="90" y2="170" stroke="white" strokeWidth="0.5" />
                <line x1="90" y1="170" x2="80" y2="120" stroke="white" strokeWidth="0.5" />
                <circle cx="80" cy="120" r="2.5" fill="white" />
                <circle cx="150" cy="60" r="2.5" fill="white" />
                <circle cx="200" cy="110" r="2.5" fill="white" />
                <circle cx="160" cy="180" r="2.5" fill="white" />
                <circle cx="90" cy="170" r="2.5" fill="white" />
              </svg>

              {/* Astro specs */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-end">
                <div className="mono text-[9px] leading-[1.6] opacity-40 tracking-[0.1em]">
                  RA 05h 35m · DEC -05° 23' · MAG 4.0<br />
                  FOV 1.2° · EXPO 2.4s · DOBSONIAN 10"
                </div>
                <div className="flex items-center gap-2.5 mono text-[9px] tracking-[0.2em] opacity-40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  TRACKING LIVE
                </div>
              </div>
            </div>

            {/* Floating card 1 */}
            <div className="absolute -left-3 md:-left-6 top-[16%] rotate-[-5deg] w-[200px] p-4 rounded-[18px] bg-white/5 backdrop-blur-xl border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]" style={{ animation: "float 7s ease-in-out infinite" }}>
              <div className="mono text-[8px] tracking-[0.25em] opacity-50">NEXT EVENT</div>
              <div className="serif text-[18px] leading-[1.1] mt-1">Star Gazing Night</div>
              <div className="mono text-[10px] mt-2.5 opacity-50">ENDURANCE · 9PM · FREE</div>
            </div>

            {/* Floating card 2 */}
            <div className="absolute -right-3 md:-right-6 bottom-[20%] rotate-[3deg] w-[200px] p-4 rounded-[18px] bg-white/5 backdrop-blur-xl border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]" style={{ animation: "float 9s ease-in-out infinite 1s" }}>
              <div className="flex items-center gap-2 mono text-[8px] tracking-[0.25em] opacity-50"><span className="w-1 h-1 bg-white rounded-full" /> PODCAST</div>
              <div className="serif text-[17px] leading-[1.1] mt-1">AstroBytes</div>
              <div className="mono text-[10px] mt-2.5 opacity-50">SPOTIFY · NEW EPISODE</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 py-14 md:py-20">
          <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
            <div className="relative">
              <div className="mono text-[15px] tracking-[0.35em] opacity-40 mb-2 flex items-center gap-3"><span className="w-10 h-px bg-white/20" /> ABOUT</div>
              <h2 className="serif text-[44px] md:text-[70px] leading-[0.92] tracking-[-0.02em] mt-6">
                We look up<br />
                <span className="italic opacity-50 text-[#c4b5fd]">to feel small</span>
                <br />precise, infinite.
              </h2>
            </div>
              <div className="grid sm:grid-cols-2 gap-8 text-[14px] leading-[1.8] opacity-65">
              <p className="backdrop-blur-sm bg-white/[0.02] rounded-[16px] p-6 border border-white/5">Look up. The light reaching your eyes tonight began its journey long ago, in a place you will never visit. All we can do is witness it. And if we are lucky, maybe even capture it...</p>
              <p className="backdrop-blur-sm bg-white/[0.02] rounded-[16px] p-6 border border-white/5">Through stargazing events, educational outreach, and collaborative projects, we aim to inspire a deeper appreciation for astronomy and cultivate a community that celebrates the beauty of the night sky.</p>
            </div>
          </div>
        </div>
        {/* Stats bar */}
        <div className="border-y border-white/5 bg-white/[0.015]">
          <div className="mx-auto max-w-[1300px] px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {[
              ["88", "Constellations mapped"],
              ["2T", "Galaxies in observable universe"],
              ["40Q", "Quintillion black holes"],
              ["200S", "Sextillion stars counting"],
            ].map(([n, l]) => (
              <div key={n} className="flex items-center gap-3 px-5 py-5 md:py-7">
                <div className="text-[22px] md:text-[30px] font-bold tracking-tight text-[#c4b5fd]">{n}</div>
                <div className="mono text-[9px] leading-[1.2] tracking-[0.15em] opacity-40 uppercase">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="relative z-10 py-14 md:py-20 overflow-hidden">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10">
          <div className="flex flex-wrap justify-between items-end gap-6">
            <div>
              <div className="mono text-[15px] tracking-[0.35em] text-[var(--gold)] flex items-center gap-3"><span className="w-10 h-px bg-[var(--gold)] opacity-60" /> EVENTS</div>
              
              <h3 className="serif text-[48px] md:text-[74px] leading-[0.88] mt-4">Cosmic blend<br />of knowledge & thrill</h3>
            </div>
            <p className="mono text-[10px] tracking-[0.2em] max-w-[28ch] opacity-40">FROM STARGAZING NIGHTS TO CELESTIAL WORKSHOPS AND COMPETITIONS</p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {eventsData.map((ev) => (
              <div key={ev.k} data-cursor={ev.cursor} className="group relative rounded-[24px] overflow-hidden border border-white/8 bg-[#0b0e1a] hover:border-white/20 transition duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.06)]">
                <div className="h-[280px] overflow-hidden relative">
                  <img src={ev.img} className="w-full h-full object-cover group-hover:scale-[1.08] transition duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e1a] via-[#0b0e1a]/20 to-transparent" />
                  <div className="absolute top-4 left-4 mono text-[9px] tracking-[0.2em] px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/10">{ev.tag}</div>
                  <div className="absolute top-4 right-4 mono text-[9px] w-8 h-8 grid place-items-center rounded-full bg-black/30 backdrop-blur border border-white/10">{ev.k}</div>
                </div>
                <div className="p-6">
                  <h4 className="text-[21px] leading-[1.15] font-semibold tracking-tight">{ev.title}</h4>
                  <p className="mt-3 text-[13px] leading-[1.65] opacity-55">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* PHOTO BAND */}
      <section className="relative z-10 h-[46vh] min-h-[320px] overflow-hidden border-y border-white/5">
        <img src="/images/gallery/Nebula/EagleNebula.png" alt="Eagle Nebula" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#03050c]/40" />
        <div className="relative h-full mx-auto max-w-[1300px] px-6 md:px-10 flex items-end pb-8">
          <div className="mono text-[11px] tracking-[0.2em] text-white/80">EAGLE NEBULA · PHOTOGRAPHED FROM MANIPAL</div>
        </div>
      </section>


      {/* PROJECTS */}
      <section id="projects" className="relative z-10 py-14 md:py-20 bg-[#080a15] border-y border-white/5">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10">
          <div className="mono text-[15px] tracking-[0.35em] text-[var(--gold)] flex items-center gap-3"><span className="w-10 h-px bg-[var(--gold)] opacity-60" /> PROJECTS</div>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {[
              { title: "Research & Paper Review", cursor:"PAPERS", desc: "Unparalleled opportunities for scholarly research, paper reviews, and in-depth celestial exploration of LIGO, gravitational waves, exoplanets.", icon: "◐", cta: "READ PAPERS" },
              { title: "Telescope Mount Build", cursor:"MOUNT", desc: "Selecting sturdy materials to assembling components, each step contributes to the stability and performance of a custom equatorial mount.", icon: "◑", cta: "BUILD LOG" },
              { title: "Star Tracking API", cursor:"API", desc: "Designing a user-friendly interface integrating with star databases and ensuring accurate celestial positioning information.", icon: "◎", cta: "API DOCS" },
            ].map((p, i) => (
              <div key={i} data-cursor={p.cursor} className="relative group rounded-[20px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))] p-[1px] hover:border-white/20 transition">
                <div className="rounded-[19px] bg-[#0e1224] p-6 md:p-7 h-full">
                  <div className="w-10 h-10 rounded-full border border-white/10 grid place-items-center text-[18px] bg-white/[0.04]">{p.icon}</div>
                  <h4 className="mt-6 text-[21px] leading-[1.1] font-semibold">{p.title}</h4>
                  <p className="mt-3 mono text-[12px] leading-[1.7] opacity-55">{p.desc}</p>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="mono text-[9px] tracking-[0.2em] px-3 py-1.5 rounded-full bg-white/8 border border-white/10">{p.cta}</span>
                    <span className="w-8 h-8 rounded-full bg-white/10 text-white grid place-items-center group-hover:bg-white group-hover:text-black transition group-hover:rotate-[-45deg] duration-500">↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-[24px] border border-white/8 bg-gradient-to-br from-[#0e1224] to-[#0b0e1a] p-7 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="serif text-[24px] md:text-[32px] leading-[1.05] max-w-[26ch] text-[#c4b5fd] italic">"Astronomy is a humbling reminder that in the vast expanse of the cosmos, our existence is but a fleeting moment, yet our curiosity knows no bounds."</div>
            <div className="mono text-[10px] tracking-[0.2em] opacity-40 shrink-0"> TACM MANIFESTO</div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative z-10 py-14 md:py-20">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10">
          <div className="flex flex-wrap gap-6 items-end justify-between">
            <div>
              <div className="mono text-[15px] tracking-[0.35em] text-[var(--gold)] flex items-center gap-3"><span className="w-10 h-px bg-[var(--gold)] opacity-60" /> GALLERY</div>
              <h3 className="serif text-[52px] md:text-[84px] leading-[0.85] mt-4">In stillness,<br />the sky moves</h3>
            </div>
            <div className="flex gap-2 mono text-[10px] tracking-[0.15em] flex-wrap">
              {categories.map((c: string) => (
                <button
                  key={c}
                  onClick={() => { setFilter(c); setVisible(PAGE); }}
                  data-cursor="FILTER"
                  className={`px-4 h-8 rounded-full border transition ${filter === c ? "bg-[var(--gold)] text-black border-[var(--gold)]" : "border-white/10 bg-white/[0.03] hover:bg-white/10"}`}
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-14 mono text-[11px] tracking-[0.2em] opacity-40 text-center py-20 border border-dashed border-white/10 rounded-[20px]">
              NO PHOTOS YET. ADD IMAGES TO public/images/gallery AND RUN npm run gallery
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {shown.map((g: any, i: number) => (
                <div
                  key={g.id}
                  data-cursor="ZOOM"
                  onClick={() => setLightbox(i)}
                  className="group relative aspect-[4/5] rounded-[20px] overflow-hidden border border-white/8 bg-[#0b0e1a] cursor-pointer"
                >
                  <img
                    src={g.thumb}
                    alt={g.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.05] transition duration-[1.2s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition">
                    <div className="mono text-[9px] tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/50 backdrop-blur border border-white/15 inline-flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: catColor[g.cat] || "#fff" }}
                      />
                      {g.cat}
                    </div>
                    <div className="mt-2 text-[14px] leading-[1.2] font-medium">{g.title}</div>
                    <div className="mono text-[9px] opacity-50 mt-1">{g.date}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filtered.length > 0 && (
            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="mono text-[10px] tracking-[0.2em] opacity-40">SHOWING {shown.length} OF {filtered.length}</div>
              {visible < filtered.length && (
                <button
                  data-cursor="MORE"
                  onClick={() => setVisible((v) => v + PAGE)}
                  className="h-[46px] px-7 rounded-full border border-white/12 bg-white/[0.03] hover:bg-white hover:text-black transition mono text-[11px] tracking-[0.15em]"
                >
                  LOAD MORE
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="relative z-10 py-15 border-t border-white/5 bg-[#070912] scroll-mt-[66px]">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10">
          <div className="flex justify-between items-end">
            <div className="mono text-[15px] tracking-[0.35em] text-[var(--gold)] flex items-center gap-3"><span className="w-10 h-px bg-[var(--gold)] opacity-60" /> MEET THE TEAM</div>
            <div className="mono text-[15px] tracking-[0.2em] opacity-30">2026 · 27 BOARD</div>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
        

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {team.map((m) => {
            const Card: any = m.linkedin ? "a" : "div";
            return (
              <Card
                key={`${m.name}-${m.role}`}
                {...(m.linkedin ? { href: m.linkedin, target: "_blank", rel: "noreferrer" } : {})}
                data-cursor={m.role.toUpperCase()}
                className="group block w-[230px] flex-shrink-0"
              >
                <div className="aspect-[4/5] rounded-[18px] overflow-hidden border border-white/8 bg-[#0b0e1a] relative">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-700"
                  />
                  {m.linkedin && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur border border-white/15 grid place-items-center opacity-0 group-hover:opacity-100 transition">
                      {Icons.linkedin({ className: "w-4 h-4" })}
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 mono text-[10px] tracking-[0.15em] px-3 py-2 rounded-full bg-white/90 text-black text-center">
                    {m.role.toUpperCase()}
                  </div>
                </div>

                <div className="mt-4 mono text-[15px] leading-[1.2] text-center">
                  {m.name.split(" ")[0]}
                  <br />
                  <span className="opacity-40 text-[12px]">{m.name.split(" ").slice(1).join(" ")}</span>
                </div>
              </Card>
            );
          })}
        </div>



</div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-15 md:py-20">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 grid md:grid-cols-[0.8fr_1.2fr] gap-14">
          <div className="md:sticky md:top-[30vh] self-start">
            <div className="mono text-[15px] tracking-[0.35em] text-[var(--gold)] flex items-center gap-3"><span className="w-10 h-px bg-[var(--gold)] opacity-60" /> FAQ</div>
            <h3 className="serif text-[42px] leading-[0.92] mt-6">Answers for<br />star-struck minds</h3>
            <div className="mt-8 w-fit px-4 py-2.5 rounded-full border border-white/8 mono text-[9px] tracking-[0.15em] bg-white/[0.03] backdrop-blur">RECRUITMENTS · OPEN TO ALL MAHE</div>
          </div>
          <div className="divide-y divide-white/8 border-y border-white/8 bg-white/[0.01] rounded-[24px] backdrop-blur-sm">
            {faqs.map((f, i) => (
              <div key={i} className="cursor-pointer px-6 md:px-8 py-6 hover:bg-white/[0.02] transition" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                <div className="flex justify-between items-center gap-6">
                  <div className="text-[17px] md:text-[19px] leading-[1.2] font-medium tracking-tight">{f.q}</div>
                  <div data-cursor={faqOpen === i ? "CLOSE" : "OPEN"} className={`w-9 h-9 rounded-full border grid place-items-center shrink-0 transition-all duration-300 ${faqOpen === i ? "bg-white text-black border-white rotate-[135deg]" : "border-white/10 bg-white/[0.04]"}`}>+</div>
                </div>
                <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${faqOpen === i ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr] mt-0"}`}>
                  <div className="overflow-hidden"><p className="mono text-[13px] leading-[1.7] max-w-[58ch] opacity-65">{f.a}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 border-t border-white/5 bg-[#03050c]">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 py-20 md:py-28">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14">
            <div>
              <div className="inline-flex mono text-[9px] tracking-[0.25em] px-3.5 py-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/5 text-emerald-300">● WE'RE UNDER THE SAME SKY</div>
              <h3 className="serif text-[56px] md:text-[88px] leading-[0.85] mt-8">Reach for<br />the stars.</h3>

              <div className="mt-10 flex flex-wrap gap-2.5">
                {socialLinks.map((s: any) => (
                  <a data-cursor="FOLLOW" key={s.k} href={s.href} target="_blank" className="group flex items-center gap-2.5 h-[46px] px-5 rounded-full border border-white/8 bg-white/[0.03] hover:bg-white hover:text-black transition duration-300">
                    <span className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-black/10 grid place-items-center transition">{Icons[s.k as keyof typeof Icons]({ className: "w-[15px] h-[15px]" })}</span>
                    <span className="mono text-[10px] tracking-[0.15em]">{s.label}</span>
                  </a>
                ))}
              </div>

              <div className="mt-16 grid md:grid-cols-3 gap-5 mono text-[13px] leading-[1.6]">
                {[
                  { title: "ADDRESS", content: ["Manipal Institute of Technology,", "Eshwar Nagar, Manipal,", "Karnataka 576104, India"] },
                  { title: "HOURS", content: ["Mon-Fri 5pm - 8pm", "Sky: Fri & Sat 9pm+", "Planetarium: Sundays"] },
                  { title: "COORDINATES", content: ["13.3525° N, 74.7925° E", "Elev: 73m ASL", "Bortle: 5 - Suburban sky"] },
                ].map((sec) => (
                  <div key={sec.title} className="bg-white/[0.02] rounded-[16px] p-5 border border-white/5">
                    <div className="tracking-[0.2em] opacity-40 mb-2">{sec.title}</div>
                    {sec.content.map((l, i) => <div key={i} className="opacity-70">{l}</div>)}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/8 bg-[#0b0e1a] p-6 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="flex justify-between items-start">
                <div className="mono text-[10px] tracking-[0.2em] opacity-50">SEND A SIGNAL</div>
                <div className="mono text-[9px] tracking-[0.1em] px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/15">RESPONSE ~ 2.4H</div>
              </div>
              <form className="mt-8 grid gap-4.5" onSubmit={handleSubmit}>
                {/* spam honeypot: leave hidden */}
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid md:grid-cols-2 gap-4">
                  <label className="grid gap-1.5"><span className="mono text-[9px] tracking-[0.15em] opacity-40">YOUR NAME</span><input required name="name" className="h-[48px] rounded-full bg-[#060812] border border-white/10 px-5 mono text-[12px] outline-none focus:border-white/25 transition" placeholder="Carl Sagan" /></label>
                  <label className="grid gap-1.5"><span className="mono text-[9px] tracking-[0.15em] opacity-40">EMAIL</span><input required type="email" name="email" className="h-[48px] rounded-full bg-[#060812] border border-white/10 px-5 mono text-[12px] outline-none focus:border-white/25 transition" placeholder="you@manipal.edu" /></label>
                </div>
                <label className="grid gap-1.5"><span className="mono text-[9px] tracking-[0.15em] opacity-40">INTEREST</span>
                  <select name="interest" className="h-[48px] rounded-full bg-[#060812] border border-white/10 px-5 mono text-[12px] outline-none">
                    <option>Stargazing Nights</option><option>Research Assistance</option><option>Astrophotography</option><option>Telescope Build</option><option>Content / Outreach</option><option>Others</option>
                  </select>
                </label>
                <label className="grid gap-1.5"><span className="mono text-[9px] tracking-[0.15em] opacity-40">MESSAGE</span><textarea required name="message" rows={4} className="rounded-[20px] bg-[#060812] border border-white/10 p-5 mono text-[12px] outline-none focus:border-white/25 transition resize-none" placeholder="Tell us why you look up at night..." /></label>

                <Magnetic data-cursor="SEND" disabled={status === "sending"} className="mt-1 h-[50px] rounded-full bg-white text-black mono text-[11px] tracking-[0.15em] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] disabled:opacity-60">
                  {status === "sending" ? "SENDING..." : "SEND MESSAGE →"}
                </Magnetic>

                {status === "sent" && <div className="mono text-[10px] tracking-[0.1em] text-center text-emerald-300">Signal received! We'll get back to you soon.</div>}
                {status === "error" && <div className="mono text-[10px] tracking-[0.1em] text-center text-red-300">Something went wrong. Please try again or email us directly.</div>}
                {status !== "sent" && status !== "error" && <div className="mono text-[9px] tracking-[0.1em] opacity-30 text-center">We respect your inbox. No spam, only cosmos.</div>}
              </form>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 mono text-[9px] tracking-[0.2em] opacity-30">
            <div>© {new Date().getFullYear()} THE ASTRONOMY CLUB, MANIPAL, MIT</div>
            <div className="flex gap-6"> Made with ❤️ by<a href="https://www.instagram.com/pxlbyt/" data-cursor="pxlbyt">Siddharth. S</a></div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {current && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-[24px] p-4 md:p-10 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <div className="max-w-[1100px] w-full grid md:grid-cols-[1.2fr_0.8fr] bg-[#0b0e1a] rounded-[24px] border border-white/15 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)]" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={current.title} className="w-full h-[60vh] md:h-[82vh] object-contain bg-black" />
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="mono text-[9px] tracking-[0.2em] px-3 py-1.5 rounded-full bg-white text-black inline-block">{current.cat}</div>
                <h4 className="serif text-[34px] leading-[0.95] mt-6">{current.title}</h4>
                <div className="mono text-[10px] opacity-40 mt-3">{current.date}</div>
                {current.content && (
                  <p className="mono text-[12px] leading-[1.7] opacity-55 mt-6 whitespace-pre-line">{current.content}</p>
                )}
              </div>
              <div className="mt-8 flex items-center gap-3">
                <button data-cursor="PREV" onClick={() => go(-1)} className="w-11 h-11 rounded-full border border-white/15 hover:bg-white hover:text-black transition grid place-items-center">←</button>
                <button data-cursor="NEXT" onClick={() => go(1)} className="w-11 h-11 rounded-full border border-white/15 hover:bg-white hover:text-black transition grid place-items-center">→</button>
                <span className="mono text-[10px] tracking-[0.15em] opacity-40">{(lightbox ?? 0) + 1} / {filtered.length}</span>
                <button data-cursor="CLOSE" onClick={() => setLightbox(null)} className="ml-auto h-11 px-6 rounded-full bg-white text-black mono text-[10px] tracking-[0.15em]">CLOSE</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}