'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { showProducts } from "@/app/apis";
import { ProductProps } from "@/types";
import Image from "next/image";
import BrowserProduct from "../general/BrowserProduct";
import { fetchAllProducts } from "@/lib/services";



const OffersSwiper = () => {

  const [products, setProducts] = useState<ProductProps[] | []>([]);


  const fetchAllProductsFn = async () => {
    const data = await fetchAllProducts('deelOffers')
    console.log(data.data)
    setProducts(data.data)
  }


  useEffect(() => {
    fetchAllProductsFn();

    console.log(products)
  }, [])




  return (
    <div className="offers-swiper">
      <div className="container">
        <Swiper
          slidesPerView={3}
          loop={true}
          className="wraper-center h-[250px]"
          breakpoints={{
            570: {
              //  slidesPerView: 3,
            },
          }}
        >
          {products?.map((product: ProductProps, i: number) => {

            return (
              <SwiperSlide
                key={product._id + '' + product.image + '' + product.static_id + Math.random()}
                className="broweserd-product"
              >
                <div
                  className="item-container"
                >
                  <Image
                    src={`/${product.image}.webp`}
                    height={98}
                    width={98}
                    alt=""
                  />
                  <p>{product.title}</p>
                  <div>
                    <span>{product.discount}</span>
                  </div>
                  <BrowserProduct section='deelOffers' productId={product.static_id} /> 
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default OffersSwiper