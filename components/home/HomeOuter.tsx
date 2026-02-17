'use client'
import Image from 'next/image'

import Link from 'next/link'
import React from 'react'
import BothHomeElectricSwiper from './BothHomeElectricSwiper'
import { useLang } from '@/context/LangContext'

const HomeOuter = () => {
  const { lang } = useLang();
  
  return (
    <section className='outer-electric'>
        <div className='intro'>
            <div className='external-heading'>
                <h2>{lang === 'ar' ? 'المنزل والأماكن الخارجية' : 'Home and outdoor'}</h2>
            </div>
            <div className='img-wrapper'>
                <div className='text'>
                    <h2>{lang === 'ar' ? <>المنزل و <br/> الأماكن الخارجية</> : <>Home and <br/> outdoor</>}</h2>
                    <Link className='source' href='/showSections/homeOutdoor'>{lang === 'ar' ? 'تصفح الآن' : 'Source now'}</Link>  
                </div>
                <Image
                    src='/images/home-outer.webp'
                    alt=''
                    height={257}
                    width={280}
                />
            </div>
        </div>
        <div className='products'>
            <BothHomeElectricSwiper section='homeOutdoor'  />
        </div>
    </section>
  )
}


export default HomeOuter