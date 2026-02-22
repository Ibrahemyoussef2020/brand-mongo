'use client'

import { ProductProps } from "@/types"
import { useState } from "react";
import DetailsBottomNav from "./DetailsBottomNav";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { dictionaries } from "@/lib/dictionaries";

interface props{
    product:ProductProps,
    
}

const DetailsBottomLeft = ({product}:props) => {
    const [selected,setSelected] = useState<string>('desc');
    const { translate } = useLang();

    const renderContent = () => {
        switch (selected) {
            case 'desc':
                return (
                    <div className="component">
                        <p className="details">
                            {translate(product.description)}
                        </p>

                        <div className="table">
                            <div className="row">
                                <div className="ceil-right"><h3>Model</h3></div>
                                <div className="ceil-left"><p>{product.static_id || '#8786867'}</p></div>
                            </div>
                            <div className="row">
                                <div className="ceil-right"><h3>Style</h3></div>
                                <div className="ceil-left"><p>{translate(product.type) || 'Classic style'}</p></div>
                            </div>
                            <div className="row">
                                <div className="ceil-right"><h3>Brand</h3></div>
                                <div className="ceil-left"><p>{translate(product.brand)}</p></div>
                            </div>
                            <div className="row">
                                <div className="ceil-right"><h3>Color</h3></div>
                                <div className="ceil-left"><p>{translate(product.color)}</p></div>
                            </div>
                        </div>

                        <div className="features">
                            <article className="feature">
                                <Image src='/images/icons/check.png' alt="" width={20} height={20} />
                                <p>{translate(product.title)}</p>
                            </article>
                            <article className="feature">
                                <Image src='/images/icons/check.png' alt="" width={20} height={20} />
                                <p>{translate(product.category || '')}</p>
                            </article>
                        </div>
                    </div>
                );
            case 'reviews':
                return (
                    <div className="component">
                        <p className="details">
                            {translate(dictionaries.productTabs.noReviews)}
                        </p>
                        <div className="ratings-else">
                            <span>{product.avgRating}.0</span>
                            <span className="orders">{product.ratings} reviews</span>
                        </div>
                    </div>
                );
            case 'shipping':
                return (
                    <div className="component">
                        <p className="details">
                            {translate(dictionaries.productTabs.shippingInfo)}
                        </p>
                        <ul className="details-list">
                            <li>{product.free_delivery ? 'Free Delivery' : 'Paid Shipping'}</li>
                            <li>Ships to: International</li>
                        </ul>
                    </div>
                );
            case 'seller':
                return (
                    <div className="component">
                        <p className="details">
                            {translate(dictionaries.productTabs.sellerInfo)}
                        </p>
                        <div className="seller-details">
                            <h3>{translate(product.brand)}</h3>
                            <p>Verified Supplier</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="left">
            <DetailsBottomNav product={product} selected={selected} setSelected={setSelected} />
            {renderContent()}
        </div>
    )
}

export default DetailsBottomLeft