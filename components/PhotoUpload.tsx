"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PhotoUploadProps {
  onPhotoSelected: (file: File, preview: string) => void;
}

export default function PhotoUpload({ onPhotoSelected }: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPreview(dataUrl);
        onPhotoSelected(file, dataUrl);
      };
      reader.readAsDataURL(file);
    },
    [onPhotoSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Your photo"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <button
              onClick={() => setPreview(null)}
              className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow transition-all"
            >
              ✕
            </button>
            <div className="absolute bottom-4 left-4 text-white text-sm font-medium">
              ✅ Фото завантажено
            </div>
          </motion.div>
        ) : (
          <motion.label
            key="dropzone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            htmlFor="photo-input"
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`
              flex flex-col items-center justify-center gap-4
              w-full h-64 rounded-3xl border-2 border-dashed cursor-pointer
              transition-all duration-200
              ${isDragging
                ? "border-violet-500 bg-violet-50 scale-105"
                : "border-gray-300 bg-gray-50 hover:border-violet-400 hover:bg-violet-50"
              }
            `}
          >
            <div className="text-5xl">📸</div>
            <div className="text-center px-4">
              <p className="text-gray-700 font-semibold text-lg">
                Завантажте своє фото
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Перетягніть сюди або натисніть для вибору
              </p>
              <p className="text-gray-400 text-xs mt-2">
                JPG, PNG, WEBP · до 10 МБ
              </p>
            </div>
            <input
              id="photo-input"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="sr-only"
            />
          </motion.label>
        )}
      </AnimatePresence>
    </div>
  );
}
