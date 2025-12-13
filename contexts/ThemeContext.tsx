import React, { createContext, ReactNode, useContext, useState } from "react";

type Language = "en" | "si" | "ta";

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  colors: {
    background: string;
    cardBackground: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    headerBg: string;
    inputBg: string;
    divider: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>("en");

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const colors = darkMode
    ? {
        background: "#121212",
        cardBackground: "#1e1e1e",
        text: "#ffffff",
        textSecondary: "#b0b0b0",
        border: "#333333",
        primary: "#E53935",
        headerBg: "#1e1e1e",
        inputBg: "#2a2a2a",
        divider: "#333333",
      }
    : {
        background: "#f5f5f5",
        cardBackground: "#ffffff",
        text: "#333333",
        textSecondary: "#666666",
        border: "#e0e0e0",
        primary: "#E53935",
        headerBg: "#ffffff",
        inputBg: "#fafafa",
        divider: "#eeeeee",
      };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, language, setLanguage, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
