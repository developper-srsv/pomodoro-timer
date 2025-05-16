"use client";
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

  const totalSeconds = MODES[mode];
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
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    setSecondsLeft(MODES[mode]);
    setIsRunning(false);
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
    const seconds = minutes * 60;
    setSecondsLeft(seconds);
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(MODES[mode]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="flex justify-center gap-2 mb-6">
        {TIME_PRESETS.map((minutes) => (
          <button
            key={minutes}
            onClick={() => handlePresetClick(minutes)}
            className={`px-6 py-2 rounded-full transition text-sm font-medium ${
              selectedPreset === minutes
                ? "bg-cyan-600 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {minutes} mins
          </button>
        ))}
      </div>

      <div className="bg-black rounded-3xl overflow-hidden shadow-xl w-full max-w-md flex">
        <div className="flex-1 p-6 flex flex-col items-start justify-center">
          <h2 className="text-gray-400 mb-1">Timer</h2>
          <h1 className="text-white text-6xl font-bold tracking-tighter">
            {formatTime(secondsLeft)}
          </h1>
          <button
            onClick={resetTimer}
            className="mt-4 px-8 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white"
          >
            Reset
          </button>
        </div>

        <div className="bg-gray-900 p-6 flex items-center justify-center w-1/2 relative">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full absolute" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#1e3a4a"
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
                stroke="#06b6d4"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            <button
              onClick={() => setIsRunning((prev) => !prev)}
              className="absolute inset-0 flex items-center justify-center focus:outline-none"
            >
              {isRunning ? (
                <div className="w-8 h-8 flex justify-center items-center">
                  <div className="w-2 h-8 bg-white mx-1"></div>
                  <div className="w-2 h-8 bg-white mx-1"></div>
                </div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {Object.keys(MODES).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setSelectedPreset(null);
            }}
            className={`px-4 py-2 rounded-full transition text-sm ${
              mode === m
                ? "bg-cyan-600 text-white"
                : "bg-gray-300 text-gray-700"
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
