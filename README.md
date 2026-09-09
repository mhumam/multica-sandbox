# multica-sandbox

Repo kecil buat simulasi Multica. React 18 + TypeScript + Vite + Vitest.
**Jangan simulasi di repo klien** — pakai ini.

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint     # tsc --noEmit
npm test         # vitest run
```

Sengaja **nggak pakai ESLint dan nggak pakai Tailwind** — makin sedikit yang bisa
salah konfigurasi, makin cepat kamu sampai ke bagian yang mau diuji.

## Struktur, dan siapa yang punya

```
src/
├── types/api.ts            🔌 Dimas  ← KONTRAK. Ini seam-nya.
├── lib/api/transactions.ts 🔌 Dimas  ← simulasi respons server, jangan diubah bentuknya
├── hooks/
│   ├── useTransactions.ts  🔌 Dimas
│   └── useRevenue.ts       🔌 Dimas
├── components/
│   ├── TransactionTable.tsx 🎨 Rani
│   ├── RevenueChart.tsx     🎨 Rani
│   ├── StatusBadge.tsx      🎨 Rani
│   └── EmptyState.tsx       🎨 Rani
├── **/*.test.tsx           🧪 Bagas
docs/test-cases/            📋 Nina
```

Garis pemisahnya **bukan folder** — folder cuma konsekuensinya. Garisnya adalah tipe
yang diekspor `src/types/api.ts`. Rani konsumsi tipe itu; Dimas yang mendefinisikannya.

## Datanya

42 transaksi, 14 bulan (2025-01 sampai 2026-02), 3 transaksi per bulan.
Deterministik — nggak ada random, nggak ada `Date.now()`, jadi test-nya stabil.

Dua hal yang sengaja gue atur di data ini:

- **Nggak ada satu pun transaksi berstatus `refund`.** Ini yang bikin MUL-302 punya
  kondisi "filter aktif tapi hasilnya kosong" yang pasti kejadian.
- **Rentangnya lewat pergantian tahun.** Ini yang bikin bug di MUL-303 kelihatan.

## Kondisi awal yang sengaja "belum bener"

Ini bukan repo yang rapi. Ada tiga hal yang sengaja ditinggal, satu per seed issue:

| Apa | Buat issue |
|---|---|
| Warna badge `pending` pucat (`#fef3c7`) | MUL-301 |
| Cuma ada satu empty state, dan `useTransactions` belum nerima filter | MUL-302 |
| Ada bug di `useRevenue` | MUL-303 |

Bug MUL-303 sengaja **nggak dikasih komentar penanda** di kodenya — kalau ditandain,
agent-nya tinggal baca komentar dan simulasinya jadi nggak ada artinya.

## Yang udah diverifikasi

Per 2026-09-09, di Node 20 / npm, fresh install:

```
npm install   → 177 packages, sukses
npm run lint  → bersih, nol error
npm test      → 2 passed (2)
```

Dan perilaku bug MUL-303 udah dicek angkanya:

| Rentang | Bulan yang ada isinya | Seharusnya |
|---|---|---|
| 3 bulan | 1 dari 3 | 3 dari 3 |
| 6 bulan | 3 dari 6 | 6 dari 6 |
| 12 bulan | 3 dari 12 | 12 dari 12 |

Kalau setelah perbaikan angkanya jadi kolom kanan, berarti fix-nya bener.
