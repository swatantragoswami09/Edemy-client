// DarkModeContext.js

import React, { createContext, useState, useEffect, Children } from "react";
import { ConfigProvider, theme } from "antd";

export const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  // useEffect to get saved theme state from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("isDarkMode");
    setIsDarkMode(savedDarkMode === "true");
  }, []);

  // useEffect to save theme state in localStorage
  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
