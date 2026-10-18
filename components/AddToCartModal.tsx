"use client";

import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { ShopItem, ShopItemVariant } from './PajamaShopModal';
import { useCart } from '@/lib/CartContext';

interface AddToCartModalProps {
  item: ShopItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AddToCartModal: React.FC<AddToCartModalProps> = ({ item, isOpen, onClose }) => {
  const { addToCart, openCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ShopItemVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (item && item.variants && item.variants.length > 0) {
      setSelectedVariant(item.variants[0]);
    } else {
      setSelectedVariant(null);
    }

    if (item && item.sizes && item.sizes.length > 0) {
      setSelectedSize(item.sizes[0]);
    } else {
      setSelectedSize('');
    }

    setQuantity(1);
  }, [item]);

  if (!isOpen || !item) return null;

  const currentPrice = selectedVariant ? selectedVariant.price : item.price;

  const handleAdd = () => {
    addToCart(item, selectedVariant, selectedSize, quantity);
    onClose();
    openCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-amber-200 relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          aria-label="Закрити"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product preview */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
          <div
            className="w-16 h-16 rounded-2xl p-2 flex items-center justify-center shrink-0 border border-amber-100/80 overflow-hidden"
            style={{ backgroundColor: item.colorTheme }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageSrc}
              alt={item.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 leading-tight">
              {item.name}
            </h3>
            <span className="text-lg font-black text-[#E31837]">
              {currentPrice} ₴
            </span>
          </div>
        </div>

        {/* Options */}
        <div className="py-4 space-y-4">
          {item.variants && item.variants.length > 0 && (
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                Комплектація:
              </label>
              <div className="grid grid-cols-1 gap-2">
                {item.variants.map((v) => (
                  <button
                    key={v.name}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`
                      p-2.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between text-xs
                      ${selectedVariant?.name === v.name
                        ? 'border-amber-500 bg-amber-50/70 shadow-xs ring-2 ring-amber-300 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    <span>{v.name}</span>
                    <span className="font-black text-[#E31837]">{v.price} ₴</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {item.sizes && item.sizes.length > 0 && (
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                Варіант / Колір:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {item.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`
                      py-1.5 px-3 rounded-lg text-xs transition-all cursor-pointer
                      ${selectedSize === s
                        ? 'bg-slate-900 text-white font-bold shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }
                    `}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-black text-slate-700">Кількість:</span>
            <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 hover:bg-slate-200 text-slate-600 rounded-l-xl transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-3 text-sm font-black text-slate-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 hover:bg-slate-200 text-slate-600 rounded-r-xl transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAdd}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#E31837] hover:bg-[#C9132D] text-white font-black text-xs shadow-md shadow-red-200 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Додати в кошик ({currentPrice * quantity} ₴)</span>
        </button>
      </div>
    </div>
  );
};
