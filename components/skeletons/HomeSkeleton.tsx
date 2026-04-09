import React from 'react';

export const HomeSkeleton = () => (
  <div className="home-skeleton">
    <div className="skeleton-section">
      <div className="skeleton-header">
        <div className="skeleton-title" />
        <div className="skeleton-subtitle" />
      </div>
      <div className="skeleton-grid">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="skeleton-product">
            <div className="skeleton-image" />
            <div className="skeleton-price" />
            <div className="skeleton-title-line" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HomeSkeleton;
