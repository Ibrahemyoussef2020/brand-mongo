'use client';

import Link from 'next/link'
import { useLang } from '@/context/LangContext'
import { dictionaries } from '@/lib/dictionaries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

interface props{
    page:string,
    category:string, 
    item:string
}

const ProgressNav = ({page='home',category='',item=''}:props) => {
    const { lang, translate } = useLang();
    const arrowIcon = lang === 'en' ? faAngleRight : faAngleLeft;
      
    if (page === 'home') {
      return  <section className='progress-nav'>
            <ul>
                <li>
                    <Link href={`/${lang}`}>{translate(dictionaries.header.home)}</Link>
                    <span>
                        <FontAwesomeIcon icon={arrowIcon} />
                    </span>
                </li>
            </ul>
    </section>
    }

    if (page === 'results') {   
      return  <section className='progress-nav'>
        <ul>
            <li>
                    <Link href={`/${lang}`}>{translate(dictionaries.header.home)}</Link>
                <span>
                    <FontAwesomeIcon icon={arrowIcon} />
                </span>
            </li>
            <li>
                <Link href={`/${lang}/showCategories/${category}`}>{category}</Link>
                <span>
                    <FontAwesomeIcon icon={arrowIcon} />
                </span>
            </li>
        </ul>
    </section>
    }

    if (page === 'details') {
       return <section className='progress-nav'>
        <ul>
            <li>
                    <Link href={`/${lang}`}>{translate(dictionaries.header.home)}</Link>
                <span>
                    <FontAwesomeIcon icon={arrowIcon} />
                </span>
            </li>
            <li>
                <Link href={`/${lang}/showCategories/${category}`}>{category}</Link>
                <span>
                    <FontAwesomeIcon icon={arrowIcon} />
                </span>
            </li>
            <li>
                <Link href={`/${lang}/itemDetails/${category}/${item}`}>{item}</Link>
                <span>
                    <FontAwesomeIcon icon={arrowIcon} />
                </span>
            </li>
        </ul>
    </section>
    }

    if (page === 'cart') {
        return  <section className='progress-nav'>
        <ul>
            <li>
                    <Link href={`/${lang}`}>{translate(dictionaries.header.home)}</Link>
                <span>
                    <FontAwesomeIcon icon={arrowIcon} />
                </span>
            </li>
            <li>
                <Link href={`/${lang}/cart`}>{translate(dictionaries.userMenu.myCart)}</Link>
                <span>
                    <FontAwesomeIcon icon={arrowIcon} />
                </span>
            </li>
        </ul>
    </section>
    }

    if (page === 'profile') {
        return  <section className='progress-nav'>
        <ul>
            <li>
                    <Link href={`/${lang}`}>{translate(dictionaries.header.home)}</Link>
                <span>
                    <FontAwesomeIcon icon={arrowIcon} />
                </span>
            </li>
            <li>
                <Link href={`/${lang}/profile`}>{translate(dictionaries.userMenu.myProfile)}</Link>
                <span>
                    <FontAwesomeIcon icon={arrowIcon} />
                </span>
            </li>
        </ul>
    </section>
    }

    if (page === 'orders') {
        return  <section className='progress-nav'>
        <ul>
            <li>
                <Link href={`/${lang}`}>Home</Link>
                <span>
                    <FontAwesomeIcon icon={arrowIcon} />
                </span>
            </li>
            <li>
                <Link href={`/${lang}/orders`}>{translate(dictionaries.header.orders)}</Link>
                <span>
                    <FontAwesomeIcon icon={arrowIcon} />
                </span>
            </li>
        </ul>
    </section>
    }
    else{
        return <div></div>
    }
}

export default ProgressNav