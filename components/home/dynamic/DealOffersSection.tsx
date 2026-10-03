'use client'

import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from "swiper/react";

//import "swiper/css";

import Image from "next/image";
import Link from 'next/link';
import { useLang } from '@/context/LangContext'
import DealCard from './DealCard';
import HomeOffersSkelton from '@/skelton/home/HomeOffers';

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
    const [products, setProducts] = useState(section.products || []);
    const [loading, setLoading] = useState(!section.products || section.products.length === 0);

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Fetch deal offers data ONLY if not already provided by server
    useEffect(() => {
        if (section.products && section.products.length > 0) {
            setProducts(section.products);
            setLoading(false);
            return;
        }

        const fetchDealOffers = async () => {
            try {
                const response = await fetch('/api/deal-offers-direct');
                const data = await response.json();
                setProducts(data.data || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching deal offers:', error);
                setLoading(false);
            }
        };

        fetchDealOffers();
    }, [section.products]);

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
        return <HomeOffersSkelton />;
    }

    if (!products || products.length === 0) {
        return <div>No deals available</div>;
    }

    return (
        <section>
            <div className='home-offers'>
                <div className='intro' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', margin: '0px' }}>
                    <div className='text'>
                        <h2>{currentTitle}</h2>
                        <p>{currentSubtitle}</p>
                    </div>
                    {endAt && (
                        <div className='time'>
                            <article className='days'>
                                <p>{timeLeft.days.toString().padStart(2, '0')}</p>
                                <h3>Days</h3>
                            </article>
                            <article>
                                <p>{timeLeft.hours.toString().padStart(2, '0')}</p>
                                <h3>Hour</h3>
                            </article>
                            <article>
                                <p>{timeLeft.minutes.toString().padStart(2, '0')}</p>
                                <h3>Min</h3>
                            </article>
                            <article>
                                <p>{timeLeft.seconds.toString().padStart(2, '0')}</p>
                                <h3>Sec</h3>
                            </article>
                        </div>
                    )}
                </div>
                <div className='product'>
                    <div className="deals-scroll-x">
                        {products.map((product: any, idx: number) => (
                            <div key={`${product._id || product.static_id || idx}-${idx}`} className="deal-card-item">
                                <DealCard
                                    product={product}
                                    locale={lang as any}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Link href={`/${lang}/deal-offers`} style={{
                background: 'linear-gradient(135deg, #ff9800, #f57c00)',
                color: 'white',
                padding: '10px 24px',
                borderRadius: '25px',
                fontWeight: '700',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 4px 10px rgba(255, 152, 0, 0.3)',
                transition: 'all 0.3s ease',
                margin: '20px 0 20px ',
                display: 'block',
                maxWidth: 'fit-content',
            }}>
                {lang === 'ar' ? 'عرض الكل' : 'Show All'}
            </Link>

        </section>
    )

}



export default DealOffersSection;

