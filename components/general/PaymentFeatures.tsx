'use client';
import { useLang } from '@/context/LangContext'
import { dictionaries } from '@/lib/dictionaries'
import Image from 'next/image'
import React from 'react'

const PaymentFeatures = () => {
    const { translate } = useLang();

  return (
    <section className='payment-features'>
      <article>
        <Image
          src='/images/payment-feature-1.webp'
          alt='secret'
          width={48}
          height={48}
        />
        <div className='text'>
          <h3>{translate(dictionaries.cart.securePayment)}</h3>
          <p>{translate(dictionaries.cart.placeholderText)}</p>
        </div>
      </article>

      <article>
        <Image
          src='/images/payment-feature-2.webp'
          alt='secret'
          width={48}
          height={48}
        />
        <div className='text'>
          <h3>{translate(dictionaries.cart.customerSupport)}</h3>
          <p>{translate(dictionaries.cart.placeholderText)}</p>
        </div>
      </article>

      <article>
        <Image
          src='/images/payment-feature-3.webp'
          alt='secret'
          width={48}
          height={48}
        />
        <div className='text'>
          <h3>{translate(dictionaries.cart.securePayment)}</h3>
          <p>{translate(dictionaries.cart.placeholderText)} </p>
        </div>
      </article>
    </section>
  )
}

export default PaymentFeatures