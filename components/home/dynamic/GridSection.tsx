'use client';

import { ProductProps } from '@/types';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { Locale } from '@/types';
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import ProductCard from '@/components/general/ProductCard';

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
                
                {/* Dynamically display show ALL if user is scrolling sections */}
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
            </div>
            
            {(!config.displayType || config.displayType === 'grid') ? (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: `repeat(${config.layout?.columns || 5}, 1fr)`,
                    gap: '25px',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '0 30px'
                }}>
                    {products.map((product: any, idx: number) => (
                        <div key={`${product._id || product.static_id || 'card'}-${idx}`}>
                            <ProductCard product={product} locale={locale} sectionKey={section.key} config={config} index={idx} />
                        </div>
                    ))}
                </div>
            ) : config.displayType === 'one-line' ? (
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 30px', overflow: 'hidden' }}>
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={25}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: config.layout?.columns || 5 }
                        }}
                    >
                        {products.map((product: any, idx: number) => (
                            <SwiperSlide key={`slide1-${product._id || product.static_id || idx}-${idx}`} style={{height: 'auto', display: 'flex'}}>
                                <ProductCard product={product} locale={locale} sectionKey={section.key} config={config} index={idx} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 30px', overflow: 'hidden' }}>
                    <Swiper
                        modules={[Grid]}
                        slidesPerView={2}
                        grid={{ rows: 2, fill: 'row' }}
                        spaceBetween={25}
                        breakpoints={{
                            640: { slidesPerView: 3, grid: { rows: 2, fill: 'row' } },
                            1024: { slidesPerView: config.layout?.columns || 5, grid: { rows: 2, fill: 'row' } }
                        }}
                    >
                        {products.map((product: any, idx: number) => (
                            <SwiperSlide key={`slide2-${product._id || product.static_id || idx}-${idx}`} style={{height: 'auto', display: 'flex', marginTop: '15px'}}>
                                <ProductCard product={product} locale={locale} sectionKey={section.key} config={config} index={idx} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </section>
    );
}

export default GridSection;
