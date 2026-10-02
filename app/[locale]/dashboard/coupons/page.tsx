'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useLang } from "@/context/LangContext";
import StatCard from "@/components/dashboard/StatCard";
import Modal from "@/components/dashboard/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPenToSquare, faTrash, faEye, faPlus, faSearch, faFilter, 
  faTicket, faPercent, faDollarSign, faClock, faCheckCircle, 
  faTimesCircle, faArrowRotateRight, faTableCells, faList, faCopy
} from '@fortawesome/free-solid-svg-icons';

export interface CouponItem {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  usageCount: number;
  usageLimit: number;
  status: 'Active' | 'Expired' | 'Disabled';
  expiresAt: string;
  date: string;
}

const INITIAL_COUPONS: CouponItem[] = [
  { id: 'CPN-101', code: 'SUMMER25', discountType: 'percentage', discountValue: 25, minSpend: 100, usageCount: 342, usageLimit: 500, status: 'Active', expiresAt: 'Nov 30, 2026', date: 'Oct 01, 2026' },
  { id: 'CPN-102', code: 'WELCOME10', discountType: 'fixed', discountValue: 10, minSpend: 50, usageCount: 1205, usageLimit: 2000, status: 'Active', expiresAt: 'Dec 31, 2026', date: 'Sep 15, 2026' },
  { id: 'CPN-103', code: 'VIP50OFF', discountType: 'percentage', discountValue: 50, minSpend: 250, usageCount: 89, usageLimit: 100, status: 'Active', expiresAt: 'Oct 31, 2026', date: 'Oct 05, 2026' },
  { id: 'CPN-104', code: 'FREESHIP', discountType: 'fixed', discountValue: 15, minSpend: 75, usageCount: 450, usageLimit: 450, status: 'Expired', expiresAt: 'Sep 30, 2026', date: 'Aug 10, 2026' },
  { id: 'CPN-105', code: 'FLASH30', discountType: 'percentage', discountValue: 30, minSpend: 120, usageCount: 0, usageLimit: 300, status: 'Disabled', expiresAt: 'Nov 15, 2026', date: 'Oct 20, 2026' },
];

