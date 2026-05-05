'use client';
import React from 'react';

interface PageHeaderProps {
  title: string;
  filterText?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, filterText = "Last 30 Days", children }: PageHeaderProps) {
  return (
    <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
      <div>
        <h2>{title}</h2>
        {filterText && <span className="time-filter">{filterText}</span>}
      </div>
      {children && (
        <div className="header-actions">
          {children}
        </div>
      )}
    </div>
  );
}
