import React from 'react';
import { X, CreditCard, Shield, CheckCircle2, Sparkles } from 'lucide-react';

export default function SubscriptionModal({
  isOpen,
  onClose
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="nc-card max-w-md w-full p-6 space-y-4 shadow-2xl relative bg-white dark:bg-[#111827] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-slate-900 dark:text-white" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">NurseCalc Pro Membership</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative message */}
        <div className="py-2 space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center mx-auto text-amber-700 dark:text-amber-300">
            <Sparkles className="w-6 h-6" />
          </div>
          <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
            100% Free Educational Access
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
            All 6 dosage verification calculators, NCLEX question banks, and AI mistake explanations are fully unlocked for student practice.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span>Zero-error deterministic calculation engine</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span>ISMP standard leading & trailing decimal alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span>Author custom clinical questions in portfolio</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="nc-btn-primary w-full cursor-pointer"
          >
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
}
