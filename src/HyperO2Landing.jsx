import { useState, useEffect, useRef } from "react";
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

const LOGO_SRC = "data:image/png;base64,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";

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
                style={{
                  padding: "1.75rem", borderRadius: 20, background: "white",
                  border: "1px solid #EAF0F8",
                  boxShadow: "0 2px 16px rgba(14,66,120,0.06)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
    { icon: Package, tag: "Oszczędzasz 200 zł", title: "Pakiet 10 wejsc", price: "1100", unit: "zł / 10 sesji", desc: "Najchętniej wybierany pakiet – pełny cykl regeneracyjny dla trwałych efektów.", features: ["10 x 80 minut", "Priorytetowe rezerwacje", "Dedykowany opiekun", "Bezpłatna konsultacja", "Monitorowanie postępu"], cta: "Wybierz pakiet", accent: "#1B3F8A", featured: true },
    { icon: Award, tag: "Najlepsza wartość", title: "Pakiet 25 wejsc", price: "2100", unit: "zł / 25 sesji", desc: "Dla osób szukających długofalowych efektów – najkorzystniejsza cena za sesję.", features: ["25 x 80 minut", "Oszczędzasz aż 1 250 zł", "Priorytetowe rezerwacje", "Dedykowany opiekun", "Pełny program regeneracji"], cta: "Wybierz pakiet 25", accent: "#00AEEF", featured: false },
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
    { name: "Szymon Dziechciarz", initials: "Sz", role: "Biegacz", stars: 5, date: "3 miesiace temu", text: "Jako biegacz zauważyłam znaczący wzrost wydolności płuc. Oddechy są głębsze, a długie dystanse pokonuję ze znacznie mniejszym wysiłkiem niż wcześniej. Niesamowite efekty!" },
    { name: "Dawid Ryndak", initials: "D", role: "Klient gabinetu", stars: 5, date: "3 lata temu", text: "Super miejsce dostępne w mieście. Profesjonalna obsługa wyjaśni zalety korzystania z komory. Polecam każdemu, kto szuka skutecznej metody regeneracji." },
    { name: "Joanna Gwіzdala", initials: "J", role: "Stala klientka", stars: 5, date: "5 lat temu", text: "Świetny sposób regeneracji po długim i męczącym dniu. Polecam zajrzeć. Obsługa przemiła – od razu czujesz się zaopiekowany i w dobrych rękach." },
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

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const hours = [
    ["Poniedzialek", "09:00 - 18:00"], ["Wtorek", "09:00 - 18:00"],
    ["Sroda", "09:00 - 18:00"], ["Czwartek", "09:00 - 18:00"],
    ["Piatek", "09:00 - 18:00"], ["Sobota", "10:00 - 15:00"], ["Niedziela", "Zamkniete"],
  ];
  return (
    <section id="kontakt" style={{ background: "#071E3D" }}>
      <div style={{ padding: "4rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "2.5rem" }}>
          {[
            { icon: MapPin, title: "Adres", lines: ["al. Zwyciestwa 6", "41-200 Sosnowiec", "woj. slaskie"] },
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
                <div key={d} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", gap: 16, color: h === "Zamkniete" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.65)", marginBottom: 4 }}>
                  <span>{d}</span><span style={{ color: h === "Zamkniete" ? "rgba(255,255,255,0.3)" : "#7DDEFF", fontWeight: 600 }}>{h}</span>
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
                <iframe title="Mapa" src="https://www.google.com/maps?q=al.+Zwycistwa+6,+41-200+Sosnowiec,+Polska&output=embed" width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
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
                      <input key={k} placeholder={ph} value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})}
                        style={{ borderRadius: 12, padding: "0.75rem 1rem", fontSize: "0.875rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none", width: "100%", boxSizing: "border-box" }} />
                    ))}
                  </div>
                  <input placeholder="Adres e-mail" value={form.email} onChange={e => setForm({...form,email:e.target.value})}
                    style={{ borderRadius: 12, padding: "0.75rem 1rem", fontSize: "0.875rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none", width: "100%", boxSizing: "border-box" }} />
                  <textarea rows={4} placeholder="Treść wiadomości lub preferowany termin..." value={form.msg} onChange={e => setForm({...form,msg:e.target.value})}
                    style={{ borderRadius: 12, padding: "0.75rem 1rem", fontSize: "0.875rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none", width: "100%", resize: "none", boxSizing: "border-box" }} />
                  <button onClick={() => setSent(true)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "1rem", borderRadius: 12, fontWeight: 600, fontSize: "0.875rem", color: "white", background: "linear-gradient(135deg,#00AEEF,#1B3F8A)", border: "none", cursor: "pointer", boxShadow: "0 6px 24px rgba(0,174,239,0.35)", transition: "transform 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                    <Send size={16} /> Wyślij wiadomość
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

export default function App() {
  return (
    <div style={{ fontFamily: "'Segoe UI',system-ui,sans-serif", overflowX: "hidden" }}>
      <Nav />
      <Hero />
      <WhyOxygen />
      <Pricing />
      <Safety />
      <Testimonials />
      <Contact />
    </div>
  );
}
