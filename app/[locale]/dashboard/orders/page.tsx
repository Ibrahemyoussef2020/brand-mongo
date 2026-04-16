'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { dictionaries } from "@/lib/dictionaries";

interface Order {
  _id: string;
  user: string;
  items: any[];
  totalBill: number;
  status: string;
  createdAt: string;
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

    useEffect(() => {
        fetchOrders();
        fetchProducts();
    }, []);

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
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const openEditModal = (order: Order) => {
        setSelectedOrder(order);
        setEditItems([...order.items]);
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
            updatedItems[editingItemIndex].quantity = editItemQuantity;
            updatedItems[editingItemIndex].total = updatedItems[editingItemIndex].price * editItemQuantity;
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
            const res = await fetch('/api/orders', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: selectedOrder._id,
                    status: editStatus,
                    items: editItems
                })
            });
            if (res.ok) {
                fetchOrders();
                closeModal();
            } else {
                console.error('Error updating order');
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

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
                            {orders.map((order) => (
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
                                        {Object.is(order.status, "Delivered") ? <span className="pill success">{dictionaries.dashboard.tables.statusDelivered[locale]}</span> 
                                        : Object.is(order.status, "Pending") ? <span className="pill warning">{dictionaries.dashboard.tables.statusPending[locale]}</span>
                                        : Object.is(order.status, "Cancelled") ? <span className="pill danger">{dictionaries.dashboard.tables.statusCancelled[locale]}</span>
                                        : <span className="pill info">{dictionaries.dashboard.tables.statusProcessing[locale]}</span>}
                                    </td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div className="action-btns">
                                            <button className="btn-outline" title={dictionaries.dashboard.tables.edit[locale]} onClick={() => openEditModal(order)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
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
        </div>
    );
}
