'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { sTranslate } from '@/utilities/translate';
import { Locale } from '@/types';
import Icon from '@/components/ui/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartArrowDown, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from '@/redux/store';
import { addToCart, addToFavStore, removeFromFavStore } from '@/redux/slices';
import customObjectIncludes from '@/utilities/customObjectIncludes';

interface DealCardProps {
    product: any;
    locale: Locale;
}

const DealCard = ({ product, locale }: DealCardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const {products: cartProducts} = useSelector((state:IRootState) => state.combine.cart);
    const {favorites} = useSelector((state:IRootState) => state.combine.fav);
    
    const productId = product._id || product.static_id;
    const currentCartItem = cartProducts.find((item: any) => (item._id || item.product) === productId);
    const isFav = customObjectIncludes(favorites, productId);

    const handleToggleFav = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        const favProduct = { ...product, _id: productId };

        if (isFav) {
            dispatch(removeFromFavStore(productId));
        } else {
            dispatch(addToFavStore(favProduct));
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
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

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '180px',
            background: 'linear-gradient(145deg, #ffffff, #fcfcfc)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03)',
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease',
            border: '1px solid rgba(255,255,255,0.8)',
            cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03)';
        }}
        >
            {/* Left Image Section */}
            <div style={{
                position: 'relative',
                width: '160px',
                height: '100%',
                backgroundColor: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '15px'
            }}>
                <Image 
                    src={product.image ? (product.image.startsWith('/') || product.image.startsWith('http') ? product.image : `/${product.image}`).replace(/\.jpg$/, '') + '.webp' : '/placeholder.jpg'} 
                    alt={product.title || 'Product'} 
                    fill
                    style={{ objectFit: 'contain', padding: '15px', mixBlendMode: 'multiply' }}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.jpg'; }}
                />
                
                {/* Floating Discount Badge */}
                {product.discount && (
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'linear-gradient(135deg, #ff6b6b, #ff5252)',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '800',
                        boxShadow: '0 4px 10px rgba(255,107,107,0.3)',
                        zIndex: 2,
                        textTransform: 'uppercase'
                    }}>
                        {product.discount}
                    </div>
                )}

                {/* Add to Cart Icon (Top End) */}
                <button onClick={handleAddToCart} style={{
                    position: 'absolute',
                    top: '10px',
                    insetInlineEnd: '10px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.9)',
                    color: currentCartItem ? '#4CAF50' : '#666',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    zIndex: 10
                }}>
                    <FontAwesomeIcon icon={faCartArrowDown} style={{ fontSize: '14px' }} />
                    {currentCartItem && (
                        <span style={{ position: 'absolute', top: '-2px', right: '-2px', background: '#FF416C', color: 'white', fontSize: '9px', fontWeight: 'bold', width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {currentCartItem.quantity}
                        </span>
                    )}
                </button>

                {/* Add to Fav Icon (Bottom End) */}
                <button onClick={handleToggleFav} style={{
                    position: 'absolute',
                    bottom: '10px',
                    insetInlineEnd: '10px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isFav ? 'linear-gradient(135deg, #ff6b6b, #ff5252)' : 'rgba(255,255,255,0.9)',
                    color: isFav ? 'white' : '#ff5252',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: isFav ? '0 2px 8px rgba(255,107,107,0.4)' : '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    zIndex: 10
                }}>
                    <FontAwesomeIcon icon={isFav ? faHeartSolid : faHeart} style={{ fontSize: '15px' }} />
                </button>
            </div>

            {/* Right Info Section */}
            <div style={{
                flex: 1,
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(10px)',
            }}>
                {/* Category / Brand */}
                {product.brand && (
                    <span style={{ color: '#888', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', marginBottom: '6px' }}>
                        {product.brand}
                    </span>
                )}
                
                {/* Title */}
                <h3 style={{ 
                    fontSize: '15px', 
                    fontWeight: '700', 
                    color: '#2b2b2b',
                    marginBottom: '8px',
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {sTranslate(product.title, locale)}
                </h3>

                {/* Pricing & Stars */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                            <span style={{ fontSize: '22px', fontWeight: '800', color: '#1a1a1a', letterSpacing: '-0.5px' }}>
                                ${product.price || 0}
                            </span>
                            {product.oldPrice && product.oldPrice > product.price && (
                                <span style={{ fontSize: '13px', color: '#a0a0a0', textDecoration: 'line-through', fontWeight: '500' }}>
                                    ${product.oldPrice}
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', color: '#FFD700', fontSize: '12px', filter: 'drop-shadow(0 2px 4px rgba(255,215,0,0.3))' }}>
                        {Array.from({ length: 5 }, (_, i) => (
                            <Icon key={i} name={i < Math.floor(product.avgRating || 0) ? "star" : "star-empty"} size={12} color={i < Math.floor(product.avgRating || 0) ? "#FFD700" : "#e0e0e0"} filled={i < Math.floor(product.avgRating || 0)} />
                        ))}
                    </div>
                </div>

                {/* Show Details Button */}
                <Link href={`/${locale}/itemDetails/${product.category?.en || 'deals'}/${product.static_id}`} style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #2196F3, #1976D2)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 0',
                    fontSize: '12px',
                    fontWeight: '700',
                    textAlign: 'center',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 10px rgba(33,150,243,0.3)',
                    transition: 'all 0.3s ease',
                    marginTop: 'auto'
                }}>
                    Show Details
                </Link>
            </div>
        </div>
    );
};

export default DealCard;
