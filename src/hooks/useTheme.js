import { useState, useEffect } from "react";

function getInitialTheme() {
  const savedTheme = localStorage.getItem("theme");
  switch (savedTheme) {
    case "dark":
      return true;
    case "light":
      return false;
    default:
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
}

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme());

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return { dark: isDarkMode, toggle: toggleTheme };
}
