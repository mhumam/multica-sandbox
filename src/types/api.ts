/**
 * KONTRAK ANTAR-LAPISAN (seam).
 *
 * File ini milik agent Integration. Agent UI cuma boleh MEMBACA tipe di sini.
 * Kalau UI butuh field baru, dia harus minta lewat komentar — bukan nambah sendiri,
 * dan bukan nurunin sendiri dari data yang ada.
 */

export type TransactionStatus = 'pending' | 'berhasil' | 'refund';

export type Transaction = {
  id: string;
  /** Format "YYYY-MM-DD" */
  tanggal: string;
  deskripsi: string;
  /** Rupiah, bilangan bulat */
  jumlah: number;
  status: TransactionStatus;
};

export type UseTransactionsResult = {
  rows: Transaction[];
  isLoading: boolean;
  isError: boolean;
};

export type TitikPendapatan = {
  /** Format "YYYY-MM" */
  label: string;
  total: number;
};

export type UseRevenueResult = {
  data: TitikPendapatan[];
  isLoading: boolean;
};
