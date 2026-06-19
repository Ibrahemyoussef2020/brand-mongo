'use client';

import { addToFavStore, handleBill, handleProductsQuantity, removeFromCart } from "@/redux/slices"
import { ProductProps } from "@/types"
import Image from "next/image"
import { getImageSrc } from "@/helpers/getImageSrc"
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
  const {purchases, orders} = useSelector((state:IRootState) => state.combine.cart)
  const router = useRouter()


  

  const pendingApprovalOrders = orders?.filter((order: any) => order.requiresUserApproval) || [];

  const handleReviewOrder = async (orderId: string, action: 'accept' | 'refuse') => {
      try {
          const res = await fetch('/api/orders/review', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orderId, action })
          });
          if (res.ok) {
              window.location.reload(); // Refresh to fetch updated orders
          }
      } catch (error) {
          console.error("Error reviewing order", error);
      }
  };

  return  <div className="order-results">

        {pendingApprovalOrders.length > 0 && (
            <div className="pending-approvals" style={{ marginBottom: '30px' }}>
                <h2 className="old-purchases__heading" style={{ color: '#FA3434' }}>Action Required: Order Modifications</h2>
                {pendingApprovalOrders.map((order: any) => (
                    <div key={order._id} style={{ border: '1px solid #FA3434', borderRadius: '8px', padding: '20px', marginBottom: '20px', backgroundColor: '#fffcfc' }}>
                        <h3 style={{ marginBottom: '15px' }}>Order #{order._id.slice(-6)}</h3>
                        <p style={{ marginBottom: '15px' }}>Admin has proposed changes to your order.</p>
                        
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                            <div style={{ flex: '1 1 300px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                                <h4 style={{ color: '#555', marginBottom: '10px' }}>Original Order</h4>
                                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                                    {order.items.map((item: any, idx: number) => (
                                        <li key={idx} style={{ marginBottom: '5px' }}>{item.title?.[translate('en')] || item.title?.en} (x{item.quantity}) - ${item.total}</li>
                                    ))}
                                </ul>
                                <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Total: ${order.totalBill}</p>
                            </div>
                            <div style={{ flex: '1 1 300px', padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '6px', border: '1px solid #c8e6c9' }}>
                                <h4 style={{ color: '#2e7d32', marginBottom: '10px' }}>Proposed Changes</h4>
                                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                                    {order.proposedChanges?.items.map((item: any, idx: number) => (
                                        <li key={idx} style={{ marginBottom: '5px' }}>{item.title?.[translate('en')] || item.title?.en} (x{item.quantity}) - ${item.total}</li>
                                    ))}
                                </ul>
                                <p style={{ fontWeight: 'bold', marginTop: '10px', color: '#2e7d32' }}>New Total: ${order.proposedChanges?.totalBill}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn-primary" style={{ backgroundColor: '#00B517', borderColor: '#00B517', padding: '8px 16px', borderRadius: '4px', color: 'white', border: 'none', cursor: 'pointer' }} onClick={() => handleReviewOrder(order._id, 'accept')}>Accept Changes</button>
                            <button className="btn-danger" style={{ backgroundColor: '#FA3434', borderColor: '#FA3434', padding: '8px 16px', borderRadius: '4px', color: 'white', border: 'none', cursor: 'pointer' }} onClick={() => handleReviewOrder(order._id, 'refuse')}>Refuse Changes</button>
                        </div>
                    </div>
                ))}
            </div>
        )}

            <h2 className="old-purchases__heading">{translate(dictionaries.orderResults.oldPurchases)}</h2>
        {
          purchases.length ?
            purchases?.map((product:ProductProps,index:number) => {
                    return <article key={product._id + Math.random()}>
                    <div className="img-wrapper">
                        <Image
                        src={getImageSrc(product.image)}
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