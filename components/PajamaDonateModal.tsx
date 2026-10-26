"use client";

import React, { useState } from 'react'
import { X, Heart, Gift, ExternalLink, Sparkles, Copy, Check } from 'lucide-react'
import confetti from 'canvas-confetti'

interface PajamaDonateModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenRules: () => void
}

const PRESET_AMOUNTS = [50, 100, 200, 500, 1000]

export const PajamaDonateModal: React.FC<PajamaDonateModalProps> = ({
  isOpen,
  onClose,
  onOpenRules,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(200)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [isCopied, setIsCopied] = useState<boolean>(false)

  if (!isOpen) return null

  const activeAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedAmount

  const handleSelectPreset = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleDonateMonobank = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#DB0007', '#FFBC0D', '#8EE7F8'],
      })
    } catch {
      // ignore
    }
    // Open Monobank Jar
    window.open('https://send.monobank.ua/jar/3JSJjNu4H4', '_blank')
  }

  const handleCopyIban = () => {
    navigator.clipboard.writeText('UA543052990000026001026227658')
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-red-200 relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          aria-label="Закрити"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-red-100 text-[#DB0007] flex items-center justify-center mx-auto shadow-xs">
            <Heart className="w-7 h-7 fill-[#DB0007]" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            Підтримати Дім для дітей
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Офіційний збір до Дня Піжам 13 листопада
          </p>
        </div>

        {/* Raffle banner if amount >= 50 */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-700 flex items-center justify-center shrink-0">
              <Gift className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-black text-slate-900 leading-tight">
                Участь у розіграші подарунків!
              </span>
              <span className="text-[11px] text-slate-600">
                За кожен донат від 50 ₴
              </span>
            </div>
          </div>
          <button
            onClick={onOpenRules}
            className="text-[11px] font-black text-amber-700 underline hover:text-amber-800 shrink-0 cursor-pointer"
          >
            Умови
          </button>
        </div>

        {/* Amount Presets */}
        <div className="space-y-3 mb-6">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Оберіть суму внеску:
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {PRESET_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => handleSelectPreset(amt)}
                className={`
                  py-2.5 px-2 rounded-xl text-sm font-black transition-all cursor-pointer border
                  ${selectedAmount === amt && !customAmount
                    ? 'bg-[#DB0007] text-white border-[#DB0007] shadow-xs scale-105'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }
                `}
              >
                {amt} ₴
              </button>
            ))}
          </div>

          <div className="relative mt-2">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Інша сума (наприклад, 350)"
              value={customAmount}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '')
                setCustomAmount(val)
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-red-400 focus:ring-2 focus:ring-red-200 outline-none transition-all pr-12 font-bold"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">
              ₴
            </span>
          </div>
        </div>

        {/* Action Button: Monobank */}
        <div className="space-y-3">
          <button
            onClick={handleDonateMonobank}
            className="w-full py-4 px-6 rounded-lg bg-[#DB0007] hover:bg-[#91187D] text-[#FFFDE9] font-bold text-base shadow-lg shadow-red-200 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 font-raleway"
          >
            <Sparkles className="w-5 h-5 fill-white" />
            <span>Задонатити {activeAmount > 0 ? `${activeAmount} ₴` : ''} на Монобанку</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </button>

          {/* IBAN details accordion / toggle */}
          <div className="text-center pt-2">
            <button
              onClick={handleCopyIban}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-600">IBAN скопійовано!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Скопіювати реквізити IBAN фонду</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
