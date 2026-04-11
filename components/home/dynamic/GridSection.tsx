'use client';

import { ProductProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import BrowserProduct from '../../general/BrowserProduct';
import { sTranslate } from '@/utilities/translate';
import { Locale } from '@/types';
import Icon from '@/components/ui/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

interface GridSectionProps {
  section: any;
  locale: Locale;
}

const GridSection = ({ section, locale }: GridSectionProps) => {
    const [products, setProducts] = useState(section.products || []);
    const [loading, setLoading] = useState(false);
    const config = section.config || {};
    
    const titleObj = section.title || {};
    const currentTitle = titleObj[locale] || titleObj.en || '';

    // Fetch data if products array is empty
    useEffect(() => {
        if (section.products && section.products.length === 0) {
            const fetchProducts = async () => {
                setLoading(true);
                try {
                    let apiUrl = '';
                    if (section.key === 'home-consumer') {
                        apiUrl = '/api/home-consumer-direct';
                    } else if (section.key === 'home-outdoor') {
                        apiUrl = '/api/home-outdoor-direct';
                    } else if (section.key === 'recommended-items') {
                        apiUrl = '/api/recommended-items-direct';
                    }
                    
                    if (apiUrl) {
                        console.log(`Fetching ${section.key} data...`);
                        const response = await fetch(apiUrl);
                        const data = await response.json();
                        setProducts(data.data || []);
                    }
                } catch (error) {
                    console.error(`Error fetching ${section.key} data:`, error);
                } finally {
                    setLoading(false);
                }
            };
            
            fetchProducts();
        }
    }, [section.key, section.products]);

    if (loading) {
        return <div>Loading {section.key}...</div>;
    }

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <section className='recomended-items' style={{ 
            padding: '40px 0',
            backgroundColor: '#ffffff'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1400px',
                margin: '0 auto 30px',
                padding: '0 30px'
            }}>
                {currentTitle ? <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: '700', 
                    margin: 0,
                    color: '#2c3e50',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>{currentTitle}</h2> : <div></div>}
                
                {(section.key === 'recommended-items' || section.key === 'home-consumer' || section.key === 'home-outdoor') && (
                    <Link href={`/${locale}/${section.key}`} style={{
                        background: 'linear-gradient(135deg, #ff9800, #f57c00)',
                        color: 'white',
                        padding: '10px 24px',
                        borderRadius: '25px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        boxShadow: '0 4px 10px rgba(255, 152, 0, 0.3)',
                        transition: 'all 0.3s ease'
                    }}>
                        Show ALL
                    </Link>
                )}
            </div>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(${config.layout?.columns || 5}, 1fr)`,
                gap: '25px',
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 30px'
            }}>
                {
                    products.map((product: any) => {
                        return (
                            <div key={product.static_id} className='product-card' style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                border: '1px solid #f0f0f0',
                                position: 'relative'
                            }}>
                                {/* Product Image Container */}
                                <div style={{ 
                                    position: 'relative', 
                                    height: '220px',
                                    overflow: 'hidden',
                                    backgroundColor: '#fafafa'
                                }}>
                                    <Image 
                                        src={product.image ? (product.image.startsWith('/') || product.image.startsWith('http') ? product.image : `/${product.image}`).replace(/\.jpg$/, '') + '.webp' : '/placeholder.jpg'} 
                                        alt={product.title || 'Product'} 
                                        fill
                                        style={{ 
                                            objectFit: 'contain',
                                            transition: 'transform 0.4s ease',
                                            padding: '20px'
                                        }}
                                        onError={(e) => {
                                            // Fallback to placeholder if image fails to load
                                            const target = e.target as HTMLImageElement;
                                            target.src = '/placeholder.jpg';
                                        }}
                                    />
                                    
                                    {/* Discount Badge */}
                                    {product.discount && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '15px',
                                            left: '15px',
                                            background: 'linear-gradient(135deg, #ff6b6b, #ff5252)',
                                            color: 'white',
                                            padding: '6px 12px',
                                            borderRadius: '25px',
                                            fontSize: '11px',
                                            fontWeight: '700',
                                            zIndex: 1,
                                            boxShadow: '0 2px 8px rgba(255,107,107,0.3)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>
                                            {product.discount}
                                        </div>
                                    )}
                                    
                                    {/* Action Toggle Top-Right Button */}
                                    {section.key === 'home-consumer' || section.key === 'home-outdoor' ? (
                                        <button style={{
                                            position: 'absolute',
                                            top: '15px',
                                            right: '15px',
                                            background: 'rgba(255,255,255,0.95)',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '36px',
                                            height: '36px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            zIndex: 10,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            <FontAwesomeIcon icon={faCartArrowDown} style={{ color: '#666', fontSize: '18px' }} />
                                        </button>
                                    ) : (
                                        <Link href={`/${locale}/itemDetails/${product.category?.en || section.key}/${product.static_id}`} style={{
                                            position: 'absolute',
                                            top: '15px',
                                            right: '15px',
                                            background: 'rgba(255,255,255,0.95)',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '36px',
                                            height: '36px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            zIndex: 10,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                            transition: 'all 0.3s ease',
                                            textDecoration: 'none'
                                        }}>
                                            <FontAwesomeIcon icon={faEye} style={{ color: '#666', fontSize: '18px' }} />
                                        </Link>
                                    )}
                                    
                                    {/* Add to Wishlist */}
                                    <button style={{
                                        position: 'absolute',
                                        bottom: '15px',
                                        right: '15px',
                                        background: 'rgba(255,255,255,0.95)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '36px',
                                        height: '36px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        zIndex: 1,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <FontAwesomeIcon icon={faHeart} style={{ color: '#666', fontSize: '18px' }} />
                                    </button>
                                </div>
                                
                                {/* Product Info */}
                                <div style={{ 
                                    padding: '20px',
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: '#ffffff'
                                }}>
                                    {/* Brand */}
                                    {product.brand && (
                                        <div style={{
                                            fontSize: '11px',
                                            color: '#999',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            fontWeight: '600',
                                            marginBottom: '8px'
                                        }}>
                                            {product.brand}
                                        </div>
                                    )}
                                    
                                    {/* Title */}
                                    <h3 style={{ 
                                        fontSize: '15px', 
                                        fontWeight: '600', 
                                        color: '#2c3e50',
                                        marginBottom: '12px',
                                        lineHeight: '1.4',
                                        height: '42px',
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical'
                                    }}>
                                        {sTranslate(product.title, locale)}
                                    </h3>
                                    
                                    {/* Rating */}
                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        marginBottom: '12px',
                                        gap: '8px'
                                    }}>
                                        <div style={{ 
                                            display: 'flex',
                                            color: '#ffa500',
                                            fontSize: '13px'
                                        }}>
                                            {Array.from({ length: Math.floor(product.avgRating || 0) }, (_, i) => (
                                                <Icon key={`${product.static_id}-filled-${i}`} name="star" size={13} color="#ffa500" filled={true} />
                                            ))}
                                            {Array.from({ length: 5 - Math.floor(product.avgRating || 0) }, (_, i) => (
                                                <Icon key={`${product.static_id}-empty-${i}`} name="star-empty" size={13} color="#ddd" filled={false} />
                                            ))}
                                        </div>
                                        <span style={{ 
                                            fontSize: '12px', 
                                            color: '#999',
                                            fontWeight: '500'
                                        }}>
                                            ({product.ratings || 0})
                                        </span>
                                    </div>
                                    
                                    {/* Price Section */}
                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '15px',
                                        gap: '8px'
                                    }}>
                                        <div>
                                            <span style={{
                                                fontSize: '20px',
                                                fontWeight: '700',
                                                color: '#2c3e50'
                                            }}>
                                                ${product.price || 0}
                                            </span>
                                            {product.oldPrice && product.oldPrice > product.price && (
                                                <span style={{
                                                    fontSize: '14px',
                                                    color: '#999',
                                                    textDecoration: 'line-through',
                                                    marginLeft: '8px'
                                                }}>
                                                    ${product.oldPrice}
                                                </span>
                                            )}
                                        </div>
                                        
                                        {/* Free Delivery Badge */}
                                        {product.free_delivery && (
                                            <span style={{
                                                fontSize: '10px',
                                                color: '#4CAF50',
                                                background: '#e8f5e8',
                                                padding: '3px 6px',
                                                borderRadius: '12px',
                                                fontWeight: '600'
                                            }}>
                                                FREE
                                            </span>
                                        )}
                                    </div>
                                    
                                    {/* Action Button: Add to Cart vs Show Details */}
                                    {section.key === 'home-consumer' || section.key === 'home-outdoor' ? (
                                        <Link href={`/${locale}/itemDetails/${product.category?.en || section.key}/${product.static_id}`} style={{
                                            background: 'linear-gradient(135deg, #2196F3, #1976D2)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            padding: '12px 20px',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            marginTop: 'auto',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            display: 'block',
                                            textAlign: 'center',
                                            boxShadow: '0 2px 8px rgba(33,150,243,0.3)',
                                            textDecoration: 'none',
                                            position: 'relative',
                                            zIndex: 10
                                        }}>
                                            Show Details
                                        </Link>
                                    ) : (
                                        <button style={{
                                            background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            padding: '12px 20px',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            marginTop: 'auto',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            boxShadow: '0 2px 8px rgba(76,175,80,0.3)',
                                            position: 'relative',
                                            zIndex: 10
                                        }}>
                                            Add to Cart
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
}

export default GridSection;
