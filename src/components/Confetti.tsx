import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  shape: 'square' | 'circle' | 'triangle';
}

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
}

export function Confetti({ isActive, duration = 3000 }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const colors = [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // amber
    '#EF4444', // red
    '#8B5CF6', // purple
    '#F97316', // orange
    '#06B6D4', // cyan
    '#84CC16', // lime
  ];

  const shapes: ('square' | 'circle' | 'triangle')[] = ['square', 'circle', 'triangle'];

  useEffect(() => {
    if (isActive) {
      const newPieces: ConfettiPiece[] = [];
      
      // Create 80 confetti pieces spread across the entire screen
      for (let i = 0; i < 80; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * 100, // Full width distribution
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 2000, // 0-2s delay for staggered effect
          duration: 3000 + Math.random() * 3000, // 3-6s duration
          size: 6 + Math.random() * 10, // 6-16px varied sizes
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        });
      }
      
      setPieces(newPieces);

      // Clear confetti after duration
      const timeout = setTimeout(() => {
        setPieces([]);
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [isActive, duration]);

  if (!isActive || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: '-20px',
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
          }}
          initial={{ 
            y: -20, 
            rotate: 0,
            opacity: 1,
            scale: 1
          }}
          animate={{ 
            y: window.innerHeight + 20,
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            opacity: [1, 1, 0.7, 0],
            scale: [1, 1.2, 0.8, 0.6],
            x: [-20 + Math.random() * 40, 20 - Math.random() * 40, -10 + Math.random() * 20]
          }}
          transition={{
            duration: piece.duration / 1000,
            delay: piece.delay / 1000,
            ease: "easeIn",
            times: [0, 0.1, 0.7, 1]
          }}
          className={`
            ${piece.shape === 'circle' ? 'rounded-full' : ''}
            ${piece.shape === 'triangle' ? 'clip-triangle' : ''}
            ${piece.shape === 'square' ? 'rounded-sm' : ''}
          `}
        />
      ))}
      
      {/* Add some sparkles */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-yellow-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 30}%`,
            fontSize: `${12 + Math.random() * 8}px`,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 1000 / 1000,
            ease: "easeOut",
            times: [0, 0.2, 0.8, 1]
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}