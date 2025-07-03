import { ProductProps } from "@/types"
import Image from "next/image"
import ProductRating from "../general/ProductRating"
import DetailsTopCenter from "./DetailsTopCenter"
import DetailsTopLeft from "./DetailsTopLeft"
import DetailsBottomNav from "./DetailsBottomNav"
import DetailsBottomLeft from "./DetailsBottomLeft"
import DetailsMayLik from "./DetailsMayLik"
import DetailsTopRight from "./DetailsTopRight"
import DiscountBanner from "../general/DiscountBanner"
import AnotherItems from "../general/AnotherItems"
import ProgressNav from "../layout/ProgressNav"

interface props {
    product:ProductProps,
    category:string
}

const LargeProductDetails = ({product,category}:props) => {

 if (product != null) {
    return (
        <div className="pc-details">

            <ProgressNav page="details" category={category} item={product.title} /> 
            
            <div className="top">  
                <DetailsTopRight product={product}  />
    
                <DetailsTopCenter product={product} />
             
                <DetailsTopLeft product={product}  />

            </div>
    
    
            <div className="bottom">
                <DetailsBottomLeft product={product} />
                <DetailsMayLik />          
            </div>

            <AnotherItems category={category} title="Related products"/>
            <DiscountBanner/>
        </div>
      )
 }else{
   return <div></div>
 }

}

export default LargeProductDetails