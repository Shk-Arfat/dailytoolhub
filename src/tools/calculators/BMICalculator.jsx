import { useState } from "react";
import Header from "../../components/Header";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import GaugeChart from "react-gauge-chart";
import { Helmet } from "react-helmet-async";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("metric");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [lbs, setLbs] = useState("");

  const calculateBMI = () => {
    let heightInMeters;
    let weightInKg;

    if (unit === "metric") {
      if (!height || !weight) return;
      heightInMeters = height / 100;
      weightInKg = weight;
    } else {
      if (!feet || !lbs) return;

      const totalInches = feet * 12 + Number(inches || 0);
      heightInMeters = totalInches * 0.0254; // inch → meter
      weightInKg = lbs * 0.453592; // lbs → kg
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    const rounded = bmiValue.toFixed(1);
    setBmi(rounded);

    if (rounded < 18.5) setCategory("Underweight");
    else if (rounded < 25) setCategory("Healthy");
    else if (rounded < 30) setCategory("Overweight");
    else setCategory("Obese");
  };

  const getHealthyWeightRange = () => {
    let heightInMeters;
    let weightInKg;

    if (unit === "metric") {
      if (!height) return null;
      heightInMeters = height / 100;
      weightInKg = weight;
    } else {
      if (!feet) return null;
      const totalInches = feet * 12 + Number(inches || 0);
      heightInMeters = totalInches * 0.0254;
      weightInKg = lbs * 0.453592;
    }

    const minKg = 18.5 * heightInMeters * heightInMeters;
    const maxKg = 24.9 * heightInMeters * heightInMeters;

    return {
      minKg,
      maxKg,
      weightInKg,
    };
  };

  const healthyData = getHealthyWeightRange();

  return (
    <>
      <Helmet>
        <title>
          BMI Calculator - Body Mass Index Tool Online | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Calculate your Body Mass Index (BMI) instantly. Check if you are underweight, normal, overweight, or obese using our free BMI calculator."
        />
      </Helmet>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />

        <main className="container mx-auto px-4 py-8">
          <Link to="/">
            <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-6 transition">
              <ArrowLeft /> Back to Tools
            </button>
          </Link>

          <div className="max-w-3xl mx-auto">
            {/* Card */}
            <div className="bg-white dark:bg-blue-900/20 p-8 rounded-2xl border shadow-sm">
              <h1 className="text-3xl font-bold text-center mb-6 dark:text-gray-200">
                BMI Calculator
              </h1>

              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={() => setUnit("metric")}
                  className={`px-4 py-2 rounded-lg ${unit === "metric" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  Metric (kg, cm)
                </button>

                <button
                  onClick={() => setUnit("imperial")}
                  className={`px-4 py-2 rounded-lg ${unit === "imperial" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                  Imperial (lbs, ft)
                </button>
              </div>

              {/* Inputs */}
              {unit === "metric" ? (
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Height (cm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="p-3 rounded-lg border dark:bg-gray-800"
                  />
                  <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="p-3 rounded-lg border dark:bg-gray-800"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="number"
                    placeholder="Feet"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    className="p-3 rounded-lg border dark:bg-gray-800"
                  />
                  <input
                    type="number"
                    placeholder="Inches"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                    className="p-3 rounded-lg border dark:bg-gray-800"
                  />
                  <input
                    type="number"
                    placeholder="Weight (lbs)"
                    value={lbs}
                    onChange={(e) => setLbs(e.target.value)}
                    className="p-3 rounded-lg border dark:bg-gray-800"
                  />
                </div>
              )}

              <button
                onClick={calculateBMI}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg"
              >
                Calculate BMI
              </button>

              {/* Gauge */}
              {bmi && (
                <div className="mt-10 text-center">
                  <GaugeChart
                    id="bmi-gauge"
                    nrOfLevels={4}
                    arcsLength={[0.25, 0.25, 0.25, 0.25]}
                    colors={["#38bdf8", "#22c55e", "#f59e0b", "#ef4444"]}
                    percent={bmi / 40}
                    textColor="#2563eb"
                    formatTextValue={() => bmi}
                  />

                  <h2 className="text-2xl font-bold mt-4 text-blue-600 dark:text-blue-400">
                    {bmi} — {category}
                  </h2>

                  {healthyData && (
                    <div className="mt-6 space-y-2 text-gray-600 dark:text-gray-300">
                      {/* Range */}
                      <p>
                        Healthy weight range:{" "}
                        <strong>
                          {unit === "metric"
                            ? `${healthyData.minKg.toFixed(1)}kg – ${healthyData.maxKg.toFixed(1)}kg`
                            : `${(healthyData.minKg * 2.20462).toFixed(1)}lbs – ${(healthyData.maxKg * 2.20462).toFixed(1)}lbs`}
                        </strong>
                      </p>

                      {/* Gain or lose weight */}
                      {healthyData.weightInKg && (
                        <p>
                          {healthyData.weightInKg > healthyData.maxKg
                            ? `You need to lose ${(healthyData.weightInKg - healthyData.maxKg).toFixed(1)} kg to reach a healthy BMI`
                            : healthyData.weightInKg < healthyData.minKg
                              ? `You need to gain ${(healthyData.minKg - healthyData.weightInKg).toFixed(1)} kg to reach a healthy BMI`
                              : "You are already in the healthy weight range 🎉"}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* How to use */}
            <div className="mt-10 bg-white dark:bg-blue-900/20 p-6 rounded-2xl border">
              <h2 className="text-xl font-bold mb-4">
                How to Use BMI Calculator
              </h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>Enter your height in centimeters.</li>
                <li>Enter your weight in kilograms.</li>
                <li>Click Calculate BMI to see your result.</li>
              </ul>
            </div>

            {/* Info */}
            <div className="mt-10 text-gray-600 dark:text-gray-300 space-y-4">
              <h2 className="text-2xl font-bold">About BMI</h2>
              <p>
                BMI (Body Mass Index) measures body fat based on height and
                weight. It helps identify healthy weight ranges.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default BMICalculator;
