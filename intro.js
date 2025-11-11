import { el, container, showModal, closeModal } from "./ui.js";
import { State } from "./state.js";

export function renderIntro() {
  const c = container("🧭 Realität oder Reaktion?", el("div", { class: "grid" },
    el("p", { class: "big" }, "Ein kurzer, ruhiger Bildschirm vor jedem Check. Achtsam – nicht misstrauisch."),
    el("div", { class: "list" },
      item("1️⃣ Atme ruhig."),
      item("2️⃣ Spüre: Reagiere ich – oder beobachte ich?"),
      item("3️⃣ Frage: Prüfe ich, um zu verstehen – oder um bestätigt zu werden?"),
      item("4️⃣ Ich darf prüfen, ohne anzugreifen."),
      item("5️⃣ Ich darf fühlen, ohne mich zu rechtfertigen.")
    ),
    el("div", { class: "center" }, el("button", { class: "cta", onclick: () => showStartModal() }, "Weiter"))
  ));
  return c;
}

function item(text) { return el("div", { class: "item" }, text); }

function showStartModal() {
  showModal(el("div", {},
    el("h3", {}, "Wähle deinen Start"),
    el("p", { class: "note" }, "Beginne mit Resonanz oder Bindung. Du kannst später jederzeit wechseln."),
    el("div", { class: "grid cols-2" },
      el("button", { class: "cta", onclick: () => { closeModal(); history.pushState({}, "", "/resonanz"); dispatchEvent(new PopStateEvent("popstate")); } }, "Resonanz‑Check"),
      el("button", { class: "cta", onclick: () => { closeModal(); history.pushState({}, "", "/bindung"); dispatchEvent(new PopStateEvent("popstate")); } }, "Bindungs‑Reality‑Check")
    )
  ));
}
