'use client'
import { decreaseQuantity, handleBill, handleProductsQuantity, increaseQuantity, removeFromCart } from "@/redux/slices"
import { ProductProps } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import DiscountBanner from "../general/DiscountBanner"
import SavedForLater from "../general/SavedForLater"
import PaymentFeatures from "../general/PaymentFeatures"
import { faEllipsisVertical, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ToggleFav from "../general/ToggleFav"
import { useState } from "react"
import { customStringIncludes } from "@/utilities"
import { IRootState } from "@/redux/store"
import EmptyCart from "./EmptyCart"
import { AppDispatch } from "@/redux/store"
import CartSmallSkelton from "@/skelton/cart/CartSmall"
import { useLang } from "@/context/LangContext"
import { dictionaries } from "@/lib/dictionaries"


const CartSmall = () => {
  const { translate } = useLang();
  const [moreList ,setMoreList] = useState<string[]|[]>([])


  const dispatch = useDispatch<AppDispatch>()
  const {products, bill, productCount, status} = useSelector((state:IRootState) => state.combine.cart)
  
  
  const router = useRouter()

 
const handleByProcess = ()=>{
  dispatch(handleBill())
  router.push('/orders')
}

const toggleMoreButtons = (id:string)=>{
  const isIdExist = moreList?.find((item) => item === id);

  if (isIdExist) {
    const newMoreList = moreList.filter(item => item !== id)
    setMoreList(newMoreList)
  }
  else{
    const newMoreList = [...moreList,id]
    setMoreList(newMoreList)
  }
}

  if (status === 'loading' || status === 'idle') {
    return <CartSmallSkelton />;
  }

  return (
    <div className="small-cart">
      <div className="container">
      <div className="cart-body">{    
      
      products.length?
              products?.map((product:ProductProps) => {
                  const details = `${translate(product.title)} ${translate(product.description)}`


                  return <article key={product._id + product.static_id + Math.random()} className={customStringIncludes(moreList,product._id) ? 'show-more' : ''}>
                      <div className="article-wrapper">
                          <div className="img-wrapper">
                              <Image
                                  src={`/${product.image}.webp`}
                                  alt=""
                                  height={60}
                                  width={60}
                              />
                          </div>
                          <div className="details">
                              <h3>{details.slice(0,60)}</h3>
                              <div className="features">
                                  <div className="feature">
                                      <h3>{translate(dictionaries.cart.size)} </h3>
                                      <span> {translate(dictionaries.cart.medium)},</span>
                                  </div>                             
                                  <div className="feature">
                                      <h3>{translate(dictionaries.cart.color)} </h3>
                                      <span> {translate(product.color)},</span>
                                  </div>         

                              </div>
                              <div className="feature">
                                  <h3>{translate(dictionaries.cart.seller)} </h3>
                                  <span>{translate(product.brand)} {translate(dictionaries.cart.agent)},</span>
                              </div>    

                          </div>
                          <div className="more">
                              <button className="list" onClick={_=>toggleMoreButtons(product._id.toString())}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                              </button>
                            <div className="remove-add-fav">
                              <button className="remove" onClick={_=>dispatch(removeFromCart(product._id))}>
                              <FontAwesomeIcon icon={faTrash} />
                              </button>
                              <ToggleFav product={product} component="small-cart" />
                            </div>
                          </div>
                      </div>
                      <div className="buttons-price">
                        <div className="buttons">
                            <button className="decrease" onClick={_=>dispatch(decreaseQuantity(product._id))}>
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <span>
                              {product.quantity | 0}
                            </span>
                            <button className="increase" onClick={_=>dispatch(increaseQuantity(product._id))}>
                            <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>

                        <p className="price">${product.total}.00</p>
                      </div>
                  </article>
              })

      : <EmptyCart />        
          }
        </div>
        <div className="buy-card">
                <div className="coupon">
                    <form action="#">
                        <input type="text" placeholder={translate(dictionaries.cart.couponPlaceholder)}/>
                        <button type="submit">{translate(dictionaries.cart.apply)}</button>
                    </form>
                </div>

                <div className="buy-process">
                    <div className="buy-card__details">
                        <article>
                            <h3>{translate(dictionaries.cart.subtotal)}</h3>
                            <span>${bill}</span>
                        </article>
                        <article>
                            <h3>{translate(dictionaries.cart.subscriberDiscount)}</h3>
                            <span>$0.00</span>
                        </article>
                        <article>
                            <h3>{translate(dictionaries.cart.tax)}</h3>
                            <span>$0.00</span>
                        </article>
                    </div>

                    <div className="total">
                        <h3>{translate(dictionaries.cart.total)}</h3>
                        <p>${bill}</p>
                    </div>

                    
                    <div className="payment">
                        <Link href='#' className="not-allowed">
                            <Image
                                src='/images/icons/payment.png'
                                alt="payment"
                                height={22}
                                width={34}
                            />
                        </Link>
                        <Link href='#' className="not-allowed">
                            <Image
                                src='/images/icons/cridet.png'
                                alt="payment"
                                height={22}
                                width={34}
                            />
                        </Link>
                        <Link href='#' className="not-allowed">
                            <Image
                                src='/images/icons/p.png'
                                alt="payment"
                                height={22}
                                width={34}
                            />
                        </Link>
                        <Link href='#' className="not-allowed">
                            <Image
                                src='/images/icons/visa.png'
                                alt="payment"
                                height={22}
                                width={34}
                            />
                        </Link>
                        <Link href='#' className="not-allowed">
                            <Image
                                src='/images/icons/pay.png'
                                alt="payment"
                                height={22}
                                width={34}
                            />
                        </Link>
                    </div>

                    <button className="buy" onClick={handleByProcess}>
                      {translate(dictionaries.cart.checkout)} ({productCount} {translate(dictionaries.cart.items)})
                    </button>
                </div>
            </div>
      </div>
      <div className="small-favorites container">
        <SavedForLater />
      </div>
    </div>
  )
}

export default CartSmall