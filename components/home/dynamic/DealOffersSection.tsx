'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import Link from 'next/link';
import { useLang } from '@/context/LangContext'

interface DealOffersSectionProps {
  section: any;
}

const DealOffersSection = ({ section }: DealOffersSectionProps) => {
  const { lang, translate } = useLang();
  
  const titleObj = section.title || {};
  const currentTitle = titleObj[lang] || titleObj.en || '';
  const subtitleObj = section.subtitle || {};
  const currentSubtitle = subtitleObj[lang] || subtitleObj.en || '';

  const { endAt, badgeText } = section.config || {};
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
  });

  // Fetch deal offers data
  useEffect(() => {
    const fetchDealOffers = async () => {
      console.log('Fetching deal offers for DealOffersSection...');
      try {
        const response = await fetch('/api/deal-offers-direct');
        const data = await response.json();
        console.log('Deal offers data received:', data);
        setProducts(data.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching deal offers:', error);
        setLoading(false);
      }
    };

    fetchDealOffers();
  }, []);

  useEffect(() => {
    if (!endAt) return;
    const endDate = new Date(endAt).getTime();
    
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
            clearInterval(interval);
            return;
        }

         setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
         });
    }, 1000);

    return () => clearInterval(interval);
  }, [endAt]);

  if (loading) {
      return <div>Loading deals...</div>;
  }

  if (!products || products.length === 0) {
      return <div>No deals available</div>;
  }

  return (
    <section className='home-offers' style={{ 
        padding: '20px 0',
        backgroundColor: '#f8f9fa'
    }}>
        <div className='intro' style={{ 
            textAlign: 'center',
            marginBottom: '30px',
            maxWidth: '800px',
            margin: '0 auto 30px auto',
            padding: '0 20px'
        }}>
            <div className='text'>
                <h2 style={{ 
                    fontSize: '32px', 
                    fontWeight: '700', 
                    marginBottom: '10px',
                    color: '#333'
                }}>{currentTitle}</h2>
                <p style={{ 
                    fontSize: '16px', 
                    color: '#666',
                    marginBottom: '20px'
                }}>{currentSubtitle}</p>
            </div>
            {timeLeft.days > 0 && (
                <div className='timer' style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '15px',
                    marginTop: '20px'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{
                            display: 'block',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#ff6b6b',
                            background: '#fff',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>{String(timeLeft.days).padStart(2, '0')}</span>
                        <span style={{ 
                            display: 'block',
                            fontSize: '12px',
                            color: '#666',
                            marginTop: '5px'
                        }}>Days</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{
                            display: 'block',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#ff6b6b',
                            background: '#fff',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span style={{ 
                            display: 'block',
                            fontSize: '12px',
                            color: '#666',
                            marginTop: '5px'
                        }}>Hours</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{
                            display: 'block',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#ff6b6b',
                            background: '#fff',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span style={{ 
                            display: 'block',
                            fontSize: '12px',
                            color: '#666',
                            marginTop: '5px'
                        }}>Minutes</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{
                            display: 'block',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#ff6b6b',
                            background: '#fff',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span style={{ 
                            display: 'block',
                            fontSize: '12px',
                            color: '#666',
                            marginTop: '5px'
                        }}>Seconds</span>
                    </div>
                </div>
            )}
        </div>

        <div className='offers' style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px'
        }}>
            {products.map((product: any) => (
                <div key={product.static_id} className='offer-card' style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {/* Product Image */}
                    <div style={{ 
                        position: 'relative', 
                        height: '200px',
                        overflow: 'hidden'
                    }}>
                        <Image 
                            src={product.image ? (product.image.startsWith('/') ? product.image : '/' + product.image).replace(/\.jpg$/, '').replace(/\.jpeg$/, '').replace(/\.png$/, '').replace(/\.webp$/, '') + '.webp' : '/placeholder.jpg'} 
                            alt={product.title || 'Product'} 
                            fill
                            style={{ 
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease'
                            }}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder.jpg';
                            }}
                        />
                        
                        {/* Discount Badge */}
                        {product.discount && (
                            <span style={{
                                position: 'absolute',
                                top: '10px',
                                left: '10px',
                                background: '#ff6b6b',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                zIndex: 1
                            }}>
                                {product.discount}
                            </span>
                        )}
                        
                        {/* Limited Time Badge */}
                        {product.badge === 'limited' && (
                            <span style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: '#ff4444',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                zIndex: 1,
                                animation: 'pulse 2s infinite'
                            }}>
                                Limited Time
                            </span>
                        )}
                    </div>
                    
                    {/* Product Info */}
                    <div style={{ 
                        padding: '15px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {/* Title */}
                        <h3 style={{ 
                            fontSize: '16px', 
                            fontWeight: '600', 
                            color: '#333',
                            marginBottom: '8px',
                            lineHeight: '1.4'
                        }}>
                            {product.title}
                        </h3>
                        
                        {/* Star Rating */}
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            marginBottom: '8px'
                        }}>
                            <div style={{ 
                                display: 'flex',
                                color: '#ffa500',
                                fontSize: '14px'
                            }}>
                                {'star'.repeat(Math.floor(product.avgRating || 0))}
                            </div>
                            <span style={{ 
                                fontSize: '12px', 
                                color: '#666',
                                marginLeft: '5px'
                            }}>
                                ({product.ratings || 0})
                            </span>
                        </div>
                        
                        {/* Price */}
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            marginBottom: '12px',
                            gap: '8px'
                        }}>
                            <span style={{
                                fontSize: '20px',
                                fontWeight: '700',
                                color: '#ff6b6b'
                            }}>
                                ${product.price || 0}
                            </span>
                            {product.oldPrice && product.oldPrice > product.price && (
                                <span style={{
                                    fontSize: '16px',
                                    color: '#999',
                                    textDecoration: 'line-through'
                                }}>
                                    ${product.oldPrice}
                                </span>
                            )}
                        </div>
                        
                        {/* Action Buttons */}
                        <div style={{ 
                            display: 'flex',
                            gap: '10px',
                            marginTop: 'auto'
                        }}>
                            <button style={{
                                background: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '12px 16px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease',
                                flex: 1
                            }}>
                                Add to Cart
                            </button>
                            <button style={{
                                background: 'transparent',
                                color: '#666',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}>
                                heart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default DealOffersSection;
