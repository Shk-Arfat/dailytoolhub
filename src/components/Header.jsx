import { FileText, Settings, Brush, Globe } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-blue-800/30 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* 4 Boxes Logo */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                {/* Top-left: Document Icon */}
                <div className="w-6 h-6 bg-red-500 dark:bg-red-500 rounded flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white dark:text-white" />
                </div>
                {/* Top-right: Settings Icon */}
                <div className="w-6 h-6 bg-green-500 dark:bg-green-500 rounded flex items-center justify-center">
                  <Settings className="w-4 h-4 text-white dark:text-white" />
                </div>
              </div>
              <div className="flex gap-1">
                {/* Bottom-left: Brush Icon */}
                <div className="w-6 h-6 bg-orange-500 dark:bg-orange-500 rounded flex items-center justify-center">
                  <Brush className="w-4 h-4 text-white dark:text-white" />
                </div>
                {/* Bottom-right: Globe Icon */}
                <div className="w-6 h-6 bg-blue-500 dark:bg-blue-500 rounded flex items-center justify-center">
                  <Globe className="w-4 h-4 text-white dark:text-white" />
                </div>
              </div>
            </div>
            
            {/* Brand Name */}
            <div>
              <h1 className="text-2xl font-bold">
                <span className="text-blue-600 dark:text-blue-400">Daily</span>
                <span className="text-blue-600 dark:text-blue-400">Tools</span>
                <span className="text-green-600 dark:text-orange-400"> Hub</span>
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All everyday tools in one place
              </p>
            </div>
          </div>
          
          {/* Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}