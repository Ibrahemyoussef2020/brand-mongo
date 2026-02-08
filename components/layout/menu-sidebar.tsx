'use client';

import { faUser, faXmark, faSignOutAlt, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleAside } from "@/redux/slices";
import { AppDispatch, IRootState } from "@/redux/store";
import { useSession, signIn, signOut } from "next-auth/react";


const MenuSidebar = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { isOppend } = useSelector((state: IRootState) => state.combine.aside)
  const { data: session } = useSession();

  const handleClose = () => {
    dispatch(toggleAside(false));
  };

  return (
    <div className={`main-side-bar ${isOppend ? 'open' : 'closed'}`}>
      <div className="log">

        <button className={`close`} onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>

        {session ? (
          // Logged in state
          <>
            <span className="user-wrapper">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={40}
                  height={40}
                  className="user-avatar"
                />
              ) : (
                <FontAwesomeIcon icon={faUser} />
              )}
            </span>
            <div className="user-info">
              <span className="user-name">{session.user?.name || 'User'}</span>
              <span className="user-email">{session.user?.email}</span>
            </div>
          </>
        ) : (
          // Logged out state
          <>
            <span className="user-wrapper">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <div className="in-up">
              <button onClick={() => signIn("google", { callbackUrl: "/" })}>Sign in</button>
            </div>
          </>
        )}
      </div>

      <div className="navigates">
        <Link href='/' className="home" onClick={handleClose}>
          <Image
            src="/images/icons/home.png"
            alt=""
            width={30}
            height={30}
          />
          <span>Home</span>
        </Link>
        <Link href='/cart' onClick={handleClose}>
          <FontAwesomeIcon icon={faCartShopping} width={24} />
          <span>My Cart</span>
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
        <Link href='/profile' onClick={handleClose}>
          <Image
            src="/images/icons/favorite_border.png"
            alt=""
            width={24}
            height={24}
          />
          <span>Favorites</span>
        </Link>
        <Link href='/orders' onClick={handleClose}>
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

        {session && (
          <button className="logout-btn" onClick={() => signOut()}>
            <FontAwesomeIcon icon={faSignOutAlt} width={24} />
            <span>Logout</span>
          </button>
        )}
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
