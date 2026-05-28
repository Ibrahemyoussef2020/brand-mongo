const adminRoles = ['super_admin', 'admin'];

export const isSuperAdmin = (role: string) => role === 'super_admin';
export const isAdmin = (role: string) => adminRoles.includes(role);
export const canAccessEcommerce = (role: string) => isAdmin(role);
export const canAccessPOS = (role: string) => isAdmin(role);
