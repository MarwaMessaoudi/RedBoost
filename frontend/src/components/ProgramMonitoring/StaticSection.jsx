import React from 'react'

function StaticSection() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div className="card bg-success text-white m-2" style={{ width: '300px' }}>
        <div className="card-body">
          <h2 className="card-title">This is a title</h2>
          <p className="card-text">This is body text inside my Bootstrap card.</p>
        </div>
      </div>
      <div className="card bg-danger text-white m-2" style={{ width: '300px' }}>
        <div className="card-body">
          <h2 className="card-title">This is a title</h2>
          <p className="card-text">This is body text inside my Bootstrap card.</p>
        </div>
      </div>
      <div className="card bg-warning text-white m-2" style={{ width: '300px' }}>
        <div className="card-body">
          <h2 className="card-title">This is a title</h2>
          <p className="card-text">This is body text inside my Bootstrap card.</p>
        </div>
      </div>
      <div className="card bg-secondarytext-white m-2" style={{ width: '300px' }}>
        <div className="card-body">
          <h2 className="card-title">This is a title</h2>
          <p className="card-text">This is body text inside my Bootstrap card.</p>
        </div>
      </div>
    </div>
  )
}

export default StaticSection
