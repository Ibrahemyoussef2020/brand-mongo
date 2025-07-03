import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BothHomeElectricSwiper from './BothHomeElectricSwiper'

const HomeOuter = () => {
  return (
    <section className='outer-electric'>
        <div className='intro'>
            <div className='external-heading'>
                <h2>Home and outdoor</h2>
            </div>
            <div className='img-wrapper'>
                <div className='text'>
                    <h2>Home and <br/> outdoor</h2>
                    <Link className='source' href='/showResults/home-sections' target='_blank'>Source now</Link>  
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