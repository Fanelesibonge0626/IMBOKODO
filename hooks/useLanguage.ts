
'use client';

import { useState, useEffect } from 'react';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('healthyher-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      const supportedLanguages = ['en', 'zu', 'xh', 'af', 'st', 'tn', 'ss', 've', 'ts', 'nr', 'nso'];
      if (supportedLanguages.includes(browserLang)) {
        setCurrentLanguage(browserLang);
      }
    }
  }, []);

  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('healthyher-language', language);
  };

  return {
    currentLanguage,
    changeLanguage
  };
};
