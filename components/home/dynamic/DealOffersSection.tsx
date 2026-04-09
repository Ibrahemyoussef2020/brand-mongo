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
    <section className='home-offers'>
        <div className='intro'>
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
           <div className="offers-swiper">
            <div className="container">
            <Swiper
                slidesPerView={3}
                loop={true}
                className="wraper-center h-[250px]"
                breakpoints={{
                570: { slidesPerView: 5 },
                }}
            >
                {products.map((product: any) => (
                    <SwiperSlide key={product._id} className="py-4 !flex items-center">
                        <Link href={`/${lang}/itemDetails/${product.category?.en || 'deals'}/${product.static_id}`} className="block !m-auto d-flex flex-column align-items-center">
                            <div className="img-wrapper relative" style={{ width: '100px', height: '100px' }}>
                                <Image
                                    src={product.image?.startsWith('http') ? product.image : `/${product.image}.webp`}
                                    fill
                                    alt={product.title?.en || ''}
                                    style={{ objectFit: "contain" }}
                                />
                            </div>
                            <span className="discount-badge" style={{ backgroundColor: '#ffe3e3', color: '#eb001b', padding: '3px 10px', borderRadius: '15px', marginTop: '10px', fontSize: '13px', fontWeight: 'bold' }}>
                                {product.discount?.en || badgeText || '-15%'}
                            </span>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>
           </div>
        </div>
    </section>
  )
}

export default DealOffersSection;
