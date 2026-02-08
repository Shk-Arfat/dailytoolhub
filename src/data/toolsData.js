// D:\DailyTool\dailytools-hub\src\data\toolsData.js
import {
  FileText, Image, Calculator, Globe, Type, Zap,
  CreditCard, Ruler, Thermometer, Clock, Binary,
  Hash, Palette, Calendar, Scale, Wallet, Percent,
  Code, Lock, QrCode, Layout, Search, List,
  Shuffle, Mic, Volume2, CheckSquare, Target,
  Timer, StickyNote, Key, Link, Dice5, Quote,
  Bookmark, FileCheck, Instagram, Mail, User,
  SpellCheck, Camera, Palette as PaletteIcon,
  Image as ImageIcon, Maximize
} from 'lucide-react';

export const categories = [
  { id: 'all', name: 'All Tools', emoji: '🔧' },
  { id: 'file', name: 'File Tools', emoji: '📁'},
  { id: 'converters', name: 'Converters', emoji: '💱' },
  { id: 'calculators', name: 'Calculators', emoji: '🔢'},
  { id: 'web', name: 'Web & Dev', emoji: '🌐' },
  { id: 'text', name: 'Text Tools', emoji: '📝' },
  { id: 'productivity', name: 'Productivity', emoji: '🧠' },
  { id: 'bonus', name: 'Viral SaaS', emoji: '💡' },
];

export const categoryColors = {
  'file': {
    card: 'card-file',
    iconBg: 'icon-bg-file',
    text: 'text-file',
    gradient: 'from-orange-500 to-amber-500',
    light: 'bg-orange-50 border-orange-200 text-orange-700'
  },
  'converters': {
    card: 'card-converters',
    iconBg: 'icon-bg-converters',
    text: 'text-converters',
    gradient: 'from-emerald-500 to-green-500',
    light: 'bg-emerald-50 border-emerald-200 text-emerald-700'
  },
  'calculators': {
    card: 'card-calculators',
    iconBg: 'icon-bg-calculators',
    text: 'text-calculators',
    gradient: 'from-blue-500 to-cyan-500',
    light: 'bg-blue-50 border-blue-200 text-blue-700'
  },
  'web': {
    card: 'card-web',
    iconBg: 'icon-bg-web',
    text: 'text-web',
    gradient: 'from-violet-500 to-purple-500',
    light: 'bg-violet-50 border-violet-200 text-violet-700'
  },
  'text': {
    card: 'card-text',
    iconBg: 'icon-bg-text',
    text: 'text-text',
    gradient: 'from-rose-500 to-pink-500',
    light: 'bg-rose-50 border-rose-200 text-rose-700'
  },
  'productivity': {
    card: 'card-productivity',
    iconBg: 'icon-bg-productivity',
    text: 'text-productivity',
    gradient: 'from-indigo-500 to-blue-500',
    light: 'bg-indigo-50 border-indigo-200 text-indigo-700'
  },
  'bonus': {
    card: 'card-bonus',
    iconBg: 'icon-bg-bonus',
    text: 'text-bonus',
    gradient: 'from-teal-500 to-emerald-500',
    light: 'bg-teal-50 border-teal-200 text-teal-700'
  }
};

// Dark theme colors (all blue)
export const darkCategoryColors = {
  'file': {
    gradient: 'from-blue-600 to-blue-800',
    light: 'bg-blue-900/20 border-blue-800/30 text-blue-400'
  },
  'converters': {
    gradient: 'from-blue-600 to-blue-800',
    light: 'bg-blue-900/20 border-blue-800/30 text-blue-400'
  },
  'calculators': {
    gradient: 'from-blue-600 to-blue-800',
    light: 'bg-blue-900/20 border-blue-800/30 text-blue-400'
  },
  'web': {
    gradient: 'from-blue-600 to-blue-800',
    light: 'bg-blue-900/20 border-blue-800/30 text-blue-400'
  },
  'text': {
    gradient: 'from-blue-600 to-blue-800',
    light: 'bg-blue-900/20 border-blue-800/30 text-blue-400'
  },
  'productivity': {
    gradient: 'from-blue-600 to-blue-800',
    light: 'bg-blue-900/20 border-blue-800/30 text-blue-400'
  },
  'bonus': {
    gradient: 'from-blue-600 to-blue-800',
    light: 'bg-blue-900/20 border-blue-800/30 text-blue-400'
  }
};


