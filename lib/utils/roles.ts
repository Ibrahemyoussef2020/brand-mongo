const adminRoles = ['super_admin', 'admin'];
const staffRoles = ['super_admin', 'admin', 'seller'];

export const isSuperAdmin = (role: string) => role === 'super_admin';
export const isAdmin = (role: string) => adminRoles.includes(role);
export const isSeller = (role: string) => role === 'seller';
export const canAccessDashboard = (role: string) => staffRoles.includes(role);
export const canAccessEcommerce = (role: string) => isAdmin(role) || isSeller(role);
export const canAccessPOS = (role: string) => isAdmin(role);

