'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { dictionaries } from "@/lib/dictionaries";

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
  const { lang, translate } = useLang();
  
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
                  href={`/${lang}/showCategories/${category}`}
                  className="block !m-auto"
                >
                  {translate(dictionaries.homeCover.categories[category as keyof typeof dictionaries.homeCover.categories] || category)}
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