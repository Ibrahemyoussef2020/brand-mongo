import Image from 'next/image'
import React from 'react'

const PaymentFeatures = () => {
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
          <h3>Secure payment</h3>
          <p>Have you ever finally just</p>
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
          <h3>Customer support</h3>
          <p>Have you ever finally just</p>
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
          <h3>Secure payment</h3>
          <p>Have you ever finally just </p>
        </div>
      </article>
    </section>
  )
}

export default PaymentFeatures