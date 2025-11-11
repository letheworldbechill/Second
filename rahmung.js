import { el, container } from "./ui.js";
import { State } from "./state.js";

export function renderRahmung(){
  const s = State.currentSession();
  const pub = el("textarea", { rows:4, placeholder:"Öffentliche Rahmung (z. B. für gemeinsame Kontakte)…", oninput:(e)=>save(s,"frame.pub", e.target.value) });
  const priv = el("textarea", { rows:4, placeholder:"Private Rahmung (nur für dich – was ist die wahre Story?)…", oninput:(e)=>save(s,"frame.priv", e.target.value) });
  pub.value = s.notes["frame.pub"] || ""; priv.value = s.notes["frame.priv"] || "";
  return container("Rahmung", el("div", { class:"grid cols-2" },
    el("div", {}, el("label", {}, "Öffentlich"), pub),
    el("div", {}, el("label", {}, "Privat"), priv)
  ));
}
function save(s,key,val){ s.notes[key]=val; s.updatedAt=Date.now(); localStorage.setItem("raumpsychologie.v3", JSON.stringify(State.data)); }
