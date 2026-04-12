'use client';
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useLang } from "@/context/LangContext";
import { useRouter, usePathname } from "next/navigation";

import { dictionaries } from "@/lib/dictionaries";

export default function DashboardHeader() {
  const { data: session } = useSession();
  const { lang, setLang, translate } = useLang();
  const router = useRouter();
  const pathname = usePathname();

  const handleLangChange = (newLang: string) => {
    const segments = pathname.split('/');
    segments[1] = newLang;
    const newPathname = segments.join('/') || `/${newLang}`;
    router.push(newPathname);
    setLang(newLang as any);
  };

  return (
    <header className="dashboard-header">
      <div className="header-search">
         <FontAwesomeIcon icon={faSearch} />
         <input type="text" placeholder={translate(dictionaries.dashboard.header.searchPlaceholder)} />
      </div>
      
      <div className="header-actions">
         <select 
            value={lang} 
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
         <button className="notification-btn">
           <FontAwesomeIcon icon={faBell} />
           <span className="badge"></span>
         </button>
         
         <div className="user-profile">
           <div className="user-info">
             <p className="name">{session?.user?.name || 'Admin User'}</p>
             <p className="email">{session?.user?.email || 'admin@example.com'}</p>
           </div>
           {session?.user?.image ? (
              <img src={session.user.image} alt="User avatar" />
           ) : (
              <FontAwesomeIcon icon={faUserCircle} className="avatar-icon" />
           )}
         </div>
      </div>
    </header>
  );
}
