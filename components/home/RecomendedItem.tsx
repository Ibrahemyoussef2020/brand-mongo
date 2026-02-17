import { getRecommendedItemsFromDB } from '@/lib/db/fetchProducts';
import { ProductProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import BrowserProduct from '../general/BrowserProduct';
import RecomendedItemSkelton from '@/skelton/home/RecomendedItem';
import { sTranslate } from '@/utilities/translate';

import { Locale } from '@/types';




export const dynamic = 'force-dynamic';

const RecomendedItem = async ({ locale }: { locale: Locale }) => {
    const recomendedItems = await getRecommendedItemsFromDB();
    
    if (!recomendedItems?.data) {
        return <RecomendedItemSkelton />;
    }

    const t = {
        en: {
            heading: "Recommended items",
            perfectOffer: "it's perfect offer."
        },
        ar: {
            heading: "العناصر الموصى بها",
            perfectOffer: "إنه عرض مثالي."
        }
    };

    const currentT = t[locale] || t.en;

    return (
        <section className='recomended-items'>
            <h2>{currentT.heading}</h2>
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
                                <h3>{sTranslate(recomendedItem.title, locale)}, {currentT.perfectOffer}</h3>

                                <BrowserProduct section='recommendedItems' productId='' />
                            </div>
                        </article>
                    })
                }
            </div>
        </section>
    );
}



export default RecomendedItem