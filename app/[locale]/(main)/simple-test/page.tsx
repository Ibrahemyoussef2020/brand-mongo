import { fetchDealOffersAction } from "@/lib/actions/clientProducts";

export default async function SimpleTestPage() {
  // Test server action directly on the server
  let serverData;
  try {
    serverData = await fetchDealOffersAction();
    console.log('Server-side fetchDealOffersAction result:', serverData);
  } catch (error) {
    console.error('Server-side error:', error);
    serverData = { error: 'Server-side error', data: [] };
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Simple Server Action Test</h1>
      
      <h2>Server-side Result:</h2>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
        {JSON.stringify(serverData, null, 2)}
      </pre>
      
      <h2>Deal Offers Count: {serverData.data?.length || 0}</h2>
      <p>Status: {serverData.data?.length ? 'Working' : 'Not Working'}</p>
      
      {serverData.error && (
        <div style={{ color: 'red' }}>
          <h3>Error:</h3>
          <pre>{serverData.error}</pre>
        </div>
      )}
    </div>
  );
}
