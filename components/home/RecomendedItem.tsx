import { getRecommendedItemsFromDB } from '@/lib/db/fetchProducts';
import { ProductProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import BrowserProduct from '../general/BrowserProduct';



const RecomendedItem = async () => {


    const recomendedItems = await getRecommendedItemsFromDB();


    if (!recomendedItems?.data) {
        return <h1>ddddddddddd</h1>
    }

    return (
        <section className='recomended-items'>
            <h2>Recommended items</h2>
            <div>
                {
                    (recomendedItems?.data as unknown as ProductProps[])?.map((recomendedItem: ProductProps) => {
                        return <article key={recomendedItem._id}>
                            <div className='broweserd-product'>
                                <div className='img-wrapper'>
                                    <Image
                                        src={`/${recomendedItem.image}.webp`}
                                        style={{ objectFit: "cover" }}
                                        fill
                                        alt=''
                                        sizes='100%'
                                    />
                                </div>
                                <p>
                                    ${recomendedItem.price}
                                </p>
                                <h3>{recomendedItem.title}, it's perfect offer.</h3>
                                <BrowserProduct section='recommendedItems' productId='' />
                            </div>
                        </article>
                    })
                }
            </div>
        </section>
    )
}

export default RecomendedItem