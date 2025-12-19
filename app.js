// ===== Mobile nav toggle =====
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

// ===== Animated counters =====
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

// ===== Utils =====
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

  // tampil max 5 angka biar rapi
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

// ===== Data: Members =====
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

// ===== Data: Struktur =====
const structureMembers = [
  { name: "Andiko Septa Aditya", role: "Ketua Kosma", ig: "", photo: "assets/members/andiko.jpg" },
  { name: "Sultan Muliya Pratama", role: "Wakil Kosma", ig: "omsul._", photo: "assets/members/sultan.jpg" },
  { name: "Agustiani Ambarwati", role: "Sekretaris", ig: "", photo: "assets/members/agustiani.jpg" },
  { name: "Isna Nurul Haqiqi", role: "Bendahara", ig: "", photo: "assets/members/isna.jpg" },
];

// ===== Data: Gallery =====
const galleryItems = [
  { thumb: "assets/members/nabil.jpg", full: "assets/members/nabil.jpg", alt: "Kegiatan 1" },
  { thumb: "assets/members/nabil.jpg", full: "assets/members/nabil.jpg", alt: "Kegiatan 2" },
  { thumb: "assets/photo-3.jpg", full: "assets/photo-3.jpg", alt: "Kegiatan 3" },
  { thumb: "assets/photo-4.jpg", full: "assets/photo-4.jpg", alt: "Kegiatan 4" },
  { thumb: "assets/photo-5.jpg", full: "assets/photo-5.jpg", alt: "Kegiatan 5" },
  { thumb: "assets/photo-6.jpg", full: "assets/photo-6.jpg", alt: "Kegiatan 6" },
  { thumb: "assets/photo-7.jpg", full: "assets/photo-7.jpg", alt: "Kegiatan 7" },
  { thumb: "assets/photo-8.jpg", full: "assets/photo-8.jpg", alt: "Kegiatan 8" },
  // tambahkan kalau ada
];

// ===== Render Card (pcard) =====
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

// ===== Struktur =====
function renderStructure(list) {
  const grid = document.getElementById("structureGrid");
  if (!grid) return;
  grid.innerHTML = list.map(memberCardHtml).join("");
}
renderStructure(structureMembers);

// ===== Members + Pagination =====
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

// ===== Gallery + Pagination (PER PAGE = 4 SELALU) =====
const galleryGrid = document.getElementById("galleryGrid");
const galleryPagination = document.getElementById("galleryPagination");

let currentGalleryPage = 1;

function getGalleryPerPage() {
  return 4; // ✅ sesuai permintaan: selalu 4 item per halaman
}

function galleryItemHtml(item, idx) {
  const full = item.full || item.thumb;
  const alt = item.alt || `Kegiatan ${idx + 1}`;
  const thumb = item.thumb || full;

  return `
    <button class="gitem" data-full="${full}" aria-label="Buka ${alt}">
      <img src="${thumb}" alt="${alt}" loading="lazy" />
    </button>
  `;
}

function renderGalleryPage(list, page) {
  if (!galleryGrid) return;

  const perPage = getGalleryPerPage();
  const totalPages = getTotalPages(list, perPage);
  const safePage = clampPage(page, totalPages);
  currentGalleryPage = safePage;

  const start = (safePage - 1) * perPage;
  const slice = list.slice(start, start + perPage);

  galleryGrid.innerHTML = slice.map(galleryItemHtml).join("");

  // re-bind lightbox
  bindGalleryLightbox();

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
        const tp = getTotalPages(galleryItems, getGalleryPerPage());
        renderGalleryPage(galleryItems, clampPage(p, tp));
      });
    });
  }
}

renderGalleryPage(galleryItems, currentGalleryPage);

// ===== Lightbox =====
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
    btn.addEventListener("click", () => {
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

// ===== Responsive: recalc pagination on resize =====
let resizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // members
    const memberTotal = getTotalPages(filteredMembers, getMembersPerPage());
    renderMembersPage(filteredMembers, clampPage(currentMemberPage, memberTotal));

    // gallery (perPage fixed 4, tapi totalPages bisa berubah kalau item berubah — aman)
    const galleryTotal = getTotalPages(galleryItems, getGalleryPerPage());
    renderGalleryPage(galleryItems, clampPage(currentGalleryPage, galleryTotal));
  }, 120);
});

// ===== Footer year =====
document.getElementById("year").textContent = String(new Date().getFullYear());