export default function CouponsDiscountsPage() {
  const { translate } = useLang();
  
  const [data, setData] = useState<CouponItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Expired' | 'Disabled'>('All');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<CouponItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: 10,
    minSpend: 50,
    usageLimit: 100,
    status: 'Active' as 'Active' | 'Expired' | 'Disabled',
    expiresAt: 'Dec 31, 2026'
  });

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/coupons');
      if (res.ok) {
        const json = await res.json();
        const mapped = json.map((c: any) => ({
          ...c,
          id: c._id || c.id,
          date: c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Recent'
        }));
        setData(mapped);
      }
    } catch (e) {
      console.error('Failed to load coupons:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const filteredCoupons = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  const activeCount = data.filter(i => i.status === 'Active').length;
  const totalRedemptions = data.reduce((acc, curr) => acc + (curr.usageCount || 0), 0);

  const simulateRefresh = () => {
    fetchCoupons();
  };

  const handleAddClick = () => {
    setFormData({
      code: '',
      discountType: 'percentage',
      discountValue: 15,
      minSpend: 50,
      usageLimit: 500,
      status: 'Active',
      expiresAt: 'Dec 31, 2026'
    });
    setIsAddModalOpen(true);
  };

  const handleEditClick = (record: CouponItem) => {
    setSelectedRecord(record);
    setFormData({
      code: record.code,
      discountType: record.discountType,
      discountValue: record.discountValue,
      minSpend: record.minSpend,
      usageLimit: record.usageLimit,
      status: record.status,
      expiresAt: record.expiresAt
    });
    setIsEditModalOpen(true);
  };

  const handleViewClick = (record: CouponItem) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (record: CouponItem) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const onSaveNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code.trim()) return;

    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: formData.code.toUpperCase().trim(),
          discountType: formData.discountType,
          discountValue: Number(formData.discountValue),
          minSpend: Number(formData.minSpend),
          usageLimit: Number(formData.usageLimit),
          status: formData.status,
          expiresAt: formData.expiresAt,
        })
      });
      if (res.ok) {
        await fetchCoupons();
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
      const res = await fetch('/api/admin/coupons', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedRecord.id,
          code: formData.code.toUpperCase().trim(),
          discountType: formData.discountType,
          discountValue: Number(formData.discountValue),
          minSpend: Number(formData.minSpend),
          usageLimit: Number(formData.usageLimit),
          status: formData.status,
          expiresAt: formData.expiresAt
        })
      });
      if (res.ok) {
        await fetchCoupons();
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
      const res = await fetch(`/api/admin/coupons?id=${selectedRecord.id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchCoupons();
        setIsDeleteModalOpen(false);
        setSelectedRecord(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status: 'Active' | 'Expired' | 'Disabled') => {
    switch (status) {
      case 'Active':
        return <span style={{ background: '#e6f7eb', color: '#00b517', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '5px' }}><FontAwesomeIcon icon={faCheckCircle} /> Active</span>;
      case 'Expired':
        return <span style={{ background: '#fff0db', color: '#ff9017', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '5px' }}><FontAwesomeIcon icon={faClock} /> Expired</span>;
      case 'Disabled':
        return <span style={{ background: '#fef0f0', color: '#fa3434', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '5px' }}><FontAwesomeIcon icon={faTimesCircle} /> Disabled</span>;
    }
  };

  return (
    <div className="dashboard-page" style={{ paddingBottom: '60px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
            Coupons & Discounts
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            Create promotional coupon vouchers, percentage discounts, and track usage rates.
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
            Create Coupon
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="stats-grid" style={{ marginBottom: '30px' }}>
        <StatCard label="Total Coupons" value={data.length} trend="+5.4%" colorClass="c-blue" />
        <StatCard label="Active Vouchers" value={activeCount} trend="+10.2%" colorClass="c-green" />
        <StatCard label="Total Redemptions" value={totalRedemptions.toLocaleString()} trend="+24.8%" colorClass="c-indigo" />
        <StatCard label="Discount Ratio" value="18.5%" trend="-1.2%" colorClass="c-orange" />
      </div>

      {/* Controls */}
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
              placeholder="Search coupon code or ID..."
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
              <option value="Expired">Expired Only</option>
              <option value="Disabled">Disabled Only</option>
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
            <FontAwesomeIcon icon={faTableCells} /> Grid
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
            <FontAwesomeIcon icon={faList} /> Table
          </button>
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <div className="skelton-shimmer" style={{ width: '40%', height: '28px', borderRadius: '6px', marginBottom: '16px' }} />
              <div className="skelton-shimmer" style={{ width: '70%', height: '18px', borderRadius: '4px', marginBottom: '10px' }} />
              <div className="skelton-shimmer" style={{ width: '50%', height: '14px', borderRadius: '4px' }} />
            </div>
          ))}
        </div>
      ) : filteredCoupons.length === 0 ? (
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '60px 20px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#94a3b8', fontSize: '24px' }}>
            <FontAwesomeIcon icon={faTicket} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#334155' }}>No Coupons Found</h3>
        </div>
      ) : viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '22px' }}>
          {filteredCoupons.map((coupon) => (
            <div
              key={coupon.id}
              style={{
                background: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #0D6EFD 0%, #0052cc 100%)',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontWeight: '800',
                  fontSize: '16px',
                  letterSpacing: '1px',
                  fontFamily: 'monospace',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <FontAwesomeIcon icon={faTicket} style={{ fontSize: '13px' }} />
                  {coupon.code}
                </div>
                {getStatusBadge(coupon.status)}
              </div>

              <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `$${coupon.discountValue} OFF`}
              </div>

              <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '14px' }}>
                Min. Order Spend: <strong>${coupon.minSpend}</strong>
              </div>

              {/* Progress bar for usage */}
              <div style={{ marginTop: 'auto', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>
                  <span>Usage: {coupon.usageCount} / {coupon.usageLimit}</span>
                  <span>{Math.round((coupon.usageCount / coupon.usageLimit) * 100)}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${Math.min(100, (coupon.usageCount / coupon.usageLimit) * 100)}%`,
                    height: '100%',
                    background: coupon.status === 'Active' ? '#00b517' : '#94a3b8',
                    borderRadius: '10px'
                  }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                <button
                  onClick={() => handleViewClick(coupon)}
                  style={{ flex: 1, background: '#f8fafc', border: '1px solid #e2e8f0', padding: '7px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={faEye} /> Details
                </button>
                <button
                  onClick={() => handleEditClick(coupon)}
                  style={{ flex: 1, background: '#eff6ff', border: '1px solid #bfdbfe', padding: '7px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', color: '#1d4ed8', cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(coupon)}
                  style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '7px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', color: '#dc2626', cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
                  <th style={{ padding: '14px 20px' }}>Coupon Code</th>
                  <th style={{ padding: '14px 20px' }}>Discount</th>
                  <th style={{ padding: '14px 20px' }}>Min Spend</th>
                  <th style={{ padding: '14px 20px' }}>Redemptions</th>
                  <th style={{ padding: '14px 20px' }}>Expires At</th>
                  <th style={{ padding: '14px 20px' }}>Status</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoupons.map((coupon, idx) => (
                  <tr key={coupon.id} style={{ borderBottom: idx === filteredCoupons.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 20px', fontWeight: '700', fontFamily: 'monospace', color: '#0D6EFD' }}>
                      {coupon.code}
                    </td>
                    <td style={{ padding: '14px 20px', fontWeight: '700', color: '#1e293b' }}>
                      {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
                    </td>
                    <td style={{ padding: '14px 20px', color: '#475569' }}>
                      ${coupon.minSpend}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      {coupon.usageCount} / {coupon.usageLimit}
                    </td>
                    <td style={{ padding: '14px 20px', color: '#64748b' }}>
                      {coupon.expiresAt}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      {getStatusBadge(coupon.status)}
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button onClick={() => handleViewClick(coupon)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><FontAwesomeIcon icon={faEye} /></button>
                        <button onClick={() => handleEditClick(coupon)} style={{ background: 'none', border: 'none', color: '#0D6EFD', cursor: 'pointer' }}><FontAwesomeIcon icon={faPenToSquare} /></button>
                        <button onClick={() => handleDeleteClick(coupon)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}><FontAwesomeIcon icon={faTrash} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create New Coupon Voucher">
        <form onSubmit={onSaveNew} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Coupon Code *</label>
            <input 
              type="text" required value={formData.code} 
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: '700' }} 
              placeholder="e.g. FLASH20" 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Discount Type</label>
              <select 
                value={formData.discountType} 
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Discount Value</label>
              <input 
                type="number" required value={formData.discountValue} 
                onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Min Spend ($)</label>
              <input 
                type="number" value={formData.minSpend} 
                onChange={(e) => setFormData({ ...formData, minSpend: Number(e.target.value) })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Usage Limit</label>
              <input 
                type="number" value={formData.usageLimit} 
                onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ padding: '10px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}>Cancel</button>
            <button type="submit" style={{ background: '#0D6EFD', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Save Coupon</button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Coupon Voucher">
        <form onSubmit={onUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Coupon Code *</label>
            <input 
              type="text" required value={formData.code} 
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: '700' }} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Discount Type</label>
              <select 
                value={formData.discountType} 
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Discount Value</label>
              <input 
                type="number" required value={formData.discountValue} 
                onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Min Spend ($)</label>
              <input 
                type="number" value={formData.minSpend} 
                onChange={(e) => setFormData({ ...formData, minSpend: Number(e.target.value) })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Usage Limit</label>
              <input 
                type="number" value={formData.usageLimit} 
                onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Status</label>
              <select 
                value={formData.status} 
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>Expires At</label>
              <input 
                type="text" value={formData.expiresAt} 
                onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsEditModalOpen(false)} style={{ padding: '10px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ background: '#0D6EFD', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Update Voucher</button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Coupon Details">
        {selectedRecord && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ background: 'linear-gradient(135deg, #0D6EFD 0%, #1e40af 100%)', color: '#fff', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', opacity: 0.8, letterSpacing: '1px', textTransform: 'uppercase' }}>VOUCHER CODE</span>
              <h2 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'monospace', letterSpacing: '2px', margin: '6px 0' }}>{selectedRecord.code}</h2>
              <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '4px 14px', borderRadius: '20px', fontSize: '14px', fontWeight: '700' }}>
                {selectedRecord.discountType === 'percentage' ? `${selectedRecord.discountValue}% OFF` : `$${selectedRecord.discountValue} OFF`}
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px' }}>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontWeight: '600' }}>MINIMUM SPEND</span>
                <strong style={{ color: '#1e293b' }}>${selectedRecord.minSpend}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontWeight: '600' }}>STATUS</span>
                <div>{getStatusBadge(selectedRecord.status)}</div>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontWeight: '600' }}>REDEMPTIONS</span>
                <strong style={{ color: '#1e293b' }}>{selectedRecord.usageCount} / {selectedRecord.usageLimit}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontWeight: '600' }}>EXPIRATION DATE</span>
                <strong style={{ color: '#1e293b' }}>{selectedRecord.expiresAt}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
              <button onClick={() => { setIsViewModalOpen(false); handleEditClick(selectedRecord); }} style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '9px 18px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
                <FontAwesomeIcon icon={faPenToSquare} /> Edit Voucher
              </button>
              <button onClick={() => setIsViewModalOpen(false)} style={{ background: '#0D6EFD', color: '#fff', border: 'none', padding: '9px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Delete">
        <div style={{ textAlign: 'center' }}>
          <p>Delete voucher <strong>{selectedRecord?.code}</strong>?</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={() => setIsDeleteModalOpen(false)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff' }}>Cancel</button>
            <button onClick={onConfirmDelete} style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: '#dc3545', color: '#fff' }}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
