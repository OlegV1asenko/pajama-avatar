"use client";

import React, { useState } from 'react'
import {
  Heart,
  Sparkles,
  ShoppingBag,
  Gift,
  Home,
  Users,
  ArrowRight,
  Calendar,
  CheckCircle,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react'
import { PajamaShopModal, ShopItem } from '@/components/PajamaShopModal'
import { PajamaRulesModal } from '@/components/PajamaRulesModal'
import { PajamaDonateModal } from '@/components/PajamaDonateModal'
import { PajamaAvatarSection } from '@/components/PajamaAvatarSection'

const MERCH_ITEMS: ShopItem[] = [
  {
    id: 'shopper',
    name: 'Шопер',
    description: 'Місткий бавовняний шопер з фірмовим візерунком та червоними ручками. 300 ₴ без підкладки або 400 ₴ зі щільною червоною підкладкою.',
    price: 300,
    category: 'Сумки & Шопери',
    imageSrc: '/merch/shopper.png',
    variants: [
      { name: 'Без підкладки', price: 300 },
      { name: 'З червоною підкладкою', price: 400 },
    ],
    colorTheme: '#FFF9EB',
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

export default function PajamaLandingPage() {
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
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            
            {/* Logo */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <a href="#" className="flex items-center group py-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/rmh_ukraine_logo_hrz_black.svg"
                  alt="Дім Рональда МакДональда Україна"
                  className="h-8 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
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

            {/* Right Action: Red Monobank Donate Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenDonate}
                className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black bg-[#E31837] hover:bg-[#C9132D] text-white shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Задонатити</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 2. HERO: OFFICIAL KEY VISUAL BANNER CENTERPIECE */}
      <section className="relative overflow-hidden pt-6 pb-14 sm:pt-10 sm:pb-20">
        {/* Ambient periwinkle & warm glow matching Key Visual background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-r from-[#DDE2F8]/70 via-amber-100/40 to-[#E0E7FF]/60 blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* The Official Key Visual Banner Frame */}
          <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 sm:border-[6px] border-white bg-[#FAF7EE] group transition-transform duration-500 hover:scale-[1.006]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-banner.png"
              alt="13 листопада — День піжам. Покажи свою піжаму світу! Задонать на дім для хворих дітей і виграй подарунки. Долучайся звідти, де ти є. Дім Рональда МакДональда в Україні"
              className="w-full h-auto object-cover select-none"
            />
          </div>

          {/* Direct Action Triggers from Key Visual calls */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 max-w-3xl mx-auto">
            <button
              onClick={handleOpenDonate}
              className="flex-1 py-4 px-6 rounded-2xl bg-[#E31837] hover:bg-[#C9132D] text-white font-black text-sm sm:text-base shadow-lg shadow-red-200 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>Задонатити на монобанку</span>
            </button>

            <a
              href="#online-pajama"
              className="flex-1 py-4 px-6 rounded-2xl bg-[#70B83A] hover:bg-[#5FA12E] text-white font-black text-sm sm:text-base shadow-lg shadow-green-200 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>Створити онлайн-піжаму</span>
            </a>

            <a
              href="#merch-shop"
              className="flex-1 py-4 px-6 rounded-2xl bg-[#FFBC0D] hover:bg-[#E5A80B] text-slate-950 font-black text-sm sm:text-base shadow-md active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Благодійний мерч</span>
            </a>
          </div>

          {/* Trust proofs bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-600 font-bold">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#70B83A]" />
              Донат від 50 ₴ бере участь у розіграші
            </span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Офіційна ініціатива РМХК Україна
            </span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1.5">
              <Home className="w-4 h-4 text-[#E31837]" />
              100% на будівництво Дому для сімей
            </span>
          </div>

          {/* The Emotional Manifest from Brief */}
          <div className="mt-14 sm:mt-18 pt-12 border-t border-amber-900/10 text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFBC0D] text-slate-950 text-xs font-black uppercase tracking-wider shadow-2xs">
              <Calendar className="w-3.5 h-3.5" />
              <span>13 листопада — Всеукраїнський День Піжам</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Одягаємо піжаму <span className="text-[#E31837]">не для сну</span>, а для підтримки!
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-3xl mx-auto">
              <p>
                Коли діти хворіють у лікарнях, вони весь день проводять у піжамі, яка стає для них частинкою дому в лікарняних стінах.
              </p>
              <p>
                Саме тому раз на рік ми одягаємо піжаму не для сну, а для підтримки. Щоб нагадати дітям: за стінами лікарні є тисячі людей, які співпереживають, підтримують і вірять у їхню силу.
              </p>
              <p className="font-bold text-slate-900">
                А ще – побудувати Дім на території національної дитячої лікарні, де сім’ї мешкатимуть безкоштовно. Долучайся звідти, де ти є!
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. HOW TO JOIN (3 STEPS FROM PDF) */}
      <section id="how-to-join" className="py-16 sm:py-24 bg-white border-y border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="inline-block text-xs font-black uppercase tracking-wider text-slate-950 bg-[#FFBC0D] px-4 py-1.5 rounded-full shadow-2xs">
              Проста інструкція
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
              Як долучитися
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Усього 3 прості дії, які зігріють тисячі дитячих сердець
            </p>
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
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFBC0D] text-slate-950 text-xs font-black uppercase tracking-wider shadow-2xs">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Офіційний мерч-шоп акції</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
              Благодійний магазин тепла
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Купуючи фірмовий мерч, ви даруєте тепло дітям: <strong>100% прибутку від кожної речі</strong> спрямовується на будівництво Дому Рональда МакДональда!
            </p>
          </div>

          {/* Merch Product Grid — 5 Real Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {MERCH_ITEMS.map((item) => (
              <div
                key={item.id}
                className="relative group h-full"
              >
                {/* 1. Ghost Card: Preserves rock-solid grid dimensions and identical cell heights */}
                <div 
                  className="invisible pointer-events-none p-4 sm:p-5 border border-transparent flex flex-col justify-between h-full select-none"
                  aria-hidden="true"
                >
                  <div>
                    <div className="w-full aspect-square rounded-2xl mb-3.5" />
                    <h3 className="text-sm sm:text-base font-black leading-snug mt-0.5 mb-1">{item.name}</h3>
                    <p className="text-xs line-clamp-2 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="pt-3.5 mt-3.5 flex items-center justify-between">
                    <span className="text-base sm:text-lg font-black">{item.price} ₴</span>
                    <div className="py-2 px-3 text-xs">Замовити</div>
                  </div>
                </div>

                {/* 2. Interactive Floating Card: Expands smoothly on hover to show full description */}
                <div className="absolute inset-x-0 top-0 min-h-full rounded-3xl p-4 sm:p-5 border border-amber-200/80 group-hover:border-amber-400 bg-white/80 group-hover:bg-white shadow-2xs group-hover:shadow-2xl group-hover:shadow-amber-950/15 transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:-translate-y-1.5 z-10 group-hover:z-40 flex flex-col justify-between">
                  <div>
                    {/* Product Visual Container with Real Cutout Image */}
                    <div 
                      className="w-full aspect-square rounded-2xl p-3 flex items-center justify-center relative overflow-hidden mb-3.5 shadow-2xs border border-amber-100/80 transition-all group-hover:shadow-md"
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
                    <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug mt-0.5 mb-1">
                      {item.name}
                    </h3>

                    {/* Description: 2 lines by default, unfolds fully on hover */}
                    <p className="text-xs text-slate-600 line-clamp-2 group-hover:line-clamp-none leading-relaxed transition-all duration-300">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3.5 border-t border-amber-200/60 mt-3.5 flex items-center justify-between gap-1.5">
                    <div>
                      <span className="text-base sm:text-lg font-black text-[#E31837] whitespace-nowrap">
                        {item.variants
                          ? `${item.variants[0].price}–${item.variants[item.variants.length - 1].price} ₴`
                          : `${item.price} ₴`
                        }
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedShopItem(item)}
                      className="py-2 px-3 sm:px-3.5 rounded-xl bg-slate-900 hover:bg-[#E31837] text-white text-xs font-black transition-all shadow-xs active:scale-95 cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Замовити</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery & Payment Badges */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
              <span className="text-2xl">📦</span>
              <div>
                <h4 className="text-xs font-black text-slate-900">Доставка Новою Поштою</h4>
                <p className="text-[11px] text-slate-600">Відправляємо по всій Україні до найближчого відділення або поштомату</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
              <span className="text-2xl">💳</span>
              <div>
                <h4 className="text-xs font-black text-slate-900">Зручна та безпечна оплата</h4>
                <p className="text-[11px] text-slate-600">Monobank, Apple Pay, Google Pay або карткою будь-якого банку</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
              <span className="text-2xl">🏠</span>
              <div>
                <h4 className="text-xs font-black text-slate-900">100% на благодійність</h4>
                <p className="text-[11px] text-slate-600">Усі кошти безпосередньо фінансують зведення 5-поверхового Дому</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. RAFFLE SECTION (FROM PDF) */}
      <section id="raffle" className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF6EB] to-amber-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 rounded-3xl sm:rounded-4xl p-6 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left copy */}
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-xs">
                  <Gift className="w-3.5 h-3.5" />
                  <span>Розіграш до Дня Піжам</span>
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white">
                  Для всіх, хто зробить донат від 50 грн, ми проведемо розіграш подарунків!
                </h2>

                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  Кожні 50 ₴ у вашому донаті — це ще один шанс виграти чудові брендовані призи до Дня Піжам та відчути себе частиною великої доброї справи!
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={handleOpenDonate}
                    className="py-3.5 px-6 rounded-2xl bg-[#FFBC0D] hover:bg-[#E5A80B] text-slate-950 font-black text-sm shadow-md active:scale-98 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-slate-950" />
                    <span>Задонатити від 50 ₴ на монобанку</span>
                  </button>

                  <button
                    onClick={() => setIsRulesOpen(true)}
                    className="py-3.5 px-5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/30 backdrop-blur-xs transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Умови розіграшу</span>
                  </button>
                </div>
              </div>

              {/* Right: Prizes Showcase Cards */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-900">
                {RAFFLE_PRIZES.map((prize, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-sm shadow-md border border-white/50 space-y-1 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{prize.icon}</span>
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                        {prize.tag}
                      </span>
                    </div>
                    <h4 className="text-xs font-black text-slate-900 leading-tight pt-1">
                      {prize.title}
                    </h4>
                    <p className="text-[10px] text-slate-600 line-clamp-2">
                      {prize.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 7. ABOUT THE HOUSE (PAGE 2 FROM PDF) */}
      <section id="about-house" className="py-16 sm:py-24 bg-white border-t border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: House Stats & Visual Render Card */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-100 to-rose-50 p-6 sm:p-8 border-4 border-amber-200/80 shadow-xl space-y-6 text-center">
                
                <div className="w-20 h-20 rounded-2xl bg-[#E31837] text-white flex items-center justify-center mx-auto shadow-md">
                  <Home className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-wider text-[#E31837]">
                    Дім Рональда МакДональда
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">
                    Перший Дім для сімей в Україні
                  </h3>
                  <p className="text-xs text-slate-600">
                    На території національної дитячої лікарні «Охматдит»
                  </p>
                </div>

                {/* Key Numbers from PDF */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-white shadow-2xs border border-amber-100">
                    <span className="block text-2xl font-black text-[#E31837]">5</span>
                    <span className="text-[11px] font-bold text-slate-600">поверхів затишку</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white shadow-2xs border border-amber-100">
                    <span className="block text-2xl font-black text-[#FFBC0D]">50</span>
                    <span className="text-[11px] font-bold text-slate-600">сімейних спалень</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white shadow-2xs border border-amber-100 col-span-2">
                    <span className="block text-lg font-black text-green-700">0 ₴ для кожної сім’ї</span>
                    <span className="text-[11px] font-bold text-slate-600">повністю безкоштовне проживання поруч із дитиною</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Full Word-for-Word Text from PDF page 2 */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 text-[#E31837] fill-[#E31837]" />
                <span>Велика благодійна мета</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Разом ми будуємо Дім для безкоштовного проживання сімей з важкохворими дітьми!
              </h2>

              {/* Exact text from page 2 */}
              <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
                <p>
                  Це буде будинок на <strong>5 поверхів і 50 затишних спалень</strong> на території національної дитячої лікарні, куди привозять дітей з найскладнішими діагнозами з усіх куточків нашої країни.
                </p>
                <p>
                  Місце, де родина зможе залишатися разом тоді, коли малеча проходить найскладніше випробування у своєму житті.
                </p>
                <p className="p-4 rounded-2xl bg-amber-50 border-l-4 border-amber-400 text-slate-800 italic">
                  «Де мама зможе перепочити після безсонної ночі, тато випити чашку чаю і набратися сил, бабуся приготувати улюблену страву для родини, дитина після процедур – провести час у затишку поруч із найріднішими. Щоб відчути себе, ніби вдома.»
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleOpenDonate}
                  className="py-4 px-8 rounded-2xl bg-[#E31837] hover:bg-[#C9132D] text-white font-black text-base shadow-lg shadow-red-200 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>Долучитися до будівництва Дому</span>
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
              className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-[#E31837] hover:bg-[#C9132D] text-white font-black text-base sm:text-lg shadow-xl shadow-red-200 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>Задонатити (на монобанку)</span>
            </button>
            <a
              href="#merch-shop"
              className="w-full sm:w-auto py-4 px-7 rounded-2xl bg-[#FFBC0D] hover:bg-[#E5A80B] text-slate-950 font-black text-base shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Обрати піжаму в мерч-шопі</span>
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
