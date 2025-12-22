// app.js (FULL REPLACE)

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
const FALLBACK_GALLERY = "assets/members/placeholder.jpg";

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

// ===== Data: Members =====
const members = [
  { name: "Agustiani Ambarwati", role: "Member", ig: "gustianambarr", photo: "assets/members/agustiani.jpg" },
  { name: "Al Fahmi", role: "Member", ig: "Muhammadalfahmi__", photo: "assets/members/alfahmi.jpg" },
  { name: "Andiko Septa Aditya", role: "Member", ig: "andikoseptaaditya", photo: "assets/members/andiko.jpg" },
  { name: "Aprizal", role: "Member", ig: "izalapr78", photo: "assets/members/aprizal.jpg" },
  { name: "Bella Anggun Sapitri", role: "Member", ig: "bellaanggunsapitri_10", photo: "assets/members/bella.jpg" },
  { name: "Detia Cindo Hameva", role: "Member", ig: "detiahmvaa", photo: "assets/members/detia.jpg" },
  { name: "Drajad Putra Adi Kusuma", role: "Member", ig: "drajaddd", photo: "assets/members/drajad.jpg" },
  { name: "Erwin Saputra", role: "Member", ig: "erwinsptra77", photo: "assets/members/erwin.jpg" },
  { name: "Ferdi Ardika Putro", role: "Member", ig: "frdiardikptro", photo: "assets/members/ferdi.jpg" },
  { name: "Gevira Nur Harnika Pratami", role: "Member", ig: "geviranurharnika", photo: "assets/members/gevira.jpg" },
  { name: "Inayah Maudia Devira Putri", role: "Member", ig: "inayahmaudia_dp", photo: "assets/members/inayah.jpg" },
  { name: "Isna Nurul Haqiqi", role: "Member", ig: "isnahaqiqii", photo: "assets/members/isna.jpg" },
  { name: "Khoirunnisa", role: "Member", ig: "khrnnnnsa", photo: "assets/members/khoirunnisa.jpg" },
  { name: "Lu'lu Mir'atul Azizah", role: "Member", ig: "lulumrtlzh", photo: "assets/members/lulu.jpg" },
  { name: "Muhammad Irfan Nur Dzaky", role: "Member", ig: "irfan.dzaky_", photo: "assets/members/irfan.jpg" },
  { name: "Muhammad Iqbal Hafidho", role: "Member", ig: "mih27_", photo: "assets/members/iqbal.jpg" },
  { name: "Muhammad Nur Alfiansyah", role: "Member", ig: "tuan_muda_baik2", photo: "assets/members/alfiansyah.jpg" },
  { name: "Nabil Thufail", role: "Member", ig: "nabilthfail", photo: "assets/members/nabil.jpg" },
  { name: "Nalendra Satria Majid", role: "Member", ig: "nalenn___", photo: "assets/members/nalendra.jpg" },
  { name: "Praja Haqqi Qudsy", role: "Member", ig: "prajahaqqi", photo: "assets/members/praja.jpg" },
  { name: "Rafi Ardika Ramadhan", role: "Member", ig: "rafii.ardka_", photo: "assets/members/rafi.jpg" },
  { name: "Ratunabila Falen", role: "Member", ig: "bilaa._17", photo: "assets/members/ratunabila.jpg" },
  { name: "Repi Junita Sari", role: "Member", ig: "repijunitaaa", photo: "assets/members/repi.jpg" },
  { name: "Rima Ranataw", role: "Member", ig: "rimarnatw", photo: "assets/members/rima.jpg" },
  { name: "Rossa Florensia", role: "Member", ig: "rossaflorensia_", photo: "assets/members/rossa.jpg" },
  { name: "Tohar", role: "Member", ig: "tohar1305", photo: "assets/members/tohar.jpg" },
  { name: "Sultan Muliya Pratama", role: "Anak Dewa", ig: "omsul._", photo: "assets/members/sultan.jpg" },
  { name: "Vira Dwi Novia", role: "Member", ig: "_viradwii", photo: "assets/members/vira.jpg" },
  { name: "Zahra Mutiara", role: "Member", ig: "zahra_mutiiara", photo: "assets/members/zahra.jpg" },
];

