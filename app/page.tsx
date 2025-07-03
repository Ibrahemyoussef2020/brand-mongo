
import CategoriesLinksSwipper from '@/components/layout/categoriesLinksSwipper';
import HomeCover from '@/components/home/HomeCover'
import HomeOffers from '@/components/home/HomeOffers'
import HomeOuter from '@/components/home/HomeOuter'
import Electronics from '@/components/home/Electronics'
import EasyRrquest from '@/components/home/EasyRrquest'
import RecomendedItem from '@/components/home/RecomendedItem';
import ExtraServices from '@/components/home/ExtraServices';
import Subscribe from '@/components/layout/Subscribe';
import Suppliers from '@/components/home/Suppliers';
import ProgressNav from '@/components/layout/ProgressNav';
import Header from '@/components/layout/Header';
import MenuSidebar from '@/components/layout/menu-sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FilterProps } from '@/types';





const Home = () => {

  return (
    <>
    <Header page='home' heading='Home' /> 
    <MenuSidebar />

    <CategoriesLinksSwipper />
    <div className='home container'>
      <ProgressNav page='home' category='no category' item='no item'/>
      <HomeCover />
      <HomeOffers />
      <HomeOuter />
      <Electronics />
      <EasyRrquest />
      <RecomendedItem />
      <ExtraServices />
      <Suppliers />
      <Subscribe />
    </div>
    </>
  )
}

export default Home
