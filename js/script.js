const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const storageKey = "press-kit-pro-dj:v1";

const defaults = {
  refId: "ST-992-B",
  artistName: "VANTABLACK",
  genre: "Techno Industrial",
  location: "Berlin, DE",
  bio: "Un maestro de la tension atmosferica y el ritmo industrial. Desde 2018, Vantablack se ha labrado un nicho en el circuito underground con un sonido definido por paisajes sonoros oscuros como la obsidiana y un implacable ritmo de 140 BPM.",
  instagram: "https://instagram.com/vantablack",
  spotify: "https://open.spotify.com/",
  soundcloud: "https://soundcloud.com/",
  youtube: "https://youtube.com/",
  bookingEmail: "booking@afterdark.example",
  phone: "+34 600 000 000",
  photo: "",
  rider: [
    { title: "Mesa de mezclas", detail: "Pioneer DJM-V10 (x1)" },
    { title: "Reproduccion", detail: "Pioneer CDJ-3000 (x4)" },
    { title: "Monitorizacion", detail: "D&B Audiotechnik (Estereo)" },
    { title: "Conectividad", detail: "Switch LAN / Configuracion Pro Link" }
  ],
  gallery: [
    { title: "Press photo 01", detail: "Retrato principal en alta resolucion" },
    { title: "Live booth", detail: "Foto de cabina para promotores" }
  ],
  videos: [
    { title: "Boiler Room style set", detail: "https://youtube.com/watch?v=demo" }
  ],
  discography: [
    { title: "Acid Rain LP", detail: "2026 - Afterdark Records" },
    { title: "Midnight Pulse", detail: "Original Mix - 125 BPM" }
  ],
  events: [
    { title: "15 Jun - Berlin", detail: "Tresor, Alemania" },
    { title: "22 Jun - Ibiza", detail: "Afterdark Warehouse" }
  ],
  customSections: [
    { title: "Hospitality", detail: "Agua, toallas, green room seguro y contacto local de produccion." }
  ]
};

let state = loadState();
let activeView = "home";
let editing = null;
let toastTimer;

function loadState() {
  try {
    return { ...defaults, ...(JSON.parse(localStorage.getItem(storageKey)) || {}) };
  } catch {
    return { ...defaults };
  }
}

function saveState(message = "Cambios guardados") {
  localStorage.setItem(storageKey, JSON.stringify(state));
  render();
  showToast(message);
}