// ===== Data: Struktur =====
const structureMembers = [
  { name: "Andiko Septa Aditya", role: "Ketua Kosma", ig: "andikoseptaaditya", photo: "assets/members/andiko.jpg" },
  { name: "Sultan Muliya Pratama", role: "Wakil Kosma", ig: "omsul._", photo: "assets/members/sultan.jpg" },
  { name: "Agustiani Ambarwati", role: "Sekretaris", ig: "gustianambarr", photo: "assets/members/agustiani.jpg" },
  { name: "Isna Nurul Haqiqi", role: "Bendahara", ig: "isnahaqiqii", photo: "assets/members/isna.jpg" },
];

// ===== Data: Gallery Groups (MANUAL) =====
const galleryGroups = [
  {
    id: "it-fest-2024",
    title: "IT Fest",
    date: "2024",
    location: "UIN RIL",
    cover: "assets/gallery/itfest/cover.jpg",
    photos: [
      "assets/gallery/itfest/1.jpg",
      "assets/gallery/itfest/2.jpg",
      "assets/gallery/itfest/3.jpg",
      "assets/gallery/itfest/4.jpg",
      "assets/gallery/itfest/5.jpg",
      "assets/gallery/itfest/6.jpg",
      "assets/gallery/itfest/7.jpg",
      "assets/gallery/itfest/8.jpg",
      "assets/gallery/itfest/9.jpg",
      "assets/gallery/itfest/10.jpg",
      "assets/gallery/itfest/11.jpg",
      "assets/gallery/itfest/12.jpg",
      "assets/gallery/itfest/13.jpg",
      "assets/gallery/itfest/14.jpg",
      "assets/gallery/itfest/15.jpg",
      "assets/gallery/itfest/16.jpg",
      "assets/gallery/itfest/17.jpg",
      "assets/gallery/itfest/18.jpg",
      "assets/gallery/itfest/19.jpg",
      "assets/gallery/itfest/20.jpg",
      "assets/gallery/itfest/21.jpg",
      "assets/gallery/itfest/22.jpg",
      "assets/gallery/itfest/23.jpg",
      "assets/gallery/itfest/24.jpg",
      "assets/gallery/itfest/25.jpg",
      "assets/gallery/itfest/26.jpg",
      "assets/gallery/itfest/27.jpg",
      "assets/gallery/itfest/28.jpg",
      "assets/gallery/itfest/29.jpg",
    ],
  },
  {
    id: "DiesNatalies",
    title: "Futsal Dies Natalies",
    date: "2023",
    location: "Lapangan Futsal Srikandi",
    cover: "assets/gallery/diesnatalies/cover.jpg",
    photos: [
      "assets/gallery/diesnatalies/1.jpg",
      "assets/gallery/diesnatalies/2.jpg",
      "assets/gallery/diesnatalies/3.jpg",
      "assets/gallery/diesnatalies/4.jpg",
      "assets/gallery/diesnatalies/5.jpg",
      "assets/gallery/diesnatalies/6.jpg",
      "assets/gallery/diesnatalies/7.jpg",
      "assets/gallery/diesnatalies/8.jpg",
      "assets/gallery/diesnatalies/9.jpg",
      "assets/gallery/diesnatalies/10.jpg",
    ],
  },
  {
    id: "Bukber",
    title: "Buka Bersama",
    date: "2024",
    location: "Kulea Space",
    cover: "assets/gallery/bukber/cover.jpg",
    photos: [
      "assets/gallery/bukber/1.jpg",
      "assets/gallery/bukber/2.jpg",
      "assets/gallery/bukber/3.jpg",
    ],
  },
  {
    id: "kknmini",
    title: "KKN Mini",
    date: "2024",
    location: "Panti Asuhan Tiara Putri",
    cover: "assets/gallery/kknmini/cover.jpg",
    photos: [
      "assets/gallery/kknmini/1.jpg",
      "assets/gallery/kknmini/2.jpg",
      "assets/gallery/kknmini/3.jpg",
      "assets/gallery/kknmini/4.jpg",
      "assets/gallery/kknmini/5.jpg",
      "assets/gallery/kknmini/6.jpg",
      "assets/gallery/kknmini/7.jpg",
      "assets/gallery/kknmini/8.jpg",
      "assets/gallery/kknmini/9.jpg",
      "assets/gallery/kknmini/10.jpg",
    ],
  },
  {
    id: "Random",
    title: "Suka Suka Aja",
    date: "2023 - 2025",
    location: "Dimana Mana Hatiku Senang",
    cover: "assets/gallery/random/cover.jpg",
    photos: [
      "assets/gallery/random/1.jpg",
      "assets/gallery/random/2.jpg",
      "assets/gallery/random/3.jpg",
      "assets/gallery/random/4.jpg",
      "assets/gallery/random/5.jpg",
      "assets/gallery/random/6.jpg",
      "assets/gallery/random/7.jpg",
      "assets/gallery/random/8.jpg",
      "assets/gallery/random/9.jpg",
      "assets/gallery/random/10.jpg",
      "assets/gallery/random/11.jpg",
      "assets/gallery/random/12.jpg",
      "assets/gallery/random/13.jpg",
      "assets/gallery/random/14.jpg",
      "assets/gallery/random/15.jpg",
      "assets/gallery/random/16.jpg",
      "assets/gallery/random/17.jpg",
      "assets/gallery/random/18.jpg",
      "assets/gallery/random/19.jpg",
      "assets/gallery/random/20.jpg",
      "assets/gallery/random/21.jpg",
      "assets/gallery/random/22.jpg",
      "assets/gallery/random/23.jpg",
      "assets/gallery/random/24.jpg",
      "assets/gallery/random/25.jpg",
      "assets/gallery/random/26.jpg",
      "assets/gallery/random/27.jpg",
      "assets/gallery/random/28.jpg",
      "assets/gallery/random/29.jpg",
      "assets/gallery/random/30.jpg",
      "assets/gallery/random/31.jpg",
      "assets/gallery/random/32.jpg",
      "assets/gallery/random/33.jpg",
      "assets/gallery/random/34.jpg",
      "assets/gallery/random/35.jpg",
      "assets/gallery/random/36.jpg",
      "assets/gallery/random/37.jpg",
      "assets/gallery/random/38.jpg",
      "assets/gallery/random/39.jpg",
      "assets/gallery/random/40.jpg",
      "assets/gallery/random/41.jpg",
      "assets/gallery/random/42.jpg",
      "assets/gallery/random/43.jpg",
      "assets/gallery/random/44.jpg",
      "assets/gallery/random/45.jpg",
      "assets/gallery/random/46.jpg",
      "assets/gallery/random/47.jpg",
      "assets/gallery/random/48.jpg",
      "assets/gallery/random/49.jpg",
      "assets/gallery/random/50.jpg",
      "assets/gallery/random/51.jpg",
      "assets/gallery/random/52.jpg",
      "assets/gallery/random/53.jpg",
      "assets/gallery/random/54.jpg",
      "assets/gallery/random/55.jpg",
      "assets/gallery/random/56.jpg",
      "assets/gallery/random/57.jpg",
      "assets/gallery/random/58.jpg",
    ],
  },
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
      <div class="pcard__media" data-member-photo="${photo}" data-member-name="${m.name}">
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

  // ✅ penting: tiap render harus bind ulang
  bindMemberLightbox();

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

// ===== Gallery Grouped Logic =====
const galleryListView = document.getElementById("galleryListView");
const galleryDetailView = document.getElementById("galleryDetailView");

const gallerySearch = document.getElementById("gallerySearch");
const galleryGroupCount = document.getElementById("galleryGroupCount");

const galleryGroupGrid = document.getElementById("galleryGroupGrid");
const galleryGroupPagination = document.getElementById("galleryGroupPagination");

const galleryBackBtn = document.getElementById("galleryBackBtn");
const galleryDetailTitle = document.getElementById("galleryDetailTitle");
const galleryDetailMeta = document.getElementById("galleryDetailMeta");

const galleryGrid = document.getElementById("galleryGrid");
const galleryPagination = document.getElementById("galleryPagination");

let filteredGroups = [...galleryGroups];
let currentGroupPage = 1;

let activeGroup = null;
let currentGalleryPage = 1;

function getGroupsPerPage() {
  const w = window.innerWidth;
  if (w <= 520) return 4;
  return 6;
}
function getGalleryPerPage() {
  const w = window.innerWidth;

  // Desktop: 3 baris x 4 kolom = 12 foto per halaman
  if (w > 980) return 12;

  // Tablet: 3 kolom, biar tetap 3 baris -> 9
  if (w > 520) return 9;

  // HP: 2 kolom, biar tetap 3 baris -> 6
  return 6;
}

function groupCardHtml(g) {
  const cover = g.cover || (g.photos?.[0] || FALLBACK_GALLERY);
  const count = (g.photos || []).length;
  const meta = [g.date, g.location].filter(Boolean).join(" • ");

  return `
    <article class="gcard" role="button" tabindex="0" data-gid="${g.id}" aria-label="Buka kegiatan ${g.title}">
      <div class="gcard__media">
        <img class="gcard__img" src="${cover}" alt="Cover ${g.title}" loading="lazy"
             onerror="this.onerror=null;this.src='${FALLBACK_GALLERY}'" />
        <div class="gcard__count">${count} foto</div>
      </div>
      <div class="gcard__body">
        <h3 class="gcard__title">${g.title}</h3>
        <p class="gcard__meta">${meta || "Kegiatan kelas"}</p>
      </div>
    </article>
  `;
}

function showListView() {
  galleryDetailView.style.display = "none";
  galleryListView.style.display = "block";
  activeGroup = null;
}

function showDetailView(group) {
  activeGroup = group;
  currentGalleryPage = 1;

  galleryListView.style.display = "none";
  galleryDetailView.style.display = "block";

  galleryDetailTitle.textContent = group.title || "Kegiatan";
  const meta = [
    group.date ? group.date : null,
    group.location ? group.location : null,
    `${(group.photos || []).length} foto`,
  ].filter(Boolean).join(" • ");
  galleryDetailMeta.textContent = meta;

  renderGalleryPhotosPage(group, 1);
}

function renderGroupsPage(list, page) {
  if (!galleryGroupGrid) return;

  const perPage = getGroupsPerPage();
  const totalPages = getTotalPages(list, perPage);
  const safePage = clampPage(page, totalPages);
  currentGroupPage = safePage;

  const start = (safePage - 1) * perPage;
  const slice = list.slice(start, start + perPage);

  galleryGroupGrid.innerHTML = slice.map(groupCardHtml).join("");
  if (galleryGroupCount) galleryGroupCount.textContent = `${list.length} kegiatan`;

  galleryGroupGrid.querySelectorAll("[data-gid]").forEach((el) => {
    const open = () => {
      const gid = el.getAttribute("data-gid");
      const group = galleryGroups.find((x) => x.id === gid);
      if (group) showDetailView(group);
    };
    el.addEventListener("click", open);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") open();
    });
  });

  if (galleryGroupPagination) {
    galleryGroupPagination.innerHTML = makePaginationHtml({
      totalPages,
      activePage: safePage,
      onLabelPrev: "Previous",
      onLabelNext: "Next",
    });
    galleryGroupPagination.querySelectorAll("button[data-page]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const p = Number(btn.getAttribute("data-page") || "1");
        const tp = getTotalPages(filteredGroups, getGroupsPerPage());
        renderGroupsPage(filteredGroups, clampPage(p, tp));
      });
    });
  }
}

