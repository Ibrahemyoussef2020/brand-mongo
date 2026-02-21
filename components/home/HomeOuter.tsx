'use client'
import Image from 'next/image'

import Link from 'next/link'
import React from 'react'
import BothHomeElectricSwiper from './BothHomeElectricSwiper'
import { useLang } from '@/context/LangContext'

import { dictionaries } from '@/lib/dictionaries'

const HomeOuter = () => {
  const { translate, lang } = useLang();
  
  return (
    <section className='outer-electric'>
        <div className='intro'>
            <div className='external-heading'>
                <h2>{translate(dictionaries.homeOuter.heading)}</h2>
            </div>
            <div className='img-wrapper'>
                <div className='text'>
                    <h2>{translate(dictionaries.homeOuter.heading)}</h2>
                    <Link className='source' href={`/${lang}/homeOutdoor`}>{translate(dictionaries.common.sourceNow)}</Link>  
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