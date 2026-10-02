'use client';
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSearch, faBell, faUserCircle, faUser, faEnvelope, 
  faCog, faStore, faSignOutAlt, faChevronDown 
} from "@fortawesome/free-solid-svg-icons";
import { useLang } from "@/context/LangContext";
import { useRouter, usePathname } from "next/navigation";
import { dictionaries } from "@/lib/dictionaries";

export default function DashboardHeader() {
  const { data: session } = useSession();
  const { lang, setLang, translate } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = (pathname && pathname.startsWith('/ar')) ? 'ar' : (lang || 'en');
  const isAr = currentLang === 'ar';

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLangChange = (newLang: string) => {
    const segments = pathname.split('/');
    segments[1] = newLang;
    const newPathname = segments.join('/') || `/${newLang}`;
    router.push(newPathname);
    setLang(newLang as any);
  };

  const role = (session?.user as any)?.role || 'admin';
  const roleLabel = role === 'super_admin' ? (isAr ? 'مشرف عام' : 'Super Admin')
                  : role === 'admin' ? (isAr ? 'مشرف' : 'Admin')
                  : role === 'seller' ? (isAr ? 'تاجر' : 'Seller')
                  : (isAr ? 'مستخدم' : 'Customer');

  const roleBg = role === 'super_admin' ? '#eef2ff' : role === 'admin' ? '#eff6ff' : role === 'seller' ? '#fffbeb' : '#f1f5f9';
  const roleColor = role === 'super_admin' ? '#4f46e5' : role === 'admin' ? '#2563eb' : role === 'seller' ? '#d97706' : '#64748b';

  return (
    <header className="dashboard-header">
      <div className="header-search">
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" placeholder={isAr ? 'ابحث في لوحة التحكم...' : translate(dictionaries.dashboard.header.searchPlaceholder)} />
      </div>

      <div className="header-actions">
        <select
          value={currentLang}
          onChange={(e) => handleLangChange(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '0.25rem',
            border: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
            color: '#64748b',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>

        <button className="notification-btn" title={isAr ? 'الإشعارات' : 'Notifications'}>
          <FontAwesomeIcon icon={faBell} />
          <span className="badge"></span>
        </button>

        {/* Clickable User Profile Card */}
        <div className="dashboard-user-dropdown" ref={dropdownRef}>
          <button 
            type="button" 
            className={`user-profile-card-btn ${isDropdownOpen ? 'active' : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-expanded={isDropdownOpen}
          >
            {session?.user?.image ? (
              <img src={session.user.image} alt={session?.user?.name || "User Avatar"} className="user-avatar-img" />
            ) : (
              <div className="user-avatar-fallback">
                <FontAwesomeIcon icon={faUserCircle} />
              </div>
            )}
            <div className="user-info">
              <p className="name">{session?.user?.name || 'Admin 1'}</p>
              <p className="email">{session?.user?.email || 'admin1@brand.com'}</p>
            </div>
            <FontAwesomeIcon icon={faChevronDown} className={`chevron-icon ${isDropdownOpen ? 'open' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="dashboard-user-menu">
              <div className="user-card-header">
                <div className="avatar-wrap">
                  {session?.user?.image ? (
                    <img src={session.user.image} alt="User avatar" />
                  ) : (
                    <FontAwesomeIcon icon={faUserCircle} className="avatar-icon" />
                  )}
                </div>
                <div className="details-wrap">
                  <div className="name-role-row">
                    <strong className="user-name">{session?.user?.name || 'Admin 1'}</strong>
                    <span className="role-badge" style={{ backgroundColor: roleBg, color: roleColor }}>
                      {roleLabel}
                    </span>
                  </div>
                  <div className="email-row">
                    <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
                    <span className="user-email">{session?.user?.email || 'admin1@brand.com'}</span>
                  </div>
                </div>
              </div>

              <div className="menu-divider" />

              <Link 
                href={`/${currentLang}/profile`} 
                className="user-menu-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FontAwesomeIcon icon={faUser} />
                <span>{isAr ? 'الملف الشخصي' : 'My Profile'}</span>
              </Link>

              <Link 
                href={`/${currentLang}/dashboard/settings`} 
                className="user-menu-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FontAwesomeIcon icon={faCog} />
                <span>{isAr ? 'إعدادات النظام' : 'System Settings'}</span>
              </Link>

              <Link 
                href={`/${currentLang}`} 
                className="user-menu-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FontAwesomeIcon icon={faStore} />
                <span>{isAr ? 'العودة للمتجر' : 'Visit Storefront'}</span>
              </Link>

              <div className="menu-divider" />

              <button 
                type="button"
                className="user-menu-item logout-btn"
                onClick={() => signOut({ callbackUrl: `/${currentLang}/login` })}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>{isAr ? 'تسجيل الخروج' : 'Sign Out'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
