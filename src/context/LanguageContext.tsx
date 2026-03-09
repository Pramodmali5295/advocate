import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  isMarathi: boolean;
  hasSelectedLanguage: boolean;
  confirmLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language || 'en');
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState<boolean>(() => {
    return localStorage.getItem('language-selected') === 'true';
  });

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
    localStorage.setItem('language-selected', 'true');
    setHasSelectedLanguage(true);
  };

  const confirmLanguage = (language: string) => {
    changeLanguage(language);
    localStorage.setItem('language-selected', 'true');
    setHasSelectedLanguage(true);
  };

  const isMarathi = currentLanguage === 'mr';

  const value = {
    currentLanguage,
    changeLanguage,
    isMarathi,
    hasSelectedLanguage,
    confirmLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};