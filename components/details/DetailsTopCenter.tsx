import { ProductProps } from "@/types"
import ProductRating from "../general/ProductRating"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import { sTranslate } from "@/utilities/translate"
import { dictionaries } from "@/lib/dictionaries"

import { Locale } from "@/types"


interface props {
    product: ProductProps,
    locale: Locale
}



const DetailsTopCenter = ({ product, locale }: props) => {



    console.log(product)

    return (
        <div className="center">
            <div className="stock">
                <FontAwesomeIcon icon={faCheck} />
                {sTranslate(dictionaries.productDetails.inStock, locale)}
            </div>
            <h2 className="title">
                {sTranslate(product?.title, locale).slice(0, 20)}
                {sTranslate(product?.description, locale).slice(0, 30)}
            </h2>

            <div className="verified">
                <div className="rating">
                    <div className="rating__stars">
                        <ProductRating avgRating={+product?.avgRating} />
                    </div>
                    <span className="rating__text">{product?.avgRating}</span>
                </div>
                <div className="reviews review-sold">
                    <Image
                        src='/images/icons/msg.png'
                        alt=""
                        height={20}
                        width={20}
                    />
                    <div>
                        <span>{product?.ratings.toString().slice(0, 3)}</span>
                        <span> {sTranslate(dictionaries.productDetails.reviews, locale)}</span>
                    </div>
                </div>
                <div className="sold review-sold">
                    <Image
                        src='/images/icons/shopping_basket.png'
                        alt=""
                        height={20}
                        width={20}
                    />
                    <div>
                        <span>{product?.ratings.toString().slice(1, 4)}</span>
                        <span> {sTranslate(dictionaries.productDetails.sold, locale)}</span>
                    </div>
                </div>
            </div>

            <div className="tabel">
                <div className="tabel__header">
                    <div>
                        <p className="price red">{product?.price}.00</p>
                        <p className="pcs">50-100 {sTranslate(dictionaries.productDetails.pcs, locale)}</p>
                    </div>
                    <div>
                        <p className="price">{product?.price + 10}.00</p>
                        <p className="pcs">100-700 {sTranslate(dictionaries.productDetails.pcs, locale)}</p>
                    </div>
                    <div>
                        <p className="price">{product?.price + 5}.00</p>
                        <p className="pcs">700+ {sTranslate(dictionaries.productDetails.pcs, locale)}</p>
                    </div>
                </div>

                <div className="tabel__body">
                    <div className="row">
                        <div className="info">
                            <span>{sTranslate(dictionaries.productDetails.priceLabel, locale)} </span>
                            <p>{sTranslate(dictionaries.productDetails.negotiable, locale)}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="info">
                            <span>{sTranslate(dictionaries.productDetails.typeLabel, locale)} </span>
                            <p>{sTranslate(product?.type, locale)}</p>
                        </div>

                        <div className="info">
                            <span>{sTranslate(dictionaries.productDetails.materialLabel, locale)} </span>
                            <p>{sTranslate(dictionaries.productDetails.plasticMaterial, locale)}</p>
                        </div>
                        <div className="info">
                            <span>{sTranslate(dictionaries.productDetails.designLabel, locale)} </span>
                            <p>{sTranslate(dictionaries.productDetails.modernNice, locale)}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="info">
                            <span>{sTranslate(dictionaries.productDetails.customizationLabel, locale)} </span>
                            <p>{sTranslate(dictionaries.productDetails.customizationDesc, locale)}</p>
                        </div>
                        <div className="info">
                            <span>{sTranslate(dictionaries.productDetails.protectionLabel, locale)}  </span>
                            <p>{sTranslate(dictionaries.productDetails.refundPolicy, locale)}</p>
                        </div>
                        <div className="info">
                            <span>{sTranslate(dictionaries.productDetails.warrantyLabel, locale)}  </span>
                            <p>{sTranslate(dictionaries.productDetails.warrantyDesc, locale)} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsTopCenter