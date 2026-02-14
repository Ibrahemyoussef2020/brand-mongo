import React from 'react'

const FilterSidebarSkelton = () => {
  return (
    <aside className="filter-aside">
      {Array.from({ length: 6 }).map((_, i) => (
        <section key={i} className="filter-section">
          <div className="filter-header" style={{ marginBottom: '15px' }}>
            <div className="skelton-shimmer" style={{ width: '100px', height: '18px' }} />
            <div className="skelton-shimmer" style={{ width: '16px', height: '16px' }} />
          </div>
          <div className="filter-body">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', gap: '8px' }}>
                <div className="skelton-shimmer" style={{ width: '18px', height: '18px', borderRadius: '3px' }} />
                <div className="skelton-shimmer" style={{ width: '120px', height: '14px' }} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </aside>
  )
}

export default FilterSidebarSkelton
