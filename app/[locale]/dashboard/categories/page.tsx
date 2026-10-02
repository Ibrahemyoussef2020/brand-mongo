'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useLang } from "@/context/LangContext";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import Modal from "@/components/dashboard/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPenToSquare, faTrash, faEye, faPlus, faSearch, faFilter, 
  faFolderOpen, faBoxesStacked, faLayerGroup, faCheckCircle, 
  faClock, faTimesCircle, faArrowRotateRight, faTableCells, faList,
  faImage, faTag, faArrowUpRightFromSquare
} from '@fortawesome/free-solid-svg-icons';

export interface CategoryItem {
  id: string;
  name: { en: string; ar?: string };
  slug: string;
  itemCount: number;
  featured: boolean;
  status: 'Active' | 'Pending' | 'Inactive';
  icon?: string;
  image?: string;
  date: string;
}

const INITIAL_CATEGORIES: CategoryItem[] = [
  { 
    id: 'CAT-101', 
    name: { en: 'Consumer Electronics', ar: 'إلكترونيات استهلاكية' }, 
    slug: 'electronics', 
    itemCount: 428, 
    featured: true, 
    status: 'Active', 
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    date: 'Oct 12, 2026' 
  },
  { 
    id: 'CAT-102', 
    name: { en: 'Home & Outdoor', ar: 'المنزل والحديقة' }, 
    slug: 'home-outdoor', 
    itemCount: 312, 
    featured: true, 
    status: 'Active', 
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60',
    date: 'Oct 14, 2026' 
  },
  { 
    id: 'CAT-103', 
    name: { en: 'Mobile & Tech Accessories', ar: 'ملحقات الهواتف والتقنية' }, 
    slug: 'mobiles', 
    itemCount: 564, 
    featured: true, 
    status: 'Active', 
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60',
    date: 'Oct 16, 2026' 
  },
  { 
    id: 'CAT-104', 
    name: { en: 'Fashion & Apparel', ar: 'الأزياء والملابس' }, 
    slug: 'fashion', 
    itemCount: 689, 
    featured: false, 
    status: 'Active', 
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60',
    date: 'Oct 18, 2026' 
  },
  { 
    id: 'CAT-105', 
    name: { en: 'Kitchen & Interior Tools', ar: 'أدوات المطبخ والديكور' }, 
    slug: 'kitchen-tools', 
    itemCount: 195, 
    featured: false, 
    status: 'Pending', 
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=60',
    date: 'Oct 20, 2026' 
  },
  { 
    id: 'CAT-106', 
    name: { en: 'Sports & Outdoor Equipment', ar: 'الرياضة والأنشطة الخارجية' }, 
    slug: 'sports', 
    itemCount: 142, 
    featured: false, 
    status: 'Active', 
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60',
    date: 'Oct 22, 2026' 
  },
  { 
    id: 'CAT-107', 
    name: { en: 'Office Furniture & Chairs', ar: 'أثاث المكاتب والكراسي' }, 
    slug: 'chairs', 
    itemCount: 98, 
    featured: false, 
    status: 'Inactive', 
    image: 'https://images.unsplash.com/photo-1580481077197-2a548ebacab3?w=500&auto=format&fit=crop&q=60',
    date: 'Oct 24, 2026' 
  },
  { 
    id: 'CAT-108', 
    name: { en: 'Audio, Headphones & Sound', ar: 'الصوتيات وسماعات الرأس' }, 
    slug: 'headphones', 
    itemCount: 220, 
    featured: true, 
    status: 'Active', 
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60',
    date: 'Oct 25, 2026' 
  }
];

