PENJELASAN PROYEK FINFLOW

 1. Deskripsi Umum
FinFlow adalah website portofolio/landing page untuk layanan teknologi finansial (fintech) yang menawarkan solusi digital seperti dompet digital, transfer uang real-time, budgeting berbasis AI, dan investasi otomatis. Website ini bersifat statis, dibangun dengan HTML, CSS, dan JavaScript, serta menggunakan Vite sebagai build tool untuk pengembangan.

2. Struktur Folder & File
- index.html : Halaman utama, menampilkan fitur, statistik, testimonial, dan CTA.
- about.html : Profil perusahaan/produk.
- services.html : Daftar layanan fintech, kalkulator harga, dan customisasi paket.
- portfolio.html : Showcase portofolio proyek/produk.
- contact.html : Formulir kontak dan informasi perusahaan.
- blog.html : Artikel atau berita terkait fintech.

Folder `styles/`
- main.css : Styling utama untuk layout dan elemen global.
- components.css : Styling untuk komponen seperti tombol, kartu, dsb.
- responsive.css : Styling untuk tampilan responsif di berbagai perangkat.

Folder scripts/
- main.js : Script utama untuk navigasi, animasi, testimonial, counter, dsb.
- animations.js : Script khusus animasi tambahan.
- components.js : Script untuk komponen interaktif.

File Lain
- counter.js : Script animasi penghitung (counter), kemungkinan digunakan di halaman tertentu.
- main.js (root) : Entry point untuk Vite (jika digunakan).
- style.css : File CSS global (tidak langsung dipakai di index.html).
- package.json : Konfigurasi Node.js, hanya menggunakan Vite untuk development.
- public/vite.svg, javascript.svg : Aset gambar/icon.

3. Fitur Utama Website
- Navigasi responsif dan highlight link aktif.
- Hero section dengan animasi teks dan statistik dinamis.
- Fitur utama: Digital Wallet, Real-time Transfer, Smart Budgeting, AI Investment.
- Testimonial carousel otomatis dan manual.
- Call-to-action (CTA) untuk mengajak pengguna mendaftar.
- Footer dengan link layanan, company, support, dan sosial media.
- Animasi muncul saat scroll (Intersection Observer).
- Smooth scroll ke section tertentu.
- Kartu fitur yang bisa diexpand.
- Animated counter (angka berjalan naik).
- Filter dinamis untuk layanan/portfolio.
- Kalkulator harga transfer dan customisasi paket layanan (di halaman services).

4. Teknologi yang Digunakan
- HTML, CSS, JavaScript murni (tanpa framework frontend besar).
- Vite sebagai build tool dan dev server.
- Font Awesome untuk ikon.

5. Cara Menjalankan Proyek
   1. Pastikan Node.js sudah terinstal.
   2. Jalankan `npm install` untuk menginstal dependensi (Vite).
   3. Jalankan `npm run dev` untuk memulai server pengembangan.
   4. Akses website di browser melalui alamat yang diberikan Vite (biasanya http://localhost:5173).

6. Catatan
- Semua data (statistik, testimoni, dsb) bersifat statis/hardcoded.
- Tidak ada backend/server-side, semua fitur berjalan di sisi klien.
- Website ini cocok untuk demo, portofolio, atau presentasi produk fintech.

