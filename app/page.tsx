"use client";

import React, { useState } from 'react'
import {
  Heart,
  Sparkles,
  ShoppingBag,
  Gift,
  Home,
  Users,
  HelpCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { PajamaShopModal, ShopItem } from '@/components/PajamaShopModal'
import { PajamaRulesModal } from '@/components/PajamaRulesModal'
import { PajamaDonateModal } from '@/components/PajamaDonateModal'
import { PajamaAvatarSection } from '@/components/PajamaAvatarSection'
import { useCart } from '@/lib/CartContext'
import { CartDrawer } from '@/components/CartDrawer'
import { AddToCartModal } from '@/components/AddToCartModal'

const MERCH_ITEMS: ShopItem[] = [
  {
    id: 'shopper-300',
    name: 'Шопер без підкладки',
    description: 'Місткий бавовняний шопер з фірмовим візерунком та червоними ручками. Базова версія без підкладки.',
    price: 300,
    category: 'Сумки & Шопери',
    imageSrc: '/merch/shopper.png',
    colorTheme: '#FFF9EB',
  },
  {
    id: 'shopper-400',
    name: 'Шопер з червоною підкладкою',
    description: 'Місткий бавовняний шопер зі щільною червоною підкладкою та червоними ручками.',
    price: 400,
    category: 'Сумки & Шопери',
    imageSrc: '/merch/shopper.png',
    colorTheme: '#FFF5F5',
  },
  {
    id: 'cup',
    name: 'Керамічна чашка',
    description: 'Затишна керамічна чашка для чаю або какао з офіційним логотипом Фундації. Різні кольори в асортименті.',
    price: 500,
    category: 'Посуд',
    imageSrc: '/merch/cup.png',
    sizes: ['Жовта класична', 'Помаранчева', 'Кольоровий мікс'],
    colorTheme: '#FFF3E0',
  },
  {
    id: 'pillow',
    name: 'Подушка декоративна',
    description: 'М’яка інтер’єрна подушка 45*45 см з фірмовим патерном теплих кольорових будиночків. Створює домашній затишок.',
    price: 400,
    category: 'Дім & Інтер’єр',
    imageSrc: '/merch/pillow.png',
    sizes: ['45×45 см'],
    colorTheme: '#EBF7FF',
  },
  {
    id: 'socks',
    name: 'Шкарпетки',
    description: 'Яскраві теплі шкарпетки з фірмовою листівкою РМХК. Універсальний розмір, що підходить кожному.',
    price: 150,
    category: 'Одяг',
    imageSrc: '/merch/socks.png',
    sizes: ['Універсальний (One size)'],
    colorTheme: '#FFF0F0',
  },
  {
    id: 'toy',
    name: 'Новорічна прикраса',
    description: 'Авторська керамічна прикраса ручної роботи від Samsara Decor з джутовою мотузкою та подарунковим пакуванням.',
    price: 150,
    category: 'Новий Рік',
    imageSrc: '/merch/toy.png',
    colorTheme: '#F6F0FF',
  },
]

const RAFFLE_PRIZES = [
  {
    title: '5 комплектів преміум-піжам',
    desc: 'Ексклюзивна лімітована серія з вишивкою Дім Рональда',
    tag: 'Головний приз',
    icon: '🎁',
  },
  {
    title: '10 брендованих худі та пледів',
    desc: 'Супер-м’які затишні пледи для теплих сімейних вечорів',
    tag: 'Затишок',
    icon: '🧸',
  },
  {
    title: '20 наборів сувенірів та шкарпеток',
    desc: 'Смугасті шкарпетки, термочашка та фірмовий пін',
    tag: 'Пам’ятний мерч',
    icon: '🧦',
  },
  {
    title: 'Сюрпризи від амбасадорів',
    desc: 'Листівки з автографами та спеціальні призи від партнерів',
    tag: 'Спеціальний приз',
    icon: '⭐',
  },
]

const HOUSE_SLIDES = [
  {
    src: '/house/house-slide-1.jpg',
    title: 'Фасад майбутнього Дому Рональда МакДональда',
    caption: '5 поверхів та 50 затишних спалень на базі НДСЛ «Охматдит»',
  },
  {
    src: '/house/house-slide-2.jpg',
    title: 'Архітектурний стиль та головний вхід',
    caption: 'Сучасний простір тепла, безпеки та психологічної підтримки',
  },
  {
    src: '/house/house-slide-3.jpg',
    title: 'Панорама території та вхідної групи',
    caption: 'Місце, де сім’ї з важкохворими дітьми будуть поруч під час лікування',
  },
]

function HouseImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HOUSE_SLIDES.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === HOUSE_SLIDES.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative group w-full overflow-hidden rounded-3xl shadow-xl border border-amber-900/10 bg-slate-900 aspect-4/3 sm:aspect-16/11">
      {HOUSE_SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.title}
            className="w-full h-full object-cover select-none"
          />
          {/* Vignette with caption */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
            <p className="text-xs sm:text-sm font-black drop-shadow-sm">{slide.title}</p>
            <p className="text-[11px] sm:text-xs text-white/90 drop-shadow-sm">{slide.caption}</p>
          </div>
        </div>
      ))}

      {/* Nav Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 active:scale-95 cursor-pointer shadow-md"
        aria-label="Попереднє фото"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 active:scale-95 cursor-pointer shadow-md"
        aria-label="Наступне фото"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Dots Indicator */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-xs">
        {HOUSE_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === currentSlide ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80 w-2'
            }`}
            aria-label={`Слайд ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function PajamaLandingPage() {
  const { totalCount, totalAmount, openCart, toastMessage, addToCart } = useCart()
  const [selectedAddToCartItem, setSelectedAddToCartItem] = useState<ShopItem | null>(null)
  const [selectedShopItem, setSelectedShopItem] = useState<ShopItem | null>(null)
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false)
  const [isDonateOpen, setIsDonateOpen] = useState<boolean>(false)

  const handleOpenDonate = () => {
    setIsDonateOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#FAF6EB] text-slate-900 font-sans selection:bg-amber-200">
      
      {/* 1. TOP STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-[#FAF6EB]/95 backdrop-blur-md border-b border-amber-900/10 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24 gap-3">
            
            {/* Logo — Enlarged */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <a href="#" className="flex items-center group py-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/rmh_ukraine_logo_hrz_black.svg"
                  alt="Дім Рональда МакДональда Україна"
                  className="h-12 sm:h-16 md:h-18 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </a>
            </div>

            {/* Quick in-page navigation links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-black uppercase tracking-wider text-slate-600">
              <a href="#how-to-join" className="hover:text-slate-900 transition-colors">Як долучитися</a>
              <a href="#online-pajama" className="hover:text-slate-900 transition-colors">Онлайн-піжама</a>
              <a href="#merch-shop" className="hover:text-slate-900 transition-colors flex items-center gap-1">
                <span>Мерч-шоп</span>
                <span className="text-[10px] bg-[#FFBC0D] text-slate-950 px-1.5 py-0.5 rounded-md font-black">NEW</span>
              </a>
              <a href="#raffle" className="hover:text-slate-900 transition-colors">Розіграш</a>
              <a href="#about-house" className="hover:text-slate-900 transition-colors">Про Дім</a>
            </nav>

            {/* Header Right Actions: Cart + Donate */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <button
                onClick={openCart}
                className="relative flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-black bg-white hover:bg-amber-50 text-slate-900 border border-amber-300 shadow-2xs active:scale-95 transition-all cursor-pointer"
                aria-label="Відкрити кошик"
              >
                <ShoppingBag className="w-4 h-4 text-amber-900" />
                <span className="hidden sm:inline">Кошик</span>
                {totalCount > 0 && (
                  <span className="bg-[#E31837] text-white text-[10.5px] font-black px-1.5 py-0.2 rounded-full min-w-[20px] text-center shadow-xs">
                    {totalCount}
                  </span>
                )}
              </button>

              <button
                onClick={handleOpenDonate}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-black bg-[#E31837] hover:bg-[#C9132D] text-white shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Зробити внесок</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 2. HERO: OFFICIAL KEY VISUAL BANNER INTEGRATED */}
      <section className="relative overflow-hidden pt-3 sm:pt-6 pb-12 sm:pb-16 bg-gradient-to-b from-[#D0C9FF]/40 via-[#FAF6EB] to-[#FAF6EB]">
        {/* Ambient periwinkle & warm glow matching Key Visual background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] h-[550px] bg-gradient-to-r from-[#D0C9FF]/50 via-amber-100/30 to-[#D0C9FF]/50 blur-3xl -z-10 pointer-events-none" />

        <div className="w-full max-w-[1540px] mx-auto px-2 sm:px-4 lg:px-6">
          
          {/* Seamless Built-in Key Visual Banner */}
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#D0C9FF]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-banner.png"
              alt="13 листопада — Всеукраїнський День Піжам. Покажи свою піжаму світу! Задонать на дім для хворих дітей і виграй подарунки. Долучайся звідти, де ти є. Дім Рональда МакДональда в Україні"
              className="w-full h-auto object-contain mx-auto block select-none"
            />
          </div>

          {/* Direct Action Triggers from Key Visual calls */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 max-w-4xl mx-auto">
            <button
              onClick={handleOpenDonate}
              className="flex-1 py-4 px-5 sm:px-6 rounded-lg bg-[#E31837] hover:bg-[#C9132D] text-white font-black text-sm sm:text-base shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Heart className="w-5 h-5 fill-white shrink-0" />
              <span className="whitespace-nowrap">Зробити внесок</span>
            </button>

            <a
              href="#online-pajama"
              className="flex-1 py-4 px-5 sm:px-6 rounded-lg bg-[#70B83A] hover:bg-[#5FA12E] text-white font-black text-sm sm:text-base shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-5 h-5 shrink-0" />
              <span className="whitespace-nowrap">Створи піжаму</span>
            </a>

            <a
              href="#merch-shop"
              className="flex-1 py-4 px-5 sm:px-6 rounded-lg bg-[#FFBC0D] hover:bg-[#E5A80B] text-slate-950 font-black text-sm sm:text-base shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-5 h-5 shrink-0" />
              <span className="whitespace-nowrap">Благодійний магазин</span>
            </a>
          </div>

        </div>
      </section>

      {/* 3. HOW TO JOIN (3 STEPS FROM PDF) */}
      <section id="how-to-join" className="py-16 sm:py-24 bg-white border-y border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
              Як долучитися
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-[#FAF6EB] rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center shadow-xs">
                  1
                </div>
                <h3 className="text-xl font-black text-slate-900 leading-snug">
                  13 листопада одягни піжаму
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Одягни піжаму на роботу, навчання чи просто вдома. Нехай цей день стане найзатишнішим днем року для всієї твоєї команди, класу чи родини.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/80 border border-amber-200/60 text-xs font-bold text-amber-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Зручно, затишно і на захист дітей</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAF6EB] rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500 text-white font-black text-xl flex items-center justify-center shadow-xs">
                  2
                </div>
                <h3 className="text-xl font-black text-slate-900 leading-snug">
                  Поділися світлиною в соцмережах
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Зроби яскраве фото чи сторіз у піжамі та опублікуй з хештегом <strong>#ДеньПіжам</strong>. Розкажи друзям, чому ти підтримуєш цей день!
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/80 border border-amber-200/60 text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>#ДеньПіжам</span>
                <span className="text-slate-400 font-normal">Instagram / TikTok</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAF6EB] rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E31837] text-white font-black text-xl flex items-center justify-center shadow-xs">
                  3
                </div>
                <h3 className="text-xl font-black text-slate-900 leading-snug">
                  Зроби внесок на Дім Рональда
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Зроби внесок на будівництво Дому Рональда МакДональда та автоматично візьми участь у розіграші чудових подарунків!
                </p>
              </div>
              <button
                onClick={handleOpenDonate}
                className="w-full py-3 px-4 rounded-2xl bg-[#E31837] hover:bg-[#C9132D] text-white font-black text-xs shadow-xs active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Задонатити від 50 ₴</span>
              </button>
            </div>

          </div>

          {/* Photo Gallery Note from PDF: (фото родини) */}
          <div className="mt-12 p-6 rounded-3xl bg-amber-50/70 border border-amber-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-800 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">
                  Тисячі українців уже долучаються цілими родинами та офісами!
                </h4>
                <p className="text-xs text-slate-600">
                  Переглядай фото учасників в Instagram за хештегом <strong>#ДеньПіжам</strong>
                </p>
              </div>
            </div>
            <a
              href="https://www.instagram.com/explore/tags/деньпіжам/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-white text-slate-800 font-bold text-xs border border-amber-300 hover:bg-amber-100 transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              <span>Дивитися фото в Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* 4. ONLINE PAJAMA STUDIO (AVATAR GENERATOR INTERACTIVE) */}
      <PajamaAvatarSection />

      {/* 5. CHARITY MERCH SHOP (E-COMMERCE) */}
      <section id="merch-shop" className="py-16 sm:py-24 bg-white border-y border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
              Благодійний магазин
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              <strong>100% прибутку від кожної речі</strong> спрямовується на будівництво Дому Рональда МакДональда!
            </p>
          </div>

          {/* Merch Product Grid — 3 items per row on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {MERCH_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white/80 hover:bg-white rounded-3xl p-5 sm:p-6 border border-amber-200/80 hover:border-amber-400 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  {/* Product Visual Container with Real Cutout Image */}
                  <div 
                    className="w-full aspect-square rounded-2xl p-4 sm:p-6 flex items-center justify-center relative overflow-hidden mb-4 shadow-2xs border border-amber-100/80 transition-all group-hover:shadow-md"
                    style={{ backgroundColor: item.colorTheme }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageSrc}
                      alt={item.name}
                      className="w-full h-full object-contain drop-shadow-sm group-hover:scale-108 transition-transform duration-300"
                    />
                  </div>

                  {/* Clean Title */}
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    {item.name}
                  </h3>
                </div>

                {/* Price & Action */}
                <div className="pt-4 border-t border-amber-200/60 mt-4 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-lg sm:text-xl font-black text-[#E31837] whitespace-nowrap">
                      {item.variants
                        ? `${item.variants[0].price}–${item.variants[item.variants.length - 1].price} ₴`
                        : `${item.price} ₴`
                      }
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if ((item.variants && item.variants.length > 0) || (item.sizes && item.sizes.length > 0)) {
                        setSelectedAddToCartItem(item)
                      } else {
                        addToCart(item, null, undefined, 1)
                      }
                    }}
                    className="py-2.5 px-4 sm:px-5 rounded-lg bg-slate-900 hover:bg-[#E31837] text-white text-xs sm:text-sm font-black transition-all shadow-xs active:scale-95 cursor-pointer flex items-center gap-2 shrink-0"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>В кошик</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. RAFFLE SECTION — VIOLET STYLE MATCHING REFERENCE 2 */}
      <section id="raffle" className="py-16 sm:py-24 bg-[#FAF6EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative text-slate-900 drop-shadow-[0_20px_35px_rgba(79,70,229,0.09)] drop-shadow-[0_4px_6px_rgba(0,0,0,0.04)]">
            {/* Organic RMHC Figure Background matching Reference 1 */}
            <svg 
              className="absolute inset-0 w-full h-full -z-10 pointer-events-none select-none" 
              viewBox="0 0 1000 500" 
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <path 
                  id="raffle-brand-shape" 
                  d="
                    M 50,22 
                    C 20,25 10,50 10,80 
                    C 22,200 22,300 10,420 
                    C 10,455 28,485 70,485 
                    C 250,485 450,490 700,488 
                    C 850,485 960,490 980,455 
                    C 994,430 994,350 992,250 
                    C 990,150 994,70 980,45 
                    C 960,20 890,22 815,22 
                    L 775,2 
                    L 735,22 
                    C 600,22 300,22 50,22 
                    Z" 
                />
              </defs>
              {/* Primary Lavender Base */}
              <use href="#raffle-brand-shape" fill="#D0C9FF" />

              {/* Signature RMHC Dynamic Organic Wave separating left copy & right prizes */}
              <path 
                d="
                  M 530,22 
                  C 480,130 450,230 500,340 
                  C 535,420 570,460 610,488 
                  L 980,455 
                  C 994,430 994,350 992,250 
                  C 990,150 994,70 980,45 
                  C 960,20 890,22 815,22 
                  L 775,2 
                  L 735,22 
                  Z" 
                fill="rgba(255, 255, 255, 0.22)" 
              />
            </svg>

            <div className="relative z-10 p-6 sm:p-10 md:p-12 lg:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Left copy */}
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 text-slate-900 text-xs font-black uppercase tracking-wider shadow-2xs">
                    <Gift className="w-3.5 h-3.5 text-[#E31837]" />
                    <span>Розіграш до Дня Піжам</span>
                  </span>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-slate-950">
                    Для всіх, хто зробить внесок від 50 грн, ми проведемо розіграш подарунків!
                  </h2>

                  <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                    Кожні 50 ₴ у вашому внеску — це ще один шанс виграти чудові брендовані призи до Дня Піжам та підтримати зведення Дому для сімей!
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleOpenDonate}
                      className="py-4 px-7 rounded-lg bg-[#E31837] hover:bg-[#C9132D] text-white font-black text-sm sm:text-base shadow-md active:scale-98 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Heart className="w-5 h-5 fill-white" />
                      <span>Зробити внесок від 50 ₴</span>
                    </button>

                    <button
                      onClick={() => setIsRulesOpen(true)}
                      className="py-4 px-6 rounded-lg bg-white/80 hover:bg-white text-slate-800 font-bold text-sm sm:text-base border border-slate-300 shadow-2xs transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <HelpCircle className="w-4 h-4 text-slate-500" />
                      <span>Умови розіграшу</span>
                    </button>
                  </div>
                </div>

                {/* Right: Prizes Showcase Cards */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-slate-900">
                  {RAFFLE_PRIZES.map((prize, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white shadow-sm border border-white/80 space-y-1.5 text-left transition-transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{prize.icon}</span>
                        <span className="text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                          {prize.tag}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-slate-900 leading-snug pt-1">
                        {prize.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {prize.desc}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. ABOUT THE HOUSE (PAGE 2 FROM PDF) — 2-COLUMN LAYOUT WITH HOUSE SLIDER */}
      <section id="about-house" className="py-16 sm:py-24 bg-[#FFFDE9] border-t border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Interactive Image Slider of the House */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <HouseImageSlider />
            </div>

            {/* Right Column: Shifted Text Block */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D0C9FF]/60 border border-[#D0C9FF] text-indigo-950 text-xs font-black uppercase tracking-wider shadow-2xs">
                <Home className="w-3.5 h-3.5 text-[#E31837]" />
                <span>Будівництво Дому</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Разом ми будуємо Дім для безкоштовного проживання сімей з важкохворими дітьми!
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                <p>
                  Це буде будинок на <strong>5 поверхів і 50 затишних спалень</strong> на території національної дитячої лікарні «Охматдит», куди привозять дітей з найскладнішими діагнозами з усіх куточків нашої країни.
                </p>
                <p>
                  Місце, де родина зможе залишатися разом тоді, коли малеча проходить найскладніше випробування у своєму житті.
                </p>
                <p className="text-slate-800 font-medium leading-relaxed">
                  Де мама зможе перепочити після безсонної ночі, тато — випити чашку чаю і набратися сил, бабуся — приготувати улюблену страву для родини, дитина після процедур — провести час у затишку поруч із найріднішими. Щоб відчути себе ніби вдома.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleOpenDonate}
                  className="py-4 px-8 rounded-lg bg-[#E31837] hover:bg-[#C9132D] text-white font-black text-base shadow-md active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>Зробити внесок</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION (PDF END) */}
      <section className="py-16 sm:py-20 bg-[#FAF6EB] text-center border-t border-amber-900/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-5xl">🧸✨</div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Долучайся звідти, де ти є!
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            13 листопада одягай піжаму, розповідай друзям та роби свій внесок у затишне майбутнє маленьких пацієнтів.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleOpenDonate}
              className="w-full sm:w-auto py-4 px-8 rounded-lg bg-[#E31837] hover:bg-[#C9132D] text-white font-black text-base shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>Зробити внесок</span>
            </button>
            <a
              href="#merch-shop"
              className="w-full sm:w-auto py-4 px-7 rounded-lg bg-[#FFBC0D] hover:bg-[#E5A80B] text-slate-950 font-black text-base shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Благодійний магазин</span>
            </a>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-1">
              <span className="text-base font-black text-amber-400 block">
                Фундація Дім Рональда МакДональда в Україні
              </span>
              <p className="text-xs text-slate-400">
                Благодійна програма підтримки сімейно-орієнтованої медицини та будівництва Дому Надії
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-300">
              <a href="#how-to-join" className="hover:text-amber-400 transition-colors">Як долучитись</a>
              <span>•</span>
              <a href="#merch-shop" className="hover:text-amber-400 transition-colors">Мерч-шоп</a>
              <span>•</span>
              <a href="#raffle" className="hover:text-amber-400 transition-colors">Розіграш</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-[11px] text-slate-500">
            © 2026 Фундація Дім Рональда МакДональда. Усі права захищено. Демо-версія окремого лендінгу до Дня Піжам.
          </div>
        </div>
      </footer>

      {/* FLOATING CART BUTTON */}
      {totalCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={openCart}
            className="flex items-center gap-2.5 py-3.5 px-5 rounded-full bg-slate-900 hover:bg-[#E31837] text-white font-black text-xs sm:text-sm shadow-2xl shadow-slate-950/40 border-2 border-white cursor-pointer transition-all active:scale-95 hover:scale-105"
          >
            <ShoppingBag className="w-4 h-4 text-[#FFBC0D]" />
            <span>Кошик ({totalCount})</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
              {totalAmount} ₴
            </span>
          </button>
        </div>
      )}

      {/* QUICK TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-slate-900 text-white font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2 animate-bounce">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      <CartDrawer />

      {/* ADD TO CART OPTION PICKER */}
      <AddToCartModal
        item={selectedAddToCartItem}
        isOpen={Boolean(selectedAddToCartItem)}
        onClose={() => setSelectedAddToCartItem(null)}
      />

      {/* MODALS */}
      <PajamaShopModal
        item={selectedShopItem}
        isOpen={!!selectedShopItem}
        onClose={() => setSelectedShopItem(null)}
      />

      <PajamaRulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
        onDonateClick={handleOpenDonate}
      />

      <PajamaDonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        onOpenRules={() => {
          setIsDonateOpen(false)
          setIsRulesOpen(true)
        }}
      />

    </div>
  )
}
