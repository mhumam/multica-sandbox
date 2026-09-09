import { ambilTransaksi } from '../lib/api/transactions';
import type { UseTransactionsResult } from '../types/api';

export function useTransactions(): UseTransactionsResult {
  const rows = ambilTransaksi();
  return { rows, isLoading: false, isError: false };
}
