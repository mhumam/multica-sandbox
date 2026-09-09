import { useState } from 'react';
import { RevenueChart } from './components/RevenueChart';
import { TransactionTable } from './components/TransactionTable';

type Halaman = 'transaksi' | 'laporan';

export default function App() {
  const [halaman, setHalaman] = useState<Halaman>('transaksi');

  return (
    <main
      style={{
        maxWidth: 820,
        margin: '0 auto',
        padding: 24,
        font: '15px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif',
        color: '#18181b',
      }}
    >
      <h1 style={{ fontSize: 22, margin: '0 0 4px' }}>Dashboard Klien</h1>
      <p style={{ margin: '0 0 20px', color: '#71717a', fontSize: 14 }}>
        Sandbox buat simulasi Multica. Datanya dummy dan deterministik.
      </p>

      <nav style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {(['transaksi', 'laporan'] as const).map((h) => (
          <button
            key={h}
            onClick={() => setHalaman(h)}
            aria-current={halaman === h ? 'page' : undefined}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: '1px solid ' + (halaman === h ? '#2f6f5e' : '#d4d4d8'),
              background: halaman === h ? '#e6f0ec' : '#fff',
              cursor: 'pointer',
              font: 'inherit',
              fontSize: 14,
              textTransform: 'capitalize',
            }}
          >
            {h}
          </button>
        ))}
      </nav>

      {halaman === 'transaksi' ? <TransactionTable /> : <RevenueChart />}
    </main>
  );
}
