'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { sTranslate } from '@/utilities/translate';
import { Locale, ProductProps } from '@/types';
import Icon from '@/components/ui/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartArrowDown, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from '@/redux/store';
import { addToCart, addToFavStore, removeFromFavStore } from '@/redux/slices';
import customObjectIncludes from '@/utilities/customObjectIncludes';
import { showProducts } from '@/app/apis';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
    product: any;
    locale: Locale;
    sectionKey?: string;
    config?: any;
    index?: number;
}

const ProductCard = ({ product, locale, sectionKey = 'items', config = {}, index = 0 }: ProductCardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const {favorites} = useSelector((state:IRootState) => state.combine.fav);
    const {products: cartProducts} = useSelector((state:IRootState) => state.combine.cart);

    const router = useRouter();
    
    const productId = product._id || product.static_id;

    const handleAddToCart = (e: React.MouseEvent , product:any) => {
        e.preventDefault();
        e.stopPropagation();
        const addedProduct = {
            ...product,
            _id: productId,
            product: productId,
            quantity: 1,
            deliveryPrice: product.free_delivery ? 0 : 50, 
            total: product.price
        };
        dispatch(addToCart(addedProduct));
    };

    const handleToggleFav = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        const favProduct = { ...product, _id: productId };

        if (customObjectIncludes(favorites, productId)) {
            dispatch(removeFromFavStore(productId));
        } else {
            dispatch(addToFavStore(favProduct));
        }
    };
    
    const isFav = customObjectIncludes(favorites, productId);
    const currentCartItem = cartProducts.find((item: any) => (item._id || item.product) === productId);

    const showDetails = (product:any ,sectionKey:string):void => {
        router.push(`/${locale}/itemDetails/${product.category?.en || sectionKey}/${product.static_id}`);
    }

    return (
        <div className='product-card' style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #f0f0f0',
            position: 'relative',
            height: '100%'
        }}>
            {/* Product Image Container */}
            <div style={{ 
                position: 'relative', 
                height: '220px',
                overflow: 'hidden',
                backgroundColor: '#fafafa'
            }}>
                <Image 
                    src={product.image ? (product.image.startsWith('/') || product.image.startsWith('http') ? product.image : `/${product.image}`).replace(/\.jpg$/, '') + '.webp' : '/placeholder.jpg'} 
                    alt={product.title || 'Product'} 
                    fill
                    style={{ 
                        objectFit: 'contain',
                        transition: 'transform 0.4s ease',
                        padding: '20px'
                    }}
                    onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.jpg';
                    }}
                />
                
                {/* Discount Badge */}
                {product.discount && (
                    <div style={{
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        background: 'linear-gradient(135deg, #ff6b6b, #ff5252)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '25px',
                        fontSize: '11px',
                        fontWeight: '700',
                        zIndex: 1,
                        boxShadow: '0 2px 8px rgba(255,107,107,0.3)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        {product.discount}
                    </div>
                )}
                
                {/* Action Toggle Top-Right Button */}
                {config.actionButtonType === 'show-details' ? (
                    <button onClick={(e) => handleAddToCart(e,product)} style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'rgba(255,255,255,0.95)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        transition: 'all 0.3s ease'
                    }}>
                        <FontAwesomeIcon icon={faCartArrowDown} style={{ color: '#666', fontSize: '18px' }} />
                    </button>
                ) : (
                    <Link href={`/${locale}/itemDetails/${product.category?.en || sectionKey}/${product.static_id}`} style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'rgba(255,255,255,0.95)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                    }}>
                        <FontAwesomeIcon icon={faEye} style={{ color: '#666', fontSize: '18px' }} />
                    </Link>
                )}
                
                {/* Add to Wishlist */}
                <button onClick={handleToggleFav} style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '15px',
                    background: 'rgba(255,255,255,0.95)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 1,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease'
                }}>
                    <FontAwesomeIcon icon={faHeart} style={{ color: '#666', fontSize: '18px' }} />
                </button>
            </div>
            
            {/* Product Info */}
            <div style={{ 
                padding: '20px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ffffff'
            }}>
                {/* Brand */}
                {product.brand && (
                    <div style={{
                        fontSize: '11px',
                        color: '#999',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontWeight: '600',
                        marginBottom: '8px'
                    }}>
                        {product.brand}
                    </div>
                )}
                
                {/* Title */}
                <h3 style={{ 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    color: '#2c3e50',
                    marginBottom: '12px',
                    lineHeight: '1.4',
                    height: '42px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                }}>
                    {sTranslate(product.title, locale)}
                </h3>
                
                {/* Rating */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    marginBottom: '12px',
                    gap: '8px'
                }}>
                    <div style={{ 
                        display: 'flex',
                        color: '#ffa500',
                        fontSize: '13px'
                    }}>
                        {Array.from({ length: Math.floor(product.avgRating || 0) }, (_, i) => (
                            <Icon key={`${product.static_id}-filled-${i}`} name="star" size={13} color="#ffa500" filled={true} />
                        ))}
                        {Array.from({ length: 5 - Math.floor(product.avgRating || 0) }, (_, i) => (
                            <Icon key={`${product.static_id}-empty-${i}`} name="star-empty" size={13} color="#ddd" filled={false} />
                        ))}
                    </div>
                    <span style={{ 
                        fontSize: '12px', 
                        color: '#999',
                        fontWeight: '500'
                    }}>
                        ({product.ratings || 0})
                    </span>
                </div>
                
                {/* Price Section */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '15px',
                    gap: '8px'
                }}>
                    <div>
                        <span style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#2c3e50'
                        }}>
                            ${product.price || 0}
                        </span>
                        {product.oldPrice && product.oldPrice > product.price && (
                            <span style={{
                                fontSize: '14px',
                                color: '#999',
                                textDecoration: 'line-through',
                                marginLeft: '8px'
                            }}>
                                ${product.oldPrice}
                            </span>
                        )}
                    </div>
                    
                    {/* Free Delivery Badge */}
                    {product.free_delivery && (
                        <span style={{
                            fontSize: '10px',
                            color: '#4CAF50',
                            background: '#e8f5e8',
                            padding: '3px 6px',
                            borderRadius: '12px',
                            fontWeight: '600'
                        }}>
                            FREE
                        </span>
                    )}
                </div>
                
                {/* Action Button: Add to Cart vs Show Details */}
                {config.actionButtonType === 'show-details' ? (
                    <Link href={`/${locale}/itemDetails/${product.category?.en || sectionKey}/${product.static_id}`} style={{
                        background: 'linear-gradient(135deg, #2196F3, #1976D2)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '12px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        marginTop: 'auto',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        display: 'block',
                        textAlign: 'center',
                        boxShadow: '0 2px 8px rgba(33,150,243,0.3)',
                        textDecoration: 'none',
                        position: 'relative',
                        zIndex: 10
                    }}>
                        Show Details
                    </Link>
                ) : (
                    <button onClick={(e)=>handleAddToCart(e,product)} style={{
                        background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '12px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        marginTop: 'auto',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        boxShadow: '0 2px 8px rgba(76,175,80,0.3)',
                        position: 'relative',
                        zIndex: 10
                    }}>
                        {currentCartItem ? `Add More (${currentCartItem.quantity})` : 'Add to Cart'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
