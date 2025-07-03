'use client';

import { ProductProps } from '@/types'
import Image from 'next/image'
import React, { useState } from 'react'

interface props {
    product:ProductProps
}

const DetailsTopRight = ({product}:props) => {
    const [img,setImg] = useState('frist-img');
  return (
    <div className="right">
        <div className='track'>
            <div className={`thumb ${img}`}>
                <div className="slide">
                    <Image
                        src={`/${product?.image}.webp`}
                        alt={`img for ${product?.title}`}
                        width={345}
                        height={345}
                    />
                </div>
                <div className="slide">
                    <Image
                        src={`/${product?.image}.webp`}
                        alt={`img for${product?.title}`}
                        width={345}
                        height={345}
                    />
                </div>
                <div className="slide">
                    <Image
                        src={`/${product?.image}.webp`}
                        alt={`img for${product?.title}`}
                        width={345}
                        height={345}
                    />
                </div>
                <div className="slide">
                    <Image
                        src={`/${product?.image}.webp`}
                        alt={`img for${product?.title}`}
                        width={345}
                        height={345}
                    />
                </div>
                <div className="slide">
                    <Image
                        src={`/${product?.image}.webp`}
                        alt={`img for${product?.title}`}
                        width={345}
                        height={345}
                    />
                </div>
            </div>
        </div>
        <div className="paginations">
            <button onClick={_=>setImg('frist-img')}>
            <Image
                src={`/${product?.image}.webp`}
                alt={`img for${product?.title}`}
                width={56}
                height={56}
            />
            </button>
            <button onClick={_=>setImg('second-img')}>
            <Image
                src={`/${product?.image}.webp`}
                alt={`img for${product?.title}`}
                width={56}
                height={56}
            />
            </button>
            <button onClick={_=>setImg('third-img')}>
            <Image
                src={`/${product?.image}.webp`}
                alt={`img for${product?.title}`}
                width={56}
                height={56}
            />
            </button>
            <button onClick={_=>setImg('forth-img')}>
            <Image
                src={`/${product?.image}.webp`}
                alt={`img for${product?.title}`}
                width={56}
                height={56}
            />
            </button>
            <button onClick={_=>setImg('fifth-img')}>
            <Image
                src={`/${product?.image}.webp`}
                alt={`img for${product?.title}`}
                width={56}
                height={56}
            />
            </button>
        </div>
     </div>
  )
}

export default DetailsTopRight