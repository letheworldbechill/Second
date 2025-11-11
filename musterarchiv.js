import { el, container } from "./ui.js";
import { State } from "./state.js";

export function renderMusterArchiv(){
  const s = State.currentSession();
  const area = el("textarea", { rows:8, placeholder:"Welche Muster erkenne ich (kurz + datiert)?", oninput:(e)=>save("archive.text", e.target.value) });
  area.value = State.data.archive?.[0]?.text || s.notes["archive.text"] || "";
  const btn = el("button", { class:"cta", onclick: addArchive }, "In Archiv übernehmen");
  return container("Muster‑Archiv", el("div", { class:"kv" }, area, btn, list()));
}

function list(){
  const items = (State.data.archive||[]).map(a => el("div", { class:"item" }, `${new Date(a.ts).toLocaleDateString()} · ${a.text}`));
  return el("div", { class:"list" }, ...items);
}

function addArchive(){
  const area = document.querySelector("textarea");
  const text = area ? area.value.trim() : "";
  if (!text) return;
  State.data.archive.unshift({ id: crypto.randomUUID(), ts: Date.now(), text });
  State.save();
  location.reload();
}
function save(key,val){ const s = State.currentSession(); s.notes[key]=val; State.save(); }
