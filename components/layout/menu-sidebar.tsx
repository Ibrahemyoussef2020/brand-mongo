'use client';

import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleAside  } from "@/redux/slices";
import { IRootState } from "@/redux/store";


const MenuSidebar = () => {
    
    const dispatch = useDispatch();
    const {isOppend } =  useSelector((state:IRootState )=> state.combine.aside)
    
  return (
    <div className={`main-side-bar ${isOppend ? 'open' : 'closed'}`}>
        <div className="log">

          <button className={`close`} onClick={_=>dispatch(toggleAside(false))}>
            <FontAwesomeIcon icon={faXmark} />
          </button>

          <span className="user-wrapper">
          <FontAwesomeIcon icon={faUser}/>
          </span>
          <div className="in-up">
            <button>Sign in</button>
            <span>|</span>
            <button>Register</button>
          </div>
        </div>

        <div className="navigates">
            <Link href='/' className="home" >
              <Image 
                src="/images/icons/home.png" 
                alt=""
                width={30}
                height={30}
              />
              <span>Home</span>
            </Link>
            <button className="not-allowed">
              <Image 
                src="/images/icons/list.png" 
                alt=""
                width={24}
                height={24}
              />
              <span>Categories</span>
            </button>
            <Link href='/profile'>
              <Image 
                src="/images/icons/favorite_border.png" 
                alt=""
                width={24}
                height={24}
              />
              <span>Favorites</span>
            </Link>
            <Link href='/orders'>
              <Image 
                src="/images/icons/inventory_2.png" 
                alt=""
                width={24}
                height={24}
              />
              <span>My orders</span>
            </Link>
          </div>

          <div className="settings">
            <button className="not-allowed">
              <Image 
                src="/images/icons/language.png" 
                alt=""
                width={24}
                height={24}
              />
              <span>English | USD</span>
            </button>
            <Link href='#' className="not-allowed">
              <Image 
                src="/images/icons/headset_mic.png" 
                alt=""
                width={24}
                height={24}
              />
              <span>Contact us</span>
            </Link>
            <Link href='#' className="not-allowed">
              <Image 
                src="/images/icons/business.png" 
                alt=""
                width={24}
                height={24}
              />
              <span>About</span>
            </Link>
          </div>

          <div className="more not-allowed">
            <Link href='#'>User agreement</Link>
            <Link href='#'>Partnership</Link>
            <Link href='#'>Privacy policy</Link>
          </div>
    </div>
  )
}

export default MenuSidebar
