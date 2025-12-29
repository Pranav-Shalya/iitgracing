import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'; 

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    name: '',
    year: '',
    category: 'formula',  // ✅ Changed from 'type'
    descriptionTop: '',   // ✅ New field
    engine: '',
    maxSpeedKmph: '',     // ✅ New field name
    torqueNm: '',         // ✅ New field
    chassis: ''
  });

  const token = localStorage.getItem('token');

  const api = axios.create({
    baseURL: 'https://iitgracing.onrender.com/api/public',
    headers: { Authorization: `Bearer ${token}` }
  });

  const fetchCars = async () => {
    try {
      const res = await api.get('/cars');
      setCars(res.data);
    } catch (error) {
      toast.error('Failed to load cars');
    }
  };

  useEffect(() => {
    if (token) fetchCars();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/cars', {
        name: form.name,
        year: Number(form.year),
        category: form.category,  // ✅ Fixed field name
        descriptionTop: form.descriptionTop,
        specs: {
          engine: form.engine,
          maxSpeedKmph: Number(form.maxSpeedKmph),  // ✅ Fixed field name
          torqueNm: Number(form.torqueNm),
          chassis: form.chassis,
        }
      });
      toast.success('✅ Car created!');
      setForm({
        name: '',
        year: '',
        category: 'formula',
        descriptionTop: '',
        engine: '',
        maxSpeedKmph: '',
        torqueNm: '',
        chassis: ''
      });
      fetchCars();
    } catch (error) {
      toast.error('❌ Create failed');
    }
  };

  const deleteCar = async (id) => {
    if (!window.confirm('Delete this car?')) return;
    try {
      await api.delete(`/cars/${id}`);
      toast.success('✅ Car deleted');
      fetchCars();
    } catch (error) {
      toast.error('❌ Delete failed');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Cars</h1>

      {/* Add car form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-10 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Name"
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
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          >
            <option value="formula">Formula Student</option>
            <option value="efficycle">Efficycle</option>
            <option value="baja">Baja SAE</option>
            <option value="concept">Concept</option>
          </select>
          <input
            className="border p-2 rounded"
            placeholder="Engine"
            value={form.engine}
            onChange={e => setForm({ ...form, engine: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Max Speed (kmph)"
            type="number"
            value={form.maxSpeedKmph}
            onChange={e => setForm({ ...form, maxSpeedKmph: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Torque (Nm)"
            type="number"
            value={form.torqueNm}
            onChange={e => setForm({ ...form, torqueNm: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Chassis"
            value={form.chassis}
            onChange={e => setForm({ ...form, chassis: e.target.value })}
          />
        </div>
        <textarea
          className="border p-2 rounded w-full"
          rows="3"
          placeholder="Description"
          value={form.descriptionTop}
          onChange={e => setForm({ ...form, descriptionTop: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
        >
          Add Car
        </button>
      </form>

      {/* Car list */}
      <div className="space-y-4">
        {cars.map(car => (
          <div key={car._id} className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{car.name}</h3>
              <div className="flex gap-4 text-sm text-gray-600 mb-4">
                <span>{car.year}</span>
                <span className="capitalize">{car.category}</span>
              </div>
              <p className="text-gray-700 line-clamp-2">{car.descriptionTop}</p>
            </div>
            
            {/* ADMIN ACTION BUTTONS */}
            <div className="flex gap-2 ml-4 flex-shrink-0">
              <Link 
                to={`/admin/cars/edit/${car._id}`}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-blue-400/50 hover:-translate-y-1 transition-all duration-300 text-sm whitespace-nowrap"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteCar(car._id)}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-400/50 hover:-translate-y-1 transition-all duration-300 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCars;
