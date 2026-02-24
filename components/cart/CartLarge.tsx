'use client'
import { addToFavStore, clearCart, handleBill, handleProductsQuantity, removeFromCart, fetchCart, setCart } from "@/redux/slices"
import { ProductProps } from "@/types"
import { dictionaries } from "@/lib/dictionaries"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import DiscountBanner from "../general/DiscountBanner"
import SavedForLater from "../general/SavedForLater"
import PaymentFeatures from "../general/PaymentFeatures"
import { IRootState } from "@/redux/store"
import React, { useEffect, useState } from "react"
import EmptyCart from "./EmptyCart"
import { AppDispatch } from "@/redux/store"
import Stripe from "../orders/Stripe"
import CartLargeSkelton from "@/skelton/cart/CartLarge"
import { useLang } from "@/context/LangContext"


const CartLarge = () => {
    const { translate } = useLang();
    // Use AppDispatch if available or fallback to any

    const dispatch = useDispatch<AppDispatch>() 
    const {products, productCount, bill, status} = useSelector((state:IRootState) => state.combine.cart)
    const router = useRouter()
    const [showCheckout, setShowCheckout] = useState(false)

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    if (status === 'loading' || status === 'idle') {
        return <CartLargeSkelton />;
    }
  
    const handleModifyQuantity = (e:React.ChangeEvent<HTMLSelectElement> ,id:string)=>{
        const newQuantity = {
            id:id,
            value:+e.target.value
        }
        dispatch(handleProductsQuantity(newQuantity))
    }  

  const handleByProcess = ()=>{
    dispatch(handleBill())
    router.push('/orders')
  }

  const handleSaveForLater = (product:ProductProps)=>{
    dispatch(addToFavStore(product));
    dispatch(removeFromCart(product._id));
  }

  const handleRemoveItem = (id: string) => {
      dispatch(removeFromCart(id));
  }

  const handleClearCart = () => {
       dispatch(clearCart());
  }

  // Helper to resolve image path
  const resolveImage = (imagePath: string) => {

      if (!imagePath) return "/images/placeholder.webp"; // Fallback or empty
      if (imagePath.includes('.')) return `/${imagePath}`;
      return `/${imagePath}.webp`;
  }

  return (
    <div className="large-cart">
        <div className="container container--heading">
            <h2>{translate(dictionaries.cart.myCart)} ({productCount})</h2>
        </div>

        <div className="container container--top">
            <div className="cart-discount">
                <div className="cart-body">
                {
                    products.length ?
                    
                    products?.map((product:ProductProps) => {
                        const details = `${translate(product.title)}`


                        return <article key={product._id + Math.random()}>
                            <div className="left">
                                <div className="img-wrapper ">
                                    <Image
                                        src={resolveImage(product.image)}
                                        alt=""
                                        height={60}
                                        width={60}
                                    />
                                </div>
                                <div className="details">
                                    <h3>{details.slice(0,40)}</h3>
                                    <div className="features">
                                        <div className="feature">
                                            <h3>{translate(dictionaries.cart.size)} </h3>
                                            <span> {translate(dictionaries.cart.medium)},</span>
                                        </div>                             
                                        <div className="feature">
                                            <h3>{translate(dictionaries.cart.color)} </h3>
                                            <span> {translate(product.color)},</span>
                                        </div>

                                        <div className="feature">
                                            <h3>{translate(dictionaries.cart.category)} </h3>
                                            <span> {product.section},</span>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <h3>{translate(dictionaries.cart.seller)} </h3>
                                        <span>{translate(product.brand)} {translate(dictionaries.cart.agent)},</span>
                                    </div>

                                    <div className="buttons">
                                        <button className="remove" onClick={_=>handleRemoveItem(product._id)}>{translate(dictionaries.cart.remove)}</button>
                                        <button className="add-fav" onClick={_=>handleSaveForLater(product)}>{translate(dictionaries.cart.saveForLater)}</button>
                                    </div>
                                </div>
                            </div>

                            <div className="right">
                                <p>${product.total}</p>
                                <div className="select-wrapper">
                                    <select id="select-count" name="select-count" onChange={(e)=> handleModifyQuantity(e,product._id)} value={product.quantity}>
                                        <option value={product.quantity}>{translate(dictionaries.cart.qty)} {product.quantity}</option>
                                        <option value="1">{translate(dictionaries.cart.qty)} 1</option>
                                        <option value="2">{translate(dictionaries.cart.qty)} 2</option>
                                        <option value="3">{translate(dictionaries.cart.qty)} 3</option>
                                        <option value="4">{translate(dictionaries.cart.qty)} 4</option>
                                        <option value="5">{translate(dictionaries.cart.qty)} 5</option>
                                        <option value="6">{translate(dictionaries.cart.qty)} 6</option>
                                        <option value="7">{translate(dictionaries.cart.qty)} 7</option>
                                        <option value="8">{translate(dictionaries.cart.qty)} 8</option>
                                        <option value="9">{translate(dictionaries.cart.qty)} 9</option>
                                    </select>
                                </div>
                            </div>
                        </article>
                    })

                    : <EmptyCart />
                    
                }
                   <div className="body-footer">
                        <button className="back" onClick={_=> window.history.back()}>
                            <Image
                                src='/images/arrow_back.png'
                                alt=""
                                height={20}
                                width={20}
                            />
                            <span>{translate(dictionaries.cart.backToShop)}</span>
                        </button>
                        <button className="remove" onClick={handleClearCart}>{translate(dictionaries.cart.removeAll)}</button>
                   </div> 
                </div>
                <PaymentFeatures/>
            </div>
            
            <div className="buy-card">
                <div className="coupon">
                    <h2>{translate(dictionaries.cart.couponHeading)}</h2>
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
                        {products.some(p => p.price && p.total && p.total < (p.price * p.quantity)) && (
                            <article>
                                <h3>{translate(dictionaries.cart.subscriberDiscount)}</h3>
                                <span style={{ color: '#00b517' }}>
                                    -${products.reduce((acc, p) => {
                                        return acc; 
                                    }, 0)}
                                </span>
                            </article>
                        )}
                        <article>
                            <h3>{translate(dictionaries.cart.tax)}</h3>
                            <span>$0</span>
                        </article>
                    </div>

                    <div className="total">
                        <h3>{translate(dictionaries.cart.total)}</h3>
                        <p>${bill}</p>
                    </div>

                    {showCheckout ? (
                        <Stripe />
                    ) : (
                        <button className="buy" onClick={() => setShowCheckout(true)}>{translate(dictionaries.cart.checkout)}</button>
                    )}

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
                </div>
            </div>
       </div>
        <div className="container">
            <SavedForLater />
            <DiscountBanner />
        </div>
    </div>
  )
}

export default CartLarge