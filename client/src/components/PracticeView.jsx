import React from 'react';
import { 
  CheckCircle2, XCircle, ArrowRight, ArrowLeft, Bookmark, 
  Sparkles, ShieldCheck, AlertCircle, RefreshCw, Lightbulb, ChevronLeft, ChevronRight 
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
        <div className="w-10 h-10 border-2 border-slate-900 dark:border-white border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-600 dark:text-slate-400">Loading practice questions...</p>
      </div>
    );
  }

  const progressPercent = Math.round(((questionIndex + 1) / totalQuestions) * 100);
  const questionScenario = currentQuestion.scenario || currentQuestion.prompt || currentQuestion.questionText || currentQuestion.text || '';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isSubmitted && !isChecking && userAnswer.trim()) {
      onCheckAnswer();
    }
  };

  const formatWithUnit = (ans) => {
    if (ans === undefined || ans === null) return '';
    const ansStr = String(ans).trim();
    const effectiveUnit = (unit || currentQuestion?.unit || '').trim();
    if (!effectiveUnit) return ansStr;
    if (ansStr.toLowerCase().endsWith(effectiveUnit.toLowerCase())) return ansStr;
    return `${ansStr} ${effectiveUnit}`;
  };

  return (
    <div className="space-y-4 pb-12 animate-fade-in w-full max-w-full overflow-hidden">
      {/* Header Info & Quick Navigation */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <button
              onClick={onPreviousQuestion}
              disabled={questionIndex === 0}
              className="p-1 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
              aria-label="Previous question"
              title="Previous question"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-extrabold text-slate-900 dark:text-white">
              Question {questionIndex + 1} of {totalQuestions}
            </span>
            <button
              onClick={onNextQuestion}
              disabled={questionIndex + 1 >= totalQuestions}
              className="p-1 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
              aria-label="Next question"
              title="Next question"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono">{progressPercent}%</span>
            <button
              onClick={onToggleBookmark}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                isBookmarked ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : 'stroke-[2]'}`} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-slate-900 dark:bg-white rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Scenario / Question Card */}
      <div className="nc-card p-4 sm:p-5 space-y-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[10px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {currentQuestion.title || 'Clinical Scenario'}
          </span>
          {currentQuestion.topicId && (
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 capitalize">
              {currentQuestion.topicId.replace(/_/g, ' ')}
            </span>
          )}
        </div>
        <p className="text-base text-slate-900 dark:text-slate-100 font-semibold leading-relaxed pt-1">
          {questionScenario}
        </p>
      </div>

      {/* Answer Input Section */}
      {!isSubmitted ? (
        <div className="space-y-3 w-full">
          <label 
            htmlFor="practice-answer-input"
            className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400"
          >
            Your Numerical Answer ({unit || currentQuestion.unit || 'mL'})
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
              className="nc-input text-lg font-bold pr-16 w-full"
              aria-label="Enter calculation answer"
              autoFocus
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 dark:text-slate-400 pointer-events-none uppercase">
              {unit || currentQuestion.unit || 'mL'}
            </div>
          </div>

          {/* Full-width Check Answer Button */}
          <div className="w-full pt-1">
            <button
              id="btn-check-answer"
              type="button"
              onClick={onCheckAnswer}
              disabled={isChecking || !userAnswer.trim()}
              className="nc-btn-primary w-full flex items-center justify-center gap-2 cursor-pointer"
            >
              {isChecking ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Dose...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Check Answer</span>
                </>
              )}
            </button>
          </div>

          {/* Previous / Next Question Buttons */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={onPreviousQuestion}
              disabled={questionIndex === 0}
              className="nc-btn-secondary text-xs font-bold flex-1 flex items-center justify-center gap-1.5 disabled:opacity-40 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              type="button"
              onClick={onNextQuestion}
              className="nc-btn-secondary text-xs font-bold flex-1 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Skip / Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Evaluation Results Card */
        <div className="space-y-4">
          <div className={`nc-card p-4 sm:p-5 border shadow-sm transition-all duration-300 ${
            result?.isCorrect 
              ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800' 
              : 'bg-red-50/70 dark:bg-red-950/20 border-red-300 dark:border-red-800'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl flex-shrink-0 ${
                result?.isCorrect ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300' : 'bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300'
              }`}>
                {result?.isCorrect ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <XCircle className="w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className={`font-extrabold text-base ${
                  result?.isCorrect ? 'text-emerald-900 dark:text-emerald-200' : 'text-red-900 dark:text-red-200'
                }`}>
                  {result?.isCorrect ? 'Correct! Clinical math verified.' : 'Incorrect dosage result.'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                  {result?.isCorrect 
                    ? `Exact match: ${formatWithUnit(result?.correctAnswer)}`
                    : `Correct target: ${formatWithUnit(result?.correctAnswer)} (You entered: ${formatWithUnit(userAnswer)})`}
                </p>
              </div>
            </div>
          </div>

          {/* Step-by-Step Mathematical Explanation */}
          <div className="nc-card p-4 sm:p-5 space-y-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Calculation Solution Steps
              </h4>
            </div>

            {currentQuestion.steps && (
              <div className="space-y-2 pt-1">
                {currentQuestion.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed font-medium">{step}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Key Clinical Point */}
            {currentQuestion.keyPoint && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-800 dark:text-slate-200 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">ISMP Clinical Rule: </span>
                  {currentQuestion.keyPoint}
                </div>
              </div>
            )}
          </div>

          {/* AI Explanation Help Button */}
          {!result?.isCorrect && (
            <button
              type="button"
              onClick={onOpenAiTutor}
              className="nc-btn-secondary w-full flex items-center justify-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/30 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Explain My Mistake with AI Tutor</span>
            </button>
          )}

          {/* Next Question CTA */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onNextQuestion}
              className="nc-btn-primary w-full flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{questionIndex + 1 < totalQuestions ? 'Next Question' : 'Finish Practice Session'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
