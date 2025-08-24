import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface SpeedometerProps {
  value: number;
  maxValue: number;
  label: string;
}

export function Speedometer({ value, maxValue, label }: SpeedometerProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = (animatedValue / maxValue) * 100;
  // Arco de 180°: -90° (esquerda) a +90° (direita)
  const needleRotation = (percentage / 100) * 180 - 90;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-20 mb-4">
        {/* Container SVG do velocímetro */}
        <svg
          viewBox="0 0 200 120"
          className="w-full h-full"
        >
          {/* Arco de fundo */}
          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
            strokeLinecap="round"
          />
          
          {/* Arco de progresso animado */}
          <motion.path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="220"
            initial={{ strokeDashoffset: 220 }}
            animate={{ 
              strokeDashoffset: 220 - (percentage / 100) * 220
            }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Definição do gradiente */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>

          {/* Marcações no velocímetro */}
          {Array.from({ length: 5 }, (_, i) => {
            const angle = -90 + (i * 45); // De -90° a +90° em 5 marcações
            const radian = (angle * Math.PI) / 180;
            const x1 = 100 + 65 * Math.cos(radian);
            const y1 = 100 + 65 * Math.sin(radian);
            const x2 = 100 + 75 * Math.cos(radian);
            const y2 = 100 + 75 * Math.sin(radian);
            
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#9ca3af"
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}

          {/* Centro do velocímetro */}
          <circle cx="100" cy="100" r="4" fill="#374151" />
          
          {/* Ponteiro */}
          <motion.line
            x1="100"
            y1="100"
            x2="100"
            y2="45"
            stroke="#ef4444"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ rotate: -90 }}
            animate={{ rotate: needleRotation }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{ 
              transformOrigin: "100px 100px"
            }}
          />
        </svg>
      </div>

      {/* Valores e labels */}
      <div className="text-center">
        <motion.div
          className="text-2xl font-bold text-blue-600 mb-1"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {Math.round(animatedValue)}%
        </motion.div>
        <div className="text-sm text-gray-600 font-medium">
          {label}
        </div>
      </div>
    </div>
  );
}