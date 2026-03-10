import { useState } from "react";
import { ArrowLeft, Calendar, Clock, User, Phone, CheckCircle, ChevronLeft, ChevronRight, Wind } from "lucide-react";

const HOURS = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];
const ADMIN_PASS = "komora2026";

function getStorageKey(date) { return "reservations"; }

function loadReservations() {
  try { return JSON.parse(localStorage.getItem("reservations") || "[]"); }
  catch { return []; }
}

function saveReservation(res) {
  const all = loadReservations();
  all.push(res);
  localStorage.setItem("reservations", JSON.stringify(all));
}

function isTaken(date, hour) {
  const all = loadReservations();
  return all.some(r => r.date === date && r.hour === hour && r.status !== "cancelled");
}

function isWeekend(date) {
  const d = new Date(date);
  return d.getDay() === 0;
}

function isValidDay(dateStr) {
  const d = new Date(dateStr);
  const day = d.getDay();
  if (day === 0) return false; // niedziela
  return true;
}

function availableHours(dateStr) {
  const day = new Date(dateStr).getDay();
  if (day === 6) return HOURS.slice(0, 6); // sobota 09-14
  return HOURS;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("pl-PL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function CalendarPicker({ selected, onSelect }) {
  const today = new Date();
  today.setHours(0,0,0,0);
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = month.getFullYear();
  const mon = month.getMonth();
  const firstDay = (new Date(year, mon, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, mon + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const monthName = month.toLocaleDateString("pl-PL", { month: "long", year: "numeric" });

  return (
    <div style={{ background: "white", borderRadius: 20, padding: "1.5rem", border: "1px solid #EAF0F8", boxShadow: "0 4px 24px rgba(14,66,120,0.08)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <button onClick={() => setMonth(new Date(year, mon - 1, 1))}
          style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #EAF0F8", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ChevronLeft size={16} style={{ color: "#1B3F8A" }} />
        </button>
        <span style={{ fontFamily: "Georgia,serif", fontWeight: 400, color: "#071E3D", textTransform: "capitalize" }}>{monthName}</span>
        <button onClick={() => setMonth(new Date(year, mon + 1, 1))}
          style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #EAF0F8", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ChevronRight size={16} style={{ color: "#1B3F8A" }} />
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 8 }}>
        {["Pn","Wt","Śr","Cz","Pt","Sb","Nd"].map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: "0.72rem", fontWeight: 700, color: "#8FA5BC", padding: "0.25rem" }}>{d}</div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const dateStr = `${year}-${String(mon+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
          const isPast = new Date(dateStr) < today;
          const isSun = new Date(dateStr).getDay() === 0;
          const isSelected = selected === dateStr;
          const disabled = isPast || isSun;

          return (
            <button key={i} disabled={disabled} onClick={() => onSelect(dateStr)}
              style={{
                padding: "0.5rem 0", borderRadius: 8, border: "none", cursor: disabled ? "not-allowed" : "pointer",
                fontSize: "0.875rem", fontWeight: isSelected ? 700 : 400, transition: "all 0.15s",
                background: isSelected ? "linear-gradient(135deg,#1B3F8A,#00AEEF)" : disabled ? "transparent" : "white",
                color: isSelected ? "white" : disabled ? "#CBD5E1" : isSun ? "#EF4444" : "#071E3D",
                boxShadow: isSelected ? "0 4px 12px rgba(27,63,138,0.3)" : "none",
              }}>
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step1({ onNext }) {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");

  const hours = date ? availableHours(date) : [];

  return (
    <div>
      <h2 style={{ fontFamily: "Georgia,serif", fontSize: "1.4rem", color: "#071E3D", fontWeight: 400, marginBottom: "0.5rem" }}>Wybierz termin</h2>
      <p style={{ color: "#8FA5BC", fontSize: "0.875rem", marginBottom: "2rem" }}>Dostępne godziny: pon–pt 09:00–17:00, sob 09:00–14:00</p>

      <CalendarPicker selected={date} onSelect={d => { setDate(d); setHour(""); }} />

      {date && (
        <div style={{ marginTop: "1.5rem" }}>
          <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#071E3D", marginBottom: "0.75rem" }}>
            <Calendar size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />
            {formatDate(date)} — wybierz godzinę:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {hours.map(h => {
              const taken = isTaken(date, h);
              const sel = hour === h;
              return (
                <button key={h} disabled={taken} onClick={() => setHour(h)}
                  style={{
                    padding: "0.75rem", borderRadius: 12, border: "1.5px solid", cursor: taken ? "not-allowed" : "pointer",
                    fontSize: "0.9rem", fontWeight: 600, transition: "all 0.15s",
                    background: sel ? "linear-gradient(135deg,#1B3F8A,#00AEEF)" : taken ? "#F1F5F9" : "white",
                    color: sel ? "white" : taken ? "#CBD5E1" : "#1B3F8A",
                    borderColor: sel ? "transparent" : taken ? "#E2E8F0" : "#DBEAFE",
                  }}>
                  {taken ? "🔒" : h}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button disabled={!date || !hour} onClick={() => onNext({ date, hour })}
        style={{ width: "100%", marginTop: "2rem", padding: "1rem", borderRadius: 12, border: "none", cursor: date && hour ? "pointer" : "not-allowed", fontSize: "0.95rem", fontWeight: 700, color: "white", background: date && hour ? "linear-gradient(135deg,#1B3F8A,#00AEEF)" : "#E2E8F0", transition: "all 0.2s", boxShadow: date && hour ? "0 6px 20px rgba(27,63,138,0.3)" : "none" }}>
        Dalej →
      </button>
    </div>
  );
}

function Step2({ booking, onBack, onConfirm }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const valid = name.trim().length > 1 && phone.trim().length >= 9;

  return (
    <div>
      <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#8FA5BC", fontSize: "0.875rem", marginBottom: "1.5rem", padding: 0 }}>
        <ArrowLeft size={14} /> Wróć
      </button>
      <h2 style={{ fontFamily: "Georgia,serif", fontSize: "1.4rem", color: "#071E3D", fontWeight: 400, marginBottom: "0.5rem" }}>Twoje dane</h2>
      <div style={{ padding: "1rem 1.25rem", borderRadius: 12, background: "#EBF4FF", marginBottom: "1.5rem", fontSize: "0.875rem", color: "#1B3F8A", fontWeight: 600 }}>
        <Calendar size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />
        {formatDate(booking.date)} o {booking.hour}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#4A6580", display: "block", marginBottom: 6 }}>Imię i nazwisko *</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="np. Anna Kowalska"
            style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: 10, border: "1.5px solid #EAF0F8", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", color: "#071E3D" }} />
        </div>
        <div>
          <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#4A6580", display: "block", marginBottom: 6 }}>Numer telefonu *</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="np. 600 123 456" type="tel"
            style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: 10, border: "1.5px solid #EAF0F8", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", color: "#071E3D" }} />
        </div>
        <div>
          <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#4A6580", display: "block", marginBottom: 6 }}>Uwagi (opcjonalnie)</label>
          <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="np. pierwsza wizyta, pytania..." rows={3}
            style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: 10, border: "1.5px solid #EAF0F8", fontSize: "0.9rem", outline: "none", resize: "none", boxSizing: "border-box", color: "#071E3D" }} />
        </div>
      </div>

      <button disabled={!valid} onClick={() => onConfirm({ name, phone, note })}
        style={{ width: "100%", marginTop: "1.5rem", padding: "1rem", borderRadius: 12, border: "none", cursor: valid ? "pointer" : "not-allowed", fontSize: "0.95rem", fontWeight: 700, color: "white", background: valid ? "linear-gradient(135deg,#1B3F8A,#00AEEF)" : "#E2E8F0", transition: "all 0.2s", boxShadow: valid ? "0 6px 20px rgba(27,63,138,0.3)" : "none" }}>
        Potwierdź rezerwację
      </button>
    </div>
  );
}

function Step3({ booking }) {
  return (
    <div style={{ textAlign: "center", padding: "2rem 0" }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#10B981,#34D399)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
        <CheckCircle size={36} color="white" />
      </div>
      <h2 style={{ fontFamily: "Georgia,serif", fontSize: "1.5rem", color: "#071E3D", fontWeight: 400, marginBottom: "0.75rem" }}>Rezerwacja wysłana!</h2>
      <p style={{ color: "#607D96", lineHeight: 1.7, marginBottom: "1.5rem" }}>
        Dziękujemy, <strong>{booking.name}</strong>!<br />
        Skontaktujemy się z Tobą pod numer <strong>{booking.phone}</strong><br />
        aby potwierdzić termin.
      </p>
      <div style={{ padding: "1rem 1.5rem", borderRadius: 12, background: "#EBF4FF", display: "inline-block", marginBottom: "2rem" }}>
        <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1B3F8A" }}>
          <Calendar size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />
          {formatDate(booking.date)} o {booking.hour}
        </div>
      </div>
      <div style={{ borderTop: "1px solid #EAF0F8", paddingTop: "1.5rem" }}>
        <p style={{ fontSize: "0.875rem", color: "#8FA5BC", marginBottom: "0.75rem" }}>Masz pytania? Zadzwoń:</p>
        <a href="tel:+48608531549" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.75rem 1.5rem", borderRadius: 99, background: "linear-gradient(135deg,#1B3F8A,#00AEEF)", color: "white", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem" }}>
          <Phone size={14} /> +48 608 531 549
        </a>
      </div>
    </div>
  );
}

export default function Rezerwacja() {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({});

  function handleStep1(data) {
    setBooking(b => ({ ...b, ...data }));
    setStep(2);
  }

  function handleStep2(data) {
    const full = { ...booking, ...data, id: Date.now(), status: "pending", createdAt: new Date().toISOString() };
    saveReservation(full);
    setBooking(full);
    setStep(3);
  }

  const stepLabels = ["Termin", "Dane", "Gotowe"];

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Segoe UI',system-ui,sans-serif", background: "#F8FBFF" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } input:focus, textarea:focus { border-color: #00AEEF !important; box-shadow: 0 0 0 3px rgba(0,174,239,0.1); }`}</style>

      {/* Nav */}
      <header style={{ background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", boxShadow: "0 1px 20px rgba(14,66,120,0.08)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#1B3F8A,#00AEEF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Wind size={16} color="white" />
            </div>
            <span style={{ fontFamily: "Georgia,serif", fontSize: "0.9rem", color: "#1B3F8A", fontWeight: 700 }}>Komora Hiperbaryczna</span>
          </a>
          <a href="tel:+48608531549" style={{ fontSize: "0.8rem", color: "#1B3F8A", textDecoration: "none", fontWeight: 600 }}>
            <Phone size={13} style={{ marginRight: 4, verticalAlign: "middle" }} />608 531 549
          </a>
        </div>
      </header>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Stepper */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: "2.5rem" }}>
          {stepLabels.map((label, i) => {
            const n = i + 1;
            const active = step === n;
            const done = step > n;
            return (
              <div key={label} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.875rem", transition: "all 0.3s", background: done ? "#10B981" : active ? "linear-gradient(135deg,#1B3F8A,#00AEEF)" : "#EAF0F8", color: done || active ? "white" : "#8FA5BC" }}>
                    {done ? <CheckCircle size={18} /> : n}
                  </div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, color: active ? "#1B3F8A" : "#8FA5BC" }}>{label}</span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div style={{ width: 60, height: 2, background: step > n ? "#10B981" : "#EAF0F8", margin: "0 8px", marginBottom: 20, transition: "background 0.3s" }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div style={{ background: "white", borderRadius: 24, padding: "2rem", boxShadow: "0 4px 32px rgba(14,66,120,0.1)", border: "1px solid #EAF0F8" }}>
          {step === 1 && <Step1 onNext={handleStep1} />}
          {step === 2 && <Step2 booking={booking} onBack={() => setStep(1)} onConfirm={handleStep2} />}
          {step === 3 && <Step3 booking={booking} />}
        </div>
      </div>
    </div>
  );
}
