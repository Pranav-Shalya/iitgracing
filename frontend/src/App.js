import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import AdminCars from './pages/AdminCars';
import AdminTeams from './pages/AdminTeams';
import AdminSponsors from './pages/AdminSponsors';
import AdminCompetitions from './pages/AdminCompetitions';
import AdminEvents from './pages/AdminEvents';
import PublicCars from './pages/PublicCars';
import PublicTeam from './pages/PublicTeam';
import PublicEvents from './pages/PublicEvents';
import PublicCompetitions from './pages/PublicCompetitions';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import iitgLogo from './assests/footer/iitglogo.png';
import iitgRacingText from './assests/footer/iitgracing.jpg';
import mesaLogo from './assests/footer/mesa_iitg_logo.jpg';
import techBoardLogo from './assests/footer/tech_board_logo.png';
import fbIcon from './assests/footer/facebook.png';
import igIcon from './assests/footer/insta.jpg';
import ytIcon from './assests/footer/youtube.png';
import liIcon from './assests/footer/linkedin.png';
import PublicSponsors from './pages/PublicSponsors';
import CarDetail from './pages/CarDetail';
import CarsEdit from './pages/CarEdit';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<PublicCars />} />
            <Route path="/team" element={<PublicTeam />} />
            <Route path="/events" element={<PublicEvents />} />
            <Route path="/competitions" element={<PublicCompetitions />} />
            <Route path="/sponsors" element={<PublicSponsors />} />
            <Route path="/login" element={<Login />} />
            {/* // Add this route
            // Add these routes in your <Routes> section: */}
{/* <Route path="/cars" element={<PublicCars />} /> */}
<Route path="/cars/:slug" element={<CarDetail />} />
<Route path="/admin/cars/edit/:id" element={<CarsEdit />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/cars"
              element={
                <ProtectedRoute>
                  <AdminCars />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/teams"
              element={
                <ProtectedRoute>
                  <AdminTeams />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/sponsors"
              element={
                <ProtectedRoute>
                  <AdminSponsors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/competitions"
              element={
                <ProtectedRoute>
                  <AdminCompetitions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <ProtectedRoute>
                  <AdminEvents />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer /> 
        </div>
      </Router>
    </AuthProvider>
  );
}

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          IITG RACING
        </Link>

        <nav className="nav-links">
          <Link to="/cars">Cars</Link>
          <Link to="/team">Team</Link>
          <Link to="/events">Events</Link>
          <Link to="/competitions">Competitions</Link>
          <Link to="/sponsors">Sponsors</Link>

          {user && (
            <Link to="/admin" className="nav-contact-link">
              Admin
            </Link>
          )}

          {user ? (
            <button onClick={logout} className="nav-logout">
              Logout
            </button>
          ) : (
            <Link to="/login" style={{ opacity: 0.2, fontSize: 10 }}>
              •
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

// const Footer = () => {
//   return (
//     <footer className="site-footer">
//       <div className="footer-inner-main">
//         {/* Left column: logo + nav */}
//         <div>
//           <img src={iitgLogo} alt="IITG Racing" className="footer-logo-img" />
//           <div className="footer-link-list">
//             <Link to="/">HOME</Link>
//             <Link to="/competitions">COMPETITIONS</Link>
//             <Link to="/sponsors">SPONSORS</Link>
//           </div>
//         </div>

//         {/* Middle: heading + address */}
//         <div>
//           <img
//             src={iitgRacingText}
//             alt="IIT Guwahati Racing"
//             style={{ height: 26, objectFit: 'contain', marginBottom: 10 }}
//           />
//           <div className="footer-address">
//             New SAC<br />
//             Indian Institute of Technology Guwahati<br />
//             Guwahati 781039<br />
//             Assam, India
//           </div>
//         </div>

//         {/* Right links */}
//         <div className="footer-link-list" style={{ textAlign: 'right' }}>
//           <Link to="/cars">CARS</Link>
//           <Link to="/team">TEAM</Link>
//           <Link to="/contact">CONTACT</Link>
//         </div>
//       </div>

//       {/* Social icons row */}
//       <div className="footer-social-row">
//         <a href="https://www.facebook.com/iitg.racing" target="_blank" rel="noreferrer">
//           <img src={fbIcon} alt="Facebook" />
//         </a>
//         <a href="https://www.instagram.com/iitg.racing" target="_blank" rel="noreferrer">
//           <img src={igIcon} alt="Instagram" />
//         </a>
//         <a href="https://www.youtube.com/@iitgracing" target="_blank" rel="noreferrer">
//           <img src={ytIcon} alt="YouTube" />
//         </a>
//         <a href="https://www.linkedin.com/company/iitgracing" target="_blank" rel="noreferrer">
//           <img src={liIcon} alt="LinkedIn" />
//         </a>
//       </div>

//       {/* Partner logos row */}
//       <div className="footer-partner-row">
//         <a href="https://iitg.ac.in/stud/techboard" target="_blank" rel="noreferrer">
//           <img src={techBoardLogo} alt="IITG Tech Board" />
//         </a>
//         <a href="https://www.iitg.ac.in/mecheng/" target="_blank" rel="noreferrer">
//           <img src={mesaLogo} alt="IITG Mechanical" />
//         </a>
//         <a href="https://www.iitg.ac.in" target="_blank" rel="noreferrer">
//           <img src={iitgLogo} alt="IIT Guwahati" />
//         </a>
//       </div>

//       <div className="footer-bottom">
//         Copyright © Since 2012 – IITG RACING WEB-OPS. All rights reserved.
//       </div>

//       <button
//         className="footer-back-top"
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//       >
//         ↑
//       </button>
//     </footer>
//   );
// };
const Footer = () => {
  return (
    <footer className="ibr-footer">
      <div className="ibr-footer-top">
        {/* Left: logo + description */}
        <div className="ibr-footer-col">
          <div className="ibr-footer-logo-row">
            <img src={iitgRacingText} alt="IITG Racing" className="ibr-footer-logo" />
            <span className="ibr-footer-title">IITG RACING</span>
          </div>

          <p className="ibr-footer-text">
            IIT Guwahati&apos;s Formula Student team with a vision to push the
            limits of student motorsport engineering and transition towards
            sustainable electric mobility.
          </p>

          {/* <p className="ibr-footer-tagline">#Racing Up The Ladder</p> */}
        </div>

        {/* Middle: Quick Links */}
        <div className="ibr-footer-col">
          <h4 className="ibr-footer-heading">Quick Links</h4>
          <ul className="ibr-footer-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/cars">Cars</Link></li>
            <li><Link to="/competitions">Competitions</Link></li>
            <li><Link to="/sponsors">Sponsors</Link></li>
            <li><Link to="/events">Events</Link></li>
          </ul>
        </div>

        {/* Right: Connect */}
        <div className="ibr-footer-col">
          <h4 className="ibr-footer-heading">Connect</h4>

          <div className="ibr-footer-social-row">
            <a href="https://www.linkedin.com/company/iitgracing" target="_blank" rel="noreferrer">
              <div className="ibr-footer-social-pill">
                <img src={liIcon} alt="LinkedIn" />
              </div>
            </a>
            <a href="https://www.instagram.com/iitg.racing" target="_blank" rel="noreferrer">
              <div className="ibr-footer-social-pill">
                <img src={igIcon} alt="Instagram" />
              </div>
            </a>
            <a href="https://www.facebook.com/iitg.racing" target="_blank" rel="noreferrer">
              <div className="ibr-footer-social-pill">
                <img src={fbIcon} alt="Facebook" />
              </div>
            </a>
            <a href="https://www.youtube.com/@iitgracing" target="_blank" rel="noreferrer">
              <div className="ibr-footer-social-pill">
                <img src={ytIcon} alt="YouTube" />
              </div>
            </a>
          </div>

          <div className="ibr-footer-contact">
            <div>
              <span className="ibr-footer-contact-label">Email</span>
              <span className="ibr-footer-contact-value">
                tech@iitgracing.com
              </span>
            </div>
            <div>
              <span className="ibr-footer-contact-label">Phone</span>
              <span className="ibr-footer-contact-value">
                +91 9XXXXXXXXX
              </span>
            </div>
            <div>
              <span className="ibr-footer-contact-label">Address</span>
              <span className="ibr-footer-contact-value">
                New SAC, IIT Guwahati, Assam, 781039, India
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Supported by row */}
      <div className="ibr-footer-partners">
        <span className="ibr-footer-partners-label">Supported by</span>
        <div className="ibr-footer-partners-logos">
          <img src={techBoardLogo} alt="Tech Board" />
          <img src={mesaLogo} alt="MESA IITG" />
          <img src={iitgLogo} alt="IIT Guwahati" />
        </div>
      </div>

      <div className="ibr-footer-bottom">
        © {new Date().getFullYear()} IIT Guwahati Racing – Formula Student Team | All Rights Reserved
      </div>
    </footer>
  );
};




const Home = () => {
  const [data, setData] = useState({
    latestCars: [],
    currentTeam: null,
    featuredEvents: [],
    sponsors: [],
    competitions: []
  });
  const [loading, setLoading] = useState(true);
  const [showMediaSide, setShowMediaSide] = useState(false);

  useEffect(() => {
    fetch('https://iitgracing.onrender.com/api/public/home')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Home data error', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const { latestCars, currentTeam, sponsors, competitions } = data;

  return (
    <div className="page-container space-y-16">
      {/* 1. Media hero just under navbar */}
      <section className="media-hero">
  <div className="media-hero-inner">
    {/* Main media fills full width; side panel overlays when open */}
    <div className="media-hero-main">
      <iframe
        title="IITG Racing highlight"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {/* toggle button */}
      <button
        className="media-side-toggle"
        onClick={() => setShowMediaSide(v => !v)}
      >
        {showMediaSide ? 'Close' : 'Upcoming'}
      </button>

      {showMediaSide && (
        <div className="media-hero-side">
          {/* Upcoming event card */}
          <div className="media-pill">
            <div className="media-pill-label">Upcoming</div>
            <div className="media-pill-title">Orientation Session</div>
            <p className="media-pill-text">
              Join us for the next IITG Racing workshop on EVs & motorsport.
            </p>
            <Link to="/events" className="media-pill-link">
              View details →
            </Link>
          </div>

          {/* Instagram card */}
          <div className="media-pill">
            <div className="media-pill-label">Latest</div>
            <div className="media-pill-title">Instagram</div>
            <a
              href="https://www.instagram.com/iitg.racing/"
              target="_blank"
              rel="noreferrer"
              className="media-pill-link"
            >
              View posts →
            </a>
          </div>
        </div>
      )}
    </div>
  </div>
</section>

      {/* 2. Intro text like old IITG page */}
      {/* // 1) Intro section becomes just a small lead text, cars copy moves down */}
<section className="section">
  <h2 className="section-title">Welcome</h2>
  <p className="card-text" style={{ maxWidth: 900 }}>
    The Automobile Club of IIT Guwahati comprises young and hardworking individuals who share a common passion-automobiles. Our love for the latest technologies and innovation in the realm of automobiles drives us to the endeavour to design and fabricate vehicles of our own. We take part in various national competitions like Formula Bharat, SUPRA SAE, SAE NIS EffiCycle. Our love for automobiles drives us to spread this knowledge and help ignite this passion in others. We organize lectures on Automobiles and their various subsystems. We also hold workshops and hackathons to teach and give hands-on experience of different software essential for our field like Solidworks, MATLAB, ANSYS
  </p>
</section>

      {/* // 2) Our Cars – put the long cars text here, above the cards */}
{latestCars.length > 0 && (
  <section className="section">
    <div className="section-header">
      <h2 className="section-title">Our Cars</h2>
      <Link to="/cars" className="section-link">
        View all cars →
      </Link>
    </div>

    <p className="card-text" style={{ maxWidth: 900, marginBottom: 12 }}>
      Take a look at the cars and trikes we have designed and fabricated since
      2010, the year it all started. We have taken these cars to various
      national competitions and won accolades. Till now, all of our cars were
      internal combustion engine cars. The world is changing and shifting
      towards a more sustainable and greener future, and IITG Racing plans to
      move to fully electric powertrains in the coming seasons.
    </p>

    <div className="cards-grid">
      {latestCars.map(car => (
        <div key={car._id} className="card">
          <div className="card-title">{car.name}</div>
          <div className="card-meta">
            {car.year} • {car.type}
          </div>
          <div className="card-text">{car.description}</div>
        </div>
      ))}
    </div>
  </section>
)}


     {/* // 3) Team section – put the team philosophy text here, above the current-team card */}
{currentTeam && (
  <section className="section">
    <div className="section-header">
      <h2 className="section-title">The Team</h2>
      <Link to="/team" className="section-link">
        Meet all teams →
      </Link>
    </div>

    <p className="card-text" style={{ maxWidth: 900, marginBottom: 12 }}>
      Meet the team of hardworking individuals who have made it possible here at
      IITG Racing since 2010: a young, talented and enthusiastic group, always
      ready to learn new concepts and skills whenever an opportunity arises. As
      Henry Ford said, “Coming together is a beginning. Keeping together is
      progress. Working together is success,” and this is the philosophy the
      team has followed from day one.
    </p>

    <div className="card">
      <div className="card-title">
        Team {currentTeam.year} — {currentTeam.name || 'IITG Racing'}
      </div>
      <div className="card-text">
        {currentTeam.description ||
          'A young, enthusiastic team driving IITG Racing forward.'}
      </div>
      <div className="card-meta">
        {currentTeam.members?.length || 0} members across subsystems and core.
      </div>
    </div>
  </section>
)}

      {/* 5. Sponsors strip */}
      {sponsors.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Our Sponsors</h2>
            <Link to="/sponsors" className="section-link">
              View all sponsors →
            </Link>
          </div>

          <div className="sponsor-strip">
            <div className="sponsor-strip__inner">
              {sponsors.concat(sponsors).map((s, idx) => (
                <div key={idx} className="sponsor-strip__item">
                  {s.logo && <img src={s.logo} alt={s.name} />}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Bottom navigation row */}
      {/* <section className="bottom-nav-strip">
        <Link to="/competitions" className="bottom-nav-item">
          Competitions
        </Link>
        <Link to="/events" className="bottom-nav-item">
          News & Events
        </Link>
        <Link to="/team" className="bottom-nav-item">
          Team
        </Link>
        <Link to="/sponsors" className="bottom-nav-item">
          Sponsors
        </Link>
        <a href="#contact" className="bottom-nav-item">
          Contact us
        </a>
      </section> */}
    </div>
  );
};




// Login - Real Backend Connection
// Login - Real Backend Connection
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();   // <-- from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);   // <-- use context
      navigate('/admin');
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="simple-page">
      <h2 className="section-title" style={{ marginBottom: 16 }}>Admin Login</h2>
      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 420 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="email"
            placeholder="admin@iitgracing.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="password123"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
};


// Admin Dashboard - DARK THEME (Copy-paste entire component)
const AdminDashboard = () => {
  const [stats, setStats] = useState({ cars: 0, teams: 0, events: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [carsRes, teamsRes, eventsRes] = await Promise.all([
          axios.get('https://iitgracing.onrender.com/api/public/cars'),
          axios.get('https://iitgracing.onrender.com/api/public/teams'),
          axios.get('https://iitgracing.onrender.com/api/public/events')
        ]);
        setStats({
          cars: carsRes.data.length,
          teams: teamsRes.data.length,
          events: eventsRes.data.length
        });
      } catch (error) {
        // Silent fail - use fallback stats
        setStats({ cars: 11, teams: 4, events: 2 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-8 text-center text-white">Loading dashboard...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      {/* Header */}
      <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-12 text-center">
        Admin Dashboard
      </h1>
      
      {/* Stats Cards - DARK + VISIBLE */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10 rounded-3xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 border border-blue-500/30">
          <h3 className="text-3xl font-bold mb-4 flex items-center">
            <span className="text-2xl mr-3">🏎️</span>Cars
          </h3>
          <p className="text-6xl font-black drop-shadow-lg">{stats.cars}</p>
          <p className="text-blue-200 mt-2 opacity-90">Formula, Efficycle, Baja</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-10 rounded-3xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 border border-green-500/30">
          <h3 className="text-3xl font-bold mb-4 flex items-center">
            <span className="text-2xl mr-3">👥</span>Teams
          </h3>
          <p className="text-6xl font-black drop-shadow-lg">{stats.teams}</p>
          <p className="text-green-200 mt-2 opacity-90">Leadership & Subsystems</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white p-10 rounded-3xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 border border-purple-500/30">
          <h3 className="text-3xl font-bold mb-4 flex items-center">
            <span className="text-2xl mr-3">📅</span>Events
          </h3>
          <p className="text-6xl font-black drop-shadow-lg">{stats.events}</p>
          <p className="text-purple-200 mt-2 opacity-90">Workshops & Competitions</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
        <Link to="/admin/cars" className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-10 rounded-3xl text-center font-black text-2xl shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-2 transition-all duration-300 border-2 border-blue-500/50 hover:border-blue-400">
          <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">🏎️</span>
          <div>Manage Cars</div>
        </Link>
        
        <Link to="/admin/teams" className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-10 rounded-3xl text-center font-black text-2xl shadow-2xl hover:shadow-green-500/50 hover:-translate-y-2 transition-all duration-300 border-2 border-green-500/50 hover:border-green-400">
          <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">👥</span>
          <div>Manage Teams</div>
        </Link>
        
        <Link to="/admin/sponsors" className="group bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white p-10 rounded-3xl text-center font-black text-2xl shadow-2xl hover:shadow-yellow-500/50 hover:-translate-y-2 transition-all duration-300 border-2 border-yellow-500/50 hover:border-yellow-400">
          <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">🤝</span>
          <div>Manage Sponsors</div>
        </Link>
        
        <Link to="/admin/competitions" className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-10 rounded-3xl text-center font-black text-2xl shadow-2xl hover:shadow-red-500/50 hover:-translate-y-2 transition-all duration-300 border-2 border-red-500/50 hover:border-red-400">
          <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">🏁</span>
          <div>Manage Competitions</div>
        </Link>
        
        <Link to="/admin/events" className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-10 rounded-3xl text-center font-black text-2xl shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-2 transition-all duration-300 border-2 border-purple-500/50 hover:border-purple-400">
          <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">📅</span>
          <div>Manage Events</div>
        </Link>
      </div>
    </div>
  );
};


export default App;
