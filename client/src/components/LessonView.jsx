import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ShieldCheck,
  FileText,
  Calculator,
  ListOrdered,
  Layers
} from 'lucide-react';
import { 
  CURRICULUM_UNITS,
  LESSONS_DATABASE, 
  ALL_LESSON_KEYS, 
  TOPIC_ID_TO_FIRST_LESSON 
} from '../data/lessonsData';

export default function LessonView({
  lesson: incomingLessonKey,
  completedLessons = new Set(),
  onToggleLessonComplete,
  onBack,
  onSelectLesson,
  onStartPractice
}) {
  // Resolve lesson key if a unit ID was passed in
  let currentKey = incomingLessonKey || 'les_mmb_1';
  if (TOPIC_ID_TO_FIRST_LESSON[currentKey]) {
    currentKey = TOPIC_ID_TO_FIRST_LESSON[currentKey];
  }
  if (!LESSONS_DATABASE[currentKey]) {
    currentKey = ALL_LESSON_KEYS[0];
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentKey]);

  const lesson = LESSONS_DATABASE[currentKey];
  const currentIndex = ALL_LESSON_KEYS.indexOf(currentKey);
  const prevKey = currentIndex > 0 ? ALL_LESSON_KEYS[currentIndex - 1] : null;
  const nextKey = currentIndex < ALL_LESSON_KEYS.length - 1 ? ALL_LESSON_KEYS[currentIndex + 1] : null;

  // Compute current Unit metrics (e.g. Unit 1 · Lesson 1 of 6)
  const unitIndex = CURRICULUM_UNITS.findIndex(m => m.id === lesson.moduleId);
  const currentUnit = unitIndex !== -1 ? CURRICULUM_UNITS[unitIndex] : CURRICULUM_UNITS[0];
  const unitNumber = currentUnit.unitNumber || unitIndex + 1;
  const lessonInUnit = currentUnit.lessonIds.indexOf(currentKey) !== -1 ? currentUnit.lessonIds.indexOf(currentKey) + 1 : 1;
  const unitTotalLessons = currentUnit.lessonIds.length;
  const lessonCode = `Lesson ${unitNumber}.${lessonInUnit}`;

  const completedSet = completedLessons instanceof Set ? completedLessons : new Set(completedLessons);
  const isCompleted = completedSet.has(currentKey);

  // Helper for prev and next codes
  const getLessonDisplayCode = (key) => {
    if (!key) return '';
    const l = LESSONS_DATABASE[key];
    if (!l) return '';
    const uIdx = CURRICULUM_UNITS.findIndex(u => u.id === l.moduleId);
    const u = uIdx !== -1 ? CURRICULUM_UNITS[uIdx] : CURRICULUM_UNITS[0];
    const uNum = u.unitNumber || uIdx + 1;
    const lInU = u.lessonIds.indexOf(key) + 1;
    return `Lesson ${uNum}.${lInU}`;
  };

  return (
    <div className="space-y-5 pb-12 animate-fade-in max-w-4xl mx-auto">
      {/* Top Breadcrumb & Quick Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Units (8 Units · 42 Lessons)</span>
        </button>

        {/* Quick Lesson Jump Selector & Unit Badge */}
        <div className="flex items-center gap-2">
          {isCompleted && (
            <span className="text-[11px] font-black px-2.5 py-0.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
              <span>Completed</span>
            </span>
          )}

          <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg">
            Unit {unitNumber} · {lessonInUnit}/{unitTotalLessons}
          </span>

          <div className="relative">
            <select
              value={currentKey}
              onChange={(e) => onSelectLesson(e.target.value)}
              className="text-xs font-bold bg-white dark:bg-[#111827] text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg py-1.5 pl-2.5 pr-7 cursor-pointer focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none shadow-2xs"
            >
              {ALL_LESSON_KEYS.map((k) => {
                const lObj = LESSONS_DATABASE[k];
                const uI = CURRICULUM_UNITS.findIndex(u => u.id === lObj.moduleId);
                const uNum = (uI !== -1 ? CURRICULUM_UNITS[uI].unitNumber : 1) || (uI + 1);
                const lNum = (uI !== -1 ? CURRICULUM_UNITS[uI].lessonIds.indexOf(k) + 1 : 1);
                return (
                  <option key={k} value={k}>
                    Unit {uNum} · Lesson {uNum}.{lNum}: {lObj.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Lesson Header Banner - Monochrome */}
      <div className="space-y-2 p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 flex items-center gap-1">
            <Layers className="w-3 h-3" />
            Unit {unitNumber}: {currentUnit.shortTitle || lesson.moduleTitle}
          </span>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {lessonCode} (Lesson {lessonInUnit} of {unitTotalLessons} in Unit {unitNumber})
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          {lessonCode}: {lesson.title}
        </h1>

        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-slate-600 dark:text-slate-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 dark:text-white">Clinical Objective: </span>
            {lesson.objective}
          </div>
        </div>
      </div>

      {/* 1. Core Clinical Concept (In-Depth Explanation) */}
      <div className="nc-card p-5 space-y-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <BookOpen className="w-4 h-4 text-slate-900 dark:text-white" />
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
            1. Core Clinical Concept & Pharmacology
          </h2>
        </div>
        <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
          {lesson.concept}
        </p>
      </div>

      {/* 2. Short Notes (High-Yield Quick Revision Box) - Monochrome */}
      <div className="nc-card p-5 space-y-3.5 bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-900 dark:text-white" />
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              2. Short Notes & Revision Summary
            </h2>
          </div>
          <span className="text-[10px] font-black px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full">
            High-Yield NCLEX
          </span>
        </div>

        <ul className="space-y-2 pt-1">
          {lesson.shortNotes.map((note, nIdx) => (
            <li key={nIdx} className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-medium">
              <span className="w-4 h-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                •
              </span>
              <span className="leading-relaxed">{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Step-by-Step Worked Clinical Calculation */}
      <div className="nc-card p-5 space-y-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-slate-900 dark:text-white" />
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              3. Worked Clinical Calculation & Step-by-Step Math
            </h2>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded">
            Step-by-Step
          </span>
        </div>
        
        {/* Scenario Box */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 space-y-1">
          <span className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">
            Prescription & Scenario:
          </span>
          <p className="leading-relaxed text-sm font-semibold text-slate-900 dark:text-white">
            {lesson.workedExample.scenario}
          </p>
        </div>

        {/* Formula Display - Sleek Monospace Box */}
        <div className="p-3 bg-slate-900 text-white dark:bg-black rounded-xl border border-slate-800 dark:border-slate-800 text-xs font-mono font-bold">
          <span className="text-slate-400 mr-2 font-sans font-extrabold uppercase text-[10px]">Formula:</span>
          {lesson.workedExample.formula}
        </div>

        {/* Numbered Steps */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
            <ListOrdered className="w-3.5 h-3.5 text-slate-400" />
            <span>Calculation Steps:</span>
          </div>

          {lesson.workedExample.steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed font-medium">{step}</span>
            </div>
          ))}
        </div>

        {/* Final Result & Rationale - High-Contrast Card */}
        <div className="p-3.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 border border-slate-900 dark:border-white space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 dark:text-slate-700">
              Calculated Result:
            </span>
            <span className="text-sm font-black bg-white/20 dark:bg-slate-900/20 px-2.5 py-0.5 rounded-lg">
              {lesson.workedExample.result}
            </span>
          </div>
          <p className="text-xs text-slate-300 dark:text-slate-700 pt-1 leading-relaxed">
            <span className="font-bold text-white dark:text-black">Clinical Rationale: </span>
            {lesson.workedExample.rationale}
          </p>
        </div>
      </div>

      {/* 4. NCLEX Pitfall */}
      <div className="nc-card p-5 bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-700 space-y-2 shadow-2xs">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
            4. Common NCLEX Pitfall & Error Trap
          </h2>
        </div>
        <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          {lesson.mistakes}
        </p>
      </div>

      {/* 5. Golden Safety Rule (ISMP Standard) */}
      <div className="p-4 bg-white dark:bg-[#111827] rounded-2xl border border-slate-300 dark:border-slate-700 flex items-start gap-3 shadow-2xs">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
          <span className="font-black uppercase tracking-wider text-[11px] block text-slate-900 dark:text-white mb-0.5">
            5. ISMP Golden Safety Rule:
          </span>
          <span className="font-medium text-slate-700 dark:text-slate-300">{lesson.keyPoint}</span>
        </div>
      </div>

      {/* Action Buttons - Solid Monochrome */}
      <div className="space-y-2.5 pt-2">
        <button
          onClick={() => onToggleLessonComplete && onToggleLessonComplete(currentKey)}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
            isCompleted
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-300'
              : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? `${lessonCode} Completed ✓ (Tap to Undo)` : `Mark ${lessonCode} as Completed`}</span>
        </button>

        <button
          onClick={onStartPractice}
          className="nc-btn-secondary w-full flex items-center justify-center gap-2 text-xs font-bold py-3 cursor-pointer"
        >
          <span>Practice Unit {unitNumber} Questions</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Unit & Lesson Navigation Footer */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => prevKey && onSelectLesson(prevKey)}
          disabled={!prevKey}
          className="nc-btn-secondary flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="truncate">Prev: {getLessonDisplayCode(prevKey)}</span>
        </button>

        <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 px-2 flex-shrink-0">
          Unit {unitNumber} · {lessonInUnit}/{unitTotalLessons}
        </span>

        <button
          onClick={() => nextKey && onSelectLesson(nextKey)}
          disabled={!nextKey}
          className="nc-btn-secondary flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <span className="truncate">Next: {getLessonDisplayCode(nextKey)}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
