import { useState } from 'react';
import { useRevenue, type RentangBulan } from '../hooks/useRevenue';
import { EmptyState } from './EmptyState';

const RENTANG: RentangBulan[] = [3, 6, 12];
const rupiah = (n: number) => 'Rp' + n.toLocaleString('id-ID');

export function RevenueChart() {
  const [rentang, setRentang] = useState<RentangBulan>(12);
  const { data, isLoading } = useRevenue(rentang);

  if (isLoading) return <p>Memuat pendapatan…</p>;

  const maks = Math.max(...data.map((d) => d.total), 1);
  const adaIsinya = data.some((d) => d.total > 0);

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {RENTANG.map((r) => (
          <button
            key={r}
            onClick={() => setRentang(r)}
            aria-pressed={r === rentang}
            style={{
              padding: '4px 12px',
              borderRadius: 6,
              border: '1px solid ' + (r === rentang ? '#2f6f5e' : '#d4d4d8'),
              background: r === rentang ? '#e6f0ec' : '#fff',
              cursor: 'pointer',
              font: 'inherit',
              fontSize: 13,
            }}
          >
            {r} bulan
          </button>
        ))}
      </div>

      {!adaIsinya ? (
        <EmptyState
          judul="Belum ada data pendapatan"
          deskripsi="Grafik bakal muncul begitu ada transaksi di rentang ini."
        />
      ) : (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {data.map((d) => (
            <li
              key={d.label}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}
            >
              <span style={{ width: 70, fontSize: 12, color: '#52525b' }}>{d.label}</span>
              <span
                aria-hidden="true"
                style={{
                  height: 14,
                  width: `${(d.total / maks) * 60}%`,
                  minWidth: d.total > 0 ? 2 : 0,
                  background: '#2f6f5e',
                  borderRadius: 3,
                }}
              />
              <span style={{ fontSize: 12 }}>{rupiah(d.total)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
