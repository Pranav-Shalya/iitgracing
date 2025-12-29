// import React, { useEffect, useState } from 'react';

// const PublicTeam = () => {
//   const [teams, setTeams] = useState([]);
//   const [selectedYear, setSelectedYear] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/public/teams')
//       .then(res => res.json())
//       .then(data => {
//         const sorted = data.sort((a, b) => b.year - a.year);
//         setTeams(sorted);
//         if (sorted.length) setSelectedYear(sorted[0].year);
//       })
//       .catch(console.error);
//   }, []);

//   const current = teams.find(t => t.year === selectedYear);

//   return (
//     <div className="simple-page" style={{ display: 'flex', gap: 32 }}>
//       {/* Left side: past teams menu */}
//       <aside
//         className="team-sidebar"
//         style={{ width: sidebarOpen ? 180 : 32 }}
//       >
//         {/* toggle button */}
//         <button
//           onClick={() => setSidebarOpen(o => !o)}
//           style={{
//             position: 'absolute',
//             top: 16,
//             right: -12,
//             width: 24,
//             height: 24,
//             borderRadius: '999px',
//             border: '1px solid rgba(148,163,184,0.4)',
//             background: '#020617',
//             color: '#e5e7eb',
//             fontSize: 11,
//             cursor: 'pointer'
//           }}
//         >
//           {sidebarOpen ? '‹' : '›'}
//         </button>

//         {sidebarOpen && (
//           <>
//             <div className="team-sidebar-title">TEAM</div>

//             <button
//               className={
//                 'team-sidebar-item' +
//                 (selectedYear === (teams[0]?.year || selectedYear)
//                   ? ' team-sidebar-item--active'
//                   : '')
//               }
//               onClick={() => setSelectedYear(teams[0]?.year)}
//             >
//               Current
//             </button>

//             {teams
//               .slice(1)
//               .sort((a, b) => b.year - a.year)
//               .map(t => (
//                 <button
//                   key={t._id}
//                   className={
//                     'team-sidebar-item' +
//                     (selectedYear === t.year ? ' team-sidebar-item--active' : '')
//                   }
//                   onClick={() => setSelectedYear(t.year)}
//                 >
//                   {t.year === 2019 ? 'Alumni' : t.year}
//                 </button>
//               ))}
//           </>
//         )}
//       </aside>

//       {/* Right side: content */}
//       <div style={{ flex: 1, minWidth: 0 }}>
//         {/* optional: heading */}
//         <h1 className="section-title" style={{ marginBottom: 8 }}>
//           The Team
//         </h1>
//         <p className="card-text" style={{ marginBottom: 16, maxWidth: 520 }}>
//           Meet the students leading IITG Racing across subsystems and core team.
//         </p>

        
//         {current ? (
//           <>
//             <div className="card" style={{ marginBottom: 16 }}>
//               <div className="card-title">
//                 {current.year === teams[0]?.year
//                   ? 'Current Team'
//                   : `Team ${current.year}`}{' '}
//                 {current.name ? `— ${current.name}` : ''}
//               </div>
//               <div className="card-text">
//                 {current.description ||
//                   'A young, enthusiastic team driving IITG Racing forward.'}
//               </div>
//               <div className="card-meta">
//                 {current.members?.length || 0} members.
//               </div>
//             </div>

//             <div className="cards-grid">
//               {current.members?.map((m, idx) => (
//                 <div key={idx} className="card">
//                   {m.image && (
//                     <div
//                       style={{
//                         marginBottom: 8,
//                         display: 'flex',
//                         justifyContent: 'center'
//                       }}
//                     >
//                       <img
//                         src={m.image}
//                         alt={m.name}
//                         style={{
//                           width: 72,
//                           height: 72,
//                           borderRadius: '999px',
//                           objectFit: 'cover',
//                           border: '2px solid #a855f7'
//                         }}
//                       />
//                     </div>
//                   )}

//                   <div className="card-title" style={{ textAlign: 'center' }}>
//                     {m.name}
//                   </div>
//                   <div className="card-meta" style={{ textAlign: 'center' }}>
//                     {m.role}
//                   </div>

