import React, { useState, useEffect, useMemo } from 'react';
import MobileHeader from './components/MobileHeader';
import BottomNav from './components/BottomNav';
import SideMenuModal from './components/SideMenuModal';
import AiTutorModal from './components/AiTutorModal';
import SubscriptionModal from './components/SubscriptionModal';

import HomeView from './components/HomeView';
import LearnView from './components/LearnView';
import LessonView from './components/LessonView';
import PracticeView from './components/PracticeView';
import CalculatorView from './components/CalculatorView';
import MistakesView from './components/MistakesView';
import ProgressView from './components/ProgressView';
import ProfileView from './components/ProfileView';
import SettingsView from './components/SettingsView';
import AiTutorView from './components/AiTutorView';
import QuestionPortfolioView from './components/QuestionPortfolioView';
import { INITIAL_QUESTION_BANK } from './data/fallbackQuestions';
import { Bookmark, ArrowRight, Trash2, BookOpen } from 'lucide-react';

import CalculationEngine from './calculator/engine';

// Maps frontend lesson IDs and mistake category IDs to question topicIds
const LESSON_TO_TOPIC_MAP = {
  'medication-math-basics': ['med_math_basics'],
  'unit-conversions': ['unit_conversions'],
  'unit-conversion': ['unit_conversions'],
  'tablet-calculations': ['tablet_calculations'],
  'tablet-calculation': ['tablet_calculations'],
  'liquid-calculations': ['liquid_calculations'],
  'iv-flow-mathematics': ['iv_flow_mathematics'],
  'flow-rate': ['iv_flow_mathematics'],
  'decimals-rounding': ['med_math_basics'],
  'weight-based-practice': ['med_math_basics', 'weight_based'],
  'reconstitution-exercises': ['liquid_calculations', 'reconstitution'],
  'reconstitution': ['liquid_calculations', 'reconstitution'],
  'advanced-calculations': ['unit_conversions', 'iv_flow_mathematics', 'advanced_calc']
};

