REBahan TETAP CUAN — REDESIGN UI/UX PRO MAX
===============================================

STRUKTUR
--------
rebahan-tetap-cuan-redesign/
├── index.html
├── style.css
├── script.js
├── hero.png
├── jeki.png
└── README.txt

CARA MENJALANKAN
----------------
1. Extract ZIP.
2. Buka index.html di browser.
3. Untuk preview lokal yang lebih ideal, gunakan Live Server/localhost.
   Tidak ada backend yang diperlukan.

FITUR
-----
- Mobile-first responsive layout
- Storytelling flow: story → problem → experience → materials → practice flow → offer → CTA
- Brand palette: #F0997B, #FAECE7, #4A1B0C, #993C1D
- Dark mode + localStorage
- Modal materi interaktif
- Modal Ketentuan Reseller
- Countdown realtime 12 jam yang reset otomatis dan selalu terlihat di section promo
- Dekorasi drag/swipe dengan elastic return
- Scroll reveal
- Gentle hero floating + lightweight parallax
- Keyboard accessible modal (ESC, click outside, focus handling)
- CTA pembelian menuju:
  https://lynk.id/rebahan_tetapcuan
- Video placeholder 16:9 yang mudah diganti
- Slot bukti nyata/order pertama yang sengaja dibuat kosong

MENGGANTI GAMBAR
----------------
Ganti:
hero.png  → ilustrasi/logo hero
jeki.png   → foto Jeki

MENGGANTI VIDEO
---------------
Di index.html cari .video-frame. Ganti isi .video-placeholder dengan
iframe YouTube, embed Drive, atau elemen <video> milik sendiri.

CATATAN COUNTDOWN
-----------------
Countdown menggunakan localStorage agar siklus 12 jam tersimpan pada browser.
Tidak membutuhkan backend. Jika storage browser dihapus, siklus akan mulai
lagi dari 12 jam.

CATATAN KONTEN
--------------
Tidak ada klaim pendapatan, testimonial palsu, angka penjualan palsu,
atau jaminan hasil yang ditambahkan.
