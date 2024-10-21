// src/components/DarkModeToggle.js
"use client";
import { useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark", !darkMode); // Toggle dark class on body
  };

  return (
    <button onClick={toggleDarkMode} className="mr-4">
      {darkMode ? (
        <span role="img" aria-label="Light Mode">
          ☀️
        </span>
      ) : (
        <span role="img" aria-label="Dark Mode">
          🌙
        </span>
      )}
    </button>
  );
}
