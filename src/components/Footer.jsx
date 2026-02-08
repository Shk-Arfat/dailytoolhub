import { Github, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-16 pt-8 pb-8 border-t border-gray-200 dark:border-blue-800/30 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500 fill-red-500 dark:text-blue-400 dark:fill-blue-400" />
            <span className="text-gray-600 dark:text-gray-400">
              Made by DailyTools Hub
            </span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <Link
              to="/privacy"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </Link>
            <a
              href="https://github.com/yourusername/dailytools-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} DailyTools Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}