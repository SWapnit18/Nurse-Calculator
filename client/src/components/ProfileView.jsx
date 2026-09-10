import React from 'react';
import { 
  User, ChevronRight, Settings, Shield, HelpCircle, 
  BookOpen, AlertCircle, TrendingUp, Bookmark, LogOut 
} from 'lucide-react';

export default function ProfileView({ 
  user, 
  onNavigate, 
  onLogout 
}) {
  const profileRows = [
    { id: 'learning-goals', label: 'Learning Goals', icon: BookOpen },
    { id: 'practice', label: 'Practice History', icon: User },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'mistakes', label: 'Mistakes', icon: AlertCircle },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'safety', label: 'Safety & Educational Use', icon: Shield },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111111]">Profile</h1>
      </div>

      {/* User Card */}
      <div className="nc-card p-4 flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-base">
          {user?.name ? user.name.charAt(0) : 'S'}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-base text-[#111111] truncate">{user?.name || 'Student'}</h2>
          <p className="text-xs text-[#666666] truncate">{user?.email || 'student@nursecalc.app'}</p>
        </div>
      </div>

      {/* Profile Links List */}
      <div className="nc-card divide-y divide-[#E5E5E5] overflow-hidden">
        {profileRows.map((row) => {
          const Icon = row.icon;
          return (
            <button
              key={row.id}
              onClick={() => onNavigate(row.id)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F7F7F7] active:bg-[#EAEAEA] transition-colors min-h-[48px]"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-[#666666]" />
                <span className="text-sm font-medium text-[#111111]">{row.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#888888]" />
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <div>
        <button
          onClick={onLogout}
          className="nc-btn-secondary w-full text-red-600 border-red-200 hover:bg-red-50 flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
