# EDTS-3 — Tabel transaksi butuh filter status

Sumber: acceptance criteria di EDTS-3
Ditulis sebelum implementasi. Nomor di sini dipakai sebagai nomor test.

| No | Skenario | Kondisi awal | Aksi | Hasil yang diharapkan | Prio |
|----|----------|--------------|------|------------------------|------|
| 1 | Default filter "Semua" waktu halaman dibuka | Akun punya 12 transaksi: 5 Pending, 4 Berhasil, 3 Refund | Buka halaman tabel transaksi | Dropdown filter menunjukkan opsi terpilih "Semua", semua 12 baris tampil, muncul teks `Menampilkan 12 transaksi` | T |
| 2 | Pilih "Pending" menyaring baris | Sama seperti No.1 (5 Pending, 4 Berhasil, 3 Refund), filter masih "Semua" | Pilih "Pending" di dropdown filter | Hanya 5 baris berstatus Pending yang tampil, muncul teks `Menampilkan 5 transaksi` | T |
| 3 | Pilih "Berhasil" menyaring baris | Sama seperti No.1 | Pilih "Berhasil" di dropdown filter | Hanya 4 baris berstatus Berhasil yang tampil, muncul teks `Menampilkan 4 transaksi` | T |
| 4 | Pilih "Refund" menyaring baris | Sama seperti No.1 | Pilih "Refund" di dropdown filter | Hanya 3 baris berstatus Refund yang tampil, muncul teks `Menampilkan 3 transaksi` | T |
| 5 | Balik ke "Semua" setelah filter aktif | Filter sedang di "Refund" (3 baris tampil dari total 12) | Pilih "Semua" di dropdown filter | Semua 12 baris tampil lagi, muncul teks `Menampilkan 12 transaksi` | T |
| 6 | Negatif: baris di luar status terpilih tidak ikut tampil | Sama seperti No.1, filter dipilih "Refund" | Lihat isi tabel setelah filter diterapkan | Tidak ada satupun baris berstatus Pending atau Berhasil yang muncul di tabel | T |
| 7 | Batas: cuma 1 baris yang cocok dengan filter | Akun punya 6 transaksi, hanya 1 yang berstatus Refund | Pilih "Refund" di dropdown filter | Tabel menampilkan tepat 1 baris (yang Refund itu), muncul teks `Menampilkan 1 transaksi` | S |
| 8 | Batas: semua baris berstatus sama dengan filter | Akun punya 8 transaksi, semuanya berstatus Berhasil | Pilih "Berhasil" di dropdown filter | Semua 8 baris tetap tampil, muncul teks `Menampilkan 8 transaksi` | S |
| 9 | ⚠ GAP: filter dipilih tapi tidak ada baris yang cocok | Akun punya 6 transaksi, tidak ada satupun yang berstatus Refund | Pilih "Refund" di dropdown filter | Belum diatur — lihat GAP REQUIREMENT di bawah | T |
| 10 | Ganti filter berkali-kali berturut-turut | Sama seperti No.1 | Pilih "Pending", lalu "Berhasil", lalu "Refund" berturut-turut | Setelah tiap pilihan, baris dan label `Menampilkan N transaksi` langsung sesuai dengan status yang baru dipilih, tanpa sisa baris dari filter sebelumnya | S |
| 11 | ⚠ GAP: dropdown filter waktu tidak ada transaksi sama sekali | Akun punya 0 transaksi (kondisi kosong total, bukan hasil filter) | Buka halaman tabel transaksi | Belum diatur — lihat GAP REQUIREMENT di bawah | S |
| 12 | ⚠ GAP: dropdown filter waktu data masih dimuat / gagal dimuat | Data transaksi sedang loading, lalu kondisi gagal dimuat (error) | Buka halaman tabel transaksi di kedua kondisi tersebut | Belum diatur — lihat GAP REQUIREMENT di bawah | R |

GAP REQUIREMENT
kondisi   : Filter status dipilih (misal "Refund") tapi tidak ada baris yang cocok dengan status itu
pertanyaan: Pesan/komponen apa yang muncul di posisi tabel — pakai `EmptyState` yang sama dengan "Belum ada transaksi", atau pesan lain yang menyebut status yang difilter (misal "Nggak ada transaksi Refund")? Apakah ada tombol reset filter?
usulan    : Tampilkan `EmptyState` dengan pesan yang menyebut status terpilih, misal judul "Nggak ada transaksi Refund", supaya user tahu ini hasil filter bukan data kosong beneran.

GAP REQUIREMENT
kondisi   : Tidak ada transaksi sama sekali di akun (rows kosong sebelum difilter apapun)
pertanyaan: Apakah dropdown filter status tetap ditampilkan di atas `EmptyState` "Belum ada transaksi", atau disembunyikan karena tidak ada gunanya?
usulan    : Sembunyikan dropdown filter waktu rows kosong total, karena tidak ada data untuk difilter.

GAP REQUIREMENT
kondisi   : Data transaksi sedang loading (`isLoading`) atau gagal dimuat (`isError`)
pertanyaan: Apakah dropdown filter status ikut ditampilkan (dan disabled) di kedua kondisi itu, atau baru muncul setelah data berhasil dimuat?
usulan    : Sembunyikan dropdown filter waktu loading/error, tampilkan baru setelah data berhasil dimuat, konsisten dengan behavior EmptyState yang sudah ada.
