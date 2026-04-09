'use client';

import { useEffect, useState } from 'react';
import { fetchDealOffersAction } from "@/lib/actions/clientProducts";

export default function ClientTestPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Client test page loaded, starting fetch...');
    
    const fetchData = async () => {
      try {
        console.log('Calling fetchDealOffersAction from client...');
        const result = await fetchDealOffersAction();
        console.log('Client fetchDealOffersAction result:', result);
        setData(result);
        setLoading(false);
      } catch (err) {
        console.error('Client fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Client-side Server Action Test</h1>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div style={{ color: 'red' }}>
          <h2>Error:</h2>
          <pre>{error}</pre>
        </div>
      )}
      
      {data && (
        <div>
          <h2>Client-side Result:</h2>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
          
          <h2>Deal Offers Count: {data.data?.length || 0}</h2>
          <p>Status: {data.data?.length ? 'Working' : 'Not Working'}</p>
        </div>
      )}
    </div>
  );
}
