'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useLang } from "@/context/LangContext";
import StatCard from "@/components/dashboard/StatCard";
import Modal from "@/components/dashboard/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrash, faEye, faPlus, faSearch, faFilter, 
  faBell, faEnvelope, faTriangleExclamation, faCheckCircle, 
  faCircleInfo, faArrowRotateRight, faPaperPlane
} from '@fortawesome/free-solid-svg-icons';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'Order' | 'Marketing' | 'Security' | 'System';
  audience: 'All Users' | 'Customers' | 'Admins';
  channel: 'In-App & Email' | 'In-App Only' | 'Push Notification';
  status: 'Sent' | 'Scheduled' | 'Draft';
  sentAt: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 'NTF-101', title: 'Flash Weekend Sale is Live!', message: 'Enjoy up to 50% discount on select consumer electronics and accessories this weekend only.', type: 'Marketing', audience: 'All Users', channel: 'In-App & Email', status: 'Sent', sentAt: 'Oct 26, 2026' },
  { id: 'NTF-102', title: 'Payment Gateway Maintenance Notice', message: 'Stripe payments scheduled maintenance on Sunday 2:00 AM UTC for 15 minutes.', type: 'System', audience: 'All Users', channel: 'In-App Only', status: 'Sent', sentAt: 'Oct 25, 2026' },
  { id: 'NTF-103', title: 'Unusual Login Activity Detected', message: 'Security alert: Multiple failed login attempts recorded from an unfamiliar IP address.', type: 'Security', audience: 'Admins', channel: 'In-App & Email', status: 'Sent', sentAt: 'Oct 24, 2026' },
  { id: 'NTF-104', title: 'November Super Savings Teaser', message: 'Early bird access for VIP members starting next week.', type: 'Marketing', audience: 'Customers', channel: 'Push Notification', status: 'Scheduled', sentAt: 'Nov 01, 2026' },
];

