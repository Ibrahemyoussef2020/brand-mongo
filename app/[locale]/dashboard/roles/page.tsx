'use client';
import React, { useState, useMemo } from 'react';
import { useLang } from "@/context/LangContext";
import StatCard from "@/components/dashboard/StatCard";
import Modal from "@/components/dashboard/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPenToSquare, faTrash, faEye, faPlus, faSearch, faFilter, 
  faShieldHalved, faUserShield, faUsers, faLock, faCheckCircle, 
  faTimesCircle, faArrowRotateRight, faKey
} from '@fortawesome/free-solid-svg-icons';

export interface RoleItem {
  id: string;
  name: string;
  description: string;
  assignedUsers: number;
  permissions: {
    products: ('read' | 'write' | 'delete')[];
    orders: ('read' | 'write' | 'delete')[];
    users: ('read' | 'write' | 'delete')[];
    settings: ('read' | 'write' | 'delete')[];
  };
  status: 'Active' | 'Restricted';
  date: string;
}

const INITIAL_ROLES: RoleItem[] = [
  {
    id: 'ROL-01',
    name: 'Super Administrator',
    description: 'Full unrestricted root access to all store modules, financial telemetry, and user management.',
    assignedUsers: 3,
    permissions: {
      products: ['read', 'write', 'delete'],
      orders: ['read', 'write', 'delete'],
      users: ['read', 'write', 'delete'],
      settings: ['read', 'write', 'delete'],
    },
    status: 'Active',
    date: 'Oct 01, 2026'
  },
  {
    id: 'ROL-02',
    name: 'Store Manager',
    description: 'Manages catalog inventory, pricing, promotions, and customer order fulfillment.',
    assignedUsers: 12,
    permissions: {
      products: ['read', 'write', 'delete'],
      orders: ['read', 'write'],
      users: ['read'],
      settings: ['read'],
    },
    status: 'Active',
    date: 'Oct 08, 2026'
  },
  {
    id: 'ROL-03',
    name: 'Support Agent',
    description: 'Handles customer inquiries, order tracking, review moderation, and ticket resolution.',
    assignedUsers: 24,
    permissions: {
      products: ['read'],
      orders: ['read', 'write'],
      users: ['read'],
      settings: [],
    },
    status: 'Active',
    date: 'Oct 12, 2026'
  },
  {
    id: 'ROL-04',
    name: 'Inventory Specialist',
    description: 'Updates stock counts, warehouse locations, and supplier delivery manifests.',
    assignedUsers: 8,
    permissions: {
      products: ['read', 'write'],
      orders: ['read'],
      users: [],
      settings: [],
    },
    status: 'Active',
    date: 'Oct 15, 2026'
  },
  {
    id: 'ROL-05',
    name: 'Restricted Auditor',
    description: 'Read-only compliance inspection role with access to audit trails and financial summaries.',
    assignedUsers: 2,
    permissions: {
      products: ['read'],
      orders: ['read'],
      users: ['read'],
      settings: ['read'],
    },
    status: 'Restricted',
    date: 'Oct 20, 2026'
  }
];

