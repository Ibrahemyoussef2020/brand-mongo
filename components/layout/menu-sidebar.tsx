'use client';

import { faUser, faXmark, faSignOutAlt, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleAside } from "@/redux/slices";
import { AppDispatch, IRootState } from "@/redux/store";
import { useSession, signIn, signOut } from "next-auth/react";
import { useLang } from "@/context/LangContext";
import { dictionaries } from "@/lib/dictionaries";


const MenuSidebar = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { isOppend } = useSelector((state: IRootState) => state.combine.aside)
  const { data: session } = useSession();
  const { lang, translate } = useLang();

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
              <button onClick={() => signIn("google", { callbackUrl: `/${lang}` })}>{translate(dictionaries.userMenu.signInWithGoogle)}</button>
            </div>
          </>
        )}
      </div>

      <div className="navigates">
        <Link href={`/${lang}`} className="home" onClick={handleClose}>
          <Image
            src="/images/icons/home.png"
            alt=""
            width={30}
            height={30}
          />
          <span>{translate(dictionaries.header.home)}</span>
        </Link>
        <Link href={`/${lang}/cart`} onClick={handleClose}>
          <FontAwesomeIcon icon={faCartShopping} width={24} />
          <span>{translate(dictionaries.header.myCart)}</span>
        </Link>
        <button className="not-allowed">
          <Image
            src="/images/icons/list.png"
            alt=""
            width={24}
            height={24}
          />
          <span>{translate(dictionaries.searchbar.allCategory)}</span>
        </button>
        <Link href={`/${lang}/profile`} onClick={handleClose}>
          <Image
            src="/images/icons/favorite_border.png"
            alt=""
            width={24}
            height={24}
          />
          <span>{translate(dictionaries.userMenu.myProfile)}</span>
        </Link>
        <Link href={`/${lang}/orders`} onClick={handleClose}>
          <Image
            src="/images/icons/inventory_2.png"
            alt=""
            width={24}
            height={24}
          />
          <span>{translate(dictionaries.header.orders)}</span>
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
          <span>{translate(dictionaries.header.langCurrency)}</span>
        </button>
        <Link href='#' className="not-allowed">
          <Image
            src="/images/icons/headset_mic.png"
            alt=""
            width={24}
            height={24}
          />
          <span>{translate(dictionaries.footer.information.contactUs)}</span>
        </Link>
        <Link href='#' className="not-allowed">
          <Image
            src="/images/icons/business.png"
            alt=""
            width={24}
            height={24}
          />
          <span>{translate(dictionaries.footer.about.title)}</span>
        </Link>

        {session && (
          <button className="logout-btn" onClick={() => signOut()}>
            <FontAwesomeIcon icon={faSignOutAlt} width={24} />
            <span>{translate(dictionaries.userMenu.logout)}</span>
          </button>
        )}
      </div>

      <div className="more not-allowed">
        <Link href='#'>{translate(dictionaries.footer.information.userAgreement)}</Link>
        <Link href='#'>{translate(dictionaries.footer.partnership.title)}</Link>
        <Link href='#'>{translate(dictionaries.footer.information.privacyPolicy)}</Link>
      </div>
    </div>
  )
}

export default MenuSidebar
