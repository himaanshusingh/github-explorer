import { useState, useEffect } from "react";

/**
 * Helper Function: getInitialTheme
 * Checks if the user previously saved a theme in localStorage.
 * If not, checks if their computer's system settings prefer dark mode.
 */
function getInitialTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    return true; // Use the explicitly saved dark mode
  } else if (savedTheme === "light") {
    return false; // Use the explicitly saved light mode
  } else {
    // If they haven't saved anything, check their computer's settings!
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
}

/**
 * Custom Hook: useTheme
 * Purpose: Manages the dark/light mode toggle.
 */
export function useTheme() {
  // State to track if dark mode is active (true = dark mode, false = light mode)
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme());

  // Effect: Every time `isDarkMode` changes, update the actual HTML DOM and LocalStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // A standalone function to toggle the theme
  const toggleTheme = () => {
    // We pass a function to the state setter so we always get the most recent previous value
    setIsDarkMode((prevMode) => !prevMode);
  };

  // We return the state variable and the utility function in an object
  return {
    dark: isDarkMode,
    toggle: toggleTheme,
  };
}
