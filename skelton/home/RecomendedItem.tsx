import React from 'react'

const RecomendedItemSkelton = () => {
  return (
    <section className='recomended-items'>
      <div className='skelton-shimmer' style={{width: '200px', height: '24px', marginBottom: '10px'}} />
      <div>
        {Array.from({ length: 5 }).map((_, i) => (
          <article key={i} className='skelton-shimmer skelton-card' />
        ))}
      </div>
    </section>
  )
}

export default RecomendedItemSkelton
