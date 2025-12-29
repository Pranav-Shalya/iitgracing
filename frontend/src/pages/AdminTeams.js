import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminTeams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [form, setForm] = useState({
    year: '',
    name: '',
    description: '',
  });
  const [members, setMembers] = useState([
    { name: '', role: '', linkedin: '' },
  ]);

  const token = localStorage.getItem('token');

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: `Bearer ${token}` },
  });

  const fetchTeams = async () => {
    const res = await api.get('/teams');
    setTeams(res.data);
  };

  useEffect(() => {
    if (token) fetchTeams();
  }, []);

  const resetForm = () => {
    setSelectedTeamId(null);
    setForm({ year: '', name: '', description: '' });
    setMembers([{ name: '', role: '', linkedin: '' }]);
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      year: Number(form.year),
      name: form.name,
      description: form.description,
      members: members.filter(m => m.name.trim() !== ''),
    };

    if (selectedTeamId) {
      await api.put(`/teams/${selectedTeamId}`, payload);
    } else {
      await api.post('/teams', payload);
    }

    resetForm();
    fetchTeams();
  };

  const handleEdit = (team) => {
    setSelectedTeamId(team._id);
    setForm({
      year: team.year,
      name: team.name || '',
      description: team.description || '',
    });
    setMembers(
      team.members && team.members.length
        ? team.members
        : [{ name: '', role: '', linkedin: '' }]
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this team?')) return;
    await api.delete(`/teams/${id}`);
    if (selectedTeamId === id) resetForm();
    fetchTeams();
  };

  const updateMember = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const addMemberRow = () => {
    setMembers([...members, { name: '', role: '', linkedin: '' }]);
  };

  const removeMemberRow = (index) => {
    if (members.length === 1) return;
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        {selectedTeamId ? 'Edit Team' : 'Add Team'}
      </h1>

      {/* Team form */}
      <form
        onSubmit={handleTeamSubmit}
        className="bg-white p-6 rounded-xl shadow mb-10 space-y-4"
      >
        <div className="grid md:grid-cols-3 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Year (e.g. 2025)"
            type="number"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Team Name (optional)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Short Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {/* Members */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Members</h2>
          <p className="text-sm text-gray-500 mb-3">
            Add captain, subsystem leads, core members, etc.
          </p>
          <div className="space-y-3">
            {members.map((m, index) => (
              <div
                key={index}
                className="grid md:grid-cols-4 gap-3 items-center"
              >
                <input
                  className="border p-2 rounded"
                  placeholder="Name"
                  value={m.name}
                  onChange={(e) =>
                    updateMember(index, 'name', e.target.value)
                  }
                />
                <input
                  className="border p-2 rounded"
                  placeholder="Role (Captain, Aero lead...)"
                  value={m.role}
                  onChange={(e) =>
                    updateMember(index, 'role', e.target.value)
                  }
                />
                <input
                  className="border p-2 rounded"
                  placeholder="LinkedIn URL (optional)"
                  value={m.linkedin || ''}
                  onChange={(e) =>
                    updateMember(index, 'linkedin', e.target.value)
                  }
                />
                <input
                className="border p-2 rounded"
                placeholder="Image URL (optional)"
                value={m.image || ''}
                onChange={(e) =>
                    updateMember(index, 'image', e.target.value)
                }
                />

                <button
                  type="button"
                  className="text-red-600 font-semibold"
                  onClick={() => removeMemberRow(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addMemberRow}
            className="mt-3 text-blue-600 font-semibold"
          >
            + Add member
          </button>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
          >
            {selectedTeamId ? 'Update Team' : 'Create Team'}
          </button>
          {selectedTeamId && (
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

      {/* Teams list */}
      <h2 className="text-2xl font-bold mb-4">Existing Teams</h2>
      <div className="space-y-3">
        {teams.map((team) => (
          <div
            key={team._id}
            className="bg-white p-4 rounded shadow flex justify-between items-start"
          >
            <div>
              <div className="font-semibold text-lg">
                {team.year} — {team.name || 'Team'}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                {team.description}
              </div>
              <div className="text-xs text-gray-500">
                {team.members?.length || 0} members
              </div>
            </div>
            <div className="space-x-3">
              <button
                className="text-blue-600 font-semibold"
                onClick={() => handleEdit(team)}
              >
                Edit
              </button>
              <button
                className="text-red-600 font-semibold"
                onClick={() => handleDelete(team._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {teams.length === 0 && (
          <p className="text-gray-500 text-sm">
            No teams yet. Add your first team above.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminTeams;
