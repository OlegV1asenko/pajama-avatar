"use client";

import React, { useState, useRef } from 'react'
import { Sparkles, Download, Upload, Share2, Palette, Camera, Check, Wand2 } from 'lucide-react'
import AvatarGenerator from './AvatarGenerator'

interface VibeExample {
  id: string
  name: string
  person: string
  emoji: string
  color: string
  bgGradient: string
  quote: string
  avatarSvg: string
}

const VIBE_EXAMPLES: VibeExample[] = [
  {
    id: 'cozy',
    name: 'Затишний',
    person: 'Софійка',
    emoji: '☕',
    color: '#D0C9FF',
    bgGradient: 'from-purple-100 to-indigo-50',
    quote: 'Тепле какао, улюблений плед та підтримка дітей!',
    avatarSvg: '👩‍🦰',
  },
  {
    id: 'energetic',
    name: 'Драйвовий',
    person: 'Максим',
    emoji: '⚡',
    color: '#FFBC0D',
    bgGradient: 'from-amber-100 to-yellow-50',
    quote: 'Піжама в офісі — це сміливо та заради добра!',
    avatarSvg: '👨‍🦱',
  },
  {
    id: 'dreamy',
    name: 'Мрійливий',
    person: 'Олена',
    emoji: '☁️',
    color: '#8EE7F8',
    bgGradient: 'from-cyan-100 to-blue-50',
    quote: 'Вірю, що кожна дитина має бути поруч із мамою.',
    avatarSvg: '👩',
  },
  {
    id: 'caring',
    name: 'Турботливий',
    person: 'Артем',
    emoji: '🧸',
    color: '#FF8A8A',
    bgGradient: 'from-rose-100 to-orange-50',
    quote: 'Будуємо Дім Надії разом з усією Україною.',
    avatarSvg: '🧔',
  },
]

const COLOR_OPTIONS = [
  { name: 'Сонячний жовтий', hex: '#FFBC0D' },
  { name: 'Ніжний аква', hex: '#8EE7F8' },
  { name: 'Лавандовий', hex: '#D0C9FF' },
  { name: 'Теплий рожевий', hex: '#FF9EAA' },
  { name: 'М’ятний затишок', hex: '#A8E6CF' },
  { name: 'Фірмовий червоний', hex: '#E31837' },
]

