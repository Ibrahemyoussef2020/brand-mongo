import React from 'react';

export const OrderListSkeleton: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '1200px', margin: '20px auto', padding: '0 15px' }}>
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div className="skelton-shimmer" style={{ width: '140px', height: '22px', borderRadius: '4px' }} />
              <div className="skelton-shimmer" style={{ width: '80px', height: '24px', borderRadius: '12px' }} />
            </div>
            <div className="skelton-shimmer" style={{ width: '100px', height: '20px', borderRadius: '4px' }} />
          </div>

          {/* Product Items Shimmer */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div className="skelton-shimmer" style={{ width: '70px', height: '70px', borderRadius: '8px', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <div className="skelton-shimmer" style={{ width: '50%', height: '18px', borderRadius: '4px' }} />
              <div className="skelton-shimmer" style={{ width: '25%', height: '14px', borderRadius: '4px' }} />
            </div>
            <div className="skelton-shimmer" style={{ width: '90px', height: '24px', borderRadius: '6px' }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderListSkeleton;
