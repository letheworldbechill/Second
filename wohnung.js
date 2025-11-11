import { el, container } from "./ui.js";
import { State } from "./state.js";

export function renderWohnung() {
  const s = State.currentSession();
  const q = [
    "Gibt es Zonen der Ruhe/Regeneration?",
    "Ist der Raum funktional (Licht, Ordnung, Wege)?",
    "Unterstützt der Raum meine aktuellen Ziele?"
  ];
  const list = el("div", { class: "list" }, ...q.map((t,i) => row(t, s, `wh.q${i}`)));
  return container("Wohnung Check", el("div", {}, list));
}

function row(text, s, key) {
  const sel = el("select", { onchange: (e) => save(s,key,e.target.value) },
    el("option", { value: "" }, "—"),
    el("option", { value: "+" }, "+"),
    el("option", { value: "±" }, "±"),
    el("option", { value: "-" }, "-"),
  );
  sel.value = s.notes[key] || "";
  return el("div", { class: "item" }, el("label", {}, text), sel);
}
function save(s,key,val){ s.notes[key]=val; s.updatedAt=Date.now(); localStorage.setItem("raumpsychologie.v3", JSON.stringify(State.data)); }
