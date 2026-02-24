import { ProductProps } from "@/types"
import Image from "next/image"
import ProductRating from "../general/ProductRating"
import DetailsTopCenter from "./DetailsTopCenter"
import DetailsTopLeft from "./DetailsTopLeft"
import DetailsBottomNav from "./DetailsBottomNav"
import DetailsBottomLeft from "./DetailsBottomLeft"
import DetailsMayLik from "../general/DetailsMayLik"
import DetailsTopRight from "./DetailsTopRight"
import DiscountBanner from "../general/DiscountBanner"
import AnotherItems from "../general/AnotherItems"
import ProgressNav from "../layout/ProgressNav"
import { getProductsFromDB } from "@/lib/db/fetchProducts"
import { Suspense } from "react"
import MayLikeSkelton from "@/skelton/general/MayLike"
import { sTranslate } from "@/utilities/translate"
import { dictionaries } from "@/lib/dictionaries"

import { Locale } from "@/types"


interface props {
    product:ProductProps,
    category:string,
    locale: Locale
}


const LargeProductDetails = async ({product,category,locale}:props) => {

    // Fetch related products for AnotherItems
    const relatedResult = await getProductsFromDB({ category });
    const relatedProducts = relatedResult?.data as unknown as ProductProps[] || [];

 if (product != null) {
    return (
        <div className="pc-details">

            <ProgressNav page="details" category={category} item={sTranslate(product.title, locale)} /> 
            
            <div className="top">  
                <DetailsTopRight product={product}  />
    
                <DetailsTopCenter product={product} locale={locale} />

             
                <DetailsTopLeft product={product} locale={locale} />

            </div>
    
    
            <div className="bottom">
                <DetailsBottomLeft product={product} />
                <Suspense fallback={<MayLikeSkelton />}>
                    <DetailsMayLik locale={locale} />          
                </Suspense>

            </div>

            <AnotherItems products={relatedProducts} category={category} title={sTranslate(dictionaries.productDetails.relatedProducts, locale)}/>
            <DiscountBanner/>
        </div>
      )
 }else{
   return <div></div>
 }

}

export default LargeProductDetails