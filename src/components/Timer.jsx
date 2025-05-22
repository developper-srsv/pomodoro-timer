// import { useState, useEffect } from "react";

// const MODES = {
//   pomodoro: 25 * 60,
//   shortBreak: 5 * 60,
//   longBreak: 15 * 60,
// };

// const TIME_PRESETS = [5, 10, 20];

// export default function Timer() {
//   const [mode, setMode] = useState("pomodoro");
//   const [secondsLeft, setSecondsLeft] = useState(MODES[mode]);
//   const [isRunning, setIsRunning] = useState(false);
//   const [selectedPreset, setSelectedPreset] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const [customMinutes, setCustomMinutes] = useState("");

//   const totalSeconds = selectedPreset ? selectedPreset * 60 : MODES[mode];
//   const progress = (secondsLeft / totalSeconds) * 100;

//   const radius = 70;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (progress / 100) * circumference;

//   useEffect(() => {
//     let interval;
//     if (isRunning) {
//       interval = setInterval(() => {
//         setSecondsLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(interval);
//             playAlarm();
//             handleAutoSwitch();
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [isRunning]);

//   useEffect(() => {
//     if (!selectedPreset) {
//       setSecondsLeft(MODES[mode]);
//     }
//   }, [mode]);

//   const formatTime = (s) => {
//     const m = Math.floor(s / 60)
//       .toString()
//       .padStart(2, "0");
//     const secs = (s % 60).toString().padStart(2, "0");
//     return `${m}:${secs}`;
//   };

//   const handlePresetClick = (minutes) => {
//     setSelectedPreset(minutes);
//     setSecondsLeft(minutes * 60);
//     setIsRunning(false);
//   };
//   const handleCustomChange = (e) => {
//     const val = Number(e.target.value);
//     setCustomMinutes(val);
//     setSelectedPreset(val);
//     setSecondsLeft(val * 60);
//     setIsRunning(false);
//   };

//   const handleAutoSwitch = () => {
//     if (mode === "pomodoro") {
//       setMode("shortBreak");
//     } else {
//       setMode("pomodoro");
//     }
//     setSelectedPreset(null);
//     setIsRunning(false);
//   };

//   const resetTimer = () => {
//     setIsRunning(false);
//     setSelectedPreset(null);
//     setSecondsLeft(MODES[mode]);
//   };

//   const playAlarm = () => {
//     const alarmAudio = new Audio("/sound.mp3");
//     alarmAudio.volume = 0.5;
//     alarmAudio.play();
//   };

//   return (
//     <div
//       className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
//         darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
//       }`}
//     >
//       {/* Mode Toggle */}
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="absolute top-4 right-4 px-4 py-1 rounded-full text-sm border"
//       >
//         {darkMode ? "🌙" : "☀️"}
//       </button>

//       {/* Presets + Custom Input */}
//       <div className="flex flex-wrap justify-center gap-2 mb-6">
//         {TIME_PRESETS.map((minutes) => (
//           <button
//             key={minutes}
//             onClick={() => handlePresetClick(minutes)}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition ${
//               selectedPreset === minutes
//                 ? "bg-cyan-600 text-white"
//                 : "bg-gray-300 text-gray-700"
//             }`}
//           >
//             {minutes} mins
//           </button>
//         ))}

//         <div className="relative">
//           <select
//             value={customMinutes}
//             onChange={handleCustomChange}
//             className={`appearance-none rounded-full pl-4 pr-10 py-2 text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition w-full ${
//               darkMode
//                 ? "bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600"
//                 : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-100"
//             }`}
//             aria-label="Custom Timer in Minutes"
//             title="Select Custom Timer"
//           >
//             <option value="" disabled>
//               Custom
//             </option>
//             {[...Array(60)].map((_, i) => (
//               <option key={i + 1} value={i + 1}>
//                 {i + 1} min{i + 1 > 1 ? "s" : ""}
//               </option>
//             ))}
//           </select>

//           {/* Custom dropdown arrow */}
//           <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </div>
//         </div>
//       </div>

