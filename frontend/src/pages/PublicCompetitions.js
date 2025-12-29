import React, { useEffect, useState } from 'react';

const PublicCompetitions = () => {
  const [comps, setComps] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/public/competitions')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => b.year - a.year);
        setComps(sorted);
      })
      .catch(console.error);
  }, []);

  const grouped = comps.reduce((acc, c) => {
    const type = c.type || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(c);
    return acc;
  }, {});

  return (
    <div className="simple-page">
      <h1 className="section-title" style={{ marginBottom: 16 }}>Competition History</h1>

      {Object.keys(grouped).length === 0 && (
        <p className="card-text">No competitions added yet.</p>
      )}

      {Object.entries(grouped).map(([type, list]) => (
        <section key={type} className="section">
          <h2 className="section-title" style={{ fontSize: '1.2rem', marginBottom: 8 }}>
            {type}
          </h2>
          <div className="cards-grid">
            {list.map(c => (
              <div key={c._id} className="card">
                <div className="card-title">
                  {c.name} {c.year ? `(${c.year})` : ''}
                </div>
                <div className="card-meta">{c.position}</div>
                <div className="card-text">{c.description}</div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default PublicCompetitions;