//                   {m.linkedin && (
//                     <div style={{ textAlign: 'center', marginTop: 4 }}>
//                       <a
//                         href={m.linkedin}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="section-link"
//                       >
//                         LinkedIn
//                       </a>
//                     </div>
//                   )}
//                 </div>
//               ))}
//               {(!current.members || current.members.length === 0) && (
//                 <p className="card-text">
//                   Members not added yet for this year.
//                 </p>
//               )}
//             </div>
//           </>
//         ) : (
//           <p className="card-text">No teams added yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PublicTeam;
import React, { useEffect, useState } from 'react';

const PublicTeam = () => {
  const [teams, setTeams] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://iitgracing.onrender.com/api/public/teams')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => b.year - a.year);
        setTeams(sorted);
        if (sorted.length) setSelectedYear(sorted[0].year);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const current = teams.find(t => t.year === selectedYear);

  const categories = [
    { key: 'management', label: '👑 MANAGEMENT', icon: '👑', color: 'from-purple-500 to-pink-500' },
    { key: 'subsystem', label: '⚙️ SUBSYSTEM HEADS', icon: '⚙️', color: 'from-blue-500 to-cyan-500' },
    { key: 'marketing', label: '📈 MARKETING & DESIGN', icon: '📈', color: 'from-emerald-600 to-teal-600' },
    { key: 'core', label: '🚀 CORE TEAM', icon: '🚀', color: 'from-orange-500 to-red-500' },
    { key: 'alumni', label: '👨‍🎓 ALUMNI', icon: '👨‍🎓', color: 'from-slate-500 to-gray-500' }
  ];

  const getMembersByCategory = (catKey) => {
    if (!current?.members) return [];
    return current.members.filter(member => {
      const role = member.role.toLowerCase();
      if (catKey === 'management') return ['captain', 'vice captain', 'chairperson', 'secretary', 'coordinator', 'events head', 'pr', 'outreach', 'project manager'].some(r => role.includes(r));
      if (catKey === 'subsystem') return ['head', 'aero', 'thermal', 'chassis', 'voltage', 'tractive', 'suspension', 'steering', 'brakes', 'dynamics'].some(r => role.includes(r));
      if (catKey === 'marketing') return ['marketing', 'design'].some(r => role.includes(r));
      if (catKey === 'core') return role.includes('core');
      if (catKey === 'alumni') return role.includes('alumni') || role.includes('batch');
      return true;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-100 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-6"></div>
          <div className="text-xl font-bold text-slate-700 animate-pulse">Loading team...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/70 to-emerald-100 py-12 lg:py-16 px-4 lg:px-8 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="text-center mb-12 lg:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-800 via-blue-800 to-emerald-700 bg-clip-text text-transparent mb-4 lg:mb-6 leading-tight">
          THE TEAM
        </h1>
        <div className="w-20 lg:w-28 h-1 bg-gradient-to-r from-blue-500 to-emerald-600 mx-auto rounded-full mb-6"></div>
        <p className="text-lg md:text-xl text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed">
          IIT Guwahati's Formula Student team with student heads across subsystems and core team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* YEARS SIDEBAR */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="sticky top-24 lg:top-28 space-y-4">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-slate-200/50 shadow-lg">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-6">YEARS</h4>
              <div className="space-y-3">
                {/* CURRENT - DARKER GREEN */}
                <button 
                  className="w-full group relative p-5 lg:p-6 rounded-2xl border-2 font-bold text-lg lg:text-xl transition-all duration-300 overflow-hidden text-left shadow-md bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-500 text-white hover:shadow-emerald-500/50 hover:shadow-xl hover:scale-[1.02]"
                  onClick={() => setSelectedYear(teams[0]?.year)}
                >
                  <span className="relative z-10 font-bold">CURRENT</span>
                </button>
                
                {/* OTHER YEARS */}
                {teams.slice(1).map(team => (
                  <button 
                    key={team._id}
                    className={`w-full group relative p-5 lg:p-6 rounded-2xl border-2 font-semibold text-lg transition-all duration-300 overflow-hidden text-left shadow-md ${
                      selectedYear === team.year 
                        ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-500 text-white shadow-lg hover:shadow-slate-400/50 hover:scale-[1.02]' 
                        : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-md hover:scale-[1.01] text-slate-800'
                    }`}
                    onClick={() => setSelectedYear(team.year)}
                  >
                    <span className="relative z-10 font-semibold">{team.year}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-10 order-1 lg:order-2 space-y-12 lg:space-y-16">
          {current ? (
            <>
              {/* TEAM HEADER */}
              <div className="group relative bg-white/90 backdrop-blur-md text-slate-800 p-8 lg:p-10 rounded-3xl shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-500">
                <div className="relative z-10 max-w-3xl">
                  <h2 className="text-2xl lg:text-3xl xl:text-4xl font-black text-slate-900 mb-4 lg:mb-6 leading-tight">
                    {selectedYear === teams[0]?.year ? 'CURRENT TEAM' : `TEAM ${selectedYear}`}
                    {current.name && <span className="text-xl lg:text-2xl block font-semibold text-slate-700 mt-2">{current.name}</span>}
                  </h2>
                  <p className="text-lg lg:text-xl text-slate-700 leading-relaxed max-w-2xl font-medium">
                    IIT Guwahati's Formula Student team with student heads across subsystems and core team
                  </p>
                  <div className="mt-6 lg:mt-8 text-xl lg:text-2xl font-bold text-emerald-700 bg-emerald-100/90 px-6 py-3 rounded-2xl inline-block border-2 border-emerald-400/60 shadow-lg">
                    {current.members?.length || 0} MEMBERS
                  </div>
                </div>
              </div>

              {/* CATEGORIES */}
              <div className="space-y-12 lg:space-y-16">
                {categories.map(({ key, label, icon, color }) => {
                  const categoryMembers = getMembersByCategory(key);
                  if (categoryMembers.length === 0) return null;
                  
                  return (
                    <section key={key}>
                      {/* CATEGORY HEADER */}
                      <div className="relative p-6 lg:p-10 rounded-3xl shadow-xl border border-slate-200/50 backdrop-blur-md overflow-hidden mb-10 lg:mb-12 bg-white/90 hover:shadow-2xl transition-all duration-500">
                        <div className={`absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl ${color} shadow-xl flex items-center justify-center text-3xl font-black border-4 border-white/50 -rotate-3 z-10`}>{icon}</div>
                        <div className="relative z-10 text-center lg:text-left lg:ml-28 max-w-3xl">
                          <h3 className="text-2xl lg:text-3xl xl:text-4xl font-black text-slate-900 mb-3 lg:mb-4 tracking-tight">
                            {label}
                          </h3>
                          <div className="text-xl lg:text-2xl font-bold text-slate-800 bg-slate-100/90 px-8 py-3 rounded-2xl inline-block border border-slate-300/50 shadow-lg">
                            {categoryMembers.length} MEMBERS
                          </div>
                        </div>
                      </div>
                      
                      {/* MEMBERS GRID */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
                        {categoryMembers.map((member, idx) => (
                          <div key={idx} className="group relative bg-white backdrop-blur-md p-6 lg:p-8 rounded-2xl shadow-lg border border-slate-200/70 hover:border-emerald-500/80 hover:shadow-xl hover:shadow-emerald-200/40 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 overflow-hidden">
                            <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-6 rounded-2xl overflow-hidden ring-4 ring-white/50 shadow-lg group-hover:ring-emerald-500/60 transition-all duration-400 group-hover:scale-110">
                              {member.image ? (
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-2xl font-bold text-slate-600 border shadow-md">👤</div>
                              )}
                            </div>
                            
                            <h4 className="text-lg lg:text-xl font-black text-slate-900 text-center mb-3 leading-tight group-hover:text-emerald-700 transition-colors">
                              {member.name}
                            </h4>
                            
                            <p className="text-sm lg:text-base font-semibold text-slate-700 text-center mb-6 leading-relaxed px-2 group-hover:text-slate-800 transition-colors">
                              {member.role}
                            </p>
                            
                            {member.linkedin && (
                              <a href={member.linkedin} target="_blank" rel="noreferrer" className="mx-auto block w-full max-w-[200px] px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-emerald-500/60 hover:-translate-y-1 hover:from-emerald-700 hover:to-teal-700 hover:scale-105 transition-all duration-400 text-center">
                                🔗 LinkedIn
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-24 lg:py-32">
              <div className="text-6xl lg:text-7xl mb-8 opacity-20 mx-auto w-24 h-24 flex items-center justify-center bg-slate-200 rounded-2xl text-slate-500">👥</div>
              <h3 className="text-2xl lg:text-4xl font-black text-slate-800 mb-4 tracking-tight">No team data</h3>
              <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">Team members will appear here once added by admin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicTeam;


