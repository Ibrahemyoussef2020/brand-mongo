'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faCartShopping, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="user-menu-dropdown" ref={dropdownRef}>
      <button 
        className="user-menu-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        {session?.user?.image ? (
          <Image 
            src={session.user.image} 
            alt={session.user.name || "User"} 
            width={32} 
            height={32} 
            className="user-avatar"
          />
        ) : (
          <FontAwesomeIcon icon={faUser} width={20} color="gray" />
        )}
        <span className="user-name">
          {session ? session.user?.name?.split(' ')[0] || 'Account' : 'Account'}
        </span>
        <FontAwesomeIcon icon={faChevronDown} width={12} className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="user-menu-content">
          {session ? (
            <>
              {/* User Info Header */}
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
                    <FontAwesomeIcon icon={faUser} width={24} />
                  </div>
                )}
                <div className="user-details">
                  <div className="user-full-name">{session.user?.name || 'User'}</div>
                  <div className="user-email">{session.user?.email}</div>
                </div>
              </div>

              <div className="menu-divider"></div>

              {/* Menu Items */}
              <Link href="/profile" className="menu-item" onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faUser} width={16} />
                <span>My Profile</span>
              </Link>

              <Link href="/cart" className="menu-item" onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faCartShopping} width={16} />
                <span>My Cart</span>
              </Link>

              <div className="menu-divider"></div>

              <button 
                className="menu-item logout-btn"
                onClick={() => signOut()}
              >
                <FontAwesomeIcon icon={faSignOutAlt} width={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* Guest View */}
              <div className="guest-header">
                <div className="guest-avatar">
                  <FontAwesomeIcon icon={faUser} width={24} />
                </div>
                <div className="guest-text">Welcome!</div>
              </div>

              <div className="menu-divider"></div>

              <Link href="/cart" className="menu-item" onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faCartShopping} width={16} />
                <span>My Cart</span>
              </Link>

              <div className="menu-divider"></div>

              <button 
                className="menu-item login-btn"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <Image 
                  src="/images/icons/google.svg" 
                  alt="Google" 
                  width={16} 
                  height={16}
                />
                <span>Sign in with Google</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
