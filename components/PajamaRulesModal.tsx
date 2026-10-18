"use client";

import React from 'react'
import { X, Gift, CheckCircle2, AlertCircle } from 'lucide-react'

interface PajamaRulesModalProps {
  isOpen: boolean
  onClose: () => void
  onDonateClick: () => void
}

export const PajamaRulesModal: React.FC<PajamaRulesModalProps> = ({
  isOpen,
  onClose,
  onDonateClick,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-amber-200 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          aria-label="Закрити"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Умови розіграшу подарунків
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              До Всеукраїнського Дня Піжам 13 листопада
            </p>
          </div>
        </div>

        <div className="space-y-4 text-slate-700 text-sm">
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Хто бере участь:</strong> кожен, хто зробить благодійний внесок <strong>від 50 грн</strong> на будівництво Дому Рональда МакДональда.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <p>
              <strong>Кожен донат — це квиток:</strong> кожні 50 грн у сумі внеску збільшують шанси (наприклад, внесок 200 грн = 4 шанси на виграш).
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p>
              <strong>Контактні дані:</strong> при донаті на Монобанку обов’язково вказуйте свій номер телефону або нік в Instagram / Telegram у полі «Коментар», щоб ми могли з вами зв’язатися.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <p>
              <strong>Коли розіграш:</strong> підведення підсумків відбудеться у прямому ефірі в соцмережах Фундації за допомогою рандомайзера після завершення акції.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
            <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <span>100% зібраних коштів спрямовуються на будівництво Дому Рональда МакДональда для сімей важкохворих дітей.</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              onClose()
              onDonateClick()
            }}
            className="flex-1 py-3 px-5 rounded-2xl bg-[#E31837] hover:bg-[#C9132D] text-white font-black text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Gift className="w-4 h-4" />
            <span>Зробити донат від 50 ₴</span>
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
          >
            Зрозуміло
          </button>
        </div>
      </div>
    </div>
  )
}
