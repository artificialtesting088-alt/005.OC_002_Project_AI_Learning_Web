const CONTENT = {
  classes: [
    {
      id: 'kenalan-ai',
      title: 'Kenalan dengan AI di Sekitarmu',
      level: 'Pemula',
      thumb: 't-cyan',
      desc: 'Kenali AI yang sudah ada di hidupmu sehari-hari, lalu bedakan AI, ML, dan LLM.',
      parts: [
        {
          t: 'Apa Itu AI, Sebenarnya?',
          m: '8 mnt',
          body: [
            'Sederhananya, AI (kecerdasan buatan) adalah program komputer yang dirancang melakukan pekerjaan yang biasanya membutuhkan "akal" manusia: mengenali wajah, memahami kalimat, menghasilkan teks, atau mengambil keputusan. AI bukan robot berkesadaran — ia sistem matematis yang sangat andal menemukan pola.',
            'AI modern biasanya berbentuk model: ribuan hingga triliunan parameter yang "dilatih" dari data besar. Model tidak memakai aturan yang ditulis satu per satu; ia menyetel parameternya sendiri sampai keluarannya mendekati contoh yang diberikan.'
          ],
          points: [
            'AI = sistem yang meniru kemampuan tertentu: klasifikasi, prediksi, pembuatan konten.',
            'AI bekerja dari pola data, bukan pemahaman layaknya manusia.',
            'AI bisa salah dengan sangat percaya diri — selalu verifikasi hasil yang penting.'
          ],
          ex: { label: 'Cermin Cepat', code: 'Sistem secanggih apa pun hanya sebaik data yang dipelajarinya.' }
        },
        {
          t: 'AI yang Sudah Ada di Sekitarmu',
          m: '9 mnt',
          body: [
            'Kamu mungkin sudah bertemu AI sejak bangun tidur: rekomendasi video di ponsel, filter spam di email, koreksi ejaan di keyboard, hingga jalur tercepat di aplikasi peta. Semuanya bukan sulap — hanya sistem yang mengenali pola dari jutaan contoh.',
            'Cobalah mencatat tiga fitur aplikasi yang kamu pakai hari ini dan menebak pola apa yang dipelajarinya. Latihan kecil ini melatihmu berpikir seperti perancang AI: membedakan fitur biasa vs fitur prediktif.'
          ],
          points: [
            'Rekomendasi konten = AI yang menebak selera.',
            'Kamera ponsel: AI memperjelas cahaya dan fokus.',
            'Peta memperkirakan lalu lintas: AI prediksi waktu tempuh.'
          ],
          ex: { label: 'Tugas Kecil', code: 'Sebutkan tiga fitur di ponselmu yang kemungkinan bekerja dengan AI — lalu tebak pola yang dipelajari masing-masing.' }
        },
        {
          t: 'Membedakan AI, ML, dan LLM',
          m: '10 mnt',
          body: [
            'AI adalah payung besar. Di dalamnya ada machine learning (ML) — pendekatan di mana mesin belajar dari data, bukan diatur aturan klasik. Di dalam ML, lagi, ada deep learning yang memakai jaringan saraf berlapis.',
            'LLM (large language model) adalah deep learning khusus bahasa: dilatih menebak kata berikutnya lewat miliaran contoh teks. Chatbot modern, asisten tulisan, sampai code assistant memakai LLM di baliknya.'
          ],
          points: [
            'AI ⊃ ML ⊃ Deep Learning: bertingkat dari luas ke spesifik.',
            'LLM = model bahasa skala besar; paham konteks obrolan.',
            'Tes cepat: kalau sistem belajar dari data, ia gunakan ML.'
          ],
          ex: { label: 'Tabel Pikir', code: 'Filter spam email = ML · Rekomendasi film = ML · Chat AI = LLM · AC dengan timer sederhana = aturan klasik (bukan ML).' }
        },
        {
          t: 'Cara AI Belajar dan Bekerja',
          m: '10 mnt',
          body: [
            'Proses pelatihannya seperti menyetel radio tua: model menebak hasil atas contoh, lalu dihitung seberapa jauh miskinnya (loss), dan parameter disetel sedikit demi sedikit — diulang miliaran kali. Keseluruhan ini disebut training.',
            'Setelah selesai dilatih, model dipakai pada fase inferensi: hanya menebak, tanpa belajar lagi dari percakapanmu. Itulah kenapa AI terlihat sangat pintar di topik lama, tapi buta pada hal yang baru muncul kemarin.'
          ],
          points: [
            'Training = menyetel parameter supaya kesalahan menyusut.',
            'Inferensi = memakai model siap pakai; tidak belajar saat chat.',
            'AI lemah di topik yang data latihannya tipis.'
          ],
          ex: { label: 'Analogi', code: 'Belajar dari soal-soal lama (training) → ujian hari ini (inference): masih sulit jika tipe soal benar-benar baru.' }
        },
        {
          t: 'Etika Pemula: Data, Privasi, dan Batas',
          m: '8 mnt',
          body: [
            'AI belajar dari data manusia, jadi bias manusia bisa ikut terbawa. Contoh: sistem penilaian pelamar bisa janggal pada gender tertentu karena data historis berat sebelah. Kebiasaan sehat: selalu tanyakan di mana data asal, dan siapa yang mungkin ter-diskriminasi.',
            'Kedua: jangan tumpahkan data sensitif ke tool AI publik. Ketiga: gunakan AI sebagai perantara, bukan penentu — ia draf, kau yang memutuskan akhir.'
          ],
          points: [
            'Bias data = bias keluaran. Periksa sumbernya.',
            'Privasi: data pribadi tidak untuk asal lempar ke tool publik.',
            'Manusia tetap penanggung jawab keputusan akhir.'
          ]
        }
      ]
    },
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering untuk Pemula',
      level: 'Pemula',
      thumb: 't-violet',
      desc: 'Ubah pertanyaan biasa jadi prompt yang tajam: peran, konteks, format, batasan.',
      parts: [
        {
          t: 'Anatomi Prompt yang Tajam',
          m: '9 mnt',
          body: [
            'Yang paling membedakan hasil AI adalah prompt yang kamu pakai. Prompt yang baik biasanya berisi empat bagian: peran (kamu meminta AI berperan sebagai apa), tugas (apa yang dibuat), konteks (bahan dan situasi), dan format (bentuk jawaban). Melengkapi keempatnya memangkas coba-coba lebih dari separuh.',
            'Prompt juga bahasa: gaya formal atau santai memengaruhi nada jawaban. Pilih satu gaya per prompt supaya hasilnya seragam.'
          ],
          points: [
            'Peran memberi "suara": "Kamu mentor matematika…".',
            'Konteks menambatkan jawaban ke duniamu.',
            'Format memangkas oleh-oleh: "dalam tabel tiga kolom".'
          ],
          ex: { label: 'Retek Prompt', code: 'Kamu mentor belajar senior. Bantu aku menyusun jadwal [Peran+Tugas]. Aku bekerja, waktu luang malam [Konteks]. Tabel 5 hari × 3 blok [Format].' }
        },
        {
          t: 'Peran & Konteks: Bahan Bakar Jawaban',
          m: '10 mnt',
          body: [
            'Peran menggeser kosakata yang diprioritaskan model. "Penulis jurnal teknis" memakai istilah formal; "teman kedai kopi" membuat jawaban ringan. Satu kalimat peran, efek besar.',
            'Konteks menangkap skenariomu: siapa audiens, apa tujuan, apa kendalanya. AI bukan pembaca pikiran — tapi pembaca konteks yang andal.'
          ],
          points: [
            'Beda peran, beda hasil: "guru SD" ≠ "konsultan industri".',
            'Konteks minimal: audiens + tujuan + kendala.',
            'Konflik prioritas? Sebutkan urutannya secara eksplisit.'
          ],
          ex: { label: 'Sebelum → Sesudah', code: 'Sebelum: "Ringkas artikel ini." → Sesudah: "Ringkas gaya heading, maksimal 80 kata, audiens mahasiswa semester 1."' }
        },
        {
          t: 'Format & Batasan: Mengunci Output',
          m: '9 mnt',
          body: [
            'Sebut format sejak awal: bullet, tabel, langkah bernomor, panjang maksimal. Model mengikuti bentuk yang eksplisit jauh lebih setia daripada yang kita harapkan sendiri.',
            'Batasan juga pasak: "tanpa jargon teknis", "hanya 3 opsi", "akhiri dengan pertanyaan kepada saya". Batas kecil yang jelas menghasilkan output yang bisa dipakai.'
          ],
          points: [
            'Format ditegaskan dulu, bukan diminta ulang.',
            'Batasan menghemat panjang dan fokus jawaban.',
            'Tanyakan "apa yang harus ada di jawaban" — bukan hanya isinya.'
          ],
          ex: { label: 'Pola Batasan', code: '… Maksimal 120 kata. Tanpa jargon teknis. Mulai dari poin "Bisa Coba:".' }
        },
        {
          t: 'Iterasi: Prompt Adalah Percakapan',
          m: '10 mnt',
          body: [
            'Prompt pro tidak sekaligus jadi. Mereka mengiterasi: minta draf pertama, pilih bagian yang kurang, lalu tinjauan kecil satu per satu — "perpendek paragraf 2", "tambah contoh lokal", "ubah nada jadi lebih hangat".',
            'Bangun kebiasaan mencatat: jenis prompt apa yang sering bekerja di kerjamu. Lama-lama kamu punya perpustakaan prompt pribadi siap pakai.'
          ],
          points: [
            'Dua-tiga iterasi kecil biasanya menghasilkan lompatan kualitas.',
            'Sebut yang kurang: nada, panjang, audiens, struktur.',
            'Simpan resep: prompt terbaikmu perpustakaan pribadi.'
          ],
          ex: { label: 'Rantai Iterasi', code: '1) Draf 2) "Perpendek, tambah 3 contoh" 3) "Untuk audiens manajer, ubah nada jadi formal."' }
        }
      ]
    },
    {
      id: 'ai-produktivitas',
      title: 'AI untuk Produktivitas Harian',
      level: 'Pemula',
      thumb: 't-gold',
      desc: 'Rapikan jadwal, rangkum dokumen, dan otomatiskan tugas berulang.',
      parts: [
        {
          t: 'Mengelola Tugas dengan AI',
          m: '9 mnt',
          body: [
            'Lempar daftar tugas berantakan ke dalam model dan minta dikelompokkan: mana mendesak, mana bisa digeser, mana yang sebetulnya bisa dibatalkan. AI kegunaaan di pekerjaan penyusunan, bukan keputusan prioritas final — itu tetap hakmu.',
            'Pecah tugas besar jadi blok kecil 25 menit yang bisa dimulai hari itu juga. Prompt genialnya: "Buat jadwal 7 hari: 2–3 tugas per hari, tiap tugas ≤ 25 menit."'
          ],
          points: [
            'Hancurkan tugas besar jadi blok yang bisa dimulai segera.',
            'AI menyusun opsi; kamu yang memilih prioritas.',
            'Tinjau sekali sehari biar rencana tetap masuk akal.'
          ],
          ex: { label: 'Template Jadwal', code: '"Ubah daftar ini jadi jadwal 5 hari, tiap hari maksimal 4 blok × 25 menit, mulai 08.00."' }
        },
        {
          t: 'Merangkum Dokumen Panjang',
          m: '10 mnt',
          body: [
            'LLM andal sebagai "pembaca pertama": serahkan dokumen 40 halaman, minta inti per bagian. Tapi jangan lupa: AI merangkum apa yang tertulis, bukan apa yang tersirat — nuansa dan angka penting tetap milikmu untuk dicek.',
            'Cobalah dua putaran: putaran pertama tangkap kerangka besar; putaran kedua tekan detail tertentu (angka, argumen, keputusan) yang relevan dengan pekerjaanmu.'
          ],
          points: [
            'Rangkum per bagian, agar tidak terpotong sembarangan.',
            'Minta "5 poin paling penentu" untuk melihat 10% inti.',
            'Fakta kunci tetap dibaca ulang di dokumen asli.'
          ],
          ex: { label: 'Prompt Rangkum', code: '"Bagi naskah ini ke 5 bagian: (1) masalah, (2) data, (3) keputusan, (4) risiko, (5) langkah berikutnya — masing-masing 2 kalimat."' }
        },
        {
          t: 'Otomasi Ringan untuk Rutinitas',
          m: '10 mnt',
          body: [
            'Tidak semua otomasi butuh program. Banyak selesai dengan "template + AI": surat standar, email tindak lanjut, deskripsi produk — tinggal isi variabelnya.',
            'Langkah praktisnya: catat tugas yang kamu ulang lebih dari dua kali seminggu, pilih yang paling sering, bangun template-nya sekali, lalu pakai paketnya berminggu-minggu.'
          ],
          points: [
            'Cadangkan rutinitas = energi bebas untuk kerja bermakna.',
            'Template + AI memangkas 30 menit jadi 5 menit.',
            'Uji di catatan kecil dulu sebelum dipakai resmi.'
          ],
          ex: { label: 'Rumus Template', code: '[Peran], sedang [situasi], butuh [hasil], nada penyampaian [X], maksimal [N] kalimat.' }
        }
      ]
    },
    {
      id: 'konten-ai',
      title: 'Membuat Konten dengan AI',
      level: 'Menengah',
      thumb: 't-cyan',
      desc: 'Riset, draf, dan visual: alur kerja konten yang tetap terasa kamu yang punya.',
      parts: [
        {
          t: 'Riset Ide dengan Bantuan AI',
          m: '9 mnt',
          body: [
            'AI paling berharga di fase riset: minta 20 sudut pandang untuk topikmu, lalu kurasi 3 yang paling segar. Kamu tetap filter — mayoritas ide AI generik; tugas membedakan itu penting dan sehat.',
            'Dua pertanyaan riset yang sering membuahkan bait: "apa mitos umum soal topik ini?" dan "pertanyaan apa yang pemula malu bertanya?" — keduanya pintu masuk konten yang dekat dengan pembaca.'
          ],
          points: [
            'Daftar dulu, kurasi kemudian: AI menghasilkan, kamu memilih.',
            'Mitos + pertanyaan pemula = calon judul kuat.',
            'Fakta yang dikutip tetap dicek ke sumber.'
          ],
          ex: { label: 'Prompt Riset', code: '"Berikan 15 sudut pandang video tentang AI untuk pekerja kreatif; kelompokkan per pemula/menengah, tandai yang paling tidak biasa."' }
        },
        {
          t: 'Draf Cepat yang Sedap Dibaca',
          m: '10 mnt',
          body: [
            'Gunakan AI untuk membangun kerangka: judul, 3 poin utama, kalimat pembuka. Lalu isi dengan suaramu — di sini bedanya terasa. Kombinasi "kerangka AI + isi manusia" paling sering terasa hidup.',
            'Aturan sehat: jangan janjikan sesuatu yang tak kamu pahami. AI asisten draf, bukan ghostwriter total; pengalaman dan opini tetap berasal darimu.'
          ],
          points: [
            'Kerangka dulu, isi kemudian — jangan menulis tanpa arah.',
            'Intro & penutup paling kuat kalau tulisanmu sendiri.',
            'Tes baca nyaring: kalimat yang tidak enak dibaca = perlu dirapikan.'
          ],
          ex: { label: 'Kerangka Post', code: '"Outline artikel 600 kata: hook yang relatable, 3 bagian (masalah, cara, kesalahan umum), penutup ajakan kecil."' }
        },
        {
          t: 'Visual & Editing Kecil',
          m: '9 mnt',
          body: [
            'Tool gambar AI cocok untuk ilustrasi suasana atau thumbnail cepat, tapi tetap butuh rasa desain: kontras, ruang kosong, hierarki teks. Pelajari komposisi dasar dan palet dua warna dulu.',
            'Untuk teks, jadikan AI "editor keenam mata": minta tandai kalimat yang mengambang, jargon yang bisa dihapus, dan paragraf yang lebih baik jadi bullet.'
          ],
          points: [
            'Thumbnail: satu subjek besar + maksimal 3 kata.',
            'Minta AI mendaftar kalimat terbingung; pilih sebagian lakukan.',
            'Konsistensi visual dari template, bukan desain baru tiap konten.'
          ],
          ex: { label: 'Prompt Editor', code: '"Sebagai editor berita: tandai kalimat kaku dan kata yang bisa dihapus di tulisan ini. Jangan menulis ulang semuanya."' }
        }
      ]
    },
    {
      id: 'ml-dasar',
      title: 'Dasar Machine Learning',
      level: 'Menengah',
      thumb: 't-violet',
      desc: 'Dari regresi sederhana sampai makna jaringan saraf — tanpa rumus yang bikin pusing dulu.',
      parts: [
        {
          t: 'Data, Label, dan Contoh Belajar',
          m: '10 mnt',
          body: [
            'ML dimulai dari pasangan contoh: input dan label. Model prediksi harga rumah belajar dari luas → harga; model deteksi spam belajar dari teks email → spam/bukan. Data di adanya guru; data buruk menghasilkan model buruk.',
            'Satu kebiasaan penting sejak awal: sisakan sebagian data yang tidak pernah dipakai latihan (test set), lalu uji model di sana — ukuran kejujuran seberapa jauh model bekerja pada situasi baru.'
          ],
          points: [
            'Input + label = bumbu belajar model.',
            'Train/test split: uji di data yang belum pernah dilihat.',
            'Data tidak seimbang = model menyombongkan kelas dominan.'
          ],
          ex: { label: 'Bank Contoh', code: 'Email → spam/bukan · Foto → kucing/bukan · Review teks → sentimen 1–5 · Rumah → harga (angka).' }
        },
        {
          t: 'Regresi & Klasifikasi',
          m: '10 mnt',
          body: [
            'Dua pekerjaan paling umum: regresi, memprediksi angka kontinu (harga, suhu); klasifikasi, memilih kategori (spam/bukan, kelas korban). Mesinnya mirip: menebak, menghitung salah, memperbaiki diri.',
            'Cara menilai beda: regresi dinilai jarak rata-rata (MAE), klasifikasi dinilai presisi/recall. Pahami metrikmu sebelum berat masuk melihat satu angka.'
          ],
          points: [
            'Regresi = memprediksi angka; klasifikasi = memilih kelas.',
            'Akurasi 95% tidak berarti apa-apa bila datanya 95% satu kelas.',
            'Model sederhana yang jujur lebih baik daripada yang kompleks tapi overfit.'
          ],
          ex: { label: 'Mainkan Pikircud', code: 'Prediksi harga cabai minggu depan → regresi · Deteksi transaksi penipuan → klasifikasi · Menyusun daftar lagu → ranking.' }
        },
        {
          t: 'Jaringan Saraf dalam 5 Menit',
          m: '10 mnt',
          body: [
            'Jaringan saraf adalah banyak "penentu kecil" yang disusun berlapis: lapisan awal mendeteksi pola sederhana (garis, warna), lapisan yang dalam menggabungkan pola jadi konsep besar (mata, roda, wajah).',
            'Deep learning unggul di data besar dan data tak terstruktur (gambar, suara, teks). Untuk tabel kecil, model berbasis pohon kadang lebih praktis — sesuaikan alat dengan masalahnya, bukan kebanggaan.'
          ],
          points: [
            'Lapisan awal = pola kecil; lapisan dalam = konsep gabungan.',
            'Data besar + GPU = rumahnya deep learning.',
            'Tidak semua masalah membutuhkan neural network.'
          ]
        },
        {
          t: 'Batas ML: Overfitting & Generalisasi',
          m: '9 mnt',
          body: [
            'Model bisa terlalu hafal data latih — tampak sempurna saat latihan, kandas saat dipakai di dunia nyata. Fenomena ini disebut overfitting; obatnya: data lebih banyak, model lebih sederhana, atau regularisasi.',
            'Tujuan akhir model bukan skor di data latih, tapi kemampuan menyerap situasi baru (generalisasi). Pegangan sederhana: uji di data yang pernah memhiat, bandingkan rekan model, dan jangan terlalu mengandalkan satu metrik.'
          ],
          points: [
            'Overfitting = hafalan; generalisasi = pemahaman.',
            'Sisi kejujuran: skor harus revisiting di test set.',
            'Model terbaik adalah yang bisa dipercaya di situasi nyata.'
          ]
        }
      ]
    },
    {
      id: 'chatbot',
      title: 'Bangun Chatbot Sederhana',
      level: 'Lanjutan',
      thumb: 't-rose',
      desc: 'Rakit asistenmu sendiri: sengaja kecil, tapi benar-benar jalan di web.',
      parts: [
        {
          t: 'Arsitektur Chatbot Mini',
          m: '11 mnt',
          body: [
            'Chatbot kecil punya tiga bagian: UI (kotak chat di web), mesin (logika menjawab), dan memori (riwayat obrolan). Mesin bisa sederhana (aturan kata kunci) atau cerdas (memanggil LLM) — mulai dari yang paling kecil yang bisa jalan.',
            'Bagi cakupannya dulu: bot yang menjawab tiga hal dengan sangat baik lebih berguna daripada bot yang mencoba menjawab lima puluh hal dengan biasa-biasa.'
          ],
          points: [
            'UI + Mesin + Memori: komponen minimum.',
            'Definisikan 3 kasus yang botnya harus tangani dengan sempurna.',
            'Rancang jalur "saya belum paham" yang ramah.'
          ],
          ex: { label: 'Cuplikan Logika', code: 'if (msg.includes("jadwal")) answer(scheduleInfo); else fallback("Belum paham, coba kata lain?")' }
        },
        {
          t: 'Menghubungkan Mesin ke LLM',
          m: '12 mnt',
          body: [
            'Untuk jawaban bebas, chatbotmu memanggil API LLM: kirim prompt + riwayat, terima teks balikan. Kunci keamanannya satu: API key tersimpan di server — jangan pernah menaruhnya di kode frontend.',
            'Kepribadian bot diatur oleh system prompt: "kamu asisten X, jawab ringkas, jika tak yakin katakan tidak tahu". Temperature rendah untuk jawaban konsisten, tinggi untuk kreatif.'
          ],
          points: [
            'API key di server, selalu — jangan ekspos ke browser.',
            'System prompt = kepribadian dan kebijakan botmu.',
            'Riwayat ringkas menjaga biaya dan kecepatan.'
          ],
          ex: { label: 'Pola Panggilan', code: 'POST /api/chat { "messages": [system, user1, bot1, user2] } → { "reply": "…" }' }
        },
        {
          t: 'Memori & Konteks Percakapan',
          m: '10 mnt',
          body: [
            'LLM tidak ingat apa pun antar pesan — karenanya kita memasukkan riwayat ke setiap request. Namun riwayat membengkak: ringkas percakapan lama atau potong bagian paling awal bila sudah terlalu panjang.',
            'Fakta yang harus diingat lama (nama, preferensi, proyek aktif) sebaiknya disimpan di database, lalu dimasukkan semestinya ke prompt — bukan diandalkan pada teks percakapan.'
          ],
          points: [
            'Riwayat = ingatan temporary; database = ingatan permanen.',
            'Ringkas riwayat lama saat konteks mulai penuh.',
            'Sertakan fakta penting sebagai data terstruktur.'
          ]
        }
      ]
    }
  ],

  articles: [
    {
      id: 'apa-itu-ai',
      title: 'Apa Itu AI?',
      tag: '5 menit baca',
      hero: 'Peta besar: AI, machine learning, dan LLM — dalam bahasa manusia.',
      secs: [
        {
          h: 'Tiga Lapis yang Sering Tercampur',
          p: [
            'Ketika orang berkata "AI", yang mereka maksud sering tumpang-tindih: AI (kecerdasan buatan) sebagai bidang besar; machine learning (ML) sebagai pendekatan yang mendominasi hari ini; dan deep learning sebagai bagian ML yang memakai jaringan saraf berlapis.',
            'Analogi: AI adalah "kendaraan", ML "mesin pembakaran", deep learning "mesin turbo modern". Tidak semua kendaraan pakai bensin — demikian pula tidak semua AI pakai ML.'
          ]
        },
        {
          h: 'Kenapa Semuanya Melaju Sekarang?',
          p: [
            'Tiga hal terjadi bersamaan sejak 2012: data melimpah dari internet, komputasi yang jadi murah (GPU), dan arsitektur jaringan saraf yang makin mampu. Kumpulan itu membuat model mampu apa yang mungkin dulu: mengenali citra, memahami suara, menghasilkan teks.',
            'LLM (large language model) adalah puncak sukses pendekatan ini: dilatih menebak kata berikutnya atas halaman internet, ia menyerap tata bahasa, fakta, dan pola logika — lalu menjadi mesin di balik chatbot dan tool produktivitas yang kamu pakai sekarang.'
          ]
        },
        {
          h: 'Apa yang AI TIDAK Bisa',
          p: [
            'AI tidak punya pengalaman hidup, tidak mengetahui konteks di luar data latihnya, dan bisa mengarang (halusinasi) dengan percaya diri. Ia tidak belajar dari obrolanmu: setelah sesi berakhir, ingatannya hilang.',
            'Sikap yang sehat: AI adalah mesin pola yang sangat cepat. Kamu tetap pemilik niat, rasa, dan tanggung jawab. Gunakan untuk draf, ide, dan kecepatan — serahkan keputusan penting kepada manusia.'
          ]
        }
      ],
      points: [
        'AI ⊃ ML ⊃ Deep Learning ⊃ LLM: dari umum ke spesifik.',
        'Kombobulasi data + komputasi + arsitektur melahirkan gelombang ini.',
        'AI = mesin pola; manusia = pemilik niat dan keputusan.'
      ]
    },
    {
      id: 'cara-kerja-llm',
      title: 'Cara Kerja LLM',
      tag: '7 menit baca',
      hero: 'Menebak kata berikutnya, miliaran kali — kenapa itu terdengar pintar.',
      secs: [
        {
          h: 'Inti Sederhana: Tebak Kata Berikutnya',
          p: [
            'LLM dilatih dengan satu permainan: sembunyikan kata berikutnya dalam kalimat, minta model menebak. Kalau salah, parameter sedikit disetel; diulang miliaran kali. Dari permainan yang terlihat "sederhana" lahir kemampuan menjawab pertanyaan, meringkas, hingga menulis kode.',
            'Kenapa bisa? Menebak kata di "Dokter menulis resep di…" memaksa model memahami dokter, resep, dan tempatnya. Menebak dengan baik berarti memodelkan dunia.'
          ]
        },
        {
          h: 'Token, Konteks, dan Temperature',
          p: [
            'Model tidak melihat huruf, melainkan token: potongan kata. Jendela konteks adalah jumlah token maksimum yang terlihat sekali duduk — semacam ingatan kerja. Apa pun di dalam jendela, ia tahu; di luar jendela, ia tak tahu.',
            'Temperature mengatur keberanian menebak: rendah (0–0.3) untuk fakta dan kode, tinggi (0.8–1) untuk ide kreatif. Setelan, bukan sihir.'
          ]
        },
        {
          h: 'Kenapa AI Bisa Mengarang',
          p: [
            'Karena ia menebak pola, bukan mencari fakta di database. Ketika data latih tipis di suatu topik, model melanjutkan pola dengan sesuatu yang "mirip" — hasilnya kalimat rapi namun salah. Itulah hallucination.',
            'Penangkalnya berlapis: minta AI menyebut sumber, verifikasi fakta kunci secara manual, dan pecah pekerjaan berat jadi langkah kecil yang bisa dicek satu per satu.'
          ]
        }
      ],
      points: [
        'Latihan menebak kata + data raksasa = kemampuan bahasa.',
        'Token & jendela konteks = ingatan kerja model.',
        'Halusinasi bisa muncul; verifikasi tetap wajib.'
      ]
    },
    {
      id: 'resep-prompt',
      title: 'Resep Prompt',
      tag: '6 menit baca',
      hero: 'Peran, konteks, format, batasan — empat sahabat prompt yang baik.',
      secs: [
        {
          h: 'Empat Bahan dan Urutannya',
          p: [
            'Peran dulu: kamu meminta pada AI siapa ia saat menjawab (guru, editor, konsultan). Kemudian konteks: bahanmu (audiens, tujuan, kendala). Lalu tugas: apa yang dihasilkan. Terakhir format: bagaimana bentuknya (tabel, bullet, 100 kata).',
            'Urutan berpengaruh: bagian yang diakhiri lebih menempel pada "ingatan terakhir" model. Tulis sekali dengan struktur: Peran → Konteks → Tugas → Format.'
          ]
        },
        {
          h: 'Beri Contoh (Few-Shot)',
          p: [
            'Cara tercepat mendapatkan gaya yang kamu mau: berikan 1–3 contoh jawaban ideal, lalu minta model meniru polanya. Ini few-shot prompting — model sangat kuat dalam pencocokan pola.',
            'Bahkan satu contoh ("tulis seperti ini: …") mengubah nada hasil secara drastis. Contoh negatif juga boleh: "jangan seperti ini: …"'
          ]
        },
        {
          h: 'Iterasi > Sempurna Prediksi Pertama',
          p: [
            'Pemegang prompt profesional tidak menulis prompt sakti sekali jadi. Mereka minta draf, komentari satu hal, minta ulang — tiga mengulang kecil mengalahkan venir gelap yang panjang.',
            'Langkah terakhir yang sering dilupakan: simpan prompt yang berhasil. Perpustakaan pribadimu lebih berharga daripada tool apa pun.'
          ]
        }
      ],
      points: [
        'Urutan baku: Peran → Konteks → Tugas → Format.',
        '1–3 contoh (few-shot) menyetel gaya dengan cepat.',
        'Iterasi kecil sebanyak tiga kali > prompt sempurna yang tak terjadi.'
      ]
    },
    {
      id: 'etika-bias',
      title: 'Etika & Bias AI',
      tag: '8 menit baca',
      hero: 'AI belajar dari manusia — termasuk kesalahannya. Apa yang bisa dibenahi?',
      secs: [
        {
          h: 'Dari Mana Bias Datang',
          p: [
            'Model tidak membenci siapa pun — ia mengulangi pola datanya. Jika data historis rekrutmen condong ke satu kelompok, model belajar pola itu sebagai "normal". Bias masuk lewat tiga pintu: data berat sebelah, label buatan manusia yang bias, dan definisi target yang keliru.',
            'Contoh: sistem prediksi kelulusan yang menilai rendah mahasiswa dari daerah dengan infrastruktur terbatas — karena data latihnya dari kampus elite. Modelnya rapi, kesimpulannya tidak adil.'
          ]
        },
        {
          h: 'Siapa Mungkin Tersakiti',
          p: [
            'Pertanyaan etika minimum sebelum meluncurkan sistem: siapa yang paling berisiko dari salahnya? Berapa banyak kesalahan yang bisa ditoleransi? Adakah jalur banding oleh manusia?',
            'Dampaknya tidak setara: galat rekomendasi film merugikan sedikit; galat penilaian kelayakan kredit bisa mengubah hidup. Semakin besar dampaknya, semakin wajib manusia di lingkaran keputusan.'
          ]
        },
        {
          h: 'Kebiasaan Praktis untuk Pemula',
          p: [
            'Tiga kebiasaan: (1) selalu tanya data dari siapa model dilatih; (2) uji dengan kasus tepi, bukan hanya kasus rata-rata; (3) sediakan jalur banding manusia.',
            'Satu gagasan besar: AI memperbesar niat kita. Jika niatnya melindungi, skalanya melindungi; jika niatnya menindas, AI mempercepat penindasan. Tanggung jawab tetap di tangan pengguna.'
          ]
        }
      ],
      points: [
        'Bias masuk lewat data, label, dan definisi target.',
        'Uji dengan kasus tepi, bukan kasus rata-rata.',
        'Dampak besar → manusia wajib di lingkaran keputusan.'
      ]
    },
    {
      id: 'peta-tools',
      title: 'Peta Tools AI',
      tag: 'Direfresh tiap bulan',
      hero: 'Chat, gambar, kode, suara: apa yang pas untuk kebutuhanmu hari ini.',
      secs: [
        {
          h: 'Kategori-Kategori Besar',
          p: [
            'Chat & asisten (bertanya, meringkas, menulis), gambar (ilustrasi, mockup, thumbnail), kode (autocomplete, perbaikan bug, review), suara (transkripsi, text-to-speech), video (subtitel, edit otomatis), dan data (analisis angka). Setiap kategori punya pemimpin — dan pemimpin bisa berganti antar bulan.',
            'Lebih penting daripada nama tool: pahami pola kerjanya (prompt → hasil → iterasi). Kebiasaan itu yang bikin berpindah tool tetap lancar.'
          ]
        },
        {
          h: 'Cara Memilih Tanpa Terjebak Hype',
          p: [
            'Tiga pertanyaan: (1) Di tugas apa kamu paling sering terhambat? Mulailah dari sana. (2) Apa batasnya — kuota, privasi, jendela konteks? (3) Bolehkah data sensitif masuk ke sana? Untuk pekerjaan tim, cek kebijakan data dulu, bukan hanya daftar fitur.',
            'Aturan 80/20: satu tool chat + satu tool gambar sudah menjawab 80% kebutuhan belajar sehari-hari. Jumlah tool tidak menolong bila kebiasaanannya tidak terbangun.'
          ]
        }
      ],
      points: [
        'Mulai dari tugas yang paling sering menghambatmu.',
        'Kebijakan data > daftar fitur untuk pekerjaan sensitif.',
        'Satu tool yang dipakai rutin mengalahkan belasan tool yang dikejar.'
      ]
    },
    {
      id: 'karier-era-ai',
      title: 'Karier di Era AI',
      tag: '10 menit baca',
      hero: 'Skill yang makin berharga, dan cara membangunnya mulai malam ini.',
      secs: [
        {
          h: 'Yang Bergeser dan Yang Melekat',
          p: [
            'Tugas yang melekat adalah yang AI tidak bisa: menentukan masalah mana yang layak dikerjakan, bernegosiasi dengan orang, menyatukan konteks lintas tim, dan menanggung keputusan. Yang bergeser: transkripsi, merapikan data, draf pertama, pekerjaan berulang formal.',
            'Tapak praktisnya: jangan bermimpian jadi "operator prompt". Posisikan diri sebagai orang yang punya pekerjaan nyata, dan AI sebagai tim kecil pribadimu.'
          ]
        },
        {
          h: 'Tumpukan Skill Saat Ini',
          p: [
            'Pondasi: pandai menulis dan berargumentasi — prompt dan review sama-sama pekerjaan bahasa. Lapis kedua: literasi AI (apa yang mampu, apa yang halu). Lapis ketiga: kedalaman domainmu — guru memahami pedagogi, analis memahami konteks bisnisnya.',
            'Paket yang diminta pasar: " strukturisasi ide", "evaluasi keluaran AI", "merakit prototipe kecil", "menjelaskan batas AI ke non-teknis". Empat ini tergolong umum di lowongan terbaru.'
          ]
        },
        {
          h: 'Rencana 30 Hari Pertama',
          p: [
            'Pekan 1–2: gunakan AI setiap hari untuk pekerjaan aslami, catat mana yang menolong dan mana yang buang waktu. Pekan 3: bangun perpustakaan prompt pribadi. Pekan 4: bangun satu artefak kecil — ringkasan sistem, mini-tool, atau prototipe — dan tunjukkan ke satu orang.',
            'Bukti karya melebihi sertifikat: portfolio kecil yang benar-benar jalan berbicara lebih lantang daripada apapun di CV.'
          ]
        }
      ],
      points: [
        'Keputusan, negosiasi, tanggung jawab = tugas yang melekat.',
        'Tumpuan skill: menulis + literasi AI + kedalaman domain.',
        'Portfolio kecil yang jalan > sertifikat di tempat.'
      ]
    }
  ],

  quiz: [
    {
      q: 'Apa kepanjangan dari LLM?',
      opts: ['Large Language Model', 'Long Learning Machine', 'Linear Logic Module', 'Layered Learning Matrix'],
      a: 0,
      why: 'LLM = Large Language Model: model bahasa skala besar yang dilatih menebak kata berikutnya.'
    },
    {
      q: 'Hubungan paling tepat antara AI dan ML adalah…',
      opts: ['ML adalah subset di dalam AI', 'AI adalah subset dari ML', 'Keduanya sama persis', 'Saling tidak berhubungan'],
      a: 0,
      why: 'AI bidang luas; ML pendekatan di dalamnya yang belajar dari data.'
    },
    {
      q: 'Kenapa AI bisa "mengarang" jawaban salah dengan percaya diri?',
      opts: [
        'Ia menebak pola, bukan mencari fakta',
        'Ia sengaja menipu pengguna',
        'Ia membaca internet langsung saat menjawab',
        'Ia memiliki niat tertentu'
      ],
      a: 0,
      why: 'LLM meneruskan pola dari data latih; bila data tipis, lanjutannya bisa keliru — itulah halusinasi.'
    },
    {
      q: 'Empat bahan prompt yang baik adalah…',
      opts: [
        'Peran, konteks, tugas, format',
        'Judul, intro, isi, penutup',
        'Data, GPU, model, metrik',
        'Sapaan, pertanyaan, permintaan, jargon'
      ],
      a: 0,
      why: 'Peran menentukan suara, konteks menambatkan, tugas jelas, format mengunci bentuk.'
    },
    {
      q: 'Data latih yang berat sebelah akan menyebabkan…',
      opts: [
        'Model condong ke kelompok yang dominan di data',
        'Model otomatis menjadi netral',
        'Tidak berpengaruh apa pun',
        'Model belajar lebih cepat'
      ],
      a: 0,
      why: 'Bias data terbawa ke pola model — sebab itu kasus tepi perlu diuji.'
    }
  ]
};

window.CONTENT = CONTENT;
