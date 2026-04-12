import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/models/OrderModel";

import { dictionaries } from "@/lib/dictionaries";

export const dynamic = 'force-dynamic';

export default async function OrdersPage({ params: { locale } }: { params: { locale: 'en' | 'ar' } }) {
    await dbConnect();
    const ordersData = await OrderModel.find({}).sort({ createdAt: -1 }).lean();
    
    return (
        <div className="dashboard-page">
            <div className="page-header">
                <h2>{dictionaries.dashboard.pages.ordersHeader[locale]}</h2>
            </div>
            <div className="stats-grid" style={{ display: 'block' }}>
                <div className="table-container">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>{dictionaries.dashboard.tables.orderId[locale]}</th>
                                <th>{dictionaries.dashboard.tables.userId[locale]}</th>
                                <th>{dictionaries.dashboard.tables.items[locale]}</th>
                                <th>{dictionaries.dashboard.tables.total[locale]}</th>
                                <th>{dictionaries.dashboard.tables.status[locale]}</th>
                                <th>{dictionaries.dashboard.tables.date[locale]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersData.map((order: any) => (
                                <tr key={order._id.toString()}>
                                    <td>
                                        <span style={{ fontWeight: 600, color: '#0D6EFD' }}>#{order._id.toString().slice(-6)}</span>
                                    </td>
                                    <td>
                                        <span style={{ fontSize: '0.85rem' }}>{order.user}</span>
                                    </td>
                                    <td>{order.items?.length || 0}</td>
                                    <td style={{ fontWeight: 700 }}>${order.totalBill?.toFixed(2) || '0.00'}</td>
                                    <td>
                                        {Object.is(order.status, "Delivered") ? <span className="pill success">{dictionaries.dashboard.tables.statusDelivered[locale]}</span> 
                                        : Object.is(order.status, "Pending") ? <span className="pill warning">{dictionaries.dashboard.tables.statusPending[locale]}</span>
                                        : Object.is(order.status, "Cancelled") ? <span className="pill danger">{dictionaries.dashboard.tables.statusCancelled[locale]}</span>
                                        : <span className="pill info">{dictionaries.dashboard.tables.statusProcessing[locale]}</span>}
                                    </td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {ordersData.length === 0 && (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>{dictionaries.dashboard.tables.noOrders[locale]}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
