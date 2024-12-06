"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../i18n";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // First check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    
    // Then check localStorage
    const savedLanguage = localStorage.getItem("language");
    
    // Use URL lang if available, otherwise use saved language, fallback to 'en'
    const languageToUse = urlLang || savedLanguage || "en";
    
    // Save the language to localStorage
    localStorage.setItem("language", languageToUse);
    
    // Change language if different from current
    if (i18n.language !== languageToUse) {
      i18n.changeLanguage(languageToUse);
    }
    
    // Clean up URL if it has lang parameter
    if (urlLang) {
      urlParams.delete('lang');
      const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
      window.history.replaceState({}, '', newUrl);
    }
  }, [i18n]);

  return <>{children}</>;
}
