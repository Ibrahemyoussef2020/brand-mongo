'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useLang } from "@/context/LangContext";
import StatCard from "@/components/dashboard/StatCard";
import Modal from "@/components/dashboard/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPenToSquare, faTrash, faEye, faSearch, faFilter, 
  faStar, faCheckCircle, faClock, faTimesCircle, faArrowRotateRight, 
  faThumbsUp, faMessage, faUser, faBoxOpen
} from '@fortawesome/free-solid-svg-icons';

export interface ReviewItem {
  id: string;
  customer: string;
  email: string;
  productTitle: string;
  rating: number;
  comment: string;
  status: 'Approved' | 'Pending' | 'Flagged';
  date: string;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  { id: 'REV-201', customer: 'Ahmed Al-Mansoor', email: 'ahmed.m@example.com', productTitle: 'Smart Watch Series 7 OLED', rating: 5, comment: 'Outstanding build quality and battery life lasts more than 3 days easily!', status: 'Approved', date: 'Oct 26, 2026' },
  { id: 'REV-202', customer: 'Sarah Jenkins', email: 'sarah.j@example.com', productTitle: 'Wireless Noise Cancelling Headphones', rating: 5, comment: 'Bass is deep and crystal clear. Very comfortable for long flights.', status: 'Approved', date: 'Oct 25, 2026' },
  { id: 'REV-203', customer: 'Khaled Omar', email: 'khaled.o@example.com', productTitle: 'Gaming Mechanical Keyboard RGB', rating: 4, comment: 'Keys feel great, slightly loud switches but great for typing and gaming.', status: 'Pending', date: 'Oct 24, 2026' },
  { id: 'REV-204', customer: 'Elena Rostova', email: 'elena.r@example.com', productTitle: 'Ergonomic Mesh Office Chair', rating: 2, comment: 'Armrest arrived with a scratch, customer service resolved it promptly though.', status: 'Flagged', date: 'Oct 22, 2026' },
  { id: 'REV-205', customer: 'Tariq Hassan', email: 'tariq.h@example.com', productTitle: 'Kitchen Stainless Steel Blender Pro', rating: 5, comment: 'Crushes ice and fruits into smooth shakes in seconds. Highly recommended!', status: 'Approved', date: 'Oct 21, 2026' }
];

