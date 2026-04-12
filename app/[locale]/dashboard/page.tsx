'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faUsers, faBoxOpen, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, 
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, ComposedChart
} from 'recharts';
import { useLang } from "@/context/LangContext";
import { dictionaries } from "@/lib/dictionaries";

export default function DashboardOverview() {
  const { translate } = useLang();
  
  const stats = [
    { label: translate(dictionaries.dashboard.overview.stats.totalRevenue), value: "$124,231.89", trend: "+20.1%", icon: faDollarSign, colorClass: "c-green" },
    { label: translate(dictionaries.dashboard.overview.stats.activeOrders), value: "892", trend: "+12.5%", icon: faChartLine, colorClass: "c-blue" },
    { label: translate(dictionaries.dashboard.overview.stats.totalProducts), value: "3,245", trend: "+2.4%", icon: faBoxOpen, colorClass: "c-indigo" },
    { label: translate(dictionaries.dashboard.overview.stats.registeredUsers), value: "14,234", trend: "+15.3%", icon: faUsers, colorClass: "c-orange" },
  ];

  const revenueData = [
    { month: translate(dictionaries.dashboard.overview.months.jan), revenue: 4000 }, 
    { month: translate(dictionaries.dashboard.overview.months.feb), revenue: 5000 },
    { month: translate(dictionaries.dashboard.overview.months.mar), revenue: 4500 }, 
    { month: translate(dictionaries.dashboard.overview.months.apr), revenue: 6000 },
    { month: translate(dictionaries.dashboard.overview.months.may), revenue: 5500 }, 
    { month: translate(dictionaries.dashboard.overview.months.jun), revenue: 7500 },
    { month: translate(dictionaries.dashboard.overview.months.jul), revenue: 8500 }, 
    { month: translate(dictionaries.dashboard.overview.months.aug), revenue: 7800 },
    { month: translate(dictionaries.dashboard.overview.months.sep), revenue: 9000 }, 
    { month: translate(dictionaries.dashboard.overview.months.oct), revenue: 11000 },
    { month: translate(dictionaries.dashboard.overview.months.nov), revenue: 10500 }, 
    { month: translate(dictionaries.dashboard.overview.months.dec), revenue: 13000 },
  ];

  const processData = [
    { day: translate(dictionaries.dashboard.overview.days.mon), purchases: 120, processes: 80 }, 
    { day: translate(dictionaries.dashboard.overview.days.tue), purchases: 150, processes: 100 },
    { day: translate(dictionaries.dashboard.overview.days.wed), purchases: 180, processes: 160 }, 
    { day: translate(dictionaries.dashboard.overview.days.thu), purchases: 140, processes: 110 },
    { day: translate(dictionaries.dashboard.overview.days.fri), purchases: 200, processes: 190 }, 
    { day: translate(dictionaries.dashboard.overview.days.sat), purchases: 250, processes: 220 },
    { day: translate(dictionaries.dashboard.overview.days.sun), purchases: 210, processes: 180 },
  ];

  const holidaySalesData = [
    { day: '1', sales: 400, isHoliday: false },
    { day: '5', sales: 430, isHoliday: false },
    { day: '10', sales: 850, isHoliday: true, name: 'Eid Al-Fitr' },
    { day: '11', sales: 900, isHoliday: true, name: 'Eid Al-Fitr' },
    { day: '15', sales: 410, isHoliday: false },
    { day: '20', sales: 480, isHoliday: false },
    { day: '25', sales: 600, isHoliday: true, name: 'National Day' },
    { day: '30', sales: 450, isHoliday: false },
  ];

  const productData = [
    { name: translate(dictionaries.dashboard.overview.categories.electronics), value: 400, color: '#00b517' },
    { name: translate(dictionaries.dashboard.overview.categories.clothing), value: 300, color: '#0D6EFD' },
    { name: translate(dictionaries.dashboard.overview.categories.home), value: 300, color: '#fa3434' },
    { name: translate(dictionaries.dashboard.overview.categories.sports), value: 200, color: '#8b96a5' },
  ];

  const usersData = [
    { week: translate(dictionaries.dashboard.overview.weeks.w1), users: 150 }, 
    { week: translate(dictionaries.dashboard.overview.weeks.w2), users: 230 },
    { week: translate(dictionaries.dashboard.overview.weeks.w3), users: 340 }, 
    { week: translate(dictionaries.dashboard.overview.weeks.w4), users: 290 },
    { week: translate(dictionaries.dashboard.overview.weeks.w5), users: 450 }, 
    { week: translate(dictionaries.dashboard.overview.weeks.w6), users: 500 },
  ];

  const priceSalesData = [
    { product: 'Prod A', price: 120, sales: 800 }, { product: 'Prod B', price: 250, sales: 400 },
    { product: 'Prod C', price: 45, sales: 1200 }, { product: 'Prod D', price: 300, sales: 250 },
    { product: 'Prod E', price: 80, sales: 900 }, { product: 'Prod F', price: 500, sales: 150 },
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

      <div className="charts-grid">
        <div className="chart-card full-width">
            <h3>{translate(dictionaries.dashboard.overview.charts.revenueTitle)}</h3>
            <p className="chart-description">{translate(dictionaries.dashboard.overview.charts.revenueDesc)}</p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00b517" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00b517" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} dy={10} />
                <YAxis axisLine={false} tickLine={false} dx={-10} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#00b517" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
        </div>

        <div className="chart-card">
            <h3>{translate(dictionaries.dashboard.overview.charts.purchasesTitle)}</h3>
            <p className="chart-description">{translate(dictionaries.dashboard.overview.charts.purchasesDesc)}</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={processData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} dy={10} />
                <YAxis axisLine={false} tickLine={false} dx={-10} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.02)'}} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="purchases" fill="#0D6EFD" radius={[4, 4, 0, 0]} name={translate(dictionaries.dashboard.overview.charts.purchasesLegend)} />
                <Bar dataKey="processes" fill="#10b981" radius={[4, 4, 0, 0]} name={translate(dictionaries.dashboard.overview.charts.processesLegend)} />
              </BarChart>
            </ResponsiveContainer>
        </div>

        <div className="chart-card">
            <h3>{translate(dictionaries.dashboard.overview.charts.usersTitle)}</h3>
            <p className="chart-description">{translate(dictionaries.dashboard.overview.charts.usersDesc)}</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usersData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="stepAfter" dataKey="users" stroke="#fa3434" strokeWidth={3} dot={{r: 4}} name={translate(dictionaries.dashboard.overview.charts.newUsersLegend)} />
              </LineChart>
            </ResponsiveContainer>
        </div>

        <div className="chart-card full-width">
            <h3>{translate(dictionaries.dashboard.overview.charts.holidayTitle)}</h3>
            <p className="chart-description">
              {translate(dictionaries.dashboard.overview.charts.holidayDesc)} <strong style={{color:"#ff9017"}}>{translate(dictionaries.dashboard.overview.charts.holidayDescHighlight)}</strong>
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={holidaySalesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} dy={10} />
                <YAxis axisLine={false} tickLine={false} dx={-10} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.02)'}} content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div style={{ background: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{translate(dictionaries.dashboard.overview.misc.day)} {data.day}</p>
                        <p style={{ margin: 0, color: data.isHoliday ? '#ff9017' : '#0D6EFD' }}>
                          {translate(dictionaries.dashboard.overview.misc.sales)}: {data.sales}
                        </p>
                        {data.isHoliday && <p style={{ margin: 0, color: '#ff9017' }}>{translate(dictionaries.dashboard.overview.misc.holiday)}: {data.name}</p>}
                      </div>
                    );
                  }
                  return null;
                }} />
                <Bar dataKey="sales" shape={(props: any) => {
                   const { fill, x, y, width, height, isHoliday } = props;
                   return <rect x={x} y={y} width={width} height={height} fill={props.payload.isHoliday ? '#ff9017' : '#0D6EFD'} rx={4} ry={4} />;
                }} />
              </BarChart>
            </ResponsiveContainer>
        </div>

        <div className="chart-card">
            <h3>{translate(dictionaries.dashboard.overview.charts.productsTitle)}</h3>
            <p className="chart-description">{translate(dictionaries.dashboard.overview.charts.productsDesc)}</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={productData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
        </div>

        <div className="chart-card">
            <h3>{translate(dictionaries.dashboard.overview.charts.pricesTitle)}</h3>
            <p className="chart-description">{translate(dictionaries.dashboard.overview.charts.pricesDesc)}</p>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={priceSalesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="product" axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" orientation="left" stroke="#0D6EFD" axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#00b517" axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend iconType="circle" />
                <Bar yAxisId="left" dataKey="sales" fill="#0D6EFD" radius={[4, 4, 0, 0]} name={translate(dictionaries.dashboard.overview.charts.totalUnitsLegend)} />
                <Line yAxisId="right" type="monotone" dataKey="price" stroke="#00b517" strokeWidth={3} name={translate(dictionaries.dashboard.overview.charts.unitPriceLegend)} />
              </ComposedChart>
            </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
