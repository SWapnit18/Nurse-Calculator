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
        className="fixed inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-[#E5E5E5] shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#111111] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-[#111111]">Explain My Mistake</h2>
              <p className="text-xs text-[#666666]">Educational Concept Guide</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#666666] hover:bg-[#F7F7F7] active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* Question Summary */}
          {question && (
            <div className="p-3.5 bg-[#F7F7F7] rounded-xl border border-[#E5E5E5] text-xs space-y-1.5">
              <span className="font-semibold text-[#111111] block">Question Scenario:</span>
              <p className="text-[#444444] leading-relaxed">{question.scenario || question.questionText}</p>
              <div className="flex gap-4 pt-1 text-[11px]">
                <span>Your Answer: <strong className="text-red-600">{userAnswer || 'None'}</strong></span>
                <span>Correct: <strong className="text-emerald-700">{correctAnswer || question.correctAnswer}</strong></span>
              </div>
            </div>
          )}

          {/* AI / Approved Explanation Content */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#111111] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
              <span>Educational Breakdown</span>
            </div>

            {isLoading ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-6 h-6 border-2 border-[#111111] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-[#666666]">Generating educational explanation...</p>
              </div>
            ) : (
              <div className="p-4 bg-white rounded-xl border border-[#E5E5E5] text-sm text-[#333333] leading-relaxed space-y-2">
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
          <div className="p-3 bg-[#FAFAFA] rounded-xl border border-[#E5E5E5] flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-[#888888] flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-[#666666] leading-tight">
              Educational use only. AI explanations do not provide clinical dosage or authorize medication administration.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="nc-btn-primary w-full"
          >
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );
}
