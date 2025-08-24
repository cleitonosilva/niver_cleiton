import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TimeUnit {
  value: number;
  label: string;
}

export function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Obter data atual em Lisboa (fuso horário Europe/Lisbon)
      const now = new Date();
      
      // Criar data atual no fuso horário de Lisboa
      const lisbonTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Lisbon"}));
      
      // Calcular diferença considerando o fuso horário de Lisboa
      const difference = +targetDate - +lisbonTime;
      
      // Debug: mostrar datas para verificação
      console.log('Data do evento:', targetDate.toLocaleString('pt-BR', { timeZone: 'Europe/Lisbon' }));
      console.log('Data atual em Lisboa:', lisbonTime.toLocaleString('pt-BR'));
      console.log('Diferença em ms:', difference);
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft([
          { value: days, label: 'Dias' },
          { value: hours, label: 'Horas' },
          { value: minutes, label: 'Min' },
          { value: seconds, label: 'Seg' }
        ]);
      } else {
        setTimeLeft([]);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.length === 0) {
    return (
      <motion.div 
        className="text-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <h3 className="text-2xl font-bold">🎉 Evento Hoje! 🎉</h3>
      </motion.div>
    );
  }

  return (
    <div className="flex justify-center space-x-4">
      {timeLeft.map((unit, index) => (
        <motion.div
          key={unit.label}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.div
            className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg p-4 shadow-lg min-w-[70px]"
            whileHover={{ 
              scale: 1.05,
              rotateY: 15,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            <motion.div
              className="text-2xl md:text-3xl font-bold"
              key={unit.value}
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {unit.value.toString().padStart(2, '0')}
            </motion.div>
            
            {/* Flip effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none" />
          </motion.div>
          
          <motion.p 
            className="text-sm text-gray-600 mt-2 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {unit.label}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
}