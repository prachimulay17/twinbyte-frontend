import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, translations } from "@/i18n/translations";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isDark: boolean;
  toggleTheme: () => void;
  isSimpleMode: boolean;
  toggleSimpleMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem("satya-lang") as Language) || "en";
  });
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("satya-theme") === "dark";
  });
  const [isSimpleMode, setIsSimpleMode] = useState(() => {
    return localStorage.getItem("satya-simple") === "true";
  });

  useEffect(() => {
    localStorage.setItem("satya-lang", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("satya-theme", isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("satya-simple", String(isSimpleMode));
  }, [isSimpleMode]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const toggleTheme = () => setIsDark((d) => !d);
  const toggleSimpleMode = () => setIsSimpleMode((s) => !s);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, t, isDark, toggleTheme, isSimpleMode, toggleSimpleMode }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
