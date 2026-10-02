'use client';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faUsers, faBoxOpen, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useLang } from "@/context/LangContext";
import { dictionaries } from "@/lib/dictionaries";

const DashboardCharts = dynamic(() => import('@/components/dashboard/DashboardCharts'), {
  ssr: false,
  loading: () => <div style={{ height: '350px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', margin: '20px 0' }} />
});

export default function DashboardOverview() {
  const { translate } = useLang();
  
  const stats = [
    { label: translate(dictionaries.dashboard.overview.stats.totalRevenue), value: "$124,231.89", trend: "+20.1%", icon: faDollarSign, colorClass: "c-green" },
    { label: translate(dictionaries.dashboard.overview.stats.activeOrders), value: "892", trend: "+12.5%", icon: faChartLine, colorClass: "c-blue" },
    { label: translate(dictionaries.dashboard.overview.stats.totalProducts), value: "3,245", trend: "+2.4%", icon: faBoxOpen, colorClass: "c-indigo" },
    { label: translate(dictionaries.dashboard.overview.stats.registeredUsers), value: "14,234", trend: "+15.3%", icon: faUsers, colorClass: "c-orange" },
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header">
         <h2>{translate(dictionaries.dashboard.overview.title)}</h2>
         <span className="time-filter">{translate(dictionaries.dashboard.overview.timeFilter)}</span>
      </div>

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className={`stat-card ${stat.colorClass}`}>
             <div className="icon-wrapper">
                <FontAwesomeIcon icon={stat.icon} />
             </div>
             <div className="stat-content">
               <p className="label">{stat.label}</p>
               <div className="value-row">
                 <h3 className="value">{stat.value}</h3>
                 <span className="trend">{stat.trend}</span>
               </div>
             </div>
          </div>
        ))}
      </div>

      <DashboardCharts />
    </div>
  );
}

