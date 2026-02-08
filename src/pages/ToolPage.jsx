// D:\DailyTool\dailytools-hub\src\pages\ToolPage.jsx
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import { tools } from '../data/toolsData';
import { motion } from 'framer-motion';

export default function ToolPage() {
  const { toolName } = useParams();
  const tool = tools.find(t => t.route === `/tools/${toolName}`);

  if (!tool) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = tool.icon;

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Tools
          </motion.button>
        </Link>

        {/* Tool Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
              <Icon className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                {tool.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {tool.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tool Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-8"
        >
          <div className="text-center py-12">
            <Construction className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Tool Coming Soon!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              This tool is currently under development. We're working hard to bring you 
              the best experience. Check back soon!
            </p>
            
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium">
              <Construction className="w-5 h-5" />
              In Development
            </div>
          </div>

          {/* Placeholder for Future Implementation */}
          <div className="mt-8 p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              What to expect:
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Simple and intuitive interface
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Fast processing with real-time results
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                No data storage - your privacy matters
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Mobile-friendly responsive design
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Related Tools */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            You might also like:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools
              .filter(t => t.category === tool.category && t.id !== tool.id)
              .slice(0, 3)
              .map(relatedTool => {
                const RelatedIcon = relatedTool.icon;
                return (
                  <Link
                    key={relatedTool.id}
                    to={relatedTool.route}
                    className="glass-card rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <RelatedIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                          {relatedTool.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {relatedTool.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}