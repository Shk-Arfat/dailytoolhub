// Tool categories for filtering
export const CATEGORY_MAP = {
  'file': 'File Tools',
  'converters': 'Converters',
  'calculators': 'Calculators',
  'web': 'Web & Developer Tools',
  'text': 'Text Tools',
  'productivity': 'Productivity Tools',
  'bonus': 'Viral Mini SaaS',
};

// Currency symbols for converter
export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  INR: '₹',
  CAD: 'C$',
  AUD: 'A$',
  CNY: '¥',
  CHF: 'CHF',
  SGD: 'S$',
  HKD: 'HK$',
  KRW: '₩',
  RUB: '₽',
  BRL: 'R$',
  ZAR: 'R',
  MXN: '$',
};

// Measurement units for converters
export const LENGTH_UNITS = [
  { value: 'mm', label: 'Millimeter', symbol: 'mm' },
  { value: 'cm', label: 'Centimeter', symbol: 'cm' },
  { value: 'm', label: 'Meter', symbol: 'm' },
  { value: 'km', label: 'Kilometer', symbol: 'km' },
  { value: 'inch', label: 'Inch', symbol: 'in' },
  { value: 'foot', label: 'Foot', symbol: 'ft' },
  { value: 'yard', label: 'Yard', symbol: 'yd' },
  { value: 'mile', label: 'Mile', symbol: 'mi' },
];

export const WEIGHT_UNITS = [
  { value: 'mg', label: 'Milligram', symbol: 'mg' },
  { value: 'g', label: 'Gram', symbol: 'g' },
  { value: 'kg', label: 'Kilogram', symbol: 'kg' },
  { value: 'ton', label: 'Ton', symbol: 't' },
  { value: 'ounce', label: 'Ounce', symbol: 'oz' },
  { value: 'pound', label: 'Pound', symbol: 'lb' },
  { value: 'stone', label: 'Stone', symbol: 'st' },
];

export const TEMPERATURE_UNITS = [
  { value: 'C', label: 'Celsius', symbol: '°C' },
  { value: 'F', label: 'Fahrenheit', symbol: '°F' },
  { value: 'K', label: 'Kelvin', symbol: 'K' },
];

export const TIME_UNITS = [
  { value: 'second', label: 'Second', symbol: 's' },
  { value: 'minute', label: 'Minute', symbol: 'min' },
  { value: 'hour', label: 'Hour', symbol: 'hr' },
  { value: 'day', label: 'Day', symbol: 'd' },
  { value: 'week', label: 'Week', symbol: 'wk' },
  { value: 'month', label: 'Month', symbol: 'mo' },
  { value: 'year', label: 'Year', symbol: 'yr' },
];

// File size limits (in bytes)
export const FILE_LIMITS = {
  MAX_UPLOAD_SIZE: 100 * 1024 * 1024, // 100MB
  MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_PDF_SIZE: 50 * 1024 * 1024, // 50MB
  MAX_TEXT_SIZE: 5 * 1024 * 1024, // 5MB for text tools
};

// Color palettes for color generator tool
export const COLOR_PALETTES = {
  DEFAULT: [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Yellow', value: '#F59E0B' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Cyan', value: '#06B6D4' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Lime', value: '#84CC16' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Indigo', value: '#6366F1' },
  ],
  PASTEL: [
    { name: 'Pastel Blue', value: '#93C5FD' },
    { name: 'Pastel Green', value: '#86EFAC' },
    { name: 'Pastel Yellow', value: '#FDE68A' },
    { name: 'Pastel Red', value: '#FCA5A5' },
    { name: 'Pastel Purple', value: '#C4B5FD' },
    { name: 'Pastel Cyan', value: '#67E8F9' },
    { name: 'Pastel Pink', value: '#F9A8D4' },
    { name: 'Pastel Lime', value: '#BBF7D0' },
    { name: 'Pastel Orange', value: '#FDBA74' },
    { name: 'Pastel Indigo', value: '#A5B4FC' },
  ],
  DARK: [
    { name: 'Dark Blue', value: '#1E40AF' },
    { name: 'Dark Green', value: '#065F46' },
    { name: 'Dark Yellow', value: '#92400E' },
    { name: 'Dark Red', value: '#991B1B' },
    { name: 'Dark Purple', value: '#5B21B6' },
    { name: 'Dark Cyan', value: '#0E7490' },
    { name: 'Dark Pink', value: '#BE185D' },
    { name: 'Dark Lime', value: '#15803D' },
    { name: 'Dark Orange', value: '#C2410C' },
    { name: 'Dark Indigo', value: '#3730A3' },
  ],
  MONOCHROME: [
    { name: 'Black', value: '#000000' },
    { name: 'Gray 900', value: '#111827' },
    { name: 'Gray 700', value: '#374151' },
    { name: 'Gray 500', value: '#6B7280' },
    { name: 'Gray 300', value: '#D1D5DB' },
    { name: 'Gray 100', value: '#F3F4F6' },
    { name: 'White', value: '#FFFFFF' },
  ],
};

