import { Locale, ProductProps } from "@/types"
import { customStringIncludes } from "@/utilities"
import customObjectIncludes from "@/utilities/customObjectIncludes"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"

import ToggleFav from "../general/ToggleFav"
import AddRemoveCart from "../general/AddRemoveCart"
import { sTranslate } from "@/utilities/translate"
import { dictionaries } from "@/lib/dictionaries"

interface props {
    product:ProductProps,
    locale: Locale
}


const DetailsTopLeft = ({product, locale}:props) => {
  return (
    <div className="left">
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
                    <span>{sTranslate(dictionaries.productDetails.germanyBerlin, locale)}</span>
                </div>

                <div className="feature">
                    <Image
                        src='/images/icons/verified_user.png'
                        alt=""
                        width={20}
                        height={20}
                    />
                    <span>{sTranslate(dictionaries.productDetails.verifiedSeller, locale)}</span>
                </div>

                <div className="feature">
                    <Image
                        src='/images/icons/shipping.png'
                        alt=""
                        width={20}
                        height={20}
                    />
                    <span>{sTranslate(dictionaries.productDetails.worldwideShipping, locale)}</span>
                </div>
            </div>

            <div className="buttons">
                <AddRemoveCart product={product} process="add" />
                <button className="profile not-allowed">{sTranslate(dictionaries.productDetails.sellersProfile, locale)}</button>
            </div>
       </div>

       <ToggleFav product={product} component="large" />

    </div>
  )
}

export default DetailsTopLeft