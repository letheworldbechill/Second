// Minimal UI‑Helpers
export function el(tag, attrs = {}, ...children) {
  const n = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v]) => {
    if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) {
      if (k === "class") n.className = v === true ? "" : v;
      else n.setAttribute(k, v === true ? "" : v);
    }
  });
  children.flat().forEach(c => n.append(c?.nodeType ? c : document.createTextNode(c)));
  return n;
}

export function container(title, body) {
  return el("section", { class: "panel" }, el("h2", {}, title), body);
}

// Modal
let modalRoot;
export function showModal(content) {
  if (!modalRoot) {
    modalRoot = el("div", { class: "modal-backdrop", id: "modal" }, el("div", { class: "panel modal" }));
    document.body.append(modalRoot);
  }
  const box = modalRoot.querySelector(".modal");
  box.innerHTML = "";
  box.append(content);
  modalRoot.classList.add("show");
}
export function closeModal() { modalRoot?.classList.remove("show"); }
