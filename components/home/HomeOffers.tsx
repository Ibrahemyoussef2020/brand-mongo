'use client'
import React from 'react'

import OffersSwiper from './OffersSwiper'
import { useLang } from '@/context/LangContext'

const HomeOffers = () => {
  const { lang } = useLang();
  
  return (
    <section className='home-offers'>
        <div className='intro'>
            <div className='text'>
                <h2>{lang === 'ar' ? 'العروض والخصومات' : 'Deals and offers'}</h2>
                <p>{lang === 'ar' ? 'معدات النظافة' : 'Hygiene equipments'}</p>
            </div>
            <div className='time'>
                <article className='days'>
                    <p>04</p>
                    <h3>{lang === 'ar' ? 'أيام' : 'Days'}</h3>
                </article>
                <article>
                    <p>13</p>
                    <h3>{lang === 'ar' ? 'ساعة' : 'Hour'}</h3>
                </article>
                <article>
                    <p>34</p>
                    <h3>{lang === 'ar' ? 'دقيقة' : 'Min'}</h3>
                </article>
                <article>
                    <p>56</p>
                    <h3>{lang === 'ar' ? 'ثانية' : 'Sec'}</h3>
                </article>
            </div>
        </div>
        <div className='product'>
            <OffersSwiper />
        </div>
    </section>
  )
}


export default HomeOffers