# AI Learn

Web belajar AI dengan warna khas **cyan #38E1FF** — gabungan gaya **Cyberpunk × Ghibli × Bento UI × Minimalist AI UI × Neo-Brutalism ringan**.
Murni frontend statis (**HTML + CSS + vanilla JS**), tanpa framework, tanpa build step.

## Cara Menjalankan

Buka langsung `index.html` di browser, atau:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

## Struktur

```
005.OC_002_Project_AI_Learning_Web/
├── index.html      # semua halaman (SPA sederhana)
├── css/styles.css  # tema + komponen bento
└── js/app.js       # router, toast, catatan & pengaturan (localStorage)
```

## Halaman

| Halaman     | Isi                                                                      |
|-------------|--------------------------------------------------------------------------|
| Beranda     | Hero ilustrasi senja, bento: lanjutan belajar, playground, progress, dsb. |
| Kelas       | Katalog 6 kelas + filter level (Pemula/Menengah/Lanjutan)                 |
| Jelajah AI  | 6 materi mikro pembuka wawasan AI                                         |
| Komunitas   | Composer + feed postingan (bisa posting & like), statistik + event        |
| Tantangan   | Kartu tantangan harian/mingguan/bulanan + XP                              |
| Achievement | Strip statistik + koleksi lencana (terbuka & terkunci)                    |
| Catatan     | CRUD catatan lokal (simpan/hapus, persist via localStorage)               |
| Pengaturan  | Profil, bahasa, toggle preferensi (mode kompak & suara berfungsi)         |

---

## Prompt Log (ditambah setiap push — 1 prompt ringkas per push)

### Prompt 01 — Desain & fondasi frontend

> Buatkan saya web AI Learning bernama **AI Learn** dengan warna unik biru cyan **#38E1FF**, memadukan konsep Cyberpunk + Ghibli + Bento UI + Minimalist AI UI + Neo-Brutalism ringan, mengikuti layout referensi mockup yang saya berikan (sidebar nav, topbar pencarian, hero ilustrasi kota senja, dan grid bento). Kerjakan frontendnya dulu saja dengan ilustrasi SVG buatan sendiri, kemudian simpan hasilnya di `Documents/AI/Open_Code/` dan push ke repo GitHub `005.OC_002_Project_AI_Learning_Web`.

### Prompt 02 — Penyempurna UI + isi semua halaman

> Tombol X di atas logo (sidebar) dianggap tidak berguna — hapus saja, tutup sidebar cukup lewat overlay atau tombol Esc. Semua teks Jepang diganti bahasa Inggris. Lalu mulai mengisi **konten nyata di semua halaman nav** (Kelas, Jelajah AI, Komunitas, Tantangan, Achievement, Catatan, Pengaturan — dibuat sebagai router SPA dengan interaksi yang berfungsi). Terakhir, masukkan prompt-prompt saya sebelumnya ke README dengan ringkasan enak dibaca — **satu prompt terkonsolidasi per push** — jadi sekarang harusnya sudah ada **2 prompt**.

### Prompt 03 — Klik yang aranya bermakna

> Saat klik apa saja yang muncul hanya toast "sebentar lagi, ya!" — terlalu sering dan terasa tidak berguna. Ganti polanya: tombol-tombol yang arahnya jelas sebaiknya **mengantar langsung ke halaman terkait** (Mulai Belajar → Kelas, Gabung Komunitas → Komunitas, Lihat Semua → Achievement, dsb.), dan untuk yang belum ada halamannya cukup pesan singkat sesuai konteks — bukan spam pesan yang sama di mana-mana.

### Prompt 04 — Isi materi sebenarnya

> Materi di dalam kelas/artikel/quiz masih kosong (klik tombolnya hanya menampilkan "segera hadir"). Isi ketiganya berurutan: **(1) Materi kelas** — halaman detail kelas + isi 21 modul (pembahasan, poin penting, contoh), per modul bisa ditandai selesai dan progresnya menyambung ke Beranda & kartu kelas; **(2) Artikel Jelajah AI** — halaman baca penuh untuk 6 artikel; **(3) Quiz Tantangan** — 5 soal interaktif dengan feedback per jawaban, skor akhir, XP, dan skor terbaik yang tersimpan. Semuanya dibangun di atas data konten tersendiri (`content.js`) supaya rapi untuk dikembangkan.

### Prompt 05 — Lengkapi tantangan, XP, dan pencarian (+ bugfix)

> Lanjut merilis sisanya berurutan: **(1) Tantangan Mingguan** — 3 prompt dikumpulkan lewat form, tersimpan, kartu ikut ter-update; **(2) Tantangan Bulanan** — 4 tahap checklist mini-project chatbot; **(3) XP agregat** — XP modul, quiz, mingguan, dan bulanan dijumlahkan di satu rumus dan tampil di Tantangan & Achievement; **(4) Pencarian sungguhan** — ketik di topbar → muncul hasil kelas/artikel/modul, Enter membuka hasil teratas. Sisipannya: saat pengecekan, tombol "Lanjut/Mulai" di halaman Kelas ternyata mati (atribut handler hilang karena bug skrip penomoran) — atribut `data-cls` dipulihkan supaya tombolnya kembali berfungsi.

---

*Dibuat bersama OpenCode · Z.ai GLM*
