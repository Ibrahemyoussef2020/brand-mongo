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
import { useLang } from "@/context/LangContext";
import { dictionaries } from "@/lib/dictionaries";


const OrderResult = () => {
    const { translate } = useLang();


  const dispatch =useDispatch<AppDispatch>()
  const {purchases} = useSelector((state:IRootState) => state.combine.cart)
  const {products} = useSelector((state:IRootState) => state.combine.cart)
  const router = useRouter()


  

  return  <div className="order-results">

            <h2 className="old-purchases__heading">{translate(dictionaries.orderResults.oldPurchases)}</h2>
        {
          purchases.length ?
            purchases?.map((product:ProductProps,index:number) => {
                    return <article key={product._id + Math.random()}>
                    <div className="img-wrapper">
                        <Image
                        src={`/${product.image}.webp`}
                        alt={translate(product.title)}
                        height={200}
                        width={210}
                        />

                    </div>
                    <br/>
                    <div className="product__info">
                        <p className="title">{translate(product.title)} <span className="good-item">{translate(dictionaries.orderResults.veryGoodItem)}</span> ,</p>

                        <div className="top">
                            <div className="right">                    
                              <div className="ratings-else">
                                  <ProductRating avgRating={+product.avgRating} />
                                  {product.free_delivery ? <span className="shipping">{translate(dictionaries.orderResults.freeShipping)}</span> :         
                                  <span className="shipping">{translate(dictionaries.orderResults.plusDelivery)}</span>
                                  } 
                              </div>
                            </div>                        
                        </div>
                        <div className="item-info">
                            <h4>{translate(dictionaries.orderResults.seller)}</h4><p>{translate(product.brand)} {translate(dictionaries.orderResults.brandSuffix)}</p>
                        </div>

                        <div className="item-info">
                            <h4>{translate(dictionaries.orderResults.dateOrder)}</h4><p> {selectDate(1)}</p>
                        </div>
                        <div className="item-info arival-lg">
                            <h4>{translate(dictionaries.orderResults.arrivalBetween)}</h4><p className="dates"> {selectDate(2)} <span className="slash"> - </span> </p>  <p className="dates"> {selectDate(3)}</p>
                        </div>
                        <div className="item-info arival-sm">
                            <h4>{translate(dictionaries.orderResults.arrivalIn)}</h4> <p className="dates">{translate(dictionaries.orderResults.twoDays)}</p>
                        </div>
                        {
                          product.has_discount ? 

                          <div className="item-info">
                            <h4>{translate(dictionaries.orderResults.itemPrice)}</h4><p>${product.price}.00</p>
                          </div>
                          : null
                        }
                        {
                          !product.free_delivery && product?.deliveryPrice > 0 ? 

                          <div className="item-info">
                            <h4>{translate(dictionaries.orderResults.deliveryCost)}</h4><p>${product.deliveryPrice}.00</p>
                          </div>
                          : null
                        }
                        {
                          product?.quantity > 1 ? 

                          <div className="item-info">
                            <h4>{translate(dictionaries.orderResults.itemsQuantity)}</h4><p>{product.quantity}</p>
                          </div>
                          : null
                        }
                        <div className="item-info total">
                          <h4>{translate(dictionaries.orderResults.finalCost)}</h4><p>$.{product.total}.00</p>
                        </div>
                    </div>
                </article>

            }) 

            : <EmptyCart />
        }
  </div>
}

export default OrderResult