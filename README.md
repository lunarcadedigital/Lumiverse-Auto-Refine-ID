<p align="center">
  <img src="docs/refine-banner.png" width="100%" alt="Auto Refine: seorang perempuan menulis di meja di balkon pada malam hari, diterangi lentera. Halaman-halaman yang dicoret tergeletak di sampingnya, dan halaman bersih melayang naik ke langit berbintang.">
</p>

# Auto Refine (versi anti-slop Bahasa Indonesia)

Ekstensi Lumiverse. Ia mengirim balasan yang sudah selesai ke sebuah model beserta aturan yang kamu tulis, lalu menyimpan hasil tulis ulangnya di atas balasan asli.

- **Sapaan pembuka dibiarkan.** Pesan itu ditulis oleh manusia. **Refine the greeting**, yang mati secara bawaan, adalah satu-satunya cara mengubahnya.
- **Tidak ada yang ditulis tanpa jalan kembali.** **Put it back** mengembalikan kalimat yang diganti oleh sebuah refine.

Ekstensi ini bekerja berdampingan dengan [Auto Retry](https://github.com/starlitcode/Lumiverse-Auto-Retry). Auto Retry memutuskan apakah sebuah balasan layak disimpan. Auto Refine memperbaiki yang layak.

## Tentang fork ini

Ini adalah salinan [Auto Refine](https://github.com/starlitcode/Lumiverse-Auto-Refine) karya starlitcode, versi 1.56.5, berlisensi GPL-3.0. Kode programnya tidak diubah. Yang diubah hanya teks bawaannya, supaya cocok untuk balasan berbahasa Indonesia:

- tujuh pemeriksaan baru untuk model kedua (kontras "bukan X, hanya Y", negasi yang dinarasikan, kalimat pengumuman, frasa klise Indonesia, hitungan bunyi, penutup lewat cuaca atau cahaya, bahasa terapis),
- sembilan kelompok frasa Indonesia di blok **Instant Penalties**,
- beberapa kata pengisi Indonesia di blok **Dead Weight**,
- **seluruh teks prompt bawaan diterjemahkan ke Bahasa Indonesia** (keempat prompt: A judge, A judge that thinks, A line judge, A line judge that thinks), ditambah satu blok baru, **Bahasa Indonesia**, di dua prompt untuk balasan. Nama blok dan tag (misalnya `<instant_penalties>`) tetap bahasa Inggris, karena dokumen dan tes memakainya sebagai acuan.

Rinciannya ada di [FORK_ID.md](FORK_ID.md). Semua kredit untuk ekstensinya tetap milik pembuat aslinya. Masalah yang hanya terjadi pada versi asli sebaiknya dilaporkan ke repo aslinya.

Dokumen di folder `docs/` masih berbahasa Inggris. Nama tombol, tab, dan pengaturan di panel juga berbahasa Inggris, jadi di README ini nama itu ditulis apa adanya dalam huruf tebal.

## Apa yang dilakukannya

- **Memperbaiki balasan.** Tekan sebuah tombol untuk memperbaiki balasan terbaru, atau telusuri semua balasan dalam satu chat. Perbaikan otomatis untuk setiap balasan baru mati sampai kamu menyalakannya.
- **Memperbaiki sebagian balasan.** Pilih sebagian teks lalu perbaiki hanya bagian itu, atau hapus.
- **Memperbaiki pesan yang sudah kamu kirim.** Perbaiki pesan terakhirmu, semua pesanmu dalam satu chat, atau satu pesan lewat tombolnya sendiri. Ini tidak pernah dilakukan otomatis. Pesanmu punya prompt sendiri, yang memperbaiki kesalahan dan membiarkan gayamu.
- **Memperbaiki yang sedang kamu ketik.** Tombol opsional menulis ulang draf di kotak input sebelum kamu mengirimnya.
- **Menunjukkan apa yang berubah.** Setelah refine, tab menampilkan sebelum dan sesudah, digabung dalam satu teks atau berdampingan.

[Every way to refine](docs/settings.md#every-way-to-refine) mendaftar setiap tombol, letaknya, dan apa yang dibutuhkannya.

Ekstensi ini berada di sebuah tab di drawer samping, jadi bisa dibiarkan terbuka sambil kamu menulis.

## Pemasangan

1. Di Lumiverse, buka **Extensions**.
2. Pasang dari alamat ini:

   ```
   https://github.com/lunarcadedigital/Lumiverse-Auto-Refine-ID
   ```

3. Buka drawer samping dan pilih tab **Auto Refine**.

Sebuah prompt sudah disertakan, jadi cukup menyalakan saklarnya. Semua yang lain opsional. Untuk pengaturan yang cocok bagi kebanyakan orang, lihat [What to use](docs/recommended.md).

Kalau Auto Refine yang asli sudah terpasang, hapus dulu, karena nama dan identifier-nya sama.

## Kamu yang mengendalikan

- **Saklar di bagian atas** menghentikan semuanya. Tidak ada refine yang berjalan dan tidak ada model yang dipanggil.
- **Turn off here**, di tab Setup, membiarkan satu chat tidak disentuh.
- **What to refine**, di tab Setup, memilih balasan, pesanmu sendiri, atau keduanya. Tombol untuk sisi yang lain disembunyikan.
- **Ask before saving a refine** menampilkan setiap hasil tulis ulang sebelum ditulis.
- **Put it back** membatalkan sebuah refine.

## Yang diperiksa sebelum menyimpan

Sebuah hasil tulis ulang dibuang, dan balasanmu dibiarkan seperti semula, bila:

- model membicarakan editnya alih-alih melakukannya, misalnya "Berikut pesan yang sudah ditulis ulang"
- model menolak, tidak mengirim apa-apa, atau tidak mengubah apa-apa
- hasilnya jauh lebih panjang atau lebih pendek dari balasan (kamu menentukan kedua batasnya)
- hasilnya menghilangkan format milikmu, seperti tag, kode, atau tautan gambar

Selain itu:

- Pemikiran model sendiri tidak pernah dikirim, jadi hasil tulis ulang tidak bisa mengubahnya.
- Yang asli disimpan supaya bisa dikembalikan, bahkan setelah dimuat ulang. Pembaruan atau restart Lumiverse menghapusnya, kecuali kamu menyimpannya melewati keduanya di tab Limits.
- Setiap pemeriksaan menyebut alasannya di tab Log.

Selengkapnya di [What it refuses to save](docs/guardrails.md).

## Tab-tabnya

| Tab | Isinya |
| --- | --- |
| **Prompt** | Permintaan, blok demi blok, makro, dan presetmu |
| **Context** | Seberapa banyak chat dan lorebook yang masuk, dan pratinjau apa yang dikirim |
| **Model** | Koneksi mana yang memperbaiki, thinking, batas waktu, sampler, dan dua model (beta) |
| **Limits** | Yang dilindungi, yang ditolak untuk disimpan, dan yang dilakukan sebelum menulis |
| **Log** | Apa yang sedang terjadi, apa yang sudah dilakukan, biaya refine terakhir, dan tombol laporan bug |
| **Setup** | Chat ini, peringatan, tombol opsional, impor dan ekspor, dan pengaturan ulang |

Saklar, tombol refine, dan refine yang bisa dikembalikan ada di atas tab.

## Biayanya

Sebuah refine adalah satu panggilan model tambahan untuk setiap balasan yang diperbaikinya. Untuk menghemat:

- **Refine using** (tab Model): arahkan ke model yang lebih murah daripada model chatmu.
- **Let it think first** (tab Model): mati secara bawaan. Menulis ulang tidak butuh model reasoning.
- **How much it is told** (tab Context): riwayat chat yang lebih sedikit berarti panggilan yang lebih murah.
- **Two models** (tab Model, beta): model kedua yang kecil, lewat salah satu Decision connection milikmu, memeriksa setiap balasan lebih dulu, sehingga hanya yang perlu yang diperbaiki. Ia bisa salah, jadi balasan yang perlu diperbaiki kadang dibiarkan. Lihat [It can be wrong](docs/two-models.md#it-can-be-wrong).

**Several rewrites at once** (tab Limits) lebih mahal, karena setiap tulis ulang adalah satu panggilan penuh. Mati secara bawaan.

Isi harga provider-mu di tab Model untuk melihat biaya dalam uang, bukan token. Untuk paket gratis atau model lokal, **Wait out a provider that will not take the call** (tab Limits) menunggu lalu mencoba lagi ketika provider sedang sibuk.

## Prompt-mu

Seluruh permintaan adalah daftar blok yang bisa kamu ubah, urutkan ulang, matikan, atau tambah. Makro seperti `{{message}}`, `{{history}}`, dan `{{description}}` diisi saat refine berjalan.

Empat prompt sudah disertakan:

- **A judge**, untuk balasan. Memperbaiki cara balasan terbaca dan membiarkan apa yang terjadi.
- **A line judge**, untuk pesanmu sendiri. Memperbaiki kesalahan dan membiarkan gayamu.
- Masing-masing punya versi lebih kecil **that thinks**, untuk model yang bernalar.

Keempatnya hanya mengubah baris yang bisa dikutip model sebagai pelanggaran aturan. Dua yang untuk model yang berpikir memberi skor tiap area dan menuliskan skornya. Dua yang polos memberi batas yang sama sebagai aturan. Keduanya tidak meminta model memeriksa pekerjaannya, karena model yang tidak berpikir menulis jawabannya sekali jalan. Keempatnya bekerja dengan satu karakter maupun beberapa, termasuk di chat grup. Lihat [The scorecard](docs/prompt.md#the-scorecard).

Pada fork ini, teks keempat prompt ditulis dalam Bahasa Indonesia, dan dua prompt untuk balasan punya satu blok tambahan, **Bahasa Indonesia**, yang menjaga bahasa dan register yang sudah ada di balasan dan mengubah sangkalan beserta jawabannya menjadi jawabannya saja. Deskripsi prompt di panel (teks "what") masih bahasa Inggris.

**Show me the request**, di tab Context, menampilkan permintaan yang akan dikirim oleh refine pada balasan itu, tanpa memanggil model dan tanpa biaya. Dua hal yang hanya bisa diisi oleh refine sungguhan hanya disebut namanya: apa yang ditemukan pemeriksaan, dan putaran setelah yang pertama.

## Dokumentasi

Dokumen berikut berbahasa Inggris.

**Mulai dari sini**

- [What to use](docs/recommended.md): pengaturan prompt, model, thinking, dan sampler untuk memulai
- [Settings](docs/settings.md): setiap tab dan pengaturan
- [Ways to reach it](docs/settings.md#setup): tombol mengambang, tombol di chat, dan memperbaiki bagian yang dipilih

**Lebih jauh**

- [How the prompt is built](docs/prompt.md): blok, makro, peran, prompt bawaan, dan pratinjau
- [Making your own prompt](docs/rules.md): panduan langkah demi langkah untuk prompt yang cocok dengan ceritamu dan modelmu
- [Presets](docs/prompt.md#presets) dan [Import and export](docs/prompt.md#import-and-export)
- [What it refuses to save](docs/guardrails.md): pemeriksaan atas apa yang kembali dari model
- [Two models](docs/two-models.md): beta di mana model kedua memilih balasan mana yang diperbaiki

**Tentang ekstensi ini**

- [Privacy](docs/privacy.md): apa yang bisa dijangkau, dikirim, dan disimpan
- [Security policy](SECURITY.md): cara melaporkan masalah keamanan
- [Changelog](CHANGELOG.md): apa yang berubah di setiap versi (versi asli, belum mencakup fork ini)

## Cara kerjanya

- Proses refine berjalan di backend ekstensi, karena mengedit pesan yang tersimpan adalah pekerjaan backend.
- Setiap refine lewat Lumiverse menuju provider yang kamu atur. Dengan dua model aktif, panggilan ke model kedua lewat Lumiverse menuju Decision connection-mu.
- Ekstensi ini tidak punya jaringan sendiri. Cari `fetch(`, `XMLHttpRequest`, `WebSocket`, `sendBeacon`, atau `EventSource` di kedua berkas sumbernya, dan kamu tidak akan menemukan apa-apa.
- **Tidak ada yang pernah ditambahkan ke chatmu.** Ia hanya mengedit pesan yang sudah ada.
- **Refine what I am typing** membaca dan menulis kotak input di halaman, karena Lumiverse tidak punya API untuk itu. Kalau sebuah pembaruan memindahkan kotaknya, **Where the input box is** di tab Setup menunjuknya ke yang baru.
- Berkas yang dimuat Lumiverse adalah `dist/frontend.js` dan `dist/backend.js`. Keduanya JavaScript polos yang bisa dibaca. Tidak ada yang diminifikasi.

Ia meminta delapan izin:

| Izin | Untuk apa |
| --- | --- |
| `generation` | menjalankan refine |
| `chat_mutation` | menyimpan hasil tulis ulang |
| `chats` | mengetahui chat mana yang sedang kamu buka, dan apa yang diingat Lumiverse tentangnya |
| `interceptor` | melihat koneksi mana yang kamu pakai untuk chat |
| `characters` | membaca kartu karakter |
| `world_books` | membaca lore yang aktif di chat |
| `ui_panels` | tombol mengambang |
| `decisions` | menanyai model kedua, saat dua model aktif |

[Privacy](docs/privacy.md) menjelaskan apa yang tetap berfungsi tanpa tiap izin.

## Bantuan dan masukan

Untuk masalah, saran, atau pertanyaan tentang **fork ini**, buka [issue di GitHub](https://github.com/lunarcadedigital/Lumiverse-Auto-Refine-ID/issues). Untuk masalah yang juga terjadi pada versi asli, gunakan [issue repo aslinya](https://github.com/starlitcode/Lumiverse-Auto-Refine/issues). [Contributing](CONTRIBUTING.md) menjelaskan apa yang perlu ditulis di laporan bug.

## Dibuat untuk orang dewasa

Auto Refine ditujukan untuk orang dewasa, berusia 18 tahun ke atas. Ia tidak ditujukan untuk konten seksual yang melibatkan anak di bawah umur, dan pembuat aslinya tidak mendukung siapa pun yang memakainya untuk itu. Pembuat aslinya tidak membantu siapa pun yang mengaku berusia di bawah 18 tahun, dalam hal apa pun. [The one thing they do not edit](docs/prompt.md#the-one-thing-they-do-not-edit) menjelaskan dengan tepat bagaimana prompt bawaan menanganinya.

## Kredit

- **starlitcode**: membuat dan memelihara ekstensi aslinya
- **[Claude](https://claude.ai)** (Anthropic): menulis kode ekstensi aslinya, diarahkan dan diuji oleh starlitcode
- **[Hone](https://github.com/AMousePad/Hone)**: ekstensi yang menunjukkan bahwa penyempurnaan teks layak dibuat. Auto Refine ditulis dari nol dan tidak berbagi kode dengannya
- Semua orang yang melaporkan bug atau mengusulkan sesuatu yang menjadi perbaikan
- **Lunarcade Digital**: perubahan bawaan untuk bahasa Indonesia pada fork ini

Berlisensi GNU General Public License v3.0. Lihat [LICENSE](LICENSE).
