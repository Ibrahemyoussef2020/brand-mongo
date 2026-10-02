'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useLang } from "@/context/LangContext";
import StatCard from "@/components/dashboard/StatCard";
import Modal from "@/components/dashboard/Modal";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEye, faSearch, faFilter, faClipboardList, 
  faShieldHalved, faUser, faLaptop, faCircleCheck, 
  faTriangleExclamation, faCircleXmark, faArrowRotateRight
} from '@fortawesome/free-solid-svg-icons';

export interface AuditLogItem {
  id: string;
  actor: { name: string; email: string; role: string };
  action: 'USER_LOGIN' | 'ORDER_REFUND' | 'PRODUCT_UPDATE' | 'ROLE_ASSIGN' | 'SETTINGS_CHANGE' | 'SECURITY_ALERT';
  targetResource: string;
  ipAddress: string;
  severity: 'Info' | 'Warning' | 'Critical';
  timestamp: string;
  metadata?: any;
}

const INITIAL_LOGS: AuditLogItem[] = [
  {
    id: 'LOG-901',
    actor: { name: 'Admin Root', email: 'admin@brand-mongo.com', role: 'Super Admin' },
    action: 'SETTINGS_CHANGE',
    targetResource: 'Store Payment Gateway (Stripe live credentials)',
    ipAddress: '192.168.1.4',
    severity: 'Warning',
    timestamp: 'Oct 26, 2026 14:32:10',
    metadata: { changedKeys: ['stripeWebhookSecret'], env: 'production' }
  },
  {
    id: 'LOG-902',
    actor: { name: 'Sarah Manager', email: 'sarah.m@brand-mongo.com', role: 'Store Manager' },
    action: 'PRODUCT_UPDATE',
    targetResource: 'Product #PROD-102 (Price updated to $149.99)',
    ipAddress: '197.34.12.89',
    severity: 'Info',
    timestamp: 'Oct 26, 2026 12:15:44',
    metadata: { oldPrice: 169.99, newPrice: 149.99, stock: 45 }
  },
  {
    id: 'LOG-903',
    actor: { name: 'Security Guard System', email: 'system@brand-mongo.com', role: 'System Daemon' },
    action: 'SECURITY_ALERT',
    targetResource: '5 consecutive failed password attempts on admin account',
    ipAddress: '45.134.22.10',
    severity: 'Critical',
    timestamp: 'Oct 25, 2026 23:45:02',
    metadata: { blockedIP: true, alertTriggered: true }
  },
  {
    id: 'LOG-904',
    actor: { name: 'Khaled Omar', email: 'khaled.o@brand-mongo.com', role: 'Support Agent' },
    action: 'ORDER_REFUND',
    targetResource: 'Order #ORD-9915 refunded ($210.00)',
    ipAddress: '196.221.84.15',
    severity: 'Warning',
    timestamp: 'Oct 25, 2026 18:20:11',
    metadata: { orderId: 'ORD-9915', refundReason: 'Item returned' }
  },
  {
    id: 'LOG-905',
    actor: { name: 'Elena Rostova', email: 'elena.r@brand-mongo.com', role: 'Staff' },
    action: 'USER_LOGIN',
    targetResource: 'Dashboard session authenticated via 2FA',
    ipAddress: '197.34.12.89',
    severity: 'Info',
    timestamp: 'Oct 25, 2026 09:10:33',
    metadata: { method: '2FA_OTP', userAgent: 'Chrome/130 on Windows 11' }
  }
];

