'use client';
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  colorClass?: 'c-blue' | 'c-green' | 'c-orange' | 'c-indigo' | string;
}

export default function StatCard({ label, value, trend, colorClass = 'c-blue' }: StatCardProps) {
  return (
    <div className={`stat-card ${colorClass}`}>
       <div className="stat-content">
         <p className="label">{label}</p>
         <div className="value-row">
           <h3 className="value">{value}</h3>
           {trend && <span className="trend">{trend}</span>}
         </div>
       </div>
    </div>
  );
}
