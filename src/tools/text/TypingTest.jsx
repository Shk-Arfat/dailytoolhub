import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  RefreshCw,
  Timer,
  Target,
  Keyboard,
  Award,
  Zap,
  Clock,
  BarChart3,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const paragraphs = {
  beginner: [
    `The quick brown fox jumps over the lazy dog near the river bank. She sells seashells by the seashore in bright sunny weather. A quick movement of the enemy will jeopardize six gunboats. Pack my box with five dozen liquor jugs during transport. How razorback jumping frogs can level six piqued gymnasts. The five boxing wizards jump quickly while solving complex puzzles. Amazingly few discotheques provide jukeboxes for dance floors.`,

    `Learning to type efficiently is an essential skill in the digital age. With practice, your fingers will learn the positions of each key without looking. Start with home row position where your left fingers rest on A S D F and right fingers on J K L semicolon. From there, reach for other keys and always return to home position. This muscle memory develops over time with consistent practice.`,

    `Regular practice is the key to improving your typing speed. Set aside at least 15 minutes each day for focused typing exercises. Use online tools and typing tests to track your progress. Pay attention to your posture and hand position. Keep your wrists straight and fingers curved. Take breaks to prevent fatigue and strain.`,

    `The internet has revolutionized how we communicate and share information. Email allows instant communication across the globe. Social media platforms connect people from different cultures. Online learning provides access to education for millions. E-commerce has changed how we shop and do business.`,

    `Success in typing comes from focusing on accuracy before speed. When you type with high accuracy, speed naturally follows. Make sure to correct your mistakes immediately. Practice problem letters and common words. Use typing games to make practice more enjoyable. Track your words per minute weekly to see improvement.`,
  ],

  intermediate: [
    `Web development has evolved significantly over the past decade. Modern frameworks like React, Vue, and Angular have transformed how we build user interfaces. These tools use component-based architecture to create reusable UI elements. State management becomes crucial in large applications, with solutions like Redux or Context API. The rise of TypeScript has added type safety to JavaScript, reducing bugs and improving developer experience. Server-side rendering with Next.js or Nuxt.js has improved performance and SEO. The JAMstack architecture combines JavaScript, APIs, and pre-built Markup for faster, more secure websites. Progressive Web Apps blur the line between web and native applications.`,

    `Artificial intelligence and machine learning are reshaping industries worldwide. Deep learning networks with multiple layers can recognize patterns in vast amounts of data. Natural language processing enables computers to understand and generate human language. Computer vision systems can identify objects, faces, and scenes in images and videos. Reinforcement learning allows AI agents to learn through trial and error. Generative AI creates new content from text descriptions. These technologies raise important ethical questions about privacy, bias, and the future of work. The challenge lies in developing AI systems that are both powerful and responsible.`,

    `The human brain remains one of the most complex structures in the known universe. With approximately 86 billion neurons, each forming thousands of connections, the possible combinations are staggering. Neuroplasticity allows the brain to reorganize itself by forming new neural connections throughout life. This adaptability underlies learning and memory formation. Different regions specialize in various functions - the hippocampus for memory consolidation, the cerebellum for motor control, and the prefrontal cortex for decision making. Understanding brain function has implications for treating neurological disorders and developing artificial intelligence.`,

    `Climate change represents one of the greatest challenges facing humanity. Rising global temperatures lead to more frequent extreme weather events. Sea levels are rising due to thermal expansion and melting ice caps. Ecosystems struggle to adapt to rapidly changing conditions. The transition to renewable energy sources like solar and wind power is accelerating. Electric vehicles are becoming more affordable and practical. However, reducing carbon emissions requires systemic changes in how we produce energy, manufacture goods, and transport ourselves. International cooperation through agreements like the Paris Accord aims to coordinate global responses.`,

    `Space exploration continues to capture human imagination and drive technological innovation. The International Space Station serves as a laboratory for microgravity research. Mars rovers like Perseverance search for signs of ancient microbial life. The James Webb Space Telescope peers deeper into the universe than ever before. Private companies like SpaceX are reducing launch costs and developing reusable rockets. Plans for lunar bases and Mars missions raise questions about long-term space habitation. The challenges include radiation protection, life support systems, and the psychological effects of isolation.`,
  ],

  advanced: [
    `Quantum computing represents a fundamental shift in computational capability, leveraging the principles of quantum mechanics to process information in ways that classical computers cannot. Unlike classical bits that exist as either 0 or 1, quantum bits or qubits can exist in superposition, representing multiple states simultaneously. This property, combined with entanglement where qubits become interconnected regardless of distance, enables quantum computers to solve certain problems exponentially faster. Shor's algorithm demonstrates this by factoring large numbers in polynomial time, potentially breaking current encryption standards. Grover's algorithm provides quadratic speedup for unstructured search problems. However, quantum systems are extremely sensitive to environmental interference, requiring near-absolute-zero temperatures and sophisticated error correction. Companies like Google, IBM, and startups are racing to achieve quantum supremacy while developing practical applications in cryptography, drug discovery, and materials science.`,

    `The philosophical implications of consciousness and artificial intelligence continue to challenge our understanding of mind and machine. The hard problem of consciousness, as formulated by philosopher David Chalmers, questions how physical processes in the brain give rise to subjective experience. Integrated Information Theory proposes that consciousness corresponds to a system's capacity to integrate information. Global Workspace Theory suggests consciousness arises from information being broadcast to multiple cognitive systems. As AI systems become more sophisticated, questions about machine consciousness become increasingly relevant. Could a sufficiently advanced AI develop self-awareness? What ethical obligations would we have toward conscious machines? The Turing test, while historically significant, may be insufficient for determining consciousness. These questions intersect with neuroscience, psychology, and ethics, forcing us to reconsider what it means to be conscious and what rights might extend to non-biological entities.`,

    `The evolution of programming languages reflects humanity's ongoing quest to better communicate with computers while making that communication more intuitive for humans. From machine language's binary instructions to assembly language's mnemonics, each generation has abstracted away complexity. High-level languages like FORTRAN and COBOL brought programming to business and scientific communities. C provided systems programming capability with portability. Object-oriented programming with Smalltalk and C++ introduced new ways of modeling real-world relationships. Functional languages like Haskell offered mathematical rigor and side-effect-free programming. Modern languages incorporate multiple paradigms - Python's simplicity masks powerful capabilities, Rust provides memory safety without garbage collection, and Go offers concurrency primitives for multi-core processors. Domain-specific languages emerge for particular tasks while general-purpose languages continue evolving with features like pattern matching, algebraic data types, and effect systems.`,

    `Economic systems throughout history have evolved in response to technological change, social structures, and philosophical ideas about human nature. Feudalism organized society around land ownership and reciprocal obligations. Mercantilism emphasized national wealth through trade surpluses. Adam Smith's invisible hand metaphor laid groundwork for classical economics and free markets. Marx's critique highlighted capitalism's internal contradictions and cycles of crisis. Keynesian economics advocated government intervention to smooth business cycles. Monetarism emphasized controlling money supply to manage inflation. Behavioral economics incorporates psychological insights about irrational decision-making. Modern debates center on inequality, automation's impact on employment, cryptocurrency's role, and sustainable development. The COVID-19 pandemic prompted unprecedented government intervention and raised questions about social safety nets. Climate change demands economic transformation on a scale not seen since the Industrial Revolution.`,

    `The nature of time has puzzled physicists and philosophers for millennia. Newton conceived of absolute time flowing uniformly regardless of observers. Einstein's special relativity revealed time's relativity to motion and gravity, with moving clocks running slow and gravity distorting time's flow. The twin paradox demonstrates this dramatically - one twin traveling near light speed would age less than their Earth-bound sibling. Quantum mechanics introduces additional complexities, with some interpretations suggesting time might be emergent rather than fundamental. The arrow of time points from past to future due to increasing entropy according to the second law of thermodynamics. Yet at the quantum level, equations are time-symmetric. The block universe theory suggests past, present, and future all exist equally. Some theoretical physicists explore whether time could be an illusion emerging from quantum entanglement. These questions connect to consciousness, free will, and our deepest intuitions about reality.`,
  ],
};

