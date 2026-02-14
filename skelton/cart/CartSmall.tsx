import React from 'react'

const CartSmallSkelton = () => {
  return (
    <div className="small-cart">
      <div className="container">
        <div className="cart-body">
          {Array.from({ length: 3 }).map((_, i) => (
            <article key={i}>
              <div className="article-wrapper">
                <div className="img-wrapper skelton-shimmer" style={{width: '80px', height: '80px'}} />
                <div className="details" style={{flex: 1}}>
                  <div className='skelton-shimmer' style={{width: '80%', height: '16px', marginBottom: '8px'}} />
                  <div className='skelton-shimmer' style={{width: '60%', height: '14px', marginBottom: '8px'}} />
                  <div className='skelton-shimmer' style={{width: '50%', height: '14px'}} />
                </div>
              </div>
              <div className="buttons-price">
                <div style={{display: 'flex', gap: '0px'}}>
                  <div className='skelton-shimmer' style={{width: '40px', height: '40px', borderRadius: '6px 0 0 6px'}} />
                  <div className='skelton-shimmer' style={{width: '70px', height: '40px', borderRadius: '0'}} />
                  <div className='skelton-shimmer' style={{width: '40px', height: '40px', borderRadius: '0 6px 6px 0'}} />
                </div>
                <div className='skelton-shimmer' style={{width: '60px', height: '18px'}} />
              </div>
            </article>
          ))}
        </div>
        <div className="buy-card">
          <div className="coupon">
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
            <div className='skelton-shimmer' style={{width: '100%', height: '46px', borderRadius: '6px'}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartSmallSkelton
