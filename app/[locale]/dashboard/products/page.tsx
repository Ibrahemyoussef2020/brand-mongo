import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";

import { dictionaries } from "@/lib/dictionaries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export const dynamic = 'force-dynamic';

export default async function ProductsPage({ params: { locale } }: { params: { locale: 'en' | 'ar' } }) {
    await dbConnect();
    const productsData = await ProductModel.find({}).sort({ createdAt: -1 }).lean();
    
    return (
        <div className="dashboard-page">
            <div className="page-header">
                <h2>{dictionaries.dashboard.pages.productsHeader[locale]}</h2>
            </div>
            <div className="stats-grid" style={{ display: 'block' }}>
                <div className="table-container">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>{dictionaries.dashboard.tables.item[locale]}</th>
                                <th>{dictionaries.dashboard.tables.category[locale]}</th>
                                <th>{dictionaries.dashboard.tables.price[locale]}</th>
                                <th>{dictionaries.dashboard.tables.stock[locale]}</th>
                                <th>{dictionaries.dashboard.tables.status[locale]}</th>
                                <th>{dictionaries.dashboard.tables.actions[locale]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsData.map((product: any) => (
                                <tr key={product._id.toString()}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {product.image && <img src={`/${product.image}.webp`} alt="Product" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px' }} />}
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 600 }}>{product.title?.[locale] || product.title?.en || dictionaries.dashboard.tables.unnamed[locale]}</span>
                                                <span style={{ fontSize: '0.75rem', color: '#8b96a5' }}>ID: {product.static_id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.category?.[locale] || product.category?.en || "-"}</td>
                                    <td>${product.price}</td>
                                    <td>{product.stockCount || 0}</td>
                                    <td>
                                        {(product.stockCount || 0) > 10 ? 
                                            <span className="pill success">{dictionaries.dashboard.tables.inStock[locale]}</span> : 
                                            (product.stockCount || 0) > 0 ? 
                                            <span className="pill warning">{dictionaries.dashboard.tables.lowStock[locale]}</span> : 
                                            <span className="pill danger">{dictionaries.dashboard.tables.outOfStock[locale]}</span>
                                        }
                                    </td>
                                    <td>
                                        <div className="action-btns">
                                            <button className="btn-outline" title={dictionaries.dashboard.tables.edit[locale]}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {productsData.length === 0 && (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>{dictionaries.dashboard.tables.noProducts[locale]}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
