const BUY_URL = "https://lynk.id/rebahan_tetapcuan";

const materials = [
  ["01","Produk Digital Gratis","Ada produk digital gratis yang bisa kamu gunakan sebagai langkah awal untuk mengenal dan mulai mempraktikkan sistem produk digital."],
  ["02","750+ Produk Siap Jual Kembali","Berisi koleksi produk digital yang dapat digunakan sebagai bahan untuk mulai belajar dan berjualan kembali sesuai ketentuan reseller."],
  ["03","Video Langkah-Langkah Ngonten Tanpa Tampil Muka, tapi Bisa Cepat Rame","Panduan membuat konten tanpa harus menampilkan wajah, mulai dari konsep sampai cara membuat konten yang lebih menarik."],
  ["04","File PDF Ebook Cara Cepat Cuan Jutaan Perhari dari Produk Digital","Ebook yang membahas strategi dan langkah yang bisa dipelajari untuk memanfaatkan produk digital. Judul materi, bukan jaminan penghasilan."],
  ["05","Video Langkah Demi Langkah Praktik untuk Mempelajari Produk Digital","Panduan praktik secara bertahap agar pemula tidak hanya membaca materi tetapi bisa langsung mencoba."],
  ["06","Cara Membuat Akun Lynk.Id","Panduan membuat halaman Lynk.id sebagai tempat untuk menampilkan dan menjual produk digital."],
  ["07","Cara Menambahkan Produk Digital ke Lynk.Id","Panduan memasukkan produk digital ke halaman Lynk.id agar siap ditawarkan kepada calon pembeli."],
  ["08","Metode Boosting Konsumen — META ADS","Materi terakhir untuk belajar boosting setelah memahami produk, membuat konten, mempunyai halaman Lynk.id, dan memasukkan produk."]
];

const list = document.querySelector("#materialList");
const backdrop = document.querySelector("#modalBackdrop");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const modalIndex = document.querySelector("#modalIndex");
const modalClose = document.querySelector("#modalClose");
let lastFocused = null;

materials.forEach(([num,title,text]) => {
  const item = document.createElement("button");
  item.className = "material-item reveal";
  item.type = "button";
  item.innerHTML = `<span class="num">${num}</span><strong>${title}</strong><span class="arrow">↗</span>`;
  item.addEventListener("click", () => openModal(num,title,text));
  list.appendChild(item);
});

function openModal(num,title,text){
  lastFocused = document.activeElement;
  modalIndex.textContent = `MATERI ${num}`;
  modalTitle.textContent = title;
  modalText.textContent = text;
  backdrop.classList.add("open");
  backdrop.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
  setTimeout(() => modalClose.focus(), 50);
}
function closeModal(){
  backdrop.classList.remove("open");
  backdrop.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
  if(lastFocused) lastFocused.focus();
}
modalClose.addEventListener("click",closeModal);
backdrop.addEventListener("click",e => { if(e.target === backdrop) closeModal(); });
document.addEventListener("keydown",e => {
  if(e.key === "Escape" && backdrop.classList.contains("open")) closeModal();
});

document.querySelector("#termsBtn").addEventListener("click", () => {
  openModal("RESELLER","Ketentuan Reseller",
`• Produk dapat dijual kembali.
• Harga jual kembali Rp70.000–Rp100.000.
• Tidak diperbolehkan menjual di bawah atau di atas rentang harga tersebut.
• Isi produk tidak boleh diubah atau dimodifikasi.
• Cover boleh dimodifikasi selama nama penulis tetap dicantumkan dengan jelas.`);
});

