'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useLang } from '@/context/LangContext'
import BrowserProduct from '../../general/BrowserProduct';

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";

interface InlineStartImageSectionProps {
  section: any;
}

const InlineStartImageSection = ({ section }: InlineStartImageSectionProps) => {
  const { lang, translate } = useLang();
  
  const titleObj = section.title || {};
  const currentTitle = titleObj[lang] || titleObj.en || '';

  const { heroImage, buttonText, buttonHref } = section.config || {};
  const products = section.products || [];

  return (
    <section className='outer-electric'>
        <div className='intro'>
            <div className='external-heading'>
                <h2>{currentTitle}</h2>
            </div>
            <div className='img-wrapper'>
                <div className='text'>
                    <h2>{currentTitle}</h2>
                    <Link className='source' href={`/${lang}${buttonHref}`}>{buttonText}</Link>  
                </div>
                {heroImage && (
                    <Image
                        src={heroImage}
                        alt={currentTitle}
                        height={257}
                        width={280}
                        style={{ objectFit: 'cover' }}
                    />
                )}
            </div>
        </div>
        
        <div className='products'>
           <div className="offers-swiper">
             <div className="container">
                <Swiper
                    modules={[Grid]}
                    slidesPerView={2}
                    grid={{ rows: 2, fill: 'row' }}
                    loop={false}
                    spaceBetween={10}
                    className="wraper-center h-[260px]"
                    breakpoints={{
                      570: {
                        slidesPerView: 4,
                        grid: { rows: 2, fill: 'row' }
                      },
                    }}
                >
                    {products?.map((product: any, idx: number) => {
                        let imgSrc = product.image;
                        
                        if (imgSrc) {
                            if (!imgSrc.startsWith('http')) {
                                if (!imgSrc.startsWith('/')) {
                                    imgSrc = `/${imgSrc}`;
                                }
                                if (!imgSrc.endsWith('.webp') && !imgSrc.includes('.png') && !imgSrc.includes('.webp')) {
                                    imgSrc = `${imgSrc}.webp`;
                                }
                            }
                        } else {
                            imgSrc = '/images/default.webp';
                        }
                        
                        // Extract just the section key part, e.g. /homeOutdoor -> homeOutdoor
                        // To pass to BrowserProduct to match BothHomeElectricSwiper behavior
                        let linkSection = buttonHref?.replace('/', '') || section.key;
                        if (linkSection.startsWith('showCategories/')) {
                            linkSection = linkSection.split('/')[1];
                        }
                        
                        return (
                        <SwiperSlide
                            key={product._id || idx}
                            className="broweserd-product"
                        >
                            <div className="item-container">
                                <div className="img-wrapper"> 
                                    <Image
                                        src={imgSrc}
                                        width={98}
                                        height={98}
                                        alt={product.title?.en || ''}
                                    />
                                </div> 
                                <div className="text-wrapper">
                                    <h3>{translate(product.title)?.slice(0, 15)}</h3>
                                    {product.price && <p>From USD {product.price}</p>}
                                </div>
                                <BrowserProduct section={linkSection} productId={product.static_id} />
                            </div>
                        </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
          </div>
        </div>
        
        <div className="src">
            <Link href={`/${lang}${buttonHref}`}>
                {buttonText}
                <img src="/images/home-arrow.webp" alt="->" />
            </Link>
        </div>
    </section>
  )
}

export default InlineStartImageSection;
