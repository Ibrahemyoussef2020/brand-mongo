
const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
      return '';
    }
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
};

export const fetchOrders = async () => {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/orders`, { method: 'GET', cache: 'no-store' });
    if (!response.ok) throw new Error("Failed to fetch orders");
    return response.json();
};

export const createOrderAPI = async () => {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error("Failed to create order");
    return response.json();
};
