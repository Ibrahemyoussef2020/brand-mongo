'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useLang } from "@/context/LangContext";
import StatCard from "@/components/dashboard/StatCard";
import Modal from "@/components/dashboard/Modal";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPenToSquare, faTrash, faEye, faPlus, faSearch, faFilter, 
  faFire, faTag, faClock, faCheckCircle, faTimesCircle, 
  faArrowRotateRight, faTableCells, faList, faPercent
} from '@fortawesome/free-solid-svg-icons';

export interface OfferItem {
  id: string;
  title: string;
  badge: string;
  discount: string;
  targetCategory: string;
  status: 'Active' | 'Scheduled' | 'Expired';
  startDate: string;
  endDate: string;
  image: string;
}

const INITIAL_OFFERS: OfferItem[] = [
  { id: 'OFR-01', title: 'Flash Deals: 50% Off Smart Watches', badge: 'Flash Sale', discount: '50% OFF', targetCategory: 'Consumer Electronics', status: 'Active', startDate: 'Oct 01, 2026', endDate: 'Nov 01, 2026', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60' },
  { id: 'OFR-02', title: 'Summer Outdoor Gadgets Bundle', badge: 'Special Offer', discount: '30% OFF', targetCategory: 'Home & Outdoor', status: 'Active', startDate: 'Oct 10, 2026', endDate: 'Nov 15, 2026', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60' },
  { id: 'OFR-03', title: 'Back-to-School Tech Deals', badge: 'Limited Time', discount: '40% OFF', targetCategory: 'Computers & Tech', status: 'Scheduled', startDate: 'Nov 01, 2026', endDate: 'Nov 20, 2026', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60' },
  { id: 'OFR-04', title: 'Premium Headphones Clearance', badge: 'Clearance', discount: '65% OFF', targetCategory: 'Audio & Sound', status: 'Expired', startDate: 'Aug 01, 2026', endDate: 'Sep 15, 2026', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60' },
];

export default function OffersPage() {
  const { translate } = useLang();
  
  const [data, setData] = useState<OfferItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Scheduled' | 'Expired'>('All');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<OfferItem | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    badge: 'Special Offer',
    discount: '25% OFF',
    targetCategory: 'Electronics',
    status: 'Active' as 'Active' | 'Scheduled' | 'Expired',
    startDate: '',
    endDate: '',
    image: ''
  });

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/offers');
      if (res.ok) {
        const json = await res.json();
        const mapped = json.map((o: any) => ({
          ...o,
          id: o._id || o.id
        }));
        setData(mapped);
      }
    } catch (e) {
      console.error('Failed to load offers:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const filteredOffers = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.targetCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  const activeCount = data.filter(i => i.status === 'Active').length;

  const simulateRefresh = () => {
    fetchOffers();
  };

  const handleAddClick = () => {
    setFormData({
      title: '',
      badge: 'Special Offer',
      discount: '25% OFF',
      targetCategory: 'Consumer Electronics',
      status: 'Active',
      startDate: 'Oct 28, 2026',
      endDate: 'Nov 28, 2026',
      image: ''
    });
    setIsAddModalOpen(true);
  };

  const handleEditClick = (record: OfferItem) => {
    setSelectedRecord(record);
    setFormData({
      title: record.title,
      badge: record.badge,
      discount: record.discount,
      targetCategory: record.targetCategory,
      status: record.status,
      startDate: record.startDate,
      endDate: record.endDate,
      image: record.image
    });
    setIsEditModalOpen(true);
  };

  const onSaveNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      const res = await fetch('/api/admin/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          badge: formData.badge,
          discount: formData.discount,
          targetCategory: formData.targetCategory,
          status: formData.status,
          startDate: formData.startDate || 'Oct 28, 2026',
          endDate: formData.endDate || 'Nov 28, 2026',
          image: formData.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60'
        })
      });
      if (res.ok) {
        await fetchOffers();
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
      const res = await fetch('/api/admin/offers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedRecord.id,
          ...formData
        })
      });
      if (res.ok) {
        await fetchOffers();
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
      const res = await fetch(`/api/admin/offers?id=${selectedRecord.id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchOffers();
        setIsDeleteModalOpen(false);
        setSelectedRecord(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status: 'Active' | 'Scheduled' | 'Expired') => {
    switch (status) {
      case 'Active':
        return <span style={{ background: '#e6f7eb', color: '#00b517', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}><FontAwesomeIcon icon={faCheckCircle} /> Active</span>;
      case 'Scheduled':
        return <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}><FontAwesomeIcon icon={faClock} /> Scheduled</span>;
      case 'Expired':
        return <span style={{ background: '#fef0f0', color: '#fa3434', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}><FontAwesomeIcon icon={faTimesCircle} /> Expired</span>;
    }
  };

  return (
    <div className="dashboard-page" style={{ paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b', margin: '0 0 6px 0' }}>
            Promotional Offers & Campaigns
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            Manage homepage deal carousels, limited-time flash sales, and seasonal campaigns.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={simulateRefresh} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: '8px', color: '#475569', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
            <FontAwesomeIcon icon={faArrowRotateRight} className={loading ? 'fa-spin' : ''} /> Refresh
          </button>
          <button onClick={handleAddClick} style={{ background: 'linear-gradient(135deg, #0D6EFD, #0052cc)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
            <FontAwesomeIcon icon={faPlus} /> New Campaign
          </button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '30px' }}>
        <StatCard label="Total Offers" value={data.length} trend="+4.1%" colorClass="c-blue" />
        <StatCard label="Live Campaigns" value={activeCount} trend="+8.0%" colorClass="c-green" />
        <StatCard label="Scheduled" value={data.filter(i => i.status === 'Scheduled').length} trend="+2" colorClass="c-indigo" />
        <StatCard label="Average Conversion" value="6.8%" trend="+1.4%" colorClass="c-orange" />
      </div>

      {/* Controls */}
      <div style={{ background: '#fff', padding: '18px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search offers, categories..." style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}>
            <option value="All">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Scheduled">Scheduled Only</option>
            <option value="Expired">Expired Only</option>
          </select>
        </div>

        <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
          <button onClick={() => setViewMode('grid')} style={{ background: viewMode === 'grid' ? '#fff' : 'transparent', color: viewMode === 'grid' ? '#0D6EFD' : '#64748b', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}><FontAwesomeIcon icon={faTableCells} /> Grid</button>
          <button onClick={() => setViewMode('table')} style={{ background: viewMode === 'table' ? '#fff' : 'transparent', color: viewMode === 'table' ? '#0D6EFD' : '#64748b', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}><FontAwesomeIcon icon={faList} /> Table</button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '22px' }}>
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="skelton-shimmer" style={{ width: '100%', height: '140px', borderRadius: '8px' }} />
                <div className="skelton-shimmer" style={{ width: '70%', height: '20px', borderRadius: '4px' }} />
                <div className="skelton-shimmer" style={{ width: '40%', height: '14px', borderRadius: '4px' }} />
                <div className="skelton-shimmer" style={{ width: '100%', height: '32px', borderRadius: '6px', marginTop: 'auto' }} />
              </div>
            ))
          ) : filteredOffers.map((offer) => (
            <div key={offer.id} style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '150px' }}>
                <img src={offer.image} alt={offer.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(255, 59, 48, 0.95)', color: '#fff', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '800' }}>
                  {offer.discount}
                </div>
              </div>

              <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{offer.targetCategory}</span>
                  {getStatusBadge(offer.status)}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>{offer.title}</h3>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: 'auto', marginBottom: '14px' }}>
                  Duration: {offer.startDate} — {offer.endDate}
                </div>

                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                  <button onClick={() => { setSelectedRecord(offer); setIsViewModalOpen(true); }} style={{ flex: 1, background: '#f8fafc', border: '1px solid #e2e8f0', padding: '7px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}><FontAwesomeIcon icon={faEye} /> View</button>
                  <button onClick={() => handleEditClick(offer)} style={{ flex: 1, background: '#eff6ff', border: '1px solid #bfdbfe', padding: '7px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', color: '#1d4ed8', cursor: 'pointer' }}><FontAwesomeIcon icon={faPenToSquare} /> Edit</button>
                  <button onClick={() => { setSelectedRecord(offer); setIsDeleteModalOpen(true); }} style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '7px 12px', borderRadius: '6px', color: '#dc2626', cursor: 'pointer' }}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '14px 20px' }}>Campaign Title</th>
                <th style={{ padding: '14px 20px' }}>Category</th>
                <th style={{ padding: '14px 20px' }}>Discount</th>
                <th style={{ padding: '14px 20px' }}>Timeline</th>
                <th style={{ padding: '14px 20px' }}>Status</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton columns={6} rows={5} />
              ) : filteredOffers.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 20px', fontWeight: '600' }}>{item.title}</td>
                  <td style={{ padding: '14px 20px', color: '#475569' }}>{item.targetCategory}</td>
                  <td style={{ padding: '14px 20px', fontWeight: '700', color: '#fa3434' }}>{item.discount}</td>
                  <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b' }}>{item.startDate} - {item.endDate}</td>
                  <td style={{ padding: '14px 20px' }}>{getStatusBadge(item.status)}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <button onClick={() => { setSelectedRecord(item); setIsViewModalOpen(true); }} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', marginRight: '10px' }} title="View Details"><FontAwesomeIcon icon={faEye} /></button>
                    <button onClick={() => handleEditClick(item)} style={{ background: 'none', border: 'none', color: '#0D6EFD', cursor: 'pointer', marginRight: '10px' }} title="Edit"><FontAwesomeIcon icon={faPenToSquare} /></button>
                    <button onClick={() => { setSelectedRecord(item); setIsDeleteModalOpen(true); }} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }} title="Delete"><FontAwesomeIcon icon={faTrash} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create Promotional Campaign">
        <form onSubmit={onSaveNew} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Campaign Title *</label>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="e.g. Flash Deals 50% Off" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Badge Tag</label>
              <input type="text" value={formData.badge} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="e.g. Flash Sale" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Discount Text</label>
              <input type="text" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="e.g. 50% OFF" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Target Category</label>
              <input type="text" value={formData.targetCategory} onChange={(e) => setFormData({ ...formData, targetCategory: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Status</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}>
                <option value="Active">Active</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Start Date</label>
              <input type="text" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="e.g. Oct 01, 2026" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>End Date</label>
              <input type="text" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="e.g. Nov 01, 2026" />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Cover Image URL</label>
            <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="https://images.unsplash.com/..." />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ padding: '10px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ background: '#0D6EFD', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Save Campaign</button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Promotional Campaign">
        <form onSubmit={onUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Campaign Title *</label>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Badge Tag</label>
              <input type="text" value={formData.badge} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Discount Text</label>
              <input type="text" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Target Category</label>
              <input type="text" value={formData.targetCategory} onChange={(e) => setFormData({ ...formData, targetCategory: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Status</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}>
                <option value="Active">Active</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Start Date</label>
              <input type="text" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>End Date</label>
              <input type="text" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Cover Image URL</label>
            <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsEditModalOpen(false)} style={{ padding: '10px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ background: '#0D6EFD', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Update Campaign</button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Campaign Details">
        {selectedRecord && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', height: '180px' }}>
              <img src={selectedRecord.image} alt={selectedRecord.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(255, 59, 48, 0.95)', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '800' }}>
                {selectedRecord.discount}
              </div>
              <div style={{ position: 'absolute', bottom: '14px', right: '14px' }}>
                {getStatusBadge(selectedRecord.status)}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{selectedRecord.badge} • {selectedRecord.targetCategory}</span>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '4px 0 0 0' }}>{selectedRecord.title}</h2>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontWeight: '600' }}>CAMPAIGN ID</span>
                <strong style={{ color: '#1e293b' }}>{selectedRecord.id}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontWeight: '600' }}>TARGET AUDIENCE</span>
                <strong style={{ color: '#1e293b' }}>{selectedRecord.targetCategory}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontWeight: '600' }}>START DATE</span>
                <strong style={{ color: '#1e293b' }}>{selectedRecord.startDate}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontWeight: '600' }}>END DATE</span>
                <strong style={{ color: '#1e293b' }}>{selectedRecord.endDate}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
              <button onClick={() => { setIsViewModalOpen(false); handleEditClick(selectedRecord); }} style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '9px 18px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
                <FontAwesomeIcon icon={faPenToSquare} /> Edit Campaign
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
          <p>Delete campaign <strong>{selectedRecord?.title}</strong>?</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={() => setIsDeleteModalOpen(false)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff' }}>Cancel</button>
            <button onClick={onConfirmDelete} style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: '#dc3545', color: '#fff' }}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
