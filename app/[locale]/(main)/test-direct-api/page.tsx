'use client';

import { useEffect, useState } from 'react';

export default function TestDirectAPIPage() {
  const [dealOffers, setDealOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testDirectAPI = async () => {
      try {
        console.log('Testing direct API route...');
        const response = await fetch('/api/deal-offers-direct');
        const data = await response.json();
        console.log('Direct API response:', data);
        setDealOffers(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Direct API test error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    testDirectAPI();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Direct API Test</h1>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div style={{ color: 'red' }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
      
      <div>
        <h2>Deal Offers Count: {dealOffers.length}</h2>
        <p>Status: {dealOffers.length > 0 ? 'Working' : 'Not Working'}</p>
        
        {dealOffers.length > 0 && (
          <div>
            <h3>Sample Deal Offer:</h3>
            <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', fontSize: '12px' }}>
              {JSON.stringify(dealOffers[0], null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Instructions:</h2>
        <p>1. Check browser console for logs</p>
        <p>2. If deal offers show above, the direct API is working</p>
        <p>3. Then test homepage at: <a href="/en">/en</a></p>
      </div>
    </div>
  );
}
