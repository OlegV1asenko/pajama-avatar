"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhotoUpload from "./PhotoUpload";
import LoadingAnimation from "./LoadingAnimation";
import PajamaSwiper from "./PajamaSwiper";
import type { Gender } from "@/lib/promptBuilder";

type Step = "upload" | "configure" | "loading" | "result" | "error";

export default function AvatarGenerator() {
  const [step, setStep] = useState<Step>("upload");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [gender, setGender] = useState<Gender>("person");
  const [avatarBase64, setAvatarBase64] = useState<string | null>(null);
  const [avatarMime, setAvatarMime] = useState<string>("image/jpeg");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [retryCount, setRetryCount] = useState(0);

  const handlePhotoSelected = useCallback((file: File, preview: string) => {
    setPhotoFile(file);
    setPhotoPreview(preview);
    setStep("configure");
  }, []);

  const handleGenerate = async () => {
    setStep("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gender, pajamaColor: "light blue" }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.retryable && retryCount < 3) {
          // HF model is loading (cold start) — retry after 25 seconds
          setRetryCount((c) => c + 1);
          await new Promise((r) => setTimeout(r, 25000));
          return handleGenerate();
        }
        throw new Error(data.error || "Generation failed");
      }

      setAvatarBase64(data.imageBase64);
      setAvatarMime(data.mimeType || "image/jpeg");
      setStep("result");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Невідома помилка";
      setErrorMessage(msg);
      setStep("error");
    }
  };

  const handleReset = () => {
    setStep("upload");
    setPhotoFile(null);
    setPhotoPreview(null);
    setAvatarBase64(null);
    setRetryCount(0);
    setErrorMessage("");
  };

  return (
    <AnimatePresence mode="wait">
      {/* STEP 1: Upload */}
      {step === "upload" && (
        <motion.div
          key="upload"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <PhotoUpload onPhotoSelected={handlePhotoSelected} />
        </motion.div>
      )}

      {/* STEP 2: Configure */}
      {step === "configure" && (
        <motion.div
          key="configure"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto"
        >
          {/* Photo preview thumbnail */}
          {photoPreview && (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoPreview}
                alt="Your photo"
                className="w-24 h-24 rounded-2xl object-cover shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs">
                ✓
              </div>
            </div>
          )}

          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">Майже готово! 🎉</h2>
            <p className="text-gray-500 text-sm mt-1">
              Оберіть ваш аватар
            </p>
          </div>

          {/* Gender selector */}
          <div className="w-full">
            <p className="text-sm font-medium text-gray-600 mb-2 text-center">
              Хто на фото?
            </p>
            <div className="flex gap-3 justify-center">
              {(["woman", "man", "person"] as Gender[]).map((g) => {
                const labels = { woman: "Жінка 👩", man: "Чоловік 👨", person: "Не важливо 🧑" };
                return (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`
                      px-4 py-2 rounded-2xl text-sm font-medium border-2 transition-all
                      ${gender === g
                        ? "border-violet-500 bg-violet-50 text-violet-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-violet-300"
                      }
                    `}
                  >
                    {labels[g]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGenerate}
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-lg shadow-violet-200 transition-all"
          >
            🪄 Створити аватар
          </motion.button>

          <button
            onClick={() => setStep("upload")}
            className="text-gray-400 text-sm hover:text-gray-600 transition-colors"
          >
            ← Вибрати інше фото
          </button>
        </motion.div>
      )}

      {/* STEP 3: Loading */}
      {step === "loading" && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoadingAnimation />
        </motion.div>
      )}

      {/* STEP 4: Result */}
      {step === "result" && avatarBase64 && (
        <motion.div
          key="result"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="w-full flex flex-col items-center gap-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Ваш аватар готовий! 🎉</h2>
            <p className="text-gray-500 text-sm mt-1">
              Свайпайте щоб змінити колір піжами
            </p>
          </div>

          <PajamaSwiper imageBase64={avatarBase64} mimeType={avatarMime} />

          <button
            onClick={handleReset}
            className="text-gray-400 text-sm hover:text-gray-600 transition-colors"
          >
            ← Спробувати з іншим фото
          </button>
        </motion.div>
      )}

      {/* STEP 5: Error */}
      {step === "error" && (
        <motion.div
          key="error"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center gap-4 text-center py-8"
        >
          <div className="text-6xl">😔</div>
          <h2 className="text-xl font-bold text-gray-800">Щось пішло не так</h2>
          <p className="text-gray-500 text-sm max-w-xs">{errorMessage}</p>
          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-2xl hover:bg-violet-700 transition-colors"
            >
              Спробувати ще раз
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 transition-colors"
            >
              Почати знову
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
