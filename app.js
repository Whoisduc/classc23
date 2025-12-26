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
const FALLBACK_ACH = "assets/members/placeholder.jpg";

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

// ===== Data: Achievements (BLANK CARDS) =====
// Tinggal ganti img/title/desc sesuai kebutuhan
const achievements = [
  { title: "Juara 1 Futsal Dies Natalies", desc: "Berhasil meraih Juara 1 Lomba Futsal Dies Natalis, sebuah pencapaian membanggakan bagi tim yang diperkuat oleh rookie semester 1. Prestasi ini mencerminkan semangat kompetitif, kerja sama tim yang solid, serta kemampuan beradaptasi dan mental juara sejak awal perjalanan akademik. Kemenangan tersebut tidak hanya menjadi bukti potensi atletik, tetapi juga menegaskan komitmen terhadap sportivitas dan dedikasi dalam mengharumkan nama Kelas.", img: "assets/achievements/1.jpg" },
  { title: "Juara 3 IT Fest Aplikasi Mobile/Web", desc: "Meraih Juara 3 IT Fest kategori Aplikasi Mobile/Web, dengan menghadirkan solusi aplikasi yang fokus pada fungsionalitas, pengalaman pengguna, dan relevansi kebutuhan. Di tengah kompetisi yang menampilkan inovasi beragam mulai dari implementasi teknologi lanjutan seperti IoT hingga pengembangan aplikasi sejenis karya ini mampu menonjol melalui perancangan sistem yang terstruktur, konsep yang matang, serta nilai guna yang aplikatif, sehingga layak memperoleh pengakuan pada posisi tiga besar.", img: "assets/achievements/2.jpg" },
  { title: "Karya Aplikasi Food Rescue", desc: "Aplikasi web FoodRescue merupakan platform digital yang dirancang sebagai wadah terpusat untuk menampung dan menyalurkan donasi makanan baik makanan sisa yang masih layak konsumsi maupun makanan baru serta donasi berupa dana. Website ini berfokus pada upaya pengurangan limbah makanan sekaligus peningkatan kepedulian sosial dengan menyalurkan bantuan secara tepat sasaran kepada panti asuhan dan lembaga sosial di wilayah Lampung. Melalui sistem yang sederhana, transparan, dan mudah digunakan, FoodRescue memungkinkan donatur untuk memantau riwayat donasi, melihat lokasi penerima manfaat, serta memastikan setiap kontribusi memberikan dampak nyata bagi masyarakat yang membutuhkan.", img: "assets/achievements/3.jpg" },
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
      "assets/gallery/diesnatalies/11.jpg",
      "assets/gallery/diesnatalies/12.jpg",
      "assets/gallery/diesnatalies/13.jpg",
      "assets/gallery/diesnatalies/14.jpg",
      "assets/gallery/diesnatalies/15.jpg",
      "assets/gallery/diesnatalies/16.jpg",
      "assets/gallery/diesnatalies/17.jpg",
      "assets/gallery/diesnatalies/18.jpg",
      "assets/gallery/diesnatalies/19.jpg",
      "assets/gallery/diesnatalies/20.jpg",
      "assets/gallery/diesnatalies/21.jpg",
      "assets/gallery/diesnatalies/22.jpg",
      "assets/gallery/diesnatalies/23.jpg",
      "assets/gallery/diesnatalies/24.jpg",
      "assets/gallery/diesnatalies/25.jpg",
      "assets/gallery/diesnatalies/26.jpg",
      "assets/gallery/diesnatalies/27.jpg",
      "assets/gallery/diesnatalies/28.jpg",
      "assets/gallery/diesnatalies/29.jpg",
      "assets/gallery/diesnatalies/30.jpg",
      "assets/gallery/diesnatalies/31.jpg",
      "assets/gallery/diesnatalies/32.jpg",
      "assets/gallery/diesnatalies/33.jpg",
      "assets/gallery/diesnatalies/34.jpg",
      "assets/gallery/diesnatalies/35.jpg",
      "assets/gallery/diesnatalies/36.jpg",
      "assets/gallery/diesnatalies/37.jpg",
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
      "assets/gallery/bukber/4.jpg",
      "assets/gallery/bukber/5.jpg",
      "assets/gallery/bukber/6.jpg",
      "assets/gallery/bukber/7.jpg",
      "assets/gallery/bukber/8.jpg",
      "assets/gallery/bukber/9.jpg",
      "assets/gallery/bukber/10.jpg",
      "assets/gallery/bukber/11.jpg",
      "assets/gallery/bukber/12.jpg",
      "assets/gallery/bukber/13.jpg",
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
      "assets/gallery/kknmini/11.jpg",
    ],
  },
  {
    id: "ketapang",
    title: "Ketapang beach",
    date: "2025",
    location: "Pantai Ketapang",
    cover: "assets/gallery/ketapang/cover.jpg",
    photos: [
      "assets/gallery/ketapang/1.jpg",
      "assets/gallery/ketapang/2.jpg",
      "assets/gallery/ketapang/3.jpg",
      "assets/gallery/ketapang/4.jpg",
      "assets/gallery/ketapang/5.jpg",
      "assets/gallery/ketapang/6.jpg",
      "assets/gallery/ketapang/7.jpg",
      "assets/gallery/ketapang/8.jpg",
      "assets/gallery/ketapang/9.jpg",
      "assets/gallery/ketapang/10.jpg",
      "assets/gallery/ketapang/11.jpg",
      "assets/gallery/ketapang/12.jpg",
      "assets/gallery/ketapang/13.jpg",
      "assets/gallery/ketapang/14.jpg",
      "assets/gallery/ketapang/15.jpg",
      "assets/gallery/ketapang/16.jpg",
      "assets/gallery/ketapang/17.jpg",
      "assets/gallery/ketapang/18.jpg",
      "assets/gallery/ketapang/19.jpg",
      "assets/gallery/ketapang/20.jpg",
      "assets/gallery/ketapang/21.jpg",
      "assets/gallery/ketapang/22.jpg",
      "assets/gallery/ketapang/23.jpg",
      "assets/gallery/ketapang/24.jpg",
      "assets/gallery/ketapang/25.jpg",
      "assets/gallery/ketapang/26.jpg",
      "assets/gallery/ketapang/27.jpg",
      "assets/gallery/ketapang/28.jpg",
      "assets/gallery/ketapang/29.jpg",
      "assets/gallery/ketapang/30.jpg",
      "assets/gallery/ketapang/31.jpg",
      "assets/gallery/ketapang/32.jpg",
      "assets/gallery/ketapang/33.jpg",
      "assets/gallery/ketapang/34.jpg",
      "assets/gallery/ketapang/35.jpg",
      "assets/gallery/ketapang/36.jpg",
      "assets/gallery/ketapang/37.jpg",
      "assets/gallery/ketapang/38.jpg",
      "assets/gallery/ketapang/39.jpg",
      "assets/gallery/ketapang/40.jpg",
      "assets/gallery/ketapang/41.jpg",
      "assets/gallery/ketapang/42.jpg",
      "assets/gallery/ketapang/43.jpg",
      "assets/gallery/ketapang/44.jpg",
      "assets/gallery/ketapang/45.jpg",
      "assets/gallery/ketapang/46.jpg",
      "assets/gallery/ketapang/47.jpg",
      "assets/gallery/ketapang/48.jpg",
      "assets/gallery/ketapang/49.jpg",
      "assets/gallery/ketapang/50.jpg",
      "assets/gallery/ketapang/51.jpg",
      "assets/gallery/ketapang/52.jpg",
      "assets/gallery/ketapang/53.jpg",
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
      "assets/gallery/random/59.jpg",
      "assets/gallery/random/60.jpg",
      "assets/gallery/random/61.jpg",
      "assets/gallery/random/62.jpg",
      "assets/gallery/random/63.jpg",
      "assets/gallery/random/64.jpg",
      "assets/gallery/random/65.jpg",
      "assets/gallery/random/66.jpg",
      "assets/gallery/random/67.jpg",
      "assets/gallery/random/68.jpg",
      "assets/gallery/random/69.jpg",
      "assets/gallery/random/70.jpg",
      "assets/gallery/random/71.jpg",
      "assets/gallery/random/72.jpg",
      "assets/gallery/random/73.jpg",
      "assets/gallery/random/74.jpg",
      "assets/gallery/random/75.jpg",
      "assets/gallery/random/76.jpg",
      "assets/gallery/random/78.jpg",
      "assets/gallery/random/79.jpg",
      "assets/gallery/random/80.jpg",
      "assets/gallery/random/81.jpg",
      "assets/gallery/random/82.jpg",
      "assets/gallery/random/83.jpg",
      "assets/gallery/random/84.jpg",
      "assets/gallery/random/85.jpg",
      "assets/gallery/random/86.jpg",
      "assets/gallery/random/87.jpg",
      "assets/gallery/random/88.jpg",
      "assets/gallery/random/89.jpg",
      "assets/gallery/random/90.jpg",
      "assets/gallery/random/91.jpg",
      "assets/gallery/random/92.jpg",
      "assets/gallery/random/93.jpg",
      "assets/gallery/random/94.jpg",
      "assets/gallery/random/95.jpg",
      "assets/gallery/random/96.jpg",
      "assets/gallery/random/97.jpg",
      "assets/gallery/random/98.jpg",
      "assets/gallery/random/99.jpg",
      "assets/gallery/random/100.jpg",
      "assets/gallery/random/101.jpg",
      "assets/gallery/random/102.jpg",
      "assets/gallery/random/103.jpg",
      "assets/gallery/random/104.jpg",
      "assets/gallery/random/105.jpg",
      "assets/gallery/random/106.jpg",
      "assets/gallery/random/107.jpg",
      "assets/gallery/random/108.jpg",
      "assets/gallery/random/109.jpg",
      "assets/gallery/random/110.jpg",
      "assets/gallery/random/111.jpg",
      "assets/gallery/random/112.jpg",
      "assets/gallery/random/113.jpg",
      "assets/gallery/random/114.jpg",
      "assets/gallery/random/115.jpg",
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

// ===== Achievements (Blank Cards + Pagination) =====
const achievementsGrid = document.getElementById("achievementsGrid");
const achievementsPagination = document.getElementById("achievementsPagination");

let currentAchPage = 1;

function getAchPerPage() {
  const w = window.innerWidth;
  if (w <= 520) return 4;
  if (w <= 980) return 6;
  return 8;
}

function achievementCardHtml(a) {
  const img = (a.img || "").trim() || FALLBACK_ACH;
  const title = (a.title || "Judul").trim();
  const desc = (a.desc || "Deskripsi singkat.").trim();

  return `
    <article class="achcard">
      <div class="achcard__media">
        <img class="achcard__img" src="${img}" alt="Gambar ${title}" loading="lazy"
             onerror="this.onerror=null;this.src='${FALLBACK_ACH}'" />
      </div>
      <div class="achcard__body">
        <h3 class="achcard__title">${title}</h3>
        <p class="achcard__desc">${desc}</p>
      </div>
    </article>
  `;
}

function renderAchievementsPage(list, page) {
  if (!achievementsGrid) return;

  const perPage = getAchPerPage();
  const totalPages = getTotalPages(list, perPage);
  const safePage = clampPage(page, totalPages);
  currentAchPage = safePage;

  const start = (safePage - 1) * perPage;
  const slice = list.slice(start, start + perPage);

  achievementsGrid.innerHTML = slice.map(achievementCardHtml).join("");

  if (achievementsPagination) {
    achievementsPagination.innerHTML = makePaginationHtml({
      totalPages,
      activePage: safePage,
      onLabelPrev: "Previous",
      onLabelNext: "Next",
    });

    achievementsPagination.querySelectorAll("button[data-page]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const p = Number(btn.getAttribute("data-page") || "1");
        const tp = getTotalPages(achievements, getAchPerPage());
        renderAchievementsPage(achievements, clampPage(p, tp));
      });
    });
  }
}
renderAchievementsPage(achievements, currentAchPage);

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
  if (w > 980) return 12;
  if (w > 520) return 9;
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

