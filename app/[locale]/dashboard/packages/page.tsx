'use client';
import React, { useState, useMemo } from 'react';
import { useLang } from "@/context/LangContext";
import StatCard from "@/components/dashboard/StatCard";
import Modal from "@/components/dashboard/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPenToSquare, faTrash, faEye, faPlus, faSearch, faFilter, 
  faBoxArchive, faCheckCircle, faTimesCircle, faArrowRotateRight, 
  faDollarSign, faUsers, faStar, faCrown
} from '@fortawesome/free-solid-svg-icons';

export interface PackageItem {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'Monthly' | 'Yearly';
  maxProducts: number;
  commissionFee: number;
  activeVendors: number;
  popular: boolean;
  status: 'Active' | 'Archived';
  date: string;
}

const INITIAL_PACKAGES: PackageItem[] = [
  { id: 'PKG-01', name: 'Starter Seller Plan', price: 29, billingPeriod: 'Monthly', maxProducts: 50, commissionFee: 5.0, activeVendors: 142, popular: false, status: 'Active', date: 'Oct 01, 2026' },
  { id: 'PKG-02', name: 'Growth Merchant Pro', price: 79, billingPeriod: 'Monthly', maxProducts: 500, commissionFee: 3.5, activeVendors: 380, popular: true, status: 'Active', date: 'Oct 05, 2026' },
  { id: 'PKG-03', name: 'Enterprise Global Brand', price: 199, billingPeriod: 'Monthly', maxProducts: 5000, commissionFee: 1.5, activeVendors: 95, popular: false, status: 'Active', date: 'Oct 10, 2026' },
  { id: 'PKG-04', name: 'Legacy Basic Tier', price: 19, billingPeriod: 'Monthly', maxProducts: 20, commissionFee: 7.0, activeVendors: 12, popular: false, status: 'Archived', date: 'Aug 15, 2026' },
];

