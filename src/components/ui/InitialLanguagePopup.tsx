import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Scale, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const InitialLanguagePopup: React.FC = () => {
  const { hasSelectedLanguage, confirmLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!hasSelectedLanguage) {
      setIsVisible(true);
    }
  }, [hasSelectedLanguage]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  if (hasSelectedLanguage && !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-light/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 300,
              delay: 0.1 
            }}
            className="relative w-full max-w-xl mx-4 overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
          >
            <div className="p-8 md:p-12">
              <div className="flex flex-col items-center text-center space-y-6">
                <motion.div 
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20"
                >
                  <Scale className="w-10 h-10 text-accent-foreground" />
                </motion.div>

                <div className="space-y-2">
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl font-display font-bold text-foreground"
                  >
                    Welcome / स्वागत आहे
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-muted-foreground text-lg"
                  >
                    Please select your preferred language
                    <br />
                    कृपया तुमची पसंतीची भाषा निवडा
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => {
                      setIsVisible(false);
                      setTimeout(() => confirmLanguage('en'), 300); // Wait for exit animation
                    }}
                    className="group relative flex flex-col items-start p-6 text-left rounded-2xl border-2 border-border hover:border-accent bg-background transition-all duration-300"
                  >
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-transition-colors duration-300">
                        <Globe className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </div>
                    <span className="text-xl font-bold text-foreground">English</span>
                    <span className="text-sm text-muted-foreground mt-1">Continue in English</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => {
                      setIsVisible(false);
                      setTimeout(() => confirmLanguage('mr'), 300); // Wait for exit animation
                    }}
                    className="group relative flex flex-col items-start p-6 text-left rounded-2xl border-2 border-border hover:border-accent bg-background transition-all duration-300"
                  >
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-transition-colors duration-300">
                        <span className="text-xl font-bold text-accent group-hover:text-white transition-colors">अ</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </div>
                    <span className="text-xl font-bold text-foreground">मराठी</span>
                    <span className="text-sm text-muted-foreground mt-1">मराठीत पुढे जा</span>
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="bg-muted/30 px-8 py-4 text-center border-t border-border">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                You can change this later in the settings
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLanguagePopup;
