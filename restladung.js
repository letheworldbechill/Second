import { el, container } from "./ui.js";
import { State } from "./state.js";

export function renderRestladung(){
  const s = State.currentSession();
  const area = el("textarea", { rows:6, placeholder:"Was hängt emotional noch nach? (kurz, sachlich)…", oninput:(e)=>save(s,"restladung.text",e.target.value) });
  area.value = s.notes["restladung.text"] || "";
  return container("Emotionale Restladung", el("div", { class:"kv" },
    el("label", {}, "Beschreibe Restladung in 3 Sätzen"), area,
    el("label", {}, "Intensität (0-10)"),
    el("input", { type:"range", min:0, max:10, value: s.notes["restladung.level"] ?? 3, oninput:(e)=>save(s,"restladung.level", e.target.value) }),
  ));
}
function save(s,key,val){ s.notes[key]=val; s.updatedAt=Date.now(); localStorage.setItem("raumpsychologie.v3", JSON.stringify(State.data)); }
