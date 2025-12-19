// ================================
// Mobile nav toggle
// ================================
const navBtn = document.getElementById("navbtn");
const nav = document.getElementById("nav");

navBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navBtn.setAttribute("aria-expanded", String(open));
});
nav?.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("is-open");
    navBtn?.setAttribute("aria-expanded", "false");
  }
});

// ================================
// Animated counters
// ================================
function animateCount(el, target, duration = 900) {
  const start = 0;
  const t0 = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - t0) / duration);
    const val = Math.floor(start + (target - start) * (1 - Math.pow(1 - p, 3)));
    el.textContent = String(val);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const counters = [...document.querySelectorAll("[data-count]")];
const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.getAttribute("data-count") || "0");
      animateCount(el, target);
      obs.unobserve(el);
    });
  },
  { threshold: 0.35 }
);
counters.forEach((c) => counterObserver.observe(c));

// ================================
// Utils
// ================================
const FALLBACK_PHOTO = "assets/members/placeholder.jpg";

function igUrl(username) {
  const u = (username || "").trim().replace(/^@/, "");
  return u ? `https://instagram.com/${u}` : null;
}
function clampPage(p, totalPages) {
  return Math.min(Math.max(1, p), totalPages);
}
function getTotalPages(list, perPage) {
  return Math.max(1, Math.ceil(list.length / perPage));
}
function makePaginationHtml({ totalPages, activePage, onLabelPrev = "Previous", onLabelNext = "Next" }) {
  const makeBtn = (label, page, opts = {}) => {
    const { disabled = false, active = false, aria = "" } = opts;
    return `
      <button class="pbtn ${active ? "is-active" : ""}"
              type="button"
              data-page="${page}"
              ${disabled ? "disabled" : ""}
              ${aria ? `aria-label="${aria}"` : ""}>
        ${label}
      </button>
    `;
  };

  const windowSize = 5;
  let start = Math.max(1, activePage - Math.floor(windowSize / 2));
  let end = start + windowSize - 1;
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - windowSize + 1);
  }

  let html = "";
  html += makeBtn(onLabelPrev, activePage - 1, { disabled: activePage === 1, aria: "Halaman sebelumnya" });
  for (let i = start; i <= end; i++) {
    html += makeBtn(String(i), i, { active: i === activePage, aria: `Halaman ${i}` });
  }
  html += makeBtn(onLabelNext, activePage + 1, { disabled: activePage === totalPages, aria: "Halaman berikutnya" });
  return html;
}

