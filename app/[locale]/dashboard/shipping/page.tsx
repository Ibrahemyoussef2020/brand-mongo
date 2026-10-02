'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useLang } from "@/context/LangContext";
import StatCard from "@/components/dashboard/StatCard";
import Modal from "@/components/dashboard/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPenToSquare, faTrash, faEye, faPlus, faSearch, faFilter, 
  faTruckFast, faLocationDot, faClock, faCheckCircle, faTimesCircle, 
  faArrowRotateRight, faBox, faRoute
} from '@fortawesome/free-solid-svg-icons';

export interface ShipmentItem {
  id: string;
  trackingNumber: string;
  carrier: string;
  destination: string;
  recipient: string;
  rate: number;
  estDelivery: string;
  status: 'In Transit' | 'Delivered' | 'Processing' | 'Exception';
  date: string;
}

const INITIAL_SHIPMENTS: ShipmentItem[] = [
  { id: 'SHP-101', trackingNumber: 'TRK-98342110', carrier: 'DHL Express', destination: 'Dubai, UAE', recipient: 'Ahmed Al-Mansoor', rate: 25.0, estDelivery: 'Oct 28, 2026', status: 'In Transit', date: 'Oct 25, 2026' },
  { id: 'SHP-102', trackingNumber: 'TRK-55419082', carrier: 'FedEx Priority', destination: 'Riyadh, KSA', recipient: 'Fahad Al-Otaibi', rate: 30.0, estDelivery: 'Oct 27, 2026', status: 'Delivered', date: 'Oct 24, 2026' },
  { id: 'SHP-103', trackingNumber: 'TRK-77123904', carrier: 'Aramex Domestic', destination: 'Cairo, Egypt', recipient: 'Mahmoud Sayed', rate: 12.5, estDelivery: 'Oct 29, 2026', status: 'Processing', date: 'Oct 26, 2026' },
  { id: 'SHP-104', trackingNumber: 'TRK-22904811', carrier: 'DHL Express', destination: 'Kuwait City, KW', recipient: 'Nasser Al-Sabah', rate: 28.0, estDelivery: 'Oct 30, 2026', status: 'In Transit', date: 'Oct 26, 2026' },
  { id: 'SHP-105', trackingNumber: 'TRK-11093847', carrier: 'Local Express', destination: 'Alexandria, Egypt', recipient: 'Heba Mostafa', rate: 8.0, estDelivery: 'Oct 25, 2026', status: 'Exception', date: 'Oct 23, 2026' },
];

