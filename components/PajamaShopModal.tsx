"use client";

import React, { useState } from 'react'
import { X, ShoppingBag, Truck, Check, Heart, ShieldCheck, ArrowRight } from 'lucide-react'
import confetti from 'canvas-confetti'

export interface ShopItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  sizes?: string[]
  badge?: string
  colorTheme: string
  iconName: 'pajama' | 'socks' | 'pin' | 'kids'
}

interface PajamaShopModalProps {
  item: ShopItem | null
  isOpen: boolean
  onClose: () => void
}

export const PajamaShopModal: React.FC<PajamaShopModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [warehouse, setWarehouse] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  // Reset state when item changes
  React.useEffect(() => {
    if (item && item.sizes && item.sizes.length > 0) {
      setSelectedSize(item.sizes[1] || item.sizes[0])
    } else {
      setSelectedSize('')
    }
    setIsSubmitted(false)
    setError('')
  }, [item])

  if (!isOpen || !item) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || !phone.trim() || !city.trim() || !warehouse.trim()) {
      setError('Будь ласка, заповніть усі обов’язкові поля доставки')
      return
    }
    if (item.sizes && item.sizes.length > 0 && !selectedSize) {
      setError('Будь ласка, оберіть розмір')
      return
    }

    setError('')
    setIsSubmitted(true)

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFBC0D', '#E31837', '#8EE7F8', '#D0C9FF'],
      })
    } catch {
      // ignore
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-amber-200 relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          aria-label="Закрити"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Дякуємо за ваше замовлення! ❤️
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Ви замовили <strong>{item.name}</strong> ({selectedSize && `розмір ${selectedSize}, `}{item.price} ₴).
              100% прибутку спрямовано на будівництво Дому для важкохворих діток!
            </p>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-700 text-left space-y-1.5">
              <p><strong>Отримувач:</strong> {fullName}</p>
              <p><strong>Телефон:</strong> {phone}</p>
              <p><strong>Доставка:</strong> Нова Пошта, м. {city}, {warehouse}</p>
            </div>
            <p className="text-xs text-slate-400">
              Наш волонтер-менеджер надішле реквізити для оплати на Монобанку або зв’яжеться у месенджері.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#FFBC0D] hover:bg-[#E5A80B] text-slate-950 font-black text-sm transition-all shadow-md cursor-pointer"
            >
              Чудово, повернутися на сайт
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header / Product summary */}
            <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
                style={{ backgroundColor: item.colorTheme }}
              >
                <ShoppingBag className="w-8 h-8 text-slate-800" />
              </div>
              <div className="flex-1">
                <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-100 text-[#E31837] mb-1">
                  Благодійний мерч
                </span>
                <h3 className="text-lg font-black text-slate-900 leading-snug">
                  {item.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-black text-[#E31837]">
                    {item.price} ₴
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    100% на будівництво Дому
                  </span>
                </div>
              </div>
            </div>

            {/* Size selector if sizes available */}
            {item.sizes && item.sizes.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Оберіть розмір:
                </label>
                <div className="flex flex-wrap gap-2">
                  {item.sizes.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`
                        px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border
                        ${selectedSize === s
                          ? 'bg-slate-950 text-white border-slate-950 shadow-xs scale-105'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
                        }
                      `}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <Truck className="w-4 h-4 text-red-500" />
                <span>Доставка Новою Поштою по Україні:</span>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Ваше ім’я та прізвище"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Номер телефону (наприклад: 067 123 45 67)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="Місто / смт"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  required
                />
                <input
                  type="text"
                  placeholder="№ відділення / поштомату"
                  value={warehouse}
                  onChange={(e) => setWarehouse(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-600 font-bold bg-red-50 p-2.5 rounded-xl border border-red-200">
                {error}
              </p>
            )}

            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-center gap-2 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Офіційний мерч Фундації Дім Рональда МакДональда в Україні</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-[#E31837] hover:bg-[#C9132D] text-white font-black text-sm sm:text-base transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Замовити за {item.price} ₴</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