// ================================
// Data: Members
// ================================
const members = [
  { name: "Agustiani Ambarwati", role: "Member", ig: "gustianambarr", photo: "assets/members/agustiani.jpg" },
  { name: "Al Fahmi", role: "Member", ig: "Muhammadalfahmi__", photo: "assets/members/alfahmi.jpg" },
  { name: "Andiko Septa Aditya", role: "Member", ig: "", photo: "assets/members/andiko.jpg" },
  { name: "Aprizal", role: "Member", ig: "", photo: "assets/members/aprizal.jpg" },
  { name: "Bella Anggun Sapitri", role: "Member", ig: "", photo: "assets/members/bella.jpg" },
  { name: "Detia Cindo Hameva", role: "Member", ig: "detiahmvaa", photo: "assets/members/detia.jpg" },
  { name: "Drajad Putra Adi Kusuma", role: "Member", ig: "", photo: "assets/members/drajad.jpg" },
  { name: "Erwin Saputra", role: "Member", ig: "", photo: "assets/members/erwin.jpg" },
  { name: "Ferdi Ardika Putro", role: "Member", ig: "", photo: "assets/members/ferdi.jpg" },
  { name: "Gevira Nur Harnika Pratami", role: "Member", ig: "geviranurharnika", photo: "assets/members/gevira.jpg" },
  { name: "Inayah Maudia Devira Putri", role: "Member", ig: "inayahmaudia_dp", photo: "assets/members/inayah.jpg" },
  { name: "Isna Nurul Haqiqi", role: "Member", ig: "isnahaqiqii", photo: "assets/members/isna.jpg" },
  { name: "Khoirunnisa", role: "Member", ig: "khrnnnnsa", photo: "assets/members/khoirunnisa.jpg" },
  { name: "Lu'lu Mir'atul Azizah", role: "Member", ig: "lulumrtlzh", photo: "assets/members/lulu.jpg" },
  { name: "Muhammad Irfan Nur Dzaky", role: "Member", ig: "", photo: "assets/members/irfan.jpg" },
  { name: "Muhammad Iqbal Hafidho", role: "Member", ig: "", photo: "assets/members/iqbal.jpg" },
  { name: "Muhammad Nur Alfiansyah", role: "Member", ig: "", photo: "assets/members/alfiansyah.jpg" },
  { name: "Nabil Thufail", role: "Member", ig: "", photo: "assets/members/nabil.jpg" },
  { name: "Nalendra Satria Majid", role: "Member", ig: "", photo: "assets/members/nalendra.jpg" },
  { name: "Praja Haqqi Qudsy", role: "Member", ig: "", photo: "assets/members/praja.jpg" },
  { name: "Rafi Ardika Ramadhan", role: "Member", ig: "", photo: "assets/members/rafi.jpg" },
  { name: "Ratunabila Falen", role: "Member", ig: "bilaa._17", photo: "assets/members/ratunabila.jpg" },
  { name: "Repi Junita Sari", role: "Member", ig: "repijunitaaa", photo: "assets/members/repi.jpg" },
  { name: "Rima Ranataw", role: "Member", ig: "rimarnatw", photo: "assets/members/rima.jpg" },
  { name: "Rossa Florensia", role: "Member", ig: "rossaflorensia_", photo: "assets/members/rossa.jpg" },
  { name: "Tohar", role: "Member", ig: "", photo: "assets/members/tohar.jpg" },
  { name: "Sultan Muliya Pratama", role: "Member", ig: "omsul._", photo: "assets/members/sultan.jpg" },
  { name: "Vira Dwi Novia", role: "Member", ig: "_viradwii", photo: "assets/members/vira.jpg" },
  { name: "Zahra Mutiara", role: "Member", ig: "zahra_mutiiara", photo: "assets/members/zahra.jpg" },
];

// Data: Struktur
const structureMembers = [
  { name: "Andiko Septa Aditya", role: "Ketua Kosma", ig: "", photo: "assets/members/andiko.jpg" },
  { name: "Sultan Muliya Pratama", role: "Wakil Kosma", ig: "omsul._", photo: "assets/members/sultan.jpg" },
  { name: "Agustiani Ambarwati", role: "Sekretaris", ig: "", photo: "assets/members/agustiani.jpg" },
  { name: "Isna Nurul Haqiqi", role: "Bendahara", ig: "", photo: "assets/members/isna.jpg" },
];

// ================================
// Render pcard
// ================================
function memberCardHtml(m) {
  const role = (m.role || "Member").trim();
  const ig = (m.ig || "").trim();
  const igLink = igUrl(ig);
  const igText = ig ? `@${ig.replace(/^@/, "")}` : "IG belum diisi";
  const photo = (m.photo || "").trim() || FALLBACK_PHOTO;

  const igHtml = igLink
    ? `<a class="pcard__ig" href="${igLink}" target="_blank" rel="noreferrer">${igText}</a>`
    : `<span class="pcard__ig" aria-disabled="true">${igText}</span>`;

  return `
    <article class="pcard">
      <div class="pcard__media">
        <img class="pcard__img"
             src="${photo}"
             alt="Foto ${m.name}"
             loading="lazy"
             onerror="this.onerror=null;this.src='${FALLBACK_PHOTO}'" />
        <div class="pcard__role">${role}</div>
      </div>
      <div class="pcard__body">
        <h3 class="pcard__name">${m.name}</h3>
        <div class="pcard__meta">${igHtml}</div>
      </div>
    </article>
  `;
}

// ================================
// Struktur
// ================================
function renderStructure(list) {
  const grid = document.getElementById("structureGrid");
  if (!grid) return;
  grid.innerHTML = list.map(memberCardHtml).join("");
}
renderStructure(structureMembers);

