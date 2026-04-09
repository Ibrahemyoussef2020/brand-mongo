'use client';

import { ProductProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import BrowserProduct from '../../general/BrowserProduct';
import { sTranslate } from '@/utilities/translate';
import { Locale } from '@/types';

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
        <section className='recomended-items' style={{ gridTemplateColumns: `repeat(${config.layout?.columns || 5}, 1fr)` }}>
            {currentTitle && <h2>{currentTitle}</h2>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                {
                    products.map((product: any) => {
                        let imgSrc = product.image;
                        if (imgSrc) {
                            if (!imgSrc.startsWith('http')) {
                                if (!imgSrc.startsWith('/')) {
                                    imgSrc = `/${imgSrc}`;
                                }
                                if (!imgSrc.endsWith('.webp') && !imgSrc.includes('.png') && !imgSrc.includes('.jpg')) {
                                    imgSrc = `${imgSrc}.webp`;
                                }
                            }
                        } else {
                            imgSrc = '/images/default.webp';
                        }
                        
                        return <article key={product._id} style={{ flex: '1 1 200px' }}>
                            <div className='broweserd-product' style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                                <div className='img-wrapper' style={{ width: '150px', height: '150px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        src={imgSrc}
                                        style={{ objectFit: "contain" }}
                                        fill
                                        alt={product.title?.en || ''}
                                        sizes='100%'
                                    />
                                </div>
                                <div style={{ textAlign: 'center', marginTop: '10px', width: '100%' }}>
                                    {config.showPrice !== false && (
                                        <p>
                                            ${product.price}
                                            {product.oldPrice && <span style={{ textDecoration: 'line-through', color: '#8b96a5', marginLeft: '5px', fontSize: '12px' }}>${product.oldPrice}</span>}
                                        </p>
                                    )}
                                    <h3 style={{ fontSize: '15px', fontWeight: '500', color: '#1c1c1c' }}>{sTranslate(product.title, locale).slice(0, 20)} {product.badge?.en ? `, ${product.badge.en}` : ''}</h3>
                                </div>

                                <BrowserProduct section='dynamicGridSection' productId={product.static_id} />
                            </div>
                        </article> 
                    })
                }
            </div>
        </section>
    );
}

export default GridSection;
