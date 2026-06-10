import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import ar from '../locales/ar.json';
import en from '../locales/en.json';

type Language = 'ar' | 'en';
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
  toggleLanguage: () => void;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('lang') as Language) || 'en';
  });

  const translations: Record<Language, Translations> = { ar, en };

  useEffect(() => {
    localStorage.setItem('lang', language);
    // تغيير اتجاه الصفحة تلقائياً في الـ HTML
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  // دالة بسيطة لجلب النصوص بدعم الـ Nested Keys (مثل "hero.title")
  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = translations[language];
    for (const k of keys) {
      if (current[k] === undefined) return key;
      current = current[k];
    }
    return current;
  };

  const isRtl = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}