// ================================
// Members + Pagination
// ================================
const memberSearch = document.getElementById("memberSearch");
const memberCount = document.getElementById("memberCount");
const memberGrid = document.getElementById("memberGrid");
const memberPagination = document.getElementById("memberPagination");

let filteredMembers = [...members];
let currentMemberPage = 1;

function getMembersPerPage() {
  const w = window.innerWidth;
  if (w <= 520) return 6;
  if (w <= 980) return 8;
  return 12;
}

function renderMembersPage(list, page) {
  if (!memberGrid) return;

  const perPage = getMembersPerPage();
  const totalPages = getTotalPages(list, perPage);
  const safePage = clampPage(page, totalPages);
  currentMemberPage = safePage;

  const start = (safePage - 1) * perPage;
  const slice = list.slice(start, start + perPage);

  memberGrid.innerHTML = slice.map(memberCardHtml).join("");
  if (memberCount) memberCount.textContent = `${list.length} mahasiswa`;

  if (memberPagination) {
    memberPagination.innerHTML = makePaginationHtml({
      totalPages,
      activePage: safePage,
      onLabelPrev: "Previous",
      onLabelNext: "Next",
    });

    memberPagination.querySelectorAll("button[data-page]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const p = Number(btn.getAttribute("data-page") || "1");
        const tp = getTotalPages(filteredMembers, getMembersPerPage());
        renderMembersPage(filteredMembers, clampPage(p, tp));
      });
    });
  }
}

renderMembersPage(filteredMembers, currentMemberPage);

memberSearch?.addEventListener("input", () => {
  const q = memberSearch.value.trim().toLowerCase();
  filteredMembers = members.filter((m) => m.name.toLowerCase().includes(q));
  renderMembersPage(filteredMembers, 1);
});

// ================================
// Gallery Storage (IndexedDB)
// Static hosting friendly: data tersimpan di browser.
// ================================
const DB_NAME = "uinril_gallery_db";
const DB_VERSION = 1;
const STORE = "uploads";

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function dbPut(item) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(item);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

async function dbGetAll() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

async function dbDelete(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

async function dbClear() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).clear();
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

// ================================
// Gallery: Data + Pagination (4 per page)
// ================================
const galleryGrid = document.getElementById("galleryGrid");
const galleryPagination = document.getElementById("galleryPagination");
const galleryCount = document.getElementById("galleryCount");
const galleryUpload = document.getElementById("galleryUpload");
const galleryClear = document.getElementById("galleryClear");

let currentGalleryPage = 1;
const GALLERY_PER_PAGE = 4;

// Ini contoh item bawaan (kalau kamu mau tetap ada foto default)
// Boleh kosongkan array ini kalau mau galeri full dari upload.
const galleryStaticItems = [
  // { id:"static-1", src:"assets/photo-3.jpg", alt:"Kegiatan 1", deletable:false },
];

let galleryAllItems = []; // gabungan static + upload

function makeId() {
  return "u_" + Math.random().toString(16).slice(2) + "_" + Date.now().toString(16);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function galleryItemHtml(item, idx) {
  const alt = item.alt || `Kegiatan ${idx + 1}`;
  const src = item.src;

  // tombol delete hanya untuk upload (deletable)
  const delBtn = item.deletable
    ? `<button class="gdel" type="button" data-del="${item.id}" aria-label="Hapus foto">✕</button>`
    : "";

  const caption = `<div class="gcap">${alt}</div>`;

  return `
    <button class="gitem" data-full="${src}" aria-label="Buka ${alt}">
      ${delBtn}
      <img src="${src}" alt="${alt}" loading="lazy" />
      ${caption}
    </button>
  `;
}

function renderGalleryPage(list, page) {
  if (!galleryGrid) return;

  const totalPages = getTotalPages(list, GALLERY_PER_PAGE);
  const safePage = clampPage(page, totalPages);
  currentGalleryPage = safePage;

  const start = (safePage - 1) * GALLERY_PER_PAGE;
  const slice = list.slice(start, start + GALLERY_PER_PAGE);

  galleryGrid.innerHTML = slice.map(galleryItemHtml).join("");

  // bind delete (kalau ada)
  galleryGrid.querySelectorAll("[data-del]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      e.preventDefault();
      const id = btn.getAttribute("data-del");
      if (!id) return;
      await dbDelete(id);
      await loadGallery(); // reload & rerender
    });
  });

  // bind lightbox
  bindGalleryLightbox();

  if (galleryCount) galleryCount.textContent = `${list.length} foto`;

  if (galleryPagination) {
    galleryPagination.innerHTML = makePaginationHtml({
      totalPages,
      activePage: safePage,
      onLabelPrev: "Previous",
      onLabelNext: "Next",
    });

    galleryPagination.querySelectorAll("button[data-page]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const p = Number(btn.getAttribute("data-page") || "1");
        const tp = getTotalPages(galleryAllItems, GALLERY_PER_PAGE);
        renderGalleryPage(galleryAllItems, clampPage(p, tp));
      });
    });
  }
}

