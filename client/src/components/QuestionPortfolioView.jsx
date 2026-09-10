import React, { useState } from 'react';
import { PlusCircle, Sparkles, CheckCircle2, Trash2, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';

const TOPIC_OPTIONS = [
  { id: 'liquid_calculations', label: 'Liquid Injections & Syringes' },
  { id: 'tablet_calculations', label: 'Oral & Tablet Calculations' },
  { id: 'iv_flow_mathematics', label: 'IV Flow & Infusion Mathematics' },
  { id: 'unit_conversions', label: 'Clinical Unit Conversions' },
  { id: 'weight_based', label: 'Weight-Based Calculations' },
  { id: 'reconstitution', label: 'Reconstitution Exercises' },
  { id: 'advanced_calc', label: 'Advanced Clinical Titrations' },
];

export default function QuestionPortfolioView({
  customQuestions = [],
  onAddQuestion,
  onDeleteQuestion,
  onPracticeCustom
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [topicId, setTopicId] = useState('liquid_calculations');
  const [scenario, setScenario] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [unit, setUnit] = useState('mL');
  const [step1, setStep1] = useState('');
  const [step2, setStep2] = useState('');
  const [keyPoint, setKeyPoint] = useState('');
  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim() || !scenario.trim() || !correctAnswer.trim() || !unit.trim()) {
      setFormError('Please fill in title, clinical scenario, numerical answer, and unit.');
      return;
    }

    const numAnswer = parseFloat(correctAnswer.trim());
    if (isNaN(numAnswer)) {
      setFormError('Correct answer must be a valid numerical value (e.g. 0.4, 2, 125).');
      return;
    }

    const newQ = {
      questionId: `custom_${Date.now()}`,
      topicId,
      title: title.trim(),
      scenario: scenario.trim(),
      correctAnswer: numAnswer,
      unit: unit.trim(),
      steps: [
        step1.trim() || `1. Identify order and available stock for ${title.trim()}.`,
        step2.trim() || `2. Apply standard clinical dosage calculation to find ${numAnswer} ${unit.trim()}.`,
        '3. Double-check ISMP decimal precision standards.'
      ],
      keyPoint: keyPoint.trim() || 'Always double check units and calculate with leading zeros.',
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    onAddQuestion(newQ);
    setTitle('');
    setScenario('');
    setCorrectAnswer('');
    setStep1('');
    setStep2('');
    setKeyPoint('');
    setIsCreating(false);
    setSuccessMsg('Clinical question added to your custom portfolio!');
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111111]">Question Portfolio</h1>
          <p className="text-sm text-[#666666] mt-0.5">Author and manage your custom clinical calculation questions.</p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="nc-btn-primary px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isCreating ? 'Cancel' : 'Create Question'}</span>
        </button>
      </div>

      {/* Success Alert */}
      {successMsg && (
        <div className="nc-card p-3.5 border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Create Question Modal / Form Accordion */}
      {isCreating && (
        <form onSubmit={handleSubmit} className="nc-card p-4 sm:p-5 space-y-4 bg-white border border-[#111111]/20 shadow-md animate-fade-in">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E5E5E5]">
            <Sparkles className="w-4 h-4 text-[#111111]" />
            <h2 className="font-bold text-sm text-[#111111]">Author New Clinical Question</h2>
          </div>

          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1">
                Question Title
              </label>
              <input
                type="text"
                placeholder="e.g. Pediatric Ceftriaxone Dose"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="nc-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1">
                Clinical Topic
              </label>
              <select
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
                className="nc-input text-sm font-medium bg-white"
              >
                {TOPIC_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1">
              Clinical Scenario / Problem Prompt
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Order: Morphine 4 mg IM. Available: 10 mg/mL vial. How many mL should the nurse administer?"
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              className="nc-input text-sm py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1">
                Correct Answer
              </label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="e.g. 0.4"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="nc-input text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1">
                Unit of Measure
              </label>
              <input
                type="text"
                placeholder="e.g. mL, tablets, gtt/min, mg"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="nc-input text-sm font-semibold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
              Educational Step-by-Step Breakdown (Optional)
            </label>
            <input
              type="text"
              placeholder="Step 1: Formula Setup (e.g. Desired ÷ Have × Volume)"
              value={step1}
              onChange={(e) => setStep1(e.target.value)}
              className="nc-input text-xs"
            />
            <input
              type="text"
              placeholder="Step 2: Calculation (e.g. 4 mg ÷ 10 mg/mL = 0.4 mL)"
              value={step2}
              onChange={(e) => setStep2(e.target.value)}
              className="nc-input text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1">
              Clinical Key Takeaway / ISMP Rule (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Always write 0.4 mL with leading zero to prevent 10-fold overdose."
              value={keyPoint}
              onChange={(e) => setKeyPoint(e.target.value)}
              className="nc-input text-xs"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              className="nc-btn-primary flex-1 flex items-center justify-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Save to Portfolio</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="nc-btn-secondary px-4"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Portfolio Stats Card */}
      <div className="nc-card p-4 bg-[#FAFAFA] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#111111] text-white flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#888888]">Portfolio Size</span>
            <h3 className="text-lg font-bold text-[#111111]">{customQuestions.length} Custom Questions</h3>
          </div>
        </div>

        {customQuestions.length > 0 && (
          <button
            onClick={onPracticeCustom}
            className="nc-btn-primary px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5"
          >
            <span>Practice My Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Question List */}
      <div className="space-y-3">
        {customQuestions.length === 0 ? (
          <div className="nc-card p-8 text-center space-y-3 border-dashed border-2">
            <div className="w-12 h-12 rounded-full bg-[#F7F7F7] flex items-center justify-center mx-auto text-[#888888]">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-base text-[#111111]">No Custom Questions Yet</h2>
              <p className="text-xs text-[#666666] max-w-sm mx-auto mt-1 leading-relaxed">
                Build your own question bank for NCLEX exam review or nursing school lectures.
              </p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="nc-btn-primary px-4 py-2 text-xs mx-auto mt-2 inline-flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Author Your First Question</span>
            </button>
          </div>
        ) : (
          customQuestions.map((q) => (
            <div key={q.questionId} className="nc-card p-4 space-y-3 relative group">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#111111] text-white rounded text-[10px] font-bold uppercase tracking-wider">
                      Author: You
                    </span>
                    <span className="text-[11px] font-medium text-[#666666]">
                      {q.topicId?.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-[#111111] pt-1">{q.title}</h3>
                </div>

                <button
                  onClick={() => onDeleteQuestion(q.questionId)}
                  className="w-8 h-8 rounded-lg text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors flex-shrink-0"
                  title="Delete question"
                  aria-label="Delete question"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#333333] leading-relaxed bg-[#F7F7F7] p-3 rounded-xl border border-[#E5E5E5]">
                {q.scenario || q.prompt}
              </p>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E5E5E5]">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Correct Answer: {q.correctAnswer} {q.unit}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
