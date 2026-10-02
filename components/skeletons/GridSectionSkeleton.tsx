import React from 'react';

interface GridSectionSkeletonProps {
  columns?: number;
  count?: number;
  hasHeader?: boolean;
}

export const GridSectionSkeleton: React.FC<GridSectionSkeletonProps> = ({
  columns = 5,
  count = 10,
  hasHeader = true,
}) => {
  return (
    <section
      className="recomended-items skeleton-wrapper"
      style={{
        padding: '40px 0',
        backgroundColor: '#ffffff',
      }}
    >
      {hasHeader && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1400px',
            margin: '0 auto 30px',
            padding: '0 30px',
          }}
        >
          <div
            className="skelton-shimmer"
            style={{
              width: '240px',
              height: '32px',
              borderRadius: '6px',
            }}
          />
          <div
            className="skelton-shimmer"
            style={{
              width: '120px',
              height: '40px',
              borderRadius: '25px',
            }}
          />
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '25px',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 30px',
        }}
      >
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid #edf2f7',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Image Placeholder */}
            <div
              className="skelton-shimmer"
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: '8px',
              }}
            />
            {/* Price Line */}
            <div
              className="skelton-shimmer"
              style={{
                width: '60%',
                height: '20px',
                borderRadius: '4px',
              }}
            />
            {/* Title Line 1 */}
            <div
              className="skelton-shimmer"
              style={{
                width: '90%',
                height: '16px',
                borderRadius: '4px',
              }}
            />
            {/* Title Line 2 */}
            <div
              className="skelton-shimmer"
              style={{
                width: '50%',
                height: '14px',
                borderRadius: '4px',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GridSectionSkeleton;
