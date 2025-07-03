import React from 'react'
import OffersSwiper from './OffersSwiper'

const HomeOffers = () => {
  return (
    <section className='home-offers'>
        <div className='intro'>
            <div className='text'>
                <h2>Deals and offers</h2>
                <p>Hygiene equipments</p>
            </div>
            <div className='time'>
                <article className='days'>
                    <p>04</p>
                    <h3>Days</h3>
                </article>
                <article>
                    <p>13</p>
                    <h3>Hour</h3>
                </article>
                <article>
                    <p>34</p>
                    <h3>Min</h3>
                </article>
                <article>
                    <p>56</p>
                    <h3>Sec</h3>
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