export default function RolesPermissionsPage() {
  const { translate } = useLang();
  
  const [data, setData] = useState<RoleItem[]>(INITIAL_ROLES);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Restricted'>('All');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RoleItem | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active' as 'Active' | 'Restricted',
    permissions: {
      products: ['read'] as ('read' | 'write' | 'delete')[],
      orders: ['read'] as ('read' | 'write' | 'delete')[],
      users: [] as ('read' | 'write' | 'delete')[],
      settings: [] as ('read' | 'write' | 'delete')[]
    }
  });

  const filteredRoles = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  const totalAssignedStaff = data.reduce((acc, curr) => acc + curr.assignedUsers, 0);

  const handleAddClick = () => {
    setFormData({
      name: '',
      description: '',
      status: 'Active',
      permissions: {
        products: ['read', 'write'],
        orders: ['read', 'write'],
        users: ['read'],
        settings: []
      }
    });
    setIsAddModalOpen(true);
  };

  const handleEditClick = (record: RoleItem) => {
    setSelectedRecord(record);
    setFormData({
      name: record.name,
      description: record.description,
      status: record.status,
      permissions: record.permissions
    });
    setIsEditModalOpen(true);
  };

  const onSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newItem: RoleItem = {
      id: `ROL-0${data.length + 1}`,
      name: formData.name,
      description: formData.description,
      assignedUsers: 0,
      permissions: formData.permissions,
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

  const togglePermission = (resource: 'products' | 'orders' | 'users' | 'settings', perm: 'read' | 'write' | 'delete') => {
    setFormData(prev => {
      const current = prev.permissions[resource];
      const hasPerm = current.includes(perm);
      return {
        ...prev,
        permissions: {
          ...prev.permissions,
          [resource]: hasPerm ? current.filter(p => p !== perm) : [...current, perm]
        }
      };
    });
  };

  return (
    <div className="dashboard-page" style={{ paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b', margin: '0 0 6px 0' }}>
            Roles & Access Permissions
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            Configure team privilege hierarchies, granular resource gates, and administrative staff policies.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 400); }} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: '8px', color: '#475569', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
            <FontAwesomeIcon icon={faArrowRotateRight} className={loading ? 'fa-spin' : ''} /> Refresh
          </button>
          <button onClick={handleAddClick} style={{ background: 'linear-gradient(135deg, #0D6EFD, #0052cc)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
            <FontAwesomeIcon icon={faPlus} /> Create Role
          </button>
        </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: '30px' }}>
        <StatCard label="Defined Roles" value={data.length} trend="+1" colorClass="c-blue" />
        <StatCard label="Assigned Staff" value={totalAssignedStaff} trend="+8.2%" colorClass="c-green" />
        <StatCard label="Active Policies" value={data.filter(i => i.status === 'Active').length} trend="All clear" colorClass="c-indigo" />
        <StatCard label="Restricted Guards" value={data.filter(i => i.status === 'Restricted').length} trend="0 anomalies" colorClass="c-orange" />
      </div>

      {/* Controls */}
      <div style={{ background: '#fff', padding: '18px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search role name, description..." style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          </div>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}>
            <option value="All">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Restricted">Restricted Only</option>
          </select>
        </div>
      </div>

      {/* Role Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '22px' }}>
        {filteredRoles.map((role) => (
          <div key={role.id} style={{
            background: '#fff',
            borderRadius: '14px',
            border: '1px solid #e2e8f0',
            padding: '22px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#eff6ff', color: '#0D6EFD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                  <FontAwesomeIcon icon={faShieldHalved} />
                </div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1e293b', margin: 0 }}>{role.name}</h3>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>{role.id}</span>
                </div>
              </div>

              <span style={{ background: role.status === 'Active' ? '#e6f7eb' : '#fff0db', color: role.status === 'Active' ? '#00b517' : '#ff9017', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                {role.status}
              </span>
            </div>

            <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.5', marginBottom: '16px', flex: 1 }}>
              {role.description}
            </p>

            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Permissions Scope:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {Object.entries(role.permissions).map(([res, perms]) => (
                  <span key={res} style={{
                    background: perms.length > 0 ? '#e0f2fe' : '#f1f5f9',
                    color: perms.length > 0 ? '#0284c7' : '#94a3b8',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}>
                    {res}: {perms.length > 0 ? perms.join(', ') : 'none'}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '13px', color: '#334155', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FontAwesomeIcon icon={faUsers} style={{ color: '#0D6EFD' }} />
                {role.assignedUsers} Staff Members
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => { setSelectedRecord(role); setIsViewModalOpen(true); }} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}><FontAwesomeIcon icon={faEye} /></button>
                <button onClick={() => handleEditClick(role)} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}><FontAwesomeIcon icon={faPenToSquare} /></button>
                <button onClick={() => { setSelectedRecord(role); setIsDeleteModalOpen(true); }} style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}><FontAwesomeIcon icon={faTrash} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      <Modal isOpen={isAddModalOpen || isEditModalOpen} onClose={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} title={isAddModalOpen ? "Create Role" : "Edit Role"}>
        <form onSubmit={isAddModalOpen ? onSaveNew : onUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Role Title *</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Role Description</label>
            <textarea rows={2} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '700' }}>Resource Access Matrix</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#f8fafc', padding: '14px', borderRadius: '8px' }}>
              {(['products', 'orders', 'users', 'settings'] as const).map((resource) => (
                <div key={resource} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ textTransform: 'capitalize', fontSize: '13px' }}>{resource}</strong>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    {(['read', 'write', 'delete'] as const).map((perm) => (
                      <label key={perm} style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={formData.permissions[resource].includes(perm)}
                          onChange={() => togglePermission(resource, perm)}
                        />
                        {perm}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} style={{ padding: '10px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}>Cancel</button>
            <button type="submit" style={{ background: '#0D6EFD', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Save Role</button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Delete">
        <div style={{ textAlign: 'center' }}>
          <p>Delete role <strong>{selectedRecord?.name}</strong>?</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={() => setIsDeleteModalOpen(false)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff' }}>Cancel</button>
            <button onClick={onConfirmDelete} style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: '#dc3545', color: '#fff' }}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
