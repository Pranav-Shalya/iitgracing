import React, { useEffect, useState } from 'react';

const PublicEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('https://iitgracing.onrender.com/api/public/events')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort(
          (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
        );
        setEvents(sorted);
      })
      .catch(console.error);
  }, []);

  const now = new Date();
  const upcoming = events.filter(e => e.date && new Date(e.date) >= now);
  const past = events.filter(e => !e.date || new Date(e.date) < now);

  const renderEventCard = ev => (
    <div key={ev._id} className="card">
      <div className="card-title">{ev.title}</div>
      <div className="card-meta">
        {ev.type} {ev.date ? '• ' + ev.date.slice(0, 10) : ''}
      </div>
      <div className="card-text">{ev.description}</div>
      {ev.prize && (
        <div className="card-meta">Prize: {ev.prize}</div>
      )}
      {ev.link && (
        <a
          href={ev.link}
          target="_blank"
          rel="noreferrer"
          className="section-link"
        >
          More details
        </a>
      )}
    </div>
  );

  return (
    <div className="simple-page">
      <h1 className="section-title" style={{ marginBottom: 16 }}>Events & Workshops</h1>

      <section className="section">
        <h2 className="section-title" style={{ fontSize: '1.2rem', marginBottom: 12 }}>Upcoming</h2>
        {upcoming.length ? (
          <div className="cards-grid">
            {upcoming.map(renderEventCard)}
          </div>
        ) : (
          <p className="card-text">No upcoming events.</p>
        )}
      </section>

      <section className="section">
        <h2 className="section-title" style={{ fontSize: '1.2rem', marginBottom: 12 }}>Past Events</h2>
        {past.length ? (
          <div className="cards-grid">
            {past.map(renderEventCard)}
          </div>
        ) : (
          <p className="card-text">No past events recorded yet.</p>
        )}
      </section>
    </div>
  );
};

export default PublicEvents;
