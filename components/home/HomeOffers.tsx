'use client'
import React from 'react'

import OffersSwiper from './OffersSwiper'
import { useLang } from '@/context/LangContext'

import { dictionaries } from '@/lib/dictionaries'

const HomeOffers = () => {
  const { translate } = useLang();
  
  return (
    <section className='home-offers'>
        <div className='intro'>
            <div className='text'>
                <h2>{translate(dictionaries.homeOffers.dealsAndOffers)}</h2>
                <p>{translate(dictionaries.homeOffers.hygieneEquipments)}</p>
            </div>
            <div className='time'>
                <article className='days'>
                    <p>04</p>
                    <h3>{translate(dictionaries.homeOffers.days)}</h3>
                </article>
                <article>
                    <p>13</p>
                    <h3>{translate(dictionaries.homeOffers.hour)}</h3>
                </article>
                <article>
                    <p>34</p>
                    <h3>{translate(dictionaries.homeOffers.min)}</h3>
                </article>
                <article>
                    <p>56</p>
                    <h3>{translate(dictionaries.homeOffers.sec)}</h3>
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