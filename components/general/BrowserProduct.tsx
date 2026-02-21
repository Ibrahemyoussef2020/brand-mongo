'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useLang } from '@/context/LangContext'

interface prop {
  section: string,
  productId: string,
  base?:string
}

import { dictionaries } from '@/lib/dictionaries'

const BrowserProduct = (prop: prop) => {
  const { section, productId , base="showSections" } = prop;
  const { translate, lang } = useLang();
  
  return (
    <Link
      href={!productId ? `/${lang}/${section}` : `/${lang}/itemDetails/${section}/${productId}`}
      className='browser-product'>
      <span>{translate(dictionaries.browserProduct.details)}</span>
    </Link>
  )
}

export default BrowserProduct
