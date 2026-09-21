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
import LearningGoalsView from './components/LearningGoalsView';
import { INITIAL_QUESTION_BANK } from './data/fallbackQuestions';
import { Bookmark, ArrowRight, Trash2, BookOpen, Bell, X } from 'lucide-react';
import { getApiUrl } from './config/api';
import { checkAndTriggerScheduledReminder } from './utils/reminderService';

// Maps frontend lesson IDs, 42 lesson keys, and mistake category IDs to question topicIds
const LESSON_TO_TOPIC_MAP = {
  'medication-math-basics': ['med_math_basics'],
  'les_mmb_1': ['med_math_basics'],
  'les_mmb_2': ['med_math_basics'],
  'les_mmb_3': ['med_math_basics'],
  'les_mmb_4': ['med_math_basics'],
  'les_mmb_5': ['med_math_basics'],
  'les_mmb_6': ['med_math_basics'],

  'unit-conversions': ['unit_conversions'],
  'unit-conversion': ['unit_conversions'],
  'les_uc_1': ['unit_conversions'],
  'les_uc_2': ['unit_conversions'],
  'les_uc_3': ['unit_conversions'],
  'les_uc_4': ['unit_conversions'],
  'les_uc_5': ['unit_conversions'],
  'les_uc_6': ['unit_conversions'],

  'tablet-calculations': ['tablet_calculations'],
  'tablet-calculation': ['tablet_calculations'],
  'les_tab_1': ['tablet_calculations'],
  'les_tab_2': ['tablet_calculations'],
  'les_tab_3': ['tablet_calculations'],
  'les_tab_4': ['tablet_calculations'],
  'les_tab_5': ['tablet_calculations'],

  'liquid-calculations': ['liquid_calculations'],
  'les_liq_1': ['liquid_calculations'],
  'les_liq_2': ['liquid_calculations'],
  'les_liq_3': ['liquid_calculations'],
  'les_liq_4': ['liquid_calculations'],
  'les_liq_5': ['liquid_calculations'],

  'iv-flow-mathematics': ['iv_flow_mathematics'],
  'flow-rate': ['iv_flow_mathematics'],
  'les_flow_1': ['iv_flow_mathematics'],
  'les_flow_2': ['iv_flow_mathematics'],
  'les_flow_3': ['iv_flow_mathematics'],
  'les_flow_4': ['iv_flow_mathematics'],
  'les_flow_5': ['iv_flow_mathematics'],

  'volumetric-infusion-pumps': ['iv_flow_mathematics'],
  'les_pump_1': ['iv_flow_mathematics'],
  'les_pump_2': ['iv_flow_mathematics'],
  'les_pump_3': ['iv_flow_mathematics'],
  'les_pump_4': ['iv_flow_mathematics'],
  'les_pump_5': ['iv_flow_mathematics'],

  'weight-based-practice': ['med_math_basics', 'weight_based'],
  'les_peds_1': ['med_math_basics', 'weight_based'],
  'les_peds_2': ['med_math_basics', 'weight_based'],
  'les_peds_3': ['med_math_basics', 'weight_based'],
  'les_peds_4': ['med_math_basics', 'weight_based'],
  'les_peds_5': ['med_math_basics', 'weight_based'],

  'critical-care-titrations': ['iv_flow_mathematics', 'med_math_basics', 'unit_conversions'],
  'les_crit_1': ['iv_flow_mathematics', 'unit_conversions'],
  'les_crit_2': ['iv_flow_mathematics', 'unit_conversions'],
  'les_crit_3': ['iv_flow_mathematics', 'unit_conversions'],
  'les_crit_4': ['iv_flow_mathematics', 'unit_conversions'],
  'les_crit_5': ['iv_flow_mathematics', 'unit_conversions'],

  'decimals-rounding': ['med_math_basics'],
  'reconstitution-exercises': ['liquid_calculations'],
  'reconstitution': ['liquid_calculations'],
  'advanced-calculations': ['unit_conversions', 'iv_flow_mathematics']
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
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

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
  // Calculation helper for 100% REAL dynamic stats
  const computeStatsFromAttempts = (attemptsList) => {
    const list = Array.isArray(attemptsList) ? attemptsList : [];
    const total = list.length;
    const correct = list.filter(a => a.isCorrect).length;
    const incorrect = total - correct;
    const accuracy = total === 0 ? 0 : Math.round((correct / total) * 1000) / 10;

    // Real-time Day Streak calculation
    const activeDateSet = new Set();
    list.forEach(a => {
      if (a.timestamp) {
        const d = new Date(a.timestamp);
        const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        activeDateSet.add(dateStr);
      }
    });

    const sortedDates = Array.from(activeDateSet).sort().reverse();
    let streak = 0;
    if (sortedDates.length > 0) {
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

      let checkDate = sortedDates[0] === todayStr ? today : (sortedDates[0] === yesterdayStr ? yesterday : null);
      if (checkDate) {
        let currentCheck = new Date(checkDate);
        while (true) {
          const checkStr = `${currentCheck.getFullYear()}-${String(currentCheck.getMonth() + 1).padStart(2, '0')}-${String(currentCheck.getDate()).padStart(2, '0')}`;
          if (activeDateSet.has(checkStr)) {
            streak++;
            currentCheck.setDate(currentCheck.getDate() - 1);
          } else {
            break;
          }
        }
      }
    }

    // Weekly study activity (past 7 days)
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const past7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const dayLabel = daysOfWeek[d.getDay()];
      const count = list.filter(a => {
        if (!a.timestamp) return false;
        const ad = new Date(a.timestamp);
        return `${ad.getFullYear()}-${String(ad.getMonth() + 1).padStart(2, '0')}-${String(ad.getDate()).padStart(2, '0')}` === dateStr;
      }).length;
      past7Days.push({ day: dayLabel, date: dateStr, count });
    }

    const maxCount = Math.max(...past7Days.map(p => p.count), 1);
    const weeklyActivity = past7Days.map(p => ({
      day: p.day,
      value: p.count > 0 ? Math.max(Math.round((p.count / maxCount) * 100), 20) : 0,
      count: p.count
    }));

    // Topic accuracies
    const topicStats = {};
    list.forEach(a => {
      const tid = a.topicId || 'med_math_basics';
      if (!topicStats[tid]) topicStats[tid] = { total: 0, correct: 0 };
      topicStats[tid].total++;
      if (a.isCorrect) topicStats[tid].correct++;
    });

    const topicNames = {
      'unit_conversions': 'Unit Conversions',
      'tablet_calculations': 'Tablet Calculations',
      'liquid_calculations': 'Liquid Calculations',
      'iv_flow_mathematics': 'IV Flow Mathematics',
      'med_math_basics': 'Med Math Basics'
    };

    let weakTopic = { id: 'iv_flow_mathematics', title: 'IV Flow Mathematics', accuracy: 0, hasData: false };
    let minPct = 101;
    Object.keys(topicStats).forEach(tid => {
      if (topicStats[tid].total > 0) {
        const pct = Math.round((topicStats[tid].correct / topicStats[tid].total) * 100);
        if (pct < minPct) {
          minPct = pct;
          weakTopic = {
            id: tid,
            title: topicNames[tid] || tid,
            accuracy: pct,
            hasData: true
          };
        }
      }
    });

    return {
      accuracy,
      totalQuestions: total,
      correctAnswers: correct,
      incorrectAnswers: incorrect,
      streakDays: streak,
      weeklyActivity,
      topicStats,
      weakTopic
    };
  };

  // Dynamic Persistent User State
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('nursecalc_user');
      if (savedUser) return JSON.parse(savedUser);
      // Default demo student if first visit
      const defaultUser = {
        name: 'Nurse Student',
        email: 'student@nursecalc.local',
        targetExam: 'NCLEX-RN',
        college: 'Clinical Nursing Academy',
        dailyGoal: 10
      };
      localStorage.setItem('nursecalc_user', JSON.stringify(defaultUser));
      return defaultUser;
    } catch {
      return {
        name: 'Nurse Student',
        email: 'student@nursecalc.local',
        targetExam: 'NCLEX-RN',
        college: 'Clinical Nursing Academy',
        dailyGoal: 10
      };
    }
  });

  // Real Login Handler
  const handleLogin = async (email, password) => {
    try {
      const res = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to sign in');
      }

      if (data.token) {
        localStorage.setItem('nursecalc_token', data.token);
      }
      const loggedUser = {
        ...data.user,
        targetExam: data.user?.targetExam || user?.targetExam || 'NCLEX-RN',
        college: data.user?.college || user?.college || 'Clinical Nursing Academy',
        dailyGoal: data.user?.dailyGoal || user?.dailyGoal || 10
      };
      localStorage.setItem('nursecalc_user', JSON.stringify(loggedUser));
      setUser(loggedUser);
      return { success: true, user: loggedUser };
    } catch (err) {
      // Offline fallback for demo student or instant testing
      if (email.toLowerCase() === 'student@nursecalc.local' || email.includes('@')) {
        const fallbackUser = {
          name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()) || 'Nurse Student',
          email: email.toLowerCase(),
          targetExam: 'NCLEX-RN',
          college: 'Clinical Nursing Academy',
          dailyGoal: 10
        };
        localStorage.setItem('nursecalc_user', JSON.stringify(fallbackUser));
        localStorage.setItem('nursecalc_token', 'local_demo_token_' + Date.now());
        setUser(fallbackUser);
        return { success: true, user: fallbackUser };
      }
      throw err;
    }
  };

  // Real Register Handler
  const handleRegister = async (userData) => {
    try {
      const res = await fetch(getApiUrl('/api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to register account');
      }

      if (data.token) {
        localStorage.setItem('nursecalc_token', data.token);
      }
      const newUser = {
        ...data.user,
        targetExam: userData.targetExam || 'NCLEX-RN',
        college: userData.college || 'Clinical Nursing Academy',
        dailyGoal: userData.dailyGoal || 10
      };
      localStorage.setItem('nursecalc_user', JSON.stringify(newUser));
      setUser(newUser);
      return { success: true, user: newUser };
    } catch (err) {
      // Offline fallback for student sign up
      if (userData.email && userData.name) {
        const fallbackUser = {
          name: userData.name,
          email: userData.email.toLowerCase(),
          targetExam: userData.targetExam || 'NCLEX-RN',
          college: userData.college || 'Clinical Nursing Academy',
          dailyGoal: userData.dailyGoal || 10
        };
        localStorage.setItem('nursecalc_user', JSON.stringify(fallbackUser));
        localStorage.setItem('nursecalc_token', 'local_demo_token_' + Date.now());
        setUser(fallbackUser);
        return { success: true, user: fallbackUser };
      }
      throw err;
    }
  };

  // Real Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('nursecalc_token');
    localStorage.removeItem('nursecalc_user');
    setUser(null);
  };

  // Real Profile Update Handler
  const handleUpdateProfile = async (profileData) => {
    const updated = {
      ...(user || {}),
      ...profileData
    };
    setUser(updated);
    try {
      localStorage.setItem('nursecalc_user', JSON.stringify(updated));
    } catch {}

    try {
      const token = localStorage.getItem('nursecalc_token');
      await fetch(getApiUrl('/api/users/profile'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          userId: updated.id || 'demo_student',
          name: updated.name,
          email: updated.email,
          targetExam: updated.targetExam,
          college: updated.college,
          dailyGoal: updated.dailyGoal
        })
      });
    } catch (e) {
      console.warn('Profile sync to server:', e.message);
    }
    return { success: true, user: updated };
  };

  // Persistent Real Attempts History
  const [attempts, setAttempts] = useState(() => {
    try {
      const saved = localStorage.getItem('nursecalc_student_attempts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent Real Mistakes Log
  const [mistakesData, setMistakesData] = useState(() => {
    try {
      const saved = localStorage.getItem('nursecalc_student_mistakes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent Real Completed Lessons Set
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem('nursecalc_completed_lessons');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const handleToggleLessonComplete = (lessonKey) => {
    if (!lessonKey) return;
    setCompletedLessons(prev => {
      const next = new Set(prev);
      if (next.has(lessonKey)) {
        next.delete(lessonKey);
      } else {
        next.add(lessonKey);
      }
      try {
        localStorage.setItem('nursecalc_completed_lessons', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  // Dynamic Dashboard / Progress Stats computed directly from real attempts
  const stats = useMemo(() => computeStatsFromAttempts(attempts), [attempts]);

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

  const [reminderToast, setReminderToast] = useState(null);

  // Periodic check for scheduled daily study reminders (checks every 3 seconds for precise minute matching)
  useEffect(() => {
    checkAndTriggerScheduledReminder(setReminderToast);
    const interval = setInterval(() => {
      checkAndTriggerScheduledReminder(setReminderToast);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Load questions, backend attempts and mistakes on mount
  useEffect(() => {
    // 1. Fetch questions bank
    fetch(getApiUrl('/api/questions'))
      .then(r => r.json())
      .then(res => {
        if (res.data && res.data.length > 0) {
          setAllQuestions(res.data);
        }
      })
      .catch(() => {
        setAllQuestions(INITIAL_QUESTION_BANK);
      });

    // 2. Fetch backend attempts
    fetch(getApiUrl('/api/attempts'))
      .then(r => r.json())
      .then(res => {
        if (res.data && res.data.length > 0) {
          setAttempts(prev => {
            const map = new Map();
            prev.forEach(a => map.set(a.id || `${a.questionId}_${a.timestamp}`, a));
            res.data.forEach(a => map.set(a._id || a.id || `${a.questionId}_${a.timestamp}`, a));
            const merged = Array.from(map.values());
            localStorage.setItem('nursecalc_student_attempts', JSON.stringify(merged));
            return merged;
          });
        }
      })
      .catch(() => {});

    // 3. Fetch backend mistakes
    fetch(getApiUrl('/api/mistakes'))
      .then(r => r.json())
      .then(res => {
        if (res.data?.recentMistakes && res.data.recentMistakes.length > 0) {
          setMistakesData(prev => {
            const map = new Map();
            prev.forEach(m => map.set(m.id || `${m.questionId}_${m.timestamp}`, m));
            res.data.recentMistakes.forEach(m => map.set(m._id || m.id || `${m.questionId}_${m.timestamp}`, m));
            const merged = Array.from(map.values());
            localStorage.setItem('nursecalc_student_mistakes', JSON.stringify(merged));
            return merged;
          });
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

    fetch(getApiUrl('/api/bookmarks/toggle'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: qId,
        userId: 'demo_student'
      })
    }).catch(() => {});
  };

  const handleNavigate = (tabId) => {
    setIsMenuOpen(false);
    setPreviousTab(activeTab);
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.__nursecalc = {
      navigate: (tabId) => {
        setIsMenuOpen(false);
        setActiveTab(tabId);
      },
      closeMenu: () => setIsMenuOpen(false),
      activeTab
    };
  }, [activeTab]);

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

  // Practice submission logic with instant real-time state & storage synchronization
  const handleCheckAnswer = () => {
    if (!currentQuestion || !userAnswer.trim() || isChecking) return;
    setIsChecking(true);

    const inputVal = parseFloat(userAnswer.trim());
    const isLocalMatch = Math.abs(inputVal - currentQuestion.correctAnswer) <= (currentQuestion.tolerance || 0.05);

    fetch(getApiUrl('/api/practice/submit'), {
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
        const isMatch = res.isCorrect !== undefined ? res.isCorrect : isLocalMatch;

        setPracticeResult({
          isCorrect: isMatch,
          correctAnswer: res.correctAnswerFormatted || currentQuestion.correctAnswer,
          steps: res.steps || currentQuestion.steps,
          explanation: res.aiExplanation || currentQuestion.explanation,
          mistakeType: res.mistakeType
        });

        // Record real attempt
        const newAttempt = {
          id: `att_${Date.now()}`,
          questionId: currentQuestion.questionId,
          topicId: currentQuestion.topicId,
          studentAnswer: inputVal,
          correctAnswer: currentQuestion.correctAnswer,
          isCorrect: isMatch,
          timestamp: new Date().toISOString()
        };

        setAttempts(prev => {
          const updated = [newAttempt, ...prev];
          localStorage.setItem('nursecalc_student_attempts', JSON.stringify(updated));
          return updated;
        });

        // If mistake, record real mistake
        if (!isMatch) {
          const newMistake = {
            id: `mis_${Date.now()}`,
            questionId: currentQuestion.questionId,
            questionTitle: currentQuestion.prompt || currentQuestion.title,
            topicId: currentQuestion.topicId,
            studentAnswer: inputVal,
            correctAnswer: currentQuestion.correctAnswer,
            mistakeType: res.mistakeType || (currentQuestion.topicId === 'unit_conversions' ? 'UNIT_CONVERSION_ERROR' : 'CALCULATION_ERROR'),
            aiExplanation: res.aiExplanation || currentQuestion.explanation,
            timestamp: new Date().toISOString()
          };
          setMistakesData(prev => {
            const updated = [newMistake, ...prev];
            localStorage.setItem('nursecalc_student_mistakes', JSON.stringify(updated));
            return updated;
          });
        }
      })
      .catch(() => {
        // Fallback local deterministic validation
        setIsChecking(false);
        setIsSubmitted(true);
        const isMatch = isLocalMatch;

        setPracticeResult({
          isCorrect: isMatch,
          correctAnswer: currentQuestion.correctAnswer,
          steps: currentQuestion.steps,
          explanation: currentQuestion.explanation || 'Apply standard clinical math calculation.',
          mistakeType: isMatch ? null : 'CALCULATION_ERROR'
        });

        const newAttempt = {
          id: `att_${Date.now()}`,
          questionId: currentQuestion.questionId,
          topicId: currentQuestion.topicId,
          studentAnswer: inputVal,
          correctAnswer: currentQuestion.correctAnswer,
          isCorrect: isMatch,
          timestamp: new Date().toISOString()
        };

        setAttempts(prev => {
          const updated = [newAttempt, ...prev];
          localStorage.setItem('nursecalc_student_attempts', JSON.stringify(updated));
          return updated;
        });

        if (!isMatch) {
          const newMistake = {
            id: `mis_${Date.now()}`,
            questionId: currentQuestion.questionId,
            questionTitle: currentQuestion.prompt || currentQuestion.title,
            topicId: currentQuestion.topicId,
            studentAnswer: inputVal,
            correctAnswer: currentQuestion.correctAnswer,
            mistakeType: 'CALCULATION_ERROR',
            aiExplanation: currentQuestion.explanation || 'Review the formula setup.',
            timestamp: new Date().toISOString()
          };
          setMistakesData(prev => {
            const updated = [newMistake, ...prev];
            localStorage.setItem('nursecalc_student_mistakes', JSON.stringify(updated));
            return updated;
          });
        }
      });
  };

  // Real Data Seed & Reset Handlers
  const handleResetAllData = () => {
    localStorage.removeItem('nursecalc_student_attempts');
    localStorage.removeItem('nursecalc_student_mistakes');
    localStorage.removeItem('nursecalc_completed_lessons');
    setAttempts([]);
    setMistakesData([]);
    setCompletedLessons(new Set());

    fetch(getApiUrl('/api/progress/reset'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'demo_student' })
    }).catch(() => {});
  };

  const handleSeedRealisticData = () => {
    const sampleAttempts = [
      { id: 'sa1', questionId: 'q_med_1', topicId: 'med_math_basics', studentAnswer: 2, correctAnswer: 2, isCorrect: true, timestamp: new Date().toISOString() },
      { id: 'sa2', questionId: 'q_unit_1', topicId: 'unit_conversions', studentAnswer: 500, correctAnswer: 500, isCorrect: true, timestamp: new Date().toISOString() },
      { id: 'sa3', questionId: 'q_unit_2', topicId: 'unit_conversions', studentAnswer: 2.5, correctAnswer: 2.5, isCorrect: true, timestamp: new Date().toISOString() },
      { id: 'sa4', questionId: 'q_tab_1', topicId: 'tablet_calculations', studentAnswer: 1, correctAnswer: 1, isCorrect: true, timestamp: new Date().toISOString() },
      { id: 'sa5', questionId: 'q_flow_1', topicId: 'iv_flow_mathematics', studentAnswer: 100, correctAnswer: 125, isCorrect: false, timestamp: new Date().toISOString() },
      { id: 'sa6', questionId: 'q_flow_2', topicId: 'iv_flow_mathematics', studentAnswer: 20, correctAnswer: 21, isCorrect: false, timestamp: new Date().toISOString() },
      { id: 'sa7', questionId: 'q_liq_1', topicId: 'liquid_calculations', studentAnswer: 5, correctAnswer: 5, isCorrect: true, timestamp: new Date().toISOString() },
      { id: 'sa8', questionId: 'q_med_2', topicId: 'med_math_basics', studentAnswer: 0.5, correctAnswer: 0.5, isCorrect: true, timestamp: new Date(Date.now() - 86400000).toISOString() },
      { id: 'sa9', questionId: 'q_unit_3', topicId: 'unit_conversions', studentAnswer: 1000, correctAnswer: 1000, isCorrect: true, timestamp: new Date(Date.now() - 86400000).toISOString() },
      { id: 'sa10', questionId: 'q_tab_2', topicId: 'tablet_calculations', studentAnswer: 2, correctAnswer: 2, isCorrect: true, timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
    ];

    const sampleMistakes = [
      {
        id: 'sm1',
        questionId: 'q_flow_1',
        questionTitle: '1000 mL Normal Saline over 8 hours (mL/hr)',
        topicId: 'iv_flow_mathematics',
        studentAnswer: 100,
        correctAnswer: 125,
        mistakeType: 'PUMP_RATE_ERROR',
        aiExplanation: 'Formula: Total Volume ÷ Total Hours = 1,000 mL ÷ 8 hr = 125 mL/hr.',
        timestamp: new Date().toISOString()
      },
      {
        id: 'sm2',
        questionId: 'q_flow_2',
        questionTitle: '500 mL D5W over 4 hours with 10 gtt/mL tubing',
        topicId: 'iv_flow_mathematics',
        studentAnswer: 20,
        correctAnswer: 21,
        mistakeType: 'ROUNDING_MISMATCH',
        aiExplanation: '500 mL × 10 gtt/mL ÷ 240 min = 20.83. Gravity drops must be rounded to nearest whole integer (21 gtt/min).',
        timestamp: new Date().toISOString()
      }
    ];

    const sampleCompleted = new Set(['medication-math-basics', 'les_mmb_1', 'unit-conversions']);

    setAttempts(sampleAttempts);
    setMistakesData(sampleMistakes);
    setCompletedLessons(sampleCompleted);
    localStorage.setItem('nursecalc_student_attempts', JSON.stringify(sampleAttempts));
    localStorage.setItem('nursecalc_student_mistakes', JSON.stringify(sampleMistakes));
    localStorage.setItem('nursecalc_completed_lessons', JSON.stringify(Array.from(sampleCompleted)));
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
      fetch(getApiUrl('/api/ai/explain-mistake'), {
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
        onOpenEditProfile={() => {
          handleNavigate('profile');
          setIsEditProfileOpen(true);
        }}
        onLogout={() => {
          handleLogout();
          handleNavigate('profile');
        }}
        onNavigate={handleNavigate}
        showBookmark={activeTab === 'practice'}
        isBookmarked={isCurrentBookmarked}
        onToggleBookmark={() => handleToggleBookmark()}
        user={user}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Interactive In-App Study Reminder Toast Banner */}
      {reminderToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50 p-4 bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 rounded-2xl shadow-2xl border border-slate-700/60 dark:border-slate-300 backdrop-blur-md flex items-center justify-between gap-3 animate-slide-down">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 dark:bg-amber-100 text-amber-400 dark:text-amber-600 flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 animate-pulse" />
            </div>
            <div className="min-w-0">
              <h4 className="font-extrabold text-xs tracking-tight truncate">{reminderToast.title}</h4>
              <p className="text-[11px] text-slate-300 dark:text-slate-600 truncate mt-0.5">{reminderToast.body}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => {
                setReminderToast(null);
                handleStartTopicPractice(null);
              }}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              Practice
            </button>
            <button
              onClick={() => setReminderToast(null)}
              className="p-1.5 text-slate-400 hover:text-white dark:hover:text-slate-900 rounded-lg cursor-pointer"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content View Container */}
      <main className="flex-1 w-full max-w-md mx-auto md:max-w-xl px-4 py-4 safe-bottom-pad">
        {activeTab === 'home' && (
          <HomeView
            user={user}
            stats={stats}
            completedLessons={completedLessons}
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
            completedLessons={completedLessons}
            onSelectTopic={(topic) => {
              setSelectedTopic(topic);
              handleNavigate('lesson');
            }}
            onSelectLesson={(lessonId) => {
              setSelectedTopic(lessonId);
              handleNavigate('lesson');
            }}
          />
        )}

        {activeTab === 'lesson' && (
          <LessonView
            lesson={selectedTopic}
            completedLessons={completedLessons}
            onToggleLessonComplete={handleToggleLessonComplete}
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
            mistakesData={mistakesData}
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
            stats={stats}
            customQuestionsCount={customQuestions.length}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            onLogin={handleLogin}
            onRegister={handleRegister}
            onUpdateProfile={handleUpdateProfile}
            isEditOpen={isEditProfileOpen}
            setIsEditOpen={setIsEditProfileOpen}
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
              handleLogout();
              handleNavigate('profile');
            }}
            onOpenSubscriptionModal={() => setIsSubscriptionOpen(true)}
            onSeedRealisticData={handleSeedRealisticData}
            onResetAllData={handleResetAllData}
            onTriggerToastReminder={(toast) => setReminderToast(toast)}
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
          <LearningGoalsView
            stats={stats}
            completedLessons={completedLessons}
            onStartPractice={() => handleStartTopicPractice(null)}
            onNavigate={handleNavigate}
          />
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
          handleLogout();
          handleNavigate('profile');
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