export default function AuditLogsPage() {
  const { translate } = useLang();
  
  const [data, setData] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'All' | 'Info' | 'Warning' | 'Critical'>('All');
  const [actionFilter, setActionFilter] = useState<string>('All');

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AuditLogItem | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/audit-logs');
      if (res.ok) {
        const json = await res.json();
        const mapped = json.map((l: any) => ({
          ...l,
          id: l._id || l.id,
        }));
        setData(mapped);
      }
    } catch (e) {
      console.error('Failed to load audit logs:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.actor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.targetResource.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ipAddress.includes(searchQuery);
      
      const matchesSeverity = severityFilter === 'All' || item.severity === severityFilter;
      const matchesAction = actionFilter === 'All' || item.action === actionFilter;
      return matchesSearch && matchesSeverity && matchesAction;
    });
  }, [data, searchQuery, severityFilter, actionFilter]);

  const criticalCount = data.filter(i => i.severity === 'Critical').length;
  const warningCount = data.filter(i => i.severity === 'Warning').length;

  const getSeverityBadge = (severity: 'Info' | 'Warning' | 'Critical') => {
    switch (severity) {
      case 'Info':
        return <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}><FontAwesomeIcon icon={faCircleCheck} /> Info</span>;
      case 'Warning':
        return <span style={{ background: '#fff0db', color: '#ff9017', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}><FontAwesomeIcon icon={faTriangleExclamation} /> Warning</span>;
      case 'Critical':
        return <span style={{ background: '#fef0f0', color: '#fa3434', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}><FontAwesomeIcon icon={faCircleXmark} /> Critical</span>;
    }
  };

  return (
    <div className="dashboard-page" style={{ paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b', margin: '0 0 6px 0' }}>
            Security Audit Trail & Logs
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            Immutable administrative access logs, resource mutations, and security event records.
          </p>
        </div>

        <button
          onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 400); }}
          style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: '8px', color: '#475569', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
        >
          <FontAwesomeIcon icon={faArrowRotateRight} className={loading ? 'fa-spin' : ''} /> Refresh Logs
        </button>
      </div>

      <div className="stats-grid" style={{ marginBottom: '30px' }}>
        <StatCard label="Total Events Logged" value={data.length} trend="+28 today" colorClass="c-blue" />
        <StatCard label="Security Warnings" value={warningCount} trend="-2" colorClass="c-orange" />
        <StatCard label="Critical Alerts" value={criticalCount} trend="0 unhandled" colorClass="c-green" />
        <StatCard label="Audit Compliance" value="100% OK" trend="Tamper-proof" colorClass="c-indigo" />
      </div>

      {/* Controls */}
      <div style={{ background: '#fff', padding: '18px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search actor, IP address, resource..." style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          </div>

          <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value as any)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}>
            <option value="All">All Severities</option>
            <option value="Info">Info</option>
            <option value="Warning">Warning</option>
            <option value="Critical">Critical</option>
          </select>

          <select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}>
            <option value="All">All Actions</option>
            <option value="USER_LOGIN">User Login</option>
            <option value="PRODUCT_UPDATE">Product Update</option>
            <option value="ORDER_REFUND">Order Refund</option>
            <option value="SETTINGS_CHANGE">Settings Change</option>
            <option value="SECURITY_ALERT">Security Alert</option>
          </select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
                <th style={{ padding: '14px 20px' }}>Actor</th>
                <th style={{ padding: '14px 20px' }}>Action</th>
                <th style={{ padding: '14px 20px' }}>Target Resource</th>
                <th style={{ padding: '14px 20px' }}>IP Address</th>
                <th style={{ padding: '14px 20px' }}>Severity</th>
                <th style={{ padding: '14px 20px' }}>Timestamp</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Payload</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton columns={7} rows={6} />
              ) : filteredLogs.map((log, idx) => (
                <tr key={log.id} style={{ borderBottom: idx === filteredLogs.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>{log.actor.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{log.actor.role}</div>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '12px', background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '4px' }}>
                      {log.action}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', color: '#334155', maxWidth: '280px' }}>
                    {log.targetResource}
                  </td>
                  <td style={{ padding: '14px 20px', fontFamily: 'monospace', color: '#64748b', fontSize: '13px' }}>
                    {log.ipAddress}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    {getSeverityBadge(log.severity)}
                  </td>
                  <td style={{ padding: '14px 20px', color: '#64748b', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {log.timestamp}
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <button onClick={() => { setSelectedRecord(log); setIsViewModalOpen(true); }} style={{ background: 'none', border: 'none', color: '#0D6EFD', cursor: 'pointer', fontWeight: '600' }}>
                      <FontAwesomeIcon icon={faEye} /> Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => { setIsViewModalOpen(false); setSelectedRecord(null); }} title="Audit Event Inspection">
        {selectedRecord && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Actor Identity</span>
                <strong>{selectedRecord.actor.name} ({selectedRecord.actor.email})</strong>
              </div>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Action Trigger</span>
                <span style={{ fontFamily: 'monospace', fontWeight: '700', color: '#0D6EFD' }}>{selectedRecord.action}</span>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
              <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Resource Target</span>
              <strong>{selectedRecord.targetResource}</strong>
            </div>

            {selectedRecord.metadata && (
              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Event Payload JSON</span>
                <pre style={{ background: '#0f172a', color: '#38bdf8', padding: '14px', borderRadius: '8px', fontSize: '12px', overflowX: 'auto', margin: 0 }}>
                  {JSON.stringify(selectedRecord.metadata, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
