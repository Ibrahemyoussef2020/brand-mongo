'use client';
import React, { useState, useMemo } from 'react';
import { useLang } from "@/context/LangContext";
import StatCard from "@/components/dashboard/StatCard";
import Modal from "@/components/dashboard/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEye, faSearch, faFilter, faCreditCard, 
  faCheckCircle, faClock, faTimesCircle, faArrowRotateRight, 
  faDollarSign, faReceipt, faRotateLeft
} from '@fortawesome/free-solid-svg-icons';

export interface PaymentItem {
  id: string;
  transactionId: string;
  customer: string;
  amount: number;
  currency: string;
  method: 'Stripe' | 'Credit Card' | 'PayPal' | 'Apple Pay' | 'Cash on Delivery';
  status: 'Successful' | 'Processing' | 'Refunded' | 'Failed';
  orderId: string;
  date: string;
}

const INITIAL_PAYMENTS: PaymentItem[] = [
  { id: 'PAY-801', transactionId: 'pi_3MtwxALkdIwHu7ix28a3tPZ', customer: 'Ahmed Al-Mansoor', amount: 320.00, currency: 'USD', method: 'Stripe', status: 'Successful', orderId: 'ORD-9921', date: 'Oct 26, 2026' },
  { id: 'PAY-802', transactionId: 'pi_3MtwyBLkdIwHu7ix91z4wLA', customer: 'Sarah Jenkins', amount: 145.50, currency: 'USD', method: 'Apple Pay', status: 'Successful', orderId: 'ORD-9922', date: 'Oct 26, 2026' },
  { id: 'PAY-803', transactionId: 'pp_9918237461908234', customer: 'Khaled Omar', amount: 89.00, currency: 'USD', method: 'PayPal', status: 'Processing', orderId: 'ORD-9923', date: 'Oct 25, 2026' },
  { id: 'PAY-804', transactionId: 'pi_3MtwzCLkdIwHu7ix45k8qRE', customer: 'Elena Rostova', amount: 210.00, currency: 'USD', method: 'Credit Card', status: 'Refunded', orderId: 'ORD-9915', date: 'Oct 24, 2026' },
  { id: 'PAY-805', transactionId: 'cod_881273940192837', customer: 'Tariq Hassan', amount: 450.00, currency: 'USD', method: 'Cash on Delivery', status: 'Successful', orderId: 'ORD-9920', date: 'Oct 23, 2026' },
];

