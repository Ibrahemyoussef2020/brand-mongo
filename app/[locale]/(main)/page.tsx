export const revalidate = 120; // Cache for 2 minutes - critical for performance

import CategoriesLinksSwipper from '@/components/layout/categoriesLinksSwipper';
import HomeCover from '@/components/home/dynamic/HomeCover';
import EasyRrquest from '@/components/home/dynamic/EasyRrquest';
import ExtraServices from '@/components/home/dynamic/ExtraServices';
import Subscribe from '@/components/layout/Subscribe';
import Suppliers from '@/components/home/dynamic/Suppliers';
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

// Dynamic sections that load after static content based on database configuration
const DynamicHomeSections = async ({ locale }: { locale: string }) => {
  const sections = await getHomeSections();
  
  return sections.map((section: any) => {
    if (!section) return null;
    switch(section.type) {
      case HomeSectionType.STATIC_HOME_COVER:
        return <HomeCover key={section.key} />;
      case HomeSectionType.STATIC_EASY_REQUEST:
        return <EasyRrquest key={section.key} />;
      case HomeSectionType.STATIC_EXTRA_SERVICES:
        return <ExtraServices key={section.key} />;
      case HomeSectionType.STATIC_SUBSCRIBE:
        return <Subscribe key={section.key} />;
      case HomeSectionType.STATIC_SUPPLIERS:
        return <Suppliers key={section.key} />;
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
      <CategoriesLinksSwipper />

      <div className='home container'>
        <ProgressNav page='home' category='no category' item='no item' />
        <Suspense fallback={<HomeSkeleton />}>
          <DynamicHomeSections locale={locale} />
        </Suspense>
      </div>
    </>
  )
}

export default Home;
