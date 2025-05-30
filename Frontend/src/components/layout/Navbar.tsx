import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, ClipboardList, Home, Settings, Lock } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ClipboardList className="h-6 w-6" />
              <span className="text-xl font-bold">SubsManager</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/" 
                  className="flex items-center text-sm px-3 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200"
                >
                  <Home className="h-4 w-4 mr-1" />
                  <span>Dashboard</span>
                </Link>
                
                <Link 
                  to="/create-subscription" 
                  className="flex items-center text-sm px-3 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  <span>Create Subscription</span>
                </Link>
                
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="flex items-center text-sm px-3 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200"
                  >
                    <Lock className="h-4 w-4 mr-1" />
                    <span>Admin</span>
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-sm px-3 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="flex items-center text-sm px-3 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200"
                >
                  <User className="h-4 w-4 mr-1" />
                  <span>Login</span>
                </Link>
                
                <Link 
                  to="/register" 
                  className="flex items-center text-sm px-4 py-2 bg-white text-blue-700 rounded-md hover:bg-gray-100 transition-colors duration-200"
                >
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;