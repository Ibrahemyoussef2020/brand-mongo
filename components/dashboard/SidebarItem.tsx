'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { MenuItem } from "@/config/dashboard";
import { useLang } from "@/context/LangContext";
import { dictionaries } from "@/lib/dictionaries";
import { useState, useEffect } from "react";

interface SidebarItemProps {
  item: MenuItem;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function SidebarItem({ item, isExpanded, onToggle }: SidebarItemProps) {
  const pathname = usePathname();
  const { lang, translate } = useLang();
  
  // A helper function to translate the label key. 
  // You might need to adjust this depending on how deep your dictionary is.
  // Assuming keys are passed directly like "dashboard.sidebar.products" or just fallbacks to English strings.
  const getTranslatedLabel = (key: string) => {
    // If it's a known key, we could map it. For now, we'll try to find it in the dictionary 
    // or just return the key if it's the english default string we put in config.
    // Example: translate(dictionaries.dashboard.sidebar.products)
    // To handle dynamic keys from config simply:
    try {
      const parts = key.split('.');
      if (parts.length > 1) {
          let curr: any = dictionaries;
          for(const p of parts) {
              if (curr[p]) curr = curr[p];
              else return key;
          }
          return translate(curr as string);
      }
      return key; // return the english string for now if it's not a path
    } catch {
      return key;
    }
  };

  const hasChildren = item.children && item.children.length > 0;
  
  // Check if any child is active to keep the accordion open
  const isChildActive = hasChildren && item.children!.some(child => pathname.startsWith(`/${lang}${child.href}`));
  const isDirectActive = !hasChildren && pathname === `/${lang}${item.href}`;
  const isActive = isDirectActive || isChildActive;

  // Auto-expand if a child is active initially
  useEffect(() => {
    if (isChildActive && !isExpanded) {
        onToggle(); // Tell parent to expand this one
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (hasChildren) {
    return (
      <div className={`nav-item-group ${isExpanded ? 'expanded' : ''}`}>
        <button 
          className={`nav-link ${isChildActive ? 'active-group' : ''}`} 
          onClick={onToggle}
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FontAwesomeIcon icon={item.icon} />
            <span>{getTranslatedLabel(item.labelKey)}</span>
          </div>
          <FontAwesomeIcon icon={isExpanded ? faChevronDown : faChevronRight} style={{ fontSize: '12px' }} />
        </button>
        
        {isExpanded && (
          <div className="nav-sub-menu" style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '5px' }}>
            {item.children!.map((child) => {
              const isChildDirectActive = pathname === `/${lang}${child.href}`;
              return (
                <Link 
                  key={child.href} 
                  href={`/${lang}${child.href}`}
                  className={`nav-link sub-link ${isChildDirectActive ? 'active' : ''}`}
                  style={{ fontSize: '0.9em', padding: '8px 10px' }}
                >
                  <FontAwesomeIcon icon={child.icon} style={{ marginRight: '8px' }} />
                  <span>{getTranslatedLabel(child.labelKey)}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link 
      href={`/${lang}${item.href}`}
      className={`nav-link ${isActive ? 'active' : ''}`}
    >
      <FontAwesomeIcon icon={item.icon} />
      <span>{getTranslatedLabel(item.labelKey)}</span>
    </Link>
  );
}
