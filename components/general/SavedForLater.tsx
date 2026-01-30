'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { ProductProps } from "@/types";
import Image from "next/image";
import BrowserProduct from "../general/BrowserProduct";
import { useEffect, useState } from "react";
import { showProducts } from "@/app/apis";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromFavStore } from "@/redux/slices";
import AddRemoveCart from "./AddRemoveCart";
import { IRootState } from "@/redux/store";


interface props {
    category:string,
    title:string
}

const SavedForLater = () => {
   
const {favorites} = useSelector((state:IRootState) => state.combine.fav);
const dispatch = useDispatch()


const handleAddToCart = (product:ProductProps)=>{
  dispatch(addToCart(product));
  dispatch(removeFromFavStore(product._id))
}

 if (favorites?.length) {
  return (
    <>
    <section className="saved-for-later large-screens">
      <div className="swiper-wapper">
       <h2>Saved for later</h2>
        <Swiper
        slidesPerView={2}
        loop={true}
        className="custom-swiper"
        breakpoints={{
          570: {
            slidesPerView: 2,
          },
        }}
      >
      <div className="products">
          {
              favorites.map((product:ProductProps) => {
                const details = `${product.title} ${product.description}`

                return <SwiperSlide
                key={product._id}
                className="custom-slide"
              >
            
            <article style={{height:"370px"}}>
                <Image
                    src={`/${product.image}.webp`}
                    alt=""
                    height={194}
                    width={194}
                />
                <div className="text">
                    <p className="price">${product.price}</p>
                    <p className="title-desc">{details.slice(0,37)}...</p>
                    <div className="type-color">
                      <span>{product.section} -</span>
                      <span> {product.color.slice(0,10)}</span>
                    </div>
                </div>
                <AddRemoveCart product={product} process="add-from-fav-lg" />
            </article>
            </SwiperSlide>
              })
          }
      </div>
        </Swiper>
      </div>
    </section>  

    {/************* small screen ***************/}

      <section className="saved-for-later small-screens">
          <h2>Saved for later</h2>
          {
                  
              favorites?.map((product:ProductProps) => {
                  const details = `${product.title} ${product.description}`

                  return <article key={product._id}>
                      <div className="articel-wrapper">
                          <div className="img-wrapper">
                              <Image
                                  src={`/${product.image}.webp`}
                                  alt=""
                                  height={60}
                                  width={60}
                              />
                          </div>
                          <div className="details">
                              <h3>{details.slice(0,27)}</h3>
                              <p>$00.{product.price}</p>
                              <div className="buttons">
                                  <AddRemoveCart product={product} process="add-from-fav-sm" />
                                  <button className="remove" onClick={()=> dispatch(removeFromFavStore(product._id))}>Remove</button>
                              </div>
                          </div>
                      </div>
                  </article>
              })
          }
      
      </section>
    </>  
  )
 }else{
  return ''
 }
}

export default SavedForLater