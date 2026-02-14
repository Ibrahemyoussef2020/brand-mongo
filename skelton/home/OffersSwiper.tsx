import React from 'react'

const OffersSwiperSkelton = () => {
  return (
    <div className="offers-swiper">
      <div className="container">
        <div className="swiper-wrapper">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="swiper-slide broweserd-product skelton-shimmer" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OffersSwiperSkelton