//       {/* Timer Panel */}
//       <div
//         className={`bg-black rounded-3xl shadow-xl w-full max-w-md flex overflow-hidden`}
//       >
//         <div className="flex-1 p-6 flex flex-col items-start justify-center">
//           <h2 className="text-gray-400 mb-1">Timer</h2>
//           <h1 className="text-white text-6xl font-bold tracking-tighter">
//             {formatTime(secondsLeft)}
//           </h1>
//           <button
//             onClick={resetTimer}
//             className="mt-4 px-8 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white"
//           >
//             Reset
//           </button>
//         </div>

//         <div className="bg-gray-900 p-6 flex items-center justify-center w-1/2 relative">
//           <div className="relative w-36 h-36 flex items-center justify-center">
//             <svg className="w-full h-full absolute" viewBox="0 0 200 200">
//               <circle
//                 cx="100"
//                 cy="100"
//                 r={radius}
//                 fill="none"
//                 stroke="#1e3a4a"
//                 strokeWidth="12"
//               />
//             </svg>

//             <svg
//               className="w-full h-full absolute rotate-[-90deg]"
//               viewBox="0 0 200 200"
//             >
//               <circle
//                 cx="100"
//                 cy="100"
//                 r={radius}
//                 fill="none"
//                 stroke="#06b6d4"
//                 strokeWidth="12"
//                 strokeDasharray={circumference}
//                 strokeDashoffset={strokeDashoffset}
//                 strokeLinecap="round"
//               />
//             </svg>

//             <button
//               onClick={() => setIsRunning((prev) => !prev)}
//               className="absolute inset-0 flex items-center justify-center"
//             >
//               {isRunning ? (
//                 <div className="w-8 h-8 flex justify-center items-center">
//                   <div className="w-2 h-8 bg-white mx-1"></div>
//                   <div className="w-2 h-8 bg-white mx-1"></div>
//                 </div>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-12 w-12"
//                   viewBox="0 0 24 24"
//                   fill="white"
//                 >
//                   <path d="M8 5v14l11-7z" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mode Switcher */}
//       <div className="flex justify-center gap-2 mt-8">
//         {Object.keys(MODES).map((m) => (
//           <button
//             key={m}
//             onClick={() => {
//               setMode(m);
//               setSelectedPreset(null);
//               setSecondsLeft(MODES[m]);
//               setIsRunning(false);
//             }}
//             className={`px-4 py-2 rounded-full transition text-sm ${
//               mode === m
//                 ? "bg-cyan-600 text-white"
//                 : "bg-gray-300 text-gray-700"
//             }`}
//           >
//             {m === "pomodoro"
//               ? "Pomodoro"
//               : m === "shortBreak"
//               ? "Short Break"
//               : "Long Break"}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";

const MODES = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const TIME_PRESETS = [5, 10, 20];

