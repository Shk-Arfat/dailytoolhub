import { ArrowLeft, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/">
          <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Tools
          </button>
        </Link>

        <div className="bg-white dark:bg-blue-900/10 rounded-2xl p-8 border border-gray-200 dark:border-blue-800/30 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Shield className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Privacy Policy</h1>
              <p className="text-gray-600 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Your Privacy Matters</h2>
              <p>
                DailyTools Hub is committed to protecting your privacy. Since we don't require logins or authentication,
                we collect minimal data to provide our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Information We Don't Collect</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Personal identification information (name, email, address)</li>
                <li>Login credentials</li>
                <li>Payment information</li>
                <li>Any data you process through our tools (it stays in your browser)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Cookies & Analytics</h2>
              <p>
                We use minimal cookies for basic functionality. We don't use tracking cookies for advertising.
                Any analytics we collect are anonymous and aggregated.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Third-Party Services</h2>
              <p>
                Since we're a client-side only application, your data never leaves your browser.
                All processing happens locally on your device.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, you can reach us via:
                <br />
                Email: privacy@dailytoolshub.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}