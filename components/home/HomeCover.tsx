'use client'

import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import HomeCoverSkelton from '@/skelton/home/HomeCover'
import { useLang } from '@/context/LangContext'
import { spawn } from 'child_process'

const HomeCover = () => {
  const [loading, setLoading] = useState(true)
  const { lang } = useLang();

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
        <li><Link href={`showCategories/mobiles`}>{lang === 'ar' ? 'سيارات' : 'Automobiles'}</Link></li>
        <li><Link href={`showCategories/fashion`}>{lang === 'ar' ? 'ملابس وأزياء' : 'Clothes and wear'}</Link></li>
        <li><Link href={`showCategories/kitchen-tools`}>{lang === 'ar' ? 'ديكورات منزلية' : 'Home interiors'}</Link></li>
        <li><Link href={`showCategories/computers`}>{lang === 'ar' ? 'كمبيوتر وتكنولوجيا' : 'Computer and tech'}</Link></li>
        <li><Link href={`showCategories/kitchen-tools`}>{lang === 'ar' ? 'أدوات ومعدات' : 'Tools, equipments'}</Link></li>
        <li><Link href={`showCategories/sports`}>{lang === 'ar' ? 'رياضة وخارجية' : 'Sports and outdoor'}</Link></li>
        <li><Link href={`showCategories/pets`}>{lang === 'ar' ? 'حيوانات أليفة' : 'Animal and pets'}</Link></li>
        <li><Link href={`showCategories/chairs`}>{lang === 'ar' ? 'أثاث مكتبي' : 'Office furniture'}</Link></li>
        <li><Link href={`showCategories/headphones`}>{lang === 'ar' ? 'المزيد' : 'More category'}</Link></li>
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
        <h2 className='text__heading'>{lang === 'ar' ? 'أحدث الصيحات' : 'Latest trending'}</h2>
        <h3 className='text__sub-heading'>{lang === 'ar' ? 'أدوات إلكترونية' : 'Electronic items'}</h3>
        <Link className='learn' href="#electric">{lang === 'ar' ? 'تعلم المزيد' : 'Learn more'}</Link>
      </div>
    </div>

    <div className='welcome'>
      <div className='intro'>
          <div className="user-wrapper">
            <FontAwesomeIcon icon={faUser}/>
          </div>
          <div className='intro__desc'>
              <p>{lang === 'ar' ? 'أهلاً بك' : 'Hi, user'}</p>
              <p>{lang === 'ar' ? 'لنبدأ الآن' : "let's get started"}</p>
          </div>
          <div className="log">
            <button className='join'>{lang === 'ar' ? 'انضم الآن' : 'Join now'}</button>
            <button className='login'>{lang === 'ar' ? 'تسجيل الدخول' : 'Log in'}</button>
          </div>
        </div>

        <article className='offer orange'>
          {lang === 'ar' ? 
          <span>
          احصل على خصم 10$ مع   <br/> مورد جديد
          </span> 
          
          : 
          <span>
          Get US $10 off <br/> with a new supplier
          </span>
          }
        </article>

        <article className='offer green'>
         {lang === 'ar' ? 
         <span>
          أرسل استفساراتك وفق <br/> تفضيلات الموردين
         </span>
         : 
         <span>
          Send quotes with <br/> supplier preferences
         </span>
         }
        </article>

      </div>
  </section>
  )
}

export default HomeCover