export default function ShippingDeliveryPage() {
  const { translate } = useLang();
  
  const [data, setData] = useState<ShipmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'In Transit' | 'Delivered' | 'Processing' | 'Exception'>('All');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ShipmentItem | null>(null);

  const [formData, setFormData] = useState({
    carrier: 'DHL Express',
    destination: '',
    recipient: '',
    rate: 20.0,
    estDelivery: 'Nov 02, 2026',
    status: 'Processing' as 'In Transit' | 'Delivered' | 'Processing' | 'Exception'
  });

  const fetchShipments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/shipping');
      if (res.ok) {
        const json = await res.json();
        const mapped = json.map((s: any) => ({
          ...s,
          id: s._id || s.id,
          date: s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'Recent'
        }));
        setData(mapped);
      }
    } catch (e) {
      console.error('Failed to load shipments:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const filteredShipments = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.carrier.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  const inTransitCount = data.filter(i => i.status === 'In Transit').length;
  const deliveredCount = data.filter(i => i.status === 'Delivered').length;

  const onSaveNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.recipient.trim()) return;

    try {
      const res = await fetch('/api/admin/shipping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carrier: formData.carrier,
          destination: formData.destination,
          recipient: formData.recipient,
          rate: Number(formData.rate),
          estDelivery: formData.estDelivery,
          status: formData.status
        })
      });
      if (res.ok) {
        await fetchShipments();
        setIsAddModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onConfirmDelete = async () => {
    if (!selectedRecord) return;
    try {
      const res = await fetch(`/api/admin/shipping?id=${selectedRecord.id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchShipments();
        setIsDeleteModalOpen(false);
        setSelectedRecord(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status: 'In Transit' | 'Delivered' | 'Processing' | 'Exception') => {
    switch (status) {
      case 'Delivered':
        return <span style={{ background: '#e6f7eb', color: '#00b517', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}><FontAwesomeIcon icon={faCheckCircle} /> Delivered</span>;
      case 'In Transit':
        return <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}><FontAwesomeIcon icon={faTruckFast} /> In Transit</span>;
      case 'Processing':
        return <span style={{ background: '#fff0db', color: '#ff9017', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}><FontAwesomeIcon icon={faClock} /> Processing</span>;
      case 'Exception':
        return <span style={{ background: '#fef0f0', color: '#fa3434', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}><FontAwesomeIcon icon={faTimesCircle} /> Exception</span>;
    }
  };

  return (
    <div className="dashboard-page" style={{ paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b', margin: '0 0 6px 0' }}>
            Shipping & Dispatch Operations
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            Real-time package logistics, courier partner integrations, and consignment delivery tracking.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 400); }} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: '8px', color: '#475569', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
            <FontAwesomeIcon icon={faArrowRotateRight} className={loading ? 'fa-spin' : ''} /> Refresh
          </button>
          <button onClick={() => setIsAddModalOpen(true)} style={{ background: 'linear-gradient(135deg, #0D6EFD, #0052cc)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
            <FontAwesomeIcon icon={faPlus} /> Dispatch Package
          </button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '30px' }}>
        <StatCard label="Total Consignments" value={data.length} trend="+14.2%" colorClass="c-blue" />
        <StatCard label="In Transit" value={inTransitCount} trend="+6" colorClass="c-indigo" />
        <StatCard label="Delivered Safely" value={deliveredCount} trend="+22.5%" colorClass="c-green" />
        <StatCard label="Delivery Success" value="98.2%" trend="+0.5%" colorClass="c-orange" />
      </div>

      {/* Controls */}
      <div style={{ background: '#fff', padding: '18px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search tracking #, recipient, destination..." style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          </div>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}>
            <option value="All">All Statuses</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Processing">Processing</option>
            <option value="Exception">Exception</option>
          </select>
        </div>
      </div>

      {/* Table View */}
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
                <th style={{ padding: '14px 20px' }}>Tracking #</th>
                <th style={{ padding: '14px 20px' }}>Carrier</th>
                <th style={{ padding: '14px 20px' }}>Recipient & Destination</th>
                <th style={{ padding: '14px 20px' }}>Shipping Rate</th>
                <th style={{ padding: '14px 20px' }}>Est. Delivery</th>
                <th style={{ padding: '14px 20px' }}>Status</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map((item, idx) => (
                <tr key={item.id} style={{ borderBottom: idx === filteredShipments.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 20px', fontFamily: 'monospace', fontWeight: '700', color: '#0D6EFD' }}>
                    {item.trackingNumber}
                  </td>
                  <td style={{ padding: '14px 20px', fontWeight: '600', color: '#1e293b' }}>
                    {item.carrier}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>{item.recipient}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FontAwesomeIcon icon={faLocationDot} style={{ color: '#94a3b8' }} /> {item.destination}
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px', fontWeight: '700', color: '#334155' }}>
                    ${item.rate.toFixed(2)}
                  </td>
                  <td style={{ padding: '14px 20px', color: '#64748b', fontSize: '13px' }}>
                    {item.estDelivery}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    {getStatusBadge(item.status)}
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <button onClick={() => { setSelectedRecord(item); setIsViewModalOpen(true); }} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><FontAwesomeIcon icon={faEye} /></button>
                      <button onClick={() => { setSelectedRecord(item); setIsDeleteModalOpen(true); }} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Dispatch New Consignment">
        <form onSubmit={onSaveNew} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Recipient Name *</label>
            <input type="text" required value={formData.recipient} onChange={(e) => setFormData({ ...formData, recipient: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Destination Address *</label>
            <input type="text" required value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Carrier Partner</label>
              <select value={formData.carrier} onChange={(e) => setFormData({ ...formData, carrier: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                <option value="DHL Express">DHL Express</option>
                <option value="FedEx Priority">FedEx Priority</option>
                <option value="Aramex Domestic">Aramex Domestic</option>
                <option value="Local Express">Local Express</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Rate ($)</label>
              <input type="number" step="0.5" value={formData.rate} onChange={(e) => setFormData({ ...formData, rate: Number(e.target.value) })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ padding: '10px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}>Cancel</button>
            <button type="submit" style={{ background: '#0D6EFD', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Dispatch</button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Shipment Consignment Details">
        {selectedRecord && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>TRACKING NUMBER</span>
                <h3 style={{ margin: '4px 0 0 0', fontFamily: 'monospace', color: '#0D6EFD', fontSize: '18px' }}>{selectedRecord.trackingNumber}</h3>
              </div>
              <div>{getStatusBadge(selectedRecord.status)}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontWeight: '600' }}>CARRIER PARTNER</span>
                <strong style={{ color: '#1e293b' }}>{selectedRecord.carrier}</strong>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontWeight: '600' }}>SHIPPING RATE</span>
                <strong style={{ color: '#1e293b' }}>${selectedRecord.rate.toFixed(2)}</strong>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontWeight: '600' }}>RECIPIENT</span>
                <strong style={{ color: '#1e293b' }}>{selectedRecord.recipient}</strong>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontWeight: '600' }}>ESTIMATED DELIVERY</span>
                <strong style={{ color: '#1e293b' }}>{selectedRecord.estDelivery}</strong>
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px', fontSize: '13px' }}>
              <span style={{ color: '#64748b', display: 'block', fontSize: '11px', fontWeight: '600', marginBottom: '4px' }}>DESTINATION ADDRESS</span>
              <strong style={{ color: '#1e293b' }}>{selectedRecord.destination}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
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
          <p>Delete shipment <strong>{selectedRecord?.trackingNumber}</strong>?</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={() => setIsDeleteModalOpen(false)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff' }}>Cancel</button>
            <button onClick={onConfirmDelete} style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: '#dc3545', color: '#fff' }}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
