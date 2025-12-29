import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PublicCars = () => {
  const [groupedCars, setGroupedCars] = useState({});
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://iitgracing.onrender.com/api/public/cars/grouped')
      .then(res => res.json())
      .then(data => {
        setGroupedCars(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Cars grouped API error', err);
        setError('Unable to load cars right now.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="simple-page flex items-center justify-center min-h-[50vh] p-4">
        <div className="text-lg md:text-xl font-bold text-gray-600 animate-pulse">Loading racing fleet...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="simple-page flex items-center justify-center min-h-[50vh] p-4">
        <div className="text-center max-w-sm p-6">
          <div className="text-4xl md:text-6xl mb-4 opacity-30 mx-auto">🚗</div>
          <p className="text-base md:text-lg text-gray-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const categories = [
    { key: 'formula', label: 'Formula Student', icon: '⚡', color: 'from-blue-600 to-indigo-700' },
    { key: 'efficycle', label: 'Efficycle', icon: '🚴', color: 'from-emerald-600 to-teal-700' },
    { key: 'baja', label: 'Baja SAE', icon: '🏁', color: 'from-orange-600 to-red-700' },
    { key: 'concept', label: 'Concept', icon: '🔮', color: 'from-purple-600 to-pink-700' }
  ];

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="simple-page py-8 md:py-12 max-w-6xl mx-auto px-4">
      {/* COMPACT HEADER */}
      <div className="text-center mb-10 md:mb-14">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent mb-3 md:mb-4 leading-tight">
          Our Cars
        </h1>
        <p className="text-base md:text-lg text-gray-600 font-medium max-w-xl mx-auto leading-relaxed">
          Engineering marvels built by IITG Racing since 2015
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        
        {/* COMPACT ELEGANT SIDEBAR */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="sticky top-6 lg:top-24 space-y-3">
            
            {/* MINI FLEET BUTTON */}
            <button
              className="w-full group relative p-3.5 md:p-4 rounded-2xl border-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 -z-10"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl drop-shadow-md">⚡</span>
                  <span className="font-bold text-sm md:text-base hidden sm:inline">Fleet</span>
                </div>
                <span className={`text-lg transform transition-transform duration-300 ${
                  showSidebar ? 'rotate-45 scale-110' : ''
                }`}>
                  {showSidebar ? '✕' : '▸'}
                </span>
              </div>
            </button>

            {/* COLLAPSED CATEGORIES - ELEGANT */}
            <div className={`space-y-2 transition-all duration-500 overflow-hidden ${
              showSidebar ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              {categories.map(({ key, label, icon, color }, index) => {
                const carsInCategory = groupedCars[key] || [];
                const isActive = expandedCategory === key;
                return (
                  <button
                    key={key}
                    className={`w-full group relative p-3 md:p-3.5 rounded-xl border transition-all duration-400 flex items-center justify-between text-left shadow-md hover:shadow-lg hover:-translate-y-0.5 overflow-hidden backdrop-blur-sm text-xs md:text-sm ${
                      isActive 
                        ? `bg-gradient-to-r ${color} text-white border-${color.split(' ')[0].replace('from-','')} shadow-md ring-2 ring-white/30 scale-[1.02]` 
                        : 'bg-white/80 hover:bg-white border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleCategory(key)}
                  >
                    <div className="flex items-center space-x-2.5 flex-1">
                      <span className={`text-lg md:text-xl p-1.5 rounded-lg bg-white/10 backdrop-blur-sm shadow-md flex-shrink-0 ${
                        isActive ? 'scale-110 drop-shadow-lg' : 'group-hover:scale-110'
                      }`}>
                        {icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className={`font-semibold truncate pr-2 ${
                          isActive ? 'text-white drop-shadow-md' : 'text-gray-900 group-hover:text-gray-800'
                        }`}>
                          {label}
                        </div>
                        <div className={`font-medium text-xs ${
                          isActive ? 'text-blue-100' : 'text-gray-500 group-hover:text-gray-600'
                        }`}>
                          {carsInCategory.length}
                        </div>
                      </div>
                    </div>
                    <span className={`text-lg font-bold transform transition-all duration-400 flex-shrink-0 ${
                      isActive ? 'rotate-180 text-white drop-shadow-lg scale-110' : 'text-gray-400 group-hover:text-gray-600'
                    }`}>
                      ▼
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ✨ ENHANCED CARDS WITH IMAGES + TITLELINE */}
        <div className="lg:col-span-4 order-1 lg:order-2 space-y-5 lg:space-y-6">
          {expandedCategory ? (
            (() => {
              const carsInCategory = groupedCars[expandedCategory] || [];
              return carsInCategory.map((car, index) => (
                <div 
                  key={car._id}
                  className={`group relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-xl text-white p-6 md:p-8 rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl border border-white/10 hover:border-blue-400/50 overflow-hidden transition-all duration-500 hover:scale-[1.015] ${
                    index % 2 === 0 ? 'hover:translate-x-2 lg:hover:translate-x-4' : 'hover:-translate-x-2 lg:hover:-translate-x-4'
                  }`}
                >
                  {/* Shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-800 -z-10"></div>
                  
                  {/* ✨ COMPACT HEADER WITH PREVIEW IMAGE + TITLE LINE */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6 pb-6 border-b border-white/15 relative overflow-hidden rounded-2xl">
                    {/* ✨ PREVIEW IMAGE */}
                    {car.images && car.images[0] && (
                      <div className="w-24 h-24 lg:w-32 lg:h-32 flex-shrink-0 rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-2xl hover:scale-110 transition-all duration-500">
                        <img 
                          src={car.images[0]} 
                          alt={car.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent mb-2 leading-tight drop-shadow-xl">
                        {car.name}
                      </h2>
                      
                      {/* ✨ TITLE LINE */}
                      {car.titleLine && (
                        <p className="text-lg md:text-xl font-semibold text-blue-100 italic mb-3 drop-shadow-md">
                          "{car.titleLine}"
                        </p>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 text-white font-bold text-sm md:text-base bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-md">
                          {car.year}
                        </span>
                        <span className="px-3 py-1.5 text-blue-100 font-bold text-sm md:text-base bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-xl border border-blue-400/30 shadow-md">
                          {car.category?.replace(/^\w/, c => c.toUpperCase())}
                        </span>
                      </div>
                    </div>
                    
                    <Link 
                      to={`/cars/${car.slug}`}
                      className="group/link bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 md:px-8 md:py-3 lg:px-10 lg:py-4 rounded-2xl font-bold text-sm md:text-base shadow-lg hover:shadow-blue-500/40 hover:-translate-y-1.5 hover:scale-105 transition-all duration-400 border border-blue-500/30 whitespace-nowrap self-start lg:self-auto"
                    >
                      <span className="relative z-10">Details →</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/link:translate-x-full transition-transform duration-600 -z-10"></div>
                    </Link>
                  </div>
                  
                  {/* ✨ COMPACT CONTENT */}
                  <div className="space-y-4">
                    {car.descriptionTop && (
                      <p className="text-sm md:text-base text-gray-200 leading-relaxed opacity-90 max-w-2xl line-clamp-3">
                        {car.descriptionTop}
                      </p>
                    )}
                    
                    {/* ✨ SPECS PREVIEW */}
                    {car.specs && Object.keys(car.specs).length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 pt-4 border-t border-white/10">
                        {car.specs.maxSpeedKmph && (
                          <div className="group/spec p-4 md:p-5 rounded-2xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 border border-blue-400/30 backdrop-blur-sm hover:shadow-blue-400/25 hover:shadow-lg transition-all duration-400 hover:scale-105 hover:-translate-y-1">
                            <div className="text-3xl md:text-4xl mb-2 drop-shadow-lg">⚡</div>
                            <h4 className="text-xs md:text-sm font-bold text-white mb-1 drop-shadow-sm">Max Speed</h4>
                            <p className="text-lg md:text-xl font-black bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent drop-shadow-lg">
                              {car.specs.maxSpeedKmph} km/h
                            </p>
                          </div>
                        )}
                        {car.specs.engine && (
                          <div className="group/spec p-4 md:p-5 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 border border-emerald-400/30 backdrop-blur-sm hover:shadow-emerald-400/25 hover:shadow-lg transition-all duration-400 hover:scale-105 hover:-translate-y-1">
                            <div className="text-3xl md:text-4xl mb-2 drop-shadow-lg">🔧</div>
                            <h4 className="text-xs md:text-sm font-bold text-white mb-1 drop-shadow-sm">Engine</h4>
                            <p className="text-sm md:text-base font-bold text-emerald-200 drop-shadow-md truncate">
                              {car.specs.engine}
                            </p>
                          </div>
                        )}
                        {car.specs.torqueNm && (
                          <div className="group/spec p-4 md:p-5 rounded-2xl bg-gradient-to-br from-orange-500/15 to-red-500/15 border border-orange-400/30 backdrop-blur-sm hover:shadow-orange-400/25 hover:shadow-lg transition-all duration-400 hover:scale-105 hover:-translate-y-1">
                            <div className="text-3xl md:text-4xl mb-2 drop-shadow-lg">⚙️</div>
                            <h4 className="text-xs md:text-sm font-bold text-white mb-1 drop-shadow-sm">Torque</h4>
                            <p className="text-lg md:text-xl font-black bg-gradient-to-r from-orange-300 to-orange-100 bg-clip-text text-transparent drop-shadow-lg">
                              {car.specs.torqueNm} Nm
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ));
            })()
          ) : (
            <div className="col-span-1 lg:col-span-4 flex flex-col items-center justify-center h-64 md:h-72 lg:h-80 bg-gradient-to-br from-slate-50/60 to-blue-50/40 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-8 md:p-12 text-center group hover:border-blue-300 hover:shadow-xl transition-all duration-500 hover:scale-102 mx-2 lg:mx-0">
              <div className="text-5xl md:text-6xl lg:text-7xl mb-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse">🏎️</div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-800 mb-2 drop-shadow-md leading-tight">
                Discover Our Engineering Marvels
              </h3>
              <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto mb-6 leading-relaxed drop-shadow-sm">
                Click <span className="font-bold text-blue-600">Fleet</span> to explore IITG Racing's legacy
              </p>
              <div className="text-3xl md:text-4xl animate-bounce drop-shadow-md">👆</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicCars;
