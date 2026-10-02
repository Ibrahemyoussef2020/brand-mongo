'use client'
import Image from 'next/image'
import React from 'react'
import { useLang } from '@/context/LangContext'

import { dictionaries } from '@/lib/dictionaries'

const Suppliers = () => {
  const { translate } = useLang();
  
  return (
    <section className='suppliers'>
        <h2>{translate(dictionaries.suppliers.heading)}</h2>
        <div className='contries'>
            <article>
                <Image
                    src='/images/flags/1.webp'
                    alt=''
                    width={32}
                    height={25}
                />
                <div>
                    <h3>{translate(dictionaries.suppliers.denmark)}</h3>
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
                    <h3>{translate(dictionaries.suppliers.australia)}</h3>
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
                    <h3>{translate(dictionaries.suppliers.france)}</h3>
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
                    <h3>{translate(dictionaries.suppliers.unitedStates)}</h3>
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
                    <h3>{translate(dictionaries.suppliers.russia)}</h3>
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
                    <h3>{translate(dictionaries.suppliers.china)}</h3>
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
                    <h3>{translate(dictionaries.suppliers.italy)}</h3>
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
                    <h3>{translate(dictionaries.suppliers.greatBritain)}</h3>
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
                    <h3>{translate(dictionaries.suppliers.german)}</h3>
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
                    <h3>{translate(dictionaries.suppliers.italyAlies)}</h3>
                    <p>Italy-a.com.dk</p>
                </div>
            </article>
        </div>
    </section>
  )
}

export default Suppliers
