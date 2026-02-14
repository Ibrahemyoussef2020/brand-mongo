'use client'
import { addToFavStore, clearCart, handleBill, handleProductsQuantity, removeFromCart, fetchCart, setCart } from "@/redux/slices"
import { ProductProps } from "@/types"
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

const CartLarge = () => {
    
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
            <h2>My cart ({productCount})</h2>
        </div>

        <div className="container container--top">
            <div className="cart-discount">
                <div className="cart-body">
                {
                    products.length ?
                    
                    products?.map((product:ProductProps) => {
                        const details = `${product.title}`

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
                                            <h3>Size: </h3>
                                            <span> medium,</span>
                                        </div>                             
                                        <div className="feature">
                                            <h3>Color: </h3>
                                            <span> {product.color},</span>
                                        </div>
                                        <div className="feature">
                                            <h3>Category: </h3>
                                            <span> {product.section},</span>
                                        </div>
                                    </div>
                                    <div className="feature">
                                        <h3>Seller: </h3>
                                        <span>{product.brand} agent,</span>
                                    </div>
                                    <div className="buttons">
                                        <button className="remove" onClick={_=>handleRemoveItem(product._id)}>Remove</button>
                                        <button className="add-fav" onClick={_=>handleSaveForLater(product)}>Save for later</button>
                                    </div>
                                </div>
                            </div>

                            <div className="right">
                                <p>${product.total}</p>
                                <div className="select-wrapper">
                                    <select id="select-count" name="select-count" onChange={(e)=> handleModifyQuantity(e,product._id)} value={product.quantity}>
                                        <option value={product.quantity}>Qty: {product.quantity}</option>
                                        <option value="1">Qty: 1</option>
                                        <option value="2">Qty: 2</option>
                                        <option value="3">Qty: 3</option>
                                        <option value="4">Qty: 4</option>
                                        <option value="5">Qty: 5</option>
                                        <option value="6">Qty: 6</option>
                                        <option value="7">Qty: 7</option>
                                        <option value="8">Qty: 8</option>
                                        <option value="9">Qty: 9</option>
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
                            <span>Back to shop</span>
                        </button>
                        <button className="remove" onClick={handleClearCart}>Remove all</button>
                   </div> 
                </div>
                <PaymentFeatures/>
            </div>
            
            <div className="buy-card">
                <div className="coupon">
                    <h2>Have a coupon?</h2>
                    <form action="#">
                        <input type="text" placeholder="Add coupon"/>
                        <button type="submit">Apply</button>
                    </form>
                </div>

                <div className="buy-process">
                    <div className="buy-card__details">
                        <article>
                            <h3>Subtotal:</h3>
                            <span>${bill}</span>
                        </article>
                        <article>
                            <h3>Discount:</h3>
                            <span>$0</span>
                        </article>
                        <article>
                            <h3>Tax:</h3>
                            <span>$0</span>
                        </article>
                    </div>

                    <div className="total">
                        <h3>Total:</h3>
                        <p>${bill}</p>
                    </div>

                    {showCheckout ? (
                        <Stripe />
                    ) : (
                        <button className="buy" onClick={() => setShowCheckout(true)}>Checkout</button>
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