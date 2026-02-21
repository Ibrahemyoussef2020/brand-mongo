'use client'
import Image from 'next/image'

import Link from 'next/link'
import React from 'react'
import BothHomeElectricSwiper from './BothHomeElectricSwiper'
import { useLang } from '@/context/LangContext'

import { dictionaries } from '@/lib/dictionaries'

const Electronics = () => {
  const { translate, lang } = useLang();
  
  return (
    <section className='outer-electric' id="electric">
        <div className='intro'>
            <div className='external-heading'>
                <h2>{translate(dictionaries.electronics.heading)}</h2>
            </div>
            <div className='img-wrapper'>
                <div className='text'>
                    <h2>{translate(dictionaries.electronics.heading)}</h2>
                    <Link className='source' href={`/${lang}/homeConsumer`}>{translate(dictionaries.common.sourceNow)}</Link>  
                </div>
                <Image
                    src='/images/consumer-electronics.webp'
                    alt=''
                    height={257}
                    width={280}
                />
            </div>
        </div>
        <div className='products'>
            <BothHomeElectricSwiper section='homeConsumer'  />
        </div>
    </section>
  )
}


export default Electronics