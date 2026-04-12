export const revalidate = 120; // Cache for 2 minutes - critical for performance

import CategoriesLinksSwipper from '@/components/layout/categoriesLinksSwipper';
import HomeCover from '@/components/home/HomeCover';
import EasyRrquest from '@/components/home/EasyRrquest';
import ExtraServices from '@/components/home/ExtraServices';
import Subscribe from '@/components/layout/Subscribe';
import Suppliers from '@/components/home/Suppliers';
import ProgressNav from '@/components/layout/ProgressNav';
import Header from '@/components/layout/Header';
import MenuSidebar from '@/components/layout/menu-sidebar';
import { Suspense } from 'react';

import { getHomeSections } from '@/lib/db/fetchHomeSections';
import { HomeSectionType } from '@/lib/constants/homeSectionTypes';

import InlineStartImageSection from '@/components/home/dynamic/InlineStartImageSection';
import GridSection from '@/components/home/dynamic/GridSection';
import DealOffersSection from '@/components/home/dynamic/DealOffersSection';
import CategoryTilesGridSection from '@/components/home/dynamic/CategoryTilesGridSection';
import { HomeSkeleton } from '@/components/skeletons/HomeSkeleton';

// Static content that renders instantly
const StaticHomeContent = () => (
  <>
    <CategoriesLinksSwipper />
    <div className='home container'>
      <ProgressNav page='home' category='no category' item='no item' />
      <HomeCover />
      <EasyRrquest />
      <ExtraServices />
      <Suppliers />
      <Subscribe />
    </div>
  </>
);

// Dynamic sections that load after static content
const DynamicHomeSections = async ({ locale }: { locale: string }) => {
  const sections = await getHomeSections();
  
  return sections.map((section: any) => {
    switch(section.type) {
      case HomeSectionType.INLINE_START_IMAGE:
        return <InlineStartImageSection key={section.key} section={section} />;
      case HomeSectionType.GRID_SECTION:
        return <GridSection key={section.key} section={section} locale={locale as any} />;
      case HomeSectionType.DEAL_OFFERS:
        return <DealOffersSection key={section.key} section={section} />;
      case HomeSectionType.CATEGORY_TILES_GRID:
        return <CategoryTilesGridSection key={section.key} section={section} locale={locale as any} />;
      default:
        return null;
    }
  });
};

const Home = ({ params }: { params: { locale: string } }) => {
  const { locale } = params;
  
  return (
    <>
      <Header page='home' heading='Home' />
      <MenuSidebar />
      
      {/* Static content renders immediately */}
      <StaticHomeContent />
      
      {/* Dynamic content loads without blocking */}
      <div className='home container'>
        <Suspense fallback={<HomeSkeleton />}>
          <DynamicHomeSections locale={locale} />
        </Suspense>
      </div>
    </>
  )
}

export default Home;
