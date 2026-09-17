import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  CheckCircle2, 
  Calculator, 
  Repeat, 
  Pill, 
  Syringe, 
  Activity, 
  Zap, 
  Baby, 
  ShieldAlert,
  GraduationCap,
  Sparkles,
  ChevronDown,
  Layers
} from 'lucide-react';
import { CURRICULUM_UNITS, LESSONS_DATABASE } from '../data/lessonsData';

const ICON_MAP = {
  Calculator,
  Repeat,
  Pill,
  Syringe,
  Activity,
  Zap,
  Baby,
  ShieldAlert
};

export default function LearnView({ completedLessons = new Set(), onSelectTopic, onSelectLesson }) {
  const completedSet = completedLessons instanceof Set ? completedLessons : new Set(completedLessons);
  const [expandedUnit, setExpandedUnit] = useState(null);

  // Compute total curriculum progress
  const totalLessonsInCurriculum = Object.keys(LESSONS_DATABASE).length;
  const totalCompletedLessons = Object.keys(LESSONS_DATABASE).filter(k => completedSet.has(k)).length;
  const overallCurriculumPct = Math.round((totalCompletedLessons / totalLessonsInCurriculum) * 100);

  const toggleExpand = (unitId, e) => {
    e.stopPropagation();
    setExpandedUnit(prev => prev === unitId ? null : unitId);
  };

  return (
    <div className="space-y-5 pb-12 animate-fade-in max-w-4xl mx-auto">
      {/* Clean Native Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Learn & Review
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            8 Units · 42 Clinical Calculation Lessons
          </p>
        </div>

        {/* Clean Minimalist Progress Indicator */}
        <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xs w-fit">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Completed: <b className="text-slate-900 dark:text-white">{totalCompletedLessons}/42</b> ({overallCurriculumPct}%)
          </span>
          <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-slate-900 dark:bg-white rounded-full transition-all duration-500"
              style={{ width: `${overallCurriculumPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Units List */}
      <div className="space-y-3">
        {CURRICULUM_UNITS.map((unit, unitIdx) => {
          const IconComp = ICON_MAP[unit.icon] || BookOpen;
          const totalInUnit = unit.lessonIds.length;
          const completedInUnit = unit.lessonIds.filter(lId => completedSet.has(lId) || completedSet.has(unit.id)).length;
          const isUnitComplete = completedInUnit === totalInUnit;
          const unitPct = Math.round((completedInUnit / totalInUnit) * 100);
          const isExpanded = expandedUnit === unit.id;
          const unitNum = unit.unitNumber || unitIdx + 1;

          return (
            <div
              key={unit.id}
              className={`nc-card overflow-hidden transition-all duration-150 border ${
                isUnitComplete
                  ? 'border-slate-300 dark:border-slate-700 bg-white dark:bg-[#111827]'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]'
              }`}
            >
              {/* Unit Header Card */}
              <div
                onClick={() => onSelectTopic(unit.id)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group"
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${
                    isUnitComplete 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-slate-900 dark:border-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                  }`}>
                    {isUnitComplete ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-600" />
                    ) : (
                      <IconComp className="w-5 h-5" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                        Unit {unitNum}
                      </span>
                      <h2 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                        {unit.shortTitle || unit.title}
                      </h2>
                      {isUnitComplete && (
                        <span className="text-[10px] font-black px-2 py-0.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 dark:text-emerald-600" />
                          Mastered
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {unit.desc}
                    </p>

                    {/* Progress Bar & Counter */}
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex-1 max-w-[150px] h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-slate-900 dark:bg-white rounded-full transition-all duration-500" 
                          style={{ width: `${unitPct}%` }} 
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        {completedInUnit}/{totalInUnit} lessons {unitPct > 0 ? `(${unitPct}%)` : ''}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => toggleExpand(unit.id, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title={isExpanded ? "Collapse Lessons" : "View Lessons in Unit"}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-slate-900 dark:text-white' : ''}`} />
                  </button>
                  <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Collapsible Unit Lessons Breakdown */}
              {isExpanded && (
                <div className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/60 p-3.5 sm:p-4 space-y-2">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Unit {unitNum} Lessons ({totalInUnit})</span>
                    </span>
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold">
                      Select any lesson to study
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {unit.lessonIds.map((lId, lIdx) => {
                      const lData = LESSONS_DATABASE[lId];
                      if (!lData) return null;
                      const isLComp = completedSet.has(lId);

                      return (
                        <div
                          key={lId}
                          onClick={() => {
                            if (onSelectLesson) {
                              onSelectLesson(lId);
                            } else {
                              onSelectTopic(unit.id);
                            }
                          }}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 group/item ${
                            isLComp
                              ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white'
                              : 'bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase flex-shrink-0 ${
                              isLComp 
                                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                            }`}>
                              {isLComp ? '✓ Done' : `${unitNum}.${lIdx + 1}`}
                            </span>
                            <span className="text-xs font-semibold truncate group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors">
                              {lData.title}
                            </span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:translate-x-0.5 transition-transform flex-shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
