import { el, container } from "./ui.js";
import { State } from "./state.js";

export function renderResonanz() {
  const s = State.currentSession();
  const q = [
    "Fühle ich mich nach Kontakt energiegeladen oder erschöpft?",
    "Werden meine Grenzen intuitiv respektiert?",
    "Kann ich spontan ich selbst sein, ohne zu scannen, was ok ist?",
    "Ist Kritik beidseitig möglich, ohne Angst vor Rückzug/Strafe?"
  ];
  const list = el("div", { class: "list" }, ...q.map((text, i) => item(text, s, `resonanz.q${i}`)));
  return container("Resonanz‑Check", el("div", {}, list, saveHint()));
}

function item(text, s, key) {
  const sel = el("select", { onchange: (e) => save(s, key, e.target.value) },
    el("option", { value: "" }, "— wähle —"),
    el("option", { value: "++" }, "++ klar ja"),
    el("option", { value: "+" }, "+ eher ja"),
    el("option", { value: "±" }, "± unklar"),
    el("option", { value: "−" }, "− eher nein"),
    el("option", { value: "−−" }, "−− klar nein"),
  );
  sel.value = (s.notes[key] || "");
  return el("div", { class: "item" }, el("label", {}, text), sel);
}

function save(s, key, val) { s.notes[key] = val; s.updatedAt = Date.now(); localStorage.setItem("raumpsychologie.v3", JSON.stringify(State.data)); }
function saveHint() { return el("p", { class: "note" }, "Speicherung erfolgt lokal und automatisch."); }
