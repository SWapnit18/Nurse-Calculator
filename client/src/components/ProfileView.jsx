import React from 'react';
import { 
  User, ChevronRight, Settings, Shield, HelpCircle, 
  BookOpen, AlertCircle, TrendingUp, Bookmark, LogOut, PlusCircle, FolderHeart
} from 'lucide-react';

export default function ProfileView({ 
  user, 
  customQuestionsCount = 0,
  onNavigate, 
  onLogout 
}) {
  const profileRows = [
    { id: 'portfolio', label: 'My Question Portfolio', icon: FolderHeart, badge: `${customQuestionsCount} custom` },
    { id: 'learning-goals', label: 'Learning Goals', icon: BookOpen },
    { id: 'bookmarks', label: 'Saved Bookmarks', icon: Bookmark },
    { id: 'mistakes', label: 'Mistakes Review', icon: AlertCircle },
    { id: 'progress', label: 'Progress & Mastery', icon: TrendingUp },
    { id: 'settings', label: 'Preferences & Settings', icon: Settings },
    { id: 'safety', label: 'Safety & Clinical Standards', icon: Shield },
    { id: 'help', label: 'Help & Formula Cheatsheet', icon: HelpCircle },
  ];

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Profile</h1>
      </div>

      {/* User Card */}
      <div className="nc-card p-4 sm:p-5 flex items-center gap-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
        <div className="w-14 h-14 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-extrabold text-xl shadow-sm">
          {user?.name ? user.name.charAt(0) : 'S'}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-extrabold text-base text-slate-900 dark:text-white truncate">{user?.name || 'Student'}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email || 'student@nursecalc.app'}</p>
          <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded">
            Student Tier
          </span>
        </div>
      </div>

      {/* Profile Links List */}
      <div className="nc-card divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
        {profileRows.map((row) => {
          const Icon = row.icon;
          return (
            <button
              key={row.id}
              onClick={() => onNavigate(row.id)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 active:bg-slate-100 dark:active:bg-slate-800 transition-colors min-h-[50px] cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{row.label}</span>
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

      {/* Logout */}
      <div>
        <button
          onClick={onLogout}
          className="nc-btn-secondary w-full text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/60 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
