import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    supportedLngs: ["en", "ru", "kz"],
    ns: ["common_language"],
    defaultNS: "common_language",
    resources: {
      en: require("./locales/en/en.json"),
      ru: require("./locales/ru/ru.json"),
      kz: require("./locales/kz/kz.json"),
    },
  });

export default i18n;