function photoItemHtml(src, idx, title = "Foto") {
  const alt = `${title} ${idx + 1}`;
  return `
    <button class="gitem" data-full="${src}" aria-label="Buka ${alt}">
      <img src="${src}" alt="${alt}" loading="lazy"
           onerror="this.onerror=null;this.src='${FALLBACK_GALLERY}'" />
    </button>
  `;
}

function renderGalleryPhotosPage(group, page) {
  if (!galleryGrid) return;

  const photos = group.photos || [];
  const perPage = getGalleryPerPage();
  const totalPages = getTotalPages(photos, perPage);
  const safePage = clampPage(page, totalPages);
  currentGalleryPage = safePage;

  const start = (safePage - 1) * perPage;
  const slice = photos.slice(start, start + perPage);

  galleryGrid.innerHTML = slice.map((src, i) => photoItemHtml(src, start + i, group.title)).join("");
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
        const tp = getTotalPages(photos, getGalleryPerPage());
        renderGalleryPhotosPage(group, clampPage(p, tp));
      });
    });
  }
}

renderGroupsPage(filteredGroups, currentGroupPage);

gallerySearch?.addEventListener("input", () => {
  const q = gallerySearch.value.trim().toLowerCase();
  filteredGroups = galleryGroups.filter((g) => (g.title || "").toLowerCase().includes(q));
  renderGroupsPage(filteredGroups, 1);
});

