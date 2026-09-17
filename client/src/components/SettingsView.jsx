import React, { useState } from 'react';
import { 
  User, Target, Sliders, Bell, Eye, Lock, 
  Shield, HelpCircle, Info, ChevronRight, LogOut, Check, Sparkles, Moon, Sun, Award
} from 'lucide-react';

export default function SettingsView({ 
  user,
  isDarkMode,
  onToggleDarkMode,
  onNavigate,
  onLogout, 
  onOpenSubscriptionModal 
}) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [activeModal, setActiveModal] = useState(null); // 'account' | 'practice-pref' | 'about' | 'privacy' | null

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Manage your preferences and clinical account configuration.</p>
      </div>

      {/* Account Info Card */}
      <div className="nc-card p-4 sm:p-5 flex items-center justify-between gap-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-extrabold text-base">
            {user?.name ? user.name.charAt(0) : 'N'}
          </div>
          <div className="min-w-0">
            <h2 className="font-extrabold text-base text-slate-900 dark:text-white truncate">{user?.name || 'Nurse Student'}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email || 'student@nursecalc.app'}</p>
          </div>
        </div>
        <button
          onClick={() => setActiveModal('account')}
          className="nc-btn-secondary px-3.5 py-1.5 text-xs font-bold flex-shrink-0 cursor-pointer"
        >
          Edit Profile
        </button>
      </div>

      {/* Preferences Section */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
          App Preferences
        </span>
        <div className="nc-card divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-[#111827]">
          {/* Dark Mode Toggle */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-200">
                {isDarkMode ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-slate-700" />}
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">Appearance Mode</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {isDarkMode ? 'Dark Slate Mode Active' : 'Light Clean Medical Active'}
                </span>
              </div>
            </div>
            <button
              onClick={onToggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                isDarkMode ? 'bg-slate-900 dark:bg-white' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-slate-900 transition-transform ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Daily Study Reminders */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-200">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">Study Reminders</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Daily practice push notifications</span>
              </div>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                notificationsEnabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Pro Membership / Upgrade */}
          <button
            onClick={onOpenSubscriptionModal}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-700 dark:text-amber-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-white block">NurseCalc Pro Tier</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">All features unlocked for learning</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </button>
        </div>
      </div>

      {/* Safety & Legal */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
          Safety & Policies
        </span>
        <div className="nc-card divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-[#111827]">
          <button
            onClick={() => onNavigate('safety')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">ISMP Decimal Rules</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </button>

          <button
            onClick={() => onNavigate('help')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Help & Clinical Math Reference</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
