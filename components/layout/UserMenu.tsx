'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faCartShopping, faChevronDown, faChartLine, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { dictionaries } from "@/lib/dictionaries";
import { useLang } from "@/context/LangContext";

export default function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { translate, lang } = useLang();
  const isAr = lang === 'ar';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const role = (session?.user as any)?.role || 'user';
  const roleLabel = role === 'super_admin' ? (isAr ? 'مشرف عام' : 'Super Admin')
                  : role === 'admin' ? (isAr ? 'مشرف' : 'Admin')
                  : role === 'seller' ? (isAr ? 'تاجر' : 'Seller')
                  : (isAr ? 'عميل' : 'Customer');

  const roleBg = role === 'super_admin' ? '#eef2ff' : role === 'admin' ? '#eff6ff' : role === 'seller' ? '#fffbeb' : '#f1f5f9';
  const roleColor = role === 'super_admin' ? '#4f46e5' : role === 'admin' ? '#2563eb' : role === 'seller' ? '#d97706' : '#64748b';

  return (
    <div className="user-menu-dropdown" ref={dropdownRef}>
      {/* Outside Trigger: Typical Clickable Card with Avatar, Name, Email, and Chevron */}
      <button 
        className={`user-menu-card-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        title={session?.user?.name || translate(dictionaries.userMenu.account)}
        aria-label="User Menu"
      >
        {session?.user?.image ? (
          <Image 
            src={session.user.image} 
            alt={session.user.name || "User Avatar"} 
            width={38} 
            height={38} 
            className="user-avatar-img"
          />
        ) : (
          <div className="user-avatar-fallback">
            <FontAwesomeIcon icon={faUser} />
          </div>
        )}
        <div className="user-info-col">
          <p className="user-name-text">
            {session ? (session.user?.name || 'User') : translate(dictionaries.userMenu.account)}
          </p>
          <p className="user-sub-text">
            {session ? (session.user?.email || roleLabel) : (isAr ? 'تسجيل الدخول' : 'Sign In')}
          </p>
        </div>
        <FontAwesomeIcon icon={faChevronDown} className={`chevron-icon ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="user-menu-content">
          {session ? (
            <>
              {/* User Info Header: Name, Role Badge, and Email with Side Icon */}
              <div className="user-info-header">
                {session.user?.image ? (
                  <Image 
                    src={session.user.image} 
                    alt={session.user.name || "User"} 
                    width={48} 
                    height={48} 
                    className="user-avatar-large"
                  />
                ) : (
                  <div className="user-avatar-placeholder">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                )}
                <div className="user-details">
                  <div className="user-name-role-row">
                    <span className="user-full-name">{session.user?.name || translate(dictionaries.userMenu.guest)}</span>
                    <span 
                      className="user-role-badge" 
                      style={{ backgroundColor: roleBg, color: roleColor }}
                    >
                      {roleLabel}
                    </span>
                  </div>
                  <div className="user-email-row">
                    <FontAwesomeIcon icon={faEnvelope} className="email-side-icon" />
                    <span className="user-email-text">{session.user?.email}</span>
                  </div>
                </div>
              </div>

              <div className="menu-divider"></div>

              {/* Menu Items */}
              <Link href={`/${lang}/profile`} className="menu-item" onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faUser} width={16} />
                <span>{translate(dictionaries.userMenu.myProfile)}</span>
              </Link>
              
              {((session.user as any)?.role === 'admin' || (session.user as any)?.role === 'super_admin' || (session.user as any)?.role === 'seller') && (
                <Link href={`/${lang}/dashboard`} className="menu-item" onClick={() => setIsOpen(false)}>
                  <FontAwesomeIcon icon={faChartLine} width={16} />
                  <span>Dashboard</span>
                </Link>
              )}

              <Link href={`/${lang}/cart`} className="menu-item" onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faCartShopping} width={16} />
                <span>{translate(dictionaries.userMenu.myCart)}</span>
              </Link>

              <div className="menu-divider"></div>

              <button 
                className="menu-item logout-btn"
                onClick={() => signOut()}
              >
                <FontAwesomeIcon icon={faSignOutAlt} width={16} />
                <span>{translate(dictionaries.userMenu.logout)}</span>
              </button>
            </>
          ) : (
            <>
              {/* Guest View */}
              <div className="guest-header">
                <div className="guest-avatar">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="guest-text">{translate(dictionaries.userMenu.welcome)}</div>
              </div>

              <div className="menu-divider"></div>

              <Link href={`/${lang}/cart`} className="menu-item" onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faCartShopping} width={16} />
                <span>{translate(dictionaries.userMenu.myCart)}</span>
              </Link>

              <div className="menu-divider"></div>

              <Link href={`/${lang}/login`} className="menu-item login-btn" onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faUser} width={16} />
                <span>Sign In</span>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
