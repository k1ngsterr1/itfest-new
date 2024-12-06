import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) // Automatically detect language via cookies/localStorage
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    fallbackLng: "en", // Default language
    supportedLngs: ["en", "ru"], // Supported languages
    ns: ["common_language"], // Translation namespaces
    defaultNS: "common_language",
    resources: {
      en: require("./locales/en/en.json"),
      ru: require("./locales/ru/ru.json"),
    },
    detection: {
      order: ["cookie", "localStorage", "navigator"], // Where to detect the language
      caches: ["cookie", "localStorage"], // Where to save the language
    },
  });

export default i18n;
