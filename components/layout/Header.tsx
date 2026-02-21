'use client'
import Image from "next/image"
import Searchbar from "./Searchbar"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCartShopping, faEnvelope, faEnvelopeOpenText, faHeart, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import {faUser as faRegularUser} from '@fortawesome/free-regular-svg-icons'

import Link from "next/link"
import NavBtn from "./NavBtn"
import HeaderTopLeft from "./HeaderTopLeft"
import UserMenu from "./UserMenu"
import { useLang } from "@/context/LangContext"


import { useRouter, usePathname } from "next/navigation"

import { dictionaries } from "@/lib/dictionaries"
import { useState } from "react"

interface props {
  page:string,
  heading:string
}
const Header = ({page='results',heading='Show Categories'}:props) => {
  const { lang, setLang, translate } = useLang(); 
  const router = useRouter();
  const pathname = usePathname();
  const [country, setCountry] = useState<string>('1');


  const countries = [
  { id: 1, name: "Danmark" },
  { id: 2, name: "Australia" },
  { id: 3, name: "France" },
  { id: 4, name: "United States" },
  { id: 5, name: "Россия" },
  { id: 6, name: "中国" },
  { id: 7, name: "Italia" },
  { id: 8, name: "United Kingdom" },
  { id: 9, name: "Deutschland" },
  { id: 10, name: "جمهورية مصر" }, 
];

  const handleLangChange = (newLang: string) => {
    const segments = pathname.split('/');
    segments[1] = newLang;
    const newPathname = segments.join('/') || `/${newLang}`;
    router.push(newPathname);
    setLang(newLang as any);
  };

  return (
    <header className='header'>

      <div className={` container container_header_top`}>
       
        {page && heading ? <HeaderTopLeft page={page} heading={heading}/> : null}

        <Searchbar size="pc" />
        <div className='navigations_pc'>
          <UserMenu />
          <Link href={`/${lang}/message`} prefetch={false}>
            <FontAwesomeIcon icon={faEnvelopeOpenText} width={19} color="gray" />
            <div>{translate(dictionaries.header.message)}</div>
          </Link>
          <Link href={`/${lang}/orders`} prefetch={false}>
            <FontAwesomeIcon icon={faHeart} width={19} color="gray"  />
            <div>{translate(dictionaries.header.orders)}</div>
          </Link>
          <Link href={`/${lang}/cart`} prefetch={false}>
            <FontAwesomeIcon icon={faCartShopping} width={19} color="gray" />
            <div>{translate(dictionaries.header.myCart)}</div>
          </Link>
        </div>

        <div className='navigations_mobile'>
          <UserMenu />
        </div>
      </div>

      <div className={` container container_header_bottom_mobile`}>
        <Searchbar size="mob" />
      </div>

     <div className="container_header_bottom_pc">
      <div className={` container`}>
          <ul className="right">
            <li>
                <button>{translate(dictionaries.header.hotOffers)}</button>
            </li>
            <li>
                <Link href='#' prefetch={false}>{translate(dictionaries.header.giftBoxes)}</Link>
            </li>
            <li>
                <Link href='#' prefetch={false}>{translate(dictionaries.header.projects)}</Link>
            </li>
            <li>
                <Link href='#' prefetch={false}>{translate(dictionaries.header.menuItem)}</Link>
            </li>
            <li>
              {translate(dictionaries.header.help)}
              <select>
                    <option value="settings"></option>
              </select>
            </li>
          </ul>

          <ul className="left">
            <li>
              <select value={lang} onChange={(e) => handleLangChange(e.target.value)}>
                    <option value="en">English</option>
                    <option value="ar">اللغة العربية</option>
              </select>
            </li>
            <li>
                <span style={{paddingInline:'5px'}}> {translate(dictionaries.header.shipTo )} </span>
                <img src={`/images/flags/${country}.webp`}  alt={country} />
                <select  onChange={(e)=>setCountry(e.target.value)}>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
            </li>
          </ul>
        </div>
     </div>

    </header>
  )
}

export default Header