import React from 'react';
import { 
  CheckCircle2, XCircle, ArrowRight, Bookmark, 
  Sparkles, ShieldCheck, AlertCircle, RefreshCw, Lightbulb 
} from 'lucide-react';

export default function PracticeView({
  currentQuestion,
  questionIndex,
  totalQuestions,
  userAnswer,
  setUserAnswer,
  unit,
  isSubmitted,
  isChecking,
  result,
  onCheckAnswer,
  onNextQuestion,
  onPreviousQuestion,
  onOpenAiTutor,
  isBookmarked,
  onToggleBookmark
}) {
  if (!currentQuestion) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="w-10 h-10 border-2 border-[#111111] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-[#666666]">Loading practice questions...</p>
      </div>
    );
  }

  const progressPercent = Math.round(((questionIndex + 1) / totalQuestions) * 100);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isSubmitted && !isChecking && userAnswer.trim()) {
      onCheckAnswer();
    }
  };

  return (
    <div className="space-y-4 pb-12 animate-fade-in w-full max-w-full overflow-hidden">
      {/* Header Info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium text-[#666666]">
          <span>Question {questionIndex + 1} of {totalQuestions}</span>
          <div className="flex items-center gap-2">
            <span>{progressPercent}%</span>
            <button
              onClick={onToggleBookmark}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                isBookmarked ? 'text-[#111111] bg-[#EAEAEA]' : 'text-[#888888] hover:bg-[#F7F7F7]'
              }`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-[#EAEAEA] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#111111] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Scenario / Question Card */}
      <div className="nc-card p-4 sm:p-5 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F7F7F7] border border-[#E5E5E5] rounded-md text-[11px] font-semibold uppercase tracking-wider text-[#666666]">
          Scenario
        </div>
        <p className="text-base text-[#111111] font-medium leading-relaxed">
          {currentQuestion.scenario || currentQuestion.questionText}
        </p>
      </div>

      {/* Answer Input Section */}
      {!isSubmitted ? (
        <div className="space-y-3 w-full">
          <label 
            htmlFor="practice-answer-input"
            className="block text-xs font-semibold uppercase tracking-wider text-[#666666]"
          >
            Your Answer ({unit || currentQuestion.unit || 'mL'})
          </label>
          
          <div className="relative w-full">
            <input
              id="practice-answer-input"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="e.g. 0.4"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isChecking}
              className="nc-input text-lg font-semibold pr-16 w-full"
              aria-label="Enter calculation answer"
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#888888] pointer-events-none uppercase">
              {unit || currentQuestion.unit || 'mL'}
            </div>
          </div>

          {/* CRITICAL FULL-WIDTH CHECK ANSWER BUTTON */}
          <div className="w-full pt-1">
            <button
              id="btn-check-answer"
              type="button"
              onClick={onCheckAnswer}
              disabled={isChecking || !userAnswer.trim()}
              className="nc-btn-primary w-full flex items-center justify-center gap-2"
            >
              {isChecking ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Check Answer</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Result & Educational Breakdown */
        <div className="space-y-4 animate-fade-in w-full">
          {/* Result Card */}
          <div className={`nc-card p-4 sm:p-5 border-2 ${
            result?.isCorrect 
              ? 'border-emerald-500/40 bg-emerald-50/20' 
              : 'border-red-500/40 bg-red-50/20'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                result?.isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}>
                {result?.isCorrect ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <XCircle className="w-6 h-6" />
                )}
              </div>
              <div>
                <h2 className={`text-lg font-bold ${
                  result?.isCorrect ? 'text-emerald-900' : 'text-red-900'
                }`}>
                  {result?.isCorrect ? 'Correct!' : 'Incorrect'}
                </h2>
                <p className="text-xs text-[#666666]">
                  {result?.isCorrect ? 'Well done! Exact educational match.' : 'Review the steps below to master this concept.'}
                </p>
              </div>
            </div>

            {/* Answer Comparison */}
            <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-[#E5E5E5]/60 text-center">
              <div className="p-2.5 bg-white rounded-xl border border-[#E5E5E5]">
                <span className="text-[11px] font-medium text-[#666666] block">Your Answer</span>
                <span className={`text-base font-bold ${
                  result?.isCorrect ? 'text-emerald-700' : 'text-red-600'
                }`}>
                  {userAnswer} {unit || currentQuestion.unit}
                </span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-[#E5E5E5]">
                <span className="text-[11px] font-medium text-[#666666] block">Correct Answer</span>
                <span className="text-base font-bold text-[#111111]">
                  {result?.correctAnswer || currentQuestion.correctAnswer} {unit || currentQuestion.unit}
                </span>
              </div>
            </div>
          </div>

          {/* Educational Step-by-Step Breakdown */}
          <div className="nc-card p-4 sm:p-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#888888]">
              Step-by-Step Educational Explanation
            </h3>

            {/* Steps list */}
            {result?.steps && result.steps.length > 0 ? (
              <div className="space-y-2 pt-1">
                {result.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#333333]">
                    <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#444444] leading-relaxed">
                {currentQuestion.explanation || result?.explanation || 'Apply standard desired over have calculation formula.'}
              </p>
            )}

            {/* Key Point */}
            <div className="p-3 bg-[#F7F7F7] rounded-xl border border-[#E5E5E5] flex items-start gap-2.5 mt-3">
              <Lightbulb className="w-4 h-4 text-[#111111] flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#444444]">
                <strong className="text-[#111111] block mb-0.5">Key Takeaway:</strong>
                {currentQuestion.keyPoint || 'Always use consistent units and double-check concentration before calculating.'}
              </div>
            </div>
          </div>

          {/* Action Buttons: Next & Explain My Mistake */}
          <div className="space-y-2 pt-1">
            <button
              id="btn-next-question"
              onClick={onNextQuestion}
              className="nc-btn-primary w-full flex items-center justify-center gap-2"
            >
              <span>{questionIndex + 1 >= totalQuestions ? 'Complete Practice' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {!result?.isCorrect && (
              <button
                type="button"
                onClick={onOpenAiTutor}
                className="nc-btn-secondary w-full flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explain My Mistake with AI</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
