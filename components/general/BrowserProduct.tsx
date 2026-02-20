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

const BrowserProduct = (prop: prop) => {
  const { section, productId , base="showSections" } = prop;
  const { lang } = useLang();
  
  return (
    <Link
      href={!productId ? `/${base}/${section}` : `/itemDetails/${section}/${productId}`}
      className='browser-product'>
      <span>{lang === 'ar' ? 'التفاصيل' : 'Details'}</span>
    </Link>
  )
}

export default BrowserProduct
