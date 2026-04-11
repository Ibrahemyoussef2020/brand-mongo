'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface TestResult {
  originalPath: string;
  processedPath: string;
  status: 'testing' | 'success' | 'failed' | 'error';
  error: string | null;
  loadTime: number;
}

export default function ImageTestPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  // Test images from different categories
  const testImages = [
    'images/watch-9.webp',
    'images/headphones-12.webp',
    'images/mobile-10.webp',
    'images/fashion-16.webp',
    'images/kitchen-tools-8.webp',
    'images/camera-9.webp',
    'images/computer-cat-5.webp',
    'images/sport-6.webp',
    'images/chair-5.webp',
    'images/dish-9.webp'
  ];

  useEffect(() => {
    const testImagePaths = async () => {
      const results: TestResult[] = [];
      
      for (const imagePath of testImages) {
        const result: TestResult = {
          originalPath: imagePath,
          processedPath: (imagePath.startsWith('/') ? imagePath : '/' + imagePath).replace(/\.webp$/, '').replace(/\.jpeg$/, '').replace(/\.png$/, '').replace(/\.webp$/, '') + '.webp',
          status: 'testing',
          error: null,
          loadTime: 0
        };

        const startTime = Date.now();
        
        try {
          // Test if image loads
          const img = document.createElement('img');
          img.onload = () => {
            result.status = 'success';
            result.loadTime = Date.now() - startTime;
          };
          img.onerror = () => {
            result.status = 'failed';
            result.error = 'Image failed to load';
            result.loadTime = Date.now() - startTime;
          };
          img.src = result.processedPath;
          
          // Wait a bit for the image to load
          await new Promise<void>(resolve => setTimeout(resolve, 100));
          
        } catch (error: unknown) {
          result.status = 'error';
          result.error = error instanceof Error ? error.message : 'Unknown error';
          result.loadTime = Date.now() - startTime;
        }
        
        results.push(result);
      }
      
      setTestResults(results);
      setLoading(false);
    };

    testImagePaths();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace' }}>
        <h1>Image Path Test</h1>
        <p>Testing image paths...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Image Path Test Results</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Test Summary:</h2>
        <p>Total images tested: {testResults.length}</p>
        <p>Successful: {testResults.filter(r => r.status === 'success').length}</p>
        <p>Failed: {testResults.filter(r => r.status === 'failed').length}</p>
        <p>Errors: {testResults.filter(r => r.status === 'error').length}</p>
      </div>

      <h2>Individual Test Results:</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {testResults.map((result, index) => (
          <div 
            key={index + Math.random()}
            style={{
              border: `2px solid ${result.status === 'success' ? '#4CAF50' : result.status === 'failed' ? '#f44336' : '#ff9800'}`,
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: result.status === 'success' ? '#f1f8e9' : result.status === 'failed' ? '#ffebee' : '#fff3e0'
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
              Test #{index + 1}
            </h3>
            <p><strong>Original Path:</strong> {result.originalPath}</p>
            <p><strong>Processed Path:</strong> {result.processedPath}</p>
            <p><strong>Status:</strong> <span style={{ 
              color: result.status === 'success' ? '#4CAF50' : result.status === 'failed' ? '#f44336' : '#ff9800',
              fontWeight: 'bold'
            }}>{result.status.toUpperCase()}</span></p>
            <p><strong>Load Time:</strong> {result.loadTime}ms</p>
            {result.error && <p><strong>Error:</strong> {result.error}</p>}
            
            {/* Show actual image if successful */}
            {result.status === 'success' && (
              <div style={{ marginTop: '10px' }}>
                <img 
                  src={result.processedPath}
                  alt={`Test image ${index + 1}`}
                  style={{ 
                    width: '100px', 
                    height: '100px', 
                    objectFit: 'cover',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
        <h2>Path Processing Logic:</h2>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
{`// Current path processing:
processedPath = originalPath.replace(/\.webp$/, '') + '.webp';

// Examples:
// "images/watch-9.webp" -> "images/watch-9.webp"
// "images/headphones-12.webp" -> "images/headphones-12.webp"`}
        </pre>
      </div>
    </div>
  );
}
