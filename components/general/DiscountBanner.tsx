import Link from 'next/link'
import React from 'react'

const DiscountBanner = () => {
  return (
    <div className='disouct-banner'>
        <div className='intro'>
            <h2>Super discount on more than 100 USD</h2>
            <p>
                Have you ever finally just write dummy info
            </p>
        </div>

        <Link href='/showCategories/deal-offers'>Shop now</Link>
    </div>
  )
}

export default DiscountBanner