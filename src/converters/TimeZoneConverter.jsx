import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { ArrowLeft, ArrowRightLeft } from "lucide-react";
import { Link } from "react-router-dom";

const timezones = [
  "UTC",
  "Asia/Kolkata",
  "America/New_York",
  "Europe/London",
  "Europe/Paris",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "America/Los_Angeles",
  "America/Toronto",
];

const TimezoneConverter = () => {
  const [fromTZ, setFromTZ] = useState("Asia/Kolkata");
  const [toTZ, setToTZ] = useState("America/New_York");
  const [time, setTime] = useState(new Date());

  // live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // format time for timezone

//   const formatTime = (tz) => {
//     return new Intl.DateTimeFormat("en-US", {
//       timeZone: tz,
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       weekday: "short",
//       day: "numeric",
//       month: "short",
//     }).format(time);
//   };


  // calculate time difference
  
  const getOffset = (tz) => {
    const local = new Date().toLocaleString("en-US", { timeZone: tz });
    const date = new Date(local);
    return date.getHours() + date.getMinutes() / 60;
  };

  const timeDiff = (getOffset(toTZ) - getOffset(fromTZ)).toFixed(1);

  const swapZones = () => {
    const temp = fromTZ;
    setFromTZ(toTZ);
    setToTZ(temp);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link to="/">
          <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
            <ArrowLeft /> Back to Tools
          </button>
        </Link>

        <div className="max-w-2xl mx-auto">
          {/* Converter Card */}
          <div className="bg-white dark:bg-blue-900/20 p-8 rounded-2xl border shadow-sm">
            <h1 className="text-3xl font-bold text-center mb-6 dark:text-gray-200">
              Time Zone Converter
            </h1>

            {/* Dropdowns */}
            <div className="grid grid-cols-2 gap-4">
              <select
                value={fromTZ}
                onChange={(e) => setFromTZ(e.target.value)}
                className="p-3 rounded-lg border dark:bg-gray-800"
              >
                {timezones.map((tz) => (
                  <option key={tz}>{tz}</option>
                ))}
              </select>

              <select
                value={toTZ}
                onChange={(e) => setToTZ(e.target.value)}
                className="p-3 rounded-lg border dark:bg-gray-800"
              >
                {timezones.map((tz) => (
                  <option key={tz}>{tz}</option>
                ))}
              </select>
            </div>

            {/* Swap */}
            <button
              onClick={swapZones}
              className="mx-auto my-4 flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 text-white"
            >
              <ArrowRightLeft /> Swap
            </button>

            {/* Time Display */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {/* FROM TIME */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl text-center">
                <h3 className="font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  {fromTZ}
                </h3>

                <p className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                  {new Intl.DateTimeFormat("en-US", {
                    timeZone: fromTZ,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  }).format(time)}
                </p>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {new Intl.DateTimeFormat("en-US", {
                    timeZone: fromTZ,
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(time)}
                </p>
              </div>

              {/* TO TIME */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl text-center">
                <h3 className="font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  {toTZ}
                </h3>

                <p className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                  {new Intl.DateTimeFormat("en-US", {
                    timeZone: toTZ,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  }).format(time)}
                </p>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {new Intl.DateTimeFormat("en-US", {
                    timeZone: toTZ,
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(time)}
                </p>
              </div>
            </div>

            {/* Difference */}
            <p className="text-center mt-6 text-blue-600 dark:text-blue-400 font-semibold">
              Time difference: {timeDiff} hours
            </p>
          </div>

          {/* Info Section */}
          <div className="mt-12 space-y-4 text-gray-600 dark:text-gray-300">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              About Time Zone Conversion
            </h2>
            <p>
              Time zone conversion helps travelers, remote teams, and businesses
              coordinate meetings across different regions of the world.
            </p>
            <p>
              This tool shows real-time local time in different time zones and
              calculates the exact time difference instantly.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TimezoneConverter;
