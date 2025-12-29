import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              IITG Racing
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`py-2 px-3 ${location.pathname === '/' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-700 hover:text-gray-900'}`}>
              Home
            </Link>
            {user && (
              <>
                <Link to="/admin/cars" className={`py-2 px-3 ${location.pathname === '/admin/cars' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-700 hover:text-gray-900'}`}>
                  Admin
                </Link>
              </>
            )}
            {user ? (
              <button onClick={logout} className="text-gray-700 hover:text-gray-900">
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-gray-900">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
