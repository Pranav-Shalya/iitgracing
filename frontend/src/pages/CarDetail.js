import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CarDetail = () => {
  const { slug } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://iitgracing.onrender.com/api/public/cars/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.message);
        setCar(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Car not found');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="simple-page flex items-center justify-center min-h-[60vh] p-4">
        <div className="text-xl font-bold text-gray-600 animate-pulse">Loading car details...</div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="simple-page flex items-center justify-center min-h-[60vh] p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6 opacity-30">🚗</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Car Not Found</h2>
          <Link to="/cars" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all inline-block">
            ← Back to Cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="simple-page py-12 max-w-4xl mx-auto px-4">
      {/* ADMIN EDIT BUTTON - TOP RIGHT (SIMPLE TEXT) */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-lg">
              {car.year}
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-lg rounded-2xl shadow-lg">
              {car.category?.replace(/^\w/, c => c.toUpperCase())}
            </span>
          </div>
        </div>
        {/* <Link 
          to={`/admin/cars/edit/${car._id}`} 
          className="group bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white p-3 rounded-2xl shadow-lg hover:shadow-orange-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 font-bold text-sm md:text-base whitespace-nowrap"
        >
          <span>✏️</span>
          <span className="hidden md:inline">Edit</span>
        </Link> */}
      </div>

      {/* CAR HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
          {car.name}
        </h1>
        {car.titleLine && (
          <p className="text-xl md:text-2xl text-gray-700 font-semibold italic max-w-2xl mx-auto bg-gradient-to-r from-blue-100 to-indigo-100 bg-clip-text text-transparent drop-shadow-sm">
            "{car.titleLine}"
          </p>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* LEFT: SPECS */}
        {car.specs && Object.keys(car.specs).length > 0 && (
          <div className="space-y-6 order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-black text-white bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-8">
              Technical Specs
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {car.specs.maxSpeedKmph && (
                <div className="group p-8 rounded-3xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/40 backdrop-blur-xl hover:shadow-blue-500/30 hover:shadow-2xl hover:scale-105 hover:-translate-y-3 transition-all duration-700">
                  <div className="text-6xl mb-6 drop-shadow-2xl group-hover:scale-110 transition-transform">⚡</div>
                  <h4 className="text-2xl font-bold text-white mb-4 drop-shadow-xl">Max Speed</h4>
                  <p className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent drop-shadow-2xl">
                    {car.specs.maxSpeedKmph} km/h
                  </p>
                </div>
              )}
              
              {car.specs.engine && (
                <div className="group p-8 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 backdrop-blur-xl hover:shadow-emerald-500/30 hover:shadow-2xl hover:scale-105 hover:-translate-y-3 transition-all duration-700">
                  <div className="text-6xl mb-6 drop-shadow-2xl group-hover:scale-110 transition-transform">🔧</div>
                  <h4 className="text-2xl font-bold text-white mb-4 drop-shadow-xl">Engine</h4>
                  <p className="text-2xl lg:text-3xl font-bold text-emerald-300 drop-shadow-2xl leading-tight">
                    {car.specs.engine}
                  </p>
                </div>
              )}
              
              {car.specs.torqueNm && (
                <div className="group p-8 rounded-3xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/40 backdrop-blur-xl hover:shadow-orange-500/30 hover:shadow-2xl hover:scale-105 hover:-translate-y-3 transition-all duration-700">
                  <div className="text-6xl mb-6 drop-shadow-2xl group-hover:scale-110 transition-transform">⚙️</div>
                  <h4 className="text-2xl font-bold text-white mb-4 drop-shadow-xl">Torque</h4>
                  <p className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-orange-300 to-orange-100 bg-clip-text text-transparent drop-shadow-2xl">
                    {car.specs.torqueNm} Nm
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* RIGHT: DESCRIPTIONS */}
        <div className="order-1 lg:order-2 space-y-8">
          {car.descriptionTop && (
            <div className="bg-gradient-to-b from-slate-900/80 to-transparent backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-white/10">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-6 drop-shadow-xl">Overview</h3>
              <p className="text-lg md:text-xl text-gray-100 leading-relaxed opacity-95 prose prose-lg max-w-none">
                {car.descriptionTop}
              </p>
            </div>
          )}
          
          {car.descriptionBottom && (
            <div className="bg-gradient-to-b from-slate-900/80 to-transparent backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-white/10">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-6 drop-shadow-xl">Legacy</h3>
              <p className="text-lg md:text-xl text-gray-100 leading-relaxed opacity-95 prose prose-lg max-w-none">
                {car.descriptionBottom}
              </p>
            </div>
          )}

        </div>
        {/* // ADD THESE SECTIONS after SPECS (around line 120) in CarDetail.js: */}

{/* GALLERY - NEW */}
{car.images && car.images.length > 0 && (
  <div className="order-1 lg:order-3 space-y-6 pt-8 border-t border-white/10">
    <h3 className="text-2xl md:text-3xl font-black text-white bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-8">
      Gallery
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {car.images.map((imageUrl, index) => (
        <div key={index} className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-transparent backdrop-blur-xl p-2 hover:p-0 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/30">
          <img 
            src={imageUrl} 
            alt={`${car.name} ${index + 1}`}
            className="w-full h-64 lg:h-72 object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <span className="text-white font-bold text-lg drop-shadow-lg">Photo {index + 1}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        {/* HIGHLIGHTS - NEW */}
        {car.highlights && car.highlights.length > 0 && (
        <div className="order-2 lg:order-4 space-y-6 pt-8 border-t border-white/10">
            <h3 className="text-2xl md:text-3xl font-black text-white bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-8">
            Key Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {car.highlights.map((highlight, index) => (
                <div key={index} className="group p-8 rounded-3xl bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-red-500/20 border border-orange-400/40 backdrop-blur-xl hover:shadow-orange-500/30 hover:shadow-2xl hover:-translate-y-3 hover:scale-105 transition-all duration-700">
                <div className="flex items-start space-x-4 mb-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform">🏆</div>
                    <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2 drop-shadow-xl">{index + 1}</h4>
                    </div>
                </div>
                <p className="text-lg text-gray-100 leading-relaxed drop-shadow-lg">
                    {highlight}
                </p>
                </div>
            ))}
            </div>
        </div>
        )}

      </div>

      {/* BACK BUTTON */}
      <div className="text-center mt-16 pt-12 border-t border-gray-200/20">
        <Link 
          to="/cars" 
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-800 to-slate-900 hover:from-gray-900 hover:to-slate-950 text-white font-bold rounded-3xl shadow-xl hover:shadow-gray-500/30 hover:-translate-y-2 transition-all duration-500 border border-gray-600/30 text-lg"
        >
          ← Back to Fleet
        </Link>
      </div>
    </div>
  );
};

export default CarDetail;
