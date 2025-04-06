import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const getNestedTranslation = (obj, path) => {
  try {
    return path.split('.').reduce((acc, part) => {
      if (acc === undefined || acc === null) return undefined;
      return acc[part];
    }, obj);
  } catch (error) {
    console.error(`Translation error for key: ${path}`, error);
    return path; // Return the path as fallback
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get the language from localStorage, default to 'en'
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    // Save language selection to localStorage whenever it changes
    localStorage.setItem('language', language);
  }, [language]);

  const translate = (key) => {
    const parts = key.split('.');
    let value = language === 'en' ? translations.en : translations.mr;
    
    try {
      for (const part of parts) {
        value = value[part];
        if (value === undefined) {
          console.warn(`Translation key part not found: ${part} in ${key}`);
          return key;
        }
      }
      return value;
    } catch (error) {
      console.warn(`Error translating: ${key}`, error);
      return key;
    }
  };

  const getPageTitle = (titleKey) => {
    return `${translate(titleKey)} - ${translate('common.locations.sangli')}`;
  };

  const value = {
    language,
    setLanguage,
    translate,
    getPageTitle
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 