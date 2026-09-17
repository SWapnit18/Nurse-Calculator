import React from 'react';
import { Home, BookOpen, PenTool, Calculator, User } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: PenTool },
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-[0_-2px_12px_rgba(0,0,0,0.03)] max-w-md mx-auto md:max-w-xl transition-colors"
      aria-label="Bottom Navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center min-w-[62px] min-h-[48px] py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              isActive 
                ? 'text-slate-900 dark:text-white font-bold scale-105 bg-slate-100 dark:bg-slate-800/80 shadow-xs' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850'
            }`}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.7]'}`} />
            <span className="text-[11px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
