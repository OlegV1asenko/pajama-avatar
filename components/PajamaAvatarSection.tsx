"use client";

import React, { useState, useRef } from 'react'
import { Sparkles, Download, Upload, Share2, Palette, Camera, Check, Wand2, Copy, Heart, RefreshCw } from 'lucide-react'
import AvatarGenerator from './AvatarGenerator'

interface OfficialVibe {
  id: string
  title: string
  prompt: string
  tag: string
  badgeColor: string
  imageSrc: string
}

const OFFICIAL_VIBES: OfficialVibe[] = [
  {
    id: 'work',
    title: 'Робочий',
    prompt: 'Перевдягни мене в стильну піжаму й перенеси у вагон метро, де я їду на роботу з чашкою кави в руках. Навколо пасажири у звичайному одязі, а я в пухнастих капцях почуваюся так, ніби це найзвичайнісінький ранок.',
    tag: 'В метро з кавою',
    badgeColor: '#1B43B2',
    imageSrc: '/events/03_metro.png',
  },
  {
    id: 'school',
    title: 'Шкільний',
    prompt: 'Перевдягни мене в яскраву піжаму і перенеси в шкільний клас, де всі учні теж у різнокольорових піжамах. Я стою біля дошки з дуже серйозним виглядом і пояснюю математику величезному плюшевому ведмедю у піжамі.',
    tag: 'Урок з ведмедем',
    badgeColor: '#9CD83E',
    imageSrc: '/events/04_dity_klas-768x432.png',
  },
  {
    id: 'hero',
    title: 'Героїчний',
    prompt: 'Перевдягни мене в супергеройську піжаму з плащем і перенеси на дах хмарочоса, де я однією рукою тримаю величезну будівлю, а іншою — чашку кави. Унизу офісні працівники в піжамах захоплено аплодують мені за порятунок світу від понеділка.',
    tag: 'Порятунок світу',
    badgeColor: '#FF6E0D',
    imageSrc: '/events/07_supermarket-2-768x432.png',
  },
  {
    id: 'book',
    title: 'Який ти герой книжки?',
    prompt: 'Перетвори мене на піжамну версію одного з найвідоміших героїв світової літератури! Обери популярного книжкового персонажа з урахуванням моїх вподобань — з фентезі, романтики, пригодницької літератури або класики. Перенеси у фантастичний світ цієї книжки.',
    tag: 'Книжковий герой',
    badgeColor: '#91187D',
    imageSrc: '/events/05_narada-768x432.png',
  },
  {
    id: 'pink',
    title: 'Рожевий',
    prompt: 'Рожева піжама, рожевий єдиноріг, рожевий замок! Я лечу крізь хмаринки на чарівному єдинорозі в рожевій піжамі. Казкова атмосфера, яскраві деталі, ніжне сяйво та максимум wow-ефекту. Вертикальна фентезі-ілюстрація в сучасному напівреалістичному стилі.',
    tag: 'Чарівний єдиноріг',
    badgeColor: '#CC3366',
    imageSrc: '/events/09_rodyna-768x432.png',
  },
  {
    id: 'surprise',
    title: 'Здивуй мене',
    prompt: 'Перевдягни мене в найнезвичайнішу піжаму, яку тільки можна уявити! Експериментуй із кольорами, принтами та кумедними деталями — створи такий несподіваний і веселий образ, щоб я сама себе не впізнала! Збережи мою зовнішність.',
    tag: 'Несподіваний образ',
    badgeColor: '#FFBC0D',
    imageSrc: '/events/03_metro.png',
  },
]

const GALLERY_PHOTOS = [
  {
    title: 'Родина в піжамах',
    src: '/events/09_rodyna-768x432.png',
    caption: 'Затишок для всієї сім’ї',
  },
  {
    title: 'Урок у піжамах',
    src: '/events/04_dity_klas-768x432.png',
    caption: 'Шкільний клас разом на підтримку дітей',
  },
  {
    title: 'Шопінг у піжамі',
    src: '/events/07_supermarket-2-768x432.png',
    caption: 'Сміливі та добрі вчинки щодня',
  },
  {
    title: 'Ділова нарада в піжамах',
    src: '/events/05_narada-768x432.png',
    caption: 'Корпоративна підтримка та солідарність',
  },
]