function showToast(message) {
  const toast = $(".toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function navigate(view) {
  activeView = view;
  $$(".view").forEach((panel) => panel.classList.toggle("active", panel.dataset.view === view));
  $$("[data-nav]").forEach((button) => button.classList.toggle("active", button.dataset.nav === view));
  $(".mobile-menu")?.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindForm() {
  const form = $("#artistForm");
  if (!form) return;
  $$("input[name], textarea[name]").forEach((field) => {
    if (field.form !== form && field.getAttribute("form") !== "artistForm") return;
    field.value = state[field.name] || "";
    field.addEventListener("input", () => {
      state[field.name] = field.value;
      persistQuietly();
      renderDynamicOnly();
    });
  });
  form.addEventListener("submit", (event) => event.preventDefault());
}

function persistQuietly() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function validateForm() {
  const form = $("#artistForm");
  const box = $("[data-errors]");
  const errors = [];
  if (!state.artistName || state.artistName.trim().length < 2) errors.push("El nombre artistico debe tener al menos 2 caracteres.");
  if (!state.genre) errors.push("Indica el genero musical.");
  if (!state.location) errors.push("Indica la ubicacion.");
  if (!state.bio || state.bio.trim().length < 40) errors.push("La biografia debe tener al menos 40 caracteres.");
  if (state.bookingEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.bookingEmail)) errors.push("El email de booking no parece valido.");
  ["instagram", "spotify", "soundcloud", "youtube"].forEach((key) => {
    if (state[key] && !/^https?:\/\//i.test(state[key])) errors.push(`${key} debe empezar por http:// o https://.`);
  });
  if (box) box.innerHTML = errors.map((error) => `<p>${error}</p>`).join("");
  if (form) form.classList.toggle("has-errors", errors.length > 0);
  return errors;
}

function completion() {
  const required = ["artistName", "genre", "location", "bio", "bookingEmail"];
  const filled = required.filter((key) => String(state[key] || "").trim()).length;
  const lists = ["rider", "gallery", "videos", "discography", "events"].filter((key) => state[key]?.length).length;
  return Math.min(100, Math.round(((filled + lists) / (required.length + 5)) * 100));
}

function render() {
  renderBindings();
  renderLists();
  renderDashboard();
  renderReport();
  renderPhoto();
  renderProgress();
}

function renderDynamicOnly() {
  renderBindings();
  renderPhoto();
  renderProgress();
}

function renderBindings() {
  $$("[data-bind]").forEach((node) => {
    const value = state[node.dataset.bind] || "";
    node.textContent = value;
  });
  const social = $("#socialPreview");
  if (social) {
    social.innerHTML = ["instagram", "spotify", "soundcloud", "youtube"]
      .filter((key) => state[key])
      .map((key) => `<a href="${escapeAttr(state[key])}" target="_blank" rel="noopener">${label(key)}</a>`)
      .join("");
  }
  renderPreviewList("discographyPreview", state.discography);
  renderPreviewList("eventsPreview", state.events);
}

function renderPreviewList(id, items) {
  const target = $(`#${id}`);
  if (!target) return;
  target.innerHTML = items.map((item) => `<p><strong>${escapeHtml(item.title)}</strong><br /><span>${escapeHtml(item.detail)}</span></p>`).join("");
}

function renderPhoto() {
  $$("[data-preview-bg]").forEach((node) => {
    node.style.backgroundImage = state.photo
      ? `linear-gradient(90deg, rgba(19,11,22,.95) 0 18%, rgba(19,11,22,.45)), linear-gradient(0deg, #150b17 0 10%, transparent 40%), url("${state.photo}")`
      : "";
    node.style.backgroundSize = state.photo ? "cover" : "";
    node.style.backgroundPosition = state.photo ? "center" : "";
  });
}

function renderLists() {
  renderEditableList("riderList", "rider");
  renderEditableList("galleryList", "gallery");
  renderEditableList("videoList", "videos");
  renderEditableList("discographyList", "discography");
  renderEditableList("eventsList", "events");
  renderEditableList("customSectionsList", "customSections");
}

function renderEditableList(targetId, key) {
  const target = $(`#${targetId}`);
  if (!target) return;
  const items = state[key] || [];
  target.innerHTML = items.map((item, index) => `
    <article class="list-item">
      <div><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.detail)}</small></div>
      <div class="row-actions">
        <button class="mini-btn" type="button" data-edit="${key}" data-index="${index}">Editar</button>
        <button class="mini-btn danger" type="button" data-delete="${key}" data-index="${index}">Eliminar</button>
      </div>
    </article>
  `).join("");
}

function renderDashboard() {
  const epks = $("#epkRows");
  if (epks) {
    epks.innerHTML = [
      { icon: "♪", title: `${state.artistName} Main EPK`, detail: "Actualizado automaticamente", views: "1.2k", status: "Vivo" },
      { icon: "◎", title: state.discography[0]?.title || "Nuevo lanzamiento", detail: "Borrador operativo", views: "842", status: "Borrador" }
    ].map((row) => `
      <article class="epk-row">
        <i>${row.icon}</i>
        <div><strong>${escapeHtml(row.title)}</strong><p>${escapeHtml(row.detail)}</p></div>
        <div><strong>${row.views}</strong><p>${row.status}</p></div>
      </article>
    `).join("");
  }
  const bars = $("#barChart");
  if (bars && !bars.dataset.ready) {
    bars.dataset.ready = "true";
    bars.innerHTML = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB"].map((day, index) => `
      <div class="bar"><span style="height:${40 + index * 7}%"></span><b style="height:${62 - index * 4}%"></b><small>${day}</small></div>
    `).join("");
  }
  const feed = $("#activityFeed");
  if (feed) {
    feed.innerHTML = [
      ["⌄", "Agente de Reservas descargo activos de Press Kit.", "Berlin, DE - Ahora mismo"],
      ["◎", "Universal Music vio el Tech Rider.", "Londres, UK - hace 12m"],
      ["⌁", "EPK compartido en Instagram Stories.", "Nueva York, US - hace 1h"],
      ["⌄", "Promotor de Festival descargo el Tech Rider.", "Ibiza, ES - hace 4h"]
    ].map(([icon, title, detail]) => `<article class="activity-item"><span>${icon}</span><div><strong>${title}</strong><small>${detail}</small></div></article>`).join("");
  }
}

function renderReport() {
  const regions = $("#regionList");
  if (!regions) return;
  [["01", "Estados Unidos", "32%"], ["02", "Alemania", "18%"], ["03", "Reino Unido", "14%"], ["04", "Paises Bajos", "11%"], ["05", "Brasil", "9%"]]
    .forEach(([num, name, value], index) => {
      if (index === 0) regions.innerHTML = "";
      regions.insertAdjacentHTML("beforeend", `<div class="region-row"><strong>${num}</strong><span>${name}</span><b>${value}</b></div>`);
    });
}

function renderProgress() {
  const value = completion();
  $("#progressBar")?.style.setProperty("width", `${value}%`);
  const text = $("#progressText");
  if (text) text.textContent = `${value}%`;
}

function openItemDialog(key, index = null) {
  editing = { key, index };
  const item = index === null ? { title: "", detail: "" } : state[key][index];
  $("#dialogTitle").textContent = index === null ? `Anadir ${label(key)}` : `Editar ${label(key)}`;
  $("#itemForm").elements.title.value = item.title;
  $("#itemForm").elements.detail.value = item.detail;
  $("#itemDialog").showModal();
}

function saveDialogItem() {
  const form = $("#itemForm");
  const title = form.elements.title.value.trim();
  const detail = form.elements.detail.value.trim();
  if (!title) return;
  if (editing.index === null) state[editing.key].push({ title, detail });
  else state[editing.key][editing.index] = { title, detail };
  saveState(editing.index === null ? "Elemento anadido" : "Elemento actualizado");
}

function deleteItem(key, index) {
  state[key].splice(index, 1);
  saveState("Elemento eliminado");
}

function newEpk() {
  state = { ...defaults, refId: `ST-${Math.floor(Math.random() * 900 + 100)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}` };
  bindForm();
  saveState("Nuevo EPK creado");
  navigate("editor");
}

function printActive() {
  $$(".view").forEach((view) => view.classList.toggle("printing", view.dataset.view === activeView));
  showToast("Abriendo dialogo de impresion / PDF");
  setTimeout(() => window.print(), 220);
}

function label(key) {
  return {
    rider: "rider",
    gallery: "foto",
    videos: "video",
    discography: "discografia",
    events: "evento",
    customSections: "seccion",
    instagram: "Instagram",
    spotify: "Spotify",
    soundcloud: "SoundCloud",
    youtube: "YouTube"
  }[key] || key;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-nav]");
  if (nav) navigate(nav.dataset.nav);

  const add = event.target.closest("[data-add]");
  if (add) openItemDialog(add.dataset.add);

  const edit = event.target.closest("[data-edit]");
  if (edit) openItemDialog(edit.dataset.edit, Number(edit.dataset.index));

  const del = event.target.closest("[data-delete]");
  if (del) deleteItem(del.dataset.delete, Number(del.dataset.index));

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  if (action === "menu") $(".mobile-menu")?.classList.toggle("open");
  if (action === "print") printActive();
  if (action === "save") {
    const errors = validateForm();
    if (errors.length) showToast("Revisa los campos marcados");
    else saveState("Cambios guardados correctamente");
  }
  if (action === "new-epk") newEpk();
  if (action === "settings") showToast("Ajustes abiertos: edita el perfil desde la seccion Editor");
  if (action === "notify") showToast("Sin notificaciones pendientes. Sistema online.");
  if (action === "toggle-locale") showToast("Idioma activo: Espanol");
  if (action === "help") showToast("Soporte: revisa contacto profesional en Media");
  if (action === "signout") showToast("Sesion local cerrada. Los datos siguen guardados en este navegador.");
  if (action === "close-dialog") $("#itemDialog")?.close();
  if (action === "view-all") navigate("preview");
  if (action === "scan") {
    $$(".bar span, .bar b").forEach((bar) => { bar.style.height = `${Math.floor(Math.random() * 70) + 20}%`; });
    showToast("Analiticas actualizadas");
  }
  if (action === "edit-all") navigate("media");
});

$("#itemForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  saveDialogItem();
  $("#itemDialog").close();
});

$("#photoInput")?.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    showToast("Selecciona una imagen valida");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    state.photo = reader.result;
    saveState("Foto principal actualizada");
  };
  reader.readAsDataURL(file);
});

setInterval(() => {
  if (activeView !== "dashboard") return;
  $$(".bar span, .bar b").forEach((bar) => { bar.style.height = `${Math.floor(Math.random() * 72) + 18}%`; });
}, 3200);

bindForm();
render();
navigate("home");
