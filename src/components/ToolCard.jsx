// D:\DailyTool\dailytools-hub\src\components\ToolCard.jsx
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categoryColors } from '../data/toolsData';

export default function ToolCard({ tool }) {
  const Icon = tool.icon;
  const colors = categoryColors[tool.category];
  console.log('ToolCard route:', tool.route);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link to={tool.route}
      onClick={()=> console.log('Navigating to:',tool.route)}>
        <div className={`
          tool-card 
          bg-white dark:bg-blue-900/20 
          border border-gray-200 dark:border-blue-800/30
          rounded-xl p-6 
          hover:shadow-lg transition-all duration-300 h-full
        `}>
          <div className="flex items-start gap-4 mb-4">
            <div className={`
              p-3 rounded-xl 
              ${colors.iconBg} 
              dark:bg-blue-800/50
            `}>
              <Icon className={`
                w-6 h-6 
                ${colors.text} 
                dark:text-blue-400
              `} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 line-clamp-2">
                {tool.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                {tool.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-blue-800/30">
            <span className={`
              text-xs font-medium uppercase px-2 py-1 rounded-full 
              ${colors.text} 
              dark:text-blue-400
              bg-white/50 dark:bg-blue-900/30
            `}>
              {tool.category === 'file' ? '📁 File' : 
               tool.category === 'converters' ? '💱 Convert' :
               tool.category === 'calculators' ? '🔢 Calculate' :
               tool.category === 'web' ? '🌐 Web' :
               tool.category === 'text' ? '📝 Text' :
               tool.category === 'productivity' ? '🧠 Productivity' : '💡 SaaS'}
            </span>
            <div className={`
              flex items-center font-medium text-sm 
              ${colors.text} 
              dark:text-blue-400
            `}>
              <span>Open</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}