import { el, container } from "./ui.js";
import { State } from "./state.js";

export function renderBindung() {
  const s = State.currentSession();
  const sections = [ lovebombing(s), spiegelung(s), carnegieExit(s) ];
  return container("Bindungs‑Reality‑Check", el("div", { class: "grid" }, ...sections));
}

function lovebombing(s) {
  const q = [
    "Sehr früher, intensiver Idealisierungs‑Überfluss (Komplimente, Zukunftsversprechen)?",
    "Wechsel zwischen Überwärme und plötzlicher Kühle?",
    "Tempo wirkt gedrückt (z. B. schnell zusammenziehen, Exklusivität)?",
    "Grenzen werden charmant überlaufen (Pseudo‑Kompromisse)?"
  ];
  return section("Lovebombing‑Signale", q, s, "lb");
}

function spiegelung(s) {
  const q = [
    "Spiegelt die Person auffällig Werte/Interessen, ohne Tiefenschärfe?",
    "Sind Stories inkonsistent (Zeiten, Details, Biografie)?",
    "Sind Empathie‑Momente kurz, gefolgt von Eigenfokus?"
  ];
  return section("Spiegelungs‑Muster", q, s, "sp");
}

function carnegieExit(s) {
  const examples = [
    "Ich habe gemerkt, dass mir unsere Dynamik nicht guttut. Ich ziehe mich zurück und wünsche dir alles Gute.",
    "Ich schätze einiges an dir, und gleichzeitig brauche ich jetzt Abstand, um für mich zu sorgen.",
    "Ich verstehe, dass dich das überrascht. Meine Entscheidung steht.",
    "Ich möchte das Thema nicht weiter diskutieren."
  ];
  const list = el("div", { class: "list" }, ...examples.map(t => el("div", { class: "item" }, t)));
  return el("section", { class: "panel" }, el("h3", {}, "Carnegie‑Exit (freundlich + klar)"), list, el("p", { class:"note" }, "Nutze neutrale, kurze Sätze. Kein Rechtfertigen, kein Gegenangriff."));
}

function section(title, qs, s, ns) {
  const list = el("div", { class: "list" }, ...qs.map((t,i) => row(t, s, `${ns}.q${i}`)));
  return el("section", { class: "panel" }, el("h3", {}, title), list);
}

function row(text, s, key) {
  const sel = el("select", { onchange: (e) => save(s, key, e.target.value) },
    el("option", { value: "" }, "— wähle —"),
    el("option", { value: "+" }, "+ ja"),
    el("option", { value: "?" }, "? unsicher"),
    el("option", { value: "-" }, "- nein"),
  );
  sel.value = (s.notes[key] || "");
  return el("div", { class: "item" }, el("label", {}, text), sel);
}

function save(s, key, val) { s.notes[key] = val; s.updatedAt = Date.now(); localStorage.setItem("raumpsychologie.v3", JSON.stringify(State.data)); }
