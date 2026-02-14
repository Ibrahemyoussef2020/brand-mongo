import React from 'react'

const SavedForLaterSkelton = () => {
    return (
        <>
            <section className="saved-for-later large-screens">
                <div className="swiper-wapper">
                    <div className="skelton-shimmer" style={{ width: '150px', height: '22px', margin: '20px 0' }} />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="custom-slide" style={{ border: '1px solid #e0e0e0', padding: '10px', borderRadius: '6px' }}>
                                <div className="skelton-shimmer" style={{ width: '194px', height: '194px', margin: '0 auto 10px' }} />
                                <div className="text">
                                    <div className="skelton-shimmer" style={{ width: '60px', height: '22px', marginBottom: '10px' }} />
                                    <div className="skelton-shimmer" style={{ width: '100%', height: '16px', marginBottom: '5px' }} />
                                    <div className="skelton-shimmer" style={{ width: '80%', height: '15px' }} />
                                </div>
                                <div className="skelton-shimmer" style={{ width: '100%', height: '40px', marginTop: '12px', borderRadius: '6px' }} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="saved-for-later small-screens">
                <div className="skelton-shimmer" style={{ width: '150px', height: '22px', margin: '10px 0 20px' }} />
                {Array.from({ length: 3 }).map((_, i) => (
                    <article key={i} style={{ display: 'flex', gap: '10px', border: '1px solid #e0e0e0', padding: '14px 8px', marginBottom: '8px', borderRadius: '6px' }}>
                        <div className="skelton-shimmer" style={{ width: '80px', height: '80px', borderRadius: '6px' }} />
                        <div className="details" style={{ flex: 1 }}>
                            <div className="skelton-shimmer" style={{ width: '70%', height: '18px', marginBottom: '4px' }} />
                            <div className="skelton-shimmer" style={{ width: '40%', height: '16px', marginBottom: '12px' }} />
                            <div style={{ display: 'flex', gap: '9px' }}>
                                <div className="skelton-shimmer" style={{ width: '60px', height: '30px', borderRadius: '6px' }} />
                                <div className="skelton-shimmer" style={{ width: '60px', height: '30px', borderRadius: '6px' }} />
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </>
    )
}

export default SavedForLaterSkelton
