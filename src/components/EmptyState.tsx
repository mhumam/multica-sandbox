import type { ReactNode } from 'react';

export function EmptyState({
  judul,
  deskripsi,
  aksi,
}: {
  judul: string;
  deskripsi: string;
  aksi?: ReactNode;
}) {
  return (
    <div
      style={{
        padding: '48px 24px',
        textAlign: 'center',
        border: '1px dashed #d4d4d8',
        borderRadius: 10,
        color: '#52525b',
      }}
    >
      <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#27272a' }}>{judul}</p>
      <p style={{ margin: '6px 0 0', fontSize: 14 }}>{deskripsi}</p>
      {aksi ? <div style={{ marginTop: 16 }}>{aksi}</div> : null}
    </div>
  );
}
