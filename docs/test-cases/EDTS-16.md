# EDTS-16 — Ubah warna badge status berhasil ke #c1ffdfff

Request: warna badge pada status `berhasil` diubah jadi background `#c1ffdfff` dengan
warna teks `#05503bff`. Komponen terkait: `StatusBadge.tsx`.

| No | Skenario | Kondisi awal | Aksi | Hasil yang diharapkan | Prioritas |
|---|---|---|---|---|---|
| 1 | Badge status Berhasil pakai warna background baru | Ada transaksi dengan `status: 'berhasil'` | Render `StatusBadge` dengan status `berhasil` | Elemen badge punya `background-color: #c1ffdfff` | T |
| 2 | Badge status Berhasil pakai warna teks baru | Ada transaksi dengan `status: 'berhasil'` | Render `StatusBadge` dengan status `berhasil` | Elemen badge punya `color: #05503bff` | T |
| 3 | Label teks badge Berhasil nggak berubah | Ada transaksi dengan `status: 'berhasil'` | Render `StatusBadge` dengan status `berhasil` | Muncul teks persis "Berhasil" di badge | S |
| 4 | ⚠ Badge status lain (Pending, Refund) nggak ikut berubah warnanya | Ada transaksi dengan `status: 'pending'` dan transaksi dengan `status: 'refund'` | Render `StatusBadge` untuk masing-masing status | Badge Pending tetap `background-color: #fed7aa` / `color: #7c2d12`; badge Refund tetap `background-color: #e0e7ff` / `color: #3730a3` — tidak berubah jadi `#c1ffdfff` / `#05503bff` | T |
| 5 | Beberapa badge Berhasil tampil konsisten dalam satu tabel | Tabel transaksi berisi lebih dari satu baris dengan `status: 'berhasil'` | Render `TransactionTable` dengan data tersebut | Semua badge Berhasil di tabel sama-sama pakai `background-color: #c1ffdfff` dan `color: #05503bff` | R |
| 6 | ⚠ GAP Hex 8-digit (dengan channel alpha `ff`) tetap konsisten setelah dirender browser | Ada transaksi dengan `status: 'berhasil'` | Render `StatusBadge`, baca warna lewat `getComputedStyle` (bukan cuma baca prop `style` di React) | Warna yang terbaca setara dengan `#c1ffdfff` (browser lazimnya menormalkan ke `rgba(193, 255, 223, 1)`); assertion test harus dicocokkan ke bentuk yang dinormalkan, bukan string hex literal | S |

GAP REQUIREMENT
kondisi   : request minta hex 8-digit (`#c1ffdfff`, `#05503bff`) yang punya channel alpha, sementara seluruh warna badge lain di kode (`StatusBadge.tsx`) pakai hex 6-digit tanpa alpha. Alpha `ff` di sini setara opaque penuh, tapi begitu browser/`getComputedStyle` menormalkan nilai ini jadi `rgba(...)`, assertion test yang naif membandingkan string hex literal `#c1ffdfff` bisa gagal terus meskipun implementasinya benar.
pertanyaan: apakah warna berhasil memang harus disimpan persis sebagai hex 8-digit (untuk konsistensi dengan request), atau boleh disederhanakan ke hex 6-digit (`#c1ffdf` / `#05503b`) karena alpha-nya toh selalu penuh — dan kalau tetap 8-digit, test harus assert ke representasi apa (raw style string vs computed RGBA)?
usulan    : simpan sebagai hex 6-digit (`#c1ffdf` / `#05503b`) yang sudah konsisten dengan pola warna lain di `StatusBadge.tsx`, kecuali ada alasan lain (mis. dari desain) yang butuh channel alpha eksplisit; kalau tetap 8-digit, test case harus assert lewat `getComputedStyle` yang dinormalkan, bukan string hex mentah.
