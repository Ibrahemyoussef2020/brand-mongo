'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { dictionaries } from "@/lib/dictionaries";
import { toast } from 'react-toastify';
import TableSkeleton from "@/components/skeletons/TableSkeleton";

interface Order {
  _id: string;
  user: string;
  items: any[];
  totalBill: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  requiresUserApproval?: boolean;
  proposedChanges?: {
      items?: any[];
      status?: string;
  };
}

interface Product {
  _id: string;
  title: { en: string; ar: string };
  price: number;
  image: string;
}

export default function OrdersPage({ params: { locale } }: { params: { locale: 'en' | 'ar' } }) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [editItems, setEditItems] = useState<any[]>([]);
    const [editStatus, setEditStatus] = useState<string>('');
    const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
    const [editItemQuantity, setEditItemQuantity] = useState<number>(1);
    const [selectedProduct, setSelectedProduct] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [orderToView, setOrderToView] = useState<Order | null>(null);
    const [popupMessage, setPopupMessage] = useState<{title: string, message: string, type: 'success' | 'error'} | null>(null);

    useEffect(() => {
        fetchOrders();
        fetchProducts();
    }, []);

    const resolveImage = (imagePath: string) => {
        if (!imagePath) return "/images/placeholder.webp";
        if (imagePath.startsWith('http')) return imagePath;
        const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
        if (path.includes('.')) return path;
        return `${path}.webp`;
    };

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/admin/orders'); // Assuming there's an admin API
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            } else {
                // Fallback to direct fetch if admin API not available
                const res2 = await fetch('/api/orders');
                if (res2.ok) {
                    const data = await res2.json();
                    setOrders(data);
                }
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            if (res.ok) {
                const result = await res.json();
                // The API returns { total, page, limit, totalPages, data: [...] }
                const productsArray = Array.isArray(result) ? result : (result.data || []);
                setProducts(productsArray);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const openEditModal = (order: Order) => {
        setSelectedOrder(order);
        setEditItems(JSON.parse(JSON.stringify(order.items)));
        setEditStatus(order.status);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedOrder(null);
        setEditItems([]);
        setEditStatus('');
        setSelectedProduct('');
        setQuantity(1);
        setEditingItemIndex(null);
    };

    const addProduct = () => {
        if (!selectedProduct || quantity <= 0) return;
        const product = products.find(p => p._id === selectedProduct);
        if (!product) return;
        const newItem = {
            product: product._id,
            quantity,
            price: product.price,
            title: product.title,
            image: product.image,
            total: product.price * quantity
        };
        setEditItems([...editItems, newItem]);
        setSelectedProduct('');
        setQuantity(1);
    };

    const removeItem = (index: number) => {
        setEditItems(editItems.filter((_, i) => i !== index));
    };

    const startEditItem = (index: number) => {
        setEditingItemIndex(index);
        setEditItemQuantity(editItems[index].quantity);
    };

    const saveEditItem = () => {
        if (editingItemIndex !== null) {
            const updatedItems = [...editItems];
            updatedItems[editingItemIndex] = {
                ...updatedItems[editingItemIndex],
                quantity: editItemQuantity,
                total: updatedItems[editingItemIndex].price * editItemQuantity
            };
            setEditItems(updatedItems);
            setEditingItemIndex(null);
        }
    };

    const cancelEditItem = () => {
        setEditingItemIndex(null);
    };

    const saveOrder = async () => {
        if (!selectedOrder) return;
        
        try {
            const itemsChanged = JSON.stringify(editItems) !== JSON.stringify(selectedOrder.items);
            
            const payload: any = {
                orderId: selectedOrder._id,
                status: editStatus,
            };
            
            if (itemsChanged) {
                payload.items = editItems;
            }

            const res = await fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const data = await res.json();
                closeModal();
                if (data.order?.requiresUserApproval) {
                    setPopupMessage({ title: 'Modifications Proposed', message: 'The modification will be sent to the user first to confirm it.', type: 'success' });
                } else {
                    setPopupMessage({ title: 'Success', message: 'Order updated successfully.', type: 'success' });
                }
                fetchOrders();
            } else {
                const errData = await res.json();
                setPopupMessage({ title: 'Error', message: 'Error updating order: ' + (errData.error || errData.message), type: 'error' });
            }
        } catch (error) {
            console.error('Error updating order:', error);
            setPopupMessage({ title: 'Error', message: 'Error updating order: ' + String(error), type: 'error' });
        }
    };



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
                                <th>{dictionaries.dashboard.tables.actions[locale]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <TableSkeleton columns={7} rows={6} />
                            ) : orders.map((order) => (
                                <tr key={order._id}>
                                    <td>
                                        <span style={{ fontWeight: 600, color: '#0D6EFD' }}>#{order._id.slice(-6)}</span>
                                    </td>
                                    <td>
                                        <span style={{ fontSize: '0.85rem' }}>{order.user}</span>
                                    </td>
                                    <td>{order.items?.length || 0}</td>
                                    <td style={{ fontWeight: 700 }}>${order.totalBill?.toFixed(2) || '0.00'}</td>
                                    <td>
                                        {order.requiresUserApproval ? <span className="pill warning">Pending User Approval</span>
                                        : Object.is(order.status, "Delivered") ? <span className="pill success">{dictionaries.dashboard.tables.statusDelivered[locale]}</span> 
                                        : Object.is(order.status, "Pending") ? <span className="pill warning">{dictionaries.dashboard.tables.statusPending[locale]}</span>
                                        : Object.is(order.status, "Cancelled") ? <span className="pill danger">{dictionaries.dashboard.tables.statusCancelled[locale]}</span>
                                        : <span className="pill info">{dictionaries.dashboard.tables.statusProcessing[locale]}</span>}
                                    </td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div className="action-btns" style={{ display: 'flex', gap: '5px' }}>
                                            <button className="btn-outline" title="View Details" onClick={() => { setOrderToView(order); setViewModalOpen(true); }}>
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>
                                            <button className="btn-outline" title={dictionaries.dashboard.tables.edit[locale]} onClick={() => openEditModal(order)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!loading && orders.length === 0 && (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>{dictionaries.dashboard.tables.noOrders[locale]}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


            {modalOpen && selectedOrder && (
                <div className="modal-overlay modal-overlay--product" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Edit Order #{selectedOrder._id.slice(-6)}</h3>
                        <div className="form-group">
                            <label>Status:</label>
                            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <h4>Items:</h4>
                            <ul>
                                {editItems.map((item, index) => (
                                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        {editingItemIndex === index ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span>{item.title?.[locale] || item.title?.en}</span>
                                                <input 
                                                    type="number" 
                                                    value={editItemQuantity} 
                                                    onChange={(e) => setEditItemQuantity(Number(e.target.value))} 
                                                    min="1" 
                                                    style={{ width: '60px' }}
                                                />
                                                <button onClick={saveEditItem} className="btn-primary" style={{ padding: '4px 8px' }}>Save</button>
                                                <button onClick={cancelEditItem} className="btn-secondary" style={{ padding: '4px 8px' }}>Cancel</button>
                                            </div>
                                        ) : (
                                            <span>{item.title?.[locale] || item.title?.en} x{item.quantity} - ${item.total?.toFixed(2)}</span>
                                        )}
                                        <div>
                                            {editingItemIndex !== index && (
                                                <button onClick={() => startEditItem(index)} className="btn-outline" style={{ marginRight: '5px', padding: '4px 8px' }}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                            )}
                                            <button onClick={() => removeItem(index)} className="btn-danger">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="form-group">
                            <h4>Add Product:</h4>
                            <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                                <option value="">Select Product</option>
                                {products.map((product) => (
                                    <option key={product._id} value={product._id}>
                                        {product.title?.[locale] || product.title?.en} - ${product.price}
                                    </option>
                                ))}
                            </select>
                            <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min="1" />
                            <button onClick={addProduct} className="btn-primary">
                                <FontAwesomeIcon icon={faPlus} /> Add
                            </button>
                        </div>
                        <div className="modal-actions">
                            <button onClick={closeModal} className="btn-secondary">Cancel</button>
                            <button onClick={saveOrder} className="btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            )}
            {viewModalOpen && orderToView && (
                <div className="modal-overlay modal-overlay--product" onClick={() => setViewModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                        <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Order Details #{orderToView._id.slice(-6)}</h3>
                        
                        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                            <h4 style={{ marginTop: 0, marginBottom: '10px', color: '#333' }}>Customer Information</h4>
                            <p style={{ margin: '5px 0' }}><strong>User:</strong> {orderToView.user}</p>
                            <p style={{ margin: '5px 0' }}><strong>Shipping Address:</strong> {(orderToView as any).shippingAddress || 'Not provided'}</p>
                        </div>

                        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                            <h4 style={{ marginTop: 0, marginBottom: '10px', color: '#333' }}>Order Timeline</h4>
                            <p style={{ margin: '5px 0' }}><strong>Ordered At:</strong> {new Date(orderToView.createdAt).toLocaleString()}</p>
                            <p style={{ margin: '5px 0' }}><strong>Last Updated:</strong> {new Date((orderToView as any).updatedAt || orderToView.createdAt).toLocaleString()}</p>
                            <p style={{ margin: '5px 0' }}><strong>Status:</strong> {orderToView.status}</p>
                            <p style={{ margin: '5px 0' }}><strong>Payment ID:</strong> {(orderToView as any).paymentIntentId || 'N/A'}</p>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{ marginBottom: '10px', color: '#333' }}>Products Purchased</h4>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left', backgroundColor: '#f8f9fa' }}>
                                            <th style={{ padding: '10px' }}>Product</th>
                                            <th style={{ padding: '10px' }}>Qty</th>
                                            <th style={{ padding: '10px' }}>Price</th>
                                            <th style={{ padding: '10px' }}>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderToView.items?.map((item, idx) => (
                                            <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                                                <td style={{ padding: '10px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        {item.image && <img src={resolveImage(item.image)} alt="product" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                                                        <span>{item.title?.[locale] || item.title?.en || 'Unknown Product'}</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '10px' }}>{item.quantity}</td>
                                                <td style={{ padding: '10px' }}>${item.price?.toFixed(2)}</td>
                                                <td style={{ padding: '10px', fontWeight: 'bold' }}>${(item.total || (item.price * item.quantity))?.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={3} style={{ textAlign: 'right', padding: '12px 10px', fontWeight: 'bold' }}>Total Bill:</td>
                                            <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#0D6EFD', fontSize: '1.1rem' }}>${orderToView.totalBill?.toFixed(2)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        {(orderToView as any).requiresUserApproval && (
                            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fff3cd', border: '1px solid #ffeeba', borderRadius: '8px', color: '#856404' }}>
                                <h4 style={{ margin: '0 0 10px 0' }}>⚠️ The modification is waiting for confirmation from user</h4>
                                <p style={{ margin: 0, fontSize: '0.9rem' }}>The proposed new total is <strong>${(orderToView as any).proposedChanges?.totalBill?.toFixed(2)}</strong>. The order will remain as is until the user accepts the changes.</p>
                            </div>
                        )}

                        <div className="modal-actions" style={{ justifyContent: 'flex-end', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                            <button onClick={() => setViewModalOpen(false)} className="btn-primary" style={{ minWidth: '100px' }}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {popupMessage && (
                <div className="modal-overlay" style={{ zIndex: 11000 }} onClick={() => setPopupMessage(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center', padding: '30px' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '15px', color: popupMessage.type === 'success' ? '#00B517' : '#FA3434' }}>
                            {popupMessage.type === 'success' ? '✅' : '❌'}
                        </div>
                        <h3 style={{ marginBottom: '10px' }}>{popupMessage.title}</h3>
                        <p style={{ color: '#666', marginBottom: '25px', lineHeight: '1.5' }}>{popupMessage.message}</p>
                        <button className="btn-primary" style={{ width: '100%', padding: '10px' }} onClick={() => setPopupMessage(null)}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
