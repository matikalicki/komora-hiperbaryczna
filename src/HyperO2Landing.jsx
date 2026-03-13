import { useState, useEffect, useRef } from "react";
import { LOGO_SRC } from "./logo.js";
import {
  Zap, Shield, Sparkles, Moon, Phone, MapPin, Clock,
  Star, ChevronDown, Wind, Heart, CheckCircle, XCircle,
  ArrowRight, Package, User, Send, ParkingCircle,
  Activity, Leaf, Award, Calendar
} from "lucide-react";

function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeSection({ children, delay = 0 }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: "opacity 0.7s ease " + delay + "ms, transform 0.7s ease " + delay + "ms",
    }}>
      {children}
    </div>
  );
}

function Logo({ size }) {
  const s = size || 36;
  return (
    <img src={LOGO_SRC} alt="Logo" width={s} height={s}
      style={{ borderRadius: "10px", objectFit: "contain" }} />
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["Tlenoterapia", "Oferta", "Bezpieczeństwo", "Opinie", "Kontakt"];
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(255,255,255,0.96)" : "rgba(7,30,61,0.6)",
      backdropFilter: "blur(12px)",
      boxShadow: scrolled ? "0 1px 30px rgba(14,66,120,0.08)" : "none",
      transition: "all 0.5s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0.75rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Logo size={32} />
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "0.8rem", color: scrolled ? "#1B3F8A" : "white", lineHeight: 1.2 }}>Komora Hiperbaryczna</div>
            <div style={{ fontSize: "0.6rem", fontWeight: 600, color: "#00AEEF", letterSpacing: 2 }}>ŚLĄSK – SOSNOWIEC</div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 24, alignItems: "center" }} className="hidden-mobile">
          {links.map(l => (
            <a key={l} href={"#" + l.toLowerCase()}
              style={{ fontSize: "0.8rem", fontWeight: 500, color: scrolled ? "#1a3a5c" : "rgba(255,255,255,0.9)", textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.target.style.opacity = "0.6"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >{l}</a>
          ))}
          <a href="/blog" style={{ fontSize: "0.8rem", fontWeight: 700, color: scrolled ? "#1B3F8A" : "#7DDEFF", textDecoration: "none", borderBottom: "2px solid currentColor", paddingBottom: 2 }}>Blog</a>
        </nav>

        {/* Right side buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Phone — only on desktop */}
          <a href="tel:+48608531549" className="hidden-mobile" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0.5rem 0.875rem", borderRadius: 99, fontSize: "0.8rem", fontWeight: 600, color: scrolled ? "#1B3F8A" : "white", textDecoration: "none", border: scrolled ? "1.5px solid #DBEAFE" : "1.5px solid rgba(255,255,255,0.35)", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = scrolled ? "#EBF4FF" : "rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <Phone size={12} /> 608 531 549
          </a>
          {/* Phone icon only — mobile */}
          <a href="tel:+48608531549" className="show-mobile" style={{ display: "none", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "50%", color: "white", border: "1.5px solid rgba(255,255,255,0.35)", background: "transparent" }}>
            <Phone size={16} style={{ color: scrolled ? "#1B3F8A" : "white" }} />
          </a>
          {/* Reserve button */}
          <a href="/rezerwacja" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0.5rem 1rem", borderRadius: 99, fontSize: "0.8rem", fontWeight: 700, color: "white", textDecoration: "none", background: "linear-gradient(135deg,#00AEEF,#1B3F8A)", boxShadow: "0 4px 16px rgba(27,63,138,0.35)", transition: "transform 0.2s", whiteSpace: "nowrap" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            <Calendar size={12} /> Zarezerwuj
          </a>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <style>{`
        .show-mobile { display: none !important; }
        @media(max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

function Hero() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "linear-gradient(140deg,#071E3D 0%,#1B3F8A 50%,#0e7abf 100%)", position: "relative" }}>
      <style>{`
        @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .hidden-mobile { display:flex; }
        @media(max-width:768px){ .hidden-mobile{display:none!important;} .hero-grid{grid-template-columns:1fr!important;} .hero-right{display:none!important;} }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "8rem 1.5rem 4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", width: "100%" }} className="hero-grid">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.4rem 1rem", borderRadius: 99, marginBottom: "1.5rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", background: "rgba(0,174,239,0.2)", border: "1px solid rgba(0,174,239,0.4)", color: "#7DDEFF" }}>
            <Activity size={11} /> Terapia mHBOT – Sosnowiec
          </div>

          <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.9rem,4vw,3.2rem)", lineHeight: 1.2, color: "white", fontWeight: 400, marginBottom: "1.5rem" }}>
            Odetchnij pełną piersią.{" "}
            <span style={{ background: "linear-gradient(90deg,#7DDEFF,#C2EDFF,#7DDEFF)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>
              Regeneracja na poziomie komórkowym.
            </span>
          </h1>

          <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", maxWidth: 480, marginBottom: "2rem" }}>
            Profesjonalne zabiegi w komorze hiperbarycznej dla zdrowia, urody i sportu.{" "}
            <strong style={{ color: "#7DDEFF" }}>al. Zwycięstwa 6, 41-200 Sosnowiec</strong>.
          </p>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "0.75rem 1.25rem", borderRadius: 16, marginBottom: "2rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
            {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#F59E0B" style={{ color: "#F59E0B" }} />)}
            <strong style={{ color: "white" }}>5,0</strong>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}>- 6 opinii Google</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <a href="/rezerwacja" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "1rem 2rem", borderRadius: 99, fontWeight: 700, fontSize: "0.95rem", color: "white", textDecoration: "none", background: "linear-gradient(135deg,#00AEEF,#1B3F8A)", boxShadow: "0 8px 32px rgba(0,174,239,0.45)", transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <Calendar size={16} /> Zarezerwuj wizytę
            </a>
            <a href="tel:+48608531549" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "1rem 2rem", borderRadius: 99, fontWeight: 600, fontSize: "0.875rem", color: "white", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <Phone size={16} /> +48 608 531 549
            </a>
            <a href="#tlenoterapia" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "1rem 2rem", borderRadius: 99, fontWeight: 600, fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "white"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>
              Dowiedz się więcej <ChevronDown size={16} />
            </a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "1.5rem" }}>
            <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", alignSelf: "center" }}>Kim jesteś?</span>
            {[
              { label: "💪 Jestem sportowcem", id: "sport" },
              { label: "💆 Szukam relaksu", id: "wellness" },
              { label: "✨ Dbam o urodę", id: "beauty" },
              { label: "🏥 Mam problem zdrowotny", id: "zdrowie" },
            ].map(({ label, id }) => (
              <button key={id} onClick={() => {
                const el = document.getElementById("card-" + id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                  el.style.outline = "3px solid #00AEEF";
                  el.style.boxShadow = "0 0 0 6px rgba(0,174,239,0.25)";
                  setTimeout(() => { el.style.outline = "none"; el.style.boxShadow = "0 2px 16px rgba(14,66,120,0.06)"; }, 2000);
                }
              }} style={{ padding: "0.45rem 1rem", borderRadius: 99, fontSize: "0.78rem", fontWeight: 500, color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}>
                {label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 32, marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            {[["5", "Ocena Google"], ["15×", "Więcej tlenu"], ["mHBOT", "Certyfikowana komora"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "Georgia,serif", fontSize: "1.5rem", color: "white", fontWeight: 400 }}>{v}</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right" style={{ position: "relative" }}>
          <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/5", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
              <div style={{ width: "100%", height: "100%", borderRadius: 16, background: "linear-gradient(180deg,rgba(0,174,239,0.1),rgba(27,63,138,0.3))", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <Wind size={64} style={{ color: "rgba(0,174,239,0.7)", animation: "floatUp 4s ease-in-out infinite" }} />
                <p style={{ color: "rgba(0,174,239,0.9)", marginTop: 16, fontSize: "0.9rem" }}>Komora Hiperbaryczna Śląsk</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: 4 }}>al. Zwycięstwa 6 – Sosnowiec</p>
                <div style={{ position: "absolute", top: 16, right: 16, padding: "0.3rem 0.75rem", borderRadius: 99, fontSize: "0.72rem", fontWeight: 600, background: "rgba(0,174,239,0.2)", border: "1px solid rgba(0,174,239,0.35)", color: "#7DDEFF" }}>Certyfikat CE</div>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: -24, left: -32, padding: "1rem 1.25rem", borderRadius: 16, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.15)", minWidth: 200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#00AEEF,#1B3F8A)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CheckCircle size={18} color="white" />
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "white" }}>Gabinet tlenoterapii hiperbarycznej</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)" }}>Sosnowiec – Śląsk</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyOxygen() {
  const benefits = [
    {
      icon: Zap, color: "#F59E0B", bg: "#FEF3C7",
      title: "Sport i Regeneracja",
      subtitle: "Wróć do pełni sił szybciej niż kiedykolwiek",
      points: [
        "Błyskawiczne usuwanie zakwasów po treningu",
        "Przyspieszenie gojenia kontuzji i urazów",
        "Wzrost wydolności i pojemności płuc",
      ],
    },
    {
      icon: Shield, color: "#10B981", bg: "#D1FAE5",
      title: "Zdrowie i Leczenie",
      subtitle: "Naturalne wsparcie odporności i regeneracji",
      points: [
        "Silne działanie przeciwzapalne",
        "Przyspieszenie gojenia ran i owrzodzeń",
        "Wsparcie leczenia chorób przewlekłych",
      ],
    },
    {
      icon: Sparkles, color: "#EC4899", bg: "#FCE7F3",
      title: "Beauty i Anti-Aging",
      subtitle: "Odmłodź skórę od środka",
      points: [
        "Stymulacja produkcji kolagenu i elastyny",
        "Poprawa napięcia i blasku skóry",
        "Głęboki detoks komórkowy",
      ],
    },
    {
      icon: Moon, color: "#6366F1", bg: "#EEF2FF",
      title: "Wellness i Równowaga",
      subtitle: "Odzyskaj energię i spokój umysłu",
      points: [
        "Głębszy i regenerujący sen",
        "Redukcja stresu i poziomu kortyzolu",
        "Lepsza koncentracja i jasność myślenia",
      ],
    },
  ];

  return (
    <section id="tlenoterapia" style={{ padding: "6rem 1.5rem", background: "#F8FBFF" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.4rem 1rem", borderRadius: 99, marginBottom: "1.25rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", background: "#EBF4FF", color: "#1B3F8A" }}>
              <Leaf size={12} /> Nauka i efekty
            </div>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#071E3D", fontWeight: 400, lineHeight: 1.25, marginBottom: "1.25rem" }}>
              Dlaczego mHBOT działa?
            </h2>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#4A6580", maxWidth: 700, margin: "0 auto" }}>
              W warunkach podwyższonego ciśnienia (np. <strong style={{ color: "#1B3F8A" }}>1.3 – 1.5 ATA</strong>), tlen rozpuszcza się bezpośrednio w osoczu, limfie i płynie mózgowo-rdzeniowym. Do Twoich komórek dociera nawet do <strong style={{ color: "#1B3F8A" }}>15 razy więcej tlenu</strong>, dając potężny impuls do samoleczenia i redukcji stanów zapalnych.
            </p>
          </div>
        </FadeSection>

        {/* Opinia klienta */}
        <FadeSection delay={100}>
          <div style={{ maxWidth: 600, margin: "0 auto 3.5rem", padding: "1.5rem 2rem", borderRadius: 20, background: "white", border: "1px solid #EAF0F8", boxShadow: "0 4px 24px rgba(14,66,120,0.07)", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: "0.75rem" }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="#F59E0B" style={{ color: "#F59E0B" }} />)}
            </div>
            <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "#4A6580", fontStyle: "italic", margin: "0 0 0.75rem" }}>
              "Po 5 sesjach ból stawów zniknął, a ja w końcu przesypiam noce."
            </p>
            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1B3F8A" }}>— Anna</span>
          </div>
        </FadeSection>

        {/* Karty */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
          {benefits.map((b, i) => (
            <FadeSection key={b.title} delay={i * 80}>
              <div
                id={"card-" + ["sport","zdrowie","beauty","wellness"][i]}
                style={{
                  padding: "1.75rem", borderRadius: 20, background: "white",
                  border: "1px solid #EAF0F8",
                  boxShadow: "0 2px 16px rgba(14,66,120,0.06)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, outline 0.3s",
                  cursor: "default", height: "100%", boxSizing: "border-box",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 20px 48px rgba(14,66,120,0.15)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 16px rgba(14,66,120,0.06)";
                }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: b.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <b.icon size={22} style={{ color: b.color }} />
                </div>
                <h3 style={{ fontWeight: 700, color: "#071E3D", fontSize: "1rem", marginBottom: 4 }}>{b.title}</h3>
                <p style={{ fontSize: "0.8rem", color: b.color, fontWeight: 600, marginBottom: 14 }}>{b.subtitle}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {b.points.map(pt => (
                    <li key={pt} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.85rem", color: "#4A6580", lineHeight: 1.55 }}>
                      <CheckCircle size={15} style={{ color: "#10B981", flexShrink: 0, marginTop: 1 }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeSection>
          ))}
        </div>

        {/* CTA */}
        <FadeSection delay={400}>
          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <a href="#oferta" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "1rem 2.5rem", borderRadius: 99, fontWeight: 600,
              fontSize: "0.95rem", color: "white", textDecoration: "none",
              background: "linear-gradient(135deg,#1B3F8A,#00AEEF)",
              boxShadow: "0 8px 28px rgba(27,63,138,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(27,63,138,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(27,63,138,0.3)"; }}
            >
              Sprawdź cennik <ArrowRight size={16} />
            </a>
          </div>
        </FadeSection>

      </div>
    </section>
  );
}

function PricingCard({ p, i }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeSection delay={i * 100}>
      <div style={{
        position: "relative", borderRadius: 24, display: "flex", flexDirection: "column", height: "100%", padding: "2rem",
        background: p.featured ? "linear-gradient(160deg,#071E3D,#1B3F8A)" : "white",
        border: p.featured ? "none" : "1.5px solid #EAF0F8",
        boxShadow: hovered
          ? (p.featured ? "0 32px 72px rgba(27,63,138,0.5)" : "0 20px 48px rgba(14,66,120,0.15)")
          : (p.featured ? "0 20px 60px rgba(27,63,138,0.35)" : "0 2px 20px rgba(14,66,120,0.07)"),
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        {p.tag && (
          <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", padding: "0.25rem 1rem", borderRadius: 99, fontSize: "0.72rem", fontWeight: 700, whiteSpace: "nowrap", color: "white", background: p.featured ? "linear-gradient(90deg,#F59E0B,#FBBF24)" : "linear-gradient(90deg,#00AEEF,#0e7abf)", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
            {p.tag}
          </div>
        )}
        <div style={{ width: 44, height: 44, borderRadius: 12, background: p.featured ? "rgba(255,255,255,0.12)" : "#EBF4FF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
          <p.icon size={20} style={{ color: p.featured ? "#7DDEFF" : p.accent }} />
        </div>
        <h3 style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 4, color: p.featured ? "white" : "#071E3D" }}>{p.title}</h3>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: p.featured ? "rgba(255,255,255,0.6)" : "#607D96", marginBottom: "1.25rem" }}>{p.desc}</p>
        <div style={{ marginBottom: "1.5rem" }}>
          {p.oldPrice && (
            <span style={{ fontSize: "1.2rem", color: p.featured ? "rgba(255,255,255,0.4)" : "#CBD5E1", textDecoration: "line-through", marginRight: 8, fontFamily: "Georgia,serif" }}>{p.oldPrice} zł</span>
          )}
          <span style={{ fontFamily: "Georgia,serif", fontSize: "2.4rem", color: p.featured ? "white" : "#071E3D", fontWeight: 400 }}>{p.price}</span>
          <span style={{ fontSize: "0.875rem", marginLeft: 6, color: p.featured ? "rgba(255,255,255,0.5)" : "#8FA5BC" }}>{p.unit}</span>
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          {p.features.map(f => (
            <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.875rem", color: p.featured ? "rgba(255,255,255,0.75)" : "#4A6580" }}>
              <CheckCircle size={15} style={{ color: p.featured ? "#7DDEFF" : p.accent, flexShrink: 0 }} />
              {f}
            </li>
          ))}
        </ul>
        <a href="/rezerwacja"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "0.875rem", borderRadius: 12, fontSize: "0.875rem", fontWeight: 600, textAlign: "center", textDecoration: "none", background: p.featured ? "linear-gradient(135deg,#00AEEF,#7DDEFF)" : p.accent + "18", color: p.featured ? "white" : p.accent, border: p.featured ? "none" : "1.5px solid " + p.accent + "40", boxSizing: "border-box", transition: "transform 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
          <Calendar size={15} /> {p.cta}
        </a>
      </div>
    </FadeSection>
  );
}

function Pricing() {
  const plans = [
    { icon: User, tag: "Cena promocyjna", title: "Sesja pojedyncza", price: "130", oldPrice: "170", unit: "zł / 80 min", desc: "Idealna na pierwsze doświadczenie lub jednorazową regenerację.", features: ["80 minut w komorze mHBOT", "Konsultacja wstępna", "Opieka personelu medycznego"], cta: "Zarezerwuj sesję", accent: "#1B3F8A", featured: false },
    { icon: Package, tag: "Oszczędzasz 200 zł", title: "Pakiet 10 wejść", price: "1100", unit: "zł / 10 sesji", desc: "Najchętniej wybierany pakiet – pełny cykl regeneracyjny dla trwałych efektów.", features: ["10 x 80 minut", "Priorytetowe rezerwacje", "Dedykowany opiekun", "Bezpłatna konsultacja", "Monitorowanie postępu"], cta: "Wybierz pakiet", accent: "#1B3F8A", featured: true },
    { icon: Award, tag: "Najlepsza wartość", title: "Pakiet 25 wejść", price: "2100", unit: "zł / 25 sesji", desc: "Dla osób szukających długofalowych efektów – najkorzystniejsza cena za sesję.", features: ["25 x 80 minut", "Oszczędzasz aż 1 250 zł", "Priorytetowe rezerwacje", "Dedykowany opiekun", "Pełny program regeneracji"], cta: "Wybierz pakiet 25", accent: "#00AEEF", featured: false },
  ];
  return (
    <section id="oferta" style={{ padding: "9rem 1.5rem", background: "white" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.4rem 1rem", borderRadius: 99, marginBottom: "1.25rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", background: "#EBF4FF", color: "#1B3F8A" }}>
              <Award size={12} /> Cennik
            </div>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#071E3D", fontWeight: 400 }}>
              Oferta zabiegów mHBOT
            </h2>
          </div>
        </FadeSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, alignItems: "stretch" }}>
          {plans.map((p, i) => <PricingCard key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function Safety() {
  const items = [
    "Nieleczona odma płucna (pneumothorax)",
    "Stosowanie niektórych leków chemioterapeutycznych (bleomycyna, cisplatyna)",
    "Ciąża (I trymestr – wymagana konsultacja lekarska)",
    "Nieleczone choroby ucha środkowego lub zatok",
    "Aktywne zapalenie płuc lub infekcja górnych dróg oddechowych",
    "Ciężka niewydolność serca",
    "Klaustrofobia (oceniana indywidualnie)",
    "Aktywna padaczka bez kontroli farmakologicznej",
  ];
  return (
    <section id="bezpieczenstwo" style={{ padding: "9rem 1.5rem", background: "#F0F6FD" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "4rem", alignItems: "center" }}>
        <FadeSection>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.4rem 1rem", borderRadius: 99, marginBottom: "1.25rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", background: "#DBEAFE", color: "#1B3F8A" }}>
              <Shield size={12} /> Bezpieczeństwo
            </div>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#071E3D", fontWeight: 400, lineHeight: 1.3, marginBottom: "1rem" }}>
              Twoje bezpieczeństwo jest naszym priorytetem
            </h2>
            <p style={{ lineHeight: 1.75, color: "#4A6580", marginBottom: "1.5rem" }}>
              Profesjonalna obsługa wyjaśni Ci zalety korzystania z komory i przeprowadzi szczegółowy wywiad zdrowotny przed każdym zabiegiem.
            </p>
            {[
              { icon: Heart, text: "Konsultacja medyczna przed każdą serią zabiegów" },
              { icon: Activity, text: "Monitorowanie saturacji O₂ w czasie rzeczywistym" },
              { icon: Award, text: "Certyfikat CE · Normy ISO · Ubezpieczenie OC" },
            ].map(item => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, fontSize: "0.875rem", color: "#1a3a5c" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <item.icon size={15} style={{ color: "#1B3F8A" }} />
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </FadeSection>

        <FadeSection delay={150}>
          <div style={{ borderRadius: 20, padding: "1.5rem", background: "white", border: "1px solid #E0ECFA", boxShadow: "0 4px 24px rgba(14,66,120,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem", paddingBottom: "1rem", borderBottom: "1px solid #EAF0F8" }}>
              <XCircle size={18} style={{ color: "#EF4444" }} />
              <h3 style={{ fontWeight: 600, color: "#071E3D", fontSize: "0.95rem" }}>Przeciwwskazania bezwzględne i względne</h3>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((c, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: "0.875rem", color: "#4A6580", lineHeight: 1.55 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#FEF2F2", border: "1px solid #FECACA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <span style={{ fontSize: 9, color: "#EF4444", fontWeight: 700 }}>x</span>
                  </div>
                  {c}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: "0.75rem", marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid #EAF0F8", color: "#8FA5BC", lineHeight: 1.6 }}>
              Lista nie jest wyczerpująca. Ostateczną kwalifikację przeprowadza personel Komory Hiperbarycznej Śląsk Sosnowiec (mHBOT).
            </p>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Szymon Dziechciarz", initials: "Sz", role: "Biegacz", stars: 5, date: "3 miesiące temu", text: "Jako biegacz zauważyłem znaczący wzrost wydolności płuc. Oddechy są głębsze, a długie dystanse pokonuję ze znacznie mniejszym wysiłkiem niż wcześniej. Niesamowite efekty!" },
    { name: "Dawid Ryndak", initials: "D", role: "Klient gabinetu", stars: 5, date: "3 lata temu", text: "Super miejsce dostępne w mieście. Profesjonalna obsługa wyjaśni zalety korzystania z komory. Polecam każdemu, kto szuka skutecznej metody regeneracji." },
    { name: "Joanna Gwizdała", initials: "J", role: "Stała klientka", stars: 5, date: "5 lat temu", text: "Świetny sposób regeneracji po długim i męczącym dniu. Polecam zajrzeć. Obsługa przemiła – od razu czujesz się zaopiekowany i w dobrych rękach." },
  ];
  return (
    <section id="opinie" style={{ padding: "9rem 1.5rem", background: "white" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.4rem 1rem", borderRadius: 99, marginBottom: "1.25rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", background: "#EBF4FF", color: "#1B3F8A" }}>
              <Star size={12} /> Opinie z Google
            </div>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#071E3D", fontWeight: 400 }}>
              Co mówią nasi pacjenci?
            </h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: "1rem" }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={22} fill="#F59E0B" style={{ color: "#F59E0B" }} />)}
              <span style={{ fontFamily: "Georgia,serif", fontSize: "1.5rem", color: "#071E3D", fontWeight: 400 }}>5,0</span>
              <span style={{ color: "#8FA5BC" }}>- 6 opinii Google</span>
            </div>
          </div>
        </FadeSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
          {reviews.map((r, i) => (
            <FadeSection key={r.name} delay={i * 100}>
              <div style={{ padding: "1.75rem", borderRadius: 20, background: "#F8FBFF", border: "1px solid #EAF0F8", display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(14,66,120,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: "1rem" }}>
                  {[1,2,3,4,5].map(j => <Star key={j} size={14} fill="#F59E0B" style={{ color: "#F59E0B" }} />)}
                  <span style={{ fontSize: "0.75rem", marginLeft: 8, color: "#8FA5BC" }}>Google - {r.date}</span>
                </div>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#4A6580", fontStyle: "italic", flex: 1, marginBottom: "1.25rem" }}>"{r.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: "1rem", borderTop: "1px solid #EAF0F8" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#1B3F8A,#00AEEF)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "white" }}>{r.initials}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#071E3D" }}>{r.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#8FA5BC" }}>{r.role}</div>
                  </div>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

const EMAILJS_SERVICE = "service_69ji9tb";
const EMAILJS_TEMPLATE_CONTACT = "template_6s7aatj";
const EMAILJS_KEY = "7dkS7I0LMk52DKooI";

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Podaj imię i nazwisko";
    if (!form.phone.trim()) e.phone = "Podaj numer telefonu";
    if (!form.msg.trim()) e.msg = "Wpisz treść wiadomości";
    return e;
  }

  async function handleSend() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSending(true);
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE_CONTACT, {
        name: form.name, phone: form.phone,
        email: form.email || "nie podano",
        message: form.msg,
      }, EMAILJS_KEY);
      setSent(true);
    } catch(err) {
      console.error(err);
      alert("Błąd wysyłki. Zadzwoń: +48 608 531 549");
    } finally {
      setSending(false);
    }
  }
  const hours = [
    ["Poniedziałek", "09:00 - 18:00"], ["Wtorek", "09:00 - 18:00"],
    ["Środa", "09:00 - 18:00"], ["Czwartek", "09:00 - 18:00"],
    ["Piątek", "09:00 - 18:00"], ["Sobota", "10:00 - 15:00"], ["Niedziela", "Zamknięte"],
  ];
  return (
    <section id="kontakt" style={{ background: "#071E3D" }}>
      <div style={{ padding: "4rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "2.5rem" }}>
          {[
            { icon: MapPin, title: "Adres", lines: ["al. Zwycięstwa 6", "41-200 Sosnowiec", "woj. śląskie"] },
            { icon: Phone, title: "Telefon", lines: ["+48 608 531 549"] },
          ].map((item, i) => (
            <FadeSection key={item.title} delay={i * 80}>
              <div>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(0,174,239,0.15)", border: "1px solid rgba(0,174,239,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <item.icon size={18} style={{ color: "#7DDEFF" }} />
                </div>
                <h4 style={{ fontWeight: 600, fontSize: "0.875rem", color: "white", marginBottom: "0.5rem" }}>{item.title}</h4>
                {item.lines.map(l => <p key={l} style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.9, margin: 0 }}>{l}</p>)}
              </div>
            </FadeSection>
          ))}
          <FadeSection delay={160}>
            <div>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(0,174,239,0.15)", border: "1px solid rgba(0,174,239,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <Clock size={18} style={{ color: "#7DDEFF" }} />
              </div>
              <h4 style={{ fontWeight: 600, fontSize: "0.875rem", color: "white", marginBottom: "0.5rem" }}>Godziny otwarcia</h4>
              {hours.map(([d, h]) => (
                <div key={d} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", gap: 16, color: h === "Zamknięte" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.65)", marginBottom: 4 }}>
                  <span>{d}</span><span style={{ color: h === "Zamknięte" ? "rgba(255,255,255,0.3)" : "#7DDEFF", fontWeight: 600 }}>{h}</span>
                </div>
              ))}
            </div>
          </FadeSection>
          <FadeSection delay={240}>
            <div>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(0,174,239,0.15)", border: "1px solid rgba(0,174,239,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <ParkingCircle size={18} style={{ color: "#7DDEFF" }} />
              </div>
              <h4 style={{ fontWeight: 600, fontSize: "0.875rem", color: "white", marginBottom: "0.5rem" }}>Informacje praktyczne</h4>
              {["Darmowy parking przed wejściem", "Dostęp dla niepełnosprawnych", "Brak skierowania lekarskiego"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                  <CheckCircle size={13} style={{ color: "#00AEEF", flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.5 }}>{t}</p>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </div>

      <div style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "2.5rem" }}>
          <FadeSection>
            <div>
              <h3 style={{ fontFamily: "Georgia,serif", fontSize: "1.2rem", color: "white", fontWeight: 400, marginBottom: "1.25rem" }}>Znajdź nas na mapie</h3>
              <div style={{ borderRadius: 20, overflow: "hidden", height: 360 }}>
                <iframe title="Mapa" src="https://www.google.com/maps?q=al.+Zwyci%C4%99stwa+6,+41-200+Sosnowiec,+Polska&output=embed" width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </FadeSection>

          <FadeSection delay={100}>
            <div>
              <h3 style={{ fontFamily: "Georgia,serif", fontSize: "1.2rem", color: "white", fontWeight: 400, marginBottom: "1.25rem" }}>Napisz do nas</h3>
              {sent ? (
                <div style={{ borderRadius: 20, padding: "2rem", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
                  <CheckCircle size={40} style={{ color: "#34D399" }} />
                  <p style={{ fontWeight: 600, color: "white", margin: 0 }}>Wiadomość wysłana!</p>
                  <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", margin: 0 }}>Odpiszemy wkrótce.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[["name","Imię i nazwisko"],["phone","Numer telefonu"]].map(([k, ph]) => (
                      <div key={k}>
                        <input placeholder={ph} value={form[k]} onChange={e => { setForm({...form,[k]:e.target.value}); setErrors({...errors,[k]:""}); }}
                          style={{ borderRadius: 12, padding: "0.75rem 1rem", fontSize: "0.875rem", background: "rgba(255,255,255,0.06)", border: errors[k] ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none", width: "100%", boxSizing: "border-box" }} />
                        {errors[k] && <p style={{ margin: "4px 0 0", fontSize: "0.72rem", color: "#FCA5A5" }}>{errors[k]}</p>}
                      </div>
                    ))}
                  </div>
                  <input placeholder="Adres e-mail (opcjonalnie)" value={form.email} onChange={e => setForm({...form,email:e.target.value})}
                    style={{ borderRadius: 12, padding: "0.75rem 1rem", fontSize: "0.875rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none", width: "100%", boxSizing: "border-box" }} />
                  <div>
                    <textarea rows={4} placeholder="Treść wiadomości lub preferowany termin..." value={form.msg} onChange={e => { setForm({...form,msg:e.target.value}); setErrors({...errors,msg:""}); }}
                      style={{ borderRadius: 12, padding: "0.75rem 1rem", fontSize: "0.875rem", background: "rgba(255,255,255,0.06)", border: errors.msg ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none", width: "100%", resize: "none", boxSizing: "border-box" }} />
                    {errors.msg && <p style={{ margin: "4px 0 0", fontSize: "0.72rem", color: "#FCA5A5" }}>{errors.msg}</p>}
                  </div>
                  <button onClick={handleSend} disabled={sending}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "1rem", borderRadius: 12, fontWeight: 600, fontSize: "0.875rem", color: "white", background: sending ? "rgba(0,174,239,0.5)" : "linear-gradient(135deg,#00AEEF,#1B3F8A)", border: "none", cursor: sending ? "not-allowed" : "pointer", boxShadow: "0 6px 24px rgba(0,174,239,0.35)", transition: "transform 0.2s" }}
                    onMouseEnter={e => { if(!sending) e.currentTarget.style.transform = "scale(1.02)"; }}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                    <Send size={16} /> {sending ? "Wysyłanie..." : "Wyślij wiadomość"}
                  </button>
                  <a href="tel:+48608531549" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "0.875rem", borderRadius: 12, fontSize: "0.875rem", fontWeight: 500, color: "rgba(255,255,255,0.7)", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <Phone size={15} style={{ color: "#7DDEFF" }} /> Wolisz zadzwonić? <strong style={{ color: "#7DDEFF" }}>+48 608 531 549</strong>
                  </a>
                </div>
              )}
            </div>
          </FadeSection>
        </div>
      </div>

      <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Logo size={30} />
            <span style={{ fontFamily: "Georgia,serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)" }}>
              Komora Hiperbaryczna Śląsk Sosnowiec 2026
            </span>
          </div>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", margin: 0 }}>
            al. Zwycięstwa 6, 41-200 Sosnowiec - Wszelkie prawa zastrzeżone
          </p>
        </div>
      </div>
    </section>
  );
}


function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "Czy zabiegi mHBOT są bezpieczne?", a: "Tak. Terapia w komorach miękkich (1.3–1.5 ATA) jest bezpieczna i nie wymaga skierowania lekarskiego. Przed każdym zabiegiem przeprowadzamy szczegółowy wywiad zdrowotny." },
    { q: "Ile trwa jedna sesja?", a: "Jedna sesja trwa 80 minut. Zalecamy, aby przed pierwszą wizytą zjawić się kilka minut wcześniej na krótką konsultację." },
    { q: "Ile sesji potrzebuję?", a: "To zależy od celu. Pierwsze efekty odczuwalne są już po 3–5 sesjach. Dla trwałych rezultatów rekomendujemy pakiet 10 lub 25 sesji." },
    { q: "Czy mogę przyjść bez skierowania?", a: "Tak, nie wymagamy skierowania lekarskiego. Wystarczy rezerwacja — możesz ją wykonać online lub telefonicznie." },
    { q: "Jak się przygotować do zabiegu?", a: "Przyjdź w wygodnym ubraniu. Unikaj alkoholu i intensywnego wysiłku fizycznego na 2 godziny przed sesją. Warto być nawodnionym." },
    { q: "Czy komora jest odpowiednia dla dzieci?", a: "Terapia może być stosowana u dzieci, jednak wymaga indywidualnej konsultacji z naszym personelem przed pierwszą sesją." },
  ];
  return (
    <section id="faq" style={{ padding: "6rem 1.5rem", background: "#F8FBFF" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.4rem 1rem", borderRadius: 99, marginBottom: "1.25rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", background: "#EBF4FF", color: "#1B3F8A" }}>
              <CheckCircle size={12} /> Najczęstsze pytania
            </div>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: "#071E3D", fontWeight: 400 }}>FAQ</h2>
          </div>
        </FadeSection>
        {faqs.map((f, i) => (
          <FadeSection key={i} delay={i * 60}>
            <div style={{ borderBottom: "1px solid #EAF0F8", overflow: "hidden" }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}>
                <span style={{ fontWeight: 600, color: "#071E3D", fontSize: "0.95rem", lineHeight: 1.4 }}>{f.q}</span>
                <ChevronDown size={18} style={{ color: "#00AEEF", flexShrink: 0, transform: open === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }} />
              </button>
              {open === i && (
                <p style={{ margin: "0 0 1.25rem", fontSize: "0.875rem", color: "#4A6580", lineHeight: 1.75 }}>{f.a}</p>
              )}
            </div>
          </FadeSection>
        ))}
      </div>
    </section>
  );
}

function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    function handleMouseLeave(e) {
      if (e.clientY <= 0 && !shown.current) {
        shown.current = true;
        setTimeout(() => setShow(true), 200);
      }
    }
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  async function handleSend() {
    if (!phone.trim()) return;
    setSending(true);
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.send("service_69ji9tb", "template_6s7aatj", {
        name: "Exit Intent",
        phone: phone,
        email: "nie podano",
        message: "Prośba o oddzwonienie z pop-up exit intent",
      }, "7dkS7I0LMk52DKooI");
      setSent(true);
    } catch(e) { console.error(e); }
    finally { setSending(false); }
  }

  if (!show) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(7,30,61,0.75)", backdropFilter: "blur(6px)" }}
      onClick={e => { if (e.target === e.currentTarget) setShow(false); }}>
      <div style={{ background: "white", borderRadius: 24, padding: "2.5rem", maxWidth: 420, width: "90%", boxShadow: "0 32px 80px rgba(7,30,61,0.3)", position: "relative", animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>
        <style>{`@keyframes popIn { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }`}</style>
        <button onClick={() => setShow(false)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "#8FA5BC", fontSize: 20, lineHeight: 1 }}>✕</button>
        {sent ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <CheckCircle size={48} style={{ color: "#10B981", marginBottom: 16 }} />
            <h3 style={{ fontFamily: "Georgia,serif", color: "#071E3D", marginBottom: 8 }}>Oddzwonimy wkrótce!</h3>
            <p style={{ color: "#4A6580", fontSize: "0.9rem" }}>Zwykle kontaktujemy się w ciągu 15 minut w godzinach otwarcia.</p>
          </div>
        ) : (
          <>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg,#EBF4FF,#DBEAFE)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
              <Phone size={24} style={{ color: "#1B3F8A" }} />
            </div>
            <h3 style={{ fontFamily: "Georgia,serif", fontSize: "1.4rem", color: "#071E3D", fontWeight: 400, marginBottom: "0.5rem", lineHeight: 1.3 }}>Zostaw numer — oddzwonimy w 15 min</h3>
            <p style={{ color: "#4A6580", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>Masz pytania o terapię? Nasz specjalista oddzwoni i odpowie na wszystko bezpłatnie.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <input
                placeholder="Twój numer telefonu"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                style={{ flex: 1, borderRadius: 12, padding: "0.75rem 1rem", fontSize: "0.875rem", border: "1.5px solid #DBEAFE", outline: "none", color: "#071E3D", background: "#F8FBFF" }}
              />
              <button onClick={handleSend} disabled={sending}
                style={{ padding: "0.75rem 1.25rem", borderRadius: 12, fontWeight: 700, fontSize: "0.875rem", color: "white", background: "linear-gradient(135deg,#00AEEF,#1B3F8A)", border: "none", cursor: sending ? "not-allowed" : "pointer", whiteSpace: "nowrap", opacity: sending ? 0.7 : 1 }}>
                {sending ? "..." : "Wyślij"}
              </button>
            </div>
            <p style={{ fontSize: "0.72rem", color: "#8FA5BC", marginTop: "0.75rem", textAlign: "center" }}>Nie spamujemy. Zadzwonimy tylko raz.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "'Segoe UI',system-ui,sans-serif", overflowX: "hidden" }}>
      <ExitIntentPopup />
      <Nav />
      <Hero />
      <WhyOxygen />
      <Pricing />
      <Safety />
      <Testimonials />
      <FAQ />
      <Contact />
    </div>
  );
}
