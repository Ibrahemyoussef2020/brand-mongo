'use client'

import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import HomeCoverSkelton from '@/skelton/home/HomeCover'
import { useLang } from '@/context/LangContext'

import { dictionaries } from '@/lib/dictionaries'

const HomeCover = () => {
  const [loading, setLoading] = useState(true)
  const { lang, translate } = useLang();
  const { data: session } = useSession();

  useEffect(() => {
    const img = new window.Image()
    img.src = '/images/banner.webp'
    img.onload = () => setLoading(false)
    img.onerror = () => setLoading(false)
  }, [])

  if (loading) {
    return <HomeCoverSkelton />
  }

  const { categories } = dictionaries.homeCover;

  return (
    <section className='cover-wrapper'>
    <div className='lists'> 
      <ul>
        <li><Link href={`/${lang}/showCategories/mobiles`}>{translate(categories.automobiles)}</Link></li>
        <li><Link href={`/${lang}/showCategories/fashion`}>{translate(categories.clothes)}</Link></li>
        <li><Link href={`/${lang}/showCategories/kitchen-tools`}>{translate(categories.homeInteriors)}</Link></li>
        <li><Link href={`/${lang}/showCategories/computers`}>{translate(categories.computerTech)}</Link></li>
        <li><Link href={`/${lang}/showCategories/kitchen-tools`}>{translate(categories.toolsEquipments)}</Link></li>
        <li><Link href={`/${lang}/showCategories/sports`}>{translate(categories.sportsOutdoor)}</Link></li>
        <li><Link href={`showCategories/pets`}>{translate(categories.animalPets)}</Link></li>
        <li><Link href={`showCategories/chairs`}>{translate(categories.officeFurniture)}</Link></li>
        <li><Link href={`showCategories/headphones`}>{translate(categories.moreCategory)}</Link></li>
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
        <h2 className='text__heading'>{translate(dictionaries.homeCover.latestTrending)}</h2>
        <h3 className='text__sub-heading'>{translate(dictionaries.homeCover.electronicItems)}</h3>
        <Link className='learn' href="#electric">{translate(dictionaries.homeCover.learnMore)}</Link>
      </div>
    </div>

    <div className='welcome'>
      <div className='intro'>
          <div className="user-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {session?.user?.image ? (
              <Image 
                src={session.user.image} 
                alt={session.user.name || 'User'} 
                width={44} 
                height={44} 
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <FontAwesomeIcon icon={faUser} style={{ fontSize: '22px' }} />
            )}
          </div>
          <div className='intro__desc'>
              <p>{session?.user?.name ? `Hi, ${session.user.name.split(' ')[0]}` : translate(dictionaries.homeCover.hiUser)}</p>
              <p>{translate(dictionaries.homeCover.letsGetStarted)}</p>
          </div>
          <div className="log">
            {session ? (
              <>
                <Link href={`/${lang}/profile`} style={{ flex: 1 }}><button className='join' style={{ width: '100%' }}>Profile</button></Link>
                {((session.user as any)?.role === 'admin' || (session.user as any)?.role === 'super_admin' || (session.user as any)?.role === 'seller') ? (
                  <Link href={`/${lang}/dashboard`} style={{ flex: 1 }}><button className='login' style={{ width: '100%' }}>Dashboard</button></Link>
                ) : (
                  <Link href={`/${lang}/orders`} style={{ flex: 1 }}><button className='login' style={{ width: '100%' }}>Orders</button></Link>
                )}
              </>
            ) : (
              <>
                <Link href={`/${lang}/register`} style={{ flex: 1 }}><button className='join' style={{ width: '100%' }}>{translate(dictionaries.homeCover.joinNow)}</button></Link>
                <Link href={`/${lang}/login`} style={{ flex: 1 }}><button className='login' style={{ width: '100%' }}>{translate(dictionaries.homeCover.logIn)}</button></Link>
              </>
            )}
          </div>
        </div>

        <article className='offer orange'>
          <span>
            {translate(dictionaries.homeCover.discountOffer)}
          </span>
        </article>

        <article className='offer green'>
         <span>
            {translate(dictionaries.homeCover.supplierPref)}
         </span>
        </article>

      </div>
  </section>
  )
}

export default HomeCover
