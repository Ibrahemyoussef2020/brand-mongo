'use client';

import { addToFavStore, handleBill, handleProductsQuantity, removeFromCart } from "@/redux/slices"
import { ProductProps } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import DiscountBanner from "../../components/general/DiscountBanner"
import SavedForLater from "../../components/general/SavedForLater"
import PaymentFeatures from '../../components/general/PaymentFeatures';
import ProductRating from "@/components/general/ProductRating";
import { selectDate } from "@/utilities";
import DetailsMayLik from "@/components/general/DetailsMayLik";
import { AppDispatch, IRootState } from "@/redux/store";
import EmptyCart from "../cart/EmptyCart";

const OrderResult = () => {

  const dispatch =useDispatch<AppDispatch>()
  const {purchases} = useSelector((state:IRootState) => state.combine.cart)
  const {products} = useSelector((state:IRootState) => state.combine.cart)
  const router = useRouter()


  

  return  <div className="order-results">

            <h2 className="old-purchases__heading">Your Old Purchases</h2>
        {
          purchases.length ?
            purchases?.map((product:ProductProps,index:number) => {
                    return <article key={product._id + Math.random()}>
                    <div className="img-wrapper">
                        <Image
                        src={`/${product.image}.webp`}
                        alt={product.title}
                        height={200}
                        width={210}
                        />
                    </div>
                    <br/>
                    <div className="product__info">
                        <p className="title">{product.title} <span className="good-item">Very Good Item</span> ,</p>
                        <div className="top">
                            <div className="right">                    
                              <div className="ratings-else">
                                  <ProductRating avgRating={+product.avgRating} />
                                  {product.free_delivery ? <span className="shipping">Free Shipping</span> :         
                                  <span className="shipping">pluse delivery</span>
                                  } 
                              </div>
                            </div>                        
                        </div>
                        <div className="item-info">
                            <h4>Seller</h4><p>{product.brand} Brand</p>
                        </div>
                        <div className="item-info">
                            <h4>Date order</h4><p> {selectDate(1)}</p>
                        </div>
                        <div className="item-info arival-lg">
                            <h4>Arrival between</h4><p className="dates"> {selectDate(2)} <span className="slash"> - </span> </p>  <p className="dates"> {selectDate(3)}</p>
                        </div>
                        <div className="item-info arival-sm">
                            <h4>Arrival in</h4> <p className="dates">Two days</p>
                        </div>
                        {
                          product.has_discount ? 

                          <div className="item-info">
                            <h4>Item price</h4><p>${product.price}.00</p>
                          </div>
                          : null
                        }
                        {
                          !product.free_delivery && product?.deliveryPrice > 0 ? 

                          <div className="item-info">
                            <h4>Deliverry cost</h4><p>${product.deliveryPrice}.00</p>
                          </div>
                          : null
                        }
                        {
                          product?.quantity > 1 ? 

                          <div className="item-info">
                            <h4>Items quantity</h4><p>{product.quantity}</p>
                          </div>
                          : null
                        }
                        <div className="item-info total">
                          <h4>Final cost</h4><p>$.{product.total}.00</p>
                        </div>
                    </div>
                </article>
                
            }) 

            : <EmptyCart />
        }
  </div>
}

export default OrderResult