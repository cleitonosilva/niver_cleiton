import React from 'react';
import { motion } from 'motion/react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Party Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.3) 0%, transparent 30%),
            radial-gradient(circle at 40% 80%, rgba(245, 158, 11, 0.3) 0%, transparent 30%),
            radial-gradient(circle at 60% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 30%),
            radial-gradient(circle at 90% 70%, rgba(239, 68, 68, 0.3) 0%, transparent 30%)
          `
        }}
        animate={{
          backgroundPosition: [
            '20% 50%, 80% 20%, 40% 80%, 60% 30%, 90% 70%',
            '25% 60%, 70% 30%, 50% 70%, 70% 40%, 80% 80%',
            '15% 40%, 90% 10%, 30% 90%, 50% 20%, 95% 60%',
            '20% 50%, 80% 20%, 40% 80%, 60% 30%, 90% 70%'
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Birthday Elements */}
      {[
        { emoji: '🎈', delay: 0, x: 10, size: 'text-3xl' },
        { emoji: '🎉', delay: 2, x: 90, size: 'text-2xl' },
        { emoji: '🎂', delay: 4, x: 20, size: 'text-4xl' },
        { emoji: '🏍️', delay: 1, x: 80, size: 'text-3xl' },
        { emoji: '🎊', delay: 3, x: 60, size: 'text-2xl' },
        { emoji: '🍰', delay: 5, x: 40, size: 'text-3xl' },
        { emoji: '🎁', delay: 0.5, x: 70, size: 'text-2xl' },
        { emoji: '⭐', delay: 1.5, x: 30, size: 'text-xl' },
        { emoji: '🌟', delay: 2.5, x: 85, size: 'text-2xl' },
        { emoji: '🎵', delay: 3.5, x: 15, size: 'text-xl' },
        { emoji: '🏁', delay: 4.5, x: 75, size: 'text-3xl' },
        { emoji: '💨', delay: 1.2, x: 50, size: 'text-2xl' }
      ].map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.size} pointer-events-none opacity-40`}
          style={{ left: `${item.x}%`, top: '100%' }}
          animate={{
            y: [-50, -window.innerHeight - 100],
            x: [0, Math.sin(index) * 50, -Math.sin(index) * 30, 0],
            rotate: [0, 360, 720, 1080],
            scale: [0.8, 1.2, 0.9, 1.1, 0.8]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/30 via-purple-500/30 to-pink-500/30 blur-xl"
        animate={{
          scale: [1, 1.5, 1.2, 1],
          x: [0, 100, -50, 0],
          y: [0, 50, -30, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-24 h-24 rounded-full bg-gradient-to-r from-green-400/30 via-blue-500/30 to-purple-500/30 blur-xl"
        animate={{
          scale: [1.2, 1, 1.8, 1.2],
          x: [0, -80, 60, 0],
          y: [0, -40, 70, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div
        className="absolute bottom-40 left-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-yellow-400/30 via-orange-500/30 to-red-500/30 blur-xl"
        animate={{
          scale: [1, 1.3, 0.8, 1],
          x: [0, 120, -80, 0],
          y: [0, -60, 40, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Sparkle Effects */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-yellow-300 opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${8 + Math.random() * 6}px`
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.5, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Party Streamers */}
      <motion.div
        className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 via-red-500 via-yellow-500 to-green-500 opacity-30"
        animate={{
          scaleX: [1, 1.1, 0.9, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-yellow-500 via-red-500 via-pink-500 via-purple-500 to-blue-500 opacity-30"
        animate={{
          scaleX: [0.9, 1.1, 1, 0.9],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Confetti Background Elements */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`bg-confetti-${i}`}
          className="absolute w-2 h-2 opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: [
              '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
              '#8B5CF6', '#F97316', '#06B6D4', '#84CC16'
            ][Math.floor(Math.random() * 8)]
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
            rotate: [0, 180, 360],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}