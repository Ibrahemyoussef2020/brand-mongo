import {  getRecommendedItemsFromDB } from "@/lib/db/fetchProducts"
import { ProductProps } from "@/types"
import Image from "next/image"
import Link from "next/link";


const DetailsMayLik = async () => {
  
  const result = await getRecommendedItemsFromDB();
  const products = result?.data;  


  
  
  return (
    <div className="may-like right">
    <h2>You may like</h2>
    <div className="products-wrapper">
        {
            (products as unknown as ProductProps[])?.map((product:ProductProps,index:number) =>{
                const  heading = `${product.title} ${product.description}`
                 if (index < 5) {
                    return <Link href={`/itemDetails/home-sections/${product._id}`} key={product._id}>
                    <div className="img-wrapper">
                        <Image
                            src={`/${product.image}.webp`}
                            alt=""
                            height={60}
                            width={60}
                        />
                    </div>
                    <div className="info">
                        <h3>{heading.slice(0,35)}</h3>
                        <div className="limts">
                            <span className="from">{product.price} - </span>
                            <span className="to"> {product.price * 5}</span>
                        </div>
                    </div>
                 </Link>
                 }
            })
        }
    </div>
</div>
  )
}

export default DetailsMayLik


