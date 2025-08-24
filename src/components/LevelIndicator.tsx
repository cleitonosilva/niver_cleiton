import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface LevelIndicatorProps {
  value: number;
  maxValue: number;
  label: string;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  icon?: React.ReactNode;
}

export function LevelIndicator({ value, maxValue, label, color = 'blue', icon }: LevelIndicatorProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setAnimatedValue(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = (animatedValue / maxValue) * 100;
  const circumference = 2 * Math.PI * 45; // raio de 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colors = {
    blue: {
      primary: '#3B82F6',
      secondary: '#93C5FD',
      bg: '#DBEAFE'
    },
    green: {
      primary: '#10B981',
      secondary: '#6EE7B7', 
      bg: '#D1FAE5'
    },
    purple: {
      primary: '#8B5CF6',
      secondary: '#C4B5FD',
      bg: '#EDE9FE'
    },
    orange: {
      primary: '#F59E0B',
      secondary: '#FCD34D',
      bg: '#FEF3C7'
    }
  };

  const currentColors = colors[color];

  return (
    <motion.div 
      className="flex flex-col items-center space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Circular Progress */}
      <div className="relative">
        <svg
          className="w-32 h-32 transform -rotate-90"
          viewBox="0 0 100 100"
        >
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Progress Circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={`url(#gradient-${color})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: strokeDashoffset }}
            transition={{ 
              duration: 2,
              ease: "easeOut",
              delay: 0.5
            }}
          />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentColors.secondary} />
              <stop offset="100%" stopColor={currentColors.primary} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {icon && (
            <motion.div
              className="mb-1"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {icon}
            </motion.div>
          )}
          
          <motion.div
            className="text-2xl font-bold"
            style={{ color: currentColors.primary }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 1.5,
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
          >
            {Math.round(animatedValue)}%
          </motion.div>
        </div>
        
        {/* Pulse Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: currentColors.bg }}
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Label */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <h3 className="font-semibold text-gray-700 text-lg">
          {label}
        </h3>
        
        {/* Progress Bar */}
        <div className="w-24 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: currentColors.primary }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ 
              duration: 2,
              ease: "easeOut",
              delay: 0.8
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}