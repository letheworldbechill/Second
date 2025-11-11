// Zentraler State + Persistence
const LS_KEY = "raumpsychologie.v3";

export const State = {
  data: {
    sessions: [],
    archive: [],
    settings: { createdAt: Date.now(), version: "v3" }
  },
  load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) this.data = JSON.parse(raw);
    } catch (e) { console.warn("State load failed", e); }
  },
  save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(this.data)); }
    catch (e) { console.warn("State save failed", e); }
  },
  newSession(kind = "generic") {
    const s = { id: crypto.randomUUID(), kind, createdAt: Date.now(), notes: {}, results: {} };
    this.data.sessions.unshift(s);
    this.save();
    return s;
  },
  currentSession() {
    return this.data.sessions[0] || this.newSession();
  }
};
State.load();

export function exportData() {
  const blob = new Blob([JSON.stringify(State.data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `raumpsychologie-v3-export-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
}

export function importData(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      try {
        const json = JSON.parse(r.result);
        State.data = json; State.save(); resolve(json);
      } catch (e) { reject(e); }
    };
    r.onerror = reject;
    r.readAsText(file);
  });
}
