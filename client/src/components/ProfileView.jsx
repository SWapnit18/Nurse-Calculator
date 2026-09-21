import React, { useState } from 'react';
import { 
  User, ChevronRight, Settings, Shield, HelpCircle, 
  BookOpen, AlertCircle, TrendingUp, Bookmark, LogOut, 
  PlusCircle, FolderHeart, Edit3, CheckCircle2, Lock, 
  Mail, Eye, EyeOff, Sparkles, GraduationCap, Building, Target, Flame
} from 'lucide-react';

export default function ProfileView({ 
  user, 
  stats,
  customQuestionsCount = 0,
  onNavigate, 
  onLogout,
  onLogin,
  onRegister,
  onUpdateProfile,
  isEditOpen: externalIsEditOpen,
  setIsEditOpen: externalSetIsEditOpen
}) {
  // Auth state: 'signin' | 'signup'
  const [authMode, setAuthMode] = useState('signin');
  
  // Sign In inputs
  const [loginEmail, setLoginEmail] = useState('student@nursecalc.local');
  const [loginPassword, setLoginPassword] = useState('Demo1234!');
  const [showPassword, setShowPassword] = useState(false);
  
  // Sign Up inputs
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regExam, setRegExam] = useState('NCLEX-RN');
  const [regCollege, setRegCollege] = useState('');
  
  // Status & Feedback
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);

  // Edit Profile Modal State
  const [internalIsEditOpen, setInternalIsEditOpen] = useState(false);
  const isEditOpen = externalIsEditOpen !== undefined ? externalIsEditOpen : internalIsEditOpen;
  const setIsEditOpen = externalSetIsEditOpen || setInternalIsEditOpen;

  const [editName, setEditName] = useState(user?.name || '');
  const [editExam, setEditExam] = useState(user?.targetExam || 'NCLEX-RN');
  const [editCollege, setEditCollege] = useState(user?.college || 'Clinical Nursing Academy');
  const [editGoal, setEditGoal] = useState(user?.dailyGoal || 10);
  const [editLoading, setEditLoading] = useState(false);

  React.useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditExam(user.targetExam || 'NCLEX-RN');
      setEditCollege(user.college || 'Clinical Nursing Academy');
      setEditGoal(user.dailyGoal || 10);
    }
  }, [user]);

  // Handle Login submission
  const handleLoginSubmit = async (e) => {
    e?.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setAuthError('Please enter both email and password.');
      return;
    }

    setAuthLoading(true);
    try {
      if (onLogin) {
        await onLogin(loginEmail.trim(), loginPassword.trim());
        setAuthSuccess('Signed in successfully! Welcome back.');
      }
    } catch (err) {
      setAuthError(err.message || 'Failed to sign in. Please verify credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Registration submission
  const handleRegisterSubmit = async (e) => {
    e?.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setAuthError('Please enter name, email, and password.');
      return;
    }
    if (regPassword.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    setAuthLoading(true);
    try {
      if (onRegister) {
        await onRegister({
          name: regName.trim(),
          email: regEmail.trim(),
          password: regPassword.trim(),
          targetExam: regExam,
          college: regCollege.trim() || 'Nursing College'
        });
        setAuthSuccess('Student account created successfully!');
      }
    } catch (err) {
      setAuthError(err.message || 'Registration failed. Please try a different email.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Quick Demo Login Button
  const handleQuickDemoLogin = () => {
    setLoginEmail('student@nursecalc.local');
    setLoginPassword('Demo1234!');
    if (onLogin) {
      setAuthLoading(true);
      onLogin('student@nursecalc.local', 'Demo1234!')
        .catch(err => setAuthError(err.message))
        .finally(() => setAuthLoading(false));
    }
  };

  // Handle Edit Profile Save
  const handleSaveProfile = async (e) => {
    e?.preventDefault();
    if (!editName.trim()) return;
    setEditLoading(true);
    try {
      if (onUpdateProfile) {
        await onUpdateProfile({
          name: editName.trim(),
          targetExam: editExam,
          college: editCollege.trim(),
          dailyGoal: parseInt(editGoal, 10) || 10
        });
      }
      setIsEditOpen(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setEditLoading(false);
    }
  };

  // Navigation Rows for Logged-in profile
  const profileRows = [
    { id: 'portfolio', label: 'My Question Portfolio', icon: FolderHeart, badge: `${customQuestionsCount} custom` },
    { id: 'learning-goals', label: 'Learning Goals & NCLEX Milestones', icon: Target },
    { id: 'bookmarks', label: 'Saved Bookmarks', icon: Bookmark },
    { id: 'mistakes', label: 'Mistakes Review & 10x Slip Log', icon: AlertCircle },
    { id: 'progress', label: 'Progress & Mastery Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Preferences & Study Reminders', icon: Settings },
    { id: 'safety', label: 'Safety & Clinical Standards (ISMP)', icon: Shield },
    { id: 'help', label: 'Help & Clinical Formula Cheatsheet', icon: HelpCircle },
  ];

  // -----------------------------------------------------------
  // 1. LOGGED-OUT STATE: AUTHENTICATION INTERFACE (SIGN IN / SIGN UP)
  // -----------------------------------------------------------
  if (!user) {
    return (
      <div className="space-y-5 pb-12 animate-fade-in w-full max-w-md mx-auto">
        <div className="text-center space-y-1.5 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center mx-auto shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Student Workspace
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
            Sign in to track clinical math accuracy, save mistake records, and sync your 42 lessons.
          </p>
        </div>

        {/* Auth Mode Toggle Tabs */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          <button
            id="tab-auth-signin"
            type="button"
            onClick={() => {
              setAuthMode('signin');
              setAuthError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              authMode === 'signin'
                ? 'bg-white dark:bg-[#111827] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            id="tab-auth-signup"
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setAuthError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              authMode === 'signup'
                ? 'bg-white dark:bg-[#111827] text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Feedback Banners */}
        {authError && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 rounded-xl text-xs font-medium flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
            <span>{authError}</span>
          </div>
        )}

        {authSuccess && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-500" />
            <span>{authSuccess}</span>
          </div>
        )}

        {/* SIGN IN FORM */}
        {authMode === 'signin' && (
          <form onSubmit={handleLoginSubmit} className="nc-card p-5 space-y-3.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="login-email"
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="student@nursecalc.local"
                  className="nc-input text-xs font-medium w-full"
                  style={{ paddingLeft: '2.5rem' }}
                  autoComplete="email"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="nc-input text-xs font-medium w-full"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  autoComplete="current-password"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="btn-login-submit"
              type="submit"
              disabled={authLoading}
              className="nc-btn-primary w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold mt-2 cursor-pointer shadow-sm"
            >
              {authLoading ? (
                <span>Signing In...</span>
              ) : (
                <span>Sign In to NurseCalc</span>
              )}
            </button>

            {/* One-Click Demo Login Shortcut */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
              <button
                id="btn-demo-signin"
                type="button"
                onClick={handleQuickDemoLogin}
                disabled={authLoading}
                className="w-full py-2 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>One-Click Demo Student Sign In</span>
              </button>
            </div>
          </form>
        )}

        {/* SIGN UP FORM */}
        {authMode === 'signup' && (
          <form onSubmit={handleRegisterSubmit} className="nc-card p-5 space-y-3.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="reg-name"
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins, SN"
                  className="nc-input text-xs font-medium w-full"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="reg-email"
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="sarah.jenkins@nursing.edu"
                  className="nc-input text-xs font-medium w-full"
                  style={{ paddingLeft: '2.5rem' }}
                  autoComplete="email"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Password (min. 6 characters)
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="nc-input text-xs font-medium w-full"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  autoComplete="new-password"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Target Exam
                </label>
                <select
                  id="reg-exam"
                  value={regExam}
                  onChange={(e) => setRegExam(e.target.value)}
                  className="nc-input text-xs font-medium w-full bg-white dark:bg-[#1A2234]"
                >
                  <option value="NCLEX-RN">NCLEX-RN</option>
                  <option value="NCLEX-PN">NCLEX-PN</option>
                  <option value="B.Sc Nursing">B.Sc Nursing</option>
                  <option value="HESI A2">HESI A2</option>
                  <option value="TEAS 7">TEAS 7</option>
                  <option value="ICU Specialist">ICU / Critical Care</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  College / Hospital
                </label>
                <input
                  id="reg-college"
                  type="text"
                  value={regCollege}
                  onChange={(e) => setRegCollege(e.target.value)}
                  placeholder="University Hospital"
                  className="nc-input text-xs font-medium w-full"
                />
              </div>
            </div>

            <button
              id="btn-reg-submit"
              type="submit"
              disabled={authLoading}
              className="nc-btn-primary w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold mt-2 cursor-pointer shadow-sm"
            >
              {authLoading ? (
                <span>Creating Account...</span>
              ) : (
                <span>Register Free Student Account</span>
              )}
            </button>
          </form>
        )}
      </div>
    );
  }

  // -----------------------------------------------------------
  // 2. LOGGED-IN STATE: DYNAMIC REAL-TIME STUDENT DASHBOARD
  // -----------------------------------------------------------
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'N';
  const targetExam = user?.targetExam || 'NCLEX-RN';
  const college = user?.college || 'Clinical Nursing Academy';
  const dailyGoal = user?.dailyGoal || 10;
  const solvedToday = stats?.totalQuestions || 0;
  const goalPercent = Math.min(Math.round((solvedToday / dailyGoal) * 100), 100);

  return (
    <div className="space-y-4 pb-12 animate-fade-in w-full max-w-full">
      {/* Header Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Student Profile
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Active clinical candidate credential & mastery record
          </p>
        </div>

        <button
          onClick={() => {
            setEditName(user?.name || '');
            setEditExam(user?.targetExam || 'NCLEX-RN');
            setEditCollege(user?.college || 'Clinical Nursing Academy');
            setEditGoal(user?.dailyGoal || 10);
            setIsEditOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Hero User Identity Card */}
      <div className="nc-card p-4 sm:p-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black text-2xl shadow-sm flex-shrink-0">
            {userInitial}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-black text-base text-slate-900 dark:text-white truncate">
                {user.name}
              </h2>
              <span className="text-[10px] font-extrabold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 rounded-md flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>Active</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
              {user.email}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded border border-blue-200/50 dark:border-blue-900">
                {targetExam}
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded">
                {college}
              </span>
            </div>
          </div>
        </div>

        {/* Daily Study Goal Tracker Bar */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-blue-500" />
              <span>Daily Practice Goal: {solvedToday}/{dailyGoal} questions</span>
            </span>
            <span className="font-extrabold text-slate-900 dark:text-white">{goalPercent}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-slate-900 dark:bg-white rounded-full transition-all duration-500"
              style={{ width: `${goalPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Real-Time Clinical Stats Grid */}
      <div className="grid grid-cols-4 gap-2">
        <div className="nc-card p-3 text-center bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
          <span className="text-base font-black text-slate-900 dark:text-white block">
            {stats?.accuracy !== undefined ? `${stats.accuracy}%` : '0%'}
          </span>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mt-0.5">Accuracy</span>
        </div>

        <div className="nc-card p-3 text-center bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
          <span className="text-base font-black text-slate-900 dark:text-white block">
            {stats?.totalQuestions ?? 0}
          </span>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mt-0.5">Solved</span>
        </div>

        <div className="nc-card p-3 text-center bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
          <span className="text-base font-black text-amber-500 dark:text-amber-400 flex items-center justify-center gap-0.5">
            <span>{stats?.streakDays || 1}</span>
            <Flame className="w-3.5 h-3.5 fill-current" />
          </span>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mt-0.5">Streak</span>
        </div>

        <div className="nc-card p-3 text-center bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
          <span className="text-base font-black text-blue-600 dark:text-blue-400 block">
            {customQuestionsCount}
          </span>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mt-0.5">Custom</span>
        </div>
      </div>

      {/* Profile Clinical Navigation Links */}
      <div className="nc-card divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
        {profileRows.map((row) => {
          const Icon = row.icon;
          return (
            <button
              key={row.id}
              onClick={() => onNavigate(row.id)}
              className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 active:bg-slate-100 dark:active:bg-slate-800 transition-colors min-h-[48px] cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">{row.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {row.badge && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full">
                    {row.badge}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Logout Action Button */}
      <div className="pt-2">
        <button
          id="btn-profile-logout"
          onClick={onLogout}
          className="w-full py-3 px-4 rounded-xl font-bold text-xs text-red-600 dark:text-red-400 bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/60 hover:bg-red-100 dark:hover:bg-red-900/30 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out of Student Account</span>
        </button>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-[#111827] w-full max-w-sm rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Edit Student Profile
              </h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400">
                  Full Name
                </label>
                <input
                  id="edit-student-name"
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="nc-input text-xs font-medium w-full"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400">
                  Target Exam / Focus
                </label>
                <select
                  id="edit-target-exam"
                  value={editExam}
                  onChange={(e) => setEditExam(e.target.value)}
                  className="nc-input text-xs font-medium w-full bg-white dark:bg-[#1A2234]"
                >
                  <option value="NCLEX-RN">NCLEX-RN (Registered Nurse)</option>
                  <option value="NCLEX-PN">NCLEX-PN (Practical Nurse)</option>
                  <option value="B.Sc Nursing">B.Sc Nursing Student</option>
                  <option value="HESI A2">HESI A2 Exam</option>
                  <option value="TEAS 7">TEAS 7 Assessment</option>
                  <option value="ICU Specialist">Critical Care / ICU Specialist</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400">
                  Institution / Hospital
                </label>
                <input
                  id="edit-college"
                  type="text"
                  value={editCollege}
                  onChange={(e) => setEditCollege(e.target.value)}
                  className="nc-input text-xs font-medium w-full"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400">
                  Daily Question Goal
                </label>
                <input
                  id="edit-daily-goal"
                  type="number"
                  min="3"
                  max="50"
                  value={editGoal}
                  onChange={(e) => setEditGoal(e.target.value)}
                  className="nc-input text-xs font-medium w-full"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  id="btn-cancel-profile"
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="nc-btn-secondary flex-1 text-xs font-bold py-2 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="btn-save-profile"
                  type="submit"
                  disabled={editLoading}
                  className="nc-btn-primary flex-1 text-xs font-bold py-2 cursor-pointer"
                >
                  {editLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
