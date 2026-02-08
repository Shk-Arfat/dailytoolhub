import { useState } from 'react';
import Header from '../../components/Header';
import { ArrowLeft, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const weightUnits = {
  Kilogram: 1,
  Gram: 1000,
  Milligram: 1000000,
  Pound: 2.20462,
  Ounce: 35.274,
  Ton: 0.001,
  carat: 5000,
};


const WeightConverter = () => {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState("Gram");
  const [to, setTo] = useState("Kilogram");

  const convert = () => (value / weightUnits[from]) * weightUnits[to];

  const examples = [1,5,10,50,100,500,1000];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Link to="/">
          <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
            <ArrowLeft /> Back to Tools
          </button>
        </Link>

        <div className="max-w-3xl mx-auto">

          {/* Converter Box */}
          <div className="bg-white dark:bg-blue-900/20 p-8 rounded-2xl border shadow-sm">
            <h1 className="text-3xl font-bold text-center mb-6 dark:text-gray-200">
              Weight Converter
            </h1>

            <input
              type="number"
              value={value}
              onChange={(e)=>setValue(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border mb-4 dark:bg-gray-800"
            />

            <div className="grid grid-cols-2 gap-4">
              <select value={from} onChange={e=>setFrom(e.target.value)} className="p-3 rounded-lg border dark:bg-gray-800">
                {Object.keys(weightUnits).map(u=><option key={u}>{u}</option>)}
              </select>

              <select value={to} onChange={e=>setTo(e.target.value)} className="p-3 rounded-lg border dark:bg-gray-800">
                {Object.keys(weightUnits).map(u=><option key={u}>{u}</option>)}
              </select>
            </div>

            <button
              onClick={()=>{ const temp=from; setFrom(to); setTo(temp); }}
              className="mx-auto my-4 flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 text-white"
            >
              <ArrowUpDown/> Swap
            </button>

            <h2 className="text-3xl text-center font-bold text-blue-600 dark:text-blue-400">
              {convert().toFixed(4)} {to}
            </h2>
          </div>

          {/* Quick Conversion Table */}
          <div className="mt-12 bg-white dark:bg-blue-900/20 p-6 rounded-2xl border">
            <h2 className="text-xl font-bold mb-6 dark:text-gray-200">
              Convert {from} to {to}
            </h2>

            {examples.map(v=>(
              <div key={v} className="flex justify-between py-4 border-b">
                <span>{v} {from}</span>
                <span>{((v/weightUnits[from])*weightUnits[to]).toFixed(4)} {to}</span>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-12 text-gray-600 dark:text-gray-300 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Weight Conversion Guide
            </h2>
            <p>
              Weight conversion allows you to convert between metric and imperial
              units such as kg, pounds, ounces, tons etc.
              This tool is useful for cooking, fitness, shipping and education.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default WeightConverter;
