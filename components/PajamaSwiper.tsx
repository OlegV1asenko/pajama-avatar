"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import PajamaCard from "./PajamaCard";
import { PAJAMA_COLORS } from "@/lib/pajamaColors";

interface PajamaSwiperProps {
  imageUrl: string;
}

export default function PajamaSwiper({ imageUrl }: PajamaSwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-5, 5]);

  const goTo = (index: number) => {
    if (index < 0 || index >= PAJAMA_COLORS.length) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -60) goTo(activeIndex + 1);
    else if (info.offset.x > 60) goTo(activeIndex - 1);
  };

  const current = PAJAMA_COLORS[activeIndex];

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-6">
      {/* Swipe hint */}
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <span>←</span>
        <span>Свайпайте щоб змінити колір</span>
        <span>→</span>
      </div>

      {/* Main card with swipe gesture */}
      <div ref={constraintsRef} className="w-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.3}
            onDragEnd={handleDragEnd}
            style={{ x, rotate }}
            initial={{ opacity: 0, x: direction * 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -200 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="cursor-grab active:cursor-grabbing"
          >
            <PajamaCard
              color={current}
              imageUrl={imageUrl}
              isActive={true}
              onSelect={() => {}}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition-all"
        >
          ‹
        </button>

        {/* Dot indicators */}
        <div className="flex gap-1.5">
          {PAJAMA_COLORS.map((color, i) => (
            <button
              key={color.id}
              onClick={() => goTo(i)}
              className={`
                rounded-full transition-all duration-200
                ${i === activeIndex ? "w-6 h-3" : "w-3 h-3"}
              `}
              style={{
                backgroundColor: i === activeIndex ? color.hex : "#d1d5db",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === PAJAMA_COLORS.length - 1}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition-all"
        >
          ›
        </button>
      </div>

      {/* Color name display */}
      <motion.div
        key={current.nameUk}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full"
        style={{ backgroundColor: current.bgColor }}
      >
        <div
          className="w-4 h-4 rounded-full border border-white/50 shadow-sm"
          style={{ backgroundColor: current.hex }}
        />
        <span className="text-sm font-semibold text-gray-700">
          Піжама: {current.nameUk}
        </span>
      </motion.div>

      {/* Color grid for quick pick */}
      <div className="w-full">
        <p className="text-xs text-gray-400 text-center mb-2">Швидкий вибір:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {PAJAMA_COLORS.map((color, i) => (
            <button
              key={color.id}
              onClick={() => goTo(i)}
              title={color.nameUk}
              className={`
                w-8 h-8 rounded-full border-2 transition-all
                ${i === activeIndex ? "border-gray-800 scale-125" : "border-white shadow hover:scale-110"}
              `}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
