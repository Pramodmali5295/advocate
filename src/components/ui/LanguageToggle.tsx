import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage } from '@/context/LanguageContext';
import { Languages } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { currentLanguage, changeLanguage, isMarathi } = useLanguage();

  const handleLanguageToggle = () => {
    const newLanguage = isMarathi ? 'en' : 'mr';
    changeLanguage(newLanguage);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLanguageToggle}
          className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
        >
          <Languages className="h-4 w-4" />
          <span className="font-medium">
            {isMarathi ? 'English' : 'मराठी'}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          {isMarathi 
            ? 'Switch to English' 
            : 'Switch to Marathi / मराठीत बदला'
          }
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

export default LanguageToggle;