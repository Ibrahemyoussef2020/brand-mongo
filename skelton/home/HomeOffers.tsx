import React from 'react'

const HomeOffersSkelton = () => {
  return (
    <section className='home-offers'>
      <div className='intro'>
        <div className='text'>
          <div className='skelton-shimmer' style={{width: '160px', height: '22px', marginBottom: '6px'}} />
          <div className='skelton-shimmer' style={{width: '120px', height: '14px'}} />
        </div>
        <div className='time'>
          {Array.from({ length: 4 }).map((_, i) => (
            <article key={i} className='skelton-shimmer' />
          ))}
        </div>
      </div>
      <div className='product'>
        <div className="offers-swiper">
          <div className="swiper-wrapper">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="swiper-slide broweserd-product skelton-shimmer" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeOffersSkelton
