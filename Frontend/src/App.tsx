import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Register from './pages/Register';
import SubscriptionForm from './pages/SubscriptionForm';

function App() {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: theme === 'dark' ? '#374151' : '#ffffff',
              color: theme === 'dark' ? '#f9fafb' : '#1f2937',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />} />
            <Route path="login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="subscriptions/new" element={<SubscriptionForm />} />
              <Route path="subscriptions/:id" element={<SubscriptionForm />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;