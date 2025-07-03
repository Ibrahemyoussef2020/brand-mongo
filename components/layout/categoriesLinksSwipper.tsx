'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

const categories = [
"mobiles",
"computers",
"appliaces",
"books",
"pets",
"fashion",
"watches",
"cameras",
"chairs",
"dishes",
"headphones",
"kitchen-tools",
]

const CategoriesLinksSwipper = () => {
  
  return (
    <div className="categories-links-swipper">
       <div className="container">
       <Swiper
        slidesPerView={3}
        loop={true}
        spaceBetween={5}
        className="wraper-center h-[250px]"
        breakpoints={{
          570: {
            slidesPerView: 5,
          },
        }}
      >
        {categories?.map((category, i) => {
         
            return (
              <SwiperSlide
                key={category}
                className="py-4 !flex items-center min-w-[300px]  h-[100%]"
              >
                <Link
                  href={`/showResults/${category}`}
                  className="block !m-auto"
                >
                  {category}
                </Link>
              </SwiperSlide>
            );
        })}
      </Swiper>
       </div>
    </div>
  )
}

export default CategoriesLinksSwipper