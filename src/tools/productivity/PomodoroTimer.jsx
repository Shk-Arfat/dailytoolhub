import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";
import { Helmet } from "react-helmet-async";

const MODES = {
  work: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

const PomodoroTimer = () => {
  const [mode, setMode] = useState("work");
  const [seconds, setSeconds] = useState(MODES.work);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(0);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          handleEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const handleEnd = () => {
    clearInterval(intervalRef.current);
    setRunning(false);

    if (mode === "work") {
      setCompleted((c) => c + 1);
      const next = (completed + 1) % 4 === 0 ? "long" : "short";
      setMode(next);
      setSeconds(MODES[next]);
    } else {
      setMode("work");
      setSeconds(MODES.work);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setMode("work");
    setSeconds(MODES.work);
    setCompleted(0);
  };

  const format = () => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progress = ((MODES[mode] - seconds) / MODES[mode]) * 100;

  return (
    <>
      <Helmet>
        <title>
          Pomodoro Timer Online - Focus & Study Timer | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Boost productivity with our free Pomodoro Timer. Focus for 25 minutes, take smart breaks, and improve concentration."
        />
      </Helmet>
      <div className="min-h-screen ">
        <Header />

        <main className="container mx-auto px-4 py-10">
          <Link to="/">
            <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-6 transition">
              <ArrowLeft /> Back to Tools
            </button>
          </Link>

          <div className="max-w-md mx-auto text-center">
            <h1 className="text-4xl font-bold mb-2">Pomodoro Timer</h1>

            {/* DEVICE BODY */}
            <div
              className="p-10 rounded-[40px] bg-[#e0e0e0]"
              style={{
                boxShadow: "20px 20px 40px #7d9cdf00, 20px 20px 40px #979797",
              }}
            >
              {/* Mode Buttons */}
              <div className="flex justify-center gap-4 mb-8 text-gray-800 dark:text-gray-600">
                {Object.keys(MODES).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMode(m);
                      setSeconds(MODES[m]);
                      setRunning(false);
                    }}
                    className="px-4 py-2 rounded-full capitalize"
                    style={{
                      boxShadow:
                        mode === m
                          ? "inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff"
                          : "4px 4px 8px #bebebe, -4px -4px 8px #ffffff",
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Circular Dial */}
              <div
                className="w-60 h-60 mx-auto rounded-full flex items-center justify-center relative text-gray-800 dark:text-gray-600"
                style={{
                  boxShadow:
                    "inset 15px 15px 30px #bebebe, inset -15px -15px 30px #ffffff",
                }}
              >
                {/* Progress ring */}
                <svg className="absolute w-full h-full -rotate-90 text-gray-800 dark:text-gray-600">
                  <circle
                    cx="120"
                    cy="120"
                    r="100"
                    stroke="#d1d1d1"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="120"
                    cy="120"
                    r="100"
                    stroke="#ef7a44"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="628"
                    strokeDashoffset={628 - (progress / 100) * 628}
                    strokeLinecap="round"
                  />
                </svg>

                <span className="text-5xl font-bold">{format()}</span>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-8 mt-10 text-gray-800 dark:text-gray-600">
                <button
                  onClick={() => setRunning(!running)}
                  className="p-5 rounded-full"
                  style={{
                    boxShadow: "6px 6px 12px #bebebe, -6px -6px 12px #ffffff",
                  }}
                >
                  {running ? <Pause size={28} /> : <Play size={28} />}
                </button>

                <button
                  onClick={reset}
                  className="p-5 rounded-full"
                  style={{
                    boxShadow: "6px 6px 12px #bebebe, -6px -6px 12px #ffffff",
                  }}
                >
                  <RotateCcw size={28} />
                </button>
              </div>

              <p className="mt-8 text-gray-600">
                Completed sessions: {completed}
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PomodoroTimer;
