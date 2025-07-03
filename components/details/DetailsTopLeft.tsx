import { ProductProps } from "@/types"
import { customStringIncludes } from "@/utilities"
import customObjectIncludes from "@/utilities/customObjectIncludes"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"

import ToggleFav from "../general/ToggleFav"
import AddRemoveCart from "../general/AddRemoveCart"

interface props {
    product:ProductProps
}


const DetailsTopLeft = ({product}:props) => {
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
                    <p>Supplier</p>
                    <p>Guanjoi Trading LLC</p>
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
                    <span>Germany, Berlin</span>
                </div>

                <div className="feature">
                    <Image
                        src='/images/icons/verified_user.png'
                        alt=""
                        width={20}
                        height={20}
                    />
                    <span>Verified Seller</span>
                </div>

                <div className="feature">
                    <Image
                        src='/images/icons/shipping.png'
                        alt=""
                        width={20}
                        height={20}
                    />
                    <span>Worldwide shipping</span>
                </div>
            </div>

            <div className="buttons">
                <AddRemoveCart product={product} process="add" />
                <button className="profile not-allowed">Seller’s profile</button>
            </div>
       </div>

       <ToggleFav product={product} component="large" />

    </div>
  )
}

export default DetailsTopLeft