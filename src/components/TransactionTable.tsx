import { useTransactions } from '../hooks/useTransactions';
import { EmptyState } from './EmptyState';
import { StatusBadge } from './StatusBadge';

const rupiah = (n: number) => 'Rp' + n.toLocaleString('id-ID');

export function TransactionTable() {
  const { rows, isLoading, isError } = useTransactions();

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
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
      <caption style={{ captionSide: 'top', textAlign: 'left', padding: '0 0 10px' }}>
        Menampilkan {rows.length} transaksi
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
        {rows.map((r) => (
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
  );
}
