import React from 'react';
import HomeOffersSkelton from '@/skelton/home/HomeOffers';
import GridSectionSkeleton from './GridSectionSkeleton';

export const HomeSkeleton = () => (
  <div className="home-skeleton" style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
    {/* Deals & Offers Skeleton */}
    <div style={{ marginBottom: '30px' }}>
      <HomeOffersSkelton />
    </div>

    {/* Section 1 Grid Skeleton */}
    <div style={{ marginBottom: '30px' }}>
      <GridSectionSkeleton columns={5} count={5} />
    </div>

    {/* Section 2 Grid Skeleton */}
    <div style={{ marginBottom: '30px' }}>
      <GridSectionSkeleton columns={5} count={5} />
    </div>
  </div>
);

export default HomeSkeleton;