const TypingTest = () => {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [timeLimit, setTimeLimit] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [difficulty, setDifficulty] = useState("intermediate");
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 0,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
    rawWpm: 0,
  });
  const [history, setHistory] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);

  const textareaRef = useRef(null);
  const startTimeRef = useRef(null);

  // Load random paragraph
  const loadNewParagraph = () => {
    const selectedParagraphs = paragraphs[difficulty];
    const random =
      selectedParagraphs[Math.floor(Math.random() * selectedParagraphs.length)];
    setText(random);
    resetTest();
  };

  useEffect(() => {
    loadNewParagraph();
  }, [difficulty]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (started && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [started]);

  // Calculate stats in real-time
  useEffect(() => {
    if (input.length > 0 && started && !finished) {
      setStats(getStats(input));
      setCurrentPosition(input.length);
    }
  }, [input, started, timeLeft]);

  const getStats = (typedText = input) => {
    const textChars = text.split("");
    const inputChars = typedText.split("");

    let correct = 0;
    let incorrect = 0;

    textChars.forEach((char, index) => {
      if (index < inputChars.length) {
        if (char === inputChars[index]) correct++;
        else incorrect++;
      }
    });

    const totalTyped = inputChars.length;
    const accuracy =
      totalTyped > 0 ? Math.round((correct / totalTyped) * 100) : 0;

    const timeElapsed = (timeLimit - timeLeft) / 60;
    const wordsTyped = totalTyped / 5;
    const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    const rawWpm =
      timeElapsed > 0 ? Math.round(totalTyped / 5 / timeElapsed) : 0;

    return {
      wpm,
      accuracy,
      correctChars: correct,
      incorrectChars: incorrect,
      totalChars: totalTyped,
      rawWpm,
    };
  };

  const finishTest = () => {
    const finalStats = getStats(); // 👈 get fresh stats

    setStats(finalStats);
    setFinished(true);
    setStarted(false);
    setShowResults(true);

    const newResult = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      wpm: finalStats.wpm,
      accuracy: finalStats.accuracy,
      difficulty,
      timeLimit,
      totalChars: finalStats.totalChars,
      errors: finalStats.incorrectChars,
    };

    setHistory((prev) => [newResult, ...prev].slice(0, 10));
  };

  const resetTest = () => {
    setInput("");
    setTimeLeft(timeLimit);
    setStarted(false);
    setFinished(false);
    setShowResults(false);
    setCurrentPosition(0);
    setStats({
      wpm: 0,
      accuracy: 0,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      rawWpm: 0,
    });
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleTyping = (e) => {
    const value = e.target.value;

    if (!started && value.length > 0) {
      setStarted(true);
      startTimeRef.current = Date.now();
    }

    if (!finished && timeLeft > 0) {
      setInput(value);

      // Auto-finish if completed the text
      if (value.length >= text.length) {
        finishTest();
      }
    }
  };

  const handleTimeChange = (e) => {
    const newTime = parseInt(e.target.value);
    setTimeLimit(newTime);
    setTimeLeft(newTime);
    resetTest();
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Get character color for display
  const getCharColor = (char, index) => {
    if (index >= input.length) return "text-gray-400";
    if (input[index] === char) return "text-green-500";
    return "text-red-500 bg-red-100 dark:bg-red-900/30";
  };

  // Get character background for current position indicator
  const getCharBackground = (index) => {
    if (index === currentPosition && !finished && started) {
      return "bg-blue-200 dark:bg-blue-800 animate-pulse";
    }
    return "";
  };

  return (
    <>
      <Helmet>
        <title>
          Typing Speed Test - Check Your WPM Online | DailyTools Hub
        </title>
        <meta
          name="description"
          content="Test your typing speed and accuracy with our free typing test tool. Measure WPM and improve your keyboard skills."
        />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Link to="/">
            <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-6 transition">
              <ArrowLeft /> Back to Tools
            </button>
          </Link>

          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Typing Speed Test
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Challenge yourself with long-form content and track your
                progress
              </p>
            </div>

            {/* Main Test Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Typing Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Text Display */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-2 mb-4 text-gray-500">
                    <Keyboard size={20} />
                    <span>
                      Type this text ({text.split(" ").length} words,{" "}
                      {text.length} characters):
                    </span>
                  </div>
                  <div className="font-mono text-lg leading-relaxed max-h-64 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    {text.split("").map((char, i) => (
                      <span
                        key={i}
                        className={`${getCharColor(char, i)} ${getCharBackground(i)} transition-all duration-150 px-0.5`}
                      >
                        {char}
                      </span>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                      style={{
                        width: `${(input.length / text.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Input Area */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleTyping}
                    disabled={finished || timeLeft === 0}
                    placeholder={
                      timeLeft > 0
                        ? "Start typing here..."
                        : "Test finished! Click New Test to try again."
                    }
                    className="w-full h-48 p-4 border-2 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all disabled:bg-gray-100 disabled:cursor-not-allowed font-mono text-lg"
                  />

                  {/* Typing Status */}
                  <div className="flex justify-between mt-4 text-sm">
                    <span className="text-gray-500">
                      {input.length} / {text.length} characters
                    </span>
                    {started && !finished && (
                      <span className="text-green-500 animate-pulse flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Typing in progress...
                      </span>
                    )}
                    {finished && (
                      <span className="text-purple-500 font-semibold flex items-center gap-2">
                        <Award size={16} />
                        Test Complete!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Stats */}
              <div className="space-y-6">
                {/* Controls Bar */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Difficulty Selector */}
                    <div className="flex gap-2">
                      {["beginner", "intermediate", "advanced"].map((level) => (
                        <button
                          key={level}
                          onClick={() => handleDifficultyChange(level)}
                          className={`px-4 py-2 rounded-lg capitalize transition-all ${
                            difficulty === level
                              ? "bg-blue-500 text-white shadow-lg scale-105"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                    {/* Timer Display */}
                    <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-6 py-2 rounded-lg">
                      <Timer className="text-blue-500" size={24} />
                      <span className="text-5xl font-mono font-bold text-blue-600 dark:text-blue-400">
                        {formatTime(timeLeft)}
                      </span>
                    </div>

                    {/* Timer Selection */}
                    <div className="flex items-center gap-4">
                      <select
                        value={timeLimit}
                        onChange={handleTimeChange}
                        className="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                        disabled={started}
                      >
                        <option value={60}>1 minute</option>
                        <option value={120}>2 minutes</option>
                        <option value={300}>5 minutes</option>
                        <option value={600}>10 minutes</option>
                      </select>
                    </div>

                    {/* Progress Percentage */}
                    <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 px-6 py-2 rounded-lg">
                      <BarChart3 className="text-purple-500" size={24} />
                      <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {Math.round((input.length / text.length) * 100)}%
                      </span>
                    </div>

                    {/* Restart Button */}
                    <button
                      onClick={resetTest}
                      className="flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <RefreshCw size={20} />
                      <span>New Test</span>
                    </button>
                  </div>
                </div>
                {/* Live Stats */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Zap className="text-yellow-500" />
                    Live Stats
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <span className="text-sm text-gray-500">Net WPM</span>
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          {stats.wpm}
                        </div>
                      </div>

                      <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                        <span className="text-sm text-gray-500">Raw WPM</span>
                        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                          {stats.rawWpm}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">
                          Accuracy
                        </span>
                        <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                          {stats.accuracy}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${stats.accuracy}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                        <span className="text-sm text-gray-500">Correct</span>
                        <div className="text-xl font-bold text-green-600">
                          {stats.correctChars}
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                        <span className="text-sm text-gray-500">Errors</span>
                        <div className="text-xl font-bold text-red-600">
                          {stats.incorrectChars}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                        <span className="text-sm text-gray-500">Time Left</span>
                        <div className="text-xl font-bold text-gray-700 dark:text-gray-300">
                          {formatTime(timeLeft)}
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                        <span className="text-sm text-gray-500">
                          Words Left
                        </span>
                        <div className="text-xl font-bold text-gray-700 dark:text-gray-300">
                          {text.split(" ").length - input.split(" ").length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* History */}
                {history.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-sm font-semibold mb-3 text-gray-500 flex items-center gap-2">
                      <TrendingUp size={16} />
                      Recent Results
                    </h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {history.map((result) => (
                        <div
                          key={result.id}
                          className="flex justify-between items-center text-sm p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                          <div>
                            <span className="font-bold text-blue-600 dark:text-blue-400">
                              {result.wpm} WPM
                            </span>
                            <span className="text-gray-500 ml-2">
                              {result.accuracy}%
                            </span>
                          </div>
                          <div className="text-xs text-gray-400">
                            {result.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {showResults && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 w-[420px] p-8 rounded-3xl shadow-2xl animate-scaleIn">
                <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
                  <Award className="text-purple-500" />
                  Test Results
                </h2>

                <div className="text-center mb-6">
                  <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stats.wpm} WPM
                  </div>
                  <p className="text-gray-500 mt-2">
                    {stats.accuracy}% accuracy
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center mb-6">
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <div className="text-sm text-gray-500">Time Used</div>
                    <div className="font-bold text-xl">
                      {timeLimit - timeLeft}s
                    </div>
                  </div>

                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <div className="text-sm text-gray-500">Difficulty</div>
                    <div className="font-bold text-xl capitalize">
                      {difficulty}
                    </div>
                  </div>

                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <div className="text-sm text-gray-500">Characters</div>
                    <div className="font-bold text-xl">{stats.totalChars}</div>
                  </div>

                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
                    <div className="text-sm text-gray-500">Errors</div>
                    <div className="font-bold text-xl text-red-500">
                      {stats.incorrectChars}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={loadNewParagraph}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold"
                  >
                    Try Again
                  </button>

                  <button
                    onClick={() => setShowResults(false)}
                    className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          <section className="mt-16 max-w-4xl mx-auto text-left space-y-6">
            <h2 className="text-2xl font-bold">About This Tool</h2>
            <h2 className="text-2xl font-bold">
              Improve Your Typing Speed and Accuracy
            </h2>
            <p>
              Our Typing Speed Test helps you measure your typing performance in
              words per minute (WPM) and accuracy percentage. Whether you are
              preparing for competitive exams, job tests, or simply want to
              improve your keyboard skills, this tool provides instant feedback.
            </p>
            <p>
              You can practice with timed tests and monitor your improvement
              over time. The tool calculates speed, errors, and accuracy
              automatically.
            </p>
            <h4 className="text-xl font-bold">Key Features:</h4>
            <ul className="list-disc ml-6 space-y-2">
              <li>Real-time WPM calculation</li>
              <li>Accuracy percentage tracking</li>
              <li>Timed practice modes</li>
              <li>Clean and distraction-free interface</li>
              <li>100% free access</li>
            </ul>
            <p>
              Regular typing practice improves productivity and efficiency,
              making this tool perfect for students, professionals, and
              developers.
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default TypingTest;
