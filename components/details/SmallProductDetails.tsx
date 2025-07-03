
import { ProductProps } from "@/types"
import Image from "next/image";

import ProductRating from "../general/ProductRating";

import customObjectIncludes from "@/utilities/customObjectIncludes";
import AnotherItems from "../general/AnotherItems";
import DetailsSmallSlider from "./DetailsSmallSlider";
import ToggleFav from "../general/ToggleFav";
import AddRemoveCart from "../general/AddRemoveCart";
import ProgressNav from "../layout/ProgressNav";

interface props {
    product:ProductProps,
    category:string
}


const SmallProductDetails = ({product,category}:props) => {
  if (product != null) {
    return (
      <div className="mobile-details">
        <ProgressNav page="details" category={category} item={product.title} /> 
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
                      <span> reviews</span>
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
                      <span> sold</span>
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
                        <h3>Model</h3>
                    </div>
                    <div className="ceil-left">
                        <p>#8786867</p>
                    </div>
                </div>
                <div className="row">
                    <div className="ceil-right">
                        <h3>Style</h3>
                    </div>
                    <div className="ceil-left">
                        <p>Classic style</p>
                    </div>
                </div>
                <div className="row">
                    <div className="ceil-right">
                        <h3>Certificate</h3>
                    </div>
                    <div className="ceil-left">
                        <p>ISO-898921212</p>
                    </div>
                </div>
                <div className="row">
                    <div className="ceil-right">
                        <h3>Size</h3>
                    </div>
                    <div>
                        <p>34mm x 450mm</p>
                    </div>
                </div>
                <div className="row">
                    <div className="ceil-right">
                        <h3>Memory</h3>
                    </div>
                    <div className="ceil-left">
                        <p>36GB RAM</p>
                    </div>
                </div>
            </div>


            <div className="desc">
              <p>Info about edu item is an ideal companion for anyone engaged in learning. The drone provides precise and ...</p>
              <details>
                <summary></summary>
                <p>
                  ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
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
                    <span>Germany</span>
                </div>

                <div className="feature">
                    <Image
                        src='/images/icons/verified_user.png'
                        alt=""
                        width={20}
                        height={20}
                    />
                    <span>Verified</span>
                </div>

                <div className="feature">
                    <Image
                        src='/images/icons/shipping.png'
                        alt=""
                        width={20}
                        height={20}
                    />
                    <span>shipping</span>
                </div>
            </div>
       </div> 

      <div className="similar">
        <AnotherItems category={category} title="Similar products" />
      </div>
       
      </div>
    )
  }
}

export default SmallProductDetails