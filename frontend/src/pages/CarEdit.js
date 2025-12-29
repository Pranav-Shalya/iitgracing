import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CarsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [car, setCar] = useState({
    name: '', slug: '', category: 'formula', year: '', titleLine: '',
    descriptionTop: '', descriptionBottom: '', specs: { maxSpeedKmph: '', engine: '', torqueNm: '' },
    images: [], highlights: [], designNotes: ''
  });
  
  const [loading, setLoading] = useState(true);

  // ✅ FIXED: Use SAME API as AdminCars!
  useEffect(() => {
    console.log('🔍 Loading car with ID:', id);
    
    if (id === 'new') {
      setLoading(false);
      return;
    }
    
    // STEP 1: Get ALL cars (SAME as AdminCars)
    fetch('https://iitgracing.onrender.com/api/public/cars')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load cars');
        return res.json();
      })
      .then(allCars => {
        console.log('✅ ALL CARS:', allCars);
        
        // STEP 2: Find our car by ID
        const targetCar = allCars.find(c => c._id === id);
        console.log('🎯 FOUND CAR:', targetCar);
        
        if (!targetCar) {
          throw new Error('Car not found');
        }
        
        // STEP 3: Map to form format (matches your data structure)
        const safeCar = {
          _id: targetCar._id,
          name: targetCar.name || '',
          slug: targetCar.slug || '',
          category: targetCar.category || 'formula',
          year: targetCar.year || '',
          titleLine: targetCar.titleLine || '',
          descriptionTop: targetCar.descriptionTop || targetCar.description || '',
          descriptionBottom: targetCar.descriptionBottom || '',
          specs: {
            maxSpeedKmph: targetCar.specs?.maxSpeedKmph || targetCar.specs?.topSpeed || '',
            engine: targetCar.specs?.engine || '',
            torqueNm: targetCar.specs?.torqueNm || ''
          },
          images: targetCar.images || [],
          highlights: targetCar.highlights || [],
          designNotes: targetCar.designNotes || ''
        };
        
        console.log('✅ FORMATTED:', safeCar);
        setCar(safeCar);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Load failed:', err);
        setLoading(false);
      });
  }, [id]);

  // Slug generator
  useEffect(() => {
    if (car.name && !car.slug) {
      const slug = car.name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      setCar(prev => ({ ...prev, slug }));
    }
  }, [car.name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('specs.')) {
      const field = name.split('.')[1];
      setCar(prev => ({ ...prev, specs: { ...prev.specs, [field]: value } }));
    } else {
      setCar(prev => ({ ...prev, [name]: value }));
    }
  };

  const addImage = () => setCar(prev => ({ ...prev, images: [...prev.images, ''] }));
  const updateImage = (index, url) => setCar(prev => ({ ...prev, images: prev.images.map((img, i) => i === index ? url : img) }));
  const removeImage = (index) => setCar(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  
  const addHighlight = () => setCar(prev => ({ ...prev, highlights: [...prev.highlights, ''] }));
  const updateHighlight = (index, text) => setCar(prev => ({ ...prev, highlights: prev.highlights.map((h, i) => i === index ? text : h) }));
  const removeHighlight = (index) => setCar(prev => ({ ...prev, highlights: prev.highlights.filter((_, i) => i !== index) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = id === 'new' ? 'http://localhost:5000/api/public/cars' : `http://localhost:5000/api/public/cars/${id}`;
      const response = await fetch(url, {
        method: id === 'new' ? 'POST' : 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(car)
      });
      
      if (!response.ok) throw new Error('Save failed');
      alert('✅ Saved!');
      navigate('/admin/cars');
    } catch (error) {
      alert('❌ Save failed');
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-12 flex items-center justify-center min-h-screen">
        <div className="text-3xl font-bold text-gray-600 animate-pulse">🔄 Loading car details...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50/30">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-emerald-900 bg-clip-text text-transparent">
          {id === 'new' ? '🚗 Add New Car' : `🔧 Edit ${car.name || 'Car'}`}
        </h1>
        <button 
          onClick={() => navigate('/admin/cars')}
          className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-3xl hover:from-gray-600 hover:to-gray-700 shadow-xl hover:shadow-gray-400/50 transition-all"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BASIC INFO */}
        <div className="space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 border-b pb-4">Basic Info</h2>
          <input name="name" value={car.name} onChange={handleChange} placeholder="Car Name *" className="w-full p-6 border-2 border-gray-200 rounded-3xl text-2xl font-bold focus:ring-4 focus:ring-blue-400" required />
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-lg font-semibold text-gray-600 mb-3 block">Slug</label>
              <input name="slug" value={car.slug} className="w-full p-5 border-2 border-gray-300/50 bg-gray-50 rounded-3xl font-mono" readOnly />
            </div>
            <input name="year" type="number" min="1900" max="2030" value={car.year} onChange={handleChange} placeholder="2025" className="p-6 border-2 border-gray-200 rounded-3xl text-2xl font-bold focus:ring-4 focus:ring-emerald-400" />
          </div>
          <select name="category" value={car.category} onChange={handleChange} className="w-full p-6 border-2 border-gray-200 rounded-3xl text-xl font-bold focus:ring-4 focus:ring-purple-400">
            <option value="formula">⚡ Formula Student</option>
            <option value="efficycle">🚴 Efficycle</option>
            <option value="baja">🏁 Baja SAE</option>
            <option value="concept">🔮 Concept</option>
          </select>
          <input name="titleLine" value={car.titleLine} onChange={handleChange} placeholder='Tagline "First IITG Racing Formula Car"' className="w-full p-6 border-2 border-gray-200 rounded-3xl text-xl focus:ring-4 focus:ring-indigo-400" />
        </div>

        {/* SPECS */}
        <div className="space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 border-b pb-4">Technical Specs</h2>
          <div className="grid grid-cols-2 gap-6">
            <input name="specs.maxSpeedKmph" type="number" value={car.specs.maxSpeedKmph} onChange={handleChange} placeholder="115" className="p-6 border-2 border-gray-200 rounded-3xl text-xl focus:ring-4 focus:ring-blue-400" />
            <input name="specs.torqueNm" type="number" value={car.specs.torqueNm} onChange={handleChange} placeholder="66" className="p-6 border-2 border-gray-200 rounded-3xl text-xl focus:ring-4 focus:ring-orange-400" />
          </div>
          <input name="specs.engine" value={car.specs.engine} onChange={handleChange} placeholder="Honda CBR600" className="w-full p-6 border-2 border-gray-200 rounded-3xl text-xl focus:ring-4 focus:ring-emerald-400" />
        </div>
        // ✅ ADD THESE SECTIONS to your CarsEdit.js AFTER SPECS section:

        {/* IMAGES + GALLERY */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 shadow-2xl">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            🖼️ Gallery / Images ({car.images.length})
        </h3>
        <div className="space-y-4">
            {car.images.map((img, i) => (
            <div key={i} className="flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border-2 border-blue-200 hover:border-blue-300 transition-all">
                <input 
                value={img} 
                onChange={e => updateImage(i, e.target.value)} 
                placeholder="https://images.unsplash.com/photo-..." 
                className="flex-1 p-4 border-2 border-gray-300 rounded-2xl font-mono text-lg focus:ring-4 focus:ring-blue-400" 
                />
                {img && (
                <img 
                    src={img} 
                    alt={`Preview ${i + 1}`} 
                    className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-3xl ring-4 ring-white/50 shadow-2xl hover:scale-110 transition-all duration-300" 
                    onError={e => e.target.style.display = 'none'}
                />
                )}
                <button 
                type="button" 
                onClick={() => removeImage(i)} 
                className="px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-2xl hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-400/50 hover:-translate-y-1 transition-all w-28 flex items-center justify-center"
                >
                × Remove
                </button>
            </div>
            ))}
            <button 
            type="button" 
            onClick={addImage} 
            className="w-full p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xl rounded-3xl hover:from-emerald-600 hover:to-teal-700 shadow-2xl hover:shadow-emerald-500/50 hover:-translate-y-1 transition-all duration-300"
            >
            + Add Image URL
            </button>
        </div>
        </div>

        {/* HIGHLIGHTS / ACHIEVEMENTS */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 shadow-2xl">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            🏆 Key Achievements / Highlights ({car.highlights.length})
        </h3>
        <div className="space-y-4">
            {car.highlights.map((highlight, i) => (
            <div key={i} className="flex items-start gap-4 p-6 bg-gradient-to-r from-orange-50/80 to-yellow-50/80 rounded-3xl border-2 border-orange-200/60 hover:border-orange-300 transition-all">
                <div className="flex-1">
                <textarea 
                    value={highlight} 
                    onChange={e => updateHighlight(i, e.target.value)}
                    placeholder="• 67th position among 167 teams at SUPRA 2015" 
                    rows="2"
                    className="w-full p-4 border-2 border-gray-300 rounded-2xl text-lg focus:ring-4 focus:ring-orange-400 resize-vertical font-medium leading-relaxed"
                />
                </div>
                <div className="flex flex-col gap-2 pt-1">
                <span className="text-2xl font-bold text-orange-500 drop-shadow-lg">#{i + 1}</span>
                <button 
                    type="button" 
                    onClick={() => removeHighlight(i)} 
                    className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-2xl hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-400/50 hover:-translate-y-1 transition-all flex items-center justify-center text-lg"
                >
                    ×
                </button>
                </div>
            </div>
            ))}
            <button 
            type="button" 
            onClick={addHighlight} 
            className="w-full p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-xl rounded-3xl hover:from-purple-600 hover:to-pink-700 shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-1 transition-all duration-300"
            >
            + Add Achievement
            </button>
        </div>
        </div>

        {/* DESIGN NOTES */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 shadow-2xl">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">📝 Design Notes</h3>
        <textarea 
            name="designNotes" 
            value={car.designNotes} 
            onChange={handleChange}
            placeholder="Design philosophy, materials, innovations, challenges..." 
            rows="6"
            className="w-full p-6 border-2 border-gray-200 rounded-3xl text-lg focus:ring-4 focus:ring-indigo-400 resize-vertical"
        />
        </div>


        {/* REST OF FORM SAME AS BEFORE */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">Descriptions</h2>
          <textarea name="descriptionTop" value={car.descriptionTop} onChange={handleChange} rows="5" placeholder="Main description..." className="w-full p-6 border-2 border-gray-200 rounded-3xl text-lg focus:ring-4 focus:ring-blue-400 resize-vertical" />
          <textarea name="descriptionBottom" value={car.descriptionBottom} onChange={handleChange} rows="4" placeholder="Additional info..." className="w-full p-6 border-2 border-gray-200 rounded-3xl text-lg focus:ring-4 focus:ring-blue-400 resize-vertical" />
        </div>

        <div className="lg:col-span-2 pt-12 border-t-4 border-blue-200 bg-gradient-to-r from-blue-50 to-emerald-50 p-12 rounded-4xl shadow-2xl">
          <button type="submit" className="w-full px-12 py-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white font-black text-2xl rounded-4xl shadow-2xl hover:shadow-blue-500/60 hover:-translate-y-2 transition-all duration-500">
            {id === 'new' ? '🚀 Create New Car' : '💾 Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarsEdit;
