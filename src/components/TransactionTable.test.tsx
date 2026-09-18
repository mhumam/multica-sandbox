import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    // 10 baris per halaman + 1 baris header
    expect(screen.getAllByRole('row')).toHaveLength(11);
  });

  it('[2] nampilin jumlah transaksi yang lagi ditampilin', () => {
    render(<TransactionTable />);
    expect(screen.getByText('Menampilkan 1-10 dari 42 transaksi')).toBeInTheDocument();
  });

  it('[3] pindah ke halaman berikutnya nampilin baris berikutnya', async () => {
    const user = userEvent.setup();
    render(<TransactionTable />);

    await user.click(screen.getByRole('button', { name: 'Berikutnya' }));

    expect(screen.getByText('Halaman 2 dari 5')).toBeInTheDocument();
    expect(screen.getByText('Menampilkan 11-20 dari 42 transaksi')).toBeInTheDocument();
  });

  it('[4] tombol "Sebelumnya" nonaktif di halaman pertama, "Berikutnya" nonaktif di halaman terakhir', async () => {
    const user = userEvent.setup();
    render(<TransactionTable />);

    expect(screen.getByRole('button', { name: 'Sebelumnya' })).toBeDisabled();

    for (let i = 0; i < 4; i++) {
      await user.click(screen.getByRole('button', { name: 'Berikutnya' }));
    }

    expect(screen.getByText('Halaman 5 dari 5')).toBeInTheDocument();
    expect(screen.getByText('Menampilkan 41-42 dari 42 transaksi')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Berikutnya' })).toBeDisabled();
  });
});
