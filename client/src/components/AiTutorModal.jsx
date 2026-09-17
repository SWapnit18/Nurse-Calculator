import React from 'react';
import { X, Sparkles, AlertCircle, ShieldAlert, ArrowRight } from 'lucide-react';

export default function AiTutorModal({ 
  isOpen, 
  onClose, 
  question, 
  userAnswer, 
  correctAnswer, 
  explanation, 
  aiExplanation, 
  isLoading 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-lg bg-white dark:bg-[#111827] text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">Explain My Mistake</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Educational Clinical Concept Breakdown</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* Question Summary */}
          {question && (
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-white block">Question Scenario:</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{question.scenario || question.questionText}</p>
              <div className="flex gap-4 pt-1 text-[11px] font-bold">
                <span>Your Answer: <strong className="text-red-500">{userAnswer || 'None'}</strong></span>
                <span>Correct: <strong className="text-emerald-600 dark:text-emerald-400">{correctAnswer || question.correctAnswer}</strong></span>
              </div>
            </div>
          )}

          {/* AI / Approved Explanation Content */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Pedagogical Breakdown</span>
            </div>

            {isLoading ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-6 h-6 border-2 border-slate-900 dark:border-white border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Generating educational explanation...</p>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200 leading-relaxed space-y-2 font-medium">
                {aiExplanation ? (
                  <p className="whitespace-pre-line">{aiExplanation}</p>
                ) : explanation ? (
                  <p className="whitespace-pre-line">{explanation}</p>
                ) : (
                  <p>Always align your desired dose with the available concentration and verify units before dividing.</p>
                )}
              </div>
            )}
          </div>

          {/* Safety Disclaimer */}
          <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200/70 dark:border-amber-900/40 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-900 dark:text-amber-200 leading-tight">
              Educational use only. AI explanations do not provide clinical dosage or authorize medication administration.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="nc-btn-primary w-full cursor-pointer"
          >
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );
}