export default function NotificationsPage() {
  const { translate } = useLang();
  
  const [data, setData] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Marketing' | 'System' | 'Security' | 'Order'>('All');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<NotificationItem | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'Marketing' as 'Order' | 'Marketing' | 'Security' | 'System',
    audience: 'All Users' as 'All Users' | 'Customers' | 'Admins',
    channel: 'In-App & Email' as 'In-App & Email' | 'In-App Only' | 'Push Notification'
  });

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/notifications');
      if (res.ok) {
        const json = await res.json();
        const mapped = json.map((n: any) => ({
          ...n,
          id: n._id || n.id
        }));
        setData(mapped);
      }
    } catch (e) {
      console.error('Failed to load notifications:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const filteredNotifications = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'All' || item.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [data, searchQuery, typeFilter]);

  const onSaveNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          message: formData.message,
          type: formData.type,
          audience: formData.audience,
          channel: formData.channel,
          status: 'Sent',
        })
      });
      if (res.ok) {
        await fetchNotifications();
        setIsAddModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onConfirmDelete = async () => {
    if (!selectedRecord) return;
    try {
      const res = await fetch(`/api/admin/notifications?id=${selectedRecord.id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchNotifications();
        setIsDeleteModalOpen(false);
        setSelectedRecord(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Marketing': return <FontAwesomeIcon icon={faPaperPlane} style={{ color: '#0D6EFD' }} />;
      case 'System': return <FontAwesomeIcon icon={faCircleInfo} style={{ color: '#0284c7' }} />;
      case 'Security': return <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: '#dc2626' }} />;
      default: return <FontAwesomeIcon icon={faBell} style={{ color: '#ff9017' }} />;
    }
  };

  return (
    <div className="dashboard-page" style={{ paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b', margin: '0 0 6px 0' }}>
            System Notifications & Broadcasts
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            Dispatch real-time announcements, marketing newsletters, and critical system alerts.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 400); }} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: '8px', color: '#475569', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
            <FontAwesomeIcon icon={faArrowRotateRight} className={loading ? 'fa-spin' : ''} /> Refresh
          </button>
          <button onClick={() => setIsAddModalOpen(true)} style={{ background: 'linear-gradient(135deg, #0D6EFD, #0052cc)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
            <FontAwesomeIcon icon={faPlus} /> New Broadcast
          </button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '30px' }}>
        <StatCard label="Total Broadcasts" value={data.length} trend="+12%" colorClass="c-blue" />
        <StatCard label="Delivered Rate" value="98.7%" trend="+0.4%" colorClass="c-green" />
        <StatCard label="Open Rate" value="46.2%" trend="+3.1%" colorClass="c-indigo" />
        <StatCard label="Scheduled Alerts" value={data.filter(i => i.status === 'Scheduled').length} trend="1" colorClass="c-orange" />
      </div>

      {/* Controls */}
      <div style={{ background: '#fff', padding: '18px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search notification title or content..." style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          </div>

          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as any)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}>
            <option value="All">All Categories</option>
            <option value="Marketing">Marketing</option>
            <option value="System">System</option>
            <option value="Security">Security</option>
            <option value="Order">Order</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredNotifications.map((ntf) => (
          <div key={ntf.id} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1, minWidth: '280px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                {getTypeIcon(ntf.type)}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: 0 }}>{ntf.title}</h3>
                  <span style={{ fontSize: '11px', background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>{ntf.audience}</span>
                </div>
                <p style={{ margin: 0, color: '#64748b', fontSize: '13px', lineHeight: '1.5' }}>{ntf.message}</p>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>
                  Channel: {ntf.channel} • Sent: {ntf.sentAt}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ background: ntf.status === 'Sent' ? '#e6f7eb' : '#fff0db', color: ntf.status === 'Sent' ? '#00b517' : '#ff9017', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                {ntf.status}
              </span>
              <button onClick={() => { setSelectedRecord(ntf); setIsViewModalOpen(true); }} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '6px' }}><FontAwesomeIcon icon={faEye} /></button>
              <button onClick={() => { setSelectedRecord(ntf); setIsDeleteModalOpen(true); }} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', padding: '6px' }}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create Notification Broadcast">
        <form onSubmit={onSaveNew} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Broadcast Title *</label>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Message Body *</label>
            <textarea required rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Notification Type</label>
              <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as any })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                <option value="Marketing">Marketing</option>
                <option value="System">System</option>
                <option value="Security">Security</option>
                <option value="Order">Order</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Target Audience</label>
              <select value={formData.audience} onChange={(e) => setFormData({ ...formData, audience: e.target.value as any })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                <option value="All Users">All Users</option>
                <option value="Customers">Customers Only</option>
                <option value="Admins">Admins Only</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ padding: '10px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}>Cancel</button>
            <button type="submit" style={{ background: '#0D6EFD', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Send Broadcast</button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => { setIsViewModalOpen(false); setSelectedRecord(null); }} title="Notification Details">
        {selectedRecord && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                {getTypeIcon(selectedRecord.type)}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '4px', fontWeight: '700', textTransform: 'uppercase' }}>
                    {selectedRecord.type}
                  </span>
                  <span style={{ fontSize: '11px', background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                    {selectedRecord.audience}
                  </span>
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '4px 0 0 0' }}>{selectedRecord.title}</h2>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', lineHeight: '1.6', color: '#334155' }}>
              {selectedRecord.message}
            </div>

            <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontWeight: '600' }}>DISPATCH CHANNEL</span>
                <strong style={{ color: '#1e293b' }}>{selectedRecord.channel}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontWeight: '600' }}>STATUS</span>
                <span style={{ background: selectedRecord.status === 'Sent' ? '#e6f7eb' : '#fff0db', color: selectedRecord.status === 'Sent' ? '#00b517' : '#ff9017', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '700' }}>
                  {selectedRecord.status}
                </span>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontWeight: '600' }}>NOTIFICATION ID</span>
                <strong style={{ color: '#1e293b', fontFamily: 'monospace' }}>{selectedRecord.id}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontWeight: '600' }}>DISPATCH DATE</span>
                <strong style={{ color: '#1e293b' }}>{selectedRecord.sentAt}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setIsDeleteModalOpen(true);
                }} 
                style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
              <button 
                onClick={() => { setIsViewModalOpen(false); setSelectedRecord(null); }} 
                style={{ background: '#0D6EFD', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => { setIsDeleteModalOpen(false); setSelectedRecord(null); }} title="Confirm Delete">
        <div style={{ textAlign: 'center' }}>
          <p>Delete notification <strong>{selectedRecord?.title}</strong>?</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={() => { setIsDeleteModalOpen(false); setSelectedRecord(null); }} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>Cancel</button>
            <button onClick={onConfirmDelete} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#dc3545', color: '#fff', cursor: 'pointer', fontWeight: '600' }}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
