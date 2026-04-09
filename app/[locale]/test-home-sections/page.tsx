import { getHomeSectionsDirect } from "@/lib/getHomeSectionsDirect";

export default async function TestHomeSectionsPage() {
  try {
    console.log('Testing home sections direct...');
    const sections = await getHomeSectionsDirect();
    
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace' }}>
        <h1>Home Sections Test</h1>
        
        <h2>Sections Found: {sections.length}</h2>
        
        {sections.map((section, index) => (
          <div key={section.key} style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>Section {index + 1}: {section.key}</h3>
            <p><strong>Type:</strong> {section.type}</p>
            <p><strong>Title:</strong> {JSON.stringify(section.title)}</p>
            <p><strong>Products Count:</strong> {section.products?.length || 0}</p>
            
            {section.products && section.products.length > 0 && (
              <div>
                <h4>Sample Product:</h4>
                <pre style={{ fontSize: '10px', backgroundColor: '#f5f5f5', padding: '10px', maxHeight: '150px', overflow: 'auto' }}>
                  {JSON.stringify(section.products[0], null, 2)}
                </pre>
              </div>
            )}
            
            {section.config && (
              <div>
                <h4>Config:</h4>
                <pre style={{ fontSize: '10px', backgroundColor: '#f5f5f5', padding: '10px' }}>
                  {JSON.stringify(section.config, null, 2)}
                </pre>
              </div>
            )}
            
            <p><strong>Status:</strong> {section.products?.length > 0 ? 'Working' : 'No Data'}</p>
          </div>
        ))}
        
        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '5px' }}>
          <h2>Summary:</h2>
          <p>Total Sections: {sections.length}</p>
          <p>Working Sections: {sections.filter(s => s.products?.length > 0).length}</p>
          <p>Failed Sections: {sections.filter(s => !s.products || s.products.length === 0).length}</p>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <h2>Next Steps:</h2>
          <p>1. If all sections show data, test the homepage at <a href="/en">/en</a></p>
          <p>2. Check browser console for logs: "Found X sections with data"</p>
          <p>3. Verify no more $undefined for category fields</p>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace' }}>
        <h1>Home Sections Test Error</h1>
        <pre style={{ color: 'red' }}>
          {error instanceof Error ? error.message : 'Unknown error'}
        </pre>
      </div>
    );
  }
}
