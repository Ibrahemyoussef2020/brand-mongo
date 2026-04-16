'use client';

import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes, faPlus, faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { dictionaries } from "@/lib/dictionaries";

interface Product {
  _id: string;
  static_id: string;
  title: { en: string; ar: string };
  category: { en: string; ar: string };
  type?: { en: string; ar: string };
  price: number;
  oldPrice?: number;
  stockCount: number;
  image: string;
  image2?: string;
  image3?: string;
  image4?: string;
  brand?: { en: string; ar: string };
  description?: { en: string; ar: string };
}

export default function ProductsPage({ params: { locale } }: { params: { locale: 'en' | 'ar' } }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [editPrice, setEditPrice] = useState<number>(0);
    const [editOldPrice, setEditOldPrice] = useState<number>(0);
    const [editStock, setEditStock] = useState<number>(0);
    const [editTitle, setEditTitle] = useState<{ en: string; ar: string }>({ en: '', ar: '' });
    const [editCategory, setEditCategory] = useState<{ en: string; ar: string }>({ en: '', ar: '' });
    const [editType, setEditType] = useState<{ en: string; ar: string }>({ en: '', ar: '' });
    const [editBrand, setEditBrand] = useState<{ en: string; ar: string }>({ en: '', ar: '' });
    const [editDescription, setEditDescription] = useState<{ en: string; ar: string }>({ en: '', ar: '' });
    const [staticId, setStaticId] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [image2, setImage2] = useState<string>('');
    const [image3, setImage3] = useState<string>('');
    const [image4, setImage4] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string>('');
    const [imagePreview2, setImagePreview2] = useState<string>('');
    const [imagePreview3, setImagePreview3] = useState<string>('');
    const [imagePreview4, setImagePreview4] = useState<string>('');
    const fileInputRef1 = useRef<HTMLInputElement>(null);
    const fileInputRef2 = useRef<HTMLInputElement>(null);
    const fileInputRef3 = useRef<HTMLInputElement>(null);
    const fileInputRef4 = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            if (res.ok) {
                const data = await res.json();
                // Extract the data array from the response
                setProducts(Array.isArray(data) ? data : data.data || []);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setImagePath: any, setPreview: any) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setPreview(base64);
            };
            reader.readAsDataURL(file);

            // Upload file
            const formData = new FormData();
            formData.append('file', file);
            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });
                if (res.ok) {
                    const data = await res.json();
                    setImagePath(data.imagePath);
                } else {
                    console.error('Upload failed');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const openEditModal = (product: Product) => {
        setIsAddMode(false);
        setSelectedProduct(product);
        setEditPrice(product.price);
        setEditOldPrice(product.oldPrice || 0);
        setEditStock(product.stockCount);
        setEditTitle(product.title);
        setEditCategory(product.category || { en: '', ar: '' });
        setEditType(product.type || { en: '', ar: '' });
        setEditBrand(product.brand || { en: '', ar: '' });
        setEditDescription(product.description || { en: '', ar: '' });
        setStaticId(product.static_id);
        setImage(product.image || '');
        setImage2((product as any).image2 || '');
        setImage3((product as any).image3 || '');
        setImage4((product as any).image4 || '');
        setImagePreview(product.image ? `/${product.image}.webp` : '');
        setImagePreview2((product as any).image2 ? `/${ (product as any).image2}.webp` : '');
        setImagePreview3((product as any).image3 ? `/${ (product as any).image3}.webp` : '');
        setImagePreview4((product as any).image4 ? `/${ (product as any).image4}.webp` : '');
        setModalOpen(true);
    };

    const openAddModal = () => {
        setIsAddMode(true);
        setSelectedProduct(null);
        setEditPrice(0);
        setEditOldPrice(0);
        setEditStock(0);
        setEditTitle({ en: '', ar: '' });
        setEditCategory({ en: '', ar: '' });
        setEditType({ en: '', ar: '' });
        setEditBrand({ en: '', ar: '' });
        setEditDescription({ en: '', ar: '' });
        // Auto-generate static_id based on highest existing ID
        const maxId = products.reduce((max, product) => {
            const num = parseInt(product.static_id.split('-').pop() || '0', 10);
            return num > max ? num : max;
        }, 0);
        setStaticId(`product-${maxId + 1}`);
        setImage('');
        setImage2('');
        setImage3('');
        setImage4('');
        setImagePreview('');
        setImagePreview2('');
        setImagePreview3('');
        setImagePreview4('');
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setIsAddMode(false);
        setSelectedProduct(null);
        setEditPrice(0);
        setEditOldPrice(0);
        setEditStock(0);
        setEditTitle({ en: '', ar: '' });
        setEditCategory({ en: '', ar: '' });
        setEditType({ en: '', ar: '' });
        setEditBrand({ en: '', ar: '' });
        setEditDescription({ en: '', ar: '' });
        setStaticId('');
        setImage('');
        setImage2('');
        setImage3('');
        setImage4('');
        setImagePreview('');
        setImagePreview2('');
        setImagePreview3('');
        setImagePreview4('');
    };

    const saveProduct = async () => {
        if (isAddMode) {
            // Add new product
            if (!editTitle.en || !editCategory.en) {
                alert('Please fill in required fields (title, category)');
                return;
            }
            try {
                const res = await fetch('/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        static_id: staticId,
                        price: editPrice,
                        oldPrice: editOldPrice,
                        stockCount: editStock,
                        title: editTitle,
                        category: editCategory,
                        type: editType,
                        brand: editBrand,
                        description: editDescription,
                        image: image,
                        image2: image2,
                        image3: image3,
                        image4: image4
                    })
                });
                if (res.ok) {
                    fetchProducts();
                    closeModal();
                } else {
                    console.error('Error creating product');
                }
            } catch (error) {
                console.error('Error creating product:', error);
            }
        } else {
            // Update existing product
            if (!selectedProduct) return;
            try {
                const res = await fetch('/api/products', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        productId: selectedProduct._id,
                        price: editPrice,
                        oldPrice: editOldPrice,
                        stockCount: editStock,
                        title: editTitle,
                        category: editCategory,
                        type: editType,
                        brand: editBrand,
                        description: editDescription,
                        image: image,
                        image2: image2,
                        image3: image3,
                        image4: image4
                    })
                });
                if (res.ok) {
                    fetchProducts();
                    closeModal();
                } else {
                    console.error('Error updating product');
                }
            } catch (error) {
                console.error('Error updating product:', error);
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    const productsData = products;
    
    return (
        <div className="dashboard-page">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>{dictionaries.dashboard.pages.productsHeader[locale]}</h2>
                <button 
                    onClick={openAddModal}
                    style={{
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    Add Product
                </button>
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
                                            <button className="btn-outline" title={dictionaries.dashboard.tables.edit[locale]} onClick={() => openEditModal(product)}>
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

            {modalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3>{isAddMode ? 'Add Product' : 'Edit Product'}</h3>
                            <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        

                        
                        <div className="form-group">
                            <label>Title (English):</label>
                            <input 
                                type="text" 
                                value={editTitle.en} 
                                onChange={(e) => setEditTitle({ ...editTitle, en: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Title (Arabic):</label>
                            <input 
                                type="text" 
                                value={editTitle.ar} 
                                onChange={(e) => setEditTitle({ ...editTitle, ar: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Price:</label>
                            <input 
                                type="number" 
                                value={editPrice} 
                                onChange={(e) => setEditPrice(Number(e.target.value))}
                                step="0.01"
                                min="0"
                            />
                        </div>

                        <div className="form-group">
                            <label>Old Price:</label>
                            <input 
                                type="number" 
                                value={editOldPrice} 
                                onChange={(e) => setEditOldPrice(Number(e.target.value))}
                                step="0.01"
                                min="0"
                            />
                        </div>

                        <div className="form-group">
                            <label>Category (English):</label>
                            <input 
                                type="text" 
                                value={editCategory.en} 
                                onChange={(e) => setEditCategory({ ...editCategory, en: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Category (Arabic):</label>
                            <input 
                                type="text" 
                                value={editCategory.ar} 
                                onChange={(e) => setEditCategory({ ...editCategory, ar: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Type (English):</label>
                            <input 
                                type="text" 
                                value={editType.en} 
                                onChange={(e) => setEditType({ ...editType, en: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Type (Arabic):</label>
                            <input 
                                type="text" 
                                value={editType.ar} 
                                onChange={(e) => setEditType({ ...editType, ar: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Brand (English):</label>
                            <input 
                                type="text" 
                                value={editBrand.en} 
                                onChange={(e) => setEditBrand({ ...editBrand, en: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Brand (Arabic):</label>
                            <input 
                                type="text" 
                                value={editBrand.ar} 
                                onChange={(e) => setEditBrand({ ...editBrand, ar: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Description (English):</label>
                            <textarea 
                                value={editDescription.en} 
                                onChange={(e) => setEditDescription({ ...editDescription, en: e.target.value })}
                                rows={3}
                                style={{width:'100%' , padding:'.5rem'}}
                            />
                        </div>

                        <div className="form-group">
                            <label>Description (Arabic):</label>
                            <textarea 
                                value={editDescription.ar} 
                                onChange={(e) => setEditDescription({ ...editDescription, ar: e.target.value })}
                                rows={3}
                                style={{width:'100%' , padding:'.5rem'}}
                            />
                        </div>

                        <div className="form-group">
                            <label>Stock Count:</label>
                            <input 
                                type="number" 
                                value={editStock} 
                                onChange={(e) => setEditStock(Number(e.target.value))}
                                min="0"
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Image 1:</label>
                                <input 
                                    ref={fileInputRef1}
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, setImage, setImagePreview)}
                                    style={{ display: 'none' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef1.current?.click()}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        width: '100%',
                                        padding: '10px',
                                        border: '2px dashed #007bff',
                                        borderRadius: '4px',
                                        background: '#f0f7ff',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        color: '#007bff'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                                    Upload Image
                                </button>
                                {imagePreview && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img src={imagePreview} alt="Image 1 Preview" style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '4px' }} />
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Image 2:</label>
                                <input 
                                    ref={fileInputRef2}
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, setImage2, setImagePreview2)}
                                    style={{ display: 'none' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef2.current?.click()}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        width: '100%',
                                        padding: '10px',
                                        border: '2px dashed #007bff',
                                        borderRadius: '4px',
                                        background: '#f0f7ff',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        color: '#007bff'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                                    Upload Image
                                </button>
                                {imagePreview2 && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img src={imagePreview2} alt="Image 2 Preview" style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '4px' }} />
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Image 3:</label>
                                <input 
                                    ref={fileInputRef3}
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, setImage3, setImagePreview3)}
                                    style={{ display: 'none' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef3.current?.click()}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        width: '100%',
                                        padding: '10px',
                                        border: '2px dashed #007bff',
                                        borderRadius: '4px',
                                        background: '#f0f7ff',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        color: '#007bff'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                                    Upload Image
                                </button>
                                {imagePreview3 && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img src={imagePreview3} alt="Image 3 Preview" style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '4px' }} />
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Image 4:</label>
                                <input 
                                    ref={fileInputRef4}
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, setImage4, setImagePreview4)}
                                    style={{ display: 'none' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef4.current?.click()}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        width: '100%',
                                        padding: '10px',
                                        border: '2px dashed #007bff',
                                        borderRadius: '4px',
                                        background: '#f0f7ff',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        color: '#007bff'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                                    Upload Image
                                </button>
                                {imagePreview4 && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img src={imagePreview4} alt="Image 4 Preview" style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '4px' }} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button onClick={closeModal} className="btn-secondary">Cancel</button>
                            <button onClick={saveProduct} className="btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
