import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BothHomeElectricSwiper from './BothHomeElectricSwiper'

const Electronics = () => {
  return (
    <section className='outer-electric' id="electric">
        <div className='intro'>
            <div className='external-heading'>
                <h2>Consumer electronics</h2>
            </div>
            <div className='img-wrapper'>
                <div className='text'>
                    <h2>Consumer<br/> electronics and<br/> gadgets</h2>
                    <Link className='source' href='/showCategories/home-sections' target='_blank'>Source now</Link>  
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