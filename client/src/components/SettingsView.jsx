import React, { useState } from 'react';
import { 
  User, Target, Sliders, Bell, Eye, Lock, 
  Shield, HelpCircle, Info, ChevronRight, LogOut, Check, Sparkles, Moon, Sun, Award
} from 'lucide-react';

export default function SettingsView({ 
  user,
  onNavigate,
  onLogout, 
  onOpenSubscriptionModal 
}) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const [activeModal, setActiveModal] = useState(null); // 'account' | 'practice-pref' | 'about' | 'privacy' | null

  const handleToggleDarkMode = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nursecalc_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nursecalc_theme', 'light');
    }
  };

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111111] dark:text-[#F7F7F7]">Settings</h1>
        <p className="text-sm text-[#666666] dark:text-[#A1A1AA] mt-0.5">Manage your preferences and clinical account configuration.</p>
      </div>

      {/* Account Info Card */}
      <div className="nc-card p-4 flex items-center justify-between gap-3 bg-white dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-full bg-[#111111] dark:bg-[#F7F7F7] text-white dark:text-[#111111] flex items-center justify-center font-bold text-sm">
            {user?.name ? user.name.charAt(0) : 'N'}
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-sm text-[#111111] dark:text-[#F7F7F7] truncate">{user?.name || 'Nurse Student'}</h2>
            <p className="text-xs text-[#666666] dark:text-[#A1A1AA] truncate">{user?.email || 'student@nursecalc.app'}</p>
          </div>
        </div>
        <button
          onClick={() => setActiveModal('account')}
          className="nc-btn-secondary px-3 py-1.5 text-xs font-semibold flex-shrink-0"
        >
          Edit Profile
        </button>
      </div>

      {/* Preferences Section */}
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#888888] px-1">
          Preferences
        </span>
        <div className="nc-card divide-y divide-[#E5E5E5] dark:divide-[#262626] overflow-hidden border border-[#E5E5E5] dark:border-[#262626] shadow-sm bg-white dark:bg-[#141414]">
          {/* Account */}
          <button
            onClick={() => setActiveModal('account')}
            className="w-full p-4 flex items-center justify-between hover:bg-[#F7F7F7] dark:hover:bg-[#1A1A1A] active:bg-[#EAEAEA] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-[#666666] dark:text-[#A1A1AA]" />
              <span className="text-sm font-medium text-[#111111] dark:text-[#F7F7F7]">Account</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#888888]" />
          </button>

          {/* Learning Goals */}
          <button
            onClick={() => onNavigate && onNavigate('learning-goals')}
            className="w-full p-4 flex items-center justify-between hover:bg-[#F7F7F7] dark:hover:bg-[#1A1A1A] active:bg-[#EAEAEA] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Target className="w-4 h-4 text-[#666666] dark:text-[#A1A1AA]" />
              <span className="text-sm font-medium text-[#111111] dark:text-[#F7F7F7]">Learning Goals</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#888888]">90% Target</span>
              <ChevronRight className="w-4 h-4 text-[#888888]" />
            </div>
          </button>

          {/* Practice Preferences */}
          <button
            onClick={() => setActiveModal('practice-pref')}
            className="w-full p-4 flex items-center justify-between hover:bg-[#F7F7F7] dark:hover:bg-[#1A1A1A] active:bg-[#EAEAEA] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Sliders className="w-4 h-4 text-[#666666] dark:text-[#A1A1AA]" />
              <span className="text-sm font-medium text-[#111111] dark:text-[#F7F7F7]">Practice Preferences</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#888888]">ISMP Strict</span>
              <ChevronRight className="w-4 h-4 text-[#888888]" />
            </div>
          </button>

          {/* Notifications Toggle */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-[#666666] dark:text-[#A1A1AA]" />
              <span className="text-sm font-medium text-[#111111] dark:text-[#F7F7F7]">Notifications</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-[#888888]">{notificationsEnabled ? 'Enabled' : 'Disabled'}</span>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                  notificationsEnabled ? 'bg-[#111111] dark:bg-[#F7F7F7]' : 'bg-[#D1D5DB] dark:bg-[#333333]'
                }`}
                aria-label="Toggle notifications"
              >
                <div className={`w-5 h-5 rounded-full bg-white dark:bg-[#111111] transition-transform ${
                  notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          {/* Appearance / Theme Toggle */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="w-4 h-4 text-[#666666] dark:text-[#A1A1AA]" />
              <span className="text-sm font-medium text-[#111111] dark:text-[#F7F7F7]">Appearance</span>
            </div>
            <button
              onClick={handleToggleDarkMode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E5E5] dark:border-[#333333] hover:bg-[#F7F7F7] dark:hover:bg-[#222222] transition-colors text-xs font-semibold text-[#111111] dark:text-[#F7F7F7]"
            >
              {isDarkMode ? (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </>
              )}
            </button>
          </div>

          {/* Privacy */}
          <button
            onClick={() => setActiveModal('privacy')}
            className="w-full p-4 flex items-center justify-between hover:bg-[#F7F7F7] dark:hover:bg-[#1A1A1A] active:bg-[#EAEAEA] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-[#666666] dark:text-[#A1A1AA]" />
              <span className="text-sm font-medium text-[#111111] dark:text-[#F7F7F7]">Privacy</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#888888]" />
          </button>
        </div>
      </div>

      {/* Support & Standards Section */}
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#888888] px-1">
          Support & Legal
        </span>
        <div className="nc-card divide-y divide-[#E5E5E5] dark:divide-[#262626] overflow-hidden border border-[#E5E5E5] dark:border-[#262626] shadow-sm bg-white dark:bg-[#141414]">
          <button
            onClick={() => onNavigate && onNavigate('safety')}
            className="w-full p-4 flex items-center justify-between hover:bg-[#F7F7F7] dark:hover:bg-[#1A1A1A] active:bg-[#EAEAEA] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-[#666666] dark:text-[#A1A1AA]" />
              <span className="text-sm font-medium text-[#111111] dark:text-[#F7F7F7]">Safety & Educational Use</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#888888]" />
          </button>

          <button
            onClick={() => onNavigate && onNavigate('help')}
            className="w-full p-4 flex items-center justify-between hover:bg-[#F7F7F7] dark:hover:bg-[#1A1A1A] active:bg-[#EAEAEA] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-[#666666] dark:text-[#A1A1AA]" />
              <span className="text-sm font-medium text-[#111111] dark:text-[#F7F7F7]">Help & Support</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#888888]" />
          </button>

          <button
            onClick={() => setActiveModal('about')}
            className="w-full p-4 flex items-center justify-between hover:bg-[#F7F7F7] dark:hover:bg-[#1A1A1A] active:bg-[#EAEAEA] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Info className="w-4 h-4 text-[#666666] dark:text-[#A1A1AA]" />
              <span className="text-sm font-medium text-[#111111] dark:text-[#F7F7F7]">About</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#888888]">v1.0.0</span>
              <ChevronRight className="w-4 h-4 text-[#888888]" />
            </div>
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-2">
        <button
          onClick={onLogout}
          className="nc-btn-secondary w-full text-red-600 border-red-200 hover:bg-red-50 flex items-center justify-center gap-2 font-semibold shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Interactive Modal Dialogs */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#18181B] rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl border border-[#E5E5E5] dark:border-[#27272A] animate-scale-up">
            {activeModal === 'account' && (
              <>
                <h3 className="font-bold text-base text-[#111111] dark:text-[#F7F7F7]">Account Details</h3>
                <div className="space-y-2 text-xs text-[#555555] dark:text-[#A1A1AA]">
                  <p><strong>Name:</strong> {user?.name || 'Nurse Student'}</p>
                  <p><strong>Email:</strong> {user?.email || 'student@nursecalc.app'}</p>
                  <p><strong>Role:</strong> Nursing Student / NCLEX Candidate</p>
                  <p><strong>Status:</strong> Active Clinical Learner</p>
                </div>
              </>
            )}

            {activeModal === 'practice-pref' && (
              <>
                <h3 className="font-bold text-base text-[#111111] dark:text-[#F7F7F7]">Practice Preferences</h3>
                <div className="space-y-2 text-xs text-[#555555] dark:text-[#A1A1AA]">
                  <p className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span><strong>ISMP Strict:</strong> Zero-slip decimal checks enabled.</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span><strong>Real Dosing:</strong> 105+ high-yield calculation scenarios.</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span><strong>AI Tutor:</strong> Socratic explanation breakdown enabled.</span>
                  </p>
                </div>
              </>
            )}

            {activeModal === 'privacy' && (
              <>
                <h3 className="font-bold text-base text-[#111111] dark:text-[#F7F7F7]">Privacy & Local Data</h3>
                <div className="space-y-2 text-xs text-[#555555] dark:text-[#A1A1AA] leading-relaxed">
                  <p>All your practice records, question bookmarks, and custom portfolio questions are stored securely on your local device and synced with your account.</p>
                </div>
              </>
            )}

            {activeModal === 'about' && (
              <>
                <h3 className="font-bold text-base text-[#111111] dark:text-[#F7F7F7]">About NurseCalc</h3>
                <div className="space-y-2 text-xs text-[#555555] dark:text-[#A1A1AA] leading-relaxed">
                  <p><strong>NurseCalc Platform v1.0.0</strong></p>
                  <p>Accredited dosage and IV rate simulation platform built to World Health Organization (WHO) and NCLEX Next-Generation standards.</p>
                </div>
              </>
            )}

            <button
              onClick={() => setActiveModal(null)}
              className="nc-btn-primary w-full py-2 text-xs font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