export const tools = [
  // File Tools
  {
    id: 'pdf-to-word',
    name: 'PDF → Word Converter',
    description: 'Convert PDF files to editable Word documents',
    category: 'file',
    icon: FileText,
    route: '/tools/pdf-to-word'
  },
  {
    id: 'word-to-pdf',
    name: 'Word → PDF Converter',
    description: 'Convert Word documents to PDF format',
    category: 'file',
    icon: FileText,
    route: '/tools/word-to-pdf'
  },
  {
    id: 'image-to-pdf',
    name: 'Image → PDF Converter',
    description: 'Convert images to PDF documents',
    category: 'file',
    icon: Image,
    route: '/tools/image-to-pdf'
  },
  {
    id: 'merge-pdf',
    name: 'Merge PDFs',
    description: 'Combine multiple PDF files into one',
    category: 'file',
    icon: FileText,
    route: '/tools/merge-pdf'
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality',
    category: 'file',
    icon: FileText,
    route: '/tools/compress-pdf'
  },
  {
    id: 'remove-bg',
    name: 'Remove Background',
    description: 'Remove background from images automatically',
    category: 'file',
    icon: Image,
    route: '/tools/remove-background'
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Reduce image file size without quality loss',
    category: 'file',
    icon: Image,
    route: '/tools/image-compressor'
  },
  {
    id: 'ocr',
    name: 'OCR Text Extractor',
    description: 'Extract text from images and scanned documents',
    category: 'file',
    icon: Search,
    route: '/tools/ocr'
  },

  // Converters
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between currencies with live rates',
    category: 'converters',
    icon: CreditCard,
    route: '/tools/currency-converter'
  },
  {
    id: 'length-converter',
    name: 'Length Converter',
    description: 'Convert cm, inches, meters, feet, etc.',
    category: 'converters',
    icon: Ruler,
    route: '/tools/length-converter'
  },
  {
    id: 'weight-converter',
    name: 'Weight Converter',
    description: 'Convert kg, lbs, grams, ounces, ton, etc.',
    category: 'converters',
    icon: Scale,
    route: '/tools/weight-converter'
  },
  {
    id: 'temperature-converter',
    name: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin',
    category: 'converters',
    icon: Thermometer,
    route: '/tools/temperature-converter'
  },
  {
    id: 'timezone-converter',
    name: 'Time Zone Converter',
    description: 'Convert time between different time zones',
    category: 'converters',
    icon: Clock,
    route: '/tools/timezone-converter'
  },
  {
    id: 'binary-converter',
    name: 'Binary ↔ Decimal',
    description: 'Convert between binary and decimal numbers',
    category: 'converters',
    icon: Binary,
    route: '/tools/binary-converter'
  },
  {
    id: 'text-case-converter',
    name: 'Text Case Converter',
    description: 'Convert text to UPPER, lower, Title Case, etc.',
    category: 'text',
    icon: Type,
    route: '/tools/text-case-converter'
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert between HEX, RGB, HSL color formats',
    category: 'converters',
    icon: Palette,
    route: '/tools/color-converter'
  },

  // Calculators
  {
    id: 'simple-calculator',
    name: 'Simple Calculator',
    description: 'Basic arithmetic calculator',
    category: 'calculators',
    icon: Calculator,
    route: '/tools/simple-calculator'
  },
  {
    id: 'scientific-calculator',
    name: 'Scientific Calculator',
    description: 'Advanced calculator with scientific functions',
    category: 'calculators',
    icon: Calculator,
    route: '/tools/scientific-calculator'
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate exact age from birth date',
    category: 'calculators',
    icon: Calendar,
    route: '/tools/age-calculator'
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate Body Mass Index',
    category: 'calculators',
    icon: Scale,
    route: '/tools/bmi-calculator'
  },
  {
    id: 'emi-calculator',
    name: 'EMI Calculator',
    description: 'Calculate loan EMI and interest',
    category: 'calculators',
    icon: Calculator,
    route: '/tools/emi-calculator'
  },
  {
    id: 'gst-calculator',
    name: 'GST Calculator',
    description: 'Calculate GST for Indian businesses',
    category: 'calculators',
    icon: Percent,
    route: '/tools/gst-calculator'
  },
  {
    id: 'discount-calculator',
    name: 'Discount Calculator',
    description: 'Calculate discounts and final prices',
    category: 'calculators',
    icon: Percent,
    route: '/tools/discount-calculator'
  },
  {
    id: 'tip-calculator',
    name: 'Tip Calculator',
    description: 'Calculate tips for restaurants',
    category: 'calculators',
    icon: Percent,
    route: '/tools/tip-calculator'
  },
  {
    id: 'salary-calculator',
    name: 'Salary Calculator',
    description: 'Calculate in-hand salary after deductions',
    category: 'calculators',
    icon: Wallet,
    route: '/tools/salary-calculator'
  },

  // Web & Developer Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON data',
    category: 'web',
    icon: Code,
    route: '/tools/json-formatter'
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings',
    category: 'web',
    icon: Hash,
    route: '/tools/base64-encoder'
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure random passwords',
    category: 'web',
    icon: Lock,
    route: '/tools/password-generator'
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate unique UUIDs',
    category: 'web',
    icon: Key,
    route: '/tools/uuid-generator'
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for URLs and text',
    category: 'web',
    icon: QrCode,
    route: '/tools/qr-generator'
  },
  {
    id: 'html-to-markdown',
    name: 'HTML → Markdown',
    description: 'Convert HTML to Markdown format',
    category: 'web',
    icon: Layout,
    route: '/tools/html-to-markdown'
  },

  // Text Tools
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words and characters in text',
    category: 'text',
    icon: Type,
    route: '/tools/word-counter'
  },
  {
    id: 'remove-duplicates',
    name: 'Remove Duplicate Lines',
    description: 'Remove duplicate lines from text',
    category: 'text',
    icon: List,
    route: '/tools/remove-duplicates'
  },
  {
    id: 'text-sorter',
    name: 'Text Sorter',
    description: 'Sort text lines alphabetically',
    category: 'text',
    icon: Shuffle,
    route: '/tools/text-sorter'
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text',
    category: 'text',
    icon: Type,
    route: '/tools/lorem-ipsum'
  },
  {
    id: 'speech-to-text',
    name: 'Speech to Text',
    description: 'Convert speech to text in real-time',
    category: 'text',
    icon: Mic,
    route: '/tools/speech-to-text'
  },
  {
    id: 'text-to-speech',
    name: 'Text to Speech',
    description: 'Convert text to natural speech',
    category: 'text',
    icon: Volume2,
    route: '/tools/text-to-speech'
  },

  // Productivity Tools
  {
    id: 'todo-list',
    name: 'To-Do List',
    description: 'Simple task manager with cloud sync',
    category: 'productivity',
    icon: CheckSquare,
    route: '/tools/todo-list'
  },
  {
    id: 'habit-tracker',
    name: 'Habit Tracker',
    description: 'Track and build new habits',
    category: 'productivity',
    icon: Target,
    route: '/tools/habit-tracker'
  },
  {
    id: 'pomodoro-timer',
    name: 'Pomodoro Timer',
    description: 'Focus timer with work/break intervals',
    category: 'productivity',
    icon: Timer,
    route: '/tools/pomodoro-timer'
  },
  {
    id: 'notes-app',
    name: 'Notes App',
    description: 'Mini Notion-like note taking',
    category: 'productivity',
    icon: StickyNote,
    route: '/tools/notes-app'
  },
  {
    id: 'password-vault',
    name: 'Password Vault',
    description: 'Securely store and manage passwords',
    category: 'productivity',
    icon: Key,
    route: '/tools/password-vault'
  },
  {
    id: 'random-number',
    name: 'Random Number Generator',
    description: 'Generate random numbers within range',
    category: 'productivity',
    icon: Dice5,
    route: '/tools/random-number'
  },

  // Bonus Tools
  {
    id: 'resume-checker',
    name: 'Resume ATS Checker',
    description: 'Check resume for ATS compatibility',
    category: 'bonus',
    icon: FileCheck,
    route: '/tools/resume-checker'
  },
  {
    id: 'instagram-caption',
    name: 'Instagram Caption Generator',
    description: 'Generate creative Instagram captions',
    category: 'bonus',
    icon: Instagram,
    route: '/tools/instagram-caption'
  },
  {
    id: 'email-subject',
    name: 'Email Subject Line Generator',
    description: 'Generate engaging email subject lines',
    category: 'bonus',
    icon: Mail,
    route: '/tools/email-subject'
  },
  {
    id: 'color-palette',
    name: 'Color Palette Generator',
    description: 'Generate beautiful color palettes',
    category: 'bonus',
    icon: PaletteIcon,
    route: '/tools/color-palette'
  },
  {
    id: 'favicon-generator',
    name: 'Favicon Generator',
    description: 'Generate favicons for websites',
    category: 'bonus',
    icon: ImageIcon,
    route: '/tools/favicon-generator'
  },
  {
    id: 'screenshot-pdf',
    name: 'Screenshot → PDF',
    description: 'Convert screenshots to PDF documents',
    category: 'bonus',
    icon: Maximize,
    route: '/tools/screenshot-pdf'
  },
];