import React, { useState } from 'react';
import { 
  ArrowLeft, Bookmark, Menu, Sun, Moon, 
  User, Edit3, Settings, LogOut, CheckCircle2 
} from 'lucide-react';

export default function MobileHeader({ 
  title, 
  showBack, 
  onBack, 
  onOpenMenu, 
  onOpenProfile,
  onOpenEditProfile,
  onLogout,
  onNavigate,
  showBookmark,
  isBookmarked,
  onToggleBookmark,
  user,
  isDarkMode,
  onToggleDarkMode
}) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center justify-between min-h-[58px] transition-colors">
      <div className="flex items-center gap-2 min-w-0">
        {showBack ? (
          <button 
            onClick={onBack}
            className="w-10 h-10 -ml-2 rounded-xl flex items-center justify-center text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-extrabold text-xs tracking-wider shadow-sm">
              NC
            </div>
            <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight truncate">
              NurseCalc
            </span>
          </div>
        )}
        {title && (
          <h1 className="font-bold text-base text-slate-900 dark:text-slate-100 truncate ml-1">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        {/* Dark/Light Mode Switcher */}
        <button
          onClick={onToggleDarkMode}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-amber-400 stroke-[2.2]" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700 stroke-[2.2]" />
          )}
        </button>

        {showBookmark && (
          <button
            onClick={onToggleBookmark}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              isBookmarked 
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : 'stroke-[2]'}`} />
          </button>
        )}

        <button
          onClick={onOpenMenu}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
          aria-label="Open navigation menu"
          title="Open Menu"
        >
          <Menu className="w-5 h-5 stroke-[2]" />
        </button>

        {/* User Profile Avatar with Interactive Dropdown Menu */}
        <div className="relative">
          <button
            id="btn-header-profile-avatar"
            onClick={() => setIsProfileMenuOpen(prev => !prev)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all ml-0.5 cursor-pointer relative"
            aria-label="User Account Menu"
            title={user?.name ? `${user.name} Profile` : "Student Profile"}
          >
            <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center text-xs font-bold uppercase tracking-wider shadow-xs">
              {user?.name ? user.name.charAt(0) : 'N'}
            </div>
            {user && (
              <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0B0F19]" />
            )}
          </button>

          {/* Quick Profile Dropdown Menu */}
          {isProfileMenuOpen && (
            <>
              {/* Invisible Click-away Backdrop */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsProfileMenuOpen(false)} 
              />

              {/* Floating Menu Popover */}
              <div 
                id="header-profile-dropdown"
                className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-3 z-50 animate-fade-in text-left"
              >
                {user ? (
                  <>
                    {/* User Mini Card */}
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-[#1A2234] border border-slate-100 dark:border-slate-800">
                      <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-sm font-black shadow-sm flex-shrink-0">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'N'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                            {user.name}
                          </p>
                          <span className="text-[9px] font-extrabold px-1.5 py-0.2 bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 rounded flex items-center gap-0.5 flex-shrink-0">
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                            <span>Active</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {user.email}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-[9px] font-bold px-1.5 py-0.2 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded border border-blue-200/50 dark:border-blue-900 truncate">
                            {user.targetExam || 'NCLEX-RN'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="mt-2 space-y-0.5 border-t border-slate-100 dark:border-slate-800 pt-1.5">
                      <button
                        id="dropdown-btn-profile"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          if (onOpenProfile) onOpenProfile();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-left"
                      >
                        <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span>Student Profile Dashboard</span>
                      </button>

                      <button
                        id="dropdown-btn-edit-profile"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          if (onOpenEditProfile) {
                            onOpenEditProfile();
                          } else if (onOpenProfile) {
                            onOpenProfile();
                          }
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-left"
                      >
                        <Edit3 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span>Edit Profile Details</span>
                      </button>

                      <button
                        id="dropdown-btn-settings"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          if (onNavigate) onNavigate('settings');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-left"
                      >
                        <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span>Account Settings & Alarm</span>
                      </button>
                    </div>

                    {/* Log Out Action */}
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-1.5 mt-1.5">
                      <button
                        id="dropdown-btn-logout"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          if (onLogout) onLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-3 space-y-2.5 text-center">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                        Guest Student
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Sign in to sync your 42 lessons and mistakes log.
                      </p>
                    </div>
                    <button
                      id="dropdown-btn-signin"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        if (onOpenProfile) onOpenProfile();
                      }}
                      className="w-full nc-btn-primary py-2 text-xs font-bold cursor-pointer"
                    >
                      Sign In / Register
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