export default function CategoriesPage() {
  const { lang, translate } = useLang();
  
  // Data State
  const [data, setData] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Pending' | 'Inactive'>('All');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<CategoryItem | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    nameEn: '',
    nameAr: '',
    slug: '',
    status: 'Active' as 'Active' | 'Pending' | 'Inactive',
    featured: false,
    itemCount: 0,
    image: ''
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories');
      if (res.ok) {
        const json = await res.json();
        const mapped = json.map((c: any) => ({
          ...c,
          id: c._id || c.id,
          name: typeof c.name === 'string' ? { en: c.name, ar: c.name } : c.name
        }));
        setData(mapped);
      }
    } catch (e) {
      console.error('Failed to load categories:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filtered dataset
  const filteredCategories = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.name.ar && item.name.ar.includes(searchQuery)) ||
        item.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  // Statistics
  const totalRecords = data.length;
  const activeCount = data.filter(i => i.status === 'Active').length;
  const featuredCount = data.filter(i => i.featured).length;
  const totalProducts = data.reduce((acc, curr) => acc + (curr.itemCount || 0), 0);

  const simulateRefresh = () => {
    fetchCategories();
  };

  const handleAddClick = () => {
    setFormData({
      nameEn: '',
      nameAr: '',
      slug: '',
      status: 'Active',
      featured: false,
      itemCount: 0,
      image: ''
    });
    setIsAddModalOpen(true);
  };

  const handleEditClick = (record: CategoryItem) => {
    setSelectedRecord(record);
    setFormData({
      nameEn: record.name.en,
      nameAr: record.name.ar || '',
      slug: record.slug,
      status: record.status,
      featured: record.featured,
      itemCount: record.itemCount,
      image: record.image || ''
    });
    setIsEditModalOpen(true);
  };

  const handleViewClick = (record: CategoryItem) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (record: CategoryItem) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  // CRUD Actions
  const onSaveNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameEn.trim()) return;

    const newSlug = formData.slug.trim() || formData.nameEn.toLowerCase().replace(/\s+/g, '-');
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: { 
            en: formData.nameEn, 
            ar: formData.nameAr || formData.nameEn 
          },
          slug: newSlug,
          itemCount: Number(formData.itemCount) || 0,
          featured: formData.featured,
          status: formData.status,
          image: formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
        })
      });
      if (res.ok) {
        await fetchCategories();
        setIsAddModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecord) return;

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedRecord.id,
          name: {
            en: formData.nameEn,
            ar: formData.nameAr || selectedRecord.name.ar
          },
          slug: formData.slug || selectedRecord.slug,
          status: formData.status,
          featured: formData.featured,
          itemCount: Number(formData.itemCount) || selectedRecord.itemCount,
          image: formData.image || selectedRecord.image
        })
      });
      if (res.ok) {
        await fetchCategories();
        setIsEditModalOpen(false);
        setSelectedRecord(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onConfirmDelete = async () => {
    if (!selectedRecord) return;
    try {
      const res = await fetch(`/api/admin/categories?id=${selectedRecord.id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchCategories();
        setIsDeleteModalOpen(false);
        setSelectedRecord(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status: 'Active' | 'Pending' | 'Inactive') => {
    switch (status) {
      case 'Active':
        return <span style={{ background: '#e6f7eb', color: '#00b517', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '5px' }}><FontAwesomeIcon icon={faCheckCircle} /> Active</span>;
      case 'Pending':
        return <span style={{ background: '#fff0db', color: '#ff9017', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '5px' }}><FontAwesomeIcon icon={faClock} /> Pending</span>;
      case 'Inactive':
        return <span style={{ background: '#fef0f0', color: '#fa3434', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '5px' }}><FontAwesomeIcon icon={faTimesCircle} /> Inactive</span>;
    }
  };

  return (
    <div className="dashboard-page" style={{ paddingBottom: '60px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
            Categories Management
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            Organize catalog taxonomy, featured navigation banners, and product collections.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={simulateRefresh}
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '10px 14px',
              borderRadius: '8px',
              color: '#475569',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '600',
              fontSize: '13px'
            }}
            title="Refresh Data"
          >
            <FontAwesomeIcon icon={faArrowRotateRight} className={loading ? 'fa-spin' : ''} />
            Refresh
          </button>

          <button
            onClick={handleAddClick}
            style={{
              background: 'linear-gradient(135deg, #0D6EFD 0%, #0052cc 100%)',
              color: '#ffffff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(13, 110, 253, 0.25)'
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Category
          </button>
        </div>
      </div>

      {/* Metric Stats Cards */}
      <div className="stats-grid" style={{ marginBottom: '30px' }}>
        <StatCard label="Total Categories" value={totalRecords} trend="+8.4%" colorClass="c-blue" />
        <StatCard label="Active Categories" value={activeCount} trend="+12.1%" colorClass="c-green" />
        <StatCard label="Featured Banners" value={featuredCount} trend="+3.2%" colorClass="c-orange" />
        <StatCard label="Total Catalog Products" value={totalProducts.toLocaleString()} trend="+15.8%" colorClass="c-indigo" />
      </div>

      {/* Search, Filter & View Controls */}
      <div style={{
        background: '#ffffff',
        padding: '18px 24px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <FontAwesomeIcon 
              icon={faSearch} 
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search category name, slug, or ID..."
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                outline: 'none',
                color: '#1e293b'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FontAwesomeIcon icon={faFilter} style={{ color: '#64748b', fontSize: '13px' }} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                fontSize: '14px',
                color: '#334155',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Only</option>
              <option value="Pending">Pending Only</option>
              <option value="Inactive">Inactive Only</option>
            </select>
          </div>
        </div>

        {/* View Switcher */}
        <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              background: viewMode === 'grid' ? '#ffffff' : 'transparent',
              color: viewMode === 'grid' ? '#0D6EFD' : '#64748b',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <FontAwesomeIcon icon={faTableCells} />
            Grid View
          </button>
          <button
            onClick={() => setViewMode('table')}
            style={{
              background: viewMode === 'table' ? '#ffffff' : 'transparent',
              color: viewMode === 'table' ? '#0D6EFD' : '#64748b',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: viewMode === 'table' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <FontAwesomeIcon icon={faList} />
            Table View
          </button>
        </div>
      </div>

      {/* Main Content: Skeleton Shimmer or Cards / Table */}
      {loading ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <div className="skelton-shimmer" style={{ width: '100%', height: '140px', borderRadius: '8px', marginBottom: '16px' }} />
              <div className="skelton-shimmer" style={{ width: '60%', height: '22px', borderRadius: '4px', marginBottom: '10px' }} />
              <div className="skelton-shimmer" style={{ width: '40%', height: '14px', borderRadius: '4px', marginBottom: '16px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="skelton-shimmer" style={{ width: '80px', height: '26px', borderRadius: '20px' }} />
                <div className="skelton-shimmer" style={{ width: '60px', height: '26px', borderRadius: '4px' }} />
              </div>
            </div>
          ))}
        </div>
      ) : filteredCategories.length === 0 ? (
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '60px 20px',
          textAlign: 'center',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: '#94a3b8',
            fontSize: '24px'
          }}>
            <FontAwesomeIcon icon={faFolderOpen} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>No Categories Found</h3>
          <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '400px', margin: '0 auto 20px' }}>
            No category items matched your search query or filter criteria.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setStatusFilter('All'); }}
            style={{
              background: '#0D6EFD',
              color: '#fff',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px'
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Cards View */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
          gap: '22px'
        }}>
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              style={{
                background: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
              }}
            >
              {/* Card Banner Image */}
              <div style={{
                position: 'relative',
                height: '140px',
                width: '100%',
                background: '#f8fafc',
                overflow: 'hidden'
              }}>
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name.en}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#94a3b8'
                  }}>
                    <FontAwesomeIcon icon={faImage} size="2x" />
                  </div>
                )}

                {/* Badges Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  right: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  {category.featured ? (
                    <span style={{
                      background: 'rgba(255, 144, 23, 0.95)',
                      color: '#ffffff',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: '700',
                      backdropFilter: 'blur(4px)',
                      letterSpacing: '0.3px'
                    }}>
                      ★ Featured
                    </span>
                  ) : <span />}

                  <span style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#334155',
                    backdropFilter: 'blur(4px)'
                  }}>
                    {category.id}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                    {lang === 'ar' && category.name.ar ? category.name.ar : category.name.en}
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <span style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontFamily: 'monospace'
                  }}>
                    /{category.slug}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto',
                  paddingTop: '14px',
                  borderTop: '1px solid #f1f5f9'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FontAwesomeIcon icon={faBoxesStacked} style={{ color: '#0D6EFD', fontSize: '14px' }} />
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>
                      {category.itemCount} items
                    </span>
                  </div>

                  <div>
                    {getStatusBadge(category.status)}
                  </div>
                </div>

                {/* Card Actions */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '14px',
                  paddingTop: '12px',
                  borderTop: '1px solid #f8fafc'
                }}>
                  <button
                    onClick={() => handleViewClick(category)}
                    style={{
                      flex: 1,
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      padding: '7px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#475569',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                  >
                    <FontAwesomeIcon icon={faEye} /> View
                  </button>

                  <button
                    onClick={() => handleEditClick(category)}
                    style={{
                      flex: 1,
                      background: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      padding: '7px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#1d4ed8',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} /> Edit
                  </button>

                  <button
                    onClick={() => handleDeleteClick(category)}
                    style={{
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      padding: '7px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#dc2626',
                      cursor: 'pointer'
                    }}
                    title="Delete Category"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
                  <th style={{ padding: '14px 20px' }}>Category</th>
                  <th style={{ padding: '14px 20px' }}>Slug</th>
                  <th style={{ padding: '14px 20px' }}>Products</th>
                  <th style={{ padding: '14px 20px' }}>Featured</th>
                  <th style={{ padding: '14px 20px' }}>Status</th>
                  <th style={{ padding: '14px 20px' }}>Created</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((item, idx) => (
                  <tr 
                    key={item.id}
                    style={{ 
                      borderBottom: idx === filteredCategories.length - 1 ? 'none' : '1px solid #f1f5f9',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', background: '#f1f5f9', flexShrink: 0 }}>
                          <img src={item.image} alt={item.name.en} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: '#1e293b' }}>{item.name.en}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{item.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', fontFamily: 'monospace', color: '#475569' }}>
                      /{item.slug}
                    </td>
                    <td style={{ padding: '14px 20px', fontWeight: '600', color: '#334155' }}>
                      {item.itemCount}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      {item.featured ? (
                        <span style={{ color: '#ff9017', fontWeight: '600', fontSize: '13px' }}>★ Yes</span>
                      ) : (
                        <span style={{ color: '#94a3b8', fontSize: '13px' }}>No</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      {getStatusBadge(item.status)}
                    </td>
                    <td style={{ padding: '14px 20px', color: '#64748b', fontSize: '13px' }}>
                      {item.date}
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button onClick={() => handleViewClick(item)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px' }} title="View">
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button onClick={() => handleEditClick(item)} style={{ background: 'none', border: 'none', color: '#0D6EFD', cursor: 'pointer', fontSize: '14px' }} title="Edit">
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button onClick={() => handleDeleteClick(item)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '14px' }} title="Delete">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add New Category Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Add New Category"
      >
        <form onSubmit={onSaveNew} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>
              Category Name (English) *
            </label>
            <input 
              type="text" 
              required
              value={formData.nameEn} 
              onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
              placeholder="e.g. Consumer Electronics" 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>
              Category Name (Arabic)
            </label>
            <input 
              type="text" 
              value={formData.nameAr} 
              onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
              placeholder="مثال: إلكترونيات استهلاكية" 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>
                URL Slug
              </label>
              <input 
                type="text" 
                value={formData.slug} 
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
                placeholder="e.g. electronics" 
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>
                Initial Product Count
              </label>
              <input 
                type="number" 
                value={formData.itemCount} 
                onChange={(e) => setFormData({ ...formData, itemCount: Number(e.target.value) })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>
              Cover Image URL
            </label>
            <input 
              type="url" 
              value={formData.image} 
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
              placeholder="https://..." 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', alignItems: 'center' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Status</label>
              <select 
                value={formData.status} 
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div style={{ paddingTop: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#334155', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#0D6EFD' }}
                />
                Feature in Navigation Bar
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button 
              type="button" 
              onClick={() => setIsAddModalOpen(false)}
              style={{ padding: '10px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: '600' }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              style={{ background: '#0D6EFD', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
            >
              Save Category
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Category Modal */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => { setIsEditModalOpen(false); setSelectedRecord(null); }} 
        title="Edit Category"
      >
        <form onSubmit={onUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>
              Category Name (English) *
            </label>
            <input 
              type="text" 
              required
              value={formData.nameEn} 
              onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>
              Category Name (Arabic)
            </label>
            <input 
              type="text" 
              value={formData.nameAr} 
              onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>
                URL Slug
              </label>
              <input 
                type="text" 
                value={formData.slug} 
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>
                Product Count
              </label>
              <input 
                type="number" 
                value={formData.itemCount} 
                onChange={(e) => setFormData({ ...formData, itemCount: Number(e.target.value) })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>
              Cover Image URL
            </label>
            <input 
              type="url" 
              value={formData.image} 
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', alignItems: 'center' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Status</label>
              <select 
                value={formData.status} 
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div style={{ paddingTop: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#334155', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#0D6EFD' }}
                />
                Feature in Navigation Bar
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button 
              type="button" 
              onClick={() => { setIsEditModalOpen(false); setSelectedRecord(null); }}
              style={{ padding: '10px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: '600' }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              style={{ background: '#0D6EFD', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
            >
              Update Category
            </button>
          </div>
        </form>
      </Modal>

      {/* View Category Details Modal */}
      <Modal 
        isOpen={isViewModalOpen} 
        onClose={() => { setIsViewModalOpen(false); setSelectedRecord(null); }} 
        title="Category Details"
      >
        {selectedRecord && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ height: '180px', borderRadius: '8px', overflow: 'hidden', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <img src={selectedRecord.image} alt={selectedRecord.name.en} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>English Title</span>
                <strong style={{ fontSize: '15px', color: '#1e293b' }}>{selectedRecord.name.en}</strong>
              </div>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Arabic Title</span>
                <strong style={{ fontSize: '15px', color: '#1e293b' }}>{selectedRecord.name.ar || 'N/A'}</strong>
              </div>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>URL Slug</span>
                <strong style={{ fontSize: '14px', color: '#0D6EFD', fontFamily: 'monospace' }}>/{selectedRecord.slug}</strong>
              </div>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Total Products</span>
                <strong style={{ fontSize: '15px', color: '#1e293b' }}>{selectedRecord.itemCount} items</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Status</span>
                {getStatusBadge(selectedRecord.status)}
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Featured</span>
                <span style={{ fontWeight: '600', color: selectedRecord.featured ? '#ff9017' : '#64748b' }}>
                  {selectedRecord.featured ? '★ Yes' : 'No'}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Created On</span>
                <span style={{ fontSize: '13px', color: '#334155' }}>{selectedRecord.date}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => { setIsDeleteModalOpen(false); setSelectedRecord(null); }} 
        title="Confirm Category Deletion"
      >
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: '#fef2f2',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '20px'
          }}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
            Delete {selectedRecord?.name.en}?
          </h3>
          <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '360px', margin: '0 auto 20px' }}>
            This action will permanently remove this category and its slug routing. Existing products will become uncategorized.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button 
              onClick={() => setIsDeleteModalOpen(false)} 
              style={{ padding: '9px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: '600' }}
            >
              Cancel
            </button>
            <button 
              onClick={onConfirmDelete}
              style={{ padding: '9px 20px', borderRadius: '6px', border: 'none', background: '#dc3545', color: '#fff', cursor: 'pointer', fontWeight: '600' }}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
