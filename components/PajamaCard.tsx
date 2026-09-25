"use client";

import { motion } from "framer-motion";
import type { PajamaColor } from "@/lib/pajamaColors";

interface PajamaCardProps {
  color: PajamaColor;
  imageUrl: string;
  isActive: boolean;
  onSelect: () => void;
}

export default function PajamaCard({
  color,
  imageUrl,
  isActive,
  onSelect,
}: PajamaCardProps) {

  const handleDownload = () => {
    const link = document.createElement("a");
    // Create a canvas to apply the filter and export
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.filter = color.filter;
      ctx.drawImage(img, 0, 0);
      link.href = canvas.toDataURL("image/png");
      link.download = `pajama-avatar-${color.nameUk.toLowerCase()}.png`;
      link.click();
    };
    img.src = imageUrl;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        relative flex flex-col items-center rounded-3xl overflow-hidden
        shadow-lg transition-all duration-300 cursor-pointer
        ${isActive ? "ring-4 ring-violet-500 scale-105" : "hover:scale-102"}
      `}
      style={{ backgroundColor: color.bgColor }}
      onClick={onSelect}
    >
      {/* Avatar with CSS color filter */}
      <div className="w-full aspect-[2/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`Avatar in ${color.nameUk} pajama`}
          className="w-full h-full object-cover transition-all duration-500"
          style={{ filter: color.filter }}
        />
      </div>

      {/* Color label */}
      <div className="w-full px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: color.hex }}
          />
          <span className="text-sm font-semibold text-gray-700">
            {color.nameUk}
          </span>
        </div>
        {isActive && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-violet-600 text-lg"
          >
            ✓
          </motion.span>
        )}
      </div>

      {/* Download button (visible on active card) */}
      {isActive && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={(e) => { e.stopPropagation(); handleDownload(); }}
          className="mb-3 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold rounded-full transition-colors shadow-md"
        >
          ⬇️ Завантажити
        </motion.button>
      )}
    </motion.div>
  );
}
