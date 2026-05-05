'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import { getMenuItemsByRole } from "@/config/dashboard";

import { useLang } from "@/context/LangContext";
import Image from "next/image";

import { dictionaries } from "@/lib/dictionaries";

export default function Sidebar() {
  const { lang, translate } = useLang();
  const { data: session } = useSession();
  const role = session?.user?.role;
  
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const menuItems = getMenuItemsByRole(role);

  const handleToggle = (labelKey: string) => {
    setExpandedSection(prev => prev === labelKey ? null : labelKey);
  };

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
        {menuItems.map((item, index) => (
          <SidebarItem 
            key={item.labelKey || index}
            item={item}
            isExpanded={expandedSection === item.labelKey}
            onToggle={() => handleToggle(item.labelKey)}
          />
        ))}
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
