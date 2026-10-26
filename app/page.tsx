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
  History,
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
    src: '/events/Mask-group-3-2.png',
    title: 'Дім Рональда МакДональда в Україні',
    caption: '5 поверхів та 50 затишних спалень для родин важкохворих дітей',
  },
  {
    src: '/house/house-slide-1.jpg',
    title: 'Фасад майбутнього Дому',
    caption: 'Будівництво на території національної дитячої лікарні «Охматдит»',
  },
  {
    src: '/house/house-slide-2.jpg',
    title: 'Сучасний простір тепла й турботи',
    caption: 'Місце, де сім’ї будуть поруч під час тривалого лікування дитини',
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
    <div className="relative group w-full aspect-4/3 sm:aspect-16/11 drop-shadow-xl">
      {/* Official RMHC Organic Mask for House Slider */}
      <div className="w-full h-full rmhc-mask bg-slate-900 overflow-hidden relative">
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
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-white">
              <p className="text-sm sm:text-base font-bold font-raleway drop-shadow-sm">{slide.title}</p>
              <p className="text-xs sm:text-sm text-white/90 font-montserrat drop-shadow-sm mt-0.5">{slide.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Nav Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 active:scale-95 cursor-pointer shadow-md"
        aria-label="Попереднє фото"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 active:scale-95 cursor-pointer shadow-md"
        aria-label="Наступне фото"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Dots Indicator */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-xs">
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
    <div className="min-h-screen bg-[#FFFDE9] text-[#1F2124] font-montserrat selection:bg-[#FFBC0D]/40">
      
      {/* 1. TOP STICKY HEADER — Exactly matches typography & style from original site */}
      <header className="sticky top-0 z-40 bg-[#FFFDE9]/95 backdrop-blur-md border-b border-amber-900/10 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24 gap-4">
            
            {/* Official Ronald McDonald House Ukraine Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <a href="#" className="flex items-center group py-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/rmh_ukraine_logo_hrz_black.svg"
                  alt="Дім Рональда МакДональда Україна"
                  className="h-12 sm:h-16 md:h-18 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </a>
            </div>

            {/* In-page navigation links — Exact Raleway 800, Normal-case, 18-20px as on original */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[18px] xl:text-[19px] font-extrabold text-[#000000] font-raleway tracking-[-0.1px]">
              <a href="#how-to-join" className="hover:text-[#DB0007] transition-colors py-1">Як долучитися</a>
              <a href="#online-pajama" className="hover:text-[#DB0007] transition-colors py-1">Онлайн-піжама</a>
              <a href="#merch-shop" className="hover:text-[#DB0007] transition-colors py-1 flex items-center gap-1.5">
                <span>Мерч-шоп</span>
                <span className="text-[10px] bg-[#FFBC0D] text-slate-950 px-1.5 py-0.5 rounded-md font-black tracking-normal">NEW</span>
              </a>
              <a href="#raffle" className="hover:text-[#DB0007] transition-colors py-1">Розіграш</a>
              <a href="#about-house" className="hover:text-[#DB0007] transition-colors py-1">Про Дім</a>
              <a href="#history" className="hover:text-[#DB0007] transition-colors py-1">Історія акції</a>
            </nav>

            {/* Header Right Actions: Cart + Donate with Official Button Shape */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={openCart}
                className="relative flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-white hover:bg-amber-50 text-slate-900 border border-slate-300 shadow-2xs active:scale-95 transition-all cursor-pointer font-raleway"
                aria-label="Відкрити кошик"
              >
                <ShoppingBag className="w-4 h-4 text-[#DB0007]" />
                <span className="hidden sm:inline">Кошик</span>
                {totalCount > 0 && (
                  <span className="bg-[#DB0007] text-white text-[10.5px] font-bold px-1.5 py-0.2 rounded-full min-w-[20px] text-center shadow-xs">
                    {totalCount}
                  </span>
                )}
              </button>

              <button
                onClick={handleOpenDonate}
                className="rmhc-btn flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-base font-extrabold bg-[#DB0007] hover:bg-[#91187D] text-[#FFFDE9] shadow-sm active:scale-95 transition-all cursor-pointer font-raleway"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Задонатити</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 2. HERO: OFFICIAL KEY VISUAL WITH RMHC CURVED MASK + MANIFESTO */}
      <section className="relative overflow-hidden pt-4 sm:pt-6 pb-12 sm:pb-16 bg-[#FFFDE9]">
        <div className="w-full max-w-[1540px] mx-auto px-2 sm:px-4 lg:px-6 space-y-8">
          
          {/* Key Visual Banner with Official RMHC Organic Curved Mask */}
          <div className="relative w-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.06)]">
            <div className="rmhc-mask bg-[#D0C9FF] overflow-hidden">
              {/* Desktop Banner */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/events/denPizham_Web_UA_1920x1080.png"
                alt="13 листопада — Всеукраїнський День Піжам 2026. Дім Рональда МакДональда Україна"
                className="hidden sm:block w-full h-auto object-contain mx-auto select-none"
              />
              {/* Mobile Banner */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/events/denPizham_Mob_UA_630x1080.png"
                alt="13 листопада — Всеукраїнський День Піжам 2026. Дім Рональда МакДональда Україна"
                className="block sm:hidden w-full h-auto object-contain mx-auto select-none"
              />
            </div>
          </div>

          {/* Official Manifesto Text Block with Official Buttons */}
          <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
            
            <p className="text-base sm:text-xl text-slate-800 leading-relaxed font-normal">
              Коли діти хворіють у лікарнях, вони весь день проводять у піжамі, яка стає для них частинкою дому в лікарняних стінах. Саме тому раз на рік ми одягаємо піжаму не для сну, а для підтримки. Щоб нагадати дітям: за стінами лікарні є тисячі людей, які співпереживають, підтримують і вірять у їхню силу.
            </p>

            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
              А ще – побудувати Дім на території національної дитячої лікарні «Охматдит», де сім’ї з важкохворими дітьми мешкатимуть безкоштовно.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              {/* Sky Blue CTA Button */}
              <button
                onClick={handleOpenDonate}
                className="rmhc-btn w-full sm:w-auto py-4 px-8 bg-[#5BC0DE] hover:bg-[#31b0d5] text-white font-extrabold text-base sm:text-lg shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer font-raleway"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>Задонатити</span>
              </button>

              <a
                href="#online-pajama"
                className="rmhc-btn w-full sm:w-auto py-4 px-7 bg-[#9CD83E] hover:bg-[#86bf2e] text-[#1F2124] font-extrabold text-base sm:text-lg shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer font-raleway"
              >
                <Sparkles className="w-5 h-5" />
                <span>Створити онлайн-піжаму</span>
              </a>

              <a
                href="#merch-shop"
                className="rmhc-btn w-full sm:w-auto py-4 px-7 bg-[#FFBC0D] hover:bg-[#e5a80b] text-slate-950 font-extrabold text-base sm:text-lg shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer font-raleway"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Благодійний магазин</span>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 3. HOW TO JOIN (3 STEPS WITH RMHC CURVED CARDS) */}
      <section id="how-to-join" className="py-16 sm:py-24 bg-white border-y border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1F2124] font-raleway">
              Як долучитися
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="drop-shadow-md hover:drop-shadow-xl transition-all duration-300">
              <div className="rmhc-mask bg-[#FFFDE9] p-8 sm:p-10 flex flex-col justify-between h-full space-y-5">
                <div className="space-y-4">
                  <div className="w-12 h-12 flex items-center justify-start text-[#1F2124]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41.56 35.05" className="w-10 h-10 fill-[#1F2124]">
                      <path d="M20.82,34.79c-.4.29-.93.33-1.38.13C15.91,33.29.66,25.67.03,14.86-.69,2.63,12.74,4.07,18.97,9.35c0,0,.99,1,1.68,1.2.68.19,1.59-1.78,4.32-4.08,2.49-2.1,13.19-10.07,16.07-4.56s-6.2,22.96-20.22,32.88Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#1F2124] leading-snug font-raleway">
                    13 листопада одягни піжаму на роботу, навчання чи просто вдома
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-montserrat">
                    Одягни піжаму та відчуй єдність із дітьми в лікарнях. Нехай цей день стане найзатишнішим днем року для всієї твоєї команди, класу чи родини.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/80 border border-amber-200/80 text-xs font-bold text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Зручно, затишно і на захист дітей</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="drop-shadow-md hover:drop-shadow-xl transition-all duration-300">
              <div className="rmhc-mask bg-[#FFFDE9] p-8 sm:p-10 flex flex-col justify-between h-full space-y-5">
                <div className="space-y-4">
                  <div className="w-12 h-12 flex items-center justify-start text-[#1F2124]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41.56 35.05" className="w-10 h-10 fill-[#1F2124]">
                      <path d="M20.82,34.79c-.4.29-.93.33-1.38.13C15.91,33.29.66,25.67.03,14.86-.69,2.63,12.74,4.07,18.97,9.35c0,0,.99,1,1.68,1.2.68.19,1.59-1.78,4.32-4.08,2.49-2.1,13.19-10.07,16.07-4.56s-6.2,22.96-20.22,32.88Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#1F2124] leading-snug font-raleway">
                    Поділися світлиною в соцмережах з #ДеньПіжам2026
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-montserrat">
                    Зроби яскраве фото чи сторіз у піжамі та опублікуй з хештегом <strong>#ДеньПіжам2026</strong>. Розкажи друзям, чому ти підтримуєш цей день!
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/80 border border-amber-200/80 text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>#ДеньПіжам2026</span>
                  <span className="text-slate-400 font-normal">Instagram / Facebook / TikTok</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="drop-shadow-md hover:drop-shadow-xl transition-all duration-300">
              <div className="rmhc-mask bg-[#FFFDE9] p-8 sm:p-10 flex flex-col justify-between h-full space-y-5">
                <div className="space-y-4">
                  <div className="w-12 h-12 flex items-center justify-start text-[#DB0007]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41.56 35.05" className="w-10 h-10 fill-[#DB0007]">
                      <path d="M20.82,34.79c-.4.29-.93.33-1.38.13C15.91,33.29.66,25.67.03,14.86-.69,2.63,12.74,4.07,18.97,9.35c0,0,.99,1,1.68,1.2.68.19,1.59-1.78,4.32-4.08,2.49-2.1,13.19-10.07,16.07-4.56s-6.2,22.96-20.22,32.88Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#1F2124] leading-snug font-raleway">
                    Зроби внесок від 50 грн на Дім Рональда МакДональда та візьми участь у розіграші подарунків
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-montserrat">
                    Кожні 50 грн у твоєму внеску наближають відкриття Дому та автоматично дарують шанс виграти чудові брендовані призи!
                  </p>
                </div>
                <button
                  onClick={handleOpenDonate}
                  className="rmhc-btn w-full py-3.5 px-4 bg-[#DB0007] hover:bg-[#91187D] text-[#FFFDE9] font-bold text-xs shadow-xs active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer font-raleway"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Задонатити від 50 ₴</span>
                </button>
              </div>
            </div>

          </div>

          {/* Social Proof Banner */}
          <div className="mt-12 p-6 rounded-2xl bg-[#FFFDE9] border border-amber-900/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1F2124] font-raleway">
                  Тисячі українців уже долучаються цілими родинами та офісами!
                </h4>
                <p className="text-xs text-slate-600 font-montserrat">
                  Переглядай фото учасників в Instagram за хештегом <strong>#ДеньПіжам2026</strong>
                </p>
              </div>
            </div>
            <a
              href="https://www.instagram.com/explore/tags/деньпіжам/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-lg bg-white text-slate-800 font-bold text-xs border border-slate-300 hover:bg-amber-50 transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              <span>Дивитися фото в Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* 4. ONLINE PAJAMA STUDIO & 6 INSPIRATION VIBES (WITH CURVED MASKS) */}
      <PajamaAvatarSection />

      {/* 5. CHARITY MERCH SHOP */}
      <section id="merch-shop" className="py-16 sm:py-24 bg-white border-y border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1F2124] font-raleway">
              Благодійний магазин
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-montserrat">
              <strong>100% прибутку від кожної речі</strong> спрямовується на будівництво першого в Україні Дому Рональда МакДональда!
            </p>
          </div>

          {/* Merch Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {MERCH_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-[#FFFDE9] hover:bg-white rounded-2xl p-5 sm:p-6 border border-amber-900/10 hover:border-amber-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Product Visual Container with RMHC Masked Soft Background */}
                  <div 
                    className="w-full aspect-square rmhc-mask p-4 sm:p-6 flex items-center justify-center relative overflow-hidden mb-4 shadow-2xs transition-all group-hover:scale-102"
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
                  <h3 className="text-base sm:text-lg font-bold text-[#1F2124] leading-snug font-raleway">
                    {item.name}
                  </h3>
                </div>

                {/* Price & Action */}
                <div className="pt-4 border-t border-amber-900/10 mt-4 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-lg sm:text-xl font-black text-[#DB0007] whitespace-nowrap font-raleway">
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
                    className="rmhc-btn py-2.5 px-4 sm:px-5 bg-slate-900 hover:bg-[#DB0007] text-white text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-95 cursor-pointer flex items-center gap-2 shrink-0 font-raleway"
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

      {/* 6. RAFFLE SECTION — VIOLET WITH RMHC ORGANIC GABLE */}
      <section id="raffle" className="py-16 sm:py-24 bg-[#FFFDE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative text-slate-900 drop-shadow-[0_20px_35px_rgba(79,70,229,0.09)] drop-shadow-[0_4px_6px_rgba(0,0,0,0.04)]">
            {/* Organic RMHC Figure Background */}
            <svg 
              className="absolute inset-0 w-full h-full -z-10 pointer-events-none select-none" 
              viewBox="0 0 1000 500" 
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <path 
                  id="raffle-brand-shape-v3" 
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
              <use href="#raffle-brand-shape-v3" fill="#D0C9FF" />

              {/* Signature RMHC Dynamic Organic Wave */}
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
                fill="rgba(255, 255, 255, 0.25)" 
              />
            </svg>

            <div className="relative z-10 p-6 sm:p-10 md:p-12 lg:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Left copy */}
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 text-slate-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
                    <Gift className="w-3.5 h-3.5 text-[#DB0007]" />
                    <span>Розіграш до Дня Піжам 2026</span>
                  </span>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-slate-950 font-raleway">
                    Для всіх, хто зробить донат від 50 грн, ми проведемо розіграш подарунків!
                  </h2>

                  <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-montserrat">
                    Кожні 50 ₴ у вашому внеску — це ще один шанс виграти чудові брендовані призи до Дня Піжам та підтримати зведення Дому для сімей!
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleOpenDonate}
                      className="rmhc-btn py-3.5 px-6 bg-[#DB0007] hover:bg-[#91187D] text-[#FFFDE9] font-bold text-sm sm:text-base shadow-md active:scale-98 transition-all cursor-pointer flex items-center gap-2 font-raleway"
                    >
                      <Heart className="w-5 h-5 fill-white" />
                      <span>Зробити внесок від 50 ₴</span>
                    </button>

                    <button
                      onClick={() => setIsRulesOpen(true)}
                      className="rmhc-btn py-3.5 px-6 bg-[#69727D] hover:bg-[#1F2124] text-white font-bold text-sm sm:text-base shadow-2xs transition-colors cursor-pointer flex items-center gap-2 font-raleway"
                    >
                      <HelpCircle className="w-4 h-4 text-white" />
                      <span>Умови розіграшу</span>
                    </button>
                  </div>
                </div>

                {/* Right: Prizes Showcase Cards */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-slate-900">
                  {RAFFLE_PRIZES.map((prize, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white shadow-sm border border-white/80 space-y-1.5 text-left transition-transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{prize.icon}</span>
                        <span className="text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-raleway">
                          {prize.tag}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug pt-1 font-raleway">
                        {prize.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 font-montserrat">
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

      {/* 7. ABOUT THE HOUSE — 2-COLUMN LAYOUT WITH MASKED HOUSE SLIDER */}
      <section id="about-house" className="py-16 sm:py-24 bg-[#FFFDE9] border-t border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Interactive Image Slider of the House */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <HouseImageSlider />
            </div>

            {/* Right Column: Shifted Text Block */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D0C9FF]/60 border border-[#D0C9FF] text-indigo-950 text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Home className="w-3.5 h-3.5 text-[#DB0007]" />
                <span>Будівництво Дому</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1F2124] leading-tight font-raleway">
                Разом ми будуємо Дім для безкоштовного проживання сімей з важкохворими дітьми!
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal font-montserrat">
                <p>
                  Це буде будинок на <strong>5 поверхів і 50 затишних спалень</strong> на території НДСЛ «Охматдит» МОЗ України, куди привозять дітей з найскладнішими діагнозами з усіх куточків нашої країни.
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
                  className="rmhc-btn py-4 px-8 bg-[#DB0007] hover:bg-[#91187D] text-[#FFFDE9] font-bold text-base shadow-md active:scale-98 transition-all flex items-center gap-2 cursor-pointer font-raleway"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>Зробити внесок</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. HISTORICAL CONTEXT: «День піжам» — найпопулярніша акція */}
      <section id="history" className="py-16 sm:py-24 bg-white border-t border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Official Photo img-4.png with RMHC Organic Curved Mask */}
            <div className="lg:col-span-6">
              <div className="drop-shadow-xl group">
                <div className="rmhc-mask bg-slate-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/events/img-4.png"
                    alt="«День піжам» — найпопулярніша акція БО Дім Рональда Макдональда Україна"
                    className="w-full h-auto object-cover group-hover:scale-104 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right: History narrative from official site */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFBC0D]/30 border border-[#FFBC0D] text-amber-950 text-xs font-bold uppercase tracking-wider">
                <History className="w-3.5 h-3.5 text-amber-700" />
                <span>Історія та традиція</span>
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1F2124] leading-tight font-raleway">
                «День піжам» — це найпопулярніша акція БО «Дім Рональда Макдональда Україна»
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal font-montserrat">
                <p>
                  Вперше ми провели «День піжам» у <strong>2019 році</strong>. Ми об’єднали всіх охочих заради досягнення спільної мети — подарувати дітям у лікарнях можливість бути поруч з рідними.
                </p>
                <p>
                  Тоді акція отримала великий відгук, а «День піжам» став щорічною традицією. Тепер це найпопулярніша акція фонду, яка збирає сотні тисяч небайдужих українців, блогерів, зірок, бізнесів, школярів, ЗМІ навколо допомоги хворим дітям.
                </p>
              </div>

              {/* Badges / Stats */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#FFFDE9] border border-amber-200 text-center">
                  <span className="block text-xl sm:text-2xl font-black text-[#DB0007] font-raleway">5+ років</span>
                  <span className="text-[11px] text-slate-600 font-medium">теплої традиції</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FFFDE9] border border-amber-200 text-center">
                  <span className="block text-xl sm:text-2xl font-black text-[#DB0007] font-raleway">100 000+</span>
                  <span className="text-[11px] text-slate-600 font-medium">учасників щороку</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FFFDE9] border border-amber-200 text-center">
                  <span className="block text-xl sm:text-2xl font-black text-[#DB0007] font-raleway">50</span>
                  <span className="text-[11px] text-slate-600 font-medium">спалень у Домі</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION: Долучайся звідти, де ти є! */}
      <section className="py-16 sm:py-24 bg-[#FFFDE9] text-center border-t border-amber-900/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-5xl select-none">🧸✨</div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1F2124] tracking-tight font-raleway">
            Долучайся звідти, де ти є!
          </h2>
          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-montserrat">
            13 листопада одягай піжаму, розповідай друзям та роби свій внесок у затишне майбутнє маленьких пацієнтів.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <button
              onClick={handleOpenDonate}
              className="rmhc-btn w-full sm:w-auto py-4 px-8 bg-[#5BC0DE] hover:bg-[#31b0d5] text-white font-extrabold text-base shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer font-raleway"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>Задонатити</span>
            </button>
            <button
              onClick={handleOpenDonate}
              className="rmhc-btn w-full sm:w-auto py-4 px-8 bg-[#DB0007] hover:bg-[#91187D] text-[#FFFDE9] font-extrabold text-base shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer font-raleway"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>Зробити внесок від 50 ₴</span>
            </button>
            <a
              href="#merch-shop"
              className="rmhc-btn w-full sm:w-auto py-4 px-7 bg-[#FFBC0D] hover:bg-[#e5a80b] text-slate-950 font-extrabold text-base shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer font-raleway"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Благодійний магазин</span>
            </a>
          </div>
        </div>
      </section>

      {/* 10. OFFICIAL FOOTER */}
      <footer className="bg-[#1F2124] text-white py-12 border-t border-slate-800 font-montserrat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-1">
              <span className="text-base font-bold text-[#FFBC0D] block font-raleway">
                БО «Дім Рональда МакДональда в Україні»
              </span>
              <p className="text-xs text-slate-400">
                Благодійна програма підтримки сімейно-орієнтованої медицини та будівництва Дому для дітей
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-extrabold text-slate-300 font-raleway">
              <a href="#how-to-join" className="hover:text-[#FFBC0D] transition-colors">Як долучитись</a>
              <span>•</span>
              <a href="#online-pajama" className="hover:text-[#FFBC0D] transition-colors">Онлайн-піжама</a>
              <span>•</span>
              <a href="#merch-shop" className="hover:text-[#FFBC0D] transition-colors">Мерч-шоп</a>
              <span>•</span>
              <a href="#raffle" className="hover:text-[#FFBC0D] transition-colors">Розіграш</a>
              <span>•</span>
              <a href="#about-house" className="hover:text-[#FFBC0D] transition-colors">Про Дім</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-[11px] text-slate-500">
            © 2026 БО «Дім Рональда МакДональда в Україні». Офіційна веб-сторінка до Дня Піжам 2026.
          </div>
        </div>
      </footer>

      {/* FLOATING CART BUTTON */}
      {totalCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={openCart}
            className="flex items-center gap-2.5 py-3.5 px-5 rounded-full bg-slate-900 hover:bg-[#DB0007] text-white font-bold text-xs sm:text-sm shadow-2xl shadow-slate-950/40 border-2 border-white cursor-pointer transition-all active:scale-95 hover:scale-105 font-raleway"
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
          <div className="bg-slate-900 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2 animate-bounce">
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
