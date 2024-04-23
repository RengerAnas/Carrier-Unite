import english from "./locales/en/english.json";
import french from "./locales/fr/french.json";
import dutch from "./locales/dt/dutch.json";
import italian from "./locales/it/italian.json";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

export const defaultNS = "ns1";
export const resources = {
  en: { ns1: english },
  fr: { ns1: french },
  dt: { ns1: dutch },
  it: { ns1: italian },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "en",
  defaultNS,
  resources,
});

export default i18next;
