import { el, container } from "./ui.js";

export function renderMiniReset(){
  return container("Mini‑Reset", el("div", { class:"grid" },
    step("1️⃣ Atmung", "4 Sekunden ein, 4 halten, 4 aus, 4 halten – 4 Runden."),
    step("2️⃣ Blick", "Fixiere ein ruhiges Objekt im Raum – beschreibe es nüchtern."),
    step("3️⃣ Körper", "Schultern senken, Kiefer lösen, Füße spüren."),
    step("4️⃣ Satz", "Ich darf prüfen, ohne anzugreifen.")
  ));
}
function step(t, d){ return el("div", { class:"item" }, el("strong", {}, t), el("div", {}, d)); }
