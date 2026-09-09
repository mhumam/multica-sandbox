import { ambilTransaksi } from '../lib/api/transactions';
import type { TitikPendapatan, Transaction, UseRevenueResult } from '../types/api';

export type RentangBulan = 3 | 6 | 12;

function kunciBulan(tanggal: string): string {
  const d = new Date(tanggal);
  return `${d.getFullYear()}-${d.getMonth() + 1}`;
}

function daftarBulanTerakhir(rows: Transaction[], rentang: RentangBulan): string[] {
  const semua = [...new Set(rows.map((r) => r.tanggal.slice(0, 7)))].sort();
  return semua.slice(-rentang);
}

export function useRevenue(rentang: RentangBulan): UseRevenueResult {
  const rows = ambilTransaksi();

  const total = new Map<string, number>();
  for (const r of rows) {
    const k = kunciBulan(r.tanggal);
    total.set(k, (total.get(k) ?? 0) + r.jumlah);
  }

  const data: TitikPendapatan[] = daftarBulanTerakhir(rows, rentang).map((label) => ({
    label,
    total: total.get(label) ?? 0,
  }));

  return { data, isLoading: false };
}
