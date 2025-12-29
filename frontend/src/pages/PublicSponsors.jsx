// src/pages/PublicSponsors.js
import React, { useEffect, useState } from 'react';

const PublicSponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/public/sponsors')
      .then(res => res.json())
      .then(data => {
        setSponsors(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Sponsors API error', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="simple-page">
        <p className="card-text">Loading sponsors...</p>
      </div>
    );
  }

  return (
    <div className="simple-page">
      <h1 className="section-title" style={{ marginBottom: 16 }}>
        Sponsors {new Date().getFullYear()}
      </h1>

      <p className="card-text" style={{ marginBottom: 20, maxWidth: 520 }}>
        Grateful to our partners who power IITG Racing&apos;s journey in
        design, manufacturing and electric mobility.
      </p>

      <div className="sponsors-grid">
        {sponsors.map((s) => (
          <div key={s._id} className="sponsor-card">
            <div className="sponsor-card-header">
              <div className="sponsor-team-logo">IITG RACING</div>
              <span className="sponsor-presents">PRESENTS</span>
            </div>

            <div className="sponsor-logo-wrap">
              {s.logo && <img src={s.logo} alt={s.name} />}
            </div>

            <div className="sponsor-tier-label">AS</div>
            <div className="sponsor-tier">
              {s.type === 'title'
                ? 'TITLE SPONSOR'
                : s.type === 'technical'
                ? 'SOFTWARE SPONSOR'
                : 'FINANCIAL SPONSOR'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicSponsors;

