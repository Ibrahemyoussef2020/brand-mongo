import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface prop {
  section: string,
  productId: string,
  base?:string
}

const BrowserProduct = (prop: prop) => {
  const { section, productId , base="showSections" } = prop;
  

  return (
    <Link
      href={!productId ? `/${base}/${section}` : `/itemDetails/${section}/${productId}`}
      className='browser-product'>
      <span>Details</span>
      <Image
        src='/images/details.webp'
        alt='->'
        height={30}
        width={25}
      />
    </Link>
  )
}

export default BrowserProduct