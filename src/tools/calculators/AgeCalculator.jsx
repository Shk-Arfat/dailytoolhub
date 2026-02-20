import { useState } from "react";
import Header from "../../components/Header";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);
  const [lifeStats, setLifeStats] = useState(null);
  const [nextBirthday, setNextBirthday] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const today = new Date();
    const birth = new Date(birthDate);

    // 🎂 Age in years months days
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });

    // ⏱️ Total time lived
    const diffMs = today - birth;
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));

    setLifeStats({ hours, minutes, seconds });

    // 🎉 Next birthday calculation
    let nextBday = new Date(
      today.getFullYear(),
      birth.getMonth(),
      birth.getDate(),
    );
    if (nextBday < today) nextBday.setFullYear(today.getFullYear() + 1);

    const diffBday = nextBday - today;
    const bDays = Math.floor(diffBday / (1000 * 60 * 60 * 24));
    const bHours = Math.floor(diffBday / (1000 * 60 * 60)) % 24;
    const bMinutes = Math.floor(diffBday / (1000 * 60)) % 60;

    setNextBirthday({ bDays, bHours, bMinutes });
  };

  return (
    <>
      <Helmet>
        <title>
          Age Calculator - Calculate Your Exact Age Online | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Free online age calculator to find your exact age in years, months, and days. Simple, accurate, and instant results."
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

          <div className="max-w-2xl mx-auto">
            {/* Calculator Card */}
            <div className="bg-white dark:bg-blue-900/20 p-8 rounded-2xl border shadow-sm">
              <h1 className="text-3xl font-bold text-center mb-6 dark:text-gray-200">
                Age Calculator
              </h1>

              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Enter your birth date
              </label>

              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full p-3 rounded-lg border dark:bg-gray-800"
              />

              <button
                onClick={calculateAge}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg"
              >
                Calculate Age
              </button>

              {age && (
                <div className="mt-8 space-y-6 text-center">
                  <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {age.years} Years {age.months} Months {age.days} Days
                  </h2>

                  {/* Life stats */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border rounded-xl">
                      <p className="text-sm text-gray-500">Hours lived</p>
                      <p className="font-bold text-lg">
                        {lifeStats.hours.toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border rounded-xl">
                      <p className="text-sm text-gray-500">Minutes lived</p>
                      <p className="font-bold text-lg">
                        {lifeStats.minutes.toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border rounded-xl">
                      <p className="text-sm text-gray-500">Seconds lived</p>
                      <p className="font-bold text-lg">
                        {lifeStats.seconds.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Next birthday */}
                  <div className="bg-white dark:bg-blue-900/20 p-6 rounded-xl border">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      🎉 Time Until Next Birthday
                    </h3>
                    <p className="mt-2 text-xl font-bold text-blue-600 dark:text-blue-400">
                      {nextBirthday.bDays} days {nextBirthday.bHours} hrs{" "}
                      {nextBirthday.bMinutes} mins
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="mt-10 text-gray-600 dark:text-gray-300 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                About Age Calculator
              </h2>
              <p>
                This age calculator helps you find your exact age in years,
                months, and days from your birth date.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AgeCalculator;
