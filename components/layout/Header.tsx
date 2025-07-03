import Image from "next/image"
import Searchbar from "./Searchbar"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCartShopping, faEnvelope, faEnvelopeOpenText, faHeart, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import {faUser as faRegularUser} from '@fortawesome/free-regular-svg-icons'

import Link from "next/link"
import NavBtn from "./NavBtn"
import HeaderTopLeft from "./HeaderTopLeft"


interface props {
  page:string,
  heading:string
}

const Header = ({page='results',heading='Show Categories'}:props) => {


  return (
    <header className='header'>

      <div className={` container container_header_top`}>
       
        {page && heading ? <HeaderTopLeft page={page} heading={heading}/> : null}

        <Searchbar size="pc" />
        <div className='navigations_pc'>
          <Link href='/profile'>
            <FontAwesomeIcon icon={faUser} width={19} color="gray" />
            <div>Profile</div>
          </Link>
          <Link href='#request'>
            <FontAwesomeIcon icon={faEnvelopeOpenText} width={19} color="gray" />
            <div>Message</div>
          </Link>
          <Link href='/orders'>
            <FontAwesomeIcon icon={faHeart} width={19} color="gray"  />
            <div>Orders</div>
          </Link>
          <Link href='/cart'>
            <FontAwesomeIcon icon={faCartShopping} width={19} color="gray" />
            <div>My cart</div>
          </Link>
        </div>

        <div className='navigations_mobile'>
        <Link href='/cart'>
            <Image 
              src='/images/icons/shopping.png'
              width={20}
              height={20}
              alt=""
            />
          </Link>
          <Link href='/profile'>
            <Image 
              src='/images/icons/user.png'
              width={16}
              height={16}
              alt=""
              />
          </Link>
        </div>
      </div>

      <div className={` container container_header_bottom_mobile`}>
        <Searchbar size="mob" />
      </div>

     <div className="container_header_bottom_pc">
      <div className={` container`}>
          <ul className="right">
            <li>
                <button>Hot offers</button>
            </li>
            <li>
                <Link href='#'>Gift boxes</Link>
            </li>
            <li>
                <Link href='#'>Projects</Link>
            </li>
            <li>
                <Link href='#'>Menu item</Link>
            </li>
            <li>
              help
              <select>
                    <option value="settings"></option>
              </select>
            </li>
          </ul>

          <ul className="left">
            <li>
              English, USD
              <select>
                    <option value="german"></option>
              </select>
            </li>
            <li>
                <span>Ship to</span>
                <img src="/images/flags/german.png" alt="german" />
                <select>
                  <option value="german"></option>
                </select>
            </li>
          </ul>
        </div>
     </div>

    </header>
  )
}

export default Header