const COLOR_OPTIONS = [
  { name: 'Сонячний жовтий', hex: '#FFBC0D' },
  { name: 'Ніжний аква', hex: '#8EE7F8' },
  { name: 'Лавандовий', hex: '#D0C9FF' },
  { name: 'Теплий рожевий', hex: '#FF9EAA' },
  { name: 'М’ятний затишок', hex: '#9CD83E' },
  { name: 'Фірмовий червоний', hex: '#DB0007' },
]

export const PajamaAvatarSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inspiration' | 'generator'>('inspiration')
  const [copiedVibeId, setCopiedVibeId] = useState<string | null>(null)
  const [selectedVibe, setSelectedVibe] = useState<OfficialVibe>(OFFICIAL_VIBES[0])
  const [selectedColor, setSelectedColor] = useState<string>(COLOR_OPTIONS[0].hex)
  const [userUploadedPhoto, setUserUploadedPhoto] = useState<string | null>(null)
  const [isCopiedHashtag, setIsCopiedHashtag] = useState<boolean>(false)
  const [isDownloading, setIsDownloading] = useState<boolean>(false)

  const handleCopyPrompt = (vibe: OfficialVibe) => {
    navigator.clipboard.writeText(vibe.prompt)
    setCopiedVibeId(vibe.id)
    setTimeout(() => setCopiedVibeId(null), 2500)
  }

  const handleSelectForGeneration = (vibe: OfficialVibe) => {
    setSelectedVibe(vibe)
    setActiveTab('generator')
  }

  const handleCopyHashtag = () => {
    navigator.clipboard.writeText('#ДеньПіжам2026 #ДімРональдаМакДональда')
    setIsCopiedHashtag(true)
    setTimeout(() => setIsCopiedHashtag(false), 2500)
  }

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

  const handleDownloadStory = () => {
    setIsDownloading(true)
    setTimeout(() => {
      const canvas = document.createElement('canvas')
      canvas.width = 600
      canvas.height = 900
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const grad = ctx.createLinearGradient(0, 0, 0, 900)
        grad.addColorStop(0, '#FFFDE9')
        grad.addColorStop(1, selectedColor)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, 600, 900)

        // Header
        ctx.fillStyle = '#DB0007'
        ctx.font = 'bold 38px Raleway, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('#ДеньПіжам2026', 300, 100)

        ctx.fillStyle = '#1F2124'
        ctx.font = '500 22px Montserrat, sans-serif'
        ctx.fillText('13 листопада — одягни піжаму для підтримки!', 300, 150)

        // Center emoji or image representation
        ctx.font = '110px sans-serif'
        ctx.fillText('🧸✨', 300, 450)

        // Footer note
        ctx.fillStyle = '#1F2124'
        ctx.font = 'bold 26px Raleway, sans-serif'
        ctx.fillText(`Вайб дня: ${selectedVibe.title}`, 300, 620)

        ctx.fillStyle = '#4B5563'
        ctx.font = '18px Montserrat, sans-serif'
        ctx.fillText('Разом будуємо Дім для важкохворих діток', 300, 680)

        const link = document.createElement('a')
        link.download = `den-pizham-2026-${selectedVibe.id}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
      }
      setIsDownloading(false)
    }, 600)
  }

  return (
    <div id="online-pajama" className="w-full">
      
      {/* 1. GALLERY: А ще – ти можеш створити свою піжаму онлайн! */}
      <section className="py-16 sm:py-24 bg-[#FFFDE9] border-t border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D0C9FF]/60 text-[#1F2124] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#DB0007]" />
              <span>Онлайн-піжама до Дня Піжам 2026</span>
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1F2124] leading-tight font-raleway">
              А ще – ти можеш створити свою піжаму онлайн!
            </h2>
          </div>

          {/* 4 AI Photos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
            {GALLERY_PHOTOS.map((photo, idx) => (
              <div 
                key={idx}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-sm border border-amber-900/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-16/10 w-full overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-sm font-bold text-[#1F2124] leading-snug">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Official AI Disclaimer */}
          <div className="mt-8 text-center max-w-3xl mx-auto">
            <p className="text-xs text-slate-500 italic leading-relaxed">
              Ілюстрації створені за допомогою штучного інтелекту. Усі персонажі, події та ситуації є вигаданими, а будь-які збіги з реальними особами чи подіями — випадковими.
            </p>
          </div>

        </div>
      </section>

      {/* 2. INSPIRATION VIBES SECTION */}
      <section className="py-16 sm:py-24 bg-white border-y border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1F2124] leading-tight font-raleway">
              А ми придумали для тебе декілька ідей для натхнення. Який вайб у тебе сьогодні?
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto font-montserrat">
              Обирай одну з наших ідей або вигадуй свою! Завантаж фото в будь-який чат зі штучним інтелектом, додай промпт і ділися своїм піжамним образом у соцмережах з <strong>#ДеньПіжам2026</strong>
            </p>

            {/* Mode Switcher */}
            <div className="pt-2 flex justify-center">
              <div className="inline-flex p-1.5 rounded-xl bg-[#FFFDE9] border border-amber-300 shadow-2xs">
                <button
                  onClick={() => setActiveTab('inspiration')}
                  className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'inspiration'
                      ? 'bg-[#DB0007] text-[#FFFDE9] shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>6 ідей вайбу та промпти</span>
                </button>

                <button
                  onClick={() => setActiveTab('generator')}
                  className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'generator'
                      ? 'bg-[#DB0007] text-[#FFFDE9] shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Інтерактивна AI-студія</span>
                </button>
              </div>
            </div>
          </div>

          {activeTab === 'inspiration' ? (
            /* 6 Official Vibe Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {OFFICIAL_VIBES.map((vibe) => (
                <div
                  key={vibe.id}
                  className="bg-[#FFFDE9] rounded-2xl p-6 border border-amber-900/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    {/* Header with Title and Badge */}
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl sm:text-2xl font-black text-[#1F2124] font-raleway">
                        {vibe.title}
                      </h3>
                      <span 
                        className="text-[11px] font-bold px-3 py-1 rounded-full text-white shadow-2xs whitespace-nowrap"
                        style={{ backgroundColor: vibe.badgeColor }}
                      >
                        {vibe.tag}
                      </span>
                    </div>

                    {/* Vibe Prompt Text */}
                    <div className="p-4 rounded-xl bg-white border border-amber-200/80 text-sm text-slate-700 leading-relaxed font-montserrat shadow-2xs">
                      <p>{vibe.prompt}</p>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-2 flex items-center gap-2.5">
                    <button
                      onClick={() => handleCopyPrompt(vibe)}
                      className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs ${
                        copiedVibeId === vibe.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white hover:bg-amber-50 text-slate-800 border border-slate-300'
                      }`}
                      aria-label={`Копіювати промпт для ${vibe.title}`}
                    >
                      {copiedVibeId === vibe.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Скопійовано!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-500" />
                          <span>Скопіювати промпт</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleSelectForGeneration(vibe)}
                      className="py-3 px-4 rounded-lg bg-[#DB0007] hover:bg-[#91187D] text-[#FFFDE9] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs shrink-0"
                      title="Відкрити в AI-студії"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Приміряти</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* TAB 2: Interactive Avatar & Story Studio */
            <div className="max-w-4xl mx-auto bg-[#FFFDE9] rounded-3xl p-6 sm:p-10 border border-amber-900/10 shadow-lg space-y-8">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#DB0007] bg-red-100/80 px-3 py-1 rounded-full">
                  AI Студія Дня Піжам
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#1F2124] font-raleway">
                  Створити свій піжамний аватар або Stories онлайн
                </h3>
                <p className="text-sm text-slate-600 max-w-xl mx-auto">
                  Обрано вайб: <strong>«{selectedVibe.title}»</strong> ({selectedVibe.tag}).
                </p>
              </div>

              {/* Vibe fast pills */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {OFFICIAL_VIBES.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVibe(v)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedVibe.id === v.id
                        ? 'bg-[#DB0007] text-[#FFFDE9] shadow-xs'
                        : 'bg-white hover:bg-amber-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
                {/* Left: Customizer & Actions */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                      Колір фону для Stories:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {COLOR_OPTIONS.map((col) => (
                        <button
                          key={col.hex}
                          onClick={() => setSelectedColor(col.hex)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                            selectedColor === col.hex
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10"
                            style={{ backgroundColor: col.hex }}
                          />
                          <span>{col.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-amber-200 space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Промпт для генерації у ChatGPT / Midjourney / DALL-E:
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
                      {selectedVibe.prompt}
                    </p>
                    <button
                      onClick={() => handleCopyPrompt(selectedVibe)}
                      className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {copiedVibeId === selectedVibe.id ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Промпт успішно скопійовано!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Скопіювати промпт</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleDownloadStory}
                      disabled={isDownloading}
                      className="flex-1 py-3.5 px-5 rounded-lg bg-[#DB0007] hover:bg-[#91187D] text-[#FFFDE9] text-xs sm:text-sm font-bold shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isDownloading ? 'Створюємо Stories...' : 'Завантажити Stories для соцмереж'}</span>
                    </button>

                    <button
                      onClick={handleCopyHashtag}
                      className="py-3.5 px-4 rounded-lg bg-white hover:bg-amber-50 text-slate-800 text-xs sm:text-sm font-bold border border-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
                    >
                      {isCopiedHashtag ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Share2 className="w-4 h-4 text-slate-500" />
                      )}
                      <span>{isCopiedHashtag ? 'Хештег скопійовано!' : '#ДеньПіжам2026'}</span>
                    </button>
                  </div>
                </div>

                {/* Right: Live Preview Box */}
                <div className="flex justify-center">
                  <div 
                    className="w-full max-w-[280px] aspect-9/16 rounded-3xl p-6 shadow-xl border-4 border-white flex flex-col justify-between text-center relative overflow-hidden transition-all duration-300"
                    style={{
                      background: `linear-gradient(180deg, #FFFDE9 0%, ${selectedColor} 100%)`
                    }}
                  >
                    <div>
                      <span className="text-base font-black text-[#DB0007] font-raleway block">
                        #ДеньПіжам2026
                      </span>
                      <p className="text-[11px] text-[#1F2124] font-medium mt-1">
                        13 листопада — Всеукраїнський День Піжам
                      </p>
                    </div>

                    <div className="my-auto py-6">
                      <div className="text-6xl select-none mb-3">🧸✨</div>
                      <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-[11px] font-bold text-slate-900 shadow-2xs">
                        {selectedVibe.title}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-800 font-bold">
                        {selectedVibe.tag}
                      </p>
                      <p className="text-[9px] text-slate-600">
                        Дім Рональда МакДональда в Україні
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Social Hashtag Reminder Box */}
          <div className="mt-12 p-6 rounded-2xl bg-[#FFFDE9] border border-amber-900/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#DB0007] text-[#FFFDE9] flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1F2124] font-raleway">
                  Ділися світлиною з хештегом #ДеньПіжам2026
                </h4>
                <p className="text-xs text-slate-600 font-montserrat">
                  Публікуй свій образ у соцмережах та надихай колег і друзів підтримати дітей!
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyHashtag}
              className="py-2.5 px-5 rounded-lg bg-white hover:bg-amber-50 text-slate-800 font-bold text-xs border border-slate-300 transition-colors flex items-center gap-2 cursor-pointer shrink-0"
            >
              {isCopiedHashtag ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Скопійовано!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-slate-500" />
                  <span>Скопіювати #ДеньПіжам2026</span>
                </>
              )}
            </button>
          </div>

        </div>
      </section>

    </div>
  )
}
