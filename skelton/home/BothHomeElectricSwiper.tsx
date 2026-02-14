import React from 'react'

const BothHomeElectricSwiperSkelton = () => {
  return (
    <>
      <div className="offers-swiper">
        <div className="container">
          <div className="swiper-wrapper">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="swiper-slide broweserd-product skelton-card skelton-shimmer" />
            ))}
          </div>
        </div>
      </div>

      <div className="src">
        <div className="skelton-source skelton-shimmer" />
      </div>
    </>
  )
}

export default BothHomeElectricSwiperSkelton
