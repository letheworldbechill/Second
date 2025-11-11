import { el, container } from "./ui.js";
import { State } from "./state.js";

export function renderRaumScan() {
  const s = State.currentSession();
  const q = ["Geruch", "Licht", "Geräusch", "Temperatur", "Ordnung", "Ablenkung"];
  const list = el("div", { class: "grid cols-2" }, ...q.map((t,i) => meter(t, s, `rs.q${i}`)));
  return container("RaumScan", el("div", {}, list, el("p", { class:"note" }, "0 = belastend · 10 = förderlich")));
}

function meter(label, s, key) {
  const inp = el("input", { type:"range", min:0, max:10, value: s.notes[key] ?? 5, oninput: (e)=>save(s,key,e.target.value) });
  return el("div", { class:"item" }, el("label", {}, label), inp);
}
function save(s,key,val){ s.notes[key]=Number(val); s.updatedAt=Date.now(); localStorage.setItem("raumpsychologie.v3", JSON.stringify(State.data)); }
