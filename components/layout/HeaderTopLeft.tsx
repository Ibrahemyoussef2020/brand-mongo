'use client';

import React from 'react'
import NavBtn from './NavBtn'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { dictionaries } from '@/lib/dictionaries'
import { useLang } from '@/context/LangContext'

interface props {
    page:string,
    heading:string
}

const HeaderTopLeft = ({page,heading = ''}:props) => {
    const navigate = useRouter(); 
    const {translate, lang} = useLang();

    const takeAstepBack = ()=>{
        navigate.push(`/${lang}`)
    }
  return (
    <div className={`header-top-left ${page}`}>
        <div className='pc'>
            {
            page === 'home' ? 

            <div className='flex'>
                <Link href={`/${lang}`}>
                    <picture>
                        <source media="(min-width:767px)" srcSet="/images/pc-logo.webp" height={46} width={151} />
                        <Image
                        src='/images/mob-logo.webp'
                        height={36}
                        width={117}
                        alt="logo"
                        />
                    </picture>
                </Link>
            </div>

            : page === 'results' || page === 'cart' || page === 'details' || page === 'profile' || page === 'message' ?

            <div className='flex'>
                <Link href={`/${lang}`}>
                    <picture>
                        <source media="(min-width:767px)" srcSet="/images/pc-logo.webp" height={46} width={151} />
                        <Image
                        src='/images/mob-logo.webp'
                        height={36}
                        width={117}
                        alt="logo"
                        />
                    </picture>
                </Link>
            </div>
            : <div className='empty'></div>
            }
        </div>

        {/* mobile */}

        <div className='mob'>
            {
                page === 'home' ? 

                <div className='flex'>
                    <NavBtn />
                    <Link href={`/${lang}`}>
                        <picture>
                            <source media="(min-width:767px)" srcSet="/images/pc-logo.webp" height={46} width={151} />
                            <Image
                            src='/images/mob-logo.webp'
                            height={36}
                            width={117}
                            alt="logo"
                            />
                        </picture>
                    </Link>
                </div>
                : page === 'results' || page === 'cart' || page === 'profile' || page === 'message' ?

                <div className='back-heading'>
                    <button className='back'  onClick={takeAstepBack}>
                        <Image
                            src='/images/back-step.png'
                            width={16}
                            height={16}
                            alt={translate(dictionaries.common.back)}
                        />
                    </button>
                    <h2 className='heading'>{heading}</h2>
                </div>

                : page === 'details' ?

                <button className='back'  onClick={takeAstepBack}>
                    <Image
                        src='/images/back-step.png'
                        width={16}
                        height={16}
                        alt={translate(dictionaries.common.back)}
                    />
                </button>
            :null}
        </div>    
    </div>
  )
}

export default HeaderTopLeft

/*



<picture className='pc'>
                    <source media="(min-width:767px)" srcSet="/images/pc-logo.webp" height={46} width={151} />
                    <Image
                    src='/images/mob-logo.webp'
                    height={36}
                    width={117}
                    alt="logo"
                    />
                </picture>




*/