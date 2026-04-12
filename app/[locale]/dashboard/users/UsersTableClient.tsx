'use client';
import { toggleUserRole, deleteUser } from "./actions";
import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { dictionaries } from "@/lib/dictionaries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStore, faCashRegister, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function UsersTableClient({ users }: { users: any[] }) {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const { lang, translate } = useLang();
    const t = dictionaries.dashboard.tables;

    const handleToggleRole = async (userId: string, roleType: 'isCashier' | 'isSeller' | 'isAdmin', currentValue: boolean) => {
        setLoadingId(`${userId}-${roleType}`);
        await toggleUserRole(userId, roleType, currentValue);
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
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>
                                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                                    {user.isAdmin && <span className="pill info">{translate(t.roleAdmin)}</span>}
                                    {user.isCashier && <span className="pill success">{translate(t.roleCashier)}</span>}
                                    {user.isSeller && <span className="pill warning">{translate(t.roleSeller)}</span>}
                                    {!user.isAdmin && !user.isCashier && !user.isSeller && <span className="pill">{translate(t.roleCustomer)}</span>}
                                </div>
                            </td>
                            <td>
                                <div className="action-btns">
                                    <button 
                                        className="btn-outline"
                                        onClick={() => handleToggleRole(user._id, 'isSeller', user.isSeller || false)}
                                        disabled={loadingId === `${user._id}-isSeller`}
                                        title={user.isSeller ? translate(t.removeSeller) : translate(t.makeSeller)}
                                    >
                                        <FontAwesomeIcon icon={user.isSeller ? faCircleXmark : faStore} />
                                    </button>
                                    <button 
                                        className="btn-outline"
                                        onClick={() => handleToggleRole(user._id, 'isCashier', user.isCashier || false)}
                                        disabled={loadingId === `${user._id}-isCashier`}
                                        title={user.isCashier ? translate(t.removeCashier) : translate(t.makeCashier)}
                                    >
                                        <FontAwesomeIcon icon={user.isCashier ? faCircleXmark : faCashRegister} />
                                    </button>
                                    <button 
                                        className="btn-danger"
                                        onClick={() => handleDelete(user._id)}
                                        disabled={loadingId === `delete-${user._id}`}
                                        title={translate(t.deleteUser)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
