import type { TransactionStatus } from '../types/api';

const GAYA: Record<TransactionStatus, { bg: string; teks: string; label: string }> = {
  pending: { bg: '#fef3c7', teks: '#92400e', label: 'Pending' },
  berhasil: { bg: '#d1fae5', teks: '#065f46', label: 'Berhasil' },
  refund: { bg: '#e0e7ff', teks: '#3730a3', label: 'Refund' },
};

export function StatusBadge({ status }: { status: TransactionStatus }) {
  const g = GAYA[status];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        background: g.bg,
        color: g.teks,
      }}
    >
      {g.label}
    </span>
  );
}