export default function PaymentsTransactionsPage() {
  const { translate } = useLang();
  
  const [data, setData] = useState<PaymentItem[]>(INITIAL_PAYMENTS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Successful' | 'Processing' | 'Refunded' | 'Failed'>('All');

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PaymentItem | null>(null);

  const filteredPayments = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  const totalRevenue = data
    .filter(i => i.status === 'Successful')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const successfulCount = data.filter(i => i.status === 'Successful').length;

  const handleRefund = (id: string) => {
    setData(data.map(item => item.id === id ? { ...item, status: 'Refunded' } : item));
    if (selectedRecord?.id === id) {
      setSelectedRecord({ ...selectedRecord, status: 'Refunded' });
    }
  };

  const getStatusBadge = (status: 'Successful' | 'Processing' | 'Refunded' | 'Failed') => {
    switch (status) {
      case 'Successful':
        return <span style={{ background: '#e6f7eb', color: '#00b517', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}><FontAwesomeIcon icon={faCheckCircle} /> Paid</span>;
      case 'Processing':
        return <span style={{ background: '#fff0db', color: '#ff9017', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}><FontAwesomeIcon icon={faClock} /> Pending</span>;
      case 'Refunded':
        return <span style={{ background: '#f1f5f9', color: '#64748b', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}><FontAwesomeIcon icon={faRotateLeft} /> Refunded</span>;
      case 'Failed':
        return <span style={{ background: '#fef0f0', color: '#fa3434', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}><FontAwesomeIcon icon={faTimesCircle} /> Failed</span>;
    }
  };

  return (
    <div className="dashboard-page" style={{ paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b', margin: '0 0 6px 0' }}>
            Payments & Transactions
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            Inspect customer checkout transactions, Stripe payment intents, and issue refunds.
          </p>
        </div>

        <button
          onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 400); }}
          style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: '8px', color: '#475569', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
        >
          <FontAwesomeIcon icon={faArrowRotateRight} className={loading ? 'fa-spin' : ''} /> Refresh
        </button>
      </div>

      <div className="stats-grid" style={{ marginBottom: '30px' }}>
        <StatCard label="Total Processed" value={`$${totalRevenue.toLocaleString()}`} trend="+24.2%" colorClass="c-green" />
        <StatCard label="Successful Payments" value={successfulCount} trend="+18%" colorClass="c-blue" />
        <StatCard label="Refunds Issued" value={data.filter(i => i.status === 'Refunded').length} trend="-1" colorClass="c-orange" />
        <StatCard label="Gateway Success Rate" value="99.4%" trend="+0.2%" colorClass="c-indigo" />
      </div>

      {/* Controls */}
      <div style={{ background: '#fff', padding: '18px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search transaction ID, order, customer..." style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          </div>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}>
            <option value="All">All Statuses</option>
            <option value="Successful">Successful</option>
            <option value="Processing">Processing</option>
            <option value="Refunded">Refunded</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
                <th style={{ padding: '14px 20px' }}>Transaction ID</th>
                <th style={{ padding: '14px 20px' }}>Order</th>
                <th style={{ padding: '14px 20px' }}>Customer</th>
                <th style={{ padding: '14px 20px' }}>Method</th>
                <th style={{ padding: '14px 20px' }}>Amount</th>
                <th style={{ padding: '14px 20px' }}>Status</th>
                <th style={{ padding: '14px 20px' }}>Date</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((item, idx) => (
                <tr key={item.id} style={{ borderBottom: idx === filteredPayments.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 20px', fontFamily: 'monospace', fontWeight: '600', color: '#0D6EFD' }}>
                    {item.transactionId.substring(0, 18)}...
                  </td>
                  <td style={{ padding: '14px 20px', fontWeight: '600', color: '#334155' }}>
                    {item.orderId}
                  </td>
                  <td style={{ padding: '14px 20px', color: '#1e293b', fontWeight: '600' }}>
                    {item.customer}
                  </td>
                  <td style={{ padding: '14px 20px', color: '#64748b' }}>
                    {item.method}
                  </td>
                  <td style={{ padding: '14px 20px', fontWeight: '800', color: '#0f172a' }}>
                    ${item.amount.toFixed(2)}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    {getStatusBadge(item.status)}
                  </td>
                  <td style={{ padding: '14px 20px', color: '#64748b', fontSize: '13px' }}>
                    {item.date}
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <button onClick={() => { setSelectedRecord(item); setIsViewModalOpen(true); }} style={{ background: 'none', border: 'none', color: '#0D6EFD', cursor: 'pointer', fontWeight: '600' }}>
                      <FontAwesomeIcon icon={faEye} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => { setIsViewModalOpen(false); setSelectedRecord(null); }} title="Payment Details">
        {selectedRecord && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Full Transaction ID</div>
              <div style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '14px', color: '#0D6EFD', wordBreak: 'break-all' }}>
                {selectedRecord.transactionId}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Customer</span>
                <strong>{selectedRecord.customer}</strong>
              </div>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Order Reference</span>
                <strong>{selectedRecord.orderId}</strong>
              </div>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Amount Charged</span>
                <strong style={{ fontSize: '18px', color: '#00b517' }}>${selectedRecord.amount.toFixed(2)} {selectedRecord.currency}</strong>
              </div>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Payment Gateway</span>
                <strong>{selectedRecord.method}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <div>{getStatusBadge(selectedRecord.status)}</div>
              {selectedRecord.status === 'Successful' && (
                <button
                  onClick={() => handleRefund(selectedRecord.id)}
                  style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
                >
                  <FontAwesomeIcon icon={faRotateLeft} /> Issue Refund
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
