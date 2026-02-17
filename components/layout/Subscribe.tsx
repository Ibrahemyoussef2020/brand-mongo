'use client'
import { useLang } from '@/context/LangContext'
import Image from 'next/image'
import React from 'react'

const Subscribe = () => {
  const { lang } = useLang();

  const t = {
    en: {
      heading: "Subscribe on our newsletter",
      subheading: "Get daily news on upcoming offers from many suppliers all over the world",
      placeholder: "Email",
      button: "Subscribe"
    },
    ar: {
      heading: "اشترك في نشرتنا الإخبارية",
      subheading: "احصل على أخبار يومية عن العروض القادمة من العديد من الموردين في جميع أنحاء العالم",
      placeholder: "البريد الإلكتروني",
      button: "اشترك"
    }
  };

  const currentT = t[lang] || t.en;

  return (
    <section className='subscribe'>
        <h2>{currentT.heading}</h2>
        <p>
        {currentT.subheading}
        </p>
        <form action="#">
            <div className='input-wrapper'>
                <Image
                    src='/images/icons/email.png'
                    alt='mail'
                    width={21}
                    height={17}
                />
                <input type="text"  placeholder={currentT.placeholder}/>
            </div>
            <button type="submit">{currentT.button}</button>
        </form>
    </section>
  )
}

export default Subscribe
