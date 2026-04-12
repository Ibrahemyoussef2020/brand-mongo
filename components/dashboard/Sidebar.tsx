'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie, faBoxOpen, faShoppingCart, faUsers, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";

import { useLang } from "@/context/LangContext";
import Image from "next/image";

import { dictionaries } from "@/lib/dictionaries";

export default function Sidebar() {
  const pathname = usePathname();
  const { lang, translate } = useLang();

  const navLinks = [
    { label: translate(dictionaries.dashboard.sidebar.overview), href: `/${lang}/dashboard`, icon: faChartPie },
    { label: translate(dictionaries.dashboard.sidebar.products), href: `/${lang}/dashboard/products`, icon: faBoxOpen },
    { label: translate(dictionaries.dashboard.sidebar.orders), href: `/${lang}/dashboard/orders`, icon: faShoppingCart },
    { label: translate(dictionaries.dashboard.sidebar.users), href: `/${lang}/dashboard/users`, icon: faUsers },
  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'center' }}>
        <Link href={`/${lang}`}>
            <picture>
                <source media="(min-width:767px)" srcSet="/images/pc-logo.webp" height={46} width={151} />
                <Image
                src='/images/mob-logo.webp'
                height={36}
                width={117}
                alt="Brand Logo"
                />
            </picture>
        </Link>
      </div>
      
      <nav className="sidebar-nav">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`nav-link ${isActive ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={link.icon} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
         <button onClick={() => signOut({ callbackUrl: `/${lang}/login` })} className="logout-btn">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>{translate(dictionaries.dashboard.sidebar.logout)}</span>
         </button>
      </div>
    </aside>
  );
}
