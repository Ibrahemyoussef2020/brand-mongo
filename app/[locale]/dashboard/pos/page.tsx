'use client';
import React, { useState } from 'react';
import { useLang } from "@/context/LangContext";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import DataTable, { Column } from "@/components/dashboard/DataTable";
import Modal from "@/components/dashboard/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

interface POSOverviewItem {
  id: string;
  name: string;
  status: string;
  date: string;
}

export default function POSOverviewPage() {
  const { translate } = useLang();
  
  // Data State
  const [data, setData] = useState<POSOverviewItem[]>([
    { id: '1', name: 'Sample POS Overview A', status: 'Active', date: 'Oct 24, 2026' },
    { id: '2', name: 'Sample POS Overview B', status: 'Pending', date: 'Oct 25, 2026' },
    { id: '3', name: 'Sample POS Overview C', status: 'Inactive', date: 'Oct 26, 2026' },
  ]);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<POSOverviewItem | null>(null);

  // Form states for Add/Edit
  const [formData, setFormData] = useState({ name: '', status: 'Active' });

  const handleAddClick = () => {
    setFormData({ name: '', status: 'Active' });
    setIsAddModalOpen(true);
  };

  const handleEditClick = (record: POSOverviewItem) => {
    setSelectedRecord(record);
    setFormData({ name: record.name, status: record.status });
    setIsEditModalOpen(true);
  };

  const handleViewClick = (record: POSOverviewItem) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (record: POSOverviewItem) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  // CRUD Actions
  const onSaveNew = () => {
    const newItem: POSOverviewItem = {
      id: Math.floor(Math.random() * 1000).toString(),
      name: formData.name,
      status: formData.status,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setData([...data, newItem]);
    setIsAddModalOpen(false);
  };

  const onUpdate = () => {
    if (!selectedRecord) return;
    setData(data.map(item => item.id === selectedRecord.id ? { ...item, name: formData.name, status: formData.status } : item));
    setIsEditModalOpen(false);
    setSelectedRecord(null);
  };

  const onConfirmDelete = () => {
    if (!selectedRecord) return;
    setData(data.filter(item => item.id !== selectedRecord.id));
    setIsDeleteModalOpen(false);
    setSelectedRecord(null);
  };

  // Table Columns
  const columns: Column<POSOverviewItem>[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { 
      key: 'status', 
      title: 'Status', 
      render: (record: POSOverviewItem) => {
        let color = '#666';
        let bg = '#eee';
        if (record.status === 'Active') { color = '#00b517'; bg = '#e6f7eb'; }
        else if (record.status === 'Pending') { color = '#ff9017'; bg = '#fff0db'; }
        else if (record.status === 'Inactive') { color = '#fa3434'; bg = '#fef0f0'; }
        
        return (
          <span style={{ background: bg, color, padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500' }}>
            {record.status}
          </span>
        );
      }
    },
    { key: 'date', title: 'Date' },
    { 
      key: 'actions', 
      title: 'Actions', 
      align: 'right',
      render: (record: POSOverviewItem) => (
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button onClick={() => handleViewClick(record)} style={{ background: 'none', border: 'none', color: '#6c757d', cursor: 'pointer' }} title="View">
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button onClick={() => handleEditClick(record)} style={{ background: 'none', border: 'none', color: '#0D6EFD', cursor: 'pointer' }} title="Edit">
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button onClick={() => handleDeleteClick(record)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }} title="Delete">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="dashboard-page">
      <PageHeader title="POS Overview" filterText="Last 30 Days" />

      <div className="stats-grid">
        <StatCard label="Total Records" value={data.length} trend="+12.5%" colorClass="c-blue" />
        <StatCard label="Active" value={data.filter(i => i.status === 'Active').length} trend="+5.2%" colorClass="c-green" />
        <StatCard label="Pending" value={data.filter(i => i.status === 'Pending').length} trend="-2.1%" colorClass="c-orange" />
      </div>

      <DataTable 
        title="Manage POS Overview" 
        description="View and manage all your pos overview here."
        columns={columns} 
        data={data} 
        onAdd={handleAddClick}
      />

      {/* Add New Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Add New POS Overview"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#333' }}>Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} 
              placeholder="Enter Name" 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#333' }}>Status</label>
            <select 
              value={formData.status} 
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button 
            onClick={onSaveNew}
            style={{ background: '#0D6EFD', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
          >
            Save
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => { setIsEditModalOpen(false); setSelectedRecord(null); }} 
        title="Edit POS Overview"
      >
        <div key={selectedRecord?.id} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#333' }}>Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#333' }}>Status</label>
            <select 
              value={formData.status} 
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button 
            onClick={onUpdate}
            style={{ background: '#0D6EFD', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
          >
            Update
          </button>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal 
        isOpen={isViewModalOpen} 
        onClose={() => { setIsViewModalOpen(false); setSelectedRecord(null); }} 
        title="View POS Overview"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p><strong>ID:</strong> {selectedRecord?.id}</p>
          <p><strong>Name:</strong> {selectedRecord?.name}</p>
          <p><strong>Status:</strong> {selectedRecord?.status}</p>
          <p><strong>Date:</strong> {selectedRecord?.date}</p>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => { setIsDeleteModalOpen(false); setSelectedRecord(null); }} 
        title="Confirm Delete"
      >
        <div style={{ textAlign: 'center' }}>
          <p>Are you sure you want to delete <strong>{selectedRecord?.name}</strong>?</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={() => setIsDeleteModalOpen(false)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>Cancel</button>
            <button 
              onClick={onConfirmDelete}
              style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: '#dc3545', color: '#fff', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
