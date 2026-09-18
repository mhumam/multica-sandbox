# EDTS-14 — Ubah warna badge status pending ke #fed7aa

Request: warna badge pada status `pending` diubah jadi background `#fed7aa` dengan
warna teks `#7c2d12`. Komponen terkait: `StatusBadge.tsx`.

| No | Skenario | Kondisi awal | Aksi | Hasil yang diharapkan | Prioritas |
|---|---|---|---|---|---|
| 1 | Badge status Pending pakai warna background baru | Ada transaksi dengan `status: 'pending'` | Render `StatusBadge` dengan status `pending` | Elemen badge punya `background-color: #fed7aa` | T |
| 2 | Badge status Pending pakai warna teks baru | Ada transaksi dengan `status: 'pending'` | Render `StatusBadge` dengan status `pending` | Elemen badge punya `color: #7c2d12` | T |
| 3 | Label teks badge Pending nggak berubah | Ada transaksi dengan `status: 'pending'` | Render `StatusBadge` dengan status `pending` | Muncul teks persis "Pending" di badge | S |
| 4 | ⚠ Badge status lain (Berhasil, Refund) nggak ikut berubah warnanya | Ada transaksi dengan `status: 'berhasil'` dan transaksi dengan `status: 'refund'` | Render `StatusBadge` untuk masing-masing status | Badge Berhasil tetap `background-color: #c1ffdf` / `color: #05503b`; badge Refund tetap `background-color: #e0e7ff` / `color: #3730a3` — tidak berubah jadi `#fed7aa` / `#7c2d12` | T |
| 5 | Beberapa badge Pending tampil konsisten dalam satu tabel | Tabel transaksi berisi lebih dari satu baris dengan `status: 'pending'` | Render `TransactionTable` dengan data tersebut | Semua badge Pending di tabel sama-sama pakai `background-color: #fed7aa` dan `color: #7c2d12` | R |

GAP REQUIREMENT
kondisi   : request cuma nyebut dua nilai hex (background & teks) buat status `pending`, tapi nggak nyebut apakah kontras warna ini perlu memenuhi standar aksesibilitas (mis. WCAG AA) — `#fed7aa` atas `#7c2d12` kemungkinan kontrasnya rendah buat teks kecil (12px, seperti di kode saat ini).
pertanyaan: apakah kombinasi warna ini perlu dicek rasio kontrasnya dulu sebelum diimplementasi, atau hex yang diberikan dianggap final tanpa syarat aksesibilitas?
usulan    : cek rasio kontras `#fed7aa` vs `#7c2d12` terhadap WCAG AA (minimal 4.5:1 untuk teks 12px) sebelum implementasi; kalau nggak lolos, eskalasi ke yang minta warnanya sebelum dikerjakan.
