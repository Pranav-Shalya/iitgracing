import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    type: 'title',
    year: '',
    website: '',
    logo: '',
    description: ''
  });

  const token = localStorage.getItem('token');

  const api = axios.create({
    baseURL: 'https://iitgracing.onrender.com/api',
    headers: { Authorization: `Bearer ${token}` }
  });

  const fetchSponsors = async () => {
    const res = await api.get('/sponsors');
    setSponsors(res.data);
  };

  useEffect(() => {
    if (token) fetchSponsors();
  }, []);

  const resetForm = () => {
    setSelectedId(null);
    setForm({
      name: '',
      type: 'title',
      year: '',
      website: '',
      logo: '',
      description: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      type: form.type,
      year: form.year ? Number(form.year) : undefined,
      website: form.website,
      logo: form.logo,
      description: form.description
    };

    if (selectedId) {
      await api.put(`/sponsors/${selectedId}`, payload);
    } else {
      await api.post('/sponsors', payload);
    }

    resetForm();
    fetchSponsors();
  };

  const handleEdit = (s) => {
    setSelectedId(s._id);
    setForm({
      name: s.name || '',
      type: s.type || 'title',
      year: s.year || '',
      website: s.website || '',
      logo: s.logo || '',
      description: s.description || ''
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this sponsor?')) return;
    await api.delete(`/sponsors/${id}`);
    if (selectedId === id) resetForm();
    fetchSponsors();
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        {selectedId ? 'Edit Sponsor' : 'Add Sponsor'}
      </h1>

      {/* Sponsor form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-10 space-y-4"
      >
        <div className="grid md:grid-cols-3 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Name (e.g. Bosch)"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <select
            className="border p-2 rounded"
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
          >
            <option value="title">Title Sponsor</option>
            <option value="technical">Technical Sponsor</option>
            <option value="financial">Financial Sponsor</option>
          </select>
          <input
            className="border p-2 rounded"
            placeholder="Year (optional)"
            type="number"
            value={form.year}
            onChange={e => setForm({ ...form, year: e.target.value })}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Website URL"
            value={form.website}
            onChange={e => setForm({ ...form, website: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Logo image URL"
            value={form.logo}
            onChange={e => setForm({ ...form, logo: e.target.value })}
          />
        </div>

        <textarea
          className="border p-2 rounded w-full"
          rows="3"
          placeholder="Short description (what they support, etc.)"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <div className="flex gap-4 mt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
          >
            {selectedId ? 'Update Sponsor' : 'Create Sponsor'}
          </button>
          {selectedId && (
            <button
              type="button"
              onClick={resetForm}
              className="border border-gray-400 px-4 py-2 rounded"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      {/* Sponsors list */}
      <h2 className="text-2xl font-bold mb-4">Existing Sponsors</h2>
      <div className="space-y-3">
        {sponsors.map(s => (
          <div
            key={s._id}
            className="bg-white p-4 rounded shadow flex justify-between items-start"
          >
            <div className="flex gap-4">
              {s.logo && (
                <img
                  src={s.logo}
                  alt={s.name}
                  className="w-16 h-16 object-contain rounded"
                />
              )}
              <div>
                <div className="font-semibold text-lg">
                  {s.name} {s.year ? `(${s.year})` : ''}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {s.type ? s.type.toUpperCase() + ' sponsor' : ''}
                </div>
                <div className="text-sm text-gray-600">
                  {s.description}
                </div>
                {s.website && (
                  <a
                    href={s.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 text-sm"
                  >
                    {s.website}
                  </a>
                )}
              </div>
            </div>
            <div className="space-x-3">
              <button
                className="text-blue-600 font-semibold"
                onClick={() => handleEdit(s)}
              >
                Edit
              </button>
              <button
                className="text-red-600 font-semibold"
                onClick={() => handleDelete(s._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {sponsors.length === 0 && (
          <p className="text-gray-500 text-sm">
            No sponsors yet. Add them from website/Instagram later.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminSponsors;