// klik foto anggota (struktur + anggota) -> lightbox
function bindMemberLightbox() {
  document.querySelectorAll(".pcard__media").forEach((wrap) => {
    wrap.style.cursor = "pointer";
    wrap.setAttribute("role", "button");
    wrap.setAttribute("tabindex", "0");
    wrap.setAttribute("aria-label", "Buka foto anggota");

    const clone = wrap.cloneNode(true);
    wrap.parentNode.replaceChild(clone, wrap);

    clone.addEventListener("click", (e) => {
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

    // achievements
    const achTotal = getTotalPages(achievements, getAchPerPage());
    renderAchievementsPage(achievements, clampPage(currentAchPage, achTotal));

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


/* =================================================================== */
/* ======================= TAMBAHAN: REVEAL FX ======================== */
/* =================================================================== */

(function enableRevealAnimations(){
  // elemen utama yang enak di-reveal
  const targets = [
    ".hero__copy",
    ".hero__card",
    "#about .panel",
    "#structure .container",
    "#members .panel",
    "#gallery .panel",
    "#achievements .panel",
    "#contact .container",
    ".footer",
  ];

  // kasih class reveal untuk transisi masuk
  targets.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      el.classList.add("reveal");
    });
  });

  // grid yang pengen stagger
  const staggerTargets = ["#structureGrid", "#memberGrid", "#galleryGroupGrid", "#galleryGrid", "#achievementsGrid"];
  staggerTargets.forEach((id) => {
    const el = document.querySelector(id);
    if (el) el.classList.add("reveal-stagger");
  });

  // Observer: ketika keluar viewport -> hapus is-visible supaya bisa replay
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting) {
          // masuk viewport -> animasi jalan
          el.classList.add("is-visible");
        } else {
          // keluar viewport -> reset supaya ketika masuk lagi animasi replay
          el.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => obs.observe(el));

  // Re-hook untuk konten dinamis (pagination/search) agar grid tetap bisa replay
  function reobserveGrid(gridEl){
    if (!gridEl) return;
    // reset biar replay ketika terlihat
    gridEl.classList.remove("is-visible");
    // pastikan observer attach
    obs.observe(gridEl);
    // kalau kebetulan sedang di viewport, trigger cepat
    requestAnimationFrame(() => {
      const r = gridEl.getBoundingClientRect();
      const inView = r.top < (window.innerHeight * 0.9) && r.bottom > (window.innerHeight * 0.1);
      if (inView) gridEl.classList.add("is-visible");
    });
  }

  // watch perubahan isi grid (pagination/search)
  const gridsToWatch = staggerTargets
    .map((id) => document.querySelector(id))
    .filter(Boolean);

  gridsToWatch.forEach((grid) => {
    const mo = new MutationObserver(() => reobserveGrid(grid));
    mo.observe(grid, { childList: true, subtree: false });
  });

  // optional: kalau user klik anchor nav (jump), pastikan update
  window.addEventListener("hashchange", () => {
    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => {
      el.classList.remove("is-visible");
    });
    // biar observer nge-set lagi sesuai posisi baru
    requestAnimationFrame(() => {
      document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => obs.observe(el));
    });
  });
})();

// ===== Confess Form (Google Form submit via hidden iframe) =====
const confessForm = document.getElementById("confessForm");
const cfStatus = document.getElementById("cfStatus");
const cfReset = document.getElementById("cfReset");

function setStatus(msg) {
  if (cfStatus) cfStatus.textContent = msg;
}

confessForm?.addEventListener("submit", () => {
  setStatus("Mengirim... 🚀");

  // Small delay: assume success after submit (karena iframe hidden, kita ga bisa baca response)
  setTimeout(() => {
    setStatus("Terkirim ✅ Makasih udah confess 😭🔥");
    confessForm.reset();

    // reset mode ke default
    const mode = document.getElementById("cfMode");
    if (mode) mode.value = "Anonim";
  }, 900);
});

cfReset?.addEventListener("click", () => {
  confessForm?.reset();
  setStatus("");
});