export default function ReviewsRatingsPage() {
  const { translate } = useLang();
  
  const [data, setData] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Approved' | 'Pending' | 'Flagged'>('All');
  const [ratingFilter, setRatingFilter] = useState<'All' | '5' | '4' | '3' | '2' | '1'>('All');

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ReviewItem | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/reviews');
      if (res.ok) {
        const json = await res.json();
        const mapped = json.map((r: any) => ({
          ...r,
          id: r._id || r.id
        }));
        setData(mapped);
      }
    } catch (e) {
      console.error('Failed to load reviews:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const filteredReviews = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.productTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesRating = ratingFilter === 'All' || item.rating.toString() === ratingFilter;
      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [data, searchQuery, statusFilter, ratingFilter]);

  const totalRatingSum = data.reduce((acc, curr) => acc + curr.rating, 0);
  const avgRating = (totalRatingSum / (data.length || 1)).toFixed(1);
  const approvedCount = data.filter(i => i.status === 'Approved').length;
  const pendingCount = data.filter(i => i.status === 'Pending').length;

  const handleStatusChange = async (id: string, newStatus: 'Approved' | 'Pending' | 'Flagged') => {
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        await fetchReviews();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onConfirmDelete = async () => {
    if (!selectedRecord) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${selectedRecord.id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchReviews();
        setIsDeleteModalOpen(false);
        setSelectedRecord(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div style={{ display: 'flex', gap: '2px', color: '#ff9017' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} style={{ color: i < rating ? '#ff9017' : '#e2e8f0', fontSize: '13px' }} />
        ))}
      </div>
    );
  };

  const getStatusBadge = (status: 'Approved' | 'Pending' | 'Flagged') => {
    switch (status) {
      case 'Approved':
        return <span style={{ background: '#e6f7eb', color: '#00b517', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}><FontAwesomeIcon icon={faCheckCircle} /> Approved</span>;
      case 'Pending':
        return <span style={{ background: '#fff0db', color: '#ff9017', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}><FontAwesomeIcon icon={faClock} /> Pending</span>;
      case 'Flagged':
        return <span style={{ background: '#fef0f0', color: '#fa3434', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}><FontAwesomeIcon icon={faTimesCircle} /> Flagged</span>;
    }
  };

  return (
    <div className="dashboard-page" style={{ paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b', margin: '0 0 6px 0' }}>
            Customer Reviews & Ratings
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            Moderate verified buyer feedback, ratings, and customer satisfaction scores.
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
        <StatCard label="Average Rating" value={`${avgRating} / 5.0`} trend="+0.2" colorClass="c-orange" />
        <StatCard label="Total Reviews" value={data.length} trend="+18%" colorClass="c-blue" />
        <StatCard label="Approved Feedback" value={approvedCount} trend="+12%" colorClass="c-green" />
        <StatCard label="Pending Moderation" value={pendingCount} trend="-4" colorClass="c-indigo" />
      </div>

      {/* Controls */}
      <div style={{ background: '#fff', padding: '18px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search reviewer, product, text..." style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          </div>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}>
            <option value="All">All Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Flagged">Flagged</option>
          </select>

          <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value as any)} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}>
            <option value="All">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Reviews Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="skelton-shimmer" style={{ width: '42px', height: '42px', borderRadius: '50%' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div className="skelton-shimmer" style={{ width: '120px', height: '16px', borderRadius: '4px' }} />
                    <div className="skelton-shimmer" style={{ width: '180px', height: '12px', borderRadius: '4px' }} />
                  </div>
                </div>
                <div className="skelton-shimmer" style={{ width: '90px', height: '24px', borderRadius: '12px' }} />
              </div>
              <div className="skelton-shimmer" style={{ width: '80%', height: '16px', borderRadius: '4px' }} />
              <div className="skelton-shimmer" style={{ width: '60%', height: '14px', borderRadius: '4px' }} />
            </div>
          ))
        ) : filteredReviews.map((rev) => (
          <div key={rev.id} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #0D6EFD, #0052cc)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '15px' }}>
                  {rev.customer.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#1e293b' }}>{rev.customer}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{rev.email} • {rev.date}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {renderStars(rev.rating)}
                {getStatusBadge(rev.status)}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', color: '#334155' }}>
              <FontAwesomeIcon icon={faBoxOpen} style={{ color: '#0D6EFD' }} />
              <strong>Product:</strong> {rev.productTitle}
            </div>

            <p style={{ margin: 0, color: '#334155', fontSize: '14px', lineHeight: '1.6' }}>
              "{rev.comment}"
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {rev.status !== 'Approved' && (
                  <button onClick={() => handleStatusChange(rev.id, 'Approved')} style={{ background: '#e6f7eb', color: '#00b517', border: '1px solid #bbf7d0', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                    Approve
                  </button>
                )}
                {rev.status !== 'Flagged' && (
                  <button onClick={() => handleStatusChange(rev.id, 'Flagged')} style={{ background: '#fef0f0', color: '#fa3434', border: '1px solid #fecaca', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                    Flag
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => { setSelectedRecord(rev); setIsViewModalOpen(true); }} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><FontAwesomeIcon icon={faEye} /></button>
                <button onClick={() => { setSelectedRecord(rev); setIsDeleteModalOpen(true); }} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}><FontAwesomeIcon icon={faTrash} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Review Details">
        {selectedRecord && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #0D6EFD, #0052cc)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '18px' }}>
                {selectedRecord.customer.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '16px', color: '#1e293b' }}>{selectedRecord.customer}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{selectedRecord.email} • {selectedRecord.date}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FontAwesomeIcon icon={faBoxOpen} style={{ color: '#0D6EFD' }} />
                <span style={{ fontWeight: '600', fontSize: '13px' }}>{selectedRecord.productTitle}</span>
              </div>
              <div>{renderStars(selectedRecord.rating)}</div>
            </div>

            <div style={{ background: '#fff', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', lineHeight: '1.6', color: '#334155' }}>
              "{selectedRecord.comment}"
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>{getStatusBadge(selectedRecord.status)}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {selectedRecord.status !== 'Approved' && (
                  <button onClick={() => { handleStatusChange(selectedRecord.id, 'Approved'); setIsViewModalOpen(false); }} style={{ background: '#00b517', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                    Approve Review
                  </button>
                )}
                {selectedRecord.status !== 'Flagged' && (
                  <button onClick={() => { handleStatusChange(selectedRecord.id, 'Flagged'); setIsViewModalOpen(false); }} style={{ background: '#fa3434', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                    Flag Review
                  </button>
                )}
                <button onClick={() => setIsViewModalOpen(false)} style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '7px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Delete">
        <div style={{ textAlign: 'center' }}>
          <p>Delete review from <strong>{selectedRecord?.customer}</strong>?</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={() => setIsDeleteModalOpen(false)} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff' }}>Cancel</button>
            <button onClick={onConfirmDelete} style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: '#dc3545', color: '#fff' }}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
