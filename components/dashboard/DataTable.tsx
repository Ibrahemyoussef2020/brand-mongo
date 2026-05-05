'use client';
import React from 'react';

export interface Column<T> {
  key: Extract<keyof T, string> | 'actions';
  title: string;
  render?: (record: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  description?: string;
  onAdd?: () => void;
}

export default function DataTable<T extends { id: string | number }>({ columns, data, title, description, onAdd }: DataTableProps<T>) {
  return (
    <div style={{ width: '100%', marginTop: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div style={{ flex: '1 1 auto' }}>
              {title && <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>{title}</h3>}
              {description && <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{description}</p>}
          </div>
          {onAdd && (
            <button 
              onClick={onAdd}
              style={{ flex: '0 0 auto', background: '#0D6EFD', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
            >
                + Add New
            </button>
          )}
      </div>
      
      <div className="table-container">
          <table className="dashboard-table">
              <thead>
                  <tr>
                    {columns.map(col => (
                      <th key={col.key} style={{ textAlign: col.align || 'left' }}>
                        {col.title}
                      </th>
                    ))}
                  </tr>
              </thead>
              <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length} style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                        No records found
                      </td>
                    </tr>
                  ) : (
                    data.map(record => (
                      <tr key={record.id} style={{ borderBottom: '1px solid #eee' }}>
                        {columns.map(col => (
                          <td key={`${record.id}-${col.key}`} style={{ padding: '12px', textAlign: col.align || 'left' }}>
                            {col.render ? col.render(record) : (record as any)[col.key]}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
              </tbody>
          </table>
      </div>
    </div>
  );
}