export default function App() {
  // Navigation tabs:
  // 'home' | 'learn' | 'lesson' | 'practice' | 'calculator' | 'mistakes' | 'progress' | 'profile' | 'settings' | 'ai-tutor' | 'learning-goals' | 'bookmarks' | 'safety' | 'help'
  const [activeTab, setActiveTab] = useState('home');
  const [previousTab, setPreviousTab] = useState('home');
  
  // Modals
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);

  // Dark Mode Theme Management
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('nursecalc_theme');
      if (saved) return saved === 'dark';
      return false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('nursecalc_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('nursecalc_theme', 'light');
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // User State
  const [user, setUser] = useState({
    name: 'Nurse Student',
    email: 'student@nursecalc.app'
  });

  // Dynamic Dashboard / Progress Stats
  const [stats, setStats] = useState({
    accuracy: 82,
    totalQuestions: 126,
    correctAnswers: 103,
    incorrectAnswers: 23,
    streakDays: 6,
    weakTopic: { title: 'IV Flow Mathematics', accuracy: 51 }
  });

  // Learn State & Practice Filter
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [practiceTopicFilter, setPracticeTopicFilter] = useState(null);

  // Practice State
  const [allQuestions, setAllQuestions] = useState(INITIAL_QUESTION_BANK);
  const [customQuestions, setCustomQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem('nursecalc_custom_questions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [practiceResult, setPracticeResult] = useState(null);
  
  // Persistent Bookmarks State
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('nursecalc_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [aiExplanationText, setAiExplanationText] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Custom question handlers
  const handleAddCustomQuestion = (newQuestion) => {
    setCustomQuestions(prev => {
      const updated = [newQuestion, ...prev];
      localStorage.setItem('nursecalc_custom_questions', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteCustomQuestion = (qId) => {
    setCustomQuestions(prev => {
      const updated = prev.filter(q => q.questionId !== qId);
      localStorage.setItem('nursecalc_custom_questions', JSON.stringify(updated));
      return updated;
    });
  };

  // Load questions from backend on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(r => r.json())
      .then(res => {
        if (res.data && res.data.length > 0) {
          setAllQuestions(res.data);
        }
      })
      .catch(() => {
        // Fallback to local high-yield clinical question bank
        setAllQuestions(INITIAL_QUESTION_BANK);
      });

    // Fetch dynamic progress
    fetch('http://localhost:5000/api/progress')
      .then(r => r.json())
      .then(res => {
        if (res.data) {
          setStats(prev => ({
            ...prev,
            accuracy: res.data.overallAccuracy ?? prev.accuracy,
            totalQuestions: res.data.totalAttempts ?? prev.totalQuestions,
            correctAnswers: res.data.correctAttempts ?? prev.correctAnswers,
            incorrectAnswers: res.data.incorrectAttempts ?? prev.incorrectAnswers,
            streakDays: res.data.streak ?? prev.streakDays,
            weeklyActivity: res.data.weeklyActivity,
            topicStats: res.data.topicStats
          }));
        }
      })
      .catch(() => {});
  }, []);

  // Filter questions dynamically based on selected lesson or general practice
  const activeQuestions = useMemo(() => {
    const combined = [...customQuestions, ...allQuestions];
    if (!practiceTopicFilter) return combined;
    if (practiceTopicFilter === 'custom') {
      return customQuestions.length > 0 ? customQuestions : combined;
    }
    const allowedTopicIds = LESSON_TO_TOPIC_MAP[practiceTopicFilter] || [practiceTopicFilter];
    const filtered = combined.filter(q => allowedTopicIds.includes(q.topicId));
    return filtered.length > 0 ? filtered : combined;
  }, [allQuestions, customQuestions, practiceTopicFilter]);

  const currentQuestion = activeQuestions[currentQIndex] || null;
  const isCurrentBookmarked = currentQuestion ? bookmarks.has(currentQuestion.questionId) : false;

  const handleToggleBookmark = (targetQId) => {
    const qId = targetQId || currentQuestion?.questionId;
    if (!qId) return;
    
    setBookmarks(prev => {
      const next = new Set(prev);
      if (next.has(qId)) {
        next.delete(qId);
      } else {
        next.add(qId);
      }
      try {
        localStorage.setItem('nursecalc_bookmarks', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });

    // Sync with backend API in background
    fetch('http://localhost:5000/api/bookmarks/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: qId,
        userId: 'demo_student'
      })
    }).catch(() => {});
  };

  const handleNavigate = (tabId) => {
    setPreviousTab(activeTab);
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTopicPractice = (topicKey) => {
    const key = typeof topicKey === 'string' ? topicKey : topicKey?.id;
    setPracticeTopicFilter(key || null);
    setCurrentQIndex(0);
    setUserAnswer('');
    setIsSubmitted(false);
    setPracticeResult(null);
    setAiExplanationText(null);
    handleNavigate('practice');
  };

  const handlePracticeSingleQuestion = (qId) => {
    const combined = [...customQuestions, ...allQuestions];
    const targetIdx = combined.findIndex(q => q.questionId === qId);
    if (targetIdx !== -1) {
      setPracticeTopicFilter(null);
      setCurrentQIndex(targetIdx);
      setUserAnswer('');
      setIsSubmitted(false);
      setPracticeResult(null);
      setAiExplanationText(null);
      handleNavigate('practice');
    }
  };

  const handleBack = () => {
    if (activeTab === 'lesson') {
      setActiveTab('learn');
    } else if (['portfolio', 'learning-goals', 'bookmarks', 'safety', 'help', 'settings'].includes(activeTab)) {
      setActiveTab('profile');
    } else if (activeTab === 'practice' && previousTab) {
      setActiveTab(previousTab);
    } else {
      setActiveTab('home');
    }
  };

  // Practice submission logic
  const handleCheckAnswer = () => {
    if (!currentQuestion || !userAnswer.trim() || isChecking) return;
    setIsChecking(true);

    const inputVal = parseFloat(userAnswer.trim());

    fetch('http://localhost:5000/api/practice/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: currentQuestion.questionId,
        studentAnswer: inputVal,
        userId: 'demo_student'
      })
    })
      .then(r => r.json())
      .then(res => {
        setIsChecking(false);
        setIsSubmitted(true);
        const isMatch = res.isCorrect !== undefined 
          ? res.isCorrect 
          : Math.abs(inputVal - currentQuestion.correctAnswer) <= (currentQuestion.tolerance || 0.05);

        setPracticeResult({
          isCorrect: isMatch,
          correctAnswer: res.correctAnswerFormatted || currentQuestion.correctAnswer,
          steps: res.steps || currentQuestion.steps,
          explanation: res.aiExplanation || currentQuestion.explanation,
          mistakeType: res.mistakeType
        });

        // Real-time immediate stats update
        setStats(prev => {
          const newTotal = (prev.totalQuestions || 0) + 1;
          const newCorrect = isMatch ? (prev.correctAnswers || 0) + 1 : (prev.correctAnswers || 0);
          const newAccuracy = Math.round((newCorrect / newTotal) * 1000) / 10;
          return {
            ...prev,
            totalQuestions: newTotal,
            correctAnswers: newCorrect,
            incorrectAnswers: newTotal - newCorrect,
            accuracy: newAccuracy
          };
        });

        // Re-fetch backend progress to keep MongoDB in exact sync
        fetch('http://localhost:5000/api/progress/demo_student')
          .then(r => r.json())
          .then(pRes => {
            if (pRes.data) {
              setStats(prev => ({
                ...prev,
                accuracy: pRes.data.overallAccuracy ?? prev.accuracy,
                totalQuestions: pRes.data.totalAttempts ?? prev.totalQuestions,
                correctAnswers: pRes.data.correctAttempts ?? prev.correctAnswers,
                incorrectAnswers: (pRes.data.totalAttempts ?? prev.totalQuestions) - (pRes.data.correctAttempts ?? prev.correctAnswers)
              }));
            }
          })
          .catch(() => {});
      })
      .catch(() => {
        // Deterministic client fallback check
        setIsChecking(false);
        setIsSubmitted(true);
        const isMatch = Math.abs(inputVal - currentQuestion.correctAnswer) <= (currentQuestion.tolerance || 0.05);
        setPracticeResult({
          isCorrect: isMatch,
          correctAnswer: currentQuestion.correctAnswer,
          steps: currentQuestion.steps,
          explanation: currentQuestion.explanation || 'Apply standard clinical math calculation.',
          mistakeType: isMatch ? null : 'CALCULATION_ERROR'
        });

        // Real-time immediate stats update
        setStats(prev => {
          const newTotal = (prev.totalQuestions || 0) + 1;
          const newCorrect = isMatch ? (prev.correctAnswers || 0) + 1 : (prev.correctAnswers || 0);
          const newAccuracy = Math.round((newCorrect / newTotal) * 1000) / 10;
          return {
            ...prev,
            totalQuestions: newTotal,
            correctAnswers: newCorrect,
            incorrectAnswers: newTotal - newCorrect,
            accuracy: newAccuracy
          };
        });
      });
  };

  const handleNextQuestion = () => {
    setUserAnswer('');
    setIsSubmitted(false);
    setPracticeResult(null);
    setAiExplanationText(null);
    if (currentQIndex + 1 < activeQuestions.length) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setCurrentQIndex(0);
      handleNavigate('home');
    }
  };

  const handleOpenAiTutor = () => {
    setIsAiTutorOpen(true);
    if (currentQuestion) {
      setIsAiLoading(true);
      fetch('http://localhost:5000/api/ai/explain-mistake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQuestion.questionId,
          prompt: currentQuestion.scenario || currentQuestion.prompt || currentQuestion.questionText,
          studentAnswer: userAnswer,
          correctAnswer: currentQuestion.correctAnswer,
          unit: currentQuestion.unit,
          mistakeType: practiceResult?.mistakeType || 'FORMULA_ERROR',
          steps: currentQuestion.steps,
          userId: 'demo_student'
        })
      })
        .then(r => r.json())
        .then(res => {
          setIsAiLoading(false);
          const text = res.data?.pedagogicalExplanation || res.explanation || res.aiExplanation || currentQuestion.explanation;
          setAiExplanationText(text);
        })
        .catch(() => {
          setIsAiLoading(false);
          setAiExplanationText(
            currentQuestion.explanation || 
            `Review the clinical formula: (${currentQuestion.steps?.[1] || 'Desired ÷ Have × Volume'}). Ensure that units cancel out before dividing.`
          );
        });
    }
  };

  const allCombinedQuestions = useMemo(() => {
    return [...customQuestions, ...allQuestions];
  }, [customQuestions, allQuestions]);

  const bookmarkedQuestionsList = useMemo(() => {
    return allCombinedQuestions.filter(q => bookmarks.has(q.questionId));
  }, [allCombinedQuestions, bookmarks]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-slate-900 transition-colors duration-150">
      {/* Top Mobile Header */}
      <MobileHeader
        title={
          activeTab === 'home' ? '' :
          activeTab === 'learn' ? 'Learn' :
          activeTab === 'lesson' ? 'Lesson' :
          activeTab === 'practice' ? (practiceTopicFilter === 'custom' ? 'Portfolio Practice' : practiceTopicFilter ? `${practiceTopicFilter.replace(/-/g, ' ')}` : 'Practice') :
          activeTab === 'portfolio' ? 'Question Portfolio' :
          activeTab === 'calculator' ? 'Calculator' :
          activeTab === 'mistakes' ? 'Mistakes' :
          activeTab === 'progress' ? 'Progress' :
          activeTab === 'profile' ? 'Profile' :
          activeTab === 'settings' ? 'Settings' :
          activeTab === 'learning-goals' ? 'Learning Goals' :
          activeTab === 'bookmarks' ? 'Bookmarks' :
          activeTab === 'safety' ? 'Safety Standards' :
          activeTab === 'help' ? 'Help & Support' :
          activeTab === 'ai-tutor' ? 'AI Tutor' : ''
        }
        showBack={['lesson', 'practice', 'portfolio', 'mistakes', 'progress', 'settings', 'ai-tutor', 'learning-goals', 'bookmarks', 'safety', 'help'].includes(activeTab)}
        onBack={handleBack}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenProfile={() => handleNavigate('profile')}
        showBookmark={activeTab === 'practice'}
        isBookmarked={isCurrentBookmarked}
        onToggleBookmark={() => handleToggleBookmark()}
        user={user}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main Content View Container */}
      <main className="flex-1 w-full max-w-md mx-auto md:max-w-xl px-4 py-4 safe-bottom-pad">
        {activeTab === 'home' && (
          <HomeView
            user={user}
            stats={stats}
            onStartPractice={() => {
              setPracticeTopicFilter(null);
              setCurrentQIndex(0);
              handleNavigate('practice');
            }}
            onContinueTopic={(topicId) => {
              setSelectedTopic(topicId);
              handleNavigate('lesson');
            }}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'learn' && (
          <LearnView
            onSelectTopic={(topic) => {
              setSelectedTopic(topic);
              handleNavigate('lesson');
            }}
          />
        )}

        {activeTab === 'lesson' && (
          <LessonView
            lesson={selectedTopic}
            onBack={() => handleNavigate('learn')}
            onSelectLesson={(newTopicId) => setSelectedTopic(newTopicId)}
            onStartPractice={() => handleStartTopicPractice(selectedTopic)}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeView
            currentQuestion={currentQuestion}
            questionIndex={currentQIndex}
            totalQuestions={activeQuestions.length || 10}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            unit={currentQuestion?.unit}
            isSubmitted={isSubmitted}
            isChecking={isChecking}
            result={practiceResult}
            onCheckAnswer={handleCheckAnswer}
            onNextQuestion={handleNextQuestion}
            onPreviousQuestion={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
            onOpenAiTutor={handleOpenAiTutor}
            isBookmarked={isCurrentBookmarked}
            onToggleBookmark={() => handleToggleBookmark()}
          />
        )}

        {activeTab === 'calculator' && (
          <CalculatorView />
        )}

        {activeTab === 'mistakes' && (
          <MistakesView
            onPracticeCategory={(catId) => {
              handleStartTopicPractice(catId);
            }}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressView stats={stats} />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            user={user}
            customQuestionsCount={customQuestions.length}
            onNavigate={handleNavigate}
            onLogout={() => {
              localStorage.removeItem('nursecalc_token');
              handleNavigate('home');
            }}
          />
        )}

        {activeTab === 'portfolio' && (
          <QuestionPortfolioView
            customQuestions={customQuestions}
            onAddQuestion={handleAddCustomQuestion}
            onDeleteQuestion={handleDeleteCustomQuestion}
            onPracticeCustom={() => handleStartTopicPractice('custom')}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            user={user}
            isDarkMode={isDarkMode}
            onToggleDarkMode={handleToggleDarkMode}
            onNavigate={handleNavigate}
            onLogout={() => {
              localStorage.removeItem('nursecalc_token');
              handleNavigate('home');
            }}
            onOpenSubscriptionModal={() => setIsSubscriptionOpen(true)}
          />
        )}

        {activeTab === 'ai-tutor' && (
          <AiTutorView
            onStartPractice={() => {
              setPracticeTopicFilter(null);
              handleNavigate('practice');
            }}
          />
        )}

        {/* Learning Goals View */}
        {activeTab === 'learning-goals' && (
          <div className="space-y-4 pb-8 animate-fade-in">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Learning Goals</h1>
            <div className="nc-card p-4 space-y-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">NCLEX Calculation Target</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Achieve 90%+ calculation accuracy across all 7 clinical areas with zero 10-fold decimal errors.
              </p>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-slate-900 dark:bg-white rounded-full" style={{ width: '82%' }} />
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">82% Completed (103/126 solved)</span>
            </div>
          </div>
        )}

        {/* Bookmarks View */}
        {activeTab === 'bookmarks' && (
          <div className="space-y-4 pb-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Saved Bookmarks</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {bookmarkedQuestionsList.length} questions saved for clinical review
                </p>
              </div>
            </div>

            {bookmarkedQuestionsList.length === 0 ? (
              <div className="nc-card p-8 text-center space-y-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <Bookmark className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">No saved bookmarks yet</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
                    Tap the bookmark icon on any practice question to save it here for fast review.
                  </p>
                </div>
                <button
                  onClick={() => handleStartTopicPractice(null)}
                  className="nc-btn-secondary text-xs font-bold inline-flex items-center gap-1.5 mx-auto cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Start Practice Session</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarkedQuestionsList.map((q) => {
                  const scenarioText = q.scenario || q.prompt || q.questionText || q.text || 'Clinical calculation problem';
                  const topicLabel = q.topicId?.replace(/_/g, ' ') || 'Clinical Math';
                  return (
                    <div 
                      key={q.questionId}
                      className="nc-card p-4 space-y-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-700 dark:text-slate-300">
                          {topicLabel}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            Answer: {q.correctAnswer} {q.unit || ''}
                          </span>
                          <button
                            onClick={() => handleToggleBookmark(q.questionId)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                            title="Remove from bookmarks"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {q.title && (
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                          {q.title}
                        </h3>
                      )}

                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {scenarioText}
                      </p>

                      <div className="pt-1 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                        <span className="text-[11px] text-slate-400 font-mono">
                          ID: {q.questionId}
                        </span>
                        <button
                          onClick={() => handlePracticeSingleQuestion(q.questionId)}
                          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Practice This Question</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Safety Standards View */}
        {activeTab === 'safety' && (
          <div className="space-y-4 pb-8 animate-fade-in">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Safety & ISMP Standards</h1>
            <div className="nc-card p-4 space-y-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">1. Leading Zero Rule</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Always write a zero before a decimal point for numbers less than 1 (e.g. write <strong>0.5 mg</strong>, NEVER <strong>.5 mg</strong>). Naked decimals can cause 10-fold overdoses.
              </p>
              <h2 className="font-bold text-sm text-slate-900 dark:text-white pt-2">2. Trailing Zero Prohibition</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Never write a decimal point or a following zero after a whole number (e.g. write <strong>5 mg</strong>, NEVER <strong>5.0 mg</strong>).
              </p>
              <h2 className="font-bold text-sm text-slate-900 dark:text-white pt-2">3. Drop Factor Gravity Rounding</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Gravity drips (gtt/min) must be rounded to the nearest integer drop because mechanical drip chambers cannot administer partial drops. Smart infusion pumps (mL/hr) accept tenths of a mL.
              </p>
            </div>
          </div>
        )}

        {/* Help & Support View */}
        {activeTab === 'help' && (
          <div className="space-y-4 pb-8 animate-fade-in">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Help & Support</h1>
            <div className="nc-card p-4 space-y-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">Clinical Math Quick Cheatsheet</h2>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-4">
                <li><strong>Desired / Have:</strong> Tablets = Desired ÷ Have</li>
                <li><strong>Liquid Volume:</strong> mL = (Desired ÷ Have) × Volume</li>
                <li><strong>Pump Rate:</strong> mL/hr = Total Volume (mL) ÷ Hours</li>
                <li><strong>Drip Rate:</strong> gtt/min = (Volume × Drop Factor) ÷ Minutes</li>
                <li><strong>Weight-Based:</strong> Total mg = Weight (kg) × Dose (mg/kg)</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Fixed Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'practice') {
            setPracticeTopicFilter(null);
          }
          handleNavigate(tab);
        }}
      />

      {/* Slide-out Menu Modal */}
      <SideMenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
        user={user}
        onLogout={() => {
          localStorage.removeItem('nursecalc_token');
          handleNavigate('home');
        }}
      />

      {/* AI Concept Tutor Dialog Modal */}
      <AiTutorModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        question={currentQuestion}
        userAnswer={userAnswer}
        correctAnswer={practiceResult?.correctAnswer}
        explanation={practiceResult?.explanation}
        aiExplanation={aiExplanationText}
        isLoading={isAiLoading}
      />

      {/* Subscription Info Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
      />
    </div>
  );
}
