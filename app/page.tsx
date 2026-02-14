
export const dynamic = 'force-dynamic';

import CategoriesLinksSwipper from '@/components/layout/categoriesLinksSwipper';
import HomeCover from '@/components/home/HomeCover'
import HomeOffers from '@/components/home/HomeOffers'
import HomeOuter from '@/components/home/HomeOuter'
import Electronics from '@/components/home/Electronics'
import EasyRrquest from '@/components/home/EasyRrquest'
import RecomendedItem from '@/components/home/RecomendedItem';
import RecomendedItemSkelton from '@/skelton/home/RecomendedItem';
import ExtraServices from '@/components/home/ExtraServices';
import Subscribe from '@/components/layout/Subscribe';
import Suppliers from '@/components/home/Suppliers';
import ProgressNav from '@/components/layout/ProgressNav';
import Header from '@/components/layout/Header';
import MenuSidebar from '@/components/layout/menu-sidebar';
import { Suspense } from 'react';





const Home = () => {

  return (
    <>
      <Header page='home' heading='Home' />
      <MenuSidebar />

      <CategoriesLinksSwipper />
      <div className='home container'>
        <ProgressNav page='home' category='no category' item='no item' />
        <HomeCover />
        <HomeOffers />
        <HomeOuter />
        <Electronics />
        <EasyRrquest />
        <Suspense fallback={<RecomendedItemSkelton />}>
          <RecomendedItem />
        </Suspense>
        <ExtraServices />
        <Suppliers />
        <Subscribe />
      </div>
    </>
  )
}

export default Home
