import type { Transaction } from '../../types/api';

/**
 * Simulasi respons server. Anggap kamu nggak punya kendali atas bentuk data ini —
 * perlakukan seperti API beneran. Datanya sengaja deterministik biar test stabil.
 */

const BULAN = [
  '2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07',
  '2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01', '2026-02',
];

const DESKRIPSI = [
  'Langganan bulanan',
  'Top up saldo',
  'Pembelian paket data',
  'Biaya layanan',
];

function bikinData(): Transaction[] {
  const rows: Transaction[] = [];
  BULAN.forEach((bulan, i) => {
    for (let n = 0; n < 3; n++) {
      const hari = String(5 + n * 8).padStart(2, '0');
      rows.push({
        id: `${bulan}-${n}`,
        tanggal: `${bulan}-${hari}`,
        deskripsi: DESKRIPSI[(i + n) % DESKRIPSI.length],
        jumlah: 250_000 + i * 25_000 + n * 50_000,
        status: (i + n) % 4 === 0 ? 'pending' : 'berhasil',
      });
    }
  });
  return rows;
}

const DATA = bikinData();

export function ambilTransaksi(): Transaction[] {
  return DATA.map((t) => ({ ...t }));
}
