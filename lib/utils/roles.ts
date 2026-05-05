export const isSuperAdmin = (role: string) => role === 'super_admin';
export const canAccessEcommerce = (role: string) =>
  ['super_admin', 'ecommerce_admin'].includes(role);
export const canAccessPOS = (role: string) =>
  ['super_admin', 'pos_admin'].includes(role);
