
'use client'
import { FilterProps, ProductProps } from "@/types"

import Image from "next/image"
import ProductRating from "../general/ProductRating"

import Link from "next/link"
import BrowserProduct from "../general/BrowserProduct"
import ToggleFav from "../general/ToggleFav"
import ResultsSkelton from "@/skelton/showItems/ResultsSkelton"
import { useLang } from "@/context/LangContext"
import { dictionaries } from "@/lib/dictionaries"



interface props{
    products:ProductProps[];
    section:string;
    maxCountProducts:number,
    handleFilter:(filterData:FilterProps|any, isAdded:boolean)=>boolean|void|any,
    loading?: boolean;
}

const ResultsSection = ({products,section,maxCountProducts,handleFilter,loading}:props) => {
  const { translate } = useLang();


  if (loading) {
    return <ResultsSkelton />
  }

  return  <div className="product-results">
        {
            products?.map((product:ProductProps,index:number) => {
                if (index < maxCountProducts) {
                    return <article key={product._id + product.static_id + Math.random()} className="broweserd-product">
                    <div className="img-wrapper in-list">
                        <Image
                        src={`/${product.image}.webp`}
                        alt={translate(product.title)}
                        height={164}
                        width={308}
                        />
                    </div>
                    <div className="img-wrapper in-grid">
                        <Image
                        src={`/${product.image}.webp`}
                        alt={translate(product.title)}

                        height={202}
                        width={202}
                        />
                    </div>
                    <br className="in-list"/>
                    <div className="product__info">
                        <p className="title-in-list in-list">{translate(product.title)} <span className="good-item">{translate(dictionaries.orderResults.veryGoodItem)}</span> ,</p>

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
                                    <span className="orders in-list">{product.price.toString().slice(0,3)} {translate(dictionaries.orderResults.orders)}</span>
                                    {product.free_delivery ? <span className="shipping in-list">{translate(dictionaries.orderResults.freeShipping)}</span> : 
                                    
                                    <span className="shipping in-list">{translate(dictionaries.orderResults.plusDelivery)}</span>
                                    }
                                    <Link href={`/itemDetails/${section}/${product.static_id}`} className="mobile-details in-list">
                                        {translate(dictionaries.orderResults.viewDetails)}       
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="left">
                                <ToggleFav product={product} component="small" />
                            </div>
                            
                        </div>
                        <p className="desc-in-list in-list">
                            {translate(product.description).slice(0,100)}

                            <span className="rest-desc">
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </span>
                        </p>
                        
                        <p className="title_desc-in-grid in-grid">
                            {translate(product.title)} {translate(product.description).slice(0,10)}
                        </p>

                        <p className="title_desc-in-grid in-grid">
                            {product.section} - {translate(product.color)}
                        </p>


                        <Link href={`/itemDetails/${section}/${product.static_id}`} className="details in-list">
                            {translate(dictionaries.orderResults.viewDetails)}       
                        </Link>

                        <BrowserProduct section={section} productId={product.static_id} base="showSections"/>
                    </div>
                </article>
                }
            }) 
        }
    </div>
}

export default ResultsSection
