// Format file size (bytes to readable format)
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Debounce function for search inputs
export const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// Throttle function for scroll/resize events
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate URL format
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Format date to readable string
export const formatDate = (date, format = 'short') => {
  const d = new Date(date);
  
  if (format === 'short') {
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
  
  if (format === 'long') {
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  return d.toLocaleDateString();
};

// Copy text to clipboard
export const copyToClipboard = async (text) => {
  try {
    // Use the modern Clipboard API
    await navigator.clipboard.writeText(text);
    return { success: true, message: 'Copied to clipboard!' };
  } catch {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return { success: true, message: 'Copied to clipboard!' };
    } catch {
      return { success: false, message: 'Failed to copy text' };
    }
  }
};

// Download file from text/content
export const downloadFile = (content, fileName, type = 'text/plain') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Calculate reading time from text
export const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Get category display name
export const getCategoryDisplayName = (categoryId) => {
  const categoryMap = {
    'file': 'File Tools',
    'converters': 'Converters',
    'calculators': 'Calculators',
    'web': 'Web & Developer',
    'text': 'Text Tools',
    'productivity': 'Productivity',
    'bonus': 'Viral Mini SaaS',
  };
  return categoryMap[categoryId] || 'Tools';
};

// Get category emoji
export const getCategoryEmoji = (categoryId) => {
  const emojiMap = {
    'file': '📁',
    'converters': '💱',
    'calculators': '🔢',
    'web': '🌐',
    'text': '📝',
    'productivity': '🧠',
    'bonus': '💡',
  };
  return emojiMap[categoryId] || '🔧';
};

// Generate random number in range
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate random color
export const getRandomColor = () => {
  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#06B6D4', '#EC4899', '#84CC16', '#F97316', '#6366F1',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Remove duplicates from array
export const removeDuplicates = (array) => {
  return [...new Set(array)];
};

// Sort array of objects by property
export const sortByProperty = (array, property, ascending = true) => {
  return [...array].sort((a, b) => {
    if (a[property] < b[property]) return ascending ? -1 : 1;
    if (a[property] > b[property]) return ascending ? 1 : -1;
    return 0;
  });
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Format number with commas
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Check if value is empty
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Convert text to different cases
export const convertCase = (text, caseType) => {
  switch (caseType) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text.replace(/\w\S*/g, (word) => 
        word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
      );
    case 'sentence':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    default:
      return text;
  }
};

// Slugify text (convert to URL-friendly string)
// export const slugify = (text) => {
//   return text
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, '-')           // Replace spaces with -
//     .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
//     .replace(/\-\-+/g, '-')         // Replace multiple - with single -
//     .replace(/^-+/, '')             // Trim - from start of text
//     .replace(/-+$/, '');            // Trim - from end of text
// };

// Format currency
export const formatCurrency = (amount, currency = 'USD') => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });
  return formatter.format(amount);
};

// Generate initials from name
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Get browser type
export const getBrowserType = () => {
  const userAgent = navigator.userAgent;
  
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Edg')) return 'Edge';
  if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) return 'IE';
  
  return 'Unknown';
};

// Check if device is mobile
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Delay function (promise-based setTimeout)
export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Extract domain from URL
export const extractDomain = (url) => {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace('www.', '');
  } catch {
    return '';
  }
};

// Count words in text
export const countWords = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
};

// Count characters in text
export const countCharacters = (text, includeSpaces = true) => {
  if (!text) return 0;
  return includeSpaces ? text.length : text.replace(/\s/g, '').length;
};

// Generate password strength indicator
export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: 'None' };
  
  let score = 0;
  
  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  
  // Character variety checks
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#059669'];
  
  return {
    score,
    label: labels[Math.min(score, labels.length - 1)],
    color: colors[Math.min(score, colors.length - 1)],
    percentage: (score / 6) * 100
  };
};