import React from 'react';

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  columns = 6,
  rows = 5,
}) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rIdx) => (
        <tr key={rIdx} style={{ borderBottom: '1px solid #f1f5f9' }}>
          {Array.from({ length: columns }).map((_, cIdx) => (
            <td key={cIdx} style={{ padding: '16px 20px' }}>
              <div
                className="skelton-shimmer"
                style={{
                  height: cIdx === 0 ? '24px' : '18px',
                  width: cIdx === 0 ? '75%' : cIdx === columns - 1 ? '40%' : `${50 + (cIdx * 11) % 40}%`,
                  borderRadius: '6px',
                }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableSkeleton;
