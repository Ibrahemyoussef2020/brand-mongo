'use client';
import React, { useState } from 'react';
import { useLang } from "@/context/LangContext";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import DataTable, { Column } from "@/components/dashboard/DataTable";
import Modal from "@/components/dashboard/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

interface EcommerceOverviewItem {
  id: string;
  name: string;
  status: string;
  date: string;
}

export default function EcommerceOverviewPage() {
  const { translate } = useLang();
  
  // Data State
  const [data, setData] = useState<EcommerceOverviewItem[]>([
    { id: '1', name: 'Sample Ecommerce Overview A', status: 'Active', date: 'Oct 24, 2026' },
    { id: '2', name: 'Sample Ecommerce Overview B', status: 'Pending', date: 'Oct 25, 2026' },
    { id: '3', name: 'Sample Ecommerce Overview C', status: 'Inactive', date: 'Oct 26, 2026' },
  ]);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<EcommerceOverviewItem | null>(null);

  // Form states for Add/Edit
  const [formName, setFormName] = useState('');

  const handleAddClick = () => {
    setFormName('');
    setIsAddModalOpen(true);
  };

  const handleEditClick = (record: EcommerceOverviewItem) => {
    setSelectedRecord(record);
    setFormName(record.name);
    setIsEditModalOpen(true);
  };

  const handleViewClick = (record: EcommerceOverviewItem) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (record: EcommerceOverviewItem) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  // CRUD Actions
  const onSaveNew = () => {
    const newItem: EcommerceOverviewItem = {
      id: Math.floor(Math.random() * 1000).toString(),
      name: formName,
      status: 'Active',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setData([...data, newItem]);
    setIsAddModalOpen(false);
  };

  const onUpdate = () => {
    if (!selectedRecord) return;
    setData(data.map(item => item.id === selectedRecord.id ? { ...item, name: formName } : item));
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
  const columns: Column<EcommerceOverviewItem>[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { 
      key: 'status', 
      title: 'Status', 
      render: (record: EcommerceOverviewItem) => {
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
      render: (record: EcommerceOverviewItem) => (
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
      <PageHeader title="Ecommerce Overview" filterText="Last 30 Days" />

      <div className="stats-grid">
        <StatCard label="Total Records" value={data.length} trend="+12.5%" colorClass="c-blue" />
        <StatCard label="Active" value={data.filter(i => i.status === 'Active').length} trend="+5.2%" colorClass="c-green" />
        <StatCard label="Pending" value={data.filter(i => i.status === 'Pending').length} trend="-2.1%" colorClass="c-orange" />
      </div>

      <DataTable 
        title="Manage Ecommerce Overview" 
        description="View and manage all your ecommerce overview here."
        columns={columns} 
        data={data} 
        onAdd={handleAddClick}
      />

      {/* Add New Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Add New Ecommerce Overview"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#333' }}>Name</label>
            <input 
              type="text" 
              value={formName} 
              onChange={(e) => setFormName(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} 
              placeholder="Enter Name" 
            />
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
        title="Edit Ecommerce Overview"
      >
        <div key={selectedRecord?.id} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#333' }}>Name</label>
            <input 
              type="text" 
              value={formName} 
              onChange={(e) => setFormName(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }} 
            />
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
        title="View Ecommerce Overview"
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
