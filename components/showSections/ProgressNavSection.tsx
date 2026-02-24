
'use client';
import Link from 'next/link'
import { useLang } from '@/context/LangContext'
import { dictionaries } from '@/lib/dictionaries'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

interface props{
    page:string,
    section:string, 
    item:string
}

const ProgressNavSection = ({page='home',section='',item=''}:props) => {
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
                <Link href={`/${lang}/${section}`}>{section}</Link>
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
                <Link href={`/${lang}/${section}`}>{section}</Link>
                <span>
                    <FontAwesomeIcon icon={arrowIcon} />
                </span>
            </li>
            <li>
                <Link href={`/${lang}/itemDetails/${section}/${item}`}>{item}</Link>
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

export default ProgressNavSection
