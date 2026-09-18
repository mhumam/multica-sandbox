import { useMemo, useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { EmptyState } from './EmptyState';
import { StatusBadge } from './StatusBadge';

const rupiah = (n: number) => 'Rp' + n.toLocaleString('id-ID');
const PER_HALAMAN = 10;

export function TransactionTable() {
  const { rows, isLoading, isError } = useTransactions();
  const [halaman, setHalaman] = useState(1);

  const totalHalaman = Math.max(1, Math.ceil(rows.length / PER_HALAMAN));
  const halamanAman = Math.min(halaman, totalHalaman);
  const mulai = (halamanAman - 1) * PER_HALAMAN;
  const rowsHalamanIni = useMemo(
    () => rows.slice(mulai, mulai + PER_HALAMAN),
    [rows, mulai],
  );

  if (isLoading) return <p>Memuat transaksi…</p>;
  if (isError) return <p>Gagal memuat transaksi.</p>;

  if (rows.length === 0) {
    return (
      <EmptyState
        judul="Belum ada transaksi"
        deskripsi="Transaksi kamu bakal muncul di sini begitu ada aktivitas."
      />
    );
  }

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <caption style={{ captionSide: 'top', textAlign: 'left', padding: '0 0 10px' }}>
          Menampilkan {mulai + 1}-{mulai + rowsHalamanIni.length} dari {rows.length} transaksi
        </caption>
        <thead>
          <tr>
            {['Tanggal', 'Deskripsi', 'Jumlah', 'Status'].map((h) => (
              <th
                key={h}
                scope="col"
                style={{ textAlign: 'left', borderBottom: '1px solid #e4e4e7', padding: '8px 10px' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowsHalamanIni.map((r) => (
            <tr key={r.id}>
              <td style={{ borderBottom: '1px solid #f4f4f5', padding: '8px 10px' }}>{r.tanggal}</td>
              <td style={{ borderBottom: '1px solid #f4f4f5', padding: '8px 10px' }}>{r.deskripsi}</td>
              <td style={{ borderBottom: '1px solid #f4f4f5', padding: '8px 10px' }}>
                {rupiah(r.jumlah)}
              </td>
              <td style={{ borderBottom: '1px solid #f4f4f5', padding: '8px 10px' }}>
                <StatusBadge status={r.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalHalaman > 1 && (
        <nav
          aria-label="Navigasi halaman transaksi"
          style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}
        >
          <button
            type="button"
            onClick={() => setHalaman((h) => Math.max(1, h - 1))}
            disabled={halamanAman === 1}
          >
            Sebelumnya
          </button>
          <span>
            Halaman {halamanAman} dari {totalHalaman}
          </span>
          <button
            type="button"
            onClick={() => setHalaman((h) => Math.min(totalHalaman, h + 1))}
            disabled={halamanAman === totalHalaman}
          >
            Berikutnya
          </button>
        </nav>
      )}
    </div>
  );
}
