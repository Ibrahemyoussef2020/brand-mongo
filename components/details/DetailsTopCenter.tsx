import { ProductProps } from "@/types"
import ProductRating from "../general/ProductRating"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"

interface props {
    product:ProductProps
}


const DetailsTopCenter = ({product}:props) => {
    
  return (
    <div className="center">
        <div className="stock">
            <FontAwesomeIcon icon={faCheck} />
            In stock
        </div>
        <h2 className="title">
            {product?.title.slice(0,20)}
            {product?.description.slice(0,30)}
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

        <div className="tabel">
            <div className="tabel__header">
                <div>
                    <p className="price red">{product?.price}.00</p>
                    <p className="pcs">50-100 pcs</p>
                </div>
                <div>
                    <p className="price">{product?.price + 10}.00</p>
                    <p className="pcs">100-700 pcs</p>
                </div>
                <div>
                    <p className="price">{product?.price + 5}.00</p>
                    <p className="pcs">700+ pcs</p>
                </div>
            </div>

            <div className="tabel__body">
                <div className="row">
                    <div className="info">
                        <span>Price: </span>
                        <p>Negotiable</p>
                    </div>
                </div>
                <div className="row">
                    <div className="info">
                        <span>Type: </span>
                        <p>Classic  shoes</p>
                    </div>
                    <div className="info">
                        <span>Material: </span>
                        <p>Plastic material</p>
                    </div>
                    <div className="info">
                        <span>Design: </span>
                        <p>Modern nice</p>
                    </div>
                </div>
                <div className="row">
                    <div className="info">
                        <span>Customization: </span>
                        <p>Customized logo and design custom packages</p>
                    </div>
                    <div className="info">
                        <span>Protection:  </span>
                        <p>Refund Policy</p>
                    </div>
                    <div className="info">
                        <span>Warranty:  </span>
                        <p>2 years full warranty </p>
                    </div>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default DetailsTopCenter