"use client";

import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Check,
  Heart,
  Truck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '@/lib/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    totalAmount,
    isCartOpen,
    closeCart,
  } = useCart();

  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [warehouse, setWarehouse] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [orderSummary, setOrderSummary] = useState<{
    items: typeof items;
    total: number;
    name: string;
    phone: string;
    delivery: string;
  } | null>(null);

  if (!isCartOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !city.trim() || !warehouse.trim()) {
      setError('Будь ласка, заповніть усі обов’язкові поля доставки');
      return;
    }

    setError('');
    const summary = {
      items: [...items],
      total: totalAmount,
      name: fullName,
      phone: phone,
      delivery: `Нова Пошта, м. ${city}, ${warehouse}`,
    };
    setOrderSummary(summary);
    setIsSubmitted(true);
    clearCart();

    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FFBC0D', '#E31837', '#70B83A', '#8EE7F8'],
      });
    } catch {
      // ignore
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setError('');
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6EB] shadow-2xl flex flex-col justify-between overflow-hidden border-l border-amber-900/10">
          
          {/* 1. Header */}
          <div className="px-6 py-5 bg-white border-b border-amber-900/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-amber-900" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 leading-tight">
                  Благодійний кошик
                </h3>
                <span className="text-xs font-bold text-slate-500">
                  {totalCount > 0 ? `${totalCount} ${totalCount === 1 ? 'річ' : totalCount < 5 ? 'речі' : 'речей'}` : 'Порожній'}
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Закрити кошик"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isSubmitted && orderSummary ? (
              /* Success / Thank You screen */
              <div className="text-center py-6 space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-900">
                    Замовлення прийнято! ❤️
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                    Дякуємо за вашу підтримку! 100% прибутку спрямовано на будівництво Дому для важкохворих діток.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-2xs text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-bold">Сума до сплати:</span>
                    <span className="font-black text-base text-[#E31837]">{orderSummary.total} ₴</span>
                  </div>
                  <p><strong>Отримувач:</strong> {orderSummary.name}</p>
                  <p><strong>Телефон:</strong> {orderSummary.phone}</p>
                  <p><strong>Доставка:</strong> {orderSummary.delivery}</p>
                  <div className="pt-2 border-t border-slate-100">
                    <p className="font-bold text-slate-700 mb-1">Замовлені позиції:</p>
                    <ul className="space-y-1 text-slate-600">
                      {orderSummary.items.map((it) => (
                        <li key={it.id} className="flex justify-between">
                          <span>{it.name} {it.variantName && `(${it.variantName})`} × {it.quantity}</span>
                          <span className="font-bold">{it.price * it.quantity} ₴</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Monobank Payment Callout */}
                <div className="p-4 rounded-2xl bg-[#FFBC0D]/20 border border-[#FFBC0D] text-left space-y-2">
                  <span className="text-xs font-black text-slate-950 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-[#E31837] text-[#E31837]" />
                    Оплата замовлення:
                  </span>
                  <p className="text-xs text-slate-700">
                    Переведіть <strong>{orderSummary.total} ₴</strong> на офіційну благодійну банку монобанку або наш координатор надішле реквізити в месенджер.
                  </p>
                  <a
                    href="https://send.monobank.ua/jar/dzjHcxY9m"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#E31837] hover:bg-[#C9132D] text-white font-black text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Оплатити {orderSummary.total} ₴ на монобанку</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-3.5 px-6 rounded-2xl bg-white border border-slate-200 text-slate-800 font-black text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Повернутися до сайту
                </button>
              </div>
            ) : items.length === 0 ? (
              /* Empty state */
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-amber-100/70 border border-amber-200 text-amber-800 flex items-center justify-center mx-auto text-4xl shadow-inner">
                  🛍️
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-slate-900">
                    У кошику поки порожньо
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Оберіть фірмовий мерч нижче — 100% прибутку піде на будівництво Дому для діток!
                  </p>
                </div>
                <a
                  href="#merch-shop"
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-2xl bg-[#FFBC0D] hover:bg-[#E5A80B] text-slate-950 font-black text-xs shadow-xs transition-all cursor-pointer"
                >
                  <span>Переглянути мерч</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              /* Items list */
              <div className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-3.5 border border-amber-200/80 shadow-2xs flex items-center gap-3.5"
                    >
                      {/* Product thumbnail */}
                      <div
                        className="w-16 h-16 rounded-xl p-1.5 shrink-0 flex items-center justify-center border border-amber-100/80 overflow-hidden"
                        style={{ backgroundColor: item.colorTheme }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageSrc}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                            aria-label="Видалити"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {(item.variantName || item.size) && (
                          <div className="text-[10.5px] text-slate-500 font-bold">
                            {item.variantName && <span>{item.variantName}</span>}
                            {item.variantName && item.size && <span> • </span>}
                            {item.size && <span>{item.size}</span>}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs sm:text-sm font-black text-[#E31837]">
                            {item.price * item.quantity} ₴
                            {item.quantity > 1 && (
                              <span className="text-[10px] text-slate-400 font-normal ml-1">
                                ({item.price} ₴/шт)
                              </span>
                            )}
                          </span>

                          {/* Stepper */}
                          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-slate-200 text-slate-600 rounded-l-lg transition-colors cursor-pointer"
                              aria-label="Зменшити"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-black text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-slate-200 text-slate-600 rounded-r-lg transition-colors cursor-pointer"
                              aria-label="Збільшити"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout form */}
                <form onSubmit={handleSubmitOrder} className="pt-4 border-t border-amber-900/10 space-y-3.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#E31837]" />
                    <span>Дані для доставки Новою Поштою:</span>
                  </h4>

                  {error && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="ПІБ отримувача (наприклад: Шевченко Ольга)"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />

                    <input
                      type="tel"
                      placeholder="Номер телефону (+380...)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Місто (Київ, Львів...)"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="Відділення / Поштомат"
                        value={warehouse}
                        onChange={(e) => setWarehouse(e.target.value)}
                        className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Summary & Pay Button */}
                  <div className="pt-3 border-t border-amber-900/10 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-bold text-slate-500">Загальна сума:</span>
                      <span className="text-2xl font-black text-[#E31837]">
                        {totalAmount} ₴
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-2xl bg-[#E31837] hover:bg-[#C9132D] text-white font-black text-sm shadow-lg shadow-red-200 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Оформити та оплатити ({totalAmount} ₴)</span>
                    </button>

                    <p className="text-[10px] text-center text-slate-500 leading-tight">
                      100% прибутку від кожної речі фінансує зведення Дому Рональда МакДональда в Україні
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