export default function Timer() {
  const [mode, setMode] = useState("pomodoro");
  const [secondsLeft, setSecondsLeft] = useState(MODES[mode]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("");

  const totalSeconds = selectedPreset ? selectedPreset * 60 : MODES[mode];
  const progress = (secondsLeft / totalSeconds) * 100;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            playAlarm();
            handleAutoSwitch();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!selectedPreset) {
      setSecondsLeft(MODES[mode]);
    }
  }, [mode]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${m}:${secs}`;
  };

  const handlePresetClick = (minutes) => {
    setSelectedPreset(minutes);
    setSecondsLeft(minutes * 60);
    setIsRunning(false);
  };
  
  const handleCustomChange = (e) => {
    const val = Number(e.target.value);
    setCustomMinutes(val);
    setSelectedPreset(val);
    setSecondsLeft(val * 60);
    setIsRunning(false);
  };

  const handleAutoSwitch = () => {
    if (mode === "pomodoro") {
      setMode("shortBreak");
    } else {
      setMode("pomodoro");
    }
    setSelectedPreset(null);
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSelectedPreset(null);
    setSecondsLeft(MODES[mode]);
  };

  const playAlarm = () => {
    const alarmAudio = new Audio("/sound.mp3");
    alarmAudio.volume = 0.5;
    alarmAudio.play();
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${
        darkMode 
          ? "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white" 
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800"
      }`}
    >
      {/* Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-6 right-6 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:scale-105 ${
          darkMode
            ? "bg-slate-800 text-yellow-300 border border-slate-700 hover:bg-slate-700"
            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
        }`}
      >
        {darkMode ? "🌙 Dark" : "☀️ Light"}
      </button>

      {/* Presets + Custom Input */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {TIME_PRESETS.map((minutes) => (
          <button
            key={minutes}
            onClick={() => handlePresetClick(minutes)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg ${
              selectedPreset === minutes
                ? darkMode
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-cyan-500/30"
                  : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-cyan-500/30"
                : darkMode
                ? "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {minutes} mins
          </button>
        ))}

        <div className="relative">
          <select
            value={customMinutes}
            onChange={handleCustomChange}
            className={`appearance-none rounded-full pl-6 pr-12 py-3 text-sm font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 hover:scale-105 w-full ${
              darkMode
                ? "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
            aria-label="Custom Timer in Minutes"
            title="Select Custom Timer"
          >
            <option value="" disabled>
              Custom
            </option>
            {[...Array(60)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} min{i + 1 > 1 ? "s" : ""}
              </option>
            ))}
          </select>

          {/* Custom dropdown arrow */}
          <div className={`pointer-events-none absolute inset-y-0 right-4 flex items-center ${
            darkMode ? "text-slate-400" : "text-gray-500"
          }`}>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Timer Panel */}
      <div
        className={`rounded-3xl shadow-2xl w-full max-w-md flex overflow-hidden transition-all duration-500 hover:scale-105 ${
          darkMode
            ? "bg-gradient-to-r from-slate-800 to-gray-800 border border-slate-700"
            : "bg-gradient-to-r from-white to-gray-50 border border-gray-200"
        }`}
      >
        <div className="flex-1 p-8 flex flex-col items-start justify-center">
          <h2 className={`mb-2 text-lg font-medium ${
            darkMode ? "text-slate-400" : "text-gray-500"
          }`}>
            Timer
          </h2>
          <h1 className={`text-6xl font-bold tracking-tighter mb-6 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            {formatTime(secondsLeft)}
          </h1>
          <button
            onClick={resetTimer}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg ${
              darkMode
                ? "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
            }`}
          >
            Reset
          </button>
        </div>

        <div className={`p-8 flex items-center justify-center w-1/2 relative ${
          darkMode
            ? "bg-gradient-to-br from-slate-900 to-gray-900"
            : "bg-gradient-to-br from-gray-100 to-slate-100"
        }`}>
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full absolute" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={darkMode ? "#334155" : "#e2e8f0"}
                strokeWidth="12"
              />
            </svg>

            <svg
              className="w-full h-full absolute rotate-[-90deg]"
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={darkMode ? "#06b6d4" : "#0ea5e9"}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-300"
                style={{
                  filter: darkMode 
                    ? "drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))" 
                    : "drop-shadow(0 0 6px rgba(14, 165, 233, 0.3))"
                }}
              />
            </svg>

            <button
              onClick={() => setIsRunning((prev) => !prev)}
              className={`absolute inset-0 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 ${
                darkMode 
                  ? "hover:bg-slate-800/30" 
                  : "hover:bg-white/30"
              }`}
            >
              {isRunning ? (
                <div className="w-8 h-8 flex justify-center items-center">
                  <div className={`w-2 h-8 mx-1 rounded-sm ${
                    darkMode ? "bg-white" : "bg-gray-800"
                  }`}></div>
                  <div className={`w-2 h-8 mx-1 rounded-sm ${
                    darkMode ? "bg-white" : "bg-gray-800"
                  }`}></div>
                </div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  viewBox="0 0 24 24"
                  fill={darkMode ? "white" : "#1f2937"}
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex justify-center gap-3 mt-8">
        {Object.keys(MODES).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setSelectedPreset(null);
              setSecondsLeft(MODES[m]);
              setIsRunning(false);
            }}
            className={`px-6 py-3 rounded-full transition-all duration-300 text-sm font-medium hover:scale-105 shadow-lg ${
              mode === m
                ? darkMode
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-cyan-500/30"
                  : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-cyan-500/30"
                : darkMode
                ? "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {m === "pomodoro"
              ? "Pomodoro"
              : m === "shortBreak"
              ? "Short Break"
              : "Long Break"}
          </button>
        ))}
      </div>
    </div>
  );
}