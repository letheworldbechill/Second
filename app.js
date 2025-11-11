import { exportData, importData, State } from "./state.js";
import { renderIntro } from "./intro.js";
import { renderResonanz } from "./resonanz.js";
import { renderBindung } from "./bindung.js";
import { renderWohnung } from "./wohnung.js";
import { renderRaumScan } from "./raumscan.js";
import { renderRestladung } from "./restladung.js";
import { renderMiniReset } from "./minireset.js";
import { renderMusterArchiv } from "./musterarchiv.js";
import { renderRahmung } from "./rahmung.js";
import { route, renderRoute } from "./router.js";

// Routen
route("/intro", renderIntro);
route("/resonanz", renderResonanz);
route("/bindung", renderBindung);
route("/wohnung", renderWohnung);
route("/raumscan", renderRaumScan);
route("/restladung", renderRestladung);
route("/minireset", renderMiniReset);
route("/musterarchiv", renderMusterArchiv);
route("/rahmung", renderRahmung);

// Export/Import Buttons
const btnExport = document.getElementById("btn-export");
const btnImport = document.getElementById("btn-import");
const fileImport = document.getElementById("file-import");
btnExport.addEventListener("click", exportData);
btnImport.addEventListener("click", () => fileImport.click());
fileImport.addEventListener("change", async (e) => {
  if (e.target.files?.[0]) {
    await importData(e.target.files[0]);
    alert("Daten importiert.");
    location.reload();
  }
});

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(console.warn);
  });
}

// Start
renderRoute();
