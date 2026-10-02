'use client';
import { toggleUserRole, setUserRole, deleteUser } from "./actions";
import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { dictionaries } from "@/lib/dictionaries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStore, faUserShield, faUser } from "@fortawesome/free-solid-svg-icons";

export default function UsersTableClient({ users }: { users: any[] }) {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const { lang, translate } = useLang();
    const t = dictionaries.dashboard.tables;

    const handleRoleChange = async (userId: string, newRole: string) => {
        setLoadingId(`${userId}-${newRole}`);
        await setUserRole(userId, newRole);
        setLoadingId(null);
    };

    const handleDelete = async (userId: string) => {
        if (!confirm(translate(t.confirmDelete))) return;
        setLoadingId(`delete-${userId}`);
        await deleteUser(userId);
        setLoadingId(null);
    };

    return (
        <div className="table-container">
            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>{translate(t.user)}</th>
                        <th>{translate(t.email)}</th>
                        <th>{translate(t.joined)}</th>
                        <th>{translate(t.roles)}</th>
                        <th>{translate(t.actions)}</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        const effectiveRole = user.role || (user.isAdmin ? 'admin' : user.isSeller ? 'seller' : 'user');
                        const isSuperAdmin = effectiveRole === 'super_admin';
                        const isAdmin = effectiveRole === 'admin';
                        const isSeller = effectiveRole === 'seller';

                        return (
                            <tr key={user._id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: isSuperAdmin ? '#6366f1' : isAdmin ? '#3b82f6' : isSeller ? '#f59e0b' : '#64748b',
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 600,
                                            fontSize: '13px'
                                        }}>
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <span>{user.name}</span>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                        {isSuperAdmin && <span className="pill" style={{ background: '#eef2ff', color: '#4f46e5', fontWeight: 600 }}>Super Admin</span>}
                                        {isAdmin && <span className="pill info">{translate(t.roleAdmin)}</span>}
                                        {isSeller && <span className="pill warning">{translate(t.roleSeller)}</span>}
                                        {!isSuperAdmin && !isAdmin && !isSeller && <span className="pill">{translate(t.roleCustomer)}</span>}
                                    </div>
                                </td>
                                <td>
                                    <div className="action-btns" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        {!isSuperAdmin && (
                                            <select
                                                value={effectiveRole}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                disabled={!!loadingId}
                                                style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #cbd5e1',
                                                    fontSize: '12px',
                                                    background: '#fff',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <option value="user">User / Customer</option>
                                                <option value="seller">Seller</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        )}
                                        {!isSuperAdmin && (
                                            <button 
                                                className="btn-danger"
                                                onClick={() => handleDelete(user._id)}
                                                disabled={loadingId === `delete-${user._id}`}
                                                title={translate(t.deleteUser)}
                                                style={{ padding: '6px 10px', borderRadius: '6px' }}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
