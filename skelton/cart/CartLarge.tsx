import React from 'react'

const CartLargeSkelton = () => {
  return (
    <div className="large-cart">
      <div className="container container--heading">
        <div className='skelton-shimmer' style={{width: '180px', height: '28px'}} />
      </div>
      <div className="container container--top">
        <div className="cart-discount">
          <div className="cart-body">
            {Array.from({ length: 3 }).map((_, i) => (
              <article key={i} className="skelton-article">
                <div className="left">
                  <div className="img-wrapper skelton-shimmer" style={{width: '80px', height: '80px'}} />
                  <div className="details">
                    <div className='skelton-shimmer' style={{width: '250px', height: '16px', marginBottom: '8px'}} />
                    <div className='skelton-shimmer' style={{width: '200px', height: '14px', marginBottom: '12px'}} />
                    <div className='skelton-shimmer' style={{width: '150px', height: '14px', marginBottom: '12px'}} />
                    <div style={{display: 'flex', gap: '9px'}}>
                      <div className='skelton-shimmer' style={{width: '70px', height: '32px', borderRadius: '6px'}} />
                      <div className='skelton-shimmer' style={{width: '100px', height: '32px', borderRadius: '6px'}} />
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div className='skelton-shimmer' style={{width: '60px', height: '18px', marginBottom: '14px', marginLeft: 'auto'}} />
                  <div className='skelton-shimmer' style={{width: '123px', height: '40px', borderRadius: '6px'}} />
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="buy-card">
          <div className="coupon">
            <div className='skelton-shimmer' style={{width: '130px', height: '16px', marginBottom: '9px'}} />
            <div className='skelton-shimmer' style={{width: '100%', height: '40px', borderRadius: '6px'}} />
          </div>
          <div className="buy-process">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '9px'}}>
                <div className='skelton-shimmer' style={{width: '80px', height: '16px'}} />
                <div className='skelton-shimmer' style={{width: '50px', height: '16px'}} />
              </div>
            ))}
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '22px', marginTop: '12px'}}>
              <div className='skelton-shimmer' style={{width: '50px', height: '20px'}} />
              <div className='skelton-shimmer' style={{width: '70px', height: '20px'}} />
            </div>
            <div className='skelton-shimmer' style={{width: '100%', height: '50px', borderRadius: '6px'}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartLargeSkelton
