import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Clock, Tag, Calendar, Search, ChevronRight, Phone } from "lucide-react";

// Logo shared with main landing page
import { LOGO_SRC } from "./logo.js";

const CATEGORY_COLORS = {
  "Edukacja": { bg: "#EBF4FF", color: "#1B3F8A" },
  "Sport":    { bg: "#FEF3C7", color: "#D97706" },
  "Beauty":   { bg: "#FCE7F3", color: "#DB2777" },
  "Zdrowie":  { bg: "#D1FAE5", color: "#059669" },
  "Wellness": { bg: "#EEF2FF", color: "#4F46E5" },
};

function Badge({ category }) {
  const c = CATEGORY_COLORS[category] || { bg: "#F3F4F6", color: "#374151" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "0.2rem 0.65rem", borderRadius: 99, fontSize: "0.72rem", fontWeight: 700, background: c.bg, color: c.color }}>
      <Tag size={10} /> {category}
    </span>
  );
}

function PostCard({ post, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onClick(post)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20, background: "white", border: "1px solid #EAF0F8",
        boxShadow: hovered ? "0 20px 48px rgba(14,66,120,0.13)" : "0 2px 16px rgba(14,66,120,0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s ease", cursor: "pointer", overflow: "hidden",
      }}
    >
      {/* Top emoji banner */}
      <div style={{ height: 120, background: "linear-gradient(135deg,#071E3D,#1B3F8A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem" }}>
        {post.image}
      </div>
      <div style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem", flexWrap: "wrap" }}>
          <Badge category={post.category} />
          <span style={{ fontSize: "0.72rem", color: "#8FA5BC", display: "flex", alignItems: "center", gap: 4 }}>
            <Calendar size={11} /> {new Date(post.date).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          <span style={{ fontSize: "0.72rem", color: "#8FA5BC", display: "flex", alignItems: "center", gap: 4 }}>
            <Clock size={11} /> {post.readTime}
          </span>
        </div>
        <h2 style={{ fontFamily: "Georgia,serif", fontSize: "1.1rem", fontWeight: 400, color: "#071E3D", lineHeight: 1.4, marginBottom: "0.75rem" }}>{post.title}</h2>
        <p style={{ fontSize: "0.875rem", color: "#607D96", lineHeight: 1.65, marginBottom: "1.25rem" }}>{post.excerpt}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.875rem", fontWeight: 600, color: "#1B3F8A" }}>
          Czytaj dalej <ChevronRight size={15} />
        </div>
      </div>
    </div>
  );
}

