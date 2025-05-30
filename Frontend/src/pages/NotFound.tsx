import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="animate-fade-in flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="mb-2 text-9xl font-bold text-gray-300 dark:text-gray-700">404</h1>
      <h2 className="mb-6 text-3xl font-semibold">Page Not Found</h2>
      <p className="mb-8 max-w-md text-gray-600 dark:text-gray-400">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary">
        <Home className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;