import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCompetitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    year: '',
    type: 'Formula Bharat',
    position: '',
    description: ''
  });

  const token = localStorage.getItem('token');
  const api = axios.create({
    baseURL: 'https://iitgracing.onrender.com/api',
    headers: { Authorization: `Bearer ${token}` }
  });

  const fetchCompetitions = async () => {
    const res = await api.get('/competitions');
    setCompetitions(res.data);
  };

  useEffect(() => {
    if (token) fetchCompetitions();
  }, []);

  const resetForm = () => {
    setSelectedId(null);
    setForm({
      name: '',
      year: '',
      type: 'Formula Bharat',
      position: '',
      description: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      year: Number(form.year),
      type: form.type,
      position: form.position,
      description: form.description
    };
    if (selectedId) {
      await api.put(`/competitions/${selectedId}`, payload);
    } else {
      await api.post('/competitions', payload);
    }
    resetForm();
    fetchCompetitions();
  };

  const handleEdit = (c) => {
    setSelectedId(c._id);
    setForm({
      name: c.name || '',
      year: c.year || '',
      type: c.type || 'Formula Bharat',
      position: c.position || '',
      description: c.description || ''
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this competition?')) return;
    await api.delete(`/competitions/${id}`);
    if (selectedId === id) resetForm();
    fetchCompetitions();
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        {selectedId ? 'Edit Competition' : 'Add Competition'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-10 space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Name (e.g. Formula Bharat 2025)"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Year"
            type="number"
            value={form.year}
            onChange={e => setForm({ ...form, year: e.target.value })}
            required
          />
          <select
            className="border p-2 rounded"
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
          >
            <option value="Formula Bharat">Formula Bharat</option>
            <option value="Supra SAE">Supra SAE</option>
            <option value="BAJA">BAJA</option>
            <option value="InterIIT">InterIIT</option>
            <option value="PanIIT">PanIIT</option>
          </select>
        </div>

        <input
          className="border p-2 rounded w-full"
          placeholder="Result / Position (e.g. Finals, P3 Overall)"
          value={form.position}
          onChange={e => setForm({ ...form, position: e.target.value })}
        />

        <textarea
          className="border p-2 rounded w-full"
          rows="3"
          placeholder="Short description (events, highlights, etc.)"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">
            {selectedId ? 'Update Competition' : 'Create Competition'}
          </button>
          {selectedId && (
            <button type="button" onClick={resetForm} className="border border-gray-400 px-4 py-2 rounded">
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-4">Existing Competitions</h2>
      <div className="space-y-3">
        {competitions.map(c => (
          <div key={c._id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <div className="font-semibold text-lg">
                {c.name} ({c.year}) — {c.type}
              </div>
              <div className="text-sm text-gray-600">
                {c.position}
              </div>
              <div className="text-sm text-gray-600">
                {c.description}
              </div>
            </div>
            <div className="space-x-3">
              <button className="text-blue-600 font-semibold" onClick={() => handleEdit(c)}>
                Edit
              </button>
              <button className="text-red-600 font-semibold" onClick={() => handleDelete(c._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {competitions.length === 0 && (
          <p className="text-gray-500 text-sm">No competitions yet. Add Formula Bharat, Supra, BAJA, etc.</p>
        )}
      </div>
    </div>
  );
};

export default AdminCompetitions;
