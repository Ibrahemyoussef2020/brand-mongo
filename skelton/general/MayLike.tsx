import React from 'react'

const MayLikeSkelton = () => {
    return (
        <div className="may-like right">
            <h2 className="skelton-shimmer" style={{ width: '120px', height: '20px', marginBottom: '14px' }}></h2>
            <div className="products-wrapper">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="skelton-item" style={{ display: 'flex', gap: '11px', marginBottom: '1rem' }}>
                        <div className="img-wrapper skelton-shimmer" style={{ width: '80px', height: '80px', borderRadius: '6px' }} />
                        <div className="info" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div className="skelton-shimmer" style={{ width: '140px', height: '16px', marginBottom: '8px' }} />
                            <div className="skelton-shimmer" style={{ width: '100px', height: '14px' }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MayLikeSkelton
