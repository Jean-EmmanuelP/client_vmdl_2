"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ARTICLE_LOCALES, LangueCode } from "./i18n";

interface Ctx {
  lang: LangueCode;
  setLang: (l: LangueCode) => void;
}

const LangCtx = createContext<Ctx>({
  lang: "FR",
  setLang: () => {},
});

const STORAGE_KEY = "vmdl_lang";

function detectBrowserLang(): LangueCode {
  if (typeof window === "undefined") return "FR";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && (ARTICLE_LOCALES as string[]).includes(stored)) {
    return stored as LangueCode;
  }
  const browser = (navigator.language || "fr").slice(0, 2).toLowerCase();
  const map: Record<string, LangueCode> = {
    fr: "FR",
    en: "EN",
    it: "IT",
    es: "ES",
    ar: "عربي",
    pt: "PT",
    de: "DE",
    zh: "中文",
  };
  return map[browser] || "FR";
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangueCode>("FR");

  useEffect(() => {
    setLangState(detectBrowserLang());
  }, []);

  const setLang = (l: LangueCode) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
      // Update <html lang> attribute reactively
      document.documentElement.setAttribute("lang", l);
      document.documentElement.setAttribute(
        "dir",
        l === "عربي" ? "rtl" : "ltr"
      );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute(
        "dir",
        lang === "عربي" ? "rtl" : "ltr"
      );
    }
  }, [lang]);

  return (
    <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>
  );
}

export function useLang() {
  return useContext(LangCtx);
}
