"use client";

import { motion } from "framer-motion";

export default function LoadingAnimation() {
  const steps = [
    { icon: "🔍", text: "Аналізуємо ваше фото...", delay: 0 },
    { icon: "✏️", text: "Малюємо аватар...", delay: 4 },
    { icon: "👘", text: "Вдягаємо піжаму...", delay: 10 },
    { icon: "✨", text: "Додаємо деталі...", delay: 18 },
    { icon: "🎨", text: "Останні штрихи...", delay: 24 },
  ];

  return (
    <div className="flex flex-col items-center gap-8 py-10">
      {/* Animated pajama emoji */}
      <motion.div
        animate={{
          rotate: [0, -10, 10, -10, 0],
          scale: [1, 1.1, 1, 1.1, 1],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-8xl"
      >
        🧸
      </motion.div>

      {/* Pulsing ring */}
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-violet-300 rounded-full"
        />
        <div className="relative w-16 h-16 bg-violet-500 rounded-full flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 border-4 border-white border-t-transparent rounded-full"
          />
        </div>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: step.delay, duration: 0.5 }}
            className="flex items-center gap-3 text-sm text-gray-600"
          >
            <span className="text-xl">{step.icon}</span>
            <span>{step.text}</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: step.delay + 0.5 }}
              className="ml-auto text-violet-500"
            >
              ✓
            </motion.span>
          </motion.div>
        ))}
      </div>

      <p className="text-gray-400 text-xs text-center max-w-xs">
        AI генерує ваш аватар. Це займає ~20–40 секунд ☕
      </p>
    </div>
  );
}