const themeToggle = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("rtc-theme");
if(savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.setAttribute("aria-pressed","true");
}
themeToggle.addEventListener("click",() => {
  const dark = document.body.classList.toggle("dark");
  localStorage.setItem("rtc-theme", dark ? "dark" : "light");
  themeToggle.setAttribute("aria-pressed",String(dark));
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const parallaxEls = document.querySelectorAll("[data-parallax]");
let ticking = false;
window.addEventListener("scroll", () => {
  if(ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    document.querySelectorAll("[data-parallax]").forEach(el => {
      const amount = parseFloat(el.dataset.parallax || 0);
      const rect = el.getBoundingClientRect();
      const shift = (rect.top - innerHeight/2) * amount;
      el.style.transform = `translateY(${shift * -0.12}px)`;
    });
    document.querySelectorAll(".drag-deco,.hero-dot").forEach((el,i) => {
      const base = (y * (i % 2 ? .012 : -.008));
      el.style.marginTop = `${base}px`;
    });
    ticking = false;
  });
},{passive:true});

// Countdown: a self-contained 12-hour cycle, no backend required.
const countdownEl = document.querySelector("#countdown");
const CYCLE_MS = 12 * 60 * 60 * 1000;
let cycleEnd = Number(localStorage.getItem("rtc-countdown-end"));
if(!cycleEnd || cycleEnd <= Date.now()) {
  cycleEnd = Date.now() + CYCLE_MS;
  localStorage.setItem("rtc-countdown-end",String(cycleEnd));
}
function renderCountdown(){
  let diff = cycleEnd - Date.now();
  if(diff <= 0){
    cycleEnd = Date.now() + CYCLE_MS;
    localStorage.setItem("rtc-countdown-end",String(cycleEnd));
    diff = cycleEnd - Date.now();
  }
  const total = Math.floor(diff/1000);
  const h = String(Math.floor(total/3600)).padStart(2,"0");
  const m = String(Math.floor((total%3600)/60)).padStart(2,"0");
  const s = String(total%60).padStart(2,"0");
  countdownEl.textContent = `${h} : ${m} : ${s}`;
}
renderCountdown();
setInterval(renderCountdown,1000);

// Lightweight drag/swipe with elastic return.
const toast = document.querySelector("#toast");
let toastTimer;
function showToast(){
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"),2200);
}
document.querySelectorAll(".drag-deco,.hero-dot").forEach(el => {
  let active=false, startX=0, startY=0, dx=0, dy=0;
  const down = e => {
    active=true;
    el.setPointerCapture?.(e.pointerId);
    startX=e.clientX; startY=e.clientY;
    el.style.cursor="grabbing";
    el.style.transition="none";
    showToast();
  };
  const move = e => {
    if(!active) return;
    dx=(e.clientX-startX)*.45; dy=(e.clientY-startY)*.45;
    el.style.transform=`translate3d(${dx}px,${dy}px,0) scale(${el.classList.contains("hero-dot")?1.35:1.04})`;
  };
  const up = e => {
    if(!active) return;
    active=false;
    el.releasePointerCapture?.(e.pointerId);
    el.style.cursor="grab";
    el.style.transition="transform .75s cubic-bezier(.16,1.35,.3,1)";
    el.style.transform="translate3d(0,0,0)";
    dx=dy=0;
  };
  el.addEventListener("pointerdown",down);
  el.addEventListener("pointermove",move);
  el.addEventListener("pointerup",up);
  el.addEventListener("pointercancel",up);
});

document.querySelector("#playPlaceholder").addEventListener("click",() => {
  const frame = document.querySelector("#videoFrame");
  frame.querySelector(".video-placeholder").innerHTML = `<div style="text-align:center;padding:20px"><div style="font-family:'Plus Jakarta Sans';font-size:24px;font-weight:800">Video siap diganti</div><p style="opacity:.65;margin:8px 0 0">Ganti isi .video-frame dengan iframe YouTube, video Drive, atau &lt;video&gt; milikmu.</p></div>`;
});

// Keep keyboard focus usable inside modal.
document.addEventListener("keydown", e => {
  if(e.key !== "Tab" || !backdrop.classList.contains("open")) return;
  const focusables = backdrop.querySelectorAll("button,a,[tabindex]:not([tabindex='-1'])");
  if(!focusables.length) return;
  const first = focusables[0], last = focusables[focusables.length-1];
  if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
  else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
});
