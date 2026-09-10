import React, { useState, useEffect } from 'react';
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

import CalculationEngine from './calculator/engine';

export default function App() {
  // Navigation: 'home' | 'learn' | 'lesson' | 'practice' | 'calculator' | 'mistakes' | 'progress' | 'profile' | 'settings' | 'ai-tutor'
  const [activeTab, setActiveTab] = useState('home');

  const [previousTab, setPreviousTab] = useState('home');
  
  // Modals
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);

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

  // Learn State
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Practice State
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [practiceResult, setPracticeResult] = useState(null);
  const [bookmarks, setBookmarks] = useState(new Set());
  const [aiExplanationText, setAiExplanationText] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Load questions from backend on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(r => r.json())
      .then(res => {
        if (res.data && res.data.length > 0) {
          setQuestions(res.data);
        }
      })
      .catch(() => {
        // Fallback robust questions if offline
        setQuestions([
          {
            questionId: 'q_1',
            topicId: 'liquid_calculations',
            scenario: 'Order: Gentamicin 80 mg intramuscular injection. Available: 200 mg/mL in a 1.0 mL single-dose vial. How many mL should the nurse draw up in the syringe?',
            correctAnswer: 0.4,
            unit: 'mL',
            steps: [
              'Identify what is ordered and available: Order: 80 mg, Available: 200 mg/mL',
              'Use the formula: Volume = Desired ÷ Available = 80 mg ÷ 200 mg/mL',
              'Calculate: Volume = 0.4 mL',
              'Check: 0.4 mL is a safe, measurable volume for IM injection.'
            ],
            keyPoint: 'Always use consistent units and double-check concentration.'
          },
          {
            questionId: 'q_2',
            topicId: 'iv_flow_mathematics',
            scenario: 'Order: 1,000 mL 0.9% Normal Saline over 16 hours via electronic infusion pump. Calculate the pump rate in mL/hr.',
            correctAnswer: 62.5,
            unit: 'mL/hr',
            steps: [
              'Formula: Rate (mL/hr) = Total Volume (mL) ÷ Time (hr)',
              'Calculation: 1,000 mL ÷ 16 hr = 62.5 mL/hr',
              'Safety: Maintain 62.5 mL/hr decimal on electronic infusion pump. Do not round to integer.'
            ],
            keyPoint: 'Electronic pumps support decimal rates (62.5 mL/hr), unlike gravity drips.'
          },
          {
            questionId: 'q_3',
            topicId: 'tablet_calculations',
            scenario: 'Order: Metoprolol Tartrate 25 mg PO twice daily. Available: 50 mg scored tablets. How many tablets should be administered per dose?',
            correctAnswer: 0.5,
            unit: 'tablets',
            steps: [
              'Formula: Tabs = Desired ÷ Have = 25 mg ÷ 50 mg',
              'Calculation: 25 ÷ 50 = 0.5 tablets',
              'Safety: Confirm tablet is scored before splitting.'
            ],
            keyPoint: 'Only tablets with an engineered score line can be split in half.'
          }
        ]);
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
            streakDays: res.data.streak ?? prev.streakDays
          }));
        }
      })
      .catch(() => {});
  }, []);

  const currentQuestion = questions[currentQIndex] || null;
  const isCurrentBookmarked = currentQuestion ? bookmarks.has(currentQuestion.questionId) : false;

  const handleToggleBookmark = () => {
    if (!currentQuestion) return;
    setBookmarks(prev => {
      const next = new Set(prev);
      if (next.has(currentQuestion.questionId)) {
        next.delete(currentQuestion.questionId);
      } else {
        next.add(currentQuestion.questionId);
      }
      return next;
    });
  };

  const handleNavigate = (tabId) => {
    setPreviousTab(activeTab);
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (activeTab === 'lesson') {
      setActiveTab('learn');
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
      });
  };

  const handleNextQuestion = () => {
    setUserAnswer('');
    setIsSubmitted(false);
    setPracticeResult(null);
    setAiExplanationText(null);
    if (currentQIndex + 1 < questions.length) {
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
          prompt: currentQuestion.scenario || currentQuestion.questionText,
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

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans antialiased selection:bg-[#111111] selection:text-white">
      {/* Top Mobile Header */}
      <MobileHeader
        title={
          activeTab === 'home' ? '' :
          activeTab === 'learn' ? 'Learn' :
          activeTab === 'lesson' ? 'Lesson' :
          activeTab === 'practice' ? 'Practice' :
          activeTab === 'calculator' ? 'Calculator' :
          activeTab === 'mistakes' ? 'Mistakes' :
          activeTab === 'progress' ? 'Progress' :
          activeTab === 'profile' ? 'Profile' :
          activeTab === 'settings' ? 'Settings' :
          activeTab === 'ai-tutor' ? 'AI Tutor' : ''
        }
        showBack={['lesson', 'practice', 'mistakes', 'progress', 'settings', 'ai-tutor'].includes(activeTab)}
        onBack={handleBack}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenProfile={() => handleNavigate('profile')}
        showBookmark={activeTab === 'practice'}
        isBookmarked={isCurrentBookmarked}
        onToggleBookmark={handleToggleBookmark}
        user={user}
      />

      {/* Main Content View Container */}
      <main className="flex-1 w-full max-w-md mx-auto md:max-w-xl px-4 py-4 safe-bottom-pad">
        {activeTab === 'home' && (
          <HomeView
            user={user}
            stats={stats}
            onStartPractice={() => handleNavigate('practice')}
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
            onStartPractice={() => handleNavigate('practice')}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeView
            currentQuestion={currentQuestion}
            questionIndex={currentQIndex}
            totalQuestions={questions.length || 10}
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
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'calculator' && (
          <CalculatorView />
        )}

        {activeTab === 'mistakes' && (
          <MistakesView
            onPracticeCategory={(catId) => {
              handleNavigate('practice');
            }}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressView stats={stats} />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            user={user}
            onNavigate={handleNavigate}
            onLogout={() => {
              localStorage.removeItem('nursecalc_token');
              handleNavigate('home');
            }}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            onLogout={() => {
              localStorage.removeItem('nursecalc_token');
              handleNavigate('home');
            }}
            onOpenSubscriptionModal={() => setIsSubscriptionOpen(true)}
          />
        )}

        {activeTab === 'ai-tutor' && (
          <AiTutorView
            onStartPractice={() => handleNavigate('practice')}
          />
        )}
      </main>


      {/* Persistent Bottom Mobile Navigation */}
      <BottomNav
        activeTab={['lesson', 'mistakes', 'progress', 'settings'].includes(activeTab) ? '' : activeTab}
        setActiveTab={handleNavigate}
      />

      {/* Side Menu Drawer Modal */}
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

      {/* AI Concept Tutor Modal */}
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

      {/* Subscription Billing Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
      />
    </div>
  );
}
