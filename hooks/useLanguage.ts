
'use client';

import { useState, useEffect } from 'react';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('shecare-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
    // Save language preference to localStorage
    localStorage.setItem('shecare-language', language);
  };

  return {
    currentLanguage,
    changeLanguage,
  };
};
