import { render, screen } from '@testing-library/react';
import { TransactionTable } from './TransactionTable';

/**
 * Contoh pola test di repo ini. Agent Test Implementer harus ngikutin bentuk ini:
 * - query pakai peran atau teks yang kelihatan user, bukan class CSS
 * - nomor test nyambung ke nomor skenario di docs/test-cases/
 */

describe('TransactionTable', () => {
  it('[1] nampilin baris transaksi beserta jumlah kolomnya', () => {
    render(<TransactionTable />);
    expect(screen.getByRole('columnheader', { name: 'Tanggal' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Status' })).toBeInTheDocument();
    // 42 baris data + 1 baris header
    expect(screen.getAllByRole('row')).toHaveLength(43);
  });

  it('[2] nampilin jumlah transaksi yang lagi ditampilin', () => {
    render(<TransactionTable />);
    expect(screen.getByText('Menampilkan 42 transaksi')).toBeInTheDocument();
  });
});
