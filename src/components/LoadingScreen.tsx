import React from 'react';
import { motion } from 'motion/react';
import { Wallet } from 'lucide-react';

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1.1, 1],
          opacity: 1,
          rotate: [0, 0, 10, -10, 0]
        }}
        transition={{ 
          duration: 1.5,
          times: [0, 0.4, 0.6, 0.8, 1],
          ease: "easeInOut",
          repeat: Infinity
        }}
        className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center text-white mb-6 shadow-2xl"
      >
        <Wallet size={40} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Expense Buddy</h1>
        <div className="flex gap-1 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-2 h-2 bg-gray-400 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
