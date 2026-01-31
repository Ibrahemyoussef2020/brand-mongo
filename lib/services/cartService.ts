
const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
      return '';
    }
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
};

export const fetchCart = async () => {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/cart`, { method: 'GET', cache: 'no-store' });
    if (!response.ok) throw new Error("Failed to fetch cart");
    return response.json();
};

export const addToCartAPI = async (item: any) => {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    });
    if (!response.ok) throw new Error("Failed to add to cart");
    return response.json();
};

export const removeFromCartAPI = async (productId: string) => {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/cart`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
    });
    if (!response.ok) throw new Error("Failed to remove from cart");
    return response.json();
};

export const clearCartAPI = async () => {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/cart`, { method: 'DELETE' }); // No body means clear all
    if (!response.ok) throw new Error("Failed to clear cart");
    return response.json();
};
