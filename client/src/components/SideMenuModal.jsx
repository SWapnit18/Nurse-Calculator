import React from 'react';
import { 
  X, Home, BookOpen, PenTool, Calculator, AlertCircle, 
  TrendingUp, Bookmark, Sparkles, User, Settings, Shield, HelpCircle, LogOut 
} from 'lucide-react';

export default function SideMenuModal({ 
  isOpen, 
  onClose, 
  onNavigate, 
  user, 
  onLogout 
}) {
  if (!isOpen) return null;

  const menuSections = [
    {
      title: 'Main Navigation',
      items: [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'learn', label: 'Learn & Topics', icon: BookOpen },
        { id: 'practice', label: 'Practice Questions', icon: PenTool },
        { id: 'calculator', label: 'Clinical Calculator', icon: Calculator },
      ]
    },
    {
      title: 'Learning Tools',
      items: [
        { id: 'mistakes', label: 'Mistake Review', icon: AlertCircle },
        { id: 'progress', label: 'Progress & Analytics', icon: TrendingUp },
        { id: 'bookmarks', label: 'Saved Bookmarks', icon: Bookmark },
        { id: 'ai-tutor', label: 'AI Concept Tutor', icon: Sparkles },
      ]
    },
    {
      title: 'Account & Safety',
      items: [
        { id: 'profile', label: 'Student Profile', icon: User },
        { id: 'settings', label: 'App Settings', icon: Settings },
        { id: 'safety', label: 'ISMP Safety Rules', icon: Shield },
        { id: 'help', label: 'Help & Cheatsheet', icon: HelpCircle },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white h-full shadow-2xl flex flex-col z-10 animate-fade-in overflow-y-auto border-r border-slate-200 dark:border-slate-800">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-extrabold text-xs shadow-sm">
              NC
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">NurseCalc</h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Student Workspace</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex-1 space-y-6">
          {menuSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
                {section.title}
              </p>
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 active:bg-slate-200 dark:active:bg-slate-700 transition-colors min-h-[44px] cursor-pointer"
                  >
                    <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111827]">
          {user ? (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors min-h-[44px] cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onNavigate('profile');
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 transition-colors min-h-[44px] cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
