import { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ToolCard from '../components/ToolCard';
import { tools, categories } from '../data/toolsData';
import { motion } from 'framer-motion';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const activeCategoryName = activeCategory === 'all' 
    ? 'All Categories' 
    : categories.find(c => c.id === activeCategory)?.name;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100"
          >
            Essential Tools for Everyday Tasks
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto"
          >
            Free, fast, and easy-to-use tools for developers, students, and professionals
          </motion.p>
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Category Filter */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-max px-2">
              <CategoryFilter
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            </div>
          </div>
        </motion.div>

        {/* Tools Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {filteredTools.length} Tools Available
              </h3>
              <span className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                {activeCategoryName}
              </span>
            </div>
            {searchQuery && (
              <p className="text-gray-600 dark:text-gray-400">
                Search results for "<span className="font-semibold text-blue-600 dark:text-blue-400">{searchQuery}</span>"
              </p>
            )}
          </div>
        </motion.div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white dark:bg-blue-900/10 rounded-2xl border border-gray-200 dark:border-blue-800/30"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              No tools found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try a different search term or category
            </p>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 bg-white dark:bg-blue-900/10 rounded-2xl p-8 border border-gray-200 dark:border-blue-800/30"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            Why Choose DailyTools Hub?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {tools.length}+
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium mt-2">Tools</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Comprehensive collection</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                100% Free
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium mt-2">No Cost</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">No hidden charges</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                24/7
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium mt-2">Available</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Always online</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                No Login
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium mt-2">Instant Access</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Start immediately</p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}