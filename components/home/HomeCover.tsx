'use client'

import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import HomeCoverSkelton from '@/skelton/home/HomeCover'

const HomeCover = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const img = new window.Image()
    img.src = '/images/banner.webp'
    img.onload = () => setLoading(false)
    img.onerror = () => setLoading(false)
  }, [])

  if (loading) {
    return <HomeCoverSkelton />
  }

  return (
    <section className='cover-wrapper'>
    <div className='lists'> 
      <ul>
        <li><Link href={`showCategories/mobiles`}>Automobiles</Link></li>
        <li><Link href={`showCategories/fashion`}>Clothes and wear</Link></li>
        <li><Link href={`showCategories/kitchen-tools`}>Home interiors</Link></li>
        <li><Link href={`showCategories/computers`}>Computer and tech</Link></li>
        <li><Link href={`showCategories/kitchen-tools`}>Tools, equipments</Link></li>
        <li><Link href={`showCategories/sports`}>Sports and outdoor</Link></li>
        <li><Link href={`showCategories/pets`}>Animal and pets</Link></li>
        <li><Link href={`showCategories/chairs`}>Office furniture</Link></li>
        <li><Link href={`showCategories/headphones`}>More category</Link></li>
      </ul>
    </div>

    <div className='cover'>
      <Image
        src='/images/banner.webp'
        fill
        style={{objectFit:'fill'}}
        sizes="100%"
        alt=''
      />
      <div className="text">
        <h2 className='text__heading'>Latest trending</h2>
        <h3 className='text__sub-heading'>Electronic items</h3>
        <Link className='learn' href="#electric">Learn more</Link>
      </div>
    </div>

    <div className='welcome'>
      <div className='intro'>
          <div className="user-wrapper">
            <FontAwesomeIcon icon={faUser}/>
          </div>
          <div className='intro__desc'>
              <p>Hi, user</p>
              <p>let's get stated</p>
          </div>
          <div className="log">
            <button className='join'>Join now</button>
            <button className='login'>Log in</button>
          </div>
        </div>

        <article className='offer orange'>
          Get US $10 off <br/> with a new <br/>  supplier
        </article>

        <article className='offer green'>
         Send quotes with <br/>  supplier <br/>  preferences
        </article>

      </div>
  </section>
  )
}

export default HomeCover