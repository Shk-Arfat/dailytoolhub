import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from "../components/Header";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Tools
          </button>
        </Link>

        <div className="bg-white dark:bg-blue-900/10 rounded-2xl p-8 border border-gray-200 dark:border-blue-800/30 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Terms of Service</h1>
              <p className="text-gray-600 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Acceptance of Terms</h2>
              <p>
                By accessing and using DailyTools Hub, you accept and agree to be bound by these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Service Description</h2>
              <p>
                DailyTools Hub provides free, browser-based utility tools for personal and commercial use.
                All tools run client-side - no data is sent to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">User Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use tools for legal purposes only</li>
                <li>Don't attempt to overload or damage our services</li>
                <li>Respect intellectual property rights</li>
                <li>You're responsible for the data you process through our tools</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Disclaimer of Warranty</h2>
              <p>
                All tools are provided "as is" without warranty of any kind. We don't guarantee:
                <br />
                - Tool accuracy or reliability
                <br />
                - Uninterrupted service
                <br />
                - Results for your specific use case
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Limitation of Liability</h2>
              <p>
                DailyTools Hub shall not be liable for any direct, indirect, incidental, or consequential damages
                resulting from the use or inability to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use after changes constitutes
                acceptance of the new terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}