function PostView({ post, onBack }) {
  const paragraphs = post.content.split("\\n\\n").filter(Boolean);
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "2rem 1.5rem" }}>
      <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.6rem 1.25rem", borderRadius: 99, fontSize: "0.875rem", fontWeight: 600, color: "#1B3F8A", background: "#EBF4FF", border: "none", cursor: "pointer", marginBottom: "2.5rem", transition: "background 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.background = "#DBEAFE"}
        onMouseLeave={e => e.currentTarget.style.background = "#EBF4FF"}>
        <ArrowLeft size={15} /> Powrót do bloga
      </button>

      <div style={{ fontSize: "4rem", textAlign: "center", marginBottom: "1.5rem" }}>{post.image}</div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Badge category={post.category} />
        <span style={{ fontSize: "0.8rem", color: "#8FA5BC", display: "flex", alignItems: "center", gap: 4 }}>
          <Calendar size={12} /> {new Date(post.date).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
        </span>
        <span style={{ fontSize: "0.8rem", color: "#8FA5BC", display: "flex", alignItems: "center", gap: 4 }}>
          <Clock size={12} /> {post.readTime} czytania
        </span>
      </div>

      <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 400, color: "#071E3D", lineHeight: 1.3, textAlign: "center", marginBottom: "2.5rem" }}>{post.title}</h1>

      <div style={{ borderTop: "1px solid #EAF0F8", paddingTop: "2rem" }}>
        {paragraphs.map((p, i) => (
          <p key={i} style={{ fontSize: "1rem", lineHeight: 1.85, color: "#374151", marginBottom: "1.5rem" }}>{p}</p>
        ))}
      </div>

      {/* CTA */}
      <div style={{ marginTop: "3rem", padding: "2rem", borderRadius: 20, background: "linear-gradient(135deg,#071E3D,#1B3F8A)", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1rem", fontSize: "0.95rem" }}>Chcesz spróbować terapii mHBOT?</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <a href="/#oferta" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.875rem 2rem", borderRadius: 99, fontWeight: 700, fontSize: "0.875rem", color: "white", textDecoration: "none", background: "linear-gradient(135deg,#00AEEF,#1B3F8A)", boxShadow: "0 6px 20px rgba(0,174,239,0.4)" }}>
            Zobacz cennik
          </a>
          <a href="tel:+48608531549" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.875rem 2rem", borderRadius: 99, fontWeight: 600, fontSize: "0.875rem", color: "#1B3F8A", textDecoration: "none", border: "1.5px solid #DBEAFE", background: "white" }}>
            <Phone size={15} /> +48 608 531 549
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Wszystkie");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("posts.json")
      .then(r => r.json())
      .then(data => { setPosts(data.posts); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["Wszystkie", ...Object.keys(CATEGORY_COLORS)];

  const filtered = posts.filter(p => {
    const matchCat = activeCategory === "Wszystkie" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Segoe UI',system-ui,sans-serif", background: "#F8FBFF" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }`}</style>

      {/* Nav */}
      <header style={{ background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", boxShadow: "0 1px 30px rgba(14,66,120,0.08)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <img src={LOGO_SRC} alt="Komora Hiperbaryczna" style={{ width: 42, height: 42, borderRadius: 8, objectFit: "contain" }} />
            <div>
              <div style={{ fontFamily: "Georgia,serif", fontWeight: 700, fontSize: "0.9rem", color: "#1B3F8A" }}>Komora Hiperbaryczna</div>
              <div style={{ fontSize: "0.65rem", fontWeight: 600, color: "#00AEEF", letterSpacing: 2 }}>BLOG</div>
            </div>
          </a>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0.6rem 1.25rem", borderRadius: 99, fontSize: "0.875rem", fontWeight: 600, color: "#1B3F8A", background: "#EBF4FF", textDecoration: "none" }}>
            <ArrowLeft size={14} /> Strona główna
          </a>
        </div>
      </header>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#071E3D,#1B3F8A)", padding: "5rem 1.5rem 4rem", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.4rem 1rem", borderRadius: 99, marginBottom: "1.25rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", background: "rgba(0,174,239,0.2)", border: "1px solid rgba(0,174,239,0.3)", color: "#7DDEFF" }}>
          Wiedza o mHBOT
        </div>
        <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, color: "white", marginBottom: "1rem" }}>Blog</h1>
        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", maxWidth: 520, margin: "0 auto" }}>
          Artykuły o tlenoterapii, regeneracji, zdrowiu i urodzie.
        </p>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.5rem" }}>
        {selected ? (
          <PostView post={selected} onBack={() => setSelected(null)} />
        ) : (
          <>
            {/* Search + filters */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", marginBottom: "2.5rem" }}>
              <div style={{ position: "relative", flex: "1 1 260px" }}>
                <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#8FA5BC" }} />
                <input
                  placeholder="Szukaj artykułów..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: "100%", padding: "0.75rem 1rem 0.75rem 2.5rem", borderRadius: 12, border: "1px solid #EAF0F8", fontSize: "0.875rem", outline: "none", background: "white", color: "#071E3D" }}
                />
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    style={{ padding: "0.5rem 1rem", borderRadius: 99, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", border: "1.5px solid", transition: "all 0.2s", background: activeCategory === cat ? "#1B3F8A" : "white", color: activeCategory === cat ? "white" : "#1B3F8A", borderColor: activeCategory === cat ? "#1B3F8A" : "#DBEAFE" }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts grid */}
            {loading ? (
              <div style={{ textAlign: "center", padding: "4rem", color: "#8FA5BC" }}>Ładowanie artykułów...</div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem", color: "#8FA5BC" }}>Brak artykułów dla wybranych filtrów.</div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
                {filtered.map(post => <PostCard key={post.id} post={post} onClick={setSelected} />)}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: "#071E3D", padding: "2rem 1.5rem", textAlign: "center", marginTop: "4rem" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
          Komora Hiperbaryczna Śląsk Sosnowiec · al. Zwycięstwa 6 · +48 608 531 549
        </p>
      </div>
    </div>
  );
}
