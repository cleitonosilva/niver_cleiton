import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Bike, Flag } from 'lucide-react';

interface ScrollProgressProps {
  onComplete?: () => void;
}

export function ScrollProgress({ onComplete }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const [isComplete, setIsComplete] = useState(false);
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calcular a posição da moto baseada na largura real da barra de progresso
  const bikePosition = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1]
  );

  // Detectar quando chegou ao final (95% para dar uma margem)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest >= 0.95 && !isComplete) {
        setIsComplete(true);
        onComplete?.();
      } else if (latest < 0.95 && isComplete) {
        setIsComplete(false);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isComplete, onComplete]);

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Motorcycle icon that moves with scroll */}
      <motion.div
        className="fixed top-4 z-50 pointer-events-none"
        style={{
          left: 0,
          x: useTransform(bikePosition, (value) => `${value * (window.innerWidth - 32)}px`)
        }}
      >
        <motion.div
          animate={{
            y: [0, -5, 0],
            rotate: [0, 2, 0, -2, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Bike className="w-8 h-8 text-blue-600 drop-shadow-lg" />
        </motion.div>
      </motion.div>

      {/* Finish Line Flag - appears when complete */}
      <motion.div
        className="fixed top-2 right-4 z-50 pointer-events-none"
        initial={{ opacity: 0, scale: 0, y: -20 }}
        animate={isComplete ? { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          rotate: [0, -10, 10, -5, 5, 0]
        } : { 
          opacity: 0, 
          scale: 0, 
          y: -20 
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25,
          rotate: {
            duration: 0.8,
            ease: "easeOut"
          }
        }}
      >
        <div className="relative">
          {/* Flag pole */}
          <div className="absolute left-1/2 top-0 w-0.5 h-12 bg-gray-600 transform -translate-x-1/2" />
          
          {/* Checkered flag */}
          <motion.div
            className="relative w-12 h-8 border border-gray-400 shadow-lg"
            animate={isComplete ? {
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Checkered pattern */}
            <div className="grid grid-cols-4 grid-rows-3 w-full h-full">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className={`${
                    (Math.floor(i / 4) + i) % 2 === 0 ? 'bg-black' : 'bg-white'
                  }`}
                />
              ))}
            </div>
            
            {/* Flag shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={isComplete ? {
                x: ['-100%', '100%']
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Flag celebration sparkles */}
          {isComplete && Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-400 pointer-events-none"
              style={{
                left: `${-10 + Math.random() * 60}px`,
                top: `${-10 + Math.random() * 40}px`,
                fontSize: '12px'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -20, -40],
                x: [0, (Math.random() - 0.5) * 30]
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              ⭐
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* "Parabéns!" text that appears with the flag */}
      <motion.div
        className="fixed top-16 right-4 z-50 pointer-events-none"
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={isComplete ? { 
          opacity: 1, 
          scale: 1, 
          y: 0 
        } : { 
          opacity: 0, 
          scale: 0, 
          y: 20 
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.3
        }}
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg border-2 border-white">
          🏁 Parabéns! 🏁
        </div>
      </motion.div>
    </>
  );
}