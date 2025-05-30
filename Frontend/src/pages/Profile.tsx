import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center">
        <p>You are not logged in. Please log in to view your profile.</p>
      </div>
    );
  }

  const userInitial = user.name.charAt(0).toUpperCase();

  return (
    <div className="animate-fade-in mx-auto max-w-2xl">
      <h1 className="mb-8 text-center">User Profile</h1>

      <div className="card">
        <div className="flex flex-col items-center sm:flex-row sm:items-start">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 sm:mb-0 sm:mr-6">
            <span className="text-4xl font-bold">{userInitial}</span>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            <div className="mt-6 flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <button
                className="btn btn-outline"
                onClick={() => alert('Feature coming soon!')}
              >
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </button>
              <button className="btn btn-danger" onClick={logout}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <div className="card">
          <h3 className="mb-4 text-xl font-semibold">Account Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">User ID</p>
              <p>{user._id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Created</p>
              <p>Information not available</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="mb-4 text-xl font-semibold">Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive notifications about upcoming bills
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" value="" className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;