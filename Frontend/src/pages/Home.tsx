import { Link } from 'react-router-dom';
import { Landmark, CreditCard, BarChart3, Wallet, Clock, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
            <span className="block">Manage Your Subscriptions</span>
            <span className="block text-blue-600 dark:text-blue-400">With Ease</span>
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
            Take control of your recurring expenses. Track, manage, and optimize your subscriptions in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn btn-primary text-base px-6 py-3">
              Get Started for Free
            </Link>
            <Link to="/login" className="btn btn-outline text-base px-6 py-3">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg my-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Smart Features for Smart Management
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="card transition-all duration-200 hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Track Everything</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Keep all your subscriptions in one place with detailed information about billing cycles and payment amounts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card transition-all duration-200 hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Never Miss a Payment</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get notified before your next billing date so you're always prepared for upcoming charges.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card transition-all duration-200 hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Visualize Spending</h3>
              <p className="text-gray-600 dark:text-gray-400">
                See beautiful charts of your subscription spending by category, month, or service.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card transition-all duration-200 hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <Wallet className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Budget Better</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Understand your recurring expenses and make informed decisions about your subscription services.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card transition-all duration-200 hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <Landmark className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Multi-Currency Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track subscriptions in any currency, perfect for managing services from around the world.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card transition-all duration-200 hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your data is encrypted and secure. We never share your personal information with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl rounded-2xl bg-blue-600 p-8 text-center shadow-xl dark:bg-blue-800">
          <h2 className="mb-4 text-3xl font-bold text-white">Ready to take control?</h2>
          <p className="mb-8 text-lg text-blue-100">
            Join thousands of users who manage their subscriptions smarter with SmartSub.
          </p>
          <Link to="/register" className="btn bg-white text-blue-600 hover:bg-blue-50 px-6 py-3">
            Start Your Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;