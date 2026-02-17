'use client'
import Image from 'next/image'
import React from 'react'
import { useLang } from '@/context/LangContext'

const Suppliers = () => {
  const { lang } = useLang();
  
  return (
    <section className='suppliers'>
        <h2>{lang === 'ar' ? 'الموردون حسب المنطقة' : 'Suppliers by region'}</h2>
        <div className='contries'>
            <article>
                <Image
                    src='/images/flags/1.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>{lang === 'ar' ? 'الدنمارك' : 'Denmark'}</h3>
                    <p>denmark.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/2.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>{lang === 'ar' ? 'أستراليا' : 'Australia'}</h3>
                    <p>Australia.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/3.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>{lang === 'ar' ? 'فرنسا' : 'France'}</h3>
                    <p>France.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/4.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>{lang === 'ar' ? 'الولايات المتحدة' : 'United States'}</h3>
                    <p>States.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/5.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>{lang === 'ar' ? 'روسيا' : 'Russia'}</h3>
                    <p>Russia.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/6.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>{lang === 'ar' ? 'الصين' : 'China'}</h3>
                    <p>China.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/7.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>{lang === 'ar' ? 'إيطاليا' : 'Italy'}</h3>
                    <p>Italy.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/8.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>{lang === 'ar' ? 'بريطانيا العظمى' : 'Great Britain'}</h3>
                    <p>Britain.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/german.png'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>{lang === 'ar' ? 'ألمانيا' : 'German'}</h3>
                    <p>German.com.dk</p>
                </div>
            </article>
            <article>
                <Image
                    src='/images/flags/7.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>{lang === 'ar' ? 'حلفاء إيطاليا' : 'Italy Alies'}</h3>
                    <p>Italy-a.com.dk</p>
                </div>
            </article>
        </div>
    </section>
  )
}

export default Suppliers
