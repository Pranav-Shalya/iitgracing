import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    date: '',
    type: 'workshop',
    description: '',
    rules: '',
    prize: '',
    link: '',
    images: '',
    isFeatured: false
  });

  const token = localStorage.getItem('token');
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: `Bearer ${token}` }
  });

  const fetchEvents = async () => {
    const res = await api.get('/events');
    setEvents(res.data);
  };

  useEffect(() => {
    if (token) fetchEvents();
  }, []);

  const resetForm = () => {
    setSelectedId(null);
    setForm({
      title: '',
      date: '',
      type: 'workshop',
      description: '',
      rules: '',
      prize: '',
      link: '',
      images: '',
      isFeatured: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      date: form.date ? new Date(form.date) : null,
      type: form.type,
      description: form.description,
      rules: form.rules,
      prize: form.prize,
      link: form.link,
      images: form.images
        ? form.images.split(',').map(s => s.trim())
        : [],
      isFeatured: form.isFeatured
    };
    if (selectedId) {
      await api.put(`/events/${selectedId}`, payload);
    } else {
      await api.post('/events', payload);
    }
    resetForm();
    fetchEvents();
  };

  const handleEdit = (ev) => {
    setSelectedId(ev._id);
    setForm({
      title: ev.title || '',
      date: ev.date ? ev.date.slice(0, 10) : '',
      type: ev.type || 'workshop',
      description: ev.description || '',
      rules: ev.rules || '',
      prize: ev.prize || '',
      link: ev.link || '',
      images: ev.images?.join(', ') || '',
      isFeatured: !!ev.isFeatured
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    await api.delete(`/events/${id}`);
    if (selectedId === id) resetForm();
    fetchEvents();
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        {selectedId ? 'Edit Event' : 'Add Event'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-10 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded"
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <select
            className="border p-2 rounded"
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
          >
            <option value="workshop">Workshop</option>
            <option value="competition">Competition</option>
            <option value="announcement">Announcement</option>
            <option value="achievement">Achievement</option>
          </select>
          <input
            className="border p-2 rounded"
            placeholder="Prize (optional, e.g. ₹50,000)"
            value={form.prize}
            onChange={e => setForm({ ...form, prize: e.target.value })}
          />
        </div>

        <textarea
          className="border p-2 rounded w-full"
          rows="3"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <textarea
          className="border p-2 rounded w-full"
          rows="3"
          placeholder="Rules (for competitions; optional)"
          value={form.rules}
          onChange={e => setForm({ ...form, rules: e.target.value })}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Registration / Instagram link"
          value={form.link}
          onChange={e => setForm({ ...form, link: e.target.value })}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Image URLs (comma-separated, optional)"
          value={form.images}
          onChange={e => setForm({ ...form, images: e.target.value })}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={e => setForm({ ...form, isFeatured: e.target.checked })}
          />
          <span>Show on homepage as featured</span>
        </label>

        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">
            {selectedId ? 'Update Event' : 'Create Event'}
          </button>
          {selectedId && (
            <button type="button" onClick={resetForm} className="border border-gray-400 px-4 py-2 rounded">
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-4">Existing Events</h2>
      <div className="space-y-3">
        {events.map(ev => (
          <div key={ev._id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <div className="font-semibold text-lg">
                {ev.title} {ev.date ? `(${ev.date.slice(0, 10)})` : ''}
              </div>
              <div className="text-sm text-gray-600">
                {ev.type} {ev.prize ? `• Prize: ${ev.prize}` : ''}
              </div>
              <div className="text-sm text-gray-600">
                {ev.description}
              </div>
              {ev.link && (
                <a href={ev.link} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">
                  {ev.link}
                </a>
              )}
            </div>
            <div className="space-x-3">
              {ev.isFeatured && (
                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                  Featured
                </span>
              )}
              <button className="text-blue-600 font-semibold" onClick={() => handleEdit(ev)}>
                Edit
              </button>
              <button className="text-red-600 font-semibold" onClick={() => handleDelete(ev._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <p className="text-gray-500 text-sm">
            No events yet. Add workshops, club competitions, and announcements here.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
