import React from 'react'

const HomeCoverSkelton = () => {
  return (
    <section className='cover-wrapper'>
      <div className='lists'>
        <ul>
          {Array.from({ length: 9 }).map((_, i) => (
            <li key={i}><div className='skelton-list-item skelton-shimmer' /></li>
          ))}
        </ul>
      </div>

      <div className='cover skelton-cover skelton-shimmer' />

      <div className='welcome'>
        <div className='intro'>
          <div className='skelton-user skelton-shimmer' />
          <div className='intro__desc'>
            <div className='skelton-text-sm skelton-shimmer' />
            <div className='skelton-text-xs skelton-shimmer' />
          </div>
          <div className='log'>
            <div className='skelton-btn skelton-shimmer' />
            <div className='skelton-btn skelton-shimmer' />
          </div>
        </div>
        <div className='skelton-offer skelton-shimmer' />
        <div className='skelton-offer skelton-shimmer' />
      </div>
    </section>
  )
}

export default HomeCoverSkelton
