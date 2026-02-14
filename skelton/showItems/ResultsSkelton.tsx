import React from 'react'

const ResultsSkelton = () => {
  return (
    <div className="product-results">
        {Array.from({ length: 6 }).map((_, index) => (
            <article key={index} className="broweserd-product">
                <div className="img-wrapper in-list skelton-shimmer" style={{ width: '150px', height: '150px', borderRadius: '6px' }} />
                <div className="img-wrapper in-grid skelton-shimmer" style={{ width: '100%', height: '202px', borderRadius: '6px' }} />
                
                <div className="product__info" style={{ flex: 1 }}>
                    <div className="skelton-shimmer in-list" style={{ width: '70%', height: '20px', marginBottom: '15px' }} />
                    
                    <div className="top">
                        <div className="right">
                            <div className="price" style={{ marginBottom: '12px' }}>
                                <div className="skelton-shimmer" style={{ width: '80px', height: '24px', display: 'inline-block', marginRight: '10px' }} />
                                <div className="skelton-shimmer" style={{ width: '60px', height: '20px', display: 'inline-block' }} />
                            </div>

                            <div className="ratings-else" style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                <div className="skelton-shimmer" style={{ width: '100px', height: '16px' }} />
                                <div className="skelton-shimmer" style={{ width: '60px', height: '16px' }} />
                            </div>
                        </div>
                    </div>

                    <div className="desc-in-list in-list" style={{ marginTop: '10px' }}>
                        <div className="skelton-shimmer" style={{ width: '100%', height: '14px', marginBottom: '8px' }} />
                        <div className="skelton-shimmer" style={{ width: '90%', height: '14px', marginBottom: '8px' }} />
                    </div>

                    <div className="title_desc-in-grid in-grid" style={{ marginTop: '10px' }}>
                        <div className="skelton-shimmer" style={{ width: '100%', height: '16px', marginBottom: '8px' }} />
                        <div className="skelton-shimmer" style={{ width: '60%', height: '14px' }} />
                    </div>
                    
                    <div className="skelton-shimmer in-list" style={{ width: '100px', height: '35px', marginTop: '15px', borderRadius: '6px' }} />
                </div>
            </article>
        ))}
    </div>
  )
}

export default ResultsSkelton
