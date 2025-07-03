'use client';

import Image from 'next/image'
import React from 'react'
import { Navigation } from 'swiper/modules'
import { SwiperSlide,Swiper } from 'swiper/react'

import "swiper/css";
import "swiper/css/navigation";
import { ProductProps } from '@/types'

interface props{
    product:ProductProps
}

const DetailsSmallSlider = ({product}:props) => {
  return (
    <div>
    <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
        570: {
            // slidesPerView: 5,
        }
        }}
        >
            <SwiperSlide
              className="custom-slide"
            >
              <div className="img-wrapper"> 
                <Image
                    src={`/${product.image}.webp`}
                    height={200}
                    width={200}
                    alt=""
                />
              </div> 
            </SwiperSlide>
            <SwiperSlide
              className="custom-slide"
            >
              <div className="img-wrapper"> 
                <Image
                    src={`/${product.image}.webp`}
                    height={200}
                    width={200}
                    alt=""
                />
              </div> 
            </SwiperSlide>
            <SwiperSlide
              className="custom-slide"
            >
              <div className="img-wrapper"> 
                <Image
                    src={`/${product.image}.webp`}
                    height={200}
                    width={200}
                    alt=""
                />
              </div> 
            </SwiperSlide>
    </Swiper>
    </div>
  )
}

export default DetailsSmallSlider