import { useParams } from 'react-router-dom';
import { tools } from '../data/toolsData';

// Import all actual tool components
//web
import QrGenerator from '../tools/web/QrGenerator';
import PasswordGenerator from '../tools/web/PasswordGenerator';
import JsonFormatter from '../tools/web/JsonFormatter';
import Base64Encoder from '../tools/web/Base64Encoder';
import UuidGenerator from '../tools/web/UuidGenerator';
import HtmlToMarkdown from '../tools/web/HtmlToMarkdown';
//file
import MergePdf from '../tools/file/MergePdf';
import ImageToPdf from '../tools/file/ImageToPdf';
import ImageCompressor from '../tools/file/ImageCompressor';
//calculators
import AgeCalculator from '../tools/calculators/AgeCalculator';
import BMICalculator from '../tools/calculators/BMICalculator';
import EMICalculator from '../tools/calculators/EMICalculator';
import GSTCalculator from '../tools/calculators/GSTCalculator';
import DiscountCalculator from '../tools/calculators/DiscountCalculator';
import TipCalculator from '../tools/calculators/TipCalculator';
import SalaryCalculator from '../tools/calculators/SalaryCalculator';
import SimpleCalculator from '../tools/calculators/SimpleCalculator';
import ScientificCalculator from '../tools/calculators/ScientificCalculator';
//text
import TextCaseConverter from '../tools/text/TextCaseConverter';
import WordCounter from '../tools/text/WordCounter';
import TextSorter from '../tools/text/TextSorter';
import RemoveDuplicates from '../tools/text/RemoveDuplicates';
import LoremIpsum from '../tools/text/LoremIpsum';
import SpeechToText from '../tools/text/SpeechToText';
import TextToSpeech from '../tools/text/TextToSpeech';
import TypingTest from '../tools/text/TypingTest';

//converters
import BinaryConverter from '../tools/converters/BinaryConverter';
import ColorConverter from '../tools/converters/ColorConverter';
import TimezoneConverter from '../tools/converters/TimezoneConverter';
import TemperatureConverter from '../tools/converters/TemperatureConverter';
import WeightConverter from '../tools/converters/WeightCnverter';
import LengthConverter from '../tools/converters/LengthConverter';
import CurrencyConverter from '../tools/converters/CurrencyConverter';
import GenericToolPage from '../pages/ToolPage';
//bonus
import ColorPalette from '../tools/bonus/ColorPalette';
import FaviconGenerator from '../tools/bonus/FaviconGenerator';
// productivity
import PomodoroTimer from '../tools/productivity/PomodoroTimer';
import RandomNumber from '../tools/productivity/RandomNumber';

const toolComponents = {
  // Add more as you create them
  // web
  'qr-generator':QrGenerator,
  'password-generator':PasswordGenerator,
  'json-formatter':JsonFormatter,
  'base64-encoder':Base64Encoder,
  'uuid-generator':UuidGenerator,
  'html-to-markdown':HtmlToMarkdown,
  //file
  'merge-pdf': MergePdf,
  'image-to-pdf': ImageToPdf,
  'image-compressor': ImageCompressor,
  // 'pdf-to-word': PdfToWordConverter,
  //converters
  'currency-converter': CurrencyConverter,
  'binary-converter': BinaryConverter,
  'color-converter': ColorConverter,
  'timezone-converter': TimezoneConverter,
  'temperature-converter': TemperatureConverter,
  'length-converter': LengthConverter,
  'weight-converter': WeightConverter,
    //text
  'text-case-converter': TextCaseConverter,
  'lorem-ipsum':LoremIpsum,
  'remove-duplicates':RemoveDuplicates,
  'speech-to-text':SpeechToText,
  'text-to-speech':TextToSpeech,
  'text-sorter':TextSorter,
  'typing-test':TypingTest,
  'word-counter':WordCounter,
  //calculators
  'age-calculator': AgeCalculator,
  'bmi-calculator': BMICalculator,
  'emi-calculator': EMICalculator,
  'gst-calculator': GSTCalculator,
  'discount-calculator': DiscountCalculator,
  'tip-calculator': TipCalculator,
  'salary-calculator': SalaryCalculator,
  'simple-calculator': SimpleCalculator,
  'scientific-calculator': ScientificCalculator,
  //productivity
  'pomodoro-timer':PomodoroTimer,
  'random-number':RandomNumber,
  //bonus
  'color-palette':ColorPalette,
  'favicon-generator':FaviconGenerator,
};

export default function ToolLoader() {
  const { toolName } = useParams();
  const tool = tools.find(t => t.route === `/tools/${toolName}`);
  
  // Check if we have a specific component for this tool
  const ToolComponent = toolComponents[toolName];
  
  if (ToolComponent) {
    // Render the actual tool component
    return <ToolComponent />;
  }
  
  // If no specific component, show the generic ToolPage
  return <GenericToolPage />;
}