import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for tools (e.g., PDF converter, calculator, etc.)"
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 
                 border border-gray-300 dark:border-gray-700 
                 text-gray-900 dark:text-gray-100 
                 placeholder-gray-500 dark:placeholder-gray-400 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 transition-all duration-300"
      />
    </div>
  );
}