export const PajamaAvatarSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vibe' | 'ai'>('vibe')
  const [activeVibe, setActiveVibe] = useState<VibeExample>(VIBE_EXAMPLES[0])
  const [selectedColor, setSelectedColor] = useState<string>(COLOR_OPTIONS[0].hex)
  const [userUploadedPhoto, setUserUploadedPhoto] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setUserUploadedPhoto(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCopyHashtag = () => {
    navigator.clipboard.writeText('#ДеньПіжам #ДімРональдаМакДональда')
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2500)
  }

  const handleDownloadStory = () => {
    setIsDownloading(true)
    setTimeout(() => {
      const canvas = document.createElement('canvas')
      canvas.width = 600
      canvas.height = 900
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Gradient background
        const grad = ctx.createLinearGradient(0, 0, 0, 900)
        grad.addColorStop(0, '#FFF9EB')
        grad.addColorStop(1, selectedColor)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, 600, 900)

        // Header
        ctx.fillStyle = '#E31837'
        ctx.font = 'bold 36px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('#ДеньПіжам', 300, 100)

        ctx.fillStyle = '#1e293b'
        ctx.font = '22px sans-serif'
        ctx.fillText('13 листопада — одягни піжаму для підтримки!', 300, 150)

        // Center emoji
        ctx.font = '120px sans-serif'
        ctx.fillText(userUploadedPhoto ? '🧸' : activeVibe.avatarSvg, 300, 450)

        // Footer note
        ctx.fillStyle = '#0f172a'
        ctx.font = 'bold 24px sans-serif'
        ctx.fillText(`Вайб дня: ${activeVibe.name} ${activeVibe.emoji}`, 300, 620)

        ctx.fillStyle = '#475569'
        ctx.font = 'italic 18px sans-serif'
        ctx.fillText('Разом будуємо Дім для важкохворих діток', 300, 680)

        const link = document.createElement('a')
        link.download = `pajama-day-story-${activeVibe.id}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
      }
      setIsDownloading(false)
    }, 600)
  }

  return (
    <section id="online-pajama" className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF6EB] via-amber-50/50 to-[#FAF6EB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with exact text from PDF */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Інтерактивна примірочна</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            А ще – ти можеш створити свою піжаму онлайн!
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Так, як зробила <strong>Олена</strong>, <strong>Софійка</strong> чи <strong>Максим</strong>.
            А ми придумали для тебе декілька ідей для натхнення. Який вайб у тебе сьогодні?
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-amber-200 shadow-2xs mt-4">
            <button
              onClick={() => setActiveTab('vibe')}
              className={`
                px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2
                ${activeTab === 'vibe'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
                }
              `}
            >
              <span>✨ Ідеї для натхнення (Вайб)</span>
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`
                px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2
                ${activeTab === 'ai'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
                }
              `}
            >
              <Wand2 className="w-4 h-4" />
              <span>Повний AI-генератор аватара</span>
            </button>
          </div>
        </div>

        {activeTab === 'ai' ? (
          /* TAB 2: Full AI Generator */
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-200">
            <div className="text-center mb-6">
              <span className="text-xs font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                AI Magic
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                Завантаж фото — отримай digital-art аватар у повний зріст!
              </h3>
            </div>
            <AvatarGenerator />
          </div>
        ) : (
          /* TAB 1: Fast Vibe & Stories Customizer */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Vibe Picker & Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Vibe Cards Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  1. Оберіть свій вайб на сьогодні:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {VIBE_EXAMPLES.map((vibe) => (
                    <button
                      key={vibe.id}
                      onClick={() => {
                        setActiveVibe(vibe)
                        setSelectedColor(vibe.color)
                      }}
                      className={`
                        p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28
                        ${activeVibe.id === vibe.id
                          ? 'border-amber-500 bg-white shadow-md ring-2 ring-amber-300 scale-102'
                          : 'border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{vibe.emoji}</span>
                        <span className="text-[10px] font-bold text-slate-400">як {vibe.person}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-black text-slate-900 leading-tight">
                          {vibe.name}
                        </span>
                        <div 
                          className="w-3.5 h-3.5 rounded-full mt-1 border border-black/10"
                          style={{ backgroundColor: vibe.color }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pajama Color Palette */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-amber-600" />
                  <span>2. Оберіть колір онлайн-піжами:</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {COLOR_OPTIONS.map((col) => (
                    <button
                      key={col.hex}
                      onClick={() => setSelectedColor(col.hex)}
                      className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border
                        ${selectedColor === col.hex
                          ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }
                      `}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/10"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Upload Option */}
              <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Camera className="w-4 h-4 text-red-500" />
                    <span>3. Або завантажте власне фото у віртуальну рамку:</span>
                  </div>
                  {userUploadedPhoto && (
                    <button
                      onClick={() => setUserUploadedPhoto(null)}
                      className="text-[11px] text-red-600 font-bold hover:underline cursor-pointer"
                    >
                      Видалити фото
                    </button>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-amber-300 hover:border-amber-400 bg-amber-50/50 hover:bg-amber-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-600" />
                  <span>{userUploadedPhoto ? 'Замінити фото на інше' : 'Обрати своє фото з телефону або комп’ютера'}</span>
                </button>
              </div>

              {/* Social Share Callout */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-red-50/80 border border-red-200/70 text-xs">
                <div className="space-y-0.5">
                  <span className="font-black text-[#E31837] block">Хештег акції для Instagram & TikTok:</span>
                  <span className="font-bold text-slate-700">#ДеньПіжам #ДімРональдаМакДональда</span>
                </div>
                <button
                  onClick={handleCopyHashtag}
                  className="px-3 py-1.5 rounded-xl bg-white text-[#E31837] border border-red-300 font-black text-xs hover:bg-red-50 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Скопійовано!' : 'Копіювати'}</span>
                </button>
              </div>

            </div>

            {/* Right Column: Live Story Card Preview */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Попередній перегляд для СТОРІЗ
              </div>

              {/* The 9:16 Story Frame */}
              <div 
                ref={cardRef}
                className="w-full max-w-[320px] aspect-[9/15] rounded-3xl p-5 shadow-2xl border-4 border-white flex flex-col justify-between text-center relative overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: selectedColor,
                  backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.4) 0%, transparent 70%)',
                }}
              >
                {/* Story Top Badges */}
                <div className="flex items-center justify-between text-[11px] font-black text-slate-900 bg-white/80 backdrop-blur-sm py-1.5 px-3 rounded-full shadow-2xs">
                  <span>13 Листопада</span>
                  <span className="text-[#E31837]">#ДеньПіжам</span>
                </div>

                {/* Center Visual / Avatar */}
                <div className="my-auto py-4">
                  {userUploadedPhoto ? (
                    <div className="w-36 h-36 rounded-full mx-auto overflow-hidden border-4 border-white shadow-lg bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={userUploadedPhoto} 
                        alt="User avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-36 h-36 rounded-full mx-auto flex items-center justify-center bg-white/90 border-4 border-white shadow-lg text-6xl select-none">
                      {activeVibe.avatarSvg}
                    </div>
                  )}
                  
                  <div className="mt-4 bg-white/90 backdrop-blur-xs py-2 px-3.5 rounded-2xl shadow-xs inline-block max-w-[90%]">
                    <span className="text-xs font-black text-slate-900 block">
                      Вайб дня: {activeVibe.name} {activeVibe.emoji}
                    </span>
                    <span className="text-[10px] text-slate-600 italic block mt-0.5">
                      «{activeVibe.quote}»
                    </span>
                  </div>
                </div>

                {/* Story Footer */}
                <div className="bg-slate-950/85 backdrop-blur-sm text-white py-2 px-3 rounded-2xl text-[10px] font-bold space-y-0.5">
                  <span className="block text-amber-300">Дім Рональда МакДональда в Україні</span>
                  <span className="text-white/80">Одягаю піжаму заради підтримки діток ❤️</span>
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownloadStory}
                disabled={isDownloading}
                className="mt-5 w-full max-w-[320px] py-3 px-5 rounded-2xl bg-[#FFBC0D] hover:bg-[#E5A80B] text-slate-950 font-black text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? 'Зберігаємо картинку...' : 'Завантажити для Instagram Stories'}</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  )
}