galleryBackBtn?.addEventListener("click", () => {
  showListView();
});

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

// ✅ NEW: klik foto anggota (struktur + anggota) -> lightbox
function bindMemberLightbox() {
  // yang bisa diklik hanya area foto (pcard__media)
  document.querySelectorAll(".pcard__media").forEach((wrap) => {
    wrap.style.cursor = "pointer";
    wrap.setAttribute("role", "button");
    wrap.setAttribute("tabindex", "0");
    wrap.setAttribute("aria-label", "Buka foto anggota");

    const open = () => {
      const img = wrap.querySelector("img");
      const src = img?.getAttribute("src");
      const alt = img?.getAttribute("alt") || "Foto";
      openLightbox(src, alt);
    };

    // hindari double bind: reset handler sederhana dengan clone
    const clone = wrap.cloneNode(true);
    wrap.parentNode.replaceChild(clone, wrap);

    clone.style.cursor = "pointer";
    clone.setAttribute("role", "button");
    clone.setAttribute("tabindex", "0");
    clone.setAttribute("aria-label", "Buka foto anggota");

    clone.addEventListener("click", (e) => {
      // klik IG jangan buka lightbox (IG ada di bawah, tapi aman)
      if (e.target.closest(".pcard__ig")) return;
      const img = clone.querySelector("img");
      const src = img?.getAttribute("src");
      const alt = img?.getAttribute("alt") || "Foto";
      openLightbox(src, alt);
    });

    clone.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const img = clone.querySelector("img");
        const src = img?.getAttribute("src");
        const alt = img?.getAttribute("alt") || "Foto";
        openLightbox(src, alt);
      }
    });
  });
}

// bind untuk struktur pertama kali (setelah renderStructure)
bindMemberLightbox();

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

    // gallery groups
    const groupTotal = getTotalPages(filteredGroups, getGroupsPerPage());
    renderGroupsPage(filteredGroups, clampPage(currentGroupPage, groupTotal));

    // gallery photos (if detail view open)
    if (activeGroup) {
      const photoTotal = getTotalPages(activeGroup.photos || [], getGalleryPerPage());
      renderGalleryPhotosPage(activeGroup, clampPage(currentGalleryPage, photoTotal));
    }
  }, 120);
});

// ===== Footer year =====
document.getElementById("year").textContent = String(new Date().getFullYear());