// Time zones for time zone converter
export const TIME_ZONES = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'GMT', label: 'GMT (Greenwich Mean Time)' },
  { value: 'EST', label: 'EST (Eastern Standard Time)' },
  { value: 'CST', label: 'CST (Central Standard Time)' },
  { value: 'MST', label: 'MST (Mountain Standard Time)' },
  { value: 'PST', label: 'PST (Pacific Standard Time)' },
  { value: 'IST', label: 'IST (India Standard Time)' },
  { value: 'CET', label: 'CET (Central European Time)' },
  { value: 'EET', label: 'EET (Eastern European Time)' },
  { value: 'AEST', label: 'AEST (Australian Eastern Time)' },
  { value: 'JST', label: 'JST (Japan Standard Time)' },
  { value: 'CST_CHINA', label: 'CST (China Standard Time)' },
];

// Social media links (update with your actual links)
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com',
  TWITTER: 'https://twitter.com',
  LINKEDIN: 'https://linkedin.com',
  EMAIL: 'mailto:hello@dailytoolshub.com',
  PORTFOLIO: 'https://yourportfolio.com',
};

// SEO meta data
export const SEO_META = {
  TITLE: 'DailyTools Hub - All Everyday Tools in One Place',
  DESCRIPTION: 'Free, fast, and easy-to-use tools for developers, students, and professionals. No login required!',
  KEYWORDS: 'tools, utilities, converters, calculators, pdf tools, image tools, text tools, free tools, online tools, productivity tools',
  AUTHOR: 'DailyTools Hub',
  SITE_NAME: 'DailyTools Hub',
  SITE_URL: 'https://dailytoolshub.com',
  TWITTER_HANDLE: '@dailytoolshub',
};

// Tool-specific constants
export const TOOL_CONSTANTS = {
  // Password generator
  PASSWORD_LENGTH: {
    MIN: 6,
    MAX: 32,
    DEFAULT: 12,
  },
  PASSWORD_CHARSETS: {
    UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
    NUMBERS: '0123456789',
    SYMBOLS: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  },
  
  // QR Code generator
  QR_CODE_SIZE: {
    MIN: 100,
    MAX: 1000,
    DEFAULT: 300,
  },
  
  // Text tools
  TEXT_CASE_OPTIONS: [
    { value: 'lower', label: 'lowercase' },
    { value: 'upper', label: 'UPPERCASE' },
    { value: 'title', label: 'Title Case' },
    { value: 'sentence', label: 'Sentence case' },
    { value: 'camel', label: 'camelCase' },
    { value: 'pascal', label: 'PascalCase' },
    { value: 'snake', label: 'snake_case' },
    { value: 'kebab', label: 'kebab-case' },
  ],
  
  // Lorem Ipsum generator
  LOREM_IPSUM_TYPES: [
    { value: 'paragraphs', label: 'Paragraphs' },
    { value: 'sentences', label: 'Sentences' },
    { value: 'words', label: 'Words' },
  ],
  
  // Color formats
  COLOR_FORMATS: [
    { value: 'hex', label: 'HEX', regex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/ },
    { value: 'rgb', label: 'RGB', regex: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/ },
    { value: 'rgba', label: 'RGBA', regex: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/ },
    { value: 'hsl', label: 'HSL', regex: /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/ },
    { value: 'hsla', label: 'HSLA', regex: /^hsla\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(0|1|0?\.\d+)\)$/ },
  ],
  
  // Roman numerals
  ROMAN_NUMERALS: {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  },
  
  // BMI categories
  BMI_CATEGORIES: [
    { range: [0, 18.5], label: 'Underweight', color: '#3B82F6' },
    { range: [18.5, 25], label: 'Normal weight', color: '#10B981' },
    { range: [25, 30], label: 'Overweight', color: '#F59E0B' },
    { range: [30, 35], label: 'Obesity Class I', color: '#EF4444' },
    { range: [35, 40], label: 'Obesity Class II', color: '#DC2626' },
    { range: [40, Infinity], label: 'Obesity Class III', color: '#991B1B' },
  ],
};

// Default tool settings
export const DEFAULT_SETTINGS = {
  THEME: 'light',
  LANGUAGE: 'en',
  TOOLS_PER_PAGE: 12,
  RECENT_TOOLS_LIMIT: 5,
  ANIMATIONS_ENABLED: true,
  SOUND_EFFECTS_ENABLED: false,
};

// App information
export const APP_INFO = {
  NAME: 'DailyTools Hub',
  VERSION: '1.0.0',
  AUTHOR: 'Your Name',
  YEAR: new Date().getFullYear(),
  LICENSE: 'MIT',
  REPOSITORY: 'https://github.com/yourusername/dailytools-hub',
};

// Empty arrays/objects for future API integration
export const API_CONFIG = {
  // Empty - no backend required
  IS_BACKEND_ENABLED: false,
  // These would be used if you add a backend later
  ENDPOINTS: {},
  HEADERS: {},
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'dailytools-theme',
  RECENT_TOOLS: 'dailytools-recent',
  FAVORITES: 'dailytools-favorites',
  SETTINGS: 'dailytools-settings',
};