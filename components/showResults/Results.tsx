
import { FilterProps, ProductProps } from "@/types"
import Image from "next/image"
import ProductRating from "../general/ProductRating"

import Link from "next/link"
import BrowserProduct from "../general/BrowserProduct"
import ToggleFav from "../general/ToggleFav"


interface props{
    products:ProductProps[];
    category:string;
    maxCountProducts:number,
    handleFilter:(filterData:FilterProps|any, isAdded:boolean)=>boolean|void|any,
}

const Results = ({products,category,maxCountProducts,handleFilter}:props) => {


    const handleClearFilters = ()=>{
        handleFilter({
          prop:null,
          checked:true,
          type: 'clear',
          value: null,
          values:[],
         filterFn:(product:ProductProps,filter:FilterProps) => true,
        } , true)
      }
    

  return  <div className="product-results">
        {
            products?.map((product:ProductProps,index:number) => {
                if (index < maxCountProducts) {
                    return <article key={product._id} className="broweserd-product">
                    <div className="img-wrapper in-list">
                        <Image
                        src={`/${product.image}.webp`}
                        alt={product.title}
                        height={164}
                        width={308}
                        />
                    </div>
                    <div className="img-wrapper in-grid">
                        <Image
                        src={`/${product.image}.webp`}
                        alt={product.title}
                        height={202}
                        width={202}
                        />
                    </div>
                    <br className="in-list"/>
                    <div className="product__info">
                        <p className="title-in-list in-list">{product.title} <span className="good-item">Very Good Item</span> ,</p>
                        <div className="top">
                            <div className="right">
                                <div className="price">
                                    <span className="current">${product.price}</span>
                                    {
                                    product.has_discount ? 
                                    <span className="old">${product.oldPrice}</span>
                                    :null
                                    }
                                </div>

                                <div className="ratings-else">
                                    <ProductRating avgRating={+product.avgRating} />.
                                    <span>{product.avgRating}.0</span>
                                    <span className="orders in-list">{product.price.toString().slice(0,3)} orders</span>
                                    {product.free_delivery ? <span className="shipping in-list">Free Shipping</span> : 
                                    
                                    <span className="shipping in-list">pluse delivery</span>
                                    }
                                    <Link href={`/itemDetails/${category}/${product.static_id}`} className="mobile-details in-list">
                                        View details       
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="left">
                                <ToggleFav product={product} component="small" />
                            </div>
                            
                        </div>
                        <p className="desc-in-list in-list">
                            {product.description.slice(0,100)}
                            <span className="rest-desc">
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </span>
                        </p>
                        
                        <p className="title_desc-in-grid in-grid">
                            {product.title} {product.description.slice(0,10)}
                        </p>
                        <p className="title_desc-in-grid in-grid">
                            {product.section} - {product.color}
                        </p>

                        <Link href={`/itemDetails/${category}/${product.static_id}`} className="details in-list">
                            View details       
                        </Link>

                        <BrowserProduct section={category} productId={product.static_id}/>
                    </div>
                </article>
                }
            }) 
        }
    </div>
}

export default Results

       