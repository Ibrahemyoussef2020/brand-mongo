import { ProductProps } from "@/types"
import Image from "next/image";

import ProductRating from "../general/ProductRating";

import customObjectIncludes from "@/utilities/customObjectIncludes";
import AnotherItems from "../general/AnotherItems";
import DetailsSmallSlider from "./DetailsSmallSlider";
import ToggleFav from "../general/ToggleFav";
import AddRemoveCart from "../general/AddRemoveCart";
import ProgressNav from "../layout/ProgressNav";
import { getProductsFromDB } from "@/lib/db/fetchProducts";
import { sTranslate } from "@/utilities/translate";
import { dictionaries } from "@/lib/dictionaries";

import { Locale } from "@/types";


interface props {
    product:ProductProps,
    category:string,
    locale: Locale
}


const SmallProductDetails = async ({product,category,locale}:props) => {

    // Fetch similar products for AnotherItems
    const similarResult = await getProductsFromDB({ category });
    const similarProducts = similarResult?.data as unknown as ProductProps[] || [];

  if (product != null) {
    return (
      <div className="mobile-details">

        <ProgressNav page="details" category={category} item={sTranslate(product.title, locale)} /> 
        <div className="images">
           <DetailsSmallSlider product={product} />
        </div>

        <div className="mobile-details-info">
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
                      <span>{product?.ratings.toString().slice(0,3)}</span>
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
                      <span>{product?.ratings.toString().slice(1,4)}</span>
                      <span> {sTranslate(dictionaries.productDetails.sold, locale)}</span>
                  </div>
              </div>
            </div>

            <div className="buy-fav">
              <AddRemoveCart product={product} process="add" />
              <ToggleFav product={product} component="small" />
            </div>

            <div className="table">
                <div className="row">
                    <div className="ceil-right">
                        <h3>{sTranslate(dictionaries.productDetails.model, locale)}</h3>
                    </div>
                    <div className="ceil-left">
                        <p>{product.static_id}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="ceil-right">
                        <h3>{sTranslate(dictionaries.productDetails.style, locale)}</h3>
                    </div>
                    <div className="ceil-left">
                        <p>{sTranslate(product.type, locale)}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="ceil-right">
                        <h3>{sTranslate(dictionaries.productDetails.brand, locale)}</h3>
                    </div>
                    <div className="ceil-left">
                        <p>{sTranslate(product.brand, locale)}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="ceil-right">
                        <h3>{sTranslate(dictionaries.productDetails.color, locale)}</h3>
                    </div>
                    <div>
                        <p>{sTranslate(product.color, locale)}</p>
                    </div>
                </div>
            </div>


            <div className="desc">
              <p>{sTranslate(product?.description, locale)}</p>

              <details>
                <summary></summary>
                <p>
                   {sTranslate(product?.description, locale)}
                </p>
              </details>
            </div>  

        </div>

        <div className="card">
            <div className="supplier">
                <div className="logo">
                    <Image
                        src='/images/r.webp'
                        alt="R"
                        height={48}
                        width={48}
                    />
                </div>
                <div className="text">
                    <p>{sTranslate(dictionaries.productDetails.supplier, locale)}</p>
                    <p>{sTranslate(dictionaries.productDetails.supplierName, locale)}</p>
                </div>
            </div>

            <div className="features">
                <div className="feature">
                    <Image
                        src='/images/flags/german.png'
                        alt=""
                        width={21}
                        height={15}
                    />
                    <span>{sTranslate(dictionaries.productDetails.germany, locale)}</span>
                </div>

                <div className="feature">
                    <Image
                        src='/images/icons/verified_user.png'
                        alt=""
                        width={20}
                        height={20}
                    />
                    <span>{sTranslate(dictionaries.productDetails.verified, locale)}</span>
                </div>

                <div className="feature">
                    <Image
                        src='/images/icons/shipping.png'
                        alt=""
                        width={20}
                        height={20}
                    />
                    <span>{sTranslate(dictionaries.productDetails.shipping, locale)}</span>
                </div>
            </div>
       </div> 

      <div className="similar">
        <AnotherItems products={similarProducts} category={category} title={sTranslate(dictionaries.productDetails.similarProducts, locale)} />
      </div>
       
      </div>
    )
  }
}

export default SmallProductDetails