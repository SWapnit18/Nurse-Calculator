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
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E5E5] px-2 py-1.5 flex items-center justify-around shadow-[0_-2px_10px_rgba(0,0,0,0.02)] max-w-md mx-auto md:max-w-xl transition-colors"
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
            className={`flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 px-2 rounded-xl transition-all ${
              isActive 
                ? 'text-[#111111] font-semibold scale-105' 
                : 'text-[#888888] hover:text-[#111111] hover:bg-[#F7F7F7]'
            }`}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
            <span className="text-[11px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
