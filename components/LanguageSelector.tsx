
'use client';

import { useState, useEffect } from 'react';
import { languages, getTranslation } from '../lib/languages';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  className?: string;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange, className = '' }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={`language-selector relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white hover:bg-white/20 transition-all duration-300"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="font-medium">{currentLang.nativeName}</span>
        <i className={`fas fa-chevron-down text-sm transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 min-w-[280px]">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <h3 className="font-semibold text-sm">{getTranslation('selectLanguage', currentLanguage)}</h3>
            <p className="text-xs opacity-90">Choose your preferred language</p>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  onLanguageChange(language.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  currentLanguage === language.code ? 'bg-purple-50 border-r-4 border-purple-500' : ''
                }`}
              >
                <span className="text-xl">{language.flag}</span>
                <div className="flex-1">
                  <div className={`font-medium ${currentLanguage === language.code ? 'text-purple-700' : 'text-gray-900'}`}>
                    {language.nativeName}
                  </div>
                  <div className="text-sm text-gray-500">{language.name}</div>
                </div>
                {currentLanguage === language.code && (
                  <i className="fas fa-check text-purple-500"></i>
                )}
              </button>
            ))}
          </div>
          
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              <i className="fas fa-globe mr-1"></i>
              All 11 official South African languages supported
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
