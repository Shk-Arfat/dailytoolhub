import { useParams } from 'react-router-dom';
import { tools } from '../data/toolsData';

// Import all actual tool components
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
//converters
import BinaryConverter from '../tools/converters/BinaryConverter';
import ColorConverter from '../tools/converters/ColorConverter';
import TimezoneConverter from '../tools/converters/TimezoneConverter';
import TemperatureConverter from '../tools/converters/TemperatureConverter';
import WeightConverter from '../tools/converters/WeightCnverter';
import LengthConverter from '../tools/converters/LengthConverter';
import CurrencyConverter from '../tools/converters/CurrencyConverter';
import GenericToolPage from '../pages/ToolPage';

const toolComponents = {
    // Add more as you create them
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