import { useState, useEffect } from 'react';
import { categories, categoryColors, darkCategoryColors } from '../data/toolsData';

export default function CategoryFilter({ activeCategory, onSelectCategory }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDark);
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  const getCategoryColors = (categoryId) => {
    const isAllCategory = categoryId === 'all';
    
    if (isAllCategory) {
      return isDarkMode
        ? { gradient: 'from-blue-600 to-blue-800', light: 'bg-blue-900/20 border-blue-800/30 text-blue-400' }
        : { gradient: 'from-gray-500 to-gray-600', light: 'bg-gray-50 border-gray-200 text-gray-700' };
    }
    
    return isDarkMode 
      ? darkCategoryColors[categoryId] 
      : categoryColors[categoryId];
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center px-4">
      {categories.map((category) => {
        const colors = getCategoryColors(category.id);
        
        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300
              min-w-[140px] flex-1 sm:flex-none font-medium
              ${activeCategory === category.id
                ? `bg-gradient-to-r ${colors.gradient} text-white shadow-lg transform scale-105`
                : `${colors.light} hover:scale-105`
              }
            `}
          >
            <span className="text-lg">{category.emoji}</span>
            <span className="text-sm sm:text-base whitespace-nowrap">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}