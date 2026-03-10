import { useState, useEffect } from "react";
import { LogOut, CheckCircle, XCircle, Clock, Phone, Calendar, User, Wind, Trash2, RefreshCw } from "lucide-react";

const ADMIN_PASS = "komora2026";

function loadReservations() {
  try { return JSON.parse(localStorage.getItem("reservations") || "[]"); }
  catch { return []; }
}

function saveReservations(all) {
  localStorage.setItem("reservations", JSON.stringify(all));
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pl-PL", { weekday: "short", day: "numeric", month: "short" });
}

function StatusBadge({ status }) {
  const map = {
    pending:   { label: "Oczekuje",    bg: "#FEF3C7", color: "#D97706" },
    confirmed: { label: "Potwierdzona", bg: "#D1FAE5", color: "#059669" },
    cancelled: { label: "Anulowana",   bg: "#FEE2E2", color: "#DC2626" },
  };
  const s = map[status] || map.pending;
  return (
    <span style={{ padding: "0.2rem 0.65rem", borderRadius: 99, fontSize: "0.72rem", fontWeight: 700, background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

function Login({ onLogin }) {
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);

  function submit() {
    if (pass === ADMIN_PASS) { onLogin(); }
    else { setErr(true); setTimeout(() => setErr(false), 2000); }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#071E3D,#1B3F8A)", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <div style={{ background: "white", borderRadius: 24, padding: "2.5rem", width: "100%", maxWidth: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg,#1B3F8A,#00AEEF)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <Wind size={28} color="white" />
          </div>
          <h1 style={{ fontFamily: "Georgia,serif", fontSize: "1.3rem", color: "#071E3D", fontWeight: 400 }}>Panel Admina</h1>
          <p style={{ fontSize: "0.8rem", color: "#8FA5BC", marginTop: 4 }}>Komora Hiperbaryczna Sosnowiec</p>
        </div>
        <input type="password" value={pass} onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
          placeholder="Hasło administratora"
          style={{ width: "100%", padding: "0.875rem 1rem", borderRadius: 12, border: err ? "1.5px solid #EF4444" : "1.5px solid #EAF0F8", fontSize: "0.95rem", outline: "none", marginBottom: "1rem", boxSizing: "border-box", color: "#071E3D" }} />
        {err && <p style={{ color: "#EF4444", fontSize: "0.8rem", marginBottom: "0.75rem", textAlign: "center" }}>Nieprawidłowe hasło</p>}
        <button onClick={submit}
          style={{ width: "100%", padding: "0.875rem", borderRadius: 12, border: "none", cursor: "pointer", fontSize: "0.95rem", fontWeight: 700, color: "white", background: "linear-gradient(135deg,#1B3F8A,#00AEEF)", boxShadow: "0 6px 20px rgba(27,63,138,0.35)" }}>
          Zaloguj się
        </button>
      </div>
    </div>
  );
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState("all");

  function refresh() {
    setReservations(loadReservations().sort((a,b) => new Date(a.date + " " + a.hour) - new Date(b.date + " " + b.hour)));
  }

  useEffect(() => { if (loggedIn) refresh(); }, [loggedIn]);

  function updateStatus(id, status) {
    const all = loadReservations().map(r => r.id === id ? { ...r, status } : r);
    saveReservations(all);
    refresh();
  }

  function deleteRes(id) {
    if (!window.confirm("Usunąć tę rezerwację?")) return;
    const all = loadReservations().filter(r => r.id !== id);
    saveReservations(all);
    refresh();
  }

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const filtered = reservations.filter(r => filter === "all" || r.status === filter);
  const counts = {
    all: reservations.length,
    pending: reservations.filter(r => r.status === "pending").length,
    confirmed: reservations.filter(r => r.status === "confirmed").length,
    cancelled: reservations.filter(r => r.status === "cancelled").length,
  };

  const today = new Date().toISOString().split("T")[0];
  const todayRes = reservations.filter(r => r.date === today && r.status !== "cancelled");

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Segoe UI',system-ui,sans-serif", background: "#F8FBFF" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; }`}</style>

      {/* Nav */}
      <header style={{ background: "linear-gradient(135deg,#071E3D,#1B3F8A)", padding: "1rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Wind size={22} color="white" />
            <span style={{ fontFamily: "Georgia,serif", color: "white", fontSize: "1rem" }}>Panel Admina</span>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={refresh} style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 8, padding: "0.5rem 0.75rem", cursor: "pointer", color: "white", display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem" }}>
              <RefreshCw size={14} /> Odśwież
            </button>
            <button onClick={() => setLoggedIn(false)} style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 8, padding: "0.5rem 0.75rem", cursor: "pointer", color: "white", display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem" }}>
              <LogOut size={14} /> Wyloguj
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: "2rem" }}>
          {[
            { label: "Wszystkie", value: counts.all, color: "#1B3F8A", bg: "#EBF4FF" },
            { label: "Oczekujące", value: counts.pending, color: "#D97706", bg: "#FEF3C7" },
            { label: "Potwierdzone", value: counts.confirmed, color: "#059669", bg: "#D1FAE5" },
            { label: "Dzisiaj", value: todayRes.length, color: "#7C3AED", bg: "#EDE9FE" },
          ].map(s => (
            <div key={s.label} style={{ background: "white", borderRadius: 16, padding: "1.25rem", border: "1px solid #EAF0F8", boxShadow: "0 2px 12px rgba(14,66,120,0.06)" }}>
              <div style={{ fontSize: "2rem", fontFamily: "Georgia,serif", color: s.color, fontWeight: 400 }}>{s.value}</div>
              <div style={{ fontSize: "0.8rem", color: "#8FA5BC", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {[["all","Wszystkie"],["pending","Oczekujące"],["confirmed","Potwierdzone"],["cancelled","Anulowane"]].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)}
              style={{ padding: "0.5rem 1.25rem", borderRadius: 99, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", border: "1.5px solid", transition: "all 0.2s", background: filter === val ? "#1B3F8A" : "white", color: filter === val ? "white" : "#1B3F8A", borderColor: filter === val ? "#1B3F8A" : "#DBEAFE" }}>
              {label} ({counts[val] ?? reservations.filter(r => r.status === val).length})
            </button>
          ))}
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#8FA5BC", background: "white", borderRadius: 20, border: "1px solid #EAF0F8" }}>
            Brak rezerwacji
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map(r => (
              <div key={r.id} style={{ background: "white", borderRadius: 16, padding: "1.25rem 1.5rem", border: "1px solid #EAF0F8", boxShadow: "0 2px 12px rgba(14,66,120,0.05)", display: "flex", alignItems: "center", flexWrap: "wrap", gap: 16 }}>

                {/* Data i godzina */}
                <div style={{ minWidth: 140 }}>
                  <div style={{ fontWeight: 700, color: "#071E3D", display: "flex", alignItems: "center", gap: 6 }}>
                    <Calendar size={14} style={{ color: "#1B3F8A" }} />
                    {formatDate(r.date)}
                  </div>
                  <div style={{ fontSize: "1.1rem", fontFamily: "Georgia,serif", color: "#1B3F8A", marginTop: 2 }}>
                    <Clock size={13} style={{ marginRight: 4, verticalAlign: "middle" }} />{r.hour}
                  </div>
                </div>

                {/* Klient */}
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ fontWeight: 600, color: "#071E3D", display: "flex", alignItems: "center", gap: 6 }}>
                    <User size={13} style={{ color: "#8FA5BC" }} /> {r.name}
                  </div>
                  <a href={"tel:" + r.phone} style={{ fontSize: "0.875rem", color: "#1B3F8A", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                    <Phone size={13} /> {r.phone}
                  </a>
                  {r.note && <div style={{ fontSize: "0.78rem", color: "#8FA5BC", marginTop: 4, fontStyle: "italic" }}>"{r.note}"</div>}
                </div>

                {/* Status */}
                <StatusBadge status={r.status} />

                {/* Akcje */}
                <div style={{ display: "flex", gap: 8 }}>
                  {r.status === "pending" && (
                    <>
                      <button onClick={() => updateStatus(r.id, "confirmed")}
                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.5rem 1rem", borderRadius: 8, border: "none", cursor: "pointer", background: "#D1FAE5", color: "#059669", fontWeight: 600, fontSize: "0.8rem" }}>
                        <CheckCircle size={14} /> Potwierdź
                      </button>
                      <button onClick={() => updateStatus(r.id, "cancelled")}
                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.5rem 1rem", borderRadius: 8, border: "none", cursor: "pointer", background: "#FEE2E2", color: "#DC2626", fontWeight: 600, fontSize: "0.8rem" }}>
                        <XCircle size={14} /> Odrzuć
                      </button>
                    </>
                  )}
                  {r.status === "confirmed" && (
                    <button onClick={() => updateStatus(r.id, "cancelled")}
                      style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.5rem 1rem", borderRadius: 8, border: "none", cursor: "pointer", background: "#FEE2E2", color: "#DC2626", fontWeight: 600, fontSize: "0.8rem" }}>
                      <XCircle size={14} /> Anuluj
                    </button>
                  )}
                  <button onClick={() => deleteRes(r.id)}
                    style={{ padding: "0.5rem", borderRadius: 8, border: "none", cursor: "pointer", background: "#F1F5F9", color: "#94A3B8" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