export default function PackagesPage() {
  const { translate } = useLang();
  
  const [data, setData] = useState<PackageItem[]>(INITIAL_PACKAGES);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Archived'>('All');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PackageItem | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: 49,
    billingPeriod: 'Monthly' as 'Monthly' | 'Yearly',
    maxProducts: 200,
    commissionFee: 4.0,
    popular: false,
    status: 'Active' as 'Active' | 'Archived'
  });

  const filteredPackages = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  const totalVendors = data.reduce((acc, curr) => acc + curr.activeVendors, 0);

  const handleAddClick = () => {
    setFormData({
      name: '',
      price: 49,
      billingPeriod: 'Monthly',
      maxProducts: 200,
      commissionFee: 4.0,
      popular: false,
      status: 'Active'
    });
    setIsAddModalOpen(true);
  };

  const handleEditClick = (record: PackageItem) => {
    setSelectedRecord(record);
    setFormData({
      name: record.name,
      price: record.price,
      billingPeriod: record.billingPeriod,
      maxProducts: record.maxProducts,
      commissionFee: record.commissionFee,
      popular: record.popular,
      status: record.status
    });
    setIsEditModalOpen(true);
  };

  const onSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newItem: PackageItem = {
      id: `PKG-0${data.length + 1}`,
      name: formData.name,
      price: Number(formData.price),
      billingPeriod: formData.billingPeriod,
      maxProducts: Number(formData.maxProducts),
      commissionFee: Number(formData.commissionFee),
      activeVendors: 0,
      popular: formData.popular,
      status: formData.status,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setData([newItem, ...data]);
    setIsAddModalOpen(false);
  };

  const onUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecord) return;

    setData(data.map(item => item.id === selectedRecord.id ? { ...item, ...formData } : item));
    setIsEditModalOpen(false);
    setSelectedRecord(null);
  };

  const onConfirmDelete = () => {
    if (!selectedRecord) return;
    setData(data.filter(item => item.id !== selectedRecord.id));
    setIsDeleteModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <div className="dashboard-page" style={{ paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b', margin: '0 0 6px 0' }}>
            Vendor Subscription Packages
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            Configure merchant membership tiers, product upload allowances, and fee structures.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 400); }} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: '8px', color: '#475569', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
            <FontAwesomeIcon icon={faArrowRotateRight} className={loading ? 'fa-spin' : ''} /> Refresh
          </button>
          <button onClick={handleAddClick} style={{ background: 'linear-gradient(135deg, #0D6EFD, #0052cc)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
            <FontAwesomeIcon icon={faPlus} /> Create Plan
          </button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '30px' }}>
        <StatCard label="Active Subscription Plans" value={data.filter(i => i.status === 'Active').length} trend="+1" colorClass="c-blue" />
        <StatCard label="Subscribed Merchants" value={totalVendors.toLocaleString()} trend="+28%" colorClass="c-green" />
        <StatCard label="Avg. Merchant Value" value="$84.50" trend="+6.2%" colorClass="c-indigo" />
        <StatCard label="Top Tier Rate" value="62.4%" trend="+4.1%" colorClass="c-orange" />
      </div>

      {/* Package Tier Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} style={{
            background: '#fff',
            borderRadius: '16px',
            border: pkg.popular ? '2px solid #0D6EFD' : '1px solid #e2e8f0',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            boxShadow: pkg.popular ? '0 10px 25px rgba(13, 110, 253, 0.1)' : '0 2px 4px rgba(0,0,0,0.02)'
          }}>
            {pkg.popular && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                right: '24px',
                background: 'linear-gradient(135deg, #0D6EFD, #0052cc)',
                color: '#fff',
                padding: '3px 12px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.5px'
              }}>
                ★ Most Popular
              </div>
            )}

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{pkg.id}</div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: '4px 0 0 0' }}>{pkg.name}</h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '20px' }}>
              <span style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a' }}>${pkg.price}</span>
              <span style={{ color: '#64748b', fontSize: '14px' }}>/ {pkg.billingPeriod.toLowerCase()}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#64748b' }}>Product Uploads</span>
                <strong style={{ color: '#1e293b' }}>Up to {pkg.maxProducts.toLocaleString()} items</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#64748b' }}>Transaction Fee</span>
                <strong style={{ color: '#00b517' }}>{pkg.commissionFee}% per sale</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#64748b' }}>Active Merchants</span>
                <strong style={{ color: '#0D6EFD' }}>{pkg.activeVendors} merchants</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
              <button onClick={() => handleEditClick(pkg)} style={{ flex: 1, background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', padding: '9px', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faPenToSquare} /> Edit Plan
              </button>
              <button onClick={() => { setSelectedRecord(pkg); setIsDeleteModalOpen(true); }} style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '9px 14px', borderRadius: '8px', cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create Vendor Package Plan">
        <form onSubmit={onSaveNew} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Plan Name *</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="e.g. Growth Pro Tier" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Price ($)</label>
              <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Max Products</label>
              <input type="number" value={formData.maxProducts} onChange={(e) => setFormData({ ...formData, maxProducts: Number(e.target.value) })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Commission Fee (%)</label>
              <input type="number" step="0.1" value={formData.commissionFee} onChange={(e) => setFormData({ ...formData, commissionFee: Number(e.target.value) })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ paddingTop: '22px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.popular} onChange={(e) => setFormData({ ...formData, popular: e.target.checked })} />
                Highlight as Popular
              </label>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ padding: '10px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}>Cancel</button>
            <button type="submit" style={{ background: '#0D6EFD', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Save Plan</button>
          </div>
        </form>
      </Modal>
      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Vendor Package Plan">
        <form onSubmit={onUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Plan Name *</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Price ($)</label>
              <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Max Products</label>
              <input type="number" value={formData.maxProducts} onChange={(e) => setFormData({ ...formData, maxProducts: Number(e.target.value) })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Commission Fee (%)</label>
              <input type="number" step="0.1" value={formData.commissionFee} onChange={(e) => setFormData({ ...formData, commissionFee: Number(e.target.value) })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ paddingTop: '22px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.popular} onChange={(e) => setFormData({ ...formData, popular: e.target.checked })} />
                Highlight as Popular
              </label>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsEditModalOpen(false)} style={{ padding: '10px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ background: '#0D6EFD', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Update Plan</button>
          </div>
        </form>
      </Modal>
      {/* Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Delete">
        <div style={{ textAlign: 'center' }}>
          <p>Delete package plan <strong>{selectedRecord?.name}</strong>?</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={() => setIsDeleteModalOpen(false)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff' }}>Cancel</button>
            <button onClick={onConfirmDelete} style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: '#dc3545', color: '#fff' }}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
