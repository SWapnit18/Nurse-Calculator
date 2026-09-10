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
        { id: 'learn', label: 'Learn', icon: BookOpen },
        { id: 'practice', label: 'Practice', icon: PenTool },
        { id: 'calculator', label: 'Calculator', icon: Calculator },
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
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'safety', label: 'Safety & Disclaimer', icon: Shield },
        { id: 'help', label: 'Help & Support', icon: HelpCircle },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-right overflow-y-auto">
        <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-xs">
              NC
            </div>
            <div>
              <h2 className="font-bold text-base text-[#111111] leading-tight">NurseCalc</h2>
              <p className="text-[11px] text-[#666666]">Student Workspace</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#666666] hover:bg-[#F7F7F7] active:scale-95"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex-1 space-y-6">
          {menuSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#888888] px-3 mb-2">
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
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#111111] hover:bg-[#F7F7F7] active:bg-[#EAEAEA] transition-colors min-h-[44px]"
                  >
                    <Icon className="w-4 h-4 text-[#666666]" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#E5E5E5] bg-[#FAFAFA]">
          {user ? (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors min-h-[44px]"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          ) : (
            <p className="text-xs text-center text-[#888888]">
              Small Steps. Big Progress.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
