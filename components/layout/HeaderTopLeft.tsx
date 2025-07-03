'use client';

import React from 'react'
import NavBtn from './NavBtn'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation"

interface props {
    page:string,
    heading:string
}

const HeaderTopLeft = ({page,heading = ''}:props) => {
    const navigate = useRouter(); 

    const takeAstepBack = ()=>{
        navigate.push('/')
    }
  return (
    <div className={`header-top-left ${page}`}>
        <div className='pc'>
            {
            page === 'home' ? 

            <div className='flex'>
                <Link href='/'>
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

            : page === 'results' || page === 'cart' || page === 'details' || 'profile' ?

            <div className='flex'>
                <Link href='/'>
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
                    <Link href='/'>
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
                : page === 'results' || page === 'cart' || page === 'profile' ?

                <div className='back-heading'>
                    <button className='back'  onClick={takeAstepBack}>
                        <Image
                            src='/images/back-step.png'
                            width={16}
                            height={16}
                            alt='back'
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
                        alt='back'
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