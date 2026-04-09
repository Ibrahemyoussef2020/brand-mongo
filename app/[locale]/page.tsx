export const dynamic = 'force-dynamic';

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
import RecomendedItemSkelton from '@/skelton/home/RecomendedItem';

const Home = async ({ params }: { params: { locale: string } }) => {
  const { locale } = params;
  
  const sections = await getHomeSections();

  return (
    <>
      <Header page='home' heading='Home' />
      <MenuSidebar />

      <CategoriesLinksSwipper />
      <div className='home container'>
        <ProgressNav page='home' category='no category' item='no item' />
        <HomeCover />
        
        <Suspense fallback={<RecomendedItemSkelton />}>
          {sections.map((section: any) => {
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
          })}
        </Suspense>

        <EasyRrquest />
        <ExtraServices />
        <Suppliers />
        <Subscribe />
      </div>
    </>
  )
}

export default Home;
