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
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Question Portfolio</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Author and manage your custom clinical calculation questions.</p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="nc-btn-primary px-3.5 py-2 text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isCreating ? 'Cancel' : 'Create Question'}</span>
        </button>
      </div>

      {/* Success Alert */}
      {successMsg && (
        <div className="nc-card p-3.5 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Creation Form Modal / Card */}
      {isCreating && (
        <form onSubmit={handleSubmit} className="nc-card p-5 space-y-4 border-2 border-slate-900 dark:border-slate-100 bg-white dark:bg-[#111827] animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h2 className="font-extrabold text-base text-slate-900 dark:text-white">Create Custom Clinical Question</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded">
              Author Mode
            </span>
          </div>

          {formError && (
            <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 text-xs font-bold rounded-lg">
              {formError}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Clinical Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Digoxin Pediatric Oral Elixir"
              className="nc-input font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Clinical Topic Area
            </label>
            <select
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className="nc-input font-medium bg-white dark:bg-[#1A2234]"
            >
              {TOPIC_OPTIONS.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Prescription & Patient Scenario
            </label>
            <textarea
              rows={3}
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              placeholder="e.g. Order: Digoxin 0.05 mg PO daily. Available: Digoxin elixir 0.05 mg/mL. How many mL will you administer?"
              className="nc-input h-auto py-2.5 font-medium resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Correct Answer (Number)
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="e.g. 1"
                className="nc-input font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Unit (e.g. mL, tabs)
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="mL"
                className="nc-input font-medium"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="submit"
              className="nc-btn-primary w-full cursor-pointer"
            >
              Save to Portfolio
            </button>
          </div>
        </form>
      )}

      {/* Portfolio Questions List */}
      <div className="space-y-3">
        {customQuestions.length === 0 ? (
          <div className="nc-card p-8 text-center space-y-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900 dark:text-white">No Custom Questions Yet</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                Author your own clinical dosage scenarios, homework problems, and custom exams.
              </p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="nc-btn-secondary text-xs font-bold inline-flex items-center gap-1.5 mx-auto cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create First Question</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {customQuestions.length} Custom Questions
              </span>
              <button
                onClick={onPracticeCustom}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Practice Custom Set</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {customQuestions.map((q) => (
              <div
                key={q.questionId}
                className="nc-card p-4 sm:p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] space-y-2.5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded">
                      {q.topicId?.replace(/_/g, ' ') || 'Clinical Scenario'}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                      {q.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => onDeleteQuestion(q.questionId)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                    title="Delete question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {q.scenario}
                </p>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800 font-bold">
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Correct Target: {q.correctAnswer} {q.unit}
                  </span>
                  <span className="text-slate-400 text-[10px]">
                    {q.createdAt ? `Created ${new Date(q.createdAt).toLocaleDateString()}` : 'Custom Question'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
