import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { tools, categories } from '../data/toolsData';
import ToolCard from '../components/ToolCard';
import { motion } from 'framer-motion';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const category = categories.find(c => c.id === categoryId);
  const categoryTools = tools.filter(t => t.category === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = category.icon;

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
            Back to All Tools
          </motion.button>
        </Link>

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center gap-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
              <Icon className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                {category.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {categoryTools.length} tools available
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}