async function loadGallery() {
  const uploads = await dbGetAll();
  // urutkan yang terbaru di depan
  uploads.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  const uploadItems = uploads.map((u, i) => ({
    id: u.id,
    src: u.dataUrl,
    alt: u.alt || `Kegiatan Upload ${i + 1}`,
    deletable: true,
  }));

  galleryAllItems = [...uploadItems, ...galleryStaticItems]; // upload ditampilkan dulu
  const totalPages = getTotalPages(galleryAllItems, GALLERY_PER_PAGE);
  renderGalleryPage(galleryAllItems, clampPage(currentGalleryPage, totalPages));
}

// upload handler
galleryUpload?.addEventListener("change", async () => {
  const files = [...(galleryUpload.files || [])];
  if (files.length === 0) return;

  // Batasi agar tidak kebablasan (opsional)
  // Kalau kebanyakan & ukuran besar, browser bisa berat.
  const maxFiles = 20;
  const selected = files.slice(0, maxFiles);

  for (const f of selected) {
    if (!f.type.startsWith("image/")) continue;

    const dataUrl = await fileToDataUrl(f);
    const id = makeId();

    await dbPut({
      id,
      dataUrl,
      alt: f.name ? f.name.replace(/\.[^/.]+$/, "") : "Kegiatan",
      createdAt: Date.now(),
    });
  }

  // reset input supaya bisa upload file yang sama lagi
  galleryUpload.value = "";
  await loadGallery();
});

// clear all uploads
galleryClear?.addEventListener("click", async () => {
  await dbClear();
  await loadGallery();
});

// ================================
// Lightbox
// ================================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(src, alt = "Foto") {
  if (!src) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}
function bindGalleryLightbox() {
  document.querySelectorAll("#galleryGrid .gitem").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // kalau klik tombol delete, jangan buka lightbox
      if (e.target && e.target.matches("[data-del]")) return;

      const full = btn.getAttribute("data-full");
      const alt = btn.querySelector("img")?.alt || "Foto";
      openLightbox(full, alt);
    });
  });
}
lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.getAttribute("aria-hidden") === "false") closeLightbox();
});

// ================================
// Responsive: recalc pagination on resize
// ================================
let resizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // members
    const memberTotal = getTotalPages(filteredMembers, getMembersPerPage());
    renderMembersPage(filteredMembers, clampPage(currentMemberPage, memberTotal));

    // gallery (perPage fixed)
    const galleryTotal = getTotalPages(galleryAllItems, GALLERY_PER_PAGE);
    renderGalleryPage(galleryAllItems, clampPage(currentGalleryPage, galleryTotal));
  }, 120);
});

// ================================
// Init gallery load
// ================================
loadGallery().catch(() => {
  // kalau IndexedDB tidak tersedia, minimal tampilkan static items
  galleryAllItems = [...galleryStaticItems];
  renderGalleryPage(galleryAllItems, 1);
});

// ================================
// Footer year
// ================================
document.getElementById("year").textContent = String(new Date().getFullYear());
