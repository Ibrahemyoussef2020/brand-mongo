import Image from 'next/image'
import React from 'react'

const Subscribe = () => {
  return (
    <section className='subscribe'>
        <h2>Subscribe on our newsletter</h2>
        <p>
        Get daily news on upcoming offers from many suppliers all over the world
        </p>
        <form action="#">
            <div className='input-wrapper'>
                <Image
                    src='/images/icons/email.png'
                    alt='mail'
                    width={21}
                    height={17}
                />
                <input type="text"  placeholder='Email'/>
            </div>
            <button type="submit">Subscribe</button>
        </form>
    </section>
  )
}

export